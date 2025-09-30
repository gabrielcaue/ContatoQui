from rest_framework import serializers
from .models import Participant, Skill

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['name', 'level', 'category']

class ParticipantSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    
    class Meta:
        model = Participant
        fields = ['name', 'company', 'area', 'linkedin_url', 'photo_url', 'skills']
