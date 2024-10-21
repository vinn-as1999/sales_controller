from pymongo import MongoClient
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from flask import current_app, g


class User:
    def __init__(self, name, email, password) -> None:
        self.name = name
        self.email = email
        self.password = password

    @staticmethod
    def create(data):
        if not data.get("name") or not data.get("email") or not data.get("password"):
            return {
                "error": "Missing required fields"
            }
        
        existing_users = g.db["users"].find_one({"email": data.get("email")})
        if existing_users:
            return {
                "error": "Email already exists"
            }
        
        hashed_password = generate_password_hash(data.get("password"))

        new_user = {
            "name": data.get("name"),
            "email": data.get("email"),
            "password": hashed_password
        }
        try:
            g.db["users"].insert_one(new_user)
            return {
                "message": "User successfully registered!"
            }
        except Exception as error:
            return {
                "message": "Network error occurred",
                "error": str(error)
            }, 500


    @staticmethod
    def get_all():
        try:
            result = g.db["users"].find()
            users = list(result)
            for user in users:
                user["_id"] = str(user["_id"])

            return users
        
        except Exception as error:
            return {
                "message": "Network error occurred",
                "error": str(error)
            }, 500
        
    