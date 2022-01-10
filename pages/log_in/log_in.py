from flask import Blueprint, request, session

from utilities.db.db_helpers.users import users_db

# about blueprint definition
log_in = Blueprint('log_in', __name__, static_folder='static', static_url_path='/log_in', template_folder='templates')


@log_in.route('/log_in', methods=['POST'])
def index():
    session.clear()
    args = request.get_json()
    email = args['email']
    password = args['password']
    user = users_db.get_user(email, password)
    if not user:
        return {'valid': False}
    user = user[0]
    session['email'] = user.email
    session['first_name'] = user.first_name
    session['last_name'] = user.last_name
    return {'valid': True}
