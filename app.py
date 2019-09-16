from kubernetes import client, config
from flask import Flask, request, render_template, redirect, url_for
import yaml

app = Flask(__name__)
config.load_incluster_config()
v1 = client.CoreV1Api()

@app.route('/')
def index():
    data = []
    namespaces = v1.list_namespace(watch=False)
    for namespace in namespaces.items:
        item = { 'name': namespace.metadata.name, 'pods': [] }
        pods = v1.list_namespaced_pod(namespace.metadata.name, watch=False)
        for pod in pods.items:
            item['pods'].append({
                'ip': pod.status.pod_ip,
                'phase': pod.status.phase,
                'started_at': pod.status.start_time,
                'namespace': pod.metadata.namespace,
                'name': pod.metadata.name
            })
        data.append(item)
    return render_template('deployments.html', pods=data)

@app.route('/delete_pod')
def delete():
    name = request.args.get('name', type=str)
    namespace = request.args.get('namespace', type=str)

    delete_options = client.V1DeleteOptions()

    v1.delete_namespaced_pod(
        name=name,
        namespace=namespace,
        body=delete_options)

    return 'Delete pod ' + name + ' ..'

@app.route('/configmaps')
def configmaps():
    data = []

    namespaces = v1.list_namespace(watch=False)
    for namespace in namespaces.items:
        item = { 'name': namespace.metadata.name, 'configmaps': [] }
        configmaps = v1.list_namespaced_config_map(namespace.metadata.name, watch=False)
        for configmap in configmaps.items:
            print(configmap.metadata)
            item['configmaps'].append({
                'name': configmap.metadata.name
            })
        data.append(item)

    return render_template('configmaps.html', configmaps=data)

@app.route('/helm')
def helm():
    return render_template('helm.html')

@app.route('/helm/install')
def helm_install():
    with open("static/k8s/helm/grafana/deployment.yaml", 'r') as stream:
        v1.create_namespaced_pod(body=yaml.safe_load(stream), namespace="default")
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True, port=8080)
