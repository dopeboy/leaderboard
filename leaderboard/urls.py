from django.conf.urls import include, url, patterns
from django.contrib import admin
from rest_framework.routers import SimpleRouter
from apiapp import views

router = SimpleRouter(trailing_slash=False)
router.register(r'candidates', views.CandidateViewSet, 'Candidate')
router.register(r'lists', views.ListViewSet, 'List')

urlpatterns = patterns(
    '',
    url(r'^', include(router.urls)),
    url(r'^$', views.NoDataView.as_view()),  # root
    url(r'^admin/', include(admin.site.urls)),
    url(r'^claim', views.NoDataView.as_view()),
    url(r'^(?P<location>).+/(?P<list_name>.+)$', views.NoDataView.as_view()),
)
