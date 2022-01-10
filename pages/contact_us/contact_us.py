from flask import Blueprint, render_template, redirect, url_for, request

from utilities.db.db_helpers.contactus import contact_us_db

# about blueprint definition
contact_us = Blueprint('contact_us', __name__, static_folder='static', static_url_path='/contact_us',
                       template_folder='templates')


# Routes
@contact_us.route('/contact_us')
def index():
    return render_template('contact_us.html', contact_msg=request.args.get('contact_msg'))


@contact_us.route('/contact_us', methods=['POST'])
def add_contact_request():
    data = request.form
    affected_rows = contact_us_db.add_contact_request(data['phone'], data['email'], data['name'], data['description'])
    if affected_rows:
        contact_msg = 'הבקשה שלך נוספה בהצלחה! ניצור עמך קשר בהקדם'
    # If insertion failed for some internal reasons.
    else:
        contact_msg = "יש כרגע בעיה במערכת שלנו להוסיף את פנייתך! אנא נסה שנית מאוחר יותר"
    return redirect(url_for('contact_us.index', contact_msg=contact_msg))
