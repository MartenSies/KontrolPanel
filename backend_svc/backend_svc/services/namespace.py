from typing import List

from backend_svc.models.namespace import Namespace
from backend_svc.services.k8s_service import K8SService

class NamespaceService(K8SService):

    def list(self) -> List[Namespace]:
        api_list = self.core_api.list_namespace()
        return Namespace.from_api_list(api_list)
