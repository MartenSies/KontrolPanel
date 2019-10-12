from kubernetes import client, config
import requests

class K8SService:
    def __init__(self):
        config.load_incluster_config()
        self.client = client.CoreV1Api()
