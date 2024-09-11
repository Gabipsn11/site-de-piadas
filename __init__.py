from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/api/joke', methods=['GET'])
def get_joke():

    joke = {
        "type": "single",
        "joke": "Por que o livro de matemática se suicidou? Porque tinha muitos problemas."
    }
    return jsonify(joke)

if __name__ == '__main__':
    app.run(debug=True)
