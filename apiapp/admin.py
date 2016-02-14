from django.contrib import admin
from apiapp.models import MyUser, Candidate, List


class CandidateAdmin(admin.ModelAdmin):
    list_display = admin.ModelAdmin.list_display + ("list", "rank", "current_company", "current_title", "linkedin_url", "visible", "status", "accomplishments", "preclaim_view_seen", "password_view_seen_timestamp", "password_submitted_timestamp", "accomplishments_submitted_timestamp", )
    list_editable = admin.ModelAdmin.list_editable + ("list", "rank", "current_company", "current_title", "linkedin_url", "visible", "status", "accomplishments", "preclaim_view_seen", "password_view_seen_timestamp", "password_submitted_timestamp", "accomplishments_submitted_timestamp", )

admin.site.register(MyUser)
admin.site.register(List)
admin.site.register(Candidate, CandidateAdmin)

# Register your models here.
