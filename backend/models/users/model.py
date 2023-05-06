from models.db import db
from dataclasses import dataclass
from datetime import datetime

@dataclass
class User(db.Model):
  __tablename__ = 'users'

  id: int
  first_name: str
  last_name: str
  email: str
  contact: int
  address:str
  user_type: str

  id = db.Column(db.Integer, primary_key = True)
  first_name = db.Column(db.String(100),nullable=False)
  last_name = db.Column(db.String(100),nullable=False)
  gender = db.Column(db.String(1))
  email = db.Column(db.String(50))  
  contact = db.Column(db.String(200))
  address = db.Column(db.String(200))
  user_type = db.Column(db.String(100),default="client")
  password = db.Column(db.String(20))
  registered_at = db.Column(db.String(200),nullable=True, default=datetime.now())
  updated_at = db.Column(db.String(200),nullable=True, onupdate=datetime.now())
  
  items = db.relationship("Item", backref="user")

  # def __init__(self, first_name, last_name, email,contact,user_type,password, gender, address):
  #  self.first_name = first_name
  #  self.last_name = last_name
  #  self.email = email
  #  self.contact = contact
  #  self.user_type = user_type
  #  self.password = password
  #  self.gender = gender
  #  self.address = address
   

  


  def __repr__(self):
        return f"<User {self.last_name} {self.first_name}>"
  

        
   
 
 