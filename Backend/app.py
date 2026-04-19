from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import json
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

model = joblib.load(os.path.join(os.path.dirname(__file__), "loan_model.pkl"))
columns = json.load(open(os.path.join(os.path.dirname(__file__), "columns.json")))

@app.route('/')
def home():
    return "Loan Prediction API Running"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    # user input dictionary
    input_data = data['data']

    # arrange input in correct order
    features = [input_data[col] for col in columns]

    features = np.array(features).reshape(1, -1)

    prediction = model.predict(features)[0]

    return jsonify({
        "loan_status": int(prediction)
    })

if __name__ == '__main__':
    app.run(debug=True)