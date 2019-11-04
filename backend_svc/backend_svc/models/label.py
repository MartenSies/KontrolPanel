from typing import Dict

class Label:
    def __init__(self, key: str, value: str):
        self.key = key
        self.value = value

    def to_string(self):
        return f'{self.key}={self.value}'

    @classmethod
    def list_from_deployment(cls, deployment: Dict):
        labels = deployment.spec.template.metadata.labels
        return [cls(k, v) for k, v in labels.items()]
