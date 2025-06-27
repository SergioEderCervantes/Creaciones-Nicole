from flask import Blueprint

# Blueprint principal donde se registraran las demas rutas de las demas apis, en el objeto api_bp es donde se guardan todas las rutas

api_bp = Blueprint('api', __name__)


from app.routes import products, orders, user