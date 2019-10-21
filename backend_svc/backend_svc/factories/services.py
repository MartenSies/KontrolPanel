from backend_svc.factories import BaseFactory


class ServiceAPIResource(BaseFactory):

    def execute(self):
        return self.services['service'].list()
