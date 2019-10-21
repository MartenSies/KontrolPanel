import unittest
from unittest import mock

class DeploymentServiceTests(unittest.TestCase):

    @mock.patch(
    	'backend_svc.services.deployment.DeploymentService.__init__', mock.Mock(return_value=None))
    def test_formatting_labels(self):
        from backend_svc.services.deployment import DeploymentService
        deployment_service = DeploymentService()
        labels = deployment_service._format_labels({'app': 'kontrolpanel'})
        self.assertEqual(labels, 'app=kontrolpanel')
