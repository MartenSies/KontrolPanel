
import os
import subprocess

from distutils.core import Command
from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(here, 'README.txt')) as f:
    README = f.read()
with open(os.path.join(here, 'CHANGES.txt')) as f:
    CHANGES = f.read()

requires = [
    'plaster_pastedeploy',
    'pyramid',
    'pyramid_debugtoolbar',
    'waitress',
    'kubernetes',
]

test_requires = [
    'WebTest >= 1.3.1',  # py3 compat
    'pytest >= 3.7.4',
    'pytest-cov',
]

class PyTest(Command):
    user_options = []

    def initialize_options(self):
        subprocess.call(['pip', 'install'] + test_requires)  # nosec

    def finalize_options(self):
        pass

    def run(self):
        import pytest
        errno = pytest.main(['--cov-report', 'term-missing:skip-covered',
                             '--cov-report', 'xml',
                             '--cov', 'backend_svc',
                             '--cov', 'test',
                             'test'])

        raise SystemExit(errno)


setup(
    name='backend_svc',
    version='0.0',
    description='backend-svc',
    long_description=README + '\n\n' + CHANGES,
    cmdclass={'test': PyTest},
    packages=find_packages(),
    tests_require=test_requires,
    install_requires=requires,
    entry_points={
        'paste.app_factory': [
            'main = backend_svc:main',
        ],
    },
)
