import datetime

from pyramid.renderers import JSON

def includeme(config):
    renderers = {'json': JSON()}
    for name, renderer in renderers.items():
        renderer.add_adapter(datetime.datetime, str_adapter)
        config.add_renderer(name, renderer)

def str_adapter(obj, request):
    return str(obj)