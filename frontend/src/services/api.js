const API_BASE_URL = 'http://localhost:8000/api';

export const getParticipantByLinkedIn = async (linkedinUrl) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/participant/?linkedin_url=${encodeURIComponent(linkedinUrl)}`
    );
    
    if (!response.ok) {
      throw new Error('Participant not found');
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};
