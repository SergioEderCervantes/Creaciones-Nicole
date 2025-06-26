from pydantic import ValidationError
from app.routes import api_bp
from app.repository.models import AdminModel, AdminSchema
from app.repository.repository import GenericRepository
from flask import request, Response
import json
import bcrypt
# Rutas y endpoints relativos a la api de user


@api_bp.route('/user/login', methods=['POST'])
def login() -> str:
    try:
        repo = GenericRepository(AdminModel, AdminSchema)
        body = json.loads(request.data)
        
        # Primero, verificar si el usuario existe
        userSchema:AdminSchema = repo.to_schema(repo.query(id_=body["email"], column="email", with_for_update=False));
        
        # Validar la contraseña
        if(bcrypt.checkpw(body["password"].encode(), userSchema.password.encode())):
            return "Login succesfully", 200
        else:
            return "Password Incorrect", 400
    except ValidationError:
        return "User not found", 404
    except Exception as e:
        print(f"Error during login: {e}")
        return "error", 500
    

@api_bp.route('/user/logout', methods=['POST'])
def logout() -> str:
    return "Loggin out", 200