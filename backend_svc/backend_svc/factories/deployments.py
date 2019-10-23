import logging
from backend_svc.factories import BaseFactory

log = logging.getLogger(__name__)

class DeploymentAPIResource(BaseFactory):

    def __getitem__(self, deployment_name):
        return DeploymentResource(parent=self, name='deployment', deployment_name=deployment_name)

    def execute(self):
        return self.services['deployment'].list()


class DeploymentResource(BaseFactory):

    def __init__(self, parent, name, deployment_name):
        super().__init__(parent, name)
        self.deployment_name = deployment_name
        self['scale'] = DeploymentScaleResource(parent=self, name='scale', deployment_name=deployment_name)
        self['expose'] = DeploymentExposeResource(parent=self, name='expose', deployment_name=deployment_name)

    def delete(self):
        namespace = getattr(self.request.params, "namespace", "default")
        return self.request.services['deployment'].delete(namespace, self.deployment_name)


class DeploymentScaleResource(BaseFactory):

    def __init__(self, parent, name, deployment_name):
        super().__init__(parent, name)
        self.deployment_name = deployment_name

    def scale(self):
        namespace = getattr(self.request.params, "namespace", "default")
        return self.request.services['deployment'].scale(namespace, self.deployment_name, self.request.json_body)


class DeploymentExposeResource(BaseFactory):

    def __init__(self, parent, name, deployment_name):
        super().__init__(parent, name)
        self.deployment_name = deployment_name

    def expose(self):
        namespace = getattr(self.request.params, "namespace", "default")
        return self.request.services['deployment'].expose(namespace, self.deployment_name, self.request.json_body)

    def delete(self):
        namespace = getattr(self.request.params, "namespace", "default")
        return self.request.services['deployment'].delete_expose(namespace, self.deployment_name, self.request.json_body)
