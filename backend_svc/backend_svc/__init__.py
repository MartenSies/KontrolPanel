from pyramid.config import Configurator
from pyramid.events import NewRequest

from backend_svc.factories.root import RootFactory

def add_cors_headers_response_callback(event):
    def cors_headers(request, response):
        response.headers.update({
            'Access-Control-Allow-Origin': 'http://localhost:8081',
            'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT,OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Max-Age': '1728000',
        })
    event.request.add_response_callback(cors_headers)

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    pyramid_config = Configurator(settings=settings, root_factory=RootFactory)
    
    pyramid_config.include('backend_svc.renderer')

    pyramid_config.scan('backend_svc.handlers')

    pyramid_config.add_subscriber(add_cors_headers_response_callback, NewRequest)
    pyramid_config.add_static_view('static', 'static', cache_max_age=3600)

    return pyramid_config.make_wsgi_app()
