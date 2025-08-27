import os
from pypdf import PdfReader
import openai
import json
import ast
from dotenv import load_dotenv
import time
import sys
import threading


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
    cardNum = int(input("Enter the number of flashcards you want: "))

    # Get responce from a LLM's api in dicitionary form
    flashCards = response(text, cardNum)
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


def response(text, cardNum):
    # Get LLM's responce from here
    # https://openrouter.ai/api/v1
    API_KEY = os.getenv('API_KEY') # Provided by your model host
    BASE_URL = "https://openrouter.ai/api/v1"  # The base URL for your model's API

    stop_event = threading.Event()

    loading_thread = threading.Thread(target=animate_loading, args=(stop_event,))
    loading_thread.start()

    prompt = "Make a flashcards on the given text, make it such that it will be in a python dictonary, the key will be the questions and the value will be the answers, do not output anything other then the dictonary" + text
    client = openai.OpenAI(
        api_key=API_KEY,
        base_url=BASE_URL  
    )

    # 3. Define the chat conversation
    model_name = "gpt-oss-20b"

    messages = [
        {"role": "system", "content": f"You are making notes from a text file, you only output a python dictionary Make about {cardNum} flashcards + or - 3. Also don't give the output in ```python code ```. Do not make any mistakes on the syntax of the dict pleaseee"},
        {"role": "user", "content": prompt}
    ]
    try:

        response = client.chat.completions.create(
            model=model_name,
            messages=messages,
            temperature=0.7,      
            top_p=1,              
        )
        stop_event.set()
        loading_thread.join()  # Wait for the animation thread to finish
        
        # Clear the loading line and print success message
        sys.stdout.write('\r' + ' ' * 50 + '\r')  # Clear the line
        print("Notes generated successfully!")

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

def animate_loading(event):
    """Function to run in a separate thread to show loading animation."""
    frames = ['.  ', '.. ', '...', '   ']  # Animation frames
    while not event.is_set():
        for frame in frames:
            # Use '\r' to return to the start of the line and overwrite
            sys.stdout.write(f'\rGenerating Notes {frame}')
            sys.stdout.flush()
            time.sleep(0.5)  # Control animation speed
            if event.is_set():
                break

# calling the main function
if __name__ == "__main__":
    main()