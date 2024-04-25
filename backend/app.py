import pickle

import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS
from requests import Response
# from sklearn.metrics._scorer import PredictScorer
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
CORS(app)

crop_scaler = pickle.load(open('./model/crop_scaler.pkl','rb'))
model = pickle.load(open('./model/crop_recommendation_model.pkl', 'rb'))

fertilizer_scaler = pickle.load(open('./model/combine_scal.pkl','rb'))
fertilizer_recommendation_model = pickle.load(open('./model/fertilizer_recommendation_model_new_12.pkl','rb'))


@app.route('/crops', methods = ['POST'])
def cropRecommender():
    data = request.get_json()
    print(data)

    N, P, K = data['N'], data['P'], data['K']
    temperature = data['temperature']
    humidity = data['humidity']
    pH = data['pH']
    rainfall = data['rainfall']
    features = [int(N), int(P), int(K), float(temperature), float(humidity), float(pH), float(rainfall)]
    label = model.predict(crop_scaler.transform([features]))
    return jsonify({"crop": label[0]})

@app.route('/fertilizer', methods = ['POST'])
def fertilizerRecommender():
    sc = StandardScaler()
    data = request.get_json()
    print(data)

    N, P, K = data['N'], data['P'], data['K']
    temperature = data['temperature']
    humidity = data['humidity']
    moisture = data['moisture']
    soiltype = data['soiltype']
    croptype = data['croptype']
    
    features = [[int(temperature),int(humidity),int(moisture),int(soiltype),int(croptype),int(N),int(K),int(P)]]
    # finalfeatures = np.array(features)
    # print("final features- ",fertilizer_scaler.transform(features))
    
    # label = fertilizer_recommendation_model_old.predict(finalfeatures)
    predictions = fertilizer_recommendation_model.predict(fertilizer_scaler.transform(features))
    # print(predictions[0])
    # return jsonify({"fertilizer": int(predictions[0])})
    predictions_list = predictions.tolist()
    first_prediction = int(predictions_list[0][0]*100)
    # print(first_prediction)
    print(predictions_list)
    
    # Return the list of predictions
    return jsonify({"fertilizer": first_prediction})

#new Feature


app.after_request
def after_request(response: Response) -> Response:
    response.access_control_allow_origin = "*"
    return response

if __name__ == '__main__':
    app.run(port=5000, debug=True)   