from datetime import datetime

from utilities.db.db_manager import dbManager


class CartData:

    @staticmethod
    def get_user_active_cart(user_email):
        query = f'''
        SELECT cart_data.product_id, products.product_name, products.price, products.image_url
        FROM cart_data
        INNER JOIN products
        ON cart_data.product_id=products.product_id AND user_email="{user_email}" AND closed_session_date IS NULL;
        '''
        return dbManager.fetch(query)

    @staticmethod
    def add_product_to_cart(user_email, product_id):
        query = f'''
        INSERT INTO cart_data (`user_email`, `product_id`) VALUES
        ("{user_email}", "{product_id}")
        '''
        return dbManager.commit(query)

    @staticmethod
    def empty_cart(user_email):
        query = f'''
        DELETE FROM cart_data
        WHERE user_email="{user_email}" AND closed_session_date IS NULL
        '''
        return dbManager.commit(query)

    @staticmethod
    def delete_item_from_cart(user_email, product_id):
        # Because product ID is not unique, need to select one row whom matches the given product ID to delete
        # Need to do 2 queries to DB because some SQL server dont support inner SELECT inside a DELETE statement.
        product_id_list = dbManager.build_fetch_query('cart_data', ['id'], conditions=[f'user_email="{user_email}"',
                                                                                       f'product_id="{product_id}"',
                                                                                       'closed_session_date IS NULL'],
                                                      limit=1)
        if not product_id_list:
            raise ValueError('Could not find the expected item')
        cart_product_id = product_id_list[0].id
        query = f'''
        DELETE FROM cart_data
        WHERE id={cart_product_id}
        '''
        return dbManager.commit(query)

    @staticmethod
    def close_session_payment(user_email):
        closed_cart_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        return dbManager.build_update_query('cart_data', {'closed_session_date': f'"{closed_cart_date}"'},
                                            conditions=[f'user_email="{user_email}"', 'closed_session_date IS NULL'])


cart_data_db = CartData()
