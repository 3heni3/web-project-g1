from flask import Blueprint, render_template, redirect, url_for, request
from utilities.db.db_helpers.example_photos import example_photos_db
from utilities.db.db_helpers.recommendations import recommendations_db
from utilities.db.db_helpers.tips import tips_db

# about blueprint definition
takanon = Blueprint('takanon', __name__, static_folder='static', static_url_path='/takanon',
                    template_folder='templates')


# Routes
@takanon.route('/takanon')
def index():
    return render_template('takanon.html')
