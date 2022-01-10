from flask import Blueprint, render_template

# about blueprint definition
schedule = Blueprint('schedule', __name__, static_folder='static', static_url_path='/schedule',
                     template_folder='templates')


# Routes
@schedule.route('/schedule')
def index():
    return render_template('schedule.html')
