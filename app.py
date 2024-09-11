from flask import Flask, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app = Flask(__name__)

@app.route('/api/joke')
def get_joke():
    url = 'https://v2.jokeapi.dev/joke/Any?lang=pt'
    try:
        response = requests.get(url)
        response.raise_for_status()
        joke_data = response.json()
        if 'joke' in joke_data:
            return jsonify({'joke': joke_data['joke']})
        elif 'setup' in joke_data and 'delivery' in joke_data:
            return jsonify({'joke': f"{joke_data['setup']} - {joke_data['delivery']}"})
        else:
            return jsonify({'joke': 'Não foi possível encontrar uma piada.'})
    except requests.RequestException as e:
        return jsonify({'joke': 'Erro ao buscar piada. Tente novamente.'}), 500

if __name__ == '__main__':
    app.run(debug=True)

