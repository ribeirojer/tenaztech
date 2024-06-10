import os
from psycopg2 import pool
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy

# Load .env file
load_dotenv()

# Get the connection string from the environment variable
connection_string = os.getenv('DATABASE_URL')

# Create a connection pool
connection_pool = pool.SimpleConnectionPool(
    1,  # Minimum number of connections in the pool
    10,  # Maximum number of connections in the pool
    connection_string
)

# Check if the pool was created successfully
if connection_pool:
    print("Connection pool created successfully")

# Initialize SQLAlchemy
db = SQLAlchemy()

def init_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = connection_string
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

# Function to get a connection from the pool
def get_db_connection():
    return connection_pool.getconn()

# Function to return a connection to the pool
def return_db_connection(conn):
    connection_pool.putconn(conn)

# Function to close all connections in the pool
def close_db_connections():
    connection_pool.closeall()
