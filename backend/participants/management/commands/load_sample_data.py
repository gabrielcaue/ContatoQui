from django.core.management.base import BaseCommand
from participants.models import Participant, Skill

class Command(BaseCommand):
    help = 'Load sample participant data'

    def handle(self, *args, **options):
        # Clear existing data
        Participant.objects.all().delete()
        
        # Sample participants
        participants_data = [
            {
                'name': 'Ana Silva',
                'company': 'GameDev Studio',
                'area': 'Game Developer',
                'linkedin_url': 'https://linkedin.com/in/ana-silva-gamedev',
                'photo_url': 'https://via.placeholder.com/150',
                'skills': [
                    {'name': 'Unity', 'level': 4, 'category': 'engine'},
                    {'name': 'C#', 'level': 5, 'category': 'language'},
                    {'name': 'Blender', 'level': 3, 'category': 'tool'},
                ]
            },
            {
                'name': 'Carlos Santos',
                'company': 'Indie Games',
                'area': 'Technical Artist',
                'linkedin_url': 'https://linkedin.com/in/carlos-santos-artist',
                'photo_url': 'https://via.placeholder.com/150',
                'skills': [
                    {'name': 'Unreal Engine', 'level': 5, 'category': 'engine'},
                    {'name': 'Python', 'level': 4, 'category': 'language'},
                    {'name': 'Maya', 'level': 4, 'category': 'tool'},
                ]
            },
            {
                'name': 'Maria Oliveira',
                'company': 'UFBA',
                'area': 'Game Design Researcher',
                'linkedin_url': 'https://linkedin.com/in/maria-oliveira-research',
                'photo_url': 'https://via.placeholder.com/150',
                'skills': [
                    {'name': 'JavaScript', 'level': 3, 'category': 'language'},
                    {'name': 'React', 'level': 4, 'category': 'framework'},
                    {'name': 'Figma', 'level': 5, 'category': 'tool'},
                ]
            }
        ]
        
        for participant_data in participants_data:
            skills_data = participant_data.pop('skills')
            participant = Participant.objects.create(**participant_data)
            
            for skill_data in skills_data:
                Skill.objects.create(participant=participant, **skill_data)
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully loaded {len(participants_data)} participants')
        )
