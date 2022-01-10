from flask import Blueprint, render_template

from utilities.db.db_helpers.before_after_images import before_after_images_db

# about blueprint definition
shop_services = Blueprint('shop_services', __name__, static_folder='static', static_url_path='/shop_services',
                          template_folder='templates')


# Routes
@shop_services.route('/shop_services')
def index():
    image_urls = before_after_images_db.get_images_urls()
    return render_template('shop_services.html', image_urls=image_urls)
