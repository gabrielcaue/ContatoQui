from django.db import models

class Participant(models.Model):
    name = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    area = models.CharField(max_length=200)
    linkedin_url = models.URLField(unique=True)
    photo_url = models.URLField(blank=True, null=True)
    
    def __str__(self):
        return self.name

class Skill(models.Model):
    participant = models.ForeignKey(Participant, related_name='skills', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    level = models.IntegerField(choices=[(i, i) for i in range(1, 6)])  # 1-5 scale
    category = models.CharField(max_length=50, choices=[
        ('language', 'Programming Language'),
        ('framework', 'Framework'),
        ('engine', 'Game Engine'),
        ('tool', 'Tool'),
    ])
    
    def __str__(self):
        return f"{self.participant.name} - {self.name} ({self.level})"
