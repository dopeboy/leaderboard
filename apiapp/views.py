from django.views.generic import TemplateView
from django.conf import settings
from apiapp.models import Candidate
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.response import Response
from apiapp.serializers import CandidateSerializer


class NoDataView(TemplateView):
    template_name = settings.DEFAULT_INDEX_PATH


class CandidateViewSet(viewsets.GenericViewSet):
    serializer_class = CandidateSerializer
    permission_classes = (AllowAny,)
    queryset = Candidate.objects.all()
    model = Candidate

    def list(self, request, *args, **kwargs):
        candidates = Candidate.objects.all().filter(
                user__is_active=True).filter(
                        visible=True).order_by('rank')
        serializer = CandidateSerializer(candidates, many=True)
        return Response(serializer.data)
