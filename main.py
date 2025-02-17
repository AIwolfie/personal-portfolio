from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/submit', methods=['POST'])
def submit():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')

    if name and email and message:
        return jsonify({"success": True, "message": f"Thank you, {name}! Your message has been sent."})
    else:
        return jsonify({"success": False, "message": "Please fill in all fields."})


if __name__ == '__main__':
    app.run(debug=True)
