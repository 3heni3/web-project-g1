from flask import Blueprint, request, session

from utilities.db.db_helpers.cart_data import cart_data_db

# about blueprint definition
cart = Blueprint('cart', __name__, static_folder='static', static_url_path='/cart', template_folder='templates')
VALID_RESPONSE = {'valid': True}
INVALID_RESPONSE = {'valid': False}


@cart.route('/clean_cart', methods=['POST'])
def clean_cart():
    if not session.get('email'):
        return {'valid': False, 'errorMsg': 'אינך מחובר. אנא התחבר על מנת לרוקן עגלה'}
    cart_data_db.empty_cart(session['email'])
    return VALID_RESPONSE


@cart.route('/cart/add', methods=['POST'])
def add_item_to_cart():
    if not session.get('email'):
        return {'valid': False, 'errorMsg': 'אינך מחובר. אנא התחבר על מנת לרוקן עגלה'}
    args = request.get_json()
    if cart_data_db.add_product_to_cart(session['email'], args['id']):
        return VALID_RESPONSE
    return INVALID_RESPONSE


@cart.route('/cart/remove', methods=['POST'])
def remove_item_from_cart():
    args = request.get_json()
    if cart_data_db.delete_item_from_cart(session['email'], args['id']):
        return VALID_RESPONSE
    return INVALID_RESPONSE
