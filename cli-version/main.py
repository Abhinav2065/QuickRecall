import os
from pypdf import PdfReader
import openai
import json
import ast
from dotenv import load_dotenv



load_dotenv()


# Welcome Text Before Running the program
def welcome():
    print("Welome tomain() AI Flashcard Generator! Get your flashcards for your next test today! ")


# The main Function
def main():
    
    welcome()

    # PDF file input
    file = "pdf.pdf"

    #Extracted Text from the pdf file
    text = readText(file) 

    # Get responce from a LLM's api in dicitionary form
    flashCards = response(text)
    # print(flashCards)

    flashCards = ast.literal_eval(flashCards) #converting string into dict

    
    # Show the flash cards
    displayFlashCards(flashCards)



def readText(file):
    # Read the texts from the pdf file
    reader = PdfReader(file)
    text = ""
    for i in range(len(reader.pages)):
        page = reader.pages[i]
        text = text + page.extract_text()
    
    return text


def response(text):
    # Get LLM's responce from here
    # https://openrouter.ai/api/v1
    API_KEY = os.getenv('API_KEY') # Provided by your model host
    BASE_URL = "https://openrouter.ai/api/v1"  # The base URL for your model's API

    prompt = "Make a flashcards on the given text, make it such that it will be in a python dictonary, the key will be the questions and the value will be the answers, do not output anything other then the dictonary" + text
    client = openai.OpenAI(
        api_key=API_KEY,
        base_url=BASE_URL  # This is the crucial part for using a non-OpenAI endpoint
    )

    # 3. Define the chat conversation
    # The model name ('gpt-oss-20b') might also be specific to your host. Check their documentation.
    model_name = "gpt-oss-20b"

    messages = [
        {"role": "system", "content": "You are making notes from a text file, you only output a python dictionary Make about 10 flashcards +-3. Also don't give the output in ```python code ```. Do not make any mistakes on the syntax of the dict pleaseee"},
        {"role": "user", "content": prompt}
    ]
    try:

        response = client.chat.completions.create(
            model=model_name,
            messages=messages,
            temperature=0.7,      # Controls randomness: lower = more deterministic
            top_p=1,              # Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.
        )

    # 5. Print the response
        return response.choices[0].message.content
    # Handle potential errors (e.g., authentication, server down)
    except openai.APIConnectionError as e:
        print("Server connection error: {}".format(e))
    except openai.APIError as e:
        print("API error: {}".format(e))
    except openai.RateLimitError as e:
        print("Rate limit error: {}".format(e))

    return 0



def displayFlashCards(cards):
    #Display Flash cards
    for key in cards: # Looping through the cards
        print(key)
        flag = input("Press any key to Show Answer: ") #waiting for the user to think the answer
        print(cards[key]) # printing when they are ready


# calling the main function
if __name__ == "__main__":
    main()