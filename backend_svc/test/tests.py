import unittest


class DeploymentServiceTests(unittest.TestCase):

    def test_formatting_labels(self):
        from backend_svc.services.deployment import DeploymentService
        deployment_service = DeploymentService()
        labels = deployment_service._format_labels({'app': 'kontrolpanel'})
        self.assertEqual(labels, 'app=kontrolpanel')
