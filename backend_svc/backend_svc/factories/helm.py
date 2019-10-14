from backend_svc.factories import BaseFactory

from backend_svc.services.helm import HelmService

class HelmAPIResource(BaseFactory):

    def __init__(self, parent, name):
        super().__init__(parent, name)
        self['charts'] = ChartsResource(parent=self, name='charts')


class ChartsResource(BaseFactory):

    def __init__(self, parent, name):
        super().__init__(parent, name)
        self.helm_service = HelmService() # TODO: create service factory
        self['installed'] = InstalledChartsResource(
            parent=self, name='installed', service=self.helm_service)

    def install(self):
        return self.helm_service.install(self.request.json_body)

    def delete(self):
        return self.helm_service.delete(self.request.json_body)

    def search(self):
        return self.helm_service.search(dict(self.request.params))


class InstalledChartsResource(BaseFactory):

    def __init__(self, parent, name, service):
        super().__init__(parent, name)
        self.helm_service = service

    def list_installed_charts(self):
        return self.helm_service.list_installed_charts()
