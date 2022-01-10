import json
from datetime import datetime, timedelta

from flask import Blueprint, render_template, request, Response, redirect, url_for, session

from utilities.db.db_helpers.schedule import schedule_db

ISO_DAYS_OFF = 6
DATE_FORMAT = '%Y/%m/%d'
# about blueprint definition
schedule = Blueprint('schedule', __name__, static_folder='static', static_url_path='/schedule',
                     template_folder='templates')


def get_min_max_hours(date_):
    if date_.isoweekday() == 6:
        return 0, 0
    elif date_.isoweekday() == 5:
        return 9, 13
    return 9, 17


# Routes
@schedule.route('/schedule')
def index():
    # only calculate next 30 days for scheduling
    curr_day = datetime.now()
    dates = []
    for _ in range(30):
        if curr_day.isoweekday() != ISO_DAYS_OFF:
            dates.append(curr_day.strftime(DATE_FORMAT))
        curr_day += timedelta(days=1)
    return render_template('schedule.html', dates=dates)


@schedule.route('/schedule', methods=['POST'])
def add_schedule():
    args = request.form
    service_type = args['ServiceType']
    phone = args['phone']
    schedule_time = f'{args["date"]} {args["hour"]}'
    schedule_db.add_schedule(service_type, phone, schedule_time, session.get('email'))
    return redirect(url_for('homepage.index', schedule_msg='התור נקבע בהצלחה!'))


@schedule.route('/available_hours')
def get_schedule_available_hours():
    date_ = request.args['date_']
    available_hours = []
    datetime_chosen = datetime.strptime(date_, DATE_FORMAT)
    occupied_schedules = schedule_db.get_schedules_by_date(date_, datetime_chosen + timedelta(days=1))
    min_hour, max_hour = get_min_max_hours(datetime_chosen)
    current_date = datetime_chosen + timedelta(hours=min_hour)
    while True:
        if current_date not in occupied_schedules:
            available_hours.append(current_date.strftime('%H:%M'))
        if current_date.hour == max_hour:
            break
        current_date += timedelta(minutes=30)
    return Response(json.dumps(available_hours), mimetype='application/json')
