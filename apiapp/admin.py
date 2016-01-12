from django.contrib import admin
from apiapp.models import MyUser, Candidate, List

admin.site.register(MyUser)
admin.site.register(List)
admin.site.register(Candidate)

# Register your models here.
