import os
from pypdf import PdfReader

# Welcome Text Before Running the program
def welcome():
    print("Welome to AI Flashcard Generator! Get your flashcards for your next test today! ")



# The main Function
def main():

    welcome()

    # PDF file input
    file = "pdf.pdf"

    #Extracted Text from the pdf file
    text = readText(file)

    # Get responce from a LLM's api in dicitionary form
    flashCards = response(text)


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
    prompt = "Make a flashcards on the given text, make it such that it will be in a python dictonary, the key will be the questions and the value will be the answers, do not output anything other then the dictonary" + text
    return text


def displayFlashCards(cards):
    #Display Flash cards
    for card in cards: # Looping through the cards
        print(card)
        flag = input("Press any key to Show Answer: ") #waiting for the user to think the answer
        print(cards[card]) # printing when they are ready


# calling the main function
main()