from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import json
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load model safely
model_path = os.path.join(BASE_DIR, "loan_model.pkl")
columns_path = os.path.join(BASE_DIR, "columns.json")

if not os.path.exists(model_path):
    raise Exception("Model file not found!")

if not os.path.exists(columns_path):
    raise Exception("Columns file not found!")

model = joblib.load(model_path)

with open(columns_path, "r") as f:
    columns = json.load(f)

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