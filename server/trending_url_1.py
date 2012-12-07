"""This program finds the trending URLs
This program takes a json log file as input and prints the trending URLs.
We determine the trending URLs based on the percentage increase in number
of clicks from yesterday
Run:
    python trending_url_1.py log.txt > trending.out
"""
import sys
import operator
from sys import stdout
from trending_url import TrendingURL
import datetime

def getTrendingURL():
    urlToday = []
    urlYest = []
    percChange = []
    urlListSort = []
    today = str(datetime.datetime.now().date())
    yesterday = str((datetime.datetime.now() - datetime.timedelta(1)).date())

    """TrendingURL is defined in trending_url.py. It takes a json data file (log.txt) and outputs [Date, URL] pair (key) and number of clicks (value)"""
    if (len(sys.argv) <2 ):
        trendurl = TrendingURL(['log.txt'])
    else:
        trendurl = TrendingURL([sys.argv[1]])

    with trendurl.make_runner() as runner:
        runner.run()
        for line in runner.stream_output():
            key_value = trendurl.parse_output_line(line)
            logdate = key_value[0][0].split()[0]

            """For each result check the date and store yesterday's and today's results in different lists """
            if (logdate == today):
                urlToday.append(key_value)
            elif (logdate == yesterday):
                urlYest.append(key_value)

    i = 0
    """Compare both today's and yesterday's lists and for each URL calculate the
    percent increase in the number of clicks from yesterday"""
    while(i<len(urlToday)):
        j = 0
        while(j<len(urlYest)):
            if (urlToday[i][0][1] == urlYest[j][0][1]):
                pChange = ((urlToday[i][1] - urlYest[j][1]) * 100) / (urlYest[j][1])
                if (pChange > 0):
                    percChange.append([urlToday[i][0][1], pChange])
            j = j + 1
        i = i + 1

    percChangeSort = sorted(percChange, key=operator.itemgetter(1), reverse=True)

    print percChangeSort

if __name__ == '__main__':
    getTrendingURL()
