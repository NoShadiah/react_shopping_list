from models.db import db
from datetime import datetime
from dataclasses import dataclass


@dataclass
class Item(db.Model):
    id:int
    name:str
    # image:str
    description:str
    in_category:str
    registered_at:str
    

    __tablename__ = "Food_Items"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100))
    in_category = db.Column(db.String(200))
    description = db.Column(db.String(250))
    status = db.Column(db.String(10))
    registered_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    registered_at = db.Column(db.String(200), default=datetime.now())
    updated_at = db.Column(db.String(200), onupdate=datetime.now())

    def __repr__():
        return(f"<Item>..............{Item.name}")
