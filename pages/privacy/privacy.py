from flask import Blueprint, render_template

# about blueprint definition
privacy = Blueprint('privacy', __name__, static_folder='static', static_url_path='/privacy',
                    template_folder='templates')


# Routes
@privacy.route('/privacy')
def index():
    return render_template('privacy.html')
