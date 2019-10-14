import datetime
import logging
from kubernetes.client import V1ServicePort

from pyramid.renderers import JSON


log = logging.getLogger(__name__)


def includeme(config):
    renderers = {'json': JSON()}
    for name, renderer in renderers.items():
        renderer.add_adapter(datetime.datetime, str_adapter)
        renderer.add_adapter(V1ServicePort, k8s_adapter)
        config.add_renderer(name, renderer)

def str_adapter(obj, request):
    return str(obj)

def k8s_adapter(obj, request):
    return obj.to_dict()