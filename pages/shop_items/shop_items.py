from flask import Blueprint, render_template, request, session

from utilities.db.db_helpers.products import products_db

SORT_OPTIONS = {
    '1': 'ללא מיון',
    '2': 'מהזול ליקר',
    '3': 'מהיקר לזול',
    '4': 'לפי הכי נמכרים',
}
SORT_TYPE_TO_FETCH_FUNCTION = {
    '2': products_db.get_products_cheap_to_expensive,
    '3': products_db.get_products_expensive_to_cheap,
    '4': products_db.get_products_most_bought
}
DEFAULT_SORT = 1
# about blueprint definition
shop_items = Blueprint('shop_items', __name__, static_folder='static', static_url_path='/shop_items',
                       template_folder='templates')


# Routes
@shop_items.route('/shop_items')
def index():
    args = request.args
    chosen_sort = args.get('sort-type', DEFAULT_SORT)
    min_price = args.get('minprice')
    max_price = args.get('maxprice')
    store_items = SORT_TYPE_TO_FETCH_FUNCTION.get(chosen_sort, products_db.get_products)(min_price, max_price)

    return render_template('shop_items.html', store_items=store_items, sort_options=SORT_OPTIONS,
                           selected_sort_id=chosen_sort, min_price=min_price, max_price=max_price)
