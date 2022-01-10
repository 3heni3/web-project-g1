from utilities.db.db_manager import dbManager


class Tips:

    @staticmethod
    def get_tips():
        return [tip_data.tip for tip_data in dbManager.build_fetch_query('tips', table_columns=['tip'])]


tips_db = Tips()
