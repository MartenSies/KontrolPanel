import logging
from kubernetes import client

from backend_svc.models.pod import Pod
from backend_svc.services.k8s_service import K8SService

log = logging.getLogger(__name__)


class PodService(K8SService):

    def list(self, namespace, labels=''):
        pods = self.core_api.list_namespaced_pod(
            namespace, label_selector=labels)
        return [Pod.from_api(pod) for pod in pods.items]

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
