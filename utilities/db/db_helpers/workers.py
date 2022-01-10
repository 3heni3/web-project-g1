from utilities.db.db_manager import dbManager


class Workers:

    @staticmethod
    def get_workers():
        return dbManager.build_fetch_query('workers', table_columns=['image_url', 'worker_description'])


workers_db = Workers()
