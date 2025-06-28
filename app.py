"""
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json.get('message')

        if not user_message:
            return jsonify({'error': 'No message provided'}), 400
        
        ai_response = get_ai_response(user_message)

        return jsonify({
            'response': ai_response,
            'status': 'success'
        })
    
    except Exception as e:
            return jsonify({
                 'error': str(e),
                 'status': 'error'
            }), 500

def get_ai_response(message):
    url = "https://ai.hackclub.com/chat/completions"

    headers = {
          'Content-Type': 'application/json'
     }

    data = {
          "messages": [
               {'role': "user", 'content': message}
          ]
     }

    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()

        ai_message = response.json()['choices'][0]['message']['content']
        return ai_message
    except requests.exceptions.RequestException as e:
        return f"Sorry, I'm having trouble connecting to the AI Service. Error: {str(e)}"
    except KeyError:
         return "Sorry, I received an unexpected response from the AI Service"

if __name__ == '__main__':
     app.run(debug=True, port=5000)
"""