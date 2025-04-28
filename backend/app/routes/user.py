from app.routes import api_bp

@api_bp.route('/user/login', methods=['POST'])
def login() -> str:
    return "Loggin in"

@api_bp.route('/user/logout', methods=['POST'])
def logout() -> str:
    return "Loggin out"