from backend_svc.services import K8SService
import yaml

class ConfigmapService(K8SService):

    def list(self):
        data = []
        namespaces = self.client.list_namespace(watch=False)
        for namespace in namespaces.items:
            item = { 'name': namespace.metadata.name, 'configmaps': [] }
            configmaps = self.client.list_namespaced_config_map(namespace.metadata.name, watch=False)
            for configmap in configmaps.items:
                item['configmaps'].append({
                    'name': configmap.metadata.name
                })
            data.append(item)
        return data