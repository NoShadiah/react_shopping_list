from models.db import db
from datetime import datetime
from dataclasses import dataclass


@dataclass
class Item(db.Model):
    id:int
    name:str
    status:str
    price_unit:str
    price :str
    registered_at:str
    quantity:str
    grand_price:str
    registered_at:str
    

    __tablename__ = "Food_Items"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100))
    status = db.Column(db.String(10), default="Uncleared")
    price_unit = db.Column(db.String(4), default="UGX:")
    price = db.Column(db.String(250))
    quantity = db.Column(db.Integer)
    grand_price = db.Column(db.Integer)
    registered_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    registered_at = db.Column(db.String(200), default=datetime.now())
    updated_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    updated_at = db.Column(db.String(200), onupdate=datetime.now())

    def __repr__():
        return(f"<Item>..............{Item.name}")
