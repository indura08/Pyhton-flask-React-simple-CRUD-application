#contains main configurations of our application

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS #me cors kiynne cross origin request mokdda ekak eken krnne send a requst to the backend through a different url

app = Flask(__name__) #initialize the flask application
CORS(app) #cors error disable krnwa ape app ekt

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db" #specifying the location of local database 
app.config["SQLALCHEMY_TRACK_MODIFICATION"] = False #we not gonna track all the modifications so we disable it

db = SQLAlchemy(app) #create a database instance which gives the access to our database
#mekn wena eka wasiyak thami me orm ekane use krnne. ekiynne api python walin liyna ewa ehma apita sql walt convert krla denwa anna ehma scn ekk thiynne








