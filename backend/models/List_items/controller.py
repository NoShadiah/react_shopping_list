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
            "price unit":item.price_unit,
            "price":item .price,
            "status":item.status,
            "quantity":item.quantity,
            "registered_at":item.registered_at,
            "registered_by":item.registered_by,
            "updated_at":item.updated_at
    } for item in items]
        return {"Total":f"You have registered {len(items)} items", "data":response}

@listItems.route("/register", methods=['POST'])
@jwt_required()
def register_item():
    # checking the user type
    user_logged_in=get_jwt_identity()
    check_user_details = User.query.filter_by(id=user_logged_in).first()
    userType = check_user_details.user_type
    userName = check_user_details.first_name
    if not check_user_details or userType == "super admin":
        return {"message":"Sorry access denied"}
    else:            
            def register():
                name = request.json["name"]
                quantity = request.json["quantity"]
                user_price = request.json["price"]
                price = user_price.replace(",","")
                grand_price = price*quantity
                registered_by =user_logged_in
                
                if not name  or not price:
                    return {"message":"All fields are required"}
                
                new_item = Item(name=name, 
                                    quantity=quantity, 
                                    price=price,
                                    registered_by=registered_by,
                                    grand_price = grand_price)
                db.session.add(new_item)
                db.session.commit()
                return {"message":f"{userName} you successfully added a \nnew {new_item.status} item called {new_item.name}"}
            
            return register()
    
@listItems.route("/item/<id>", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def single_item(id):
     # checking the user type
    user_logged_in=get_jwt_identity()
    check_user_details = User.query.filter_by(id=user_logged_in).first()
    userType = check_user_details.user_type
    if userType == "super admin":
        return {"message":"Sorry access denied"}
    
    else:
        item = Item.query.get_or_404(id)
        if item:
            if request.method == "GET":
                    
                    return {"messgae":f"You successfully retrieved item {id}", "details":item}
            elif request.method == "PUT":
                    item.name = request.json["name"]
                    item.quantity = request.json["quantity"]
                    item.status = request.json["status"]
                    item.price = request.json["price"]
                    item.updated_by = user_logged_in
                    
                    if not item.name  or not item.price or not item.name or not item.quantity:
                        
                        return {"message":"All fields required"}
                    else:
                    
                        db.session.add(item)
                        db.session.commit()
                        return {"message":f"You successfully updated item {item.name}"}

            elif request.method == "DELETE":
                db.session.delete(item)
                db.session.commit()
                return {"message":f"You successfully deleted {item.name}"}
            
        else:
             return {"message":f"item number {id} is not found", "status code":400}
        
@listItems.route("/items_status/<status>", methods=["GET"])
@jwt_required()
def status_items(status):
      # checking the user type
    user_logged_in=get_jwt_identity()
    check_user_details = User.query.filter_by(id=user_logged_in).first()
    userType = check_user_details.user_type
    if userType != "super admin":
        return {"message":"Sorry access denied"}
    
    else:
         items = Item.query.filter_by(status=status).first()
         response = [{
            "id":item.id,
            "name":item.name,
            "price unit":item.price_unit,
            "price":item .price,
            "quantity":item.quantity,
            "registered_at":item.registered_at,
            "updated_at":item.updated_at
    } for item in items]
         return {"Total":f"You have {len(items)} {status} items", "data":response}