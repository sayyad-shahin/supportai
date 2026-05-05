import json

with open('data/faq.json', 'r') as file:
    faq_data = json.load(file)


def get_bot_response(user_message):

    user_message = user_message.lower()

    for key in faq_data:
        if key in user_message:
            return faq_data[key]

    return "Sorry, I couldn't understand your question. Please try again."