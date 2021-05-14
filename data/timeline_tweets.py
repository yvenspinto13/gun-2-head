import snscrape.modules.twitter as sntwitter
import json

folder = './timeline-tweets/'

def get_media(med):
    obj = {}
    if type(med) == sntwitter.Photo:
        obj['fullUrl']=med.fullUrl
        obj['previewUrl']=med.previewUrl
    if hasattr(med, 'url'):
        obj['url']=med.url
    return obj

def myconverter(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()

def get_tweets(site):
    tweets = []
    for i,tweet in enumerate(sntwitter.TwitterSearchScraper('from:' + site +' since:2021-05-12 until:2021-05-14').get_items()):
        tweetObj = {}
        tweetObj['id'] = tweet.id
        tweetObj['date'] = tweet.date.__str__()
        tweetObj['username'] = tweet.user.username
        tweetObj['content'] = tweet.content
        media = []
        for m in tweet.media or []:
            media.append(get_media(m))
        tweetObj['media'] = media
        tweets.append(tweetObj)
    return tweets

def save_json(site, tweets_df):
    try:
        with open(folder + site + '.json', 'r+') as f:
            f_tweets = json.load(f)
            f.truncate(0)
            res_list = [*f_tweets, *tweets_df]
            # print('\nconcat',res_list)
            f.seek(0)
            json.dump(res_list, f)
    except FileNotFoundError:
        with open(folder + site + '.json', 'w') as f:
            json.dump(tweets_df,f)
    except Exception:
        print('Exception')



for i in ['prudentgoa', 'goanewshub', 'InGoa24x7', 'PrimeTVGoa']:
    tweets = get_tweets(i)
    save_json(i,tweets) 
