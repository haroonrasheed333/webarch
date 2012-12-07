Notes and Assumptions:

2 Mobile Layout

    Header (eg. nav bar)
    	The is an image in our application

    3 columns (content of your choosing)
    	We have three columns. #sidebar1, #content and #sidebar2

    	#sidebar1 column gives a brief description of the application
    	#content has a form in which the user can enter the URL and shortpath
    	#sidebar2 column displays the Most browsed URLs, Action per browser and Trending URLs. In app.py we have logic to analyze the log file and get the Most followed, Trending URLs and Actions per browser. On loading the html page we make getJSON call to get these analysis and display them in the #sidebar2 column of index.html

    As screen width shrinks, changes to 2 columns, then 1 column
    	We have written media queries to make the layout responsive. When the screen size goes below 800px, colunm1 will disappear and when the screen size goes below 650px column 3 will disappear.

    ontouchstart column background color must change
    	Colunm1 will change to blue, colunm2 will change to yellow and column3 to red respectively ontouchstart events.

3 Logging

    Log access to the application in machine readable format
    Datetime
    Cookie ID
    Action (page load, save URL, redirect)
        Information about action
    User Agent (Browser)

    	Logged information in JSON format. We have logged Datetime, Cookie ID, Action, User Agent, Geolocation (latitude and longitude) 

4 Analysis

    What are the counts per action per Browser?
    What are the most followed URLs?

    	We have written the code for analysis both as separate files and also in app.py to get the information and display them during page load.

5 Extra Credit

    Move columns
    	We have made the column1 (#sidebar1) movable. 

    Log geolocation
    	We are logging the geolocation (latitude and longitude) when the user tries to save an URL. We are getting the location coordinates using HTML5 geolocation function and sending them to app.py along with other form parameters.

    Trending URLs
    	To find the trending URLs we are comparing the number of clicks for each URL yesterday and today. We then calculate the percentage increase in the number of clicks from yesterday to today and determine the trending URLs.

