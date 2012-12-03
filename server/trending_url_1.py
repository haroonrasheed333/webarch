
import sys
import operator
import csv
from sys import stdout
from trending_url import TrendingURLs
import datetime

def main():

    urlToday = []
    csv_writer = csv.writer(stdout)
    urlYest = []
    percChange = []

    today = str(datetime.datetime.now().date())
    yesterday = str((datetime.datetime.now() - datetime.timedelta(1)).date())

    trending_url = TrendingURLs([sys.argv[1]])
    with trending_url.make_runner() as runner:
        runner.run()
        for line in runner.stream_output():
            key_value = trending_url.parse_output_line(line)
            logdate = key_value[0][0].split()[0]

            if (logdate == today):
                urlToday.append(key_value)
            elif (logdate == yesterday):
                urlYest.append(key_value)

    i = 0
    while(i<len(urlToday)):
        j = 0
        while(j<len(urlYest)):
            if (urlToday[i][0][1] == urlYest[j][0][1]):
                pChange = ((urlToday[i][1] - urlYest[j][1]) * 100) / (urlYest[j][1])
                percChange.append([urlToday[i][0][1], pChange])
            j = j + 1
        i = i + 1

    percChangeSort = sorted(percChange, key=operator.itemgetter(1), reverse=True)

    print percChangeSort

if __name__ == '__main__':
    main()
