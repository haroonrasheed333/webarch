
from mrjob.job import MRJob
import json
import csv
import sys

fdata = open('browaction.out', 'w')
csv_writer1 = csv.writer(fdata)

class BrowserAgentAction(MRJob):

    def mapper(self, line_no, line):
        jsondec = json.loads(line)

        action = jsondec['Action']
        useragent = jsondec['useragent']

        if (useragent.find('Firefox') > -1):
            browser = 'Firefox'
        elif (useragent.find('Chrome') > -1):
            browser = 'Chrome'
        elif (useragent.find('Safari') > -1):
            browser = 'Safari'
        elif (useragent.find('MSIE') > -1):
            browser = 'IE'
        else:
            browser = 'Others'

        browser_action = (browser, action)
        yield browser_action,1

    def reducer(self, browser_action, action_counts):
        total = sum(action_counts)
        csv_writer1.writerow((browser_action, total))
        yield browser_action, total

if __name__ == '__main__':
    BrowserAgentAction.run()
