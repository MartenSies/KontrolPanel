import datetime

from pyramid.renderers import JSON

def includeme(config):
    renderers = {'json': JSON()}
    for name, renderer in renderers.items():
        renderer.add_adapter(datetime.datetime, str_adapter)
        renderer.add_adapter(object, object_adapter)
        config.add_renderer(name, renderer)

#pylint: disable=unused-argument
def str_adapter(obj, request):
    return str(obj)

#pylint: disable=unused-argument
def object_adapter(obj, request):
    to_dict = getattr(obj, "to_dict", None)
    if callable(to_dict):
        return to_dict()
    return obj.__dict__
