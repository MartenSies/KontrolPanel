from typing import Dict, List

from backend_svc.models.container import Container
from backend_svc.models.deployment import Deployment
from backend_svc.models.label import Label
from backend_svc.services.k8s_service import K8SService

class DeploymentService(K8SService):

    def list(self, services):
        data = []
        namespaces = services['namespace'].list()
        for namespace in namespaces:
            data.append({
                'name': namespace.name,
                'deployments': self.list_by_namespace(services, namespace)
            })
        return data

    def list_by_namespace(self, services, namespace) -> List[Deployment]:
        api_list = self.apps_v1_api.list_namespaced_deployment(
            namespace.name)

        deployments = []
        for item in api_list.items:
            labels = Label.list_from_deployment(item)
            load_balancers = services['service'].list_load_balancers(
                namespace.name, labels)

            deployment = Deployment(
                pods=services['pod'].list(namespace.name, labels),
                namespace=namespace.name,
                name=item.metadata.name,
                replicas=item.spec.replicas,
                labels=item.spec.template.metadata.labels,
                containers=Container.from_lists(
                    item, load_balancers)
            )
            deployments.append(deployment)
        return deployments

    def delete(self, namespace, name):
        return self.apps_v1_api.delete_namespaced_deployment(name, namespace)

    def scale(self, namespace, name, params):
        value = params.get('replicas', 1) # default to 1 replica
        body = [{"op":"replace", "path":"/spec/replicas", "value": value}]
        return self.apps_v1_api.patch_namespaced_deployment_scale(
            name, namespace, body)

    @staticmethod
    def expose(services, namespace_name: str, name: str, params: Dict):
        return services['service'].create_load_balancer(
            name=f"{params.get('name', name)}-service",
            namespace_name=namespace_name,
            labels=params.get('selector', {}),
            local_port=params['port']['local'],
            target_port=params['port']['target'])

    @staticmethod
    def delete_expose(services, namespace_name: str, name: str, params: Dict):
        return services['service'].delete_load_balancer(
            f"{params.get('name', name)}-service", namespace_name)
