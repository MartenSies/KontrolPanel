from pyramid.view import view_config

@view_config(
    request_method='GET',
    context='backend_svc.factories.deployments.DeploymentAPIResource',
    renderer='json')
def deployment_list(request):
    return request.context.execute()

@view_config(
    request_method='PATCH',
    context='backend_svc.factories.deployments.DeploymentScaleResource',
    renderer='json')
def deployment_scale(request):
    return request.context.scale()

@view_config(
    request_method='POST',
    context='backend_svc.factories.deployments.DeploymentExposeResource',
    renderer='json')
def deployment_expose(request):
    return request.context.expose()
