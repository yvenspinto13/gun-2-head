from transformers import T5Tokenizer, T5ForConditionalGeneration
import re
import flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin
model = T5ForConditionalGeneration.from_pretrained('t5-small')
tokenizer = T5Tokenizer.from_pretrained('t5-small')

def get_summary(tweet_data):
    text = " ".join(tweet_data)
    TEXT_CLEANING_RE = "@\S+|https?:\S+|http?:\S|[^A-Za-z0-9]+"
    text = re.sub(TEXT_CLEANING_RE, ' ', str(text).lower()).strip()
    Preprocessed_text = "summarize: "+text
    tokens_input = tokenizer.encode(Preprocessed_text,return_tensors="pt", max_length=512, truncation=True)
    summary_ids = model.generate(tokens_input,
                                min_length=60,
                                max_length=250,
                                length_penalty=4.0)

    summary = tokenizer.decode(summary_ids[0])
    cleanr = re.compile('<.*?>')
    summary = re.sub(cleanr, '', summary)
    print(summary)
    return summary

app = flask.Flask(__name__)
# app.config["DEBUG"] = True
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

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
        summary = {}
        summary['text'] = get_summary(tweet_data)
        return jsonify(summary)

if __name__ == '__main__':
    app.run(threaded=True, port=5001)