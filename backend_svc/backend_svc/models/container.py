from typing import List

from backend_svc.models.load_balancer import LoadBalancer
from backend_svc.models.ports import Ports

class Container:
    def __init__(self, image: str, image_pull_policy: str, name: str, ports: List[Ports]):
        self.image = image
        self.image_pull_policy = image_pull_policy
        self.name = name
        self.ports = [Ports.from_api_container(port) for port in ports]

    @classmethod
    def from_api_container(cls, api_container):
        return cls(api_container.image, api_container.image_pull_policy,
                   api_container.name, api_container.ports or [])

    @classmethod
    def from_api_deployment(cls, api_deployment):
        containers = api_deployment.spec.template.spec.containers
        return [cls(c.image, c.image_pull_policy,
                    c.name, c.ports or []) for c in containers]

    @staticmethod
    def from_lists(api_deployment, load_balancers):
        containers = Container.from_api_deployment(api_deployment)
        for ci, container in enumerate(containers):
            for pi, ports in enumerate(container.ports):
                containers[ci].ports[pi].local_port = \
                    LoadBalancer.get_local_port_from_list(load_balancers, ports.target_port)
        return containers
