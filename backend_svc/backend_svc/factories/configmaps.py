from backend_svc.factories import BaseFactory


class ConfigmapAPIResource(BaseFactory):

    def execute(self):
        return self.services['configmap'].list(self.request.services)
