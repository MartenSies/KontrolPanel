from unittest import TestCase
from backend_svc.models.label import Label


class LabelTests(TestCase):
    def test_formatting_labels(self):
        label = Label('app', 'kontrolpanel')
        self.assertEqual(label.to_string(), 'app=kontrolpanel')
