from flask import Flask, render_template, request, jsonify
import urllib.parse
import os
import re
import bleach  
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from markupsafe import escape

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

# Rate limiter (prevent spam)
limiter = Limiter(key_func=get_remote_address)
limiter.init_app(app) 

# Load WhatsApp number from environment variable
WHATSAPP_NUMBER = os.getenv("WHATSAPP_NUMBER", "916352191121")  # Replace with your number in .env

# Allowed tags and attributes (bleach will strip everything else)
ALLOWED_TAGS = []
ALLOWED_ATTRS = {}

@app.route('/space-y-4', methods=['POST'])
@limiter.limit("5 per minute")  # Rate limit applied
def submit():
    name = request.form.get('name', '').strip()
    email = request.form.get('email', '').strip()
    message = request.form.get('message', '').strip()

    # Basic input validation
    if not name or not email or not message:
        return jsonify({"success": False, "message": "All fields are required."})

    # Validate email format using regex
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    if not re.match(email_regex, email):
        return jsonify({"success": False, "message": "Invalid email format."})

    # Limit input lengths to prevent abuse
    if len(name) > 50:
        return jsonify({"success": False, "message": "Name is too long (max 50 characters)."})
    if len(email) > 100:
        return jsonify({"success": False, "message": "Email is too long (max 100 characters)."})
    if len(message) > 500:
        return jsonify({"success": False, "message": "Message is too long (max 500 characters)."})

    # **XSS & HTML Injection Protection**
    name = escape(bleach.clean(name, tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRS))  # Strip all HTML
    email = escape(bleach.clean(email, tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRS))  # Strip all HTML
    message = escape(bleach.clean(message, tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRS))  # Strip all HTML

    # Encode message for WhatsApp
    whatsapp_message = f"New Contact Form Submission:\n\nName: {name}\nEmail: {email}\nMessage:\n{message}"
    encoded_message = urllib.parse.quote(whatsapp_message)

    # Generate secure WhatsApp link
    whatsapp_link = f"https://api.whatsapp.com/send?phone={WHATSAPP_NUMBER}&text={encoded_message}"

    return jsonify({
        "success": True,
        "message": f"Thank you, {name}! Click the link to send your message on WhatsApp.",
        "whatsapp_link": whatsapp_link
    })

if __name__ == '__main__':
    app.run(debug=True)