# app.py
import os
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import google.generativeai as genai

basedir = os.path.abspath(os.path.dirname(__file__))
print(f"Base directory: {basedir}")  # Debug print
app = Flask(__name__, template_folder=os.path.join(basedir, 'templates'))
CORS(app)

# IMPORTANT: Ensure GEMINI_API_KEY is set as an environment variable
# For local development, you might set it in your shell:
# export GEMINI_API_KEY='YOUR_GEMINI_API_KEY_HERE'
# Or in PyCharm Run Configuration.
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')

if not GEMINI_API_KEY:
    print("Error: GEMINI_API_KEY environment variable not set.")
    print("Please set it in your PyCharm Run Configuration or system environment.")
    # In a production environment, you might want to raise an error or exit.

genai.configure(api_key=GEMINI_API_KEY)
# Using gemini-2.0-flash as per your frontend's request
model = genai.GenerativeModel('gemini-2.0-flash')

# app.py
@app.route('/generate-text', methods=['POST'])
def generate_text():
    try:
        data = request.json
        if not data or 'prompt' not in data:
            return jsonify({"error": "Missing prompt"}), 400

        response = model.generate_content(data['prompt'])

        if response.candidates and response.candidates[0].content.parts:
            generated_text = response.candidates[0].content.parts[0].text
            return jsonify({"generatedText": generated_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

PAGE_TITLE = "Welcome to My Website"

@app.route('/')
def render_home_page():
    print(f"Attempting to render template: MAD.html")  # Debug print
    return render_template('MAD.html', title=PAGE_TITLE)

if __name__ == '__main__':
    # When running locally, Flask defaults to 127.0.0.1:5000
    # For deployment, the PORT environment variable is often used.
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000))) # Changed default port to 5000
