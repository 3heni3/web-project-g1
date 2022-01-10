from flask import Flask, session

from pages.cart.cart import cart
from pages.contact_us.contact_us import contact_us
from pages.homepage.homepage import homepage
from pages.log_in.log_in import log_in
from pages.log_out.log_out import log_out
from pages.payment.payment import payment
from pages.register.register import register
from pages.schedule.schedule import schedule
from pages.shop_info.shop_info import shop_info
from pages.shop_items.shop_items import shop_items
from pages.change_details.change_details import change_details
from pages.takanon.takanon import takanon
from pages.schedules.schedules import schedules
from pages.shop_services.shop_services import shop_services
from utilities.db.db_helpers.cart_data import cart_data_db

# App setup
app = Flask(__name__)
app.config.from_pyfile('settings.py')

# Register BluePrints

app.register_blueprint(contact_us)
app.register_blueprint(homepage)
app.register_blueprint(payment)
app.register_blueprint(schedule)
app.register_blueprint(shop_info)
app.register_blueprint(shop_items)
app.register_blueprint(shop_services)
app.register_blueprint(log_in)
app.register_blueprint(log_out)
app.register_blueprint(change_details)
app.register_blueprint(register)
app.register_blueprint(cart)
app.register_blueprint(takanon)
app.register_blueprint(schedules)


@app.context_processor
def inject_user():
    data = {}
    # Welcome message
    if session.get('first_name'):
        data['user'] = f"{session['first_name']} {session['last_name']}"
    # Load cart
    if session.get('email'):
        products = cart_data_db.get_user_active_cart(session['email'])
        if products:
            data['products'] = products

    return data


app.run()
