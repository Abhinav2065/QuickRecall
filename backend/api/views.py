from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .serializers import RegisterSerializer 
from rest_framework.views import APIView
from PyPDF2 import PdfReader
from io import BytesIO
import openai
import ast
import os

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)  # Allow anyone to register
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": RegisterSerializer(user, context=self.get_serializer_context()).data,
            "message": "User created successfully."
        }, status=status.HTTP_201_CREATED)



class FlashcardView(APIView):
    permission_classes = []  # Allow unauthenticated for now; change to [IsAuthenticated] later

    def post(self, request):
        if 'file' not in request.FILES or 'cardNum' not in request.data:
            return Response({"error": "Missing file or cardNum."}, status=status.HTTP_400_BAD_REQUEST)

        uploaded_file = request.FILES['file']
        card_num = int(request.data.get('cardNum'))
        file_name = uploaded_file.name.lower()

        if not file_name.endswith('.pdf'):
            return Response({"error": "Only PDF files are supported."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Extract text from PDF
            file_content = uploaded_file.read()
            pdf_reader = PdfReader(BytesIO(file_content))
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"

            # Generate flashcards
            flash_cards = self.generate_flashcards(text, card_num)
            if not flash_cards:
                return Response({"error": "Failed to generate flashcards."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({
                "extracted_text": text.strip(),
                "flashcards": flash_cards
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": f"Error processing file: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def generate_flashcards(self, text, card_num):
        
        API_KEY = os.getenv('API_KEY')
        BASE_URL = "https://openrouter.ai/api/v1"
        model_name = "gpt-oss-20b"

        client = openai.OpenAI(api_key=API_KEY, base_url=BASE_URL)
        prompt = f"Make a flashcards on the given text, make it such that it will be in a python dictionary, the key will be the questions and the value will be the answers, do not output anything other than the dictionary: {text}"

        try:
            response = client.chat.completions.create(
                model=model_name,
                messages=[
                    {"role": "system", "content": f"You are making notes from a text file, you only output a python dictionary. Make about {card_num} flashcards. Also don't give the output in ```python code ```. Do not make any mistakes on the syntax of the dict pleaseee"},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                top_p=1,
            )
            # Convert string response to dictionary
            flash_cards = ast.literal_eval(response.choices[0].message.content)
            return flash_cards
        except (openai.APIError, openai.APIConnectionError, openai.RateLimitError, ValueError) as e:
            print(f"Error generating flashcards: {str(e)}")
            return None


class Chat(APIView):
    
    def post(self, request):
        question = request.data.get('question')
        return question


    def get_chat(self, text):
        API_KEY = os.getenv('API_KEY')
        BASE_URL = "https://openrouter.ai/api/v1"
        model_name = "gpt-oss-20b"

        client = openai.OpenAI(api_key=API_KEY, base_url=BASE_URL)
        prompt = f"You are a AI tutor, you are helping a student with his/her question regarding any subject. This is the question {text}"

        try:
            response = client.chat.completions.create(
                model=model_name,
                messages=[
                    {"role": "system", "content": f"Answer the question as if you are a AI tutor."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                top_p=1,
            )
            return flash_cards
        except (openai.APIError, openai.APIConnectionError, openai.RateLimitError, ValueError) as e:
            print(f"Error generating chat: {str(e)}")
            return None



class QuizView(APIView):
     # Allow unauthenticated for now; change to [IsAuthenticated] later

    def post(self, request):
        if 'file' not in request.FILES or 'cardNum' not in request.data:
            return Response({"error": "Missing file or cardNum."}, status=status.HTTP_400_BAD_REQUEST)

        uploaded_file = request.FILES['file']
        card_num = int(request.data.get('cardNum'))
        file_name = uploaded_file.name.lower()

        if not file_name.endswith('.pdf'):
            return Response({"error": "Only PDF files are supported."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Extract text from PDF
            file_content = uploaded_file.read()
            pdf_reader = PdfReader(BytesIO(file_content))
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"

            # Generate flashcards
            flash_cards = self.generate_flashcards(text, card_num)
            if not flash_cards:
                return Response({"error": "Failed to generate quiz."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({
                "extracted_text": text.strip(),
                "flashcards": flash_cards
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": f"Error processing file: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def generate_flashcards(self, text, card_num):
        API_KEY = os.getenv('API_KEY')
        BASE_URL = "https://openrouter.ai/api/v1"
        model_name = "gpt-oss-20b"

        client = openai.OpenAI(api_key=API_KEY, base_url=BASE_URL)
        list_ex = [
        {
            "question": "What is the capital of France?",
            "options": ["Paris", "London", "Berlin", "Madrid"],
            "correct_answer": "Paris",
            "explanation": "Paris is the capital city of France."
        },
        {
            "question": "What is 2 + 2?",
            "options": ["3", "4", "5", "6"],
            "correct_answer": "4",
            "explanation": "Basic arithmetic: 2 + 2 equals 4."
        }
        ]
        prompt = f"Make a quiz on the given text, make it such that it will be in a python list of dictnary, Here is an Exaomple of the list u need to display {list_ex}: {text}"

        try:
            response = client.chat.completions.create(
                model=model_name,
                messages=[
                    {"role": "system", "content": f"You are making quiz from a text file, you only output a python list example list this{list_ex}. Make about {card_num} quizes. Also don't give the output in ```python code ```. Do not make any mistakes on the syntax of the dict pleaseee"},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                top_p=1,
            )
            # Convert string response to dictionary
            flash_cards = ast.literal_eval(response.choices[0].message.content)
            return flash_cards
        except (openai.APIError, openai.APIConnectionError, openai.RateLimitError, ValueError) as e:
            print(f"Error generating quiz: {str(e)}")
            return None