from pyramid.view import view_config

@view_config(
	request_method='OPTIONS',
	renderer='json')
def cors_preflight(request):
    return {'cors': 'accepted'}
