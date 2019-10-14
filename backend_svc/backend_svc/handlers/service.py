from pyramid.view import view_config

@view_config(
	request_method='GET',
	context='backend_svc.factories.services.ServiceAPIResource',
	renderer='json')
def service_list(request):
    return request.context.execute()
