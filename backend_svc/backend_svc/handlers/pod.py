from pyramid.view import view_config

@view_config(
    request_method='GET',
    context='backend_svc.factories.pods.PodAPIResource',
    renderer='json')
def pod_list(request):
    return request.context.execute()

@view_config(
    request_method='GET',
    context='backend_svc.factories.pods.PodResource',
    renderer='json')
def pod_view(request):
    return request.context.execute()

@view_config(
    request_method='DELETE',
    context='backend_svc.factories.pods.PodResource',
    renderer='json')
def pod_delete(request):
    return request.context.delete()
