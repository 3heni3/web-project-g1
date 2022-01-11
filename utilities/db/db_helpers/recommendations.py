from utilities.db.db_manager import dbManager


class Recommendations:

    @staticmethod
    def get_recommendations(limit=10):
        return [recommendation_data.recommendation for recommendation_data in
                dbManager.build_fetch_query('recommendations',
                                            table_columns=['recommendation'],
                                            order_column='created_date',
                                            order_type='DESC', limit=limit)]


recommendations_db = Recommendations()
