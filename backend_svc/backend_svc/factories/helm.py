from backend_svc.factories import BaseFactory

from backend_svc.services.helm import HelmService

class HelmAPIResource(BaseFactory):

    def __init__(self, parent, name):
        super().__init__(parent, name)
        self['charts'] = ChartsResource(parent=self, name='pods')


class ChartsResource(BaseFactory):

    def __init__(self, parent, name):
        super().__init__(parent, name)
        self.helm_service = HelmService() # TODO: create service factory

    def install(self):
        return self.helm_service.install(self.request.json_body)

    def delete(self):
        return self.helm_service.delete(self.request.json_body)