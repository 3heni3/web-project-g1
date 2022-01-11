from flask import Blueprint, render_template, request, session, redirect, url_for

from utilities.db.db_helpers.cart_data import cart_data_db
from utilities.db.db_helpers.transactions import transactions_db
from utilities.db.db_helpers.products import products_db

# about blueprint definition
payment = Blueprint('payment', __name__, static_folder='static', static_url_path='/payment',
                    template_folder='templates')


# Routes
@payment.route('/payment')
def index():
    return render_template('payment.html')


@payment.route('/payment', methods=['POST'])
def charge_credit_card():
    # Get Current Active Cart
    products = cart_data_db.get_user_active_cart(session['email'])
    product_id_to_num_bought = {}
    for product in products:
        product_id_to_num_bought[product.product_id] = product_id_to_num_bought.get(product.product_id, 0) + 1
    products_db.update_products_num_bought(product_id_to_num_bought)

    # Update cart session
    cart_data_db.close_session_payment(session['email'])

    # Transaction
    args = request.form
    cc_number = args['creditCardName']
    user_id = args['userID']
    cvv = args['CVV']
    exp_date = args['CCExpDate']
    total = args['total']
    transactions_db.add_transaction(cc_number, user_id, cvv, total, exp_date)
    alert_msg = f'כרטיס האשראי שלך חויב ב {total} שקלים בהצלחה!'
    session['alert_msg'] = alert_msg
    return redirect(url_for('homepage.index'))
