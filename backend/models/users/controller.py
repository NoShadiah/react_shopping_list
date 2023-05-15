#register a new user
from flask import  jsonify, request, Blueprint
from models.users.model import User
from models.db import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity, unset_jwt_cookies
from flasgger import swag_from

users = Blueprint('users', __name__, url_prefix='/api/v1/users')

#user login
@users.route("/login", methods=["POST"])
@swag_from('../documentation/docs/user/login.yaml')
def login():
    email = request.json.get("email")
    user_password = request.json.get("password")
    user = User.query.filter_by(email=email).first()

    if not email or not user_password:
        return jsonify({"message": "All fields are required"})
    if user:
        
        def password():
            u_password = user_password
        
            password_hashed = user.password
            validate=check_password_hash(password_hashed, u_password)
            if validate:
                access_token = create_access_token(identity=user.id) #to make JSON Web Tokens for authentication
                refresh_token = create_refresh_token(identity=user.id) #to make JSON Web Tokens to refresh authentication
                return {"message":f"{user.first_name}, you have successfully logged in",
                        "access_token":f"{access_token}",
                        "refresh_token":f"{refresh_token}",
                        "user_type":user.user_type}
            else:
                return {"message":"Provided an incorrect password"}
        return password()
    else:
        return {"message":"Email does not exist, check email and try again or signUp"}   
        

        
    

#get all users
@users.route("/all")
@jwt_required()
def all_users():
    user_logged_in=get_jwt_identity()
    check_user_details = User.query.filter_by(id=user_logged_in).first()
    userType = check_user_details.user_type
    if userType == "client":
        return {"message":"Sorry but you are unauthorized", "status code":401}
    

    else:
        users = User.query.all()
        response = [{
            "Id":user.id,
            "First name":user.first_name, 
            "Last name":user.last_name,
            "Email":user.email,
            "Contact":user.contact,
            "User type":user.user_type ,
            "Gender":user.gender,
            "Address":user.address,
            "Registered at":user.registered_at,
            "Updated at":user.updated_at
        }for user in users]
        return jsonify(
                {"Users": response,"status code": 200} )

@users.route('/register',methods=['POST'])
def create_user():
    user_fname =request.json['firstname']
    user_lname = request.json['lastname']
    user_email = request.json['email']
    user_contact =request.json['contact']  
    user_password = request.json['password']
    user_user_type=request.json['user_type']
    user_gender = request.json['gender']
    user_address = request.json['address']
    password_hash = generate_password_hash(user_password)
  


    # validations
    #getting the user a data
    if not user_fname:
        return jsonify({'Message':"First name is required"}),400

    if not user_lname:
        return jsonify({'Message':"Last name is required"}),400
    
    if not user_email:
        return jsonify({'Message':"Email is required"}, 400)
    
    if not user_contact:
        return jsonify({'Message':"Contact is required"}, 400)
    
    if not user_password:
        return jsonify({'Message':"Password is required"}, 400)
    if not user_gender:
        return {"message":"Your gender is required, either male or female", "status code":400}
    if  not user_user_type:
        default = "client"
        user_user_type = default
    
    # password validation length
    if len(user_password)<8:
        return jsonify({'Message':"Password must be atleast 6 characters long"})
    
    if len(user_password)>20:
        return jsonify({'Message':"Password must be must be less than 20 characters"})
    
    #constaints
    if User.query.filter_by(email=user_email).first():
       return jsonify({'Message':"Email already exists"},409)
    
    
    existing_user_contact=User.query.filter_by(contact=user_contact).first()
    if existing_user_contact:
            return jsonify({'Message':"Contact already in use"},409)
     
    

    #storing new user
    new_user = User( first_name = user_fname,
                    last_name = user_lname,
                    email = user_email,
                    contact = user_contact,
                    password=password_hash,
                     user_type=user_user_type,
                     gender=user_gender,
                    address = user_address)
    #  address = user_address,
    

    #adding a new users to the database
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
                    'Success':True,
                    'Message':f"{new_user.first_name} you have successfully created an account with our shopping list app",
                    },201)


@users.route('/user/<user_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def handle_user(user_id):

    user_logged_in=get_jwt_identity()
    

    user = User.query.get_or_404(user_id)

    if request.method == 'GET':
        response = {
            "id":user.id,
            "name": user.first_name + user.last_name,
            "user_type":user.user_type,
            "email": user.email,
            "contact": user.contact
        }
        return {"success": True,"message":"User details retrieved", "user": response}

    elif request.method == 'PUT':
        data = request.get_json()

        if not data['first name']:
            return jsonify({"message":"Your name is required"})

        if not data['last name']:
            return jsonify({"message":"Your name is required"})
        
        if not data['email']:
            return jsonify({"message":"Your email address is required"})
        
        if not data['contact']:
            return jsonify({"message":"Your contact is required"})
        
        if not data['password'] or len(data['password'])<6:
            return jsonify({"message":"Your password is required and must be greater than 6 characters"})
        
        user.first_name = data['first name']
        user.last_name = data['last name']
        # user.email = data['email']
        user.contact = data['contact']
        user.password = generate_password_hash(data['password'])
        # user.updated_at = datetime.now()
        db.session.add(user)
        db.session.commit()
        return {"message": f"User details of {user.first_name} updated successfully"}

    elif request.method == 'DELETE':
        if user is None:
            return{"message":"User identity not found", "status code":"404"}
        else:
            db.session.delete(user)
            db.session.commit()
            return {"message": f"{user.firstname} {user.lastname}, you successfully deleted your account"}   
  
# logging out a user
# unset_jwt_cookies function which deletes the cookies containing the access token for the user
@users.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"message": "logout successful"})
    unset_jwt_cookies(response)
    return response
