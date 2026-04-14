from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import json

app = Flask(__name__)
CORS(app)    

# Load model + columns
model = joblib.load("loan_model.pkl")
columns = json.load(open("columns.json"))

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