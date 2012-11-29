
from mrjob.job import MRJob
import json

class URLsMostFollowed(MRJob):

    def mapper(self, line_no, line):
        jsondec = json.loads(line)

        for i in jsondec:
            if (i == 'URL'):
                url = jsondec['URL']
                yield url,1

    def reducer(self, url, count):
        total = sum(counts)
        yield url, total

if __name__ == '__main__':
    URLsMostFollowed.run()
