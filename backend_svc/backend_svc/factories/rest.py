from backend_svc.factories import BaseFactory
from backend_svc.factories.pods import PodAPIResource
from backend_svc.factories.configmaps import ConfigmapAPIResource


class RestAPIResource(BaseFactory):
	def __init__(self, parent, name):
		super().__init__(parent, name)
		self['v1'] = Version1APIResource(parent=self, name='v1')

class Version1APIResource(BaseFactory):
    def __init__(self, parent, name):
        super().__init__(parent, name)
        self['pods'] = PodAPIResource(parent=self, name='pods')
        self['configmaps'] = ConfigmapAPIResource(parent=self, name='configmaps')