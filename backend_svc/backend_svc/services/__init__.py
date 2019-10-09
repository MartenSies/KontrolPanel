from kubernetes import client, config
import requests

class K8SService:
    def __init__(self):
        config.load_incluster_config()
        self.client = client.CoreV1Api()

class HelmService:
    def __init__(self):
        self.host = 'http://on-demand-micro-services-deployment-on-demand-micro-services-de.default.svc.cluster.local:4000'

    def post(self, endpoint, params):
        return requests.post(
            self.host + endpoint,
            json=params).json()
