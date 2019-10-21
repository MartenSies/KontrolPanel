from backend_svc.factories import BaseFactory


class HelmAPIResource(BaseFactory):

    def __init__(self, parent, name):
        super().__init__(parent, name)
        self['charts'] = ChartsResource(parent=self, name='charts')


class ChartsResource(BaseFactory):

    def __init__(self, parent, name):
        super().__init__(parent, name)
        self['installed'] = InstalledChartsResource(
            parent=self, name='installed')

    def install(self):
        return self.services['helm'].install(self.request.json_body)

    def delete(self):
        return self.services['helm'].delete(self.request.json_body)

    def search(self):
        return self.services['helm'].search(dict(self.request.params))


class InstalledChartsResource(BaseFactory):

    def list_installed_charts(self):
        return self.services['helm'].list_installed_charts()
