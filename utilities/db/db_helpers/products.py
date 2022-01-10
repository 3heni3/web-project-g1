from utilities.db.db_manager import dbManager


class Products:

    @staticmethod
    def get_products_cheap_to_expensive(min_price, max_price):
        return Products.get_products(min_price, max_price, order_column='price', order_type='ASC')

    @staticmethod
    def get_products_expensive_to_cheap(min_price, max_price):
        return Products.get_products(min_price, max_price, order_column='price', order_type='DESC')

    @staticmethod
    def get_products_most_bought(min_price, max_price):
        return Products.get_products(min_price, max_price, order_column='num_bought', order_type='DESC')

    @staticmethod
    def get_products(min_price, max_price, order_type=None, order_column=None):
        conditions = []
        if min_price:
            conditions.append(f'price >= {min_price}')
        if max_price:
            conditions.append(f'{max_price} >= price')
        return dbManager.build_fetch_query('products', order_column=order_column, order_type=order_type,
                                           conditions=conditions)

    @staticmethod
    def get_products_by_ids(product_ids):
        condition = f'product_id IN ({",".join(set(product_ids.split(",")))})'
        return dbManager.build_fetch_query('products', conditions=[condition])

    @staticmethod
    def update_products_num_bought(id_to_bought_dict):
        for product_id, num_bought in id_to_bought_dict.items():
            query = f'''
            UPDATE products
            SET num_bought = num_bought + {num_bought}
            WHERE product_id={product_id}
            '''
            dbManager.commit(query)


products_db = Products()
