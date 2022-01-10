from flask import Blueprint, render_template, redirect, url_for, request
from utilities.db.db_helpers.example_photos import example_photos_db
from utilities.db.db_helpers.recommendations import recommendations_db
from utilities.db.db_helpers.tips import tips_db

# about blueprint definition
homepage = Blueprint('homepage', __name__, static_folder='static', static_url_path='/homepage',
                     template_folder='templates')


# Routes
@homepage.route('/')
def index():
    return render_template('homepage.html', tips=tips_db.get_tips(), example_photos=example_photos_db.get_images_urls(),
                           recommendations=recommendations_db.get_recommendations(),
                           total_payment=request.args.get('total_payment'),
                           schedule_msg=request.args.get('schedule_msg'))


@homepage.route('/homepage')
@homepage.route('/home')
def redirect_homepage():
    return redirect(url_for('homepage.index'))
