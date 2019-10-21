from backend_svc.services.configmap import ConfigmapService
from backend_svc.services.deployment import DeploymentService
from backend_svc.services.helm import HelmService
from backend_svc.services.pod import PodService
from backend_svc.services.service import ServiceService

SERVICE_MAPPING = dict(
    configmap=ConfigmapService(),
    deployment=DeploymentService(),
    helm=HelmService(),
    pod=PodService(),
    service=ServiceService()
)

class ServiceFactory(dict):
    def __init__(self):
        super().__init__(SERVICE_MAPPING)
