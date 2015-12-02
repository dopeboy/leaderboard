from django.views.generic import TemplateView
from django.conf import settings
from apiapp.models import Candidate, MyUser
from rest_framework.permissions import AllowAny
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from apiapp.serializers import CandidateSerializer
from django.shortcuts import get_object_or_404
from rest_framework.decorators import detail_route
import datetime
import json


class NoDataView(TemplateView):
    template_name = settings.DEFAULT_INDEX_PATH


class CandidateViewSet(mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin,
                       mixins.ListModelMixin,
                       viewsets.GenericViewSet):
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

    def retrieve(self, request, pk):
        queryset = MyUser.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        queryset = Candidate.objects.all()
        candidate = get_object_or_404(queryset, user=user)
        serializer = CandidateSerializer(candidate)
        return Response(serializer.data)

    @detail_route(methods=['get'])
    def passwordviewseen(self, request, pk=None):
        queryset = MyUser.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        queryset = Candidate.objects.all()
        candidate = get_object_or_404(queryset, user=user)
        candidate.password_view_seen_timestamp = datetime.datetime.now()
        candidate.save()
        serializer = CandidateSerializer(candidate)
        return Response(serializer.data)

    @detail_route(methods=['post'])
    def password(self, request, pk=None):
        queryset = MyUser.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        user.set_password(request.data['password'])
        user.save()
        queryset = Candidate.objects.all()
        candidate = get_object_or_404(queryset, user=user)
        candidate.password_submitted_timestamp = datetime.datetime.now()
        candidate.save()
        serializer = CandidateSerializer(candidate)
        return Response(serializer.data)

    @detail_route(methods=['post'])
    def accomplishments(self, request, pk=None):
        queryset = MyUser.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        queryset = Candidate.objects.all()
        candidate = get_object_or_404(queryset, user=user)
        candidate.accomplishments_submitted_timestamp = datetime.datetime.now()
        candidate.status = request.data['status']
        candidate.accomplishments = request.data['accomplishments']
        candidate.save()
        serializer = CandidateSerializer(candidate)
        return Response(serializer.data)
