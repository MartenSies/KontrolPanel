restart:
	docker build -t kontrolpanel-backend-svc:latest backend_svc
	docker build -t kontrolpanel-frontend-svc:latest frontend_svc
	kubectl delete pods --selector=app=kontrolpanel
	kubectl port-forward deploy/kontrolpanel 8081
