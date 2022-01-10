from flask import Blueprint, render_template

# about blueprint definition
takanon = Blueprint('takanon', __name__, static_folder='static', static_url_path='/takanon',
                    template_folder='templates')


# Routes
@takanon.route('/takanon')
def index():
    return render_template('takanon.html')
