from timeline_tweets import get_tweets
from datetime import datetime
import flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin

app = flask.Flask(__name__)
# app.config["DEBUG"] = True
# cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

def is_valid_date(dateStr):
    try:
        d = datetime.strptime(dateStr,'%m/%d/%Y').date()
        return d
    except:
        return False

@app.route('/', methods=['GET'])
def home():
    return '''<h1>Gun2Head python API</h1>'''


# A route to return all of the available entries in our catalog.
@app.route('/api/v1/tweets', methods=['GET'])
@cross_origin()
def tweet_timeline():
    if 'site' in request.args:
        site = request.args['site']
    else:
        return "No site specified"
    if 'to' in request.args and 'from' in request.args:
        to = is_valid_date(request.args['to'])
        fromDate =  is_valid_date(request.args['from'])
        if to is False and fromDate is False:
            return 'Invalid date format'
    else:
        return 'Error No to and from specified'
    splitstr = site.split(',')
    # do all
    tweetList = []
    for i in splitstr:
        dataObj = {}
        dataObj['site'] = i
        dataObj['feed'] = get_tweets(i,since=fromDate.strftime('%Y-%m-%d'), until=to.strftime('%Y-%m-%d'))
        tweetList.append(dataObj)
    return jsonify(tweetList)
    
if __name__ == '__main__':
    app.run(threaded=True, port=5000)