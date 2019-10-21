import logging

from backend_svc.services.k8s_service import K8SService

log = logging.getLogger(__name__)


class ServiceService(K8SService):

    def list(self):
        data = []
        namespaces = self.core_api.list_namespace(watch=False)
        for namespace in namespaces.items:
            item = { 'name': namespace.metadata.name, 'services': [] }
            services = self.core_api.list_namespaced_service(namespace.metadata.name, watch=False)
            for service in services.items:
                external_ip = None if service.spec.type != 'LoadBalancer' else service.status.load_balancer.ingress[0].hostname
                item['services'].append({
                    'name': service.metadata.name,
                    'namespace': service.metadata.namespace,
                    'type': service.spec.type,
                    'ports': service.spec.ports,
                    'selector': service.spec.selector,
                    'cluster_ip': service.spec.cluster_ip,
                    'external_ip': external_ip
                })
            data.append(item)
        return data