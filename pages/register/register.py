from flask import Blueprint, request

from utilities.db.db_helpers.users import users_db

# about blueprint definition
register = Blueprint('register', __name__, static_folder='static', static_url_path='/register',
                     template_folder='templates')


@register.route('/register', methods=['POST'])
def index():
    args = request.get_json()
    email = args['email']
    password = args['password']
    first_name = args['first_name']
    last_name = args['last_name']
    user = users_db.get_user(email, password)
    if user:
        return {'valid': False}
    if not users_db.insert_user(email, password, first_name, last_name):
        raise ValueError('Could not insert user to DB for unexpected reason.')
    return {'valid': True}
