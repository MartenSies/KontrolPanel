import subprocess, re

class HelmService:

    def __init__(self):
        self._execute('init', '--client-only')

    def _execute(self, command, *args):
        result = subprocess.run(
            ["helm", command, *args],
            universal_newlines=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE)
        if result.stderr:
            return result.stderr
        return result.stdout

    def delete(self, params):
        return self._execute('delete', '--purge', params['release_name'])

    def install(self, params):
        return self._execute('install', params['chart_name'], '--name', params['release_name'])

    def list(self):
        return self._to_json(self._execute('search'))

    def _to_json(self, stdout):
        rows = stdout.split('\n')
        headers = re.sub('  +', '', rows[0]).split('\t')
        charts = [];
        for row in rows:
            chart = {}
            values = re.sub('  +', '', row).split('\t')
            for i in range(len(headers)):
                chart[headers[i]] = values[i] if i < len(values) else ''
            charts.append(chart)
        return charts
