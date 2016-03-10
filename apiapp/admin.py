from django.contrib import admin
from apiapp.models import MyUser, Candidate, List, Distinction, CandidateDistinction

class CandidateDistinctionInline(admin.TabularInline):
    model = CandidateDistinction
    extra = 3 # how many rows to show


class MyUserInline (admin.TabularInline):
	model = Candidate

class CandidateAdmin(admin.ModelAdmin):
    inlines = (CandidateDistinctionInline,)
    list_display = admin.ModelAdmin.list_display + ("list", "score", "current_company", "current_title", "linkedin_url", "visible", "status", "accomplishments", "preclaim_view_seen", "password_view_seen_timestamp", "password_submitted_timestamp", "accomplishments_submitted_timestamp", )
    list_editable = admin.ModelAdmin.list_editable + ("list", "score", "current_company", "current_title", "linkedin_url", "visible", "status", "accomplishments", "preclaim_view_seen", "password_view_seen_timestamp", "password_submitted_timestamp", "accomplishments_submitted_timestamp", )

class MyUserAdmin(admin.ModelAdmin):
    inlines = (MyUserInline,)

admin.site.register(MyUser, MyUserAdmin)
admin.site.register(List)
admin.site.register(Distinction)
admin.site.register(Candidate, CandidateAdmin)

# Register your models here.
