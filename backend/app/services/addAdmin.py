import bcrypt
from app.repository.models import AdminModel, AdminSchema
from app.repository.repository import GenericRepository

def addAdmin(email:str, username: str, password: str) -> None: 
    password_bytes = password.encode()
    adminRepo = GenericRepository(AdminModel, AdminSchema)
    
    # Crear el Schema
    password_hash = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    print(password_hash)
    schema = AdminSchema(name= username, email=email, password=password_hash.decode())
    
    result = adminRepo.create(schema)
    print(result)
    
    
addAdmin("edercervantes66@gmail.com", "Sergio Eder", "contra123")