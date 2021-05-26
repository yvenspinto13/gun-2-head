import flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin
import Algorithmia
import os
app = flask.Flask(__name__)
# app.config["DEBUG"] = True
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Authenticate with your API key
apiKey = os.environ('ALGO_KEY')

# Create the Algorithmia client object
client = Algorithmia.client(apiKey)
algo = client.algo('gun2head/text_analyze/1.0.1')

@app.route('/', methods=['GET'])
def home():
    return '''<h1>Gun2Head python API</h1><h2><a href="https://goa-covid-accountability.web.app">UI Link</a></h2>'''


@app.route('/api/v1/tweets/summary', methods=['POST'])
@cross_origin()
def generate_summary():
    request_data = request.get_json()
    tweet_data = request_data['tweetData']
    if tweet_data is None:
        return 'Invalid data'
    else:
        try:
            # Get the result  
            summary = algo.pipe(request_data).result
            return jsonify(summary)
        except Exception as error:
            # Algorithm error if, for example, the input is not correctly formatted
            print(error)
            return jsonify(error)

if __name__ == '__main__':
    app.run(threaded=True, port=5001)