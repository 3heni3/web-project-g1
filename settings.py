import os

from dotenv import load_dotenv

load_dotenv()

# Secret key setting from .env for Flask sessions
SECRET_KEY = os.environ.get('SECRET_KEY')

# DB base configuration from .env for modularity and security reasons
DB = {
    'host': os.environ.get('DB_HOST'),
    'user': os.environ.get('DB_USER'),
    'password': os.environ.get('DB_PASSWORD'),
    'database': os.environ.get('DB_NAME')
}
