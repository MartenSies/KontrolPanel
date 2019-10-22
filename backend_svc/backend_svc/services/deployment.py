import logging
from backend_svc.services.k8s_service import K8SService
from kubernetes import client

log = logging.getLogger(__name__)


class DeploymentService(K8SService):

    def list(self):
        data = []
        namespaces = self.core_api.list_namespace(watch=False)
        for namespace in namespaces.items:
            item = { 'name': namespace.metadata.name, 'deployments': [] }
            deployments = self.apps_v1_api.list_namespaced_deployment(namespace.metadata.name, watch=False)
            for deployment in deployments.items:
                labels = self._format_labels(deployment.spec.template.metadata.labels)
                pods = self.core_api.list_namespaced_pod(namespace.metadata.name, label_selector=labels, watch=False)
                services = self.core_api.list_namespaced_service(namespace.metadata.name, label_selector=labels, watch=False)
                item['deployments'].append({
                    'pods': self._format_pods(pods),
                    'namespace': deployment.metadata.namespace,
                    'name': deployment.metadata.name,
                    'replicas': deployment.spec.replicas,
                    'labels': deployment.spec.template.metadata.labels,
                    'containers': self._format_containers(
                        deployment.spec.template.spec.containers),
                    'load_balancers': self._format_services(services)
                })
            data.append(item)
        return data

    def scale(self, namespace, name, params):
        value = params.get('replicas', 1) # default to 1 replica
        body = [{"op":"replace","path":"/spec/replicas","value": value}]
        return self.apps_v1_api.patch_namespaced_deployment_scale(name, namespace, body)

    def expose(self, namespace, name, params):
        body = {
          "kind": "Service",
          "apiVersion": "v1",
          "metadata": {
            "name": f"{params.get('name', name)}-service",
            "namespace": namespace,
            "labels": params.get('selector', {})
          },
          "spec": {
            "ports": [{
              "port": params['port']['local'],
              "targetPort": params['port']['target']
            }],
            "selector": params.get('selector', {}),
            "type": "LoadBalancer"
          }
        }
        return self.core_api.create_namespaced_service("default", body)

    def _format_labels(self, api_labels):
        labels = ''
        for key, value in api_labels.items():
            labels += f'{key}={value},'
        return labels[:-1]

    def _format_pods(self, api_pods):
        pods = []
        for pod in api_pods.items:
            pods.append({
                'name': pod.metadata.name,
                'status': pod.status.phase  # Pending, Running, Succeeded, Failed, Unknown
            })
        return pods

    def _format_services(self, api_services):
        services = []
        for service in api_services.items:
            if service.spec.type == 'LoadBalancer':
                services.append({
                    'name': service.metadata.name,
                    'ports': service.spec.ports
                })
        return services

    def _format_containers(self, api_containers):
        containers = []
        for container in api_containers:
            containers.append({
                'image': container.image,
                'image_pull_policy': container.image_pull_policy,
                'name': container.name,
                'ports': container.ports
            })
        return containers
