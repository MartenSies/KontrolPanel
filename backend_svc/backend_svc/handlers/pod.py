from pyramid.view import view_config

from pyramid.httpexceptions import (
    HTTPBadRequest,
    HTTPCreated,
    HTTPOk,
    HTTPNotFound)

@view_config(
	request_method='GET',
	context='backend_svc.factories.pods.PodAPIResource',
	renderer='json')
def pod_list(request):
    return request.context.execute()

@view_config(
	request_method='POST',
	context='backend_svc.factories.pods.PodAPIResource',
	renderer='json')
def pod_create(request):
    return request.context.create()

@view_config(
	request_method='GET',
	context='backend_svc.factories.pods.PodResource',
	renderer='json')
def pod_view(request):
    return request.context.execute()

@view_config(
	request_method='DELETE',
	context='backend_svc.factories.pods.PodResource')
def pod_delete(request):
    request.context.delete()
    return HTTPOk(json={'message': 'The policy was deleted'})

@view_config(
	request_method='OPTIONS',
	context='backend_svc.factories.pods.PodResource',
	renderer='json')
def pod_delete(request):
    return { 'cors': 'accepted' }

