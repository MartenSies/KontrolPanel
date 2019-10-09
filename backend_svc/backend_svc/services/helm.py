from backend_svc.services import HelmService

class HelmService(HelmService):

    def delete(self, params):
        return self.post('/delete', params)

    def install(self, params):
        return self.post('/install', params)
