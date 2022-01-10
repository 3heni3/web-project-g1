from utilities.db.db_manager import dbManager


class Transactions:

    @staticmethod
    def add_transaction(cc_num, user_id, cvv, total, exp_date):
        return dbManager.build_insert_query('transactions',
                                            ['cc_number', 'user_id', 'cvv', 'total', 'expDate'],
                                            [[f'"{cc_num}"', user_id, cvv, total, f'"{exp_date}"']])


transactions_db = Transactions()
