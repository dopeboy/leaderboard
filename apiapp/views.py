from django.views.generic import TemplateView
from django.conf import settings


class NoDataView(TemplateView):
    template_name = settings.DEFAULT_INDEX_PATH
