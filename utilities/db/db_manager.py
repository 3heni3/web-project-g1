import mysql.connector

from settings import DB


class DBManager:
    __connection = None
    __cursor = None

    def __init__(self):
        pass

    def commit(self, query, args=()):
        # Use for INSERT UPDATE, DELETE statements.
        # Returns: The number of rows affected by the query (a non-negative int).
        self.__connect()
        self.__execute(query, args)
        self.__connection.commit()
        affected_rows = self.__cursor.rowcount
        self.__close_connection()
        return affected_rows

    def fetch(self, query, args=()):
        # Use for SELECT statement.
        # Returns: False if the query failed, or the result of the query if it succeeded.
        query_result = False
        self.__connect()
        if self.__execute(query, args):
            query_result = self.__cursor.fetchall()
        self.__close_connection()
        return query_result

    def execute(self, query, args=()):
        # Use for CREATE, DROP AND ALTER statements.
        self.__connect()
        query_result = self.__execute(query, args)
        self.__close_connection()
        return query_result

    def __connect(self):
        # Opens a connection to the database.
        try:
            if not self.__connection or not self.__connection.is_connected():
                self.__connection = mysql.connector.connect(**DB)
                self.__cursor = self.__connection.cursor(named_tuple=True)
        except mysql.connector.Error as error:
            print("Connection failed with error {}".format(error))

    def __execute(self, query, args=()):
        # Executes a given query with given args, if provided.
        if query:
            try:
                self.__cursor.execute(query, args)
                return True
            except mysql.connector.Error as error:
                print("Query failed with error {}".format(error))
        return False

    def __close_connection(self):
        # Closes an open database connection.
        try:
            if self.__connection.is_connected():
                self.__connection.close()
                self.__cursor.close()
        except mysql.connector.Error as error:
            print("Failed to close connection with error {}".format(error))

    def build_fetch_query(self, table_name, table_columns=None, conditions=None, limit=None, order_column=None,
                          order_type='ASC'):
        select_columns = f'{",".join(table_columns)}' if table_columns else '*'
        where_clause = f'WHERE {" AND ".join(conditions)}' if conditions else ''
        order_clause = f'ORDER BY {order_column} {order_type}' if order_column else ''
        limit_clause = f'LIMIT {limit}' if limit else ''

        return self.fetch(f'SELECT {select_columns} from {table_name} {where_clause} {order_clause} {limit_clause};')

    def build_insert_query(self, table_name, table_columns, values):
        values_clause_list = [f'({",".join(value)})' for value in values]
        values_clause = ','.join(values_clause_list)

        return self.commit(f'INSERT INTO {table_name} ({",".join(table_columns)}) VALUES {values_clause};')

    def build_update_query(self, table_name, updates: dict, conditions=None):
        update_clauses = ', '.join(f'{col} = {val}' for col, val in updates.items())
        set_clause = f'SET {update_clauses}'
        where_clause = f'WHERE {" AND ".join(conditions)}' if conditions else ''

        return self.commit(f'UPDATE {table_name} {set_clause} {where_clause};')


# Creates an instance for the DBManager class for export.
dbManager = DBManager()
