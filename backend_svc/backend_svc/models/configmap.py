from typing import List, Dict

class Configmap:
    def __init__(self, name: str):
        self.name = name

    @classmethod
    def from_api_list(cls, api_list: List[Dict]):
        return [cls(c.metadata.name) for c in api_list.items]
