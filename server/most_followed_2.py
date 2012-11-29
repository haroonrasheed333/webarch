"""This program finds the most followed URLs
This program takes a json log file as input and outputs a
new CSV file with the URLs sorted according to their number of visits.

Run:
    python most_followed_2.py log.txt > url_sort.out
"""
import sys
import operator
import csv
from sys import stdout
from most_followed import URLsMostFollowed

def main():

    urlList = []
    csv_writer = csv.writer(stdout)
    urlListSort = []

    """URLsMostFollowed is defined in most_followed.py. It takes a json data file and outputs URLs (key) and number of hits (value)"""
    mostfoll = URLsMostFollowed([sys.argv[1]])
    with mostfoll.make_runner() as runner:
        runner.run()
        for line in runner.stream_output():
            key_value = mostfoll.parse_output_line(line)
            """urlList will contain all the title words (key) along with the number of hits (value)"""
            urlList.append(key_value)

    """Sort urlList on the number of hits and store it in descending order in urlListSort"""
    urlListSort = sorted(urlList, key=operator.itemgetter(1), reverse=True)

    i = 0

    """Take the top ten items from the sorted list and write it in csv format"""
    while (i < len(urlListSort)):
        csv_writer.writerow(urlListSort[i])
        i=i+1

if __name__ == '__main__':
    main()
