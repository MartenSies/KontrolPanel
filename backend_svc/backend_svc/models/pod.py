class Pod:
    def __init__(self, name, status):
        self.name = name
        self.status = status

    @classmethod
    def from_api(cls, api_pod):
        return cls(api_pod.metadata.name, api_pod.status.phase)
