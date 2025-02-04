from flask import Flask, request, jsonify, send_from_directory
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

# Load the model and encoders
with open('food_checker.pkl', 'rb') as file:
    data = pickle.load(file)

model = data["model"]
le_category = data["le_category"]
le_food_item = data["le_food_item"]
le_travel_time = data["le_travel_time"]
le_cooking_status = data["le_cooking_status"]
le_quantity = data["le_quantity"]
le_compliance_status = data["le_compliance_status"]
le_special_packing_required = data["le_special_packing_required"]
le_packing_guidelines = data["le_packing_guidelines"]
le_image_url = data["le_image_url"]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json
        print("Received input:", input_data)
        

        # Transform input features safely
        category = le_category.transform([input_data["category"]])[0].astype(int)
        food_item = le_food_item.transform([input_data["food_item"]])[0].astype(int)
        travel_time = le_travel_time.transform([input_data["travel_time"]])[0].astype(int)
        cooking_status = le_cooking_status.transform([input_data["cooking_status"]])[0].astype(int)
        quantity = le_quantity.transform([input_data["quantity"]])[0].astype(int)

        # Prepare feature array
        features = np.array([[category, food_item, travel_time, cooking_status, quantity]])

        # Ensure model prediction output is integer
        predictions = model.predict(features)[0].astype(int)

        # Extract predictions properly
        compliance_status_pred, special_packing_pred, packing_guidelines_pred, image_url_pred = predictions

        # Decode predictions correctly
        compliance_status = le_compliance_status.inverse_transform([compliance_status_pred])[0]
        special_packing_required = le_special_packing_required.inverse_transform([special_packing_pred])[0]
        packing_guidelines = le_packing_guidelines.inverse_transform([packing_guidelines_pred])[0]
        image_url = le_image_url.inverse_transform([image_url_pred])[0]

        # Construct full image URL
        # base_url = "http://127.0.0.1:5000/predict/"
        # if not image_url.startswith("http"):
        #     image_url = base_url + image_url if image_url else base_url + "default.jpg"

        # Return predictions
        return jsonify({
            "Compliance_Status": compliance_status,
            "Special_Packing_Required": special_packing_required,
            "Packing_Guidelines": packing_guidelines,
            "Image_URL": image_url
        })

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)


