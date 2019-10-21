class BaseFactory(dict):
    def __init__(self, parent, name):
        self.__parent__ = parent
        self.__name__ = name
        if parent is not None:
            self.request = parent.request
        self.services = self.request.services
