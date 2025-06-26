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
    try:
        prodRepo = GenericRepository(ProductsModel, ProductSchema)
        catRepo = GenericRepository(CategoryModel, CategorySchema)
        
        category: CategoryModel = catRepo.query(id_=section, column="name",with_for_update=False);
        
        if not category:
            return jsonify({"error": "Categoria no encontrada"}), 404
        
        if request.method == "GET":
            products = prodRepo.query(id_=category.id,column="category_id",with_for_update= False)
            
            products_schema = prodRepo.to_schema(products)
            response = {
                "data": [product.model_dump() for product in products_schema]
            }
            return jsonify(response)
        elif request.method == "POST":
            data = request.json
            data['category_id'] = category.id
            
            # Tratar de construir un schema con el body del json
            product_schema= ProductSchema(category_id=data['category_id'], name=data['name'],description=data['description'], image=data['image'])
            new_product = prodRepo.create(product_schema)
            
            # Si no se creo correctamente salta error
            if not new_product:
                raise Exception("Model not created")
            
            return {"data": product_schema.model_dump()}, 201
            
    except Exception as e:
        print(e)
        return "Internal Server Error", 500
        
@api_bp.route('/products/<section>/<id>', methods=['GET', 'PATCH', 'DELETE'])
def get_product_by_id(section:str, id:int) -> str:
    match request.method:
        case "GET":
            return f"<h1> get product by id {id} is working </h1>"
        case "PATCH":
            return f"<h1> updating product of id {id} </h1>"
        case "DELETE":
            return f"<h1> deleting product of id {id} </h1>"
