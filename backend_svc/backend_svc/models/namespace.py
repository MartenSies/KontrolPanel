from typing import List, Dict

class Namespace:
    def __init__(self, name: str):
        self.name = name

    @classmethod
    def from_api_list(cls, api_list: List[Dict]):
        return [cls(n.metadata.name) for n in api_list.items]
