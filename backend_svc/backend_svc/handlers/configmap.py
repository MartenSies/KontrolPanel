from pyramid.view import view_config

@view_config(
    request_method='GET',
    context='backend_svc.factories.configmaps.ConfigmapAPIResource',
    renderer='json')
def configmap_list(request):
    return request.context.execute()
