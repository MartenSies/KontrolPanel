import logging
from typing import List

from backend_svc.models.label import Label
from backend_svc.models.load_balancer import LoadBalancer
from backend_svc.services.k8s_service import K8SService

log = logging.getLogger(__name__)


class ServiceService(K8SService):

    def list_services(self, namespace_name, labels: List[Label]):
        labels_string = ','.join([label.to_string() for label in labels])
        return self.core_api.list_namespaced_service(
            namespace_name, label_selector=labels_string)

    # pylint: disable=dangerous-default-value
    def list_load_balancers(
            self, namespace, labels: List[Label] = []) -> List[LoadBalancer]:
        services = self.list_services(namespace, labels)
        return [LoadBalancer.from_api(s) for s in services.items \
            if s.spec.type == 'LoadBalancer']

    #pylint: disable=too-many-arguments
    def create_load_balancer(self, name: str, namespace_name: str,
                             labels: List[Label], local_port: int,
                             target_port: int):
        body = {
            "kind": "Service",
            "apiVersion": "v1",
            "metadata": {
                "name": name,
                "namespace": namespace_name,
                "labels": labels
            },
            "spec": {
                "ports": [{
                    "port": local_port,
                    "targetPort": target_port
                }],
                "selector": labels,
                "type": "LoadBalancer"
            }
        }
        return self.core_api.create_namespaced_service(namespace_name, body)

    def delete_load_balancer(self, name: str, namespace_name: str):
        return self.core_api.delete_namespaced_service(name, namespace_name)
