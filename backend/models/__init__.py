from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import config# we’ll discuss the config file next
from models.db import db
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flasgger import Swagger, swag_from
from models.documentation.config.swagger import template, swagger_config
from datetime import timedelta



def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    app.config.JWT_SECRET_KEY="super secret key"
    app.config.from_pyfile("../config.py")
    app.config.JWT_ACCESS_TOKEN_EXPIRES=timedelta(hours=1)
    app.config.SWAGGER = {
        "tittle ":"Online food delivery API",
        "ui_version":3
    }


    db.init_app(app)
    # configurations with the app
    JWTManager(app)
    CORS(app, supports_credentials=True)
    Swagger(app, config=swagger_config, template=template)

    from models.users.controller import users
    from models.List_items.controller import listItems
    

    #registering blueprints    
    app.register_blueprint(users)
    app.register_blueprint(listItems)
    

   
    return app