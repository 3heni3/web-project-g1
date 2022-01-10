from flask import Blueprint, render_template

from utilities.db.db_helpers.workers import workers_db

# about blueprint definition
shop_info = Blueprint('shop_info', __name__, static_folder='static', static_url_path='/shop_info',
                      template_folder='templates')


# Routes
@shop_info.route('/shop_info')
def index():
    return render_template('shop_info.html', workers=workers_db.get_workers())
