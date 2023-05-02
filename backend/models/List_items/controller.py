from models.db import db
from models.List_items.model import Item
from models.users.model import User
from flasgger import swag_from
from flask import  jsonify, request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

listItems = Blueprint("listItems", __name__, url_prefix="/api/v1/items")

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
            "description":item .description,
            "in_category":item.status,
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
    if userType != "super admin":
        return {"message":"Sorry access denied"}
    else:            
            def register():
                name = request.json["name"]
                # image = request.json["image"]
                description = request.json["description"]
                registered_by =user_logged_in
                registered_by = "11"
                if not name  or not description:
                    return {"message":"All fields are required"}
                
                new_item = Item(name=name, 
                                    # image=image, 
                                    description=description, registered_by=registered_by)
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
                item.description = request.json["description"]
                
                if not item.name  or not item.decription or not item:
                     
                     return {"message":"All fields required"}
                else:
                 
                    db.session.add(item)
                    db.session.commit()
                    return {"message":f"You successfully updated item {item.id}"}

        elif request.method == "DELETE":
             db.session.delete(item)
             db.session.commit()
             return {"message":f"You successfully deleted {item.name}"}
        


        
