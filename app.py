# app.py
import os
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import google.generativeai as genai

basedir = os.path.abspath(os.path.dirname(__file__))
print(f"Base directory: {basedir}")  # Debug print
app = Flask(__name__, template_folder=os.path.join(basedir, 'templates'))
CORS(app)

GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')

if not GEMINI_API_KEY:
    print("Error: GEMINI_API_KEY environment variable not set.")
    print("Please set it in your PyCharm Run Configuration or system environment.")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

@app.route('/generate-ideas', methods=['POST'])
def generate_ideas():
    if not GEMINI_API_KEY:
        return jsonify({"error": "API key not configured on server."}), 500

    data = request.json
    project_details = data.get('projectDetails')
    service_type = data.get('serviceType')

    if not project_details or not service_type:
        return jsonify({"error": "Missing project details or service type."}), 400

    prompt = f"The user is planning a project for '{service_type}' with the following details: '{project_details}'. Based on this, provide creative and practical ideas, design suggestions, or potential enhancements for their project. Focus on innovative solutions and aesthetic improvements. Keep the response concise and actionable, formatted as a bulleted list."

    try:
        response = model.generate_content(prompt)
        generated_text = response.candidates[0].content.parts[0].text
        return jsonify({"ideas": generated_text})
    except Exception as e:
        print(f"Error calling Gemini API from backend: {e}")
        return jsonify({"error": "Failed to generate ideas from AI."}), 500

PAGE_TITLE = "Welcome to My Website"

@app.route('/')
def render_home_page():
    print(f"Attempting to render template: MAD.html")  # Debug print
    return render_template('MAD.html', title=PAGE_TITLE)

if __name__ == '__main__':
    app.run(debug=True, port=5000)