from backend_svc.factories import BaseFactory

from backend_svc.services.pod import PodService

class PodAPIResource(BaseFactory):

    def __init__(self, parent, name):
        super().__init__(parent, name)
        self.pod_service = PodService() # TODO: create service factory

    def __getitem__(self, pod_name):
        namespace = getattr(self.request.params, "namespace", "default")
        return PodResource(self.request, namespace, pod_name)

    def execute(self):
        return self.pod_service.list()

    def create(self):
        print(self.request.params)
        return self.pod_service.create(request=self.request, name='grafana')



class PodResource(dict):

    def __init__(self, request, namespace, pod_name):
        super().__init__()
        self.request = request
        self.namespace = namespace
        self.pod_name = pod_name
        self.pod_service = PodService() # TODO: create service factory

    def execute(self):
        return self.pod_service.by_name(self.namespace, self.pod_name)

    def delete(self):
        self.pod_service.delete(self.namespace, self.pod_name)
