from django.urls import path
from .views import RegisterView, FlashcardView, QuizView, Chat # We'll create this view next

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('uploadFlashCard/', FlashcardView.as_view(), name='uploadFlashCard'),
    path('uploadQuiz/', QuizView.as_view(), name='uploadQuiz'),
    path('chat/', Chat.as_view(), name='chat'),
]

