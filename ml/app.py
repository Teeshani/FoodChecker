from flask import Flask, request, jsonify, send_from_directory
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the model and encoders
with open("food_compliance.pkl", "rb") as file:
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


@app.route("/predict/packing-images/<path:filename>")
def static_files(filename):
    return send_from_directory("packing-images", filename)


@app.route('/favicon.ico')
def favicon():
    return '', 204  # Return No Content for the favicon request


@app.route("/predict", methods=["POST"])
def predict():
    input_data = request.json
    try:
        
        # Check if travel_time exists in trained labels
        if input_data["travel_time"] not in le_travel_time.classes_:
            return jsonify({"error": f"Unknown travel_time: {input_data['travel_time']}. Available: {list(le_travel_time.classes_)}"}), 400
        
        # Transform input features
        category = le_category.transform([input_data["category"]])[0]
        food_item = le_food_item.transform([input_data["food_item"]])[0]
        travel_time = le_travel_time.transform([input_data["travel_time"]])[0]
        cooking_status = le_cooking_status.transform([input_data["cooking_status"]])[0]
        quantity = le_quantity.transform([input_data["quantity"]])[0]

        # Prepare feature array
        features = [[category, food_item, travel_time, cooking_status, quantity]]

        # Predict compliance status
        predictions = model.predict(features)

        # Extract predictions
        compliance_status = predictions[0]

        # Decode predictions
        compliance_status = le_compliance_status.inverse_transform([compliance_status])[0]

        # Get additional details based on food item
        special_packing_required = le_special_packing_required.inverse_transform([food_item])[0]
        packing_guidelines = le_packing_guidelines.inverse_transform([food_item])[0]
        image_url = le_image_url.inverse_transform([food_item])[0]

        # Prepend base URL for images
        base_url = "http://127.0.0.1:5000/predict/"
        if not image_url.startswith("http"):
            image_url = base_url + image_url if image_url else base_url + "0011.jpg"

        # Return predictions as JSON
        return jsonify(
            {
                "Compliance Status": compliance_status,
                "Special Packing Required": special_packing_required,
                "Packing Guidelines": packing_guidelines,
                "Image URL": image_url,
            }
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)
