from backend_svc.models.ports import Ports

class LoadBalancer:
	def __init__(self, name, ports):
		self.name = name
		self.ports = [Ports.from_api_load_balancer(port) for port in ports]

	@classmethod
	def from_api(cls, api_load_balancer):
		return cls(api_load_balancer.metadata.name, api_load_balancer.spec.ports or [])
