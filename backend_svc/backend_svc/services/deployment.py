from backend_svc.models.container import Container
from backend_svc.services.k8s_service import K8SService

class DeploymentService(K8SService):

    def list(self, services):
        data = []
        namespaces = self.core_api.list_namespace()
        for namespace in namespaces.items:
            item = {'name': namespace.metadata.name, 'deployments': []}
            deployments = self.apps_v1_api.list_namespaced_deployment(
                namespace.metadata.name, watch=False)
            for deployment in deployments.items:
                labels = self._format_labels(
                    deployment.spec.template.metadata.labels)
                item['deployments'].append({
                    'pods': services['pod'].list(
                        namespace.metadata.name, labels),
                    'namespace': deployment.metadata.namespace,
                    'name': deployment.metadata.name,
                    'replicas': deployment.spec.replicas,
                    'labels': deployment.spec.template.metadata.labels,
                    'containers': self.list_containers(
                        deployment.spec.template.spec.containers,
                        services['service'].list_load_balancers(
                            namespace.metadata.name, labels)),
                })
            data.append(item)
        return data

    def delete(self, namespace, name):
        return self.apps_v1_api.delete_namespaced_deployment(name, namespace)

    def scale(self, namespace, name, params):
        value = params.get('replicas', 1) # default to 1 replica
        body = [{"op":"replace", "path":"/spec/replicas", "value": value}]
        return self.apps_v1_api.patch_namespaced_deployment_scale(
            name, namespace, body)

    @staticmethod
    def expose(services, namespace, name, params):
        return services['service'].create_load_balancer(
            name=f"{params.get('name', name)}-service",
            namespace=namespace,
            labels=params.get('selector', {}),
            local_port=params['port']['local'],
            target_port=params['port']['target'])

    @staticmethod
    def delete_expose(services, namespace, name, params):
        return services['service'].delete_load_balancer(
            f"{params.get('name', name)}-service", namespace)

    @staticmethod
    def _format_labels(api_labels):
        labels = ''
        for key, value in api_labels.items():
            labels += f'{key}={value},'
        return labels[:-1]

    @staticmethod
    def list_containers(api_containers, load_balancers):
        containers = []
        for c in api_containers:
            container = Container.from_api_container(c)
            for lb in load_balancers:
                for p in lb.ports:
                    for cp in container.ports:
                        if p.target_port == cp.target_port:
                            cp.local_port = p.local_port
            containers.append(container)
        return containers
