from typing import Any, Dict, List

from backend_svc.models.ports import Ports

class LoadBalancer:
    def __init__(self, name: str, ports: List[Dict]):
        self.name = name
        self.ports = [Ports.from_api_load_balancer(port) for port in ports]

    @staticmethod
    def get_local_port_from_list(load_balancers: List[Any], target_port: int):
        for load_balancer in load_balancers:
            for ports in load_balancer.ports:
                if ports.target_port == target_port:
                    return ports.local_port

    @classmethod
    def from_api(cls, api_load_balancer):
        return cls(api_load_balancer.metadata.name,
                   api_load_balancer.spec.ports or [])
