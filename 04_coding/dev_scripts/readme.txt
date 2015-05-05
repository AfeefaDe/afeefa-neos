###############################
### FELIX web framework 1.0 ###
###############################

___________________________________________________
FOR PRODUCTION
___________________________________________________

REQUIREMENTS:
- PHP 5.3+ for Flight PHP Framework
- PHP 5.3.4+ for RedBeanPHP

DATABASE
- file based SQLite database with RedBeanPHP under /database

.HTACCESS
- rewrite rules for Flight PHP framework, see official doc for details


___________________________________________________
FOR DEVELOPERS
___________________________________________________

REQUIREMENTS:
- ...

INSTALL COMPASS	& SASS TO COMPILE CSS
- install ruby if not installed
- gem install sass
- gem install compass
- set up config.rb in desired "/css" folder
- go to desired "/css" folder and run "compass watch"

GENERATE DOC
- cd to project folder
- run: yuidoc . (generates documentation in out folder)
- for reference see: http://yui.github.io/yuidoc/syntax/index.html

REST API
- build with Flight PHP framework
- see php/api/api.php

API CRUD workflow
	#Create:
		1. form sends data object with the values of all input fields to the API (php/api/runners) with POST (input name-attributes must match the field definitions in database.php, otherwise the API will ignore them)
		2. route handler creates a new dataset in the SQLite database and takes only those attributes out of the received data that match the field definitions in database.php
		3. if successful, API returns the new dataset as json object
	#adding a new field
		1. define field in database.php (dont user camelCase for field names, i.e. some_name instead of someName)

DATABASE
- file based SQLite database with RedBeanPHP, see database.php
- file stored under /database
- use SQLite Database Browser to open database file

VIEWS
- views are javascript generated DOM elements and can be inserted into layout areas, that are defined under DL.settings.layoutAreas
- which views are included where is defined in Router.js
- some views load content from text file, see /txt