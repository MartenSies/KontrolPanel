import logging
from backend_svc.services.k8s_service import K8SService
from kubernetes import client

log = logging.getLogger(__name__)


class PodService(K8SService):

    def list(self):
        data = []
        namespaces = self.core_api.list_namespace(watch=False)
        for namespace in namespaces.items:
            item = { 'name': namespace.metadata.name, 'pods': [] }
            pods = self.core_api.list_namespaced_pod(namespace.metadata.name, watch=False)
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
        pod = self.core_api.read_namespaced_pod(name, namespace)
        return {
            'ip': pod.status.pod_ip,
            'phase': pod.status.phase,
            'started_at': pod.status.start_time,
            'namespace': pod.metadata.namespace,
            'name': pod.metadata.name
        }

    def delete(self, namespace, name):
        delete_options = client.V1DeleteOptions()
        self.core_api.delete_namespaced_pod(
            name=name,
            namespace=namespace,
            body=delete_options)
