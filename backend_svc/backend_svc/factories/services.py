from backend_svc.factories import BaseFactory

from backend_svc.services.service import ServiceService

class ServiceAPIResource(BaseFactory):

    def __init__(self, parent, name):
        super().__init__(parent, name)
        self.service_service = ServiceService() # TODO: create service factory

    def execute(self):
        return self.service_service.list()
