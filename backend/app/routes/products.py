from app.routes import api_bp
from flask import request

@api_bp.route('/products', methods=['GET'])
def get_sections():
    return "<h1> get sections working </h1>"

@api_bp.route('/products/<section>', methods=['GET','POST'])
def section_products(section: str) -> str:
    if request.method == "GET":
        return f"<h1> get Products of section {section} working </h1>"
    else:
        return f" post Products of section {section} working "
        
@api_bp.route('/products/<section>/<id>', methods=['GET', 'PATCH', 'DELETE'])
def get_product_by_id(section:str, id:int) -> str:
    match request.method:
        case "GET":
            return f"<h1> get product by id {id} is working </h1>"
        case "PATCH":
            return f"<h1> updating product of id {id} </h1>"
        case "DELETE":
            return f"<h1> deleting product of id {id} </h1>"
