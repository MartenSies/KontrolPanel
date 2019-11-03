from backend_svc.factories import BaseFactory


class PodAPIResource(BaseFactory):

    def __getitem__(self, pod_name):
        namespace = getattr(self.request.params, "namespace", "default")
        return PodResource(self.request, namespace, pod_name)

    def execute(self):
        return self.services['pod'].list()


class PodResource(dict):

    def __init__(self, request, namespace, pod_name):
        super().__init__()
        self.request = request
        self.namespace = namespace
        self.pod_name = pod_name

    def execute(self):
        return self.request.services['pod'].by_name(
            self.namespace, self.pod_name)

    def delete(self):
        return self.request.services['pod'].delete(
            self.namespace, self.pod_name)
