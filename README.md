QuickRecall
A web application built with React and Django to assist students in organizing study materials, generating summaries, and leveraging AI-powered tools for efficient learning.
Features

Study Material Management: Upload, organize, and categorize notes or study resources.
AI-Powered Summaries: Generate concise summaries of study content using AI.
Interactive UI: Built with React for a responsive and dynamic user experience.
Backend API: Powered by Django REST Framework for robust data handling.
Secure Authentication: User login and registration with JWT-based authentication.

Tech Stack

Frontend: React, Tailwind CSS, JSX
Backend: Django, Django REST Framework, PostgreSQL
AI Integration: (Specify AI model or API, e.g., Grok API or other)
Deployment: (Specify deployment platform, e.g., Heroku, AWS, or local setup)

Installation

Clone the Repository:
git clone https://github.com/Abhinav2065/AI-flashcard-maker
cd github.com/Abhinav2065/AI-flashcard-maker


Backend Setup:
cd backend
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


Frontend Setup:
cd frontend
npm install
npm start


Environment Variables:

Create a .env file in the backend directory with:SECRET_KEY=your_django_secret_key
DATABASE_URL=your_postgres_url
AI_API_KEY=your_ai_api_key





Usage

Access the app at http://localhost:5173 (React frontend).
Register or log in to manage study materials.
Upload notes or use the AI summarizer to generate concise study aids.

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.

License
MIT License. See LICENSE for more details.
