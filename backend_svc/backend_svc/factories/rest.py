from backend_svc.factories import BaseFactory
from backend_svc.factories.pods import PodAPIResource
from backend_svc.factories.configmaps import ConfigmapAPIResource
from backend_svc.factories.helm import HelmAPIResource
from backend_svc.factories.services import ServiceAPIResource


class RestAPIResource(BaseFactory):
	def __init__(self, parent, name):
		super().__init__(parent, name)
		self['v1'] = Version1APIResource(parent=self, name='v1')

class Version1APIResource(BaseFactory):
    def __init__(self, parent, name):
        super().__init__(parent, name)
        self['pods'] = PodAPIResource(parent=self, name='pods')
        self['configmaps'] = ConfigmapAPIResource(parent=self, name='configmaps')
        self['services'] = ServiceAPIResource(parent=self, name='services')
        self['helm'] = HelmAPIResource(parent=self, name='helm')
