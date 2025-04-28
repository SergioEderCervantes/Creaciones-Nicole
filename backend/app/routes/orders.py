from app.routes import api_bp
from flask import request, Response


@api_bp.route('/orders', methods=['GET', 'POST'])
def get_or_create_orders() -> str:
    if request.method == 'GET':
        return '<h1> get Orders working </h1>'
    else:
        return 'Post orders working'
    
    
@api_bp.route('/orders/<id>', methods=['PATCH', 'DELETE'])
def update_or_delete_order(id: int) ->str:
    if request.method == 'PATCH':
        return f"updating product with id {id} "
    else:
        return f"deleting order with id {id}"