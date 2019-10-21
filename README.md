![](https://github.com/MartenSies/KontrolPanel/workflows/Frontend%20Service%20CI/badge.svg)

# KontrolPanel

## Installation
docker build -t kontrolpanel-backend-svc:latest backend_svc
docker build -t kontrolpanel-frontend-svc:latest frontend_svc
kubectl create -f k8s


Expose deployment
"kubectl expose deployment kontrolpanel --type=LoadBalancer --name=my-service"
