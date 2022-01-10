from flask import Blueprint, session, redirect, url_for

# about blueprint definition
log_out = Blueprint('log_out', __name__, static_folder='static', static_url_path='/log_out',
                    template_folder='templates')


@log_out.route('/log_out')
def index():
    session.clear()
    return redirect(url_for('homepage.index'))
