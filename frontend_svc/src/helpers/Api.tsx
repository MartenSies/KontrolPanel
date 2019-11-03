const V1 = 'http://localhost:8080/api/v1'
const DEFAULT_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

function get(endpoint: string) {
    return fetch(V1 + endpoint).then(res => res.json());
}

function del(endpoint: string) {
    return fetch(V1 + endpoint, { method: 'DELETE' });
}

function delBody(endpoint: string, body) {
    return fetch(V1 + endpoint, {
        method: 'DELETE',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(body)
    });
}

function post(endpoint: string, body) {
    return fetch(V1 + endpoint, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(body)
    });
}

function patch(endpoint: string, body) {
    return fetch(V1 + endpoint, {
        method: 'PATCH',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(body)
    });
}

export function getCharts(keyword: string) {
    return get('/helm/charts?keyword=' + keyword);
}

export function getInstalledCharts() {
    return get('/helm/charts/installed');
}

export function installChart(body) {
    return post('/helm/charts', body)
}

export function deleteChart(body) {
    return delBody('/helm/charts', body)
}

export function getDeployments() {
    return get('/deployments');
}

export function deletePod(podName, namespace) {
    return del('/pods/' + podName + '?namespace=' + namespace)
}

export function deleteDeployment(deploymentName, namespace) {
    return del('/deployments/' + deploymentName + '?namespace=' + namespace)
}

export function updateReplicas(deploymentName, namespace, body) {
    return patch('/deployments/' + deploymentName + '/scale?namespace=' + namespace, body);
}

export function createLoadBalancer(deploymentName, namespace, body) {
    return post('/deployments/' + deploymentName + '/expose?namespace=' + namespace, body);

}

export function deleteLoadBalancer(deploymentName, namespace, body) {
    return delBody('/deployments/' + deploymentName + '/expose?namespace=' + namespace, body);
}
