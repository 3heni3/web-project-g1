from datetime import datetime

from flask import Blueprint, request, session, render_template

from utilities.db.db_helpers.schedule import schedule_db

# about blueprint definition
schedules = Blueprint('schedules', __name__, static_folder='static', static_url_path='/schedules',
                      template_folder='templates')


@schedules.route('/schedules')
def index():
    today = datetime.today()
    schedules_ = schedule_db.get_schedules_by_email(session['email'])
    old_schedules = [schedule for schedule in schedules_ if schedule.schedule_time < today]
    new_schedules = [schedule for schedule in schedules_ if schedule.schedule_time >= today]
    return render_template('schedules.html', old_schedules=old_schedules, new_schedules=new_schedules)


@schedules.route('/schedules', methods=['POST'])
def remove_new_schedule():
    schedule_date = request.get_json()['date_']
    schedule_db.cancel_schedule(schedule_date)
    return {'valid': True}
