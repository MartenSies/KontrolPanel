from backend_svc.factories.rest import RestAPIResource


class RootFactory(dict):
    def __init__(self, request):
        super().__init__()

        self.request = request
        self['api'] = RestAPIResource(parent=self, name='api')
