from app.routes import api_bp
from flask import jsonify, request, Response
from app.repository.repository import GenericRepository
from app.repository.models import CategoryModel, CategorySchema, ProductsModel, ProductSchema
# Rutas y endpoints relativos a la api de products

@api_bp.route('/products', methods=['GET'])
def get_sections() -> Response:
    catRepo = GenericRepository(CategoryModel, CategorySchema)
    categories:list[CategorySchema] = catRepo.to_schema(catRepo.get_all())
    
    response = {
        "data": [category.model_dump() for category in categories]
    }
    
    return jsonify(response)

@api_bp.route('/products/<section>', methods=['GET','POST'])
def section_products(section: str) -> Response:
    prodRepo = GenericRepository(ProductsModel, ProductSchema)
    catRepo = GenericRepository(CategoryModel, CategorySchema)
    
    category = catRepo.get_by_field('name', section)
    
    if not category:
        return jsonify({"error": "Categoria no encontrada"}), 404
    
    if request.method == "GET":
        products = prodRepo.get_by_field('category_id', category.id)
        products_schema = prodRepo.to_schema(products)
        response = {
            "data": [producto.model_dump() for product in products_schema]
        }
        return jsonify(response)
    elif request.method == "POST":
        data = request.json
        
        data['category_id'] = category.id
        new_product = prodRepo.create(data)
        return jsonify({"data": new_product.model_dump()}), 201
        
@api_bp.route('/products/<section>/<id>', methods=['GET', 'PATCH', 'DELETE'])
def get_product_by_id(section:str, id:int) -> str:
    match request.method:
        case "GET":
            return f"<h1> get product by id {id} is working </h1>"
        case "PATCH":
            return f"<h1> updating product of id {id} </h1>"
        case "DELETE":
            return f"<h1> deleting product of id {id} </h1>"
