from flask import Blueprint, request, redirect, url_for, session, render_template
from utilities.db.db_helpers.users import users_db

# about blueprint definition
change_details = Blueprint('change_details', __name__, static_folder='static', static_url_path='/change_details',
                           template_folder='templates')


@change_details.route('/change_details')
def index():
    x = request.args
    return render_template('change_details.html', change_details_resp=request.args.get('change_details_resp'))


def is_email_taken(user_email):
    return True if users_db.get_user(user_email) else False


@change_details.route('/change_details', methods=['POST'])
def change_details_req():
    if not session.get('email'):
        return redirect(url_for('homepage.index', not_logged_access=True))
    args = request.form
    new_email = args.get('email-reg')
    new_first_name = args.get('fname')
    new_last_name = args.get('lname')
    new_password = args.get('password-reg')
    if new_email:
        if new_email == session['email']:
            change_details_resp = 'בחרת באותו אימייל. נא להשאיר ריק, או לבחור אימייל אחר להחליף אליו'
            return redirect(url_for('change_details.index', change_details_resp=change_details_resp))
        if users_db.get_user(new_email):
            # Check email is not taken:
            change_details_resp = 'האימייל כבר תפוס, אנא נסה להחליף לאימייל אחר'
            return redirect(url_for('change_details.index', change_details_resp=change_details_resp))
    if not (users_db.update_user(new_email, new_password, new_first_name, new_last_name, session['email'])):
        change_details_resp = 'קרתה תקלה לא ידועה בשרת. אנא נסה לעדכן שנית מאוחר יותר'
    else:
        change_details_resp = 'הפרטים הוחלפו בהצלחה'
        session['email'] = new_email or session['email']
    return redirect(url_for('change_details.index', change_details_resp=change_details_resp))
