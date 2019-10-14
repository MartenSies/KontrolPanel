from pyramid.view import view_config

@view_config(
    request_method='GET',
    context='backend_svc.factories.helm.ChartsResource',
    renderer='json')
def search(request):
    return request.context.search()

@view_config(
    request_method='POST',
    context='backend_svc.factories.helm.ChartsResource',
    renderer='json')
def install_chart(request):
    return request.context.install()

@view_config(
    request_method='DELETE',
    context='backend_svc.factories.helm.ChartsResource',
    renderer='json')
def delete_chart(request):
    return request.context.delete()

@view_config(
    request_method='GET',
    context='backend_svc.factories.helm.InstalledChartsResource',
    renderer='json')
def list_installed_charts(request):
    return request.context.list_installed_charts()
