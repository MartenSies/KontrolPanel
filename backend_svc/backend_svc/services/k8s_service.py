import logging
from kubernetes import client, config

log = logging.getLogger(__name__)

#pylint: disable=too-few-public-methods
class K8SService:
    def __init__(self):
        try:
            self.load_config()
        #pylint: disable=bare-except
        except:
            log.info('Unable to load k8s config')

        self.core_api = client.CoreV1Api()
        self.apps_v1_api = client.AppsV1Api()
        self.registration_api = client.ApiregistrationV1Api()

    @staticmethod
    def load_config():
        try:
            config.load_incluster_config()
        #pylint: disable=bare-except
        except:
            config.load_kube_config()
