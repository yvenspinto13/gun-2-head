import snscrape.modules.twitter as sntwitter
import pandas as pd
from datetime import datetime
from download import download

folder = './archives/'
# site = 'prudentgoa'
# site = 'goanewshub'
site = 'InGoa24x7'

# Creating list to append tweet data to
tweets_list2 = []

# Using TwitterSearchScraper to scrape data and append tweets to list
#last ran date 2021-05-03
for i,tweet in enumerate(sntwitter.TwitterSearchScraper('from:' + site +' since:2021-01-01 until:2021-05-03').get_items()):
    # if i>500:
    #     break
    tweets_list2.append([tweet.date, tweet.id, tweet.content, tweet.user.username, tweet.media])

# Now download the media
for i,t in enumerate(tweets_list2):
    print(t)
    #  datetime.strptime(date_time_str.replace('+00:00',''), '%Y-%m-%d %H:%M:%S')
    date_dir = folder + site + '/' + str(t[0].date()) 
    for fls in t[4] or []:
        if type(fls) == sntwitter.Photo:
            download(fls.fullUrl, date_dir, str(i))



# Creating a dataframe from the tweets list above
tweets_df2 = pd.DataFrame(tweets_list2, columns=['Datetime', 'Tweet Id', 'Text', 'Username', 'Media'])
with open(folder + site + '/cummulative.csv', 'a') as f:
    tweets_df2.to_csv(f, header=f.tell() == 0)
