import os
from sqlalchemy import create_engine, Engine
from sqlalchemy.engine.url import URL
from sqlalchemy.orm import declarative_base
from dotenv import load_dotenv

load_dotenv()

Base = declarative_base()

def create_pg_url_from_env() -> str:
    url = URL.create(
        drivername="postgresql+psycopg2",
        username=os.getenv("POSTGRES_USER", "postgres"),
        password=os.getenv("POSTGRES_PASSWORD"),
        host=os.getenv("POSTGRES_HOST", "localhost"),
        port=os.getenv("POSTGRES_PORT", "5432"),
        database=os.getenv("POSTGRES_DB", "mydatabase"),
    )
    return str(url.render_as_string(hide_password=False))
    
    
def cretare_pg_engine() -> Engine:
    database_url = create_pg_url_from_env()
    return create_engine(
        database_url,
        echo=True,
        future=True,
    )
    
if __name__ == "__main__":
    print(create_pg_url_from_env())