import logging

from backend_svc.models.load_balancer import LoadBalancer
from backend_svc.services.k8s_service import K8SService

log = logging.getLogger(__name__)


class ServiceService(K8SService):

    def list_load_balancers(self, namespace, labels=''):
        services = self.core_api.list_namespaced_service(namespace, label_selector=labels)
        return [LoadBalancer.from_api(s) for s in services.items if s.spec.type == 'LoadBalancer']

    def create_load_balancer(self, name, namespace, labels, local_port, target_port):
        body = {
          "kind": "Service",
          "apiVersion": "v1",
          "metadata": {
            "name": name,
            "namespace": namespace,
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
        return self.core_api.create_namespaced_service(namespace, body)

    def delete_load_balancer(self, name, namespace):
        return self.core_api.delete_namespaced_service(name, namespace)

