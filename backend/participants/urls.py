from django.urls import path
from . import views

urlpatterns = [
    path('participant/', views.get_participant_by_linkedin, name='get_participant'),
]
