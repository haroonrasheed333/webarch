#!/usr/bin/env python

import shelve
import random
from subprocess import check_output
import flask
import json
import csv
import datetime
from flask import request
from flask import make_response
from flask import jsonify
from os import environ
from most_followed_2 import mostFollowed
from browser_action import BrowserAgentAction
from trending_url import TrendingURL
from most_followed import URLsMostFollowed
import operator

test ={};
app = flask.Flask(__name__)
app.debug = True

db = shelve.open("shorten.db")

def csv_readline(line):
    """Given a sting CSV line, return a list of strings."""
    for row in csv.reader([line]):
        return row

@app.route('/')
def index():
    """Builds a template based on a GET request, with some default
    arguements"""

    username = ''
    username = request.cookies.get('username')
    useragent = request.headers['User-Agent']


    response = make_response(flask.render_template('index.html'))

    if (username is None) or (username == '') or (username == 'None'):
        username = str(random.randint(1000, 9999))
        app.logger.debug("Cookie: " + username)
        response.set_cookie('username', username)

    logline = json.dumps({'datetime': str(datetime.datetime.now()), 'Action': 'pageload', 'cookie': username, 'useragent': useragent})

    f = open("log.txt", 'a')
    f.write(logline + "\n")
    f.close()

    return response

###
# Now we'd like to do this generally:
# <short> will match any word and put it into the variable =short= Your task is
# to store the POST information in =db=, and then later redirect a GET request
# for that same word to the URL provided.  If there is no association between a
# =short= word and a URL, then return a 404
##/
@app.route("/create", methods=['GET', 'PUT', 'POST'])
def create():
    """Create an association of =short= with the POST arguement =url="""

    # Get the url and shortpath
    url = request.form.get('formurl')
    shorturl = request.form.get('formshortpath')

    # Get the list of keys stored in the shelve db
    list = db.keys()
    app.logger.debug((list))

    j=0
    msg=""
    while j < len(list):
        # Check if the url is already present in the db.
        if db[list[j]] == url:
            shorturl = list[j]
            msg = "Shortpath already exists for the URL. Using the same shortpath"
            j = len(list)
            count=0
            if url in list:
                # Get count for the number of clicks
                count = db[str(url)]
            return flask.render_template('shorturl.html', longURL=url, shortPath=shorturl, message=msg, counts=str(count))
        j=j+1

    # Logic to generate a random word
    # Generate a random number (rand) between 6 and 9
    # Create a list with 26 alphabets
    # Run a while loop rand times
        #Generate a random number between 0 and 25
        #Take the alphabet in the randNumber index of alphList and append it to randomWord

    rand = random.randint(6, 9)
    alphList = map(chr, range(97, 123))
    # map, chr and range are built-in python functions. map applies chr to every integer in range 97 to 123.
    # chr converts a ASCII code in int to its character equivalent. This is same as the line commented below
    # This is same a having a list with alphabets a to z. alphList = ['a', 'b', 'c', .... , 'x', 'y', 'z']
    randomWord=""
    i=0
    while i<rand:
        randNumber = random.randint(0,25)
        randomWord = randomWord + alphList[randNumber]
        i=i+1

    # If the shortpath is not set in the form, then set the shortpath to the random word generated
    if shorturl == "":
        shorturl = randomWord

    # Associate shortpath and url in the db. Shortpath is the key and url is the value.
    db[str(shorturl)] = url

    # Create a new entry in the db with key as url and value 0.
    #This number will be the number of clicks. Each time a shortened url is clicked this value will be incremented.
    db[str(url)] = 0
    ##db.close()

    response = make_response(flask.render_template('shorturl.html', longURL=url, shortPath=shorturl, message=msg, counts='0'))

    username = request.cookies.get('username')
    if (username is None) or (username == '') or (username == 'None'):
        username = str(random.randint(1000, 9999))
        app.logger.debug("Cookie: " + username)
        response.set_cookie('username', username)

    useragent = request.headers['User-Agent']
    lat = request.form.get("lat")
    lon = request.form.get("lon")

    logline = json.dumps({'datetime': str(datetime.datetime.now()), 'Action': 'saveURL', 'cookie': username, 'useragent': useragent, 'Latitude': lat, 'Longitude': lon})
    f = open("log.txt", 'a')
    f.write(logline + "\n")
    f.close()
    return response

@app.route("/<short>", methods=['GET'])
def redirect_short(short):
    """Redirect the request to the URL associated =short=, otherwise return 404
    NOT FOUND"""

    # Get the list of keys stored in the shelve db
    list = db.keys()
    app.logger.debug((list))

    destination=""

    # Check if the shortpath is present in the key list and get the associated url value
    if str(short) in list:
        destination = db.get(str(short))
        app.logger.debug(str(destination is None))

        # If the destination is empty, abort with 404
        if destination=="":
            flask.abort(404)
        else:
            app.logger.debug("Redirecting to " + destination)
            count=0

            # Check if the destination is present in the key list and get the value of count and increase it by 1.
            if destination in list:
                count=db[str(destination)]
            db[str(destination)]=count+1

            username = request.cookies.get('username')
            if (username is None) or (username == 'None'):
                username = ''

            useragent = request.headers['User-Agent']
            lat = request.args.get("lat", "none")
            lon = request.args.get("lon", "none")
            logline = json.dumps({'datetime': str(datetime.datetime.now()), 'Action': 'redirect', 'cookie': username, 'useragent': useragent, 'Latitude': lat, 'Longitude': lon, 'URL': str(destination)})
            f = open("log.txt", 'a')
            f.write(logline + "\n")
            f.close()
            return flask.redirect(destination)
    # If shortpath is not present in db, abort with 404
    else:
        flask.abort(404)

@app.route("/urllog", methods=['GET','POST'])
def comments():
    try:
        mostfoll_bool = mostFollowed()
        app.logger.debug(mostfoll_bool)
        dictobj ={};


        urlList = []
        mostfoll = URLsMostFollowed(['log.txt'])
        with mostfoll.make_runner() as runner:
            runner.run()
            for line in runner.stream_output():
                key_value = mostfoll.parse_output_line(line)
                urlList.append(key_value)

        urlListSort = sorted(urlList, key=operator.itemgetter(1), reverse=True)
        dictobj['most']=urlListSort


        browserList =[];
        browaction = BrowserAgentAction(['log.txt'])
        with browaction.make_runner() as runner:
            runner.run()
            for line in runner.stream_output():
                key_value = browaction.parse_output_line(line)
                browserList.append(key_value)
        dictobj['browser']=browserList


        urlToday = []
        urlYest = []
        percChange = []
        urlTrendList = []
        today = str(datetime.datetime.now().date())
        yesterday = str((datetime.datetime.now() - datetime.timedelta(1)).date())
        trending = TrendingURL(['log.txt'])
        with trending.make_runner() as runner:
            runner.run()
            for line in runner.stream_output():
                key_value = trending.parse_output_line(line)
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
                    if (pChange > 0):
                        percChange.append([urlToday[i][0][1], pChange])
                j = j + 1
            i = i + 1
        percChangeSort = sorted(percChange, key=operator.itemgetter(1), reverse=True)
        dictobj['trend']=percChangeSort

        app.logger.debug("Entered GET1")
        jsonobj = flask.jsonify(dictobj)
        return jsonobj

    except:
        import traceback
        traceback.print_exc()
        raise Exception('something is wrong')


if __name__ == "__main__":
    app.run(port=int(environ['FLASK_PORT']))
