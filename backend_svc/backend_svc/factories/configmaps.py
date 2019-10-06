from backend_svc.factories import BaseFactory

from backend_svc.services.configmap import ConfigmapService

class ConfigmapAPIResource(BaseFactory):

    def __init__(self, parent, name):
        super().__init__(parent, name)
        self.configmap_service = ConfigmapService() # TODO: create service factory

    def execute(self):
        return self.configmap_service.list()
