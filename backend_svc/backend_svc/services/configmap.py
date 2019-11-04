from typing import List

from backend_svc.models.namespace import Namespace
from backend_svc.models.configmap import Configmap
from backend_svc.services.k8s_service import K8SService

class ConfigmapService(K8SService):

    def list(self, services):
        data = []
        namespaces = services['namespace'].list()
        for namespace in namespaces:
            data.append({
                'name': namespace.name,
                'configmaps': self.list_by_namespace(namespace)
            })
        return data

    def list_by_namespace(self, namespace: Namespace) -> List[Configmap]:
        api_list = self.core_api.list_namespaced_config_map(
            namespace.name)

        configmaps = []
        for item in api_list.items:
            configmap = Configmap(item.metadata.name)
            configmaps.append(configmap)
        return configmaps
