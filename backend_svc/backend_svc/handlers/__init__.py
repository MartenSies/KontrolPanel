from pyramid.view import view_config

@view_config(
    request_method='OPTIONS',
    renderer='json')
#pylint: disable=unused-argument
def cors_preflight(request):
    return {'cors': 'accepted'}
