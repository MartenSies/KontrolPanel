from backend_svc.services.k8s_service import K8SService

class ConfigmapService(K8SService):

    def list(self):
        data = []
        namespaces = self.core_api.list_namespace(watch=False)
        for namespace in namespaces.items:
            item = { 'name': namespace.metadata.name, 'configmaps': [] }
            configmaps = self.core_api.list_namespaced_config_map(namespace.metadata.name, watch=False)
            for configmap in configmaps.items:
                item['configmaps'].append({
                    'name': configmap.metadata.name
                })
            data.append(item)
        return data