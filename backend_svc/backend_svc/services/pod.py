import logging
from typing import List
from kubernetes import client

from backend_svc.models.pod import Pod
from backend_svc.models.label import Label
from backend_svc.services.k8s_service import K8SService

log = logging.getLogger(__name__)


class PodService(K8SService):

    # pylint: disable=dangerous-default-value
    def list(self, namespace_name: str, labels: List[Label] = []):
        labels_string = ','.join([label.to_string() for label in labels])
        pods = self.core_api.list_namespaced_pod(
            namespace_name, label_selector=labels_string)
        return [Pod.from_api(pod) for pod in pods.items]

    def by_name(self, namespace_name: str, name: str) -> Pod:
        api_item = self.core_api.read_namespaced_pod(name, namespace_name)
        return Pod.from_api(api_item)

    def delete(self, namespace_name: str, name: str):
        delete_options = client.V1DeleteOptions()
        self.core_api.delete_namespaced_pod(
            name=name,
            namespace=namespace_name,
            body=delete_options)
