from django.conf.urls import include, url, patterns
from django.contrib import admin
from rest_framework.routers import SimpleRouter
from apiapp import views

router = SimpleRouter(trailing_slash=False)
# router.register(r'candidates', views.PatientViewSet)

urlpatterns = patterns(
    '',
    url(r'^', include(router.urls)),
    url(r'^$', views.NoDataView.as_view()),  # root
    # url(r'^api-token-auth', 'rest_framework_jwt.views.obtain_jwt_token'),
    # url(r'^api-token-refresh', 'rest_framework_jwt.views.refresh_jwt_token'),
    url(r'^admin', include(admin.site.urls)),
)
