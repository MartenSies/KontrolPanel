from typing import List
from backend_svc.models.pod import Pod
from backend_svc.models.container import Container
from backend_svc.models.label import Label

class Deployment:
    def __init__(self, pods: Pod, namespace: str, name: str,
                 replicas: int, labels: List[Label],
                 containers: [Container]):
        self.pods = pods
        self.namespace = namespace
        self.name = name
        self.replicas = replicas
        self.labels = labels
        self.containers = containers
