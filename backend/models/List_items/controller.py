from models.db import db
from models.List_items.model import Item
from models.users.model import User
from flasgger import swag_from
from flask import  jsonify, request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

listItems = Blueprint("listItems", __name__, url_prefix="/api/v1/listItems")

@listItems.route("/all", methods=["GET"])
@jwt_required()
def get_all():
    user_logged_in=get_jwt_identity()
    check_user_details = User.query.filter_by(id=user_logged_in).first()
    userType = check_user_details.user_type
    if userType != "client":
        return {"message":"Sorry access denied"}
    else:
        items = Item.query.filter_by(registered_by=user_logged_in).first()
        response = [{
            "id":item.id,
            "name":item.name,
            # "image":item.image,
            "price":item .price,
            "status":item.status,
            "quantity":item.quantity,
            "registered_at":item.registered_at,
            "registered_by":item.registered_by,
            "updated_at":item.updated_at
    } for item in items]
        return {"total":len(items), "data":response}

@listItems.route("/register", methods=['POST'])
@jwt_required()
def specific_item():
    # checking the user type
    user_logged_in=get_jwt_identity()
    check_user_details = User.query.filter_by(id=user_logged_in).first()
    userType = check_user_details.user_type
    if userType == "super admin":
        return {"message":"Sorry access denied"}
    else:            
            def register():
                name = request.json["name"]
                quantity = request.json["quantity"]
                price = request.json["price"]
                registered_by =user_logged_in
                
                if not name  or not price:
                    return {"message":"All fields are required"}
                
                new_item = Item(name=name, 
                                    quantity=quantity, 
                                    price=price, registered_by=registered_by)
                db.session.add(new_item)
                db.session.commit()
                return {"message":"successfully added a new food item", "data": new_item}
            
            return register()
    
@listItems.route("/item/<id>", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def single_item(id):
     # checking the user type
    user_logged_in=get_jwt_identity()
    check_user_details = User.query.filter_by(id=user_logged_in).first()
    userType = check_user_details.user_type
    if userType != "sper admin":
        return {"message":"Sorry access denied"}
    
    else:
        item = Item.query.get_or_404(id)
        if request.method == "GET":
                
                return {"messgae":f"You successfully retrieved item {id}", "details":item}
        elif request.method == "PUT":
                item.name = request.json["name"]
                # item.image = request.json["image"]
                item.status = request.json["status"]
                item.price = request.json["price"]
                
                if not item.name  or not item.price or not item.name:
                     
                     return {"message":"All fields required"}
                else:
                 
                    db.session.add(item)
                    db.session.commit()
                    return {"message":f"You successfully updated item {item.id}"}

        elif request.method == "DELETE":
             db.session.delete(item)
             db.session.commit()
             return {"message":f"You successfully deleted {item.name}"}
        


        
