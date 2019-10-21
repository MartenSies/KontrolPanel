from kubernetes import client, config

class K8SService:
    def __init__(self):
        try:
            config.load_incluster_config()
        except:
            config.load_kube_config()

        self.core_api = client.CoreV1Api()
        self.apps_v1_api = client.AppsV1Api()
        self.registration_api = client.ApiregistrationV1Api()