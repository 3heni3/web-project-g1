from utilities.db.db_manager import dbManager


class Schedule:

    @staticmethod
    def get_schedules_by_date(min_date, max_date):
        return {date_.schedule_time for date_ in
                dbManager.build_fetch_query('schedule', ['schedule_time'],
                                            conditions=[f'schedule_time>="{min_date}"', f'schedule_time<"{max_date}"'])}

    @staticmethod
    def get_schedules_by_email(email):
        return [date_ for date_ in dbManager.build_fetch_query('schedule', ['schedule_time', 'schedule_type'],
                                                               conditions=[f'email="{email}"'])]

    @staticmethod
    def add_schedule(service_type, phone, schedule_time, email):
        return dbManager.build_insert_query('schedule',
                                            ['schedule_time', 'phone', 'schedule_type', 'email'],
                                            [[f'"{schedule_time}"', f'"{phone}"', f'"{service_type}"', f'"{email}"']])

    @staticmethod
    def cancel_schedule(schedule_time):
        query = f'''
        DELETE FROM schedule
        where schedule_time="{schedule_time}"  
        '''
        dbManager.commit(query)


schedule_db = Schedule()
