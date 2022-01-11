from utilities.db.db_manager import dbManager


class Users:
    USER_COLUMNS = ['email', 'password', 'first_name', 'last_name']

    @staticmethod
    def get_user(user_email, password=None):
        conditions = [f'email="{user_email}"']
        if password:
            conditions.append(f'password="{password}"')
        return dbManager.build_fetch_query('users', conditions=conditions)

    def insert_user(self, user_email, password, first_name, last_name):
        return dbManager.build_insert_query('users', self.USER_COLUMNS,
                                            [[f'"{user_email}"', f'"{password}"',
                                              f'"{first_name}"', f'"{last_name}"']])

    def update_user(self, user_email, password, first_name, last_name, curr_email):
        updates = {}
        for col, new_val in zip(self.USER_COLUMNS, [user_email, password, first_name, last_name]):
            if new_val:
                updates[col] = f'"{new_val}"'
        return dbManager.build_update_query('users', updates, conditions=[f'email="{curr_email}"'])


users_db = Users()
