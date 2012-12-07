"""Find the number of clicks for an URL on a date

This program takes log file with data in JSON format and outputs date and URL
pairs along with their number of clicks for the URL on that date
This script will be called internally from trending_url_1.py
"""
from mrjob.job import MRJob
import json

class TrendingURL(MRJob):

    def mapper(self, line_no, line):
        jsondec = json.loads(line)

        for i in jsondec:
            if (i == 'URL'):
                url = jsondec['URL']
                logdate = (jsondec['datetime']).split()[0]
                yield [logdate, url],1

    def reducer(self, url, count):
        total = sum(count)
        yield url, total

if __name__ == '__main__':
    TrendingURL.run()
