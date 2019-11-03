from backend_svc.models.ports import Ports

class Container:
    def __init__(self, image, image_pull_policy, name, ports):
        self.image = image
        self.image_pull_policy = image_pull_policy
        self.name = name
        self.ports = [Ports.from_api_container(port) for port in ports]

    @classmethod
    def from_api_container(cls, api_container):
        return cls(api_container.image, api_container.image_pull_policy,
                   api_container.name, api_container.ports or [])
