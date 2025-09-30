from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Participant
from .serializers import ParticipantSerializer
import urllib.parse

@api_view(['GET'])
def get_participant_by_linkedin(request):
    linkedin_url = request.GET.get('linkedin_url')
    
    if not linkedin_url:
        return Response({'error': 'linkedin_url parameter is required'}, 
                       status=status.HTTP_400_BAD_REQUEST)
    
    # Decode URL if it comes encoded from QR code
    linkedin_url = urllib.parse.unquote(linkedin_url)
    
    # Remove query parameters (like ?fromQR=1) to match base URL
    parsed_url = urllib.parse.urlparse(linkedin_url)
    base_url = f"{parsed_url.scheme}://{parsed_url.netloc}{parsed_url.path}"
    
    # Try exact match first, then try with/without trailing slash
    try:
        participant = Participant.objects.get(linkedin_url=base_url)
        serializer = ParticipantSerializer(participant)
        return Response(serializer.data)
    except Participant.DoesNotExist:
        # Try with trailing slash if not present
        if not base_url.endswith('/'):
            try:
                participant = Participant.objects.get(linkedin_url=base_url + '/')
                serializer = ParticipantSerializer(participant)
                return Response(serializer.data)
            except Participant.DoesNotExist:
                pass
        # Try without trailing slash if present
        elif base_url.endswith('/'):
            try:
                participant = Participant.objects.get(linkedin_url=base_url.rstrip('/'))
                serializer = ParticipantSerializer(participant)
                return Response(serializer.data)
            except Participant.DoesNotExist:
                pass
        
        return Response({'error': 'Participant not found'}, 
                       status=status.HTTP_404_NOT_FOUND)
