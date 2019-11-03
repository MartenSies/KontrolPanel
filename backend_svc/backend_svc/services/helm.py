import subprocess
import re
import logging

log = logging.getLogger(__name__)


class HelmService:

    def __init__(self):
        try:
            self._execute('init', '--client-only')
        except OSError:
            log.info('Error install helm')

    @staticmethod
    def _execute(command, *args):
        result = subprocess.run(
            ["helm", command, *args],
            universal_newlines=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=True)
        if result.stderr:
            return result.stderr
        return result.stdout

    def delete(self, params):
        return self._execute('delete', '--purge', params['release_name'])

    def install(self, params):
        return self._execute(
            'install', params['chart_name'], '--name', params['release_name'])

    def search(self, params):
        keyword = params.get('keyword', '')
        return self._to_json(self._execute('search', keyword))

    def list_installed_charts(self):
        return self._to_json(self._execute('list'))

    @staticmethod
    def _to_json(stdout):
        rows = stdout.split('\n')
        headers = re.sub('  +', '', rows.pop(0))\
            .replace(' ', '_').lower().split('\t')

        if len(rows) == 0:
            return []

        rows.pop() # remove the last item
        charts = []
        for row in rows:
            chart = {}
            values = re.sub('  +', '', row).split('\t')
            for i, value in enumerate(headers):
                chart[value] = values[i] if i < len(values) else ''
            charts.append(chart)
        return charts
