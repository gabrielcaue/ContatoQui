from django.contrib import admin
from .models import Participant, Skill

class SkillInline(admin.TabularInline):
    model = Skill
    extra = 3

@admin.register(Participant)
class ParticipantAdmin(admin.ModelAdmin):
    list_display = ['name', 'company', 'area']
    search_fields = ['name', 'company', 'area']
    inlines = [SkillInline]

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['participant', 'name', 'level', 'category']
    list_filter = ['category', 'level']
    search_fields = ['name', 'participant__name']
