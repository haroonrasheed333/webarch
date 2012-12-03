
from mrjob.job import MRJob
import json

class TrendingURLs(MRJob):

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
    TrendingURLs.run()
