from flask import Flask
from flask_cors import CORS


# Crea la aplicacion de Flask y todo lo que necesita, retorna un objeto de la clase Flask
def create_app() -> Flask:
    app = Flask(__name__)
    
    # Configuraciones:
    app.config.from_object('app.config.Config')
    
    # Extensiones
    CORS(app)
    
    # Registra las rutas de las blueprints
    from app.routes import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')
    
    return app