class Ports:
	def __init__(self, local_port, target_port):
		self.local_port = local_port
		self.target_port = target_port

	@classmethod
	def from_api_container(cls, api_container):
		return cls(api_container.host_port, api_container.container_port)

	@classmethod
	def from_api_load_balancer(cls, api_load_balancer):
		return cls(api_load_balancer.port, api_load_balancer.target_port)