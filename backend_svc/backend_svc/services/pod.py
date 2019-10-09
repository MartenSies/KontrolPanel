from backend_svc.services import K8SService
import yaml
import requests

class PodService(K8SService):

    def list(self):
        data = []
        namespaces = self.client.list_namespace(watch=False)
        for namespace in namespaces.items:
            item = { 'name': namespace.metadata.name, 'pods': [] }
            pods = self.client.list_namespaced_pod(namespace.metadata.name, watch=False)
            for pod in pods.items:
                item['pods'].append({
                    'ip': pod.status.pod_ip,
                    'phase': pod.status.phase,
                    'started_at': pod.status.start_time,
                    'namespace': pod.metadata.namespace,
                    'name': pod.metadata.name
                })
            data.append(item)
        return data

    def by_name(self, namespace, name):
        pod = self.client.read_namespaced_pod(name, namespace)
        return {
            'ip': pod.status.pod_ip,
            'phase': pod.status.phase,
            'started_at': pod.status.start_time,
            'namespace': pod.metadata.namespace,
            'name': pod.metadata.name
        }

    def delete(self, namespace, name):
        delete_options = self.client.V1DeleteOptions()
        self.client.delete_namespaced_pod(
            name=name,
            namespace=namespace,
            body=delete_options)

    def create(self, request, name):
        return requests.post('http://on-demand-micro-services-deployment-on-demand-micro-services-de.default.svc.cluster.local:4000/install', json={
          "chartName":"stable/fluentd",
          "releaseName": "fluentd"
        }).json()
