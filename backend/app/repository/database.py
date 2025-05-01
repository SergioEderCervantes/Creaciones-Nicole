import os
from sqlalchemy.engine.url import URL
from sqlalchemy.ext.asyncio import AsyncAttrs, create_async_engine as _create_async_engine
from sqlalchemy.orm import declarative_base
from dotenv import load_dotenv

load_dotenv()

Base = declarative_base(cls=AsyncAttrs)

def create_pg_url_from_env() -> str:
    url = URL.create(
        drivername="postgresql+asyncpg",
        username=os.getenv("POSTGRES_USER", "postgres"),
        password=os.getenv("POSTGRES_PASSWORD"),
        host=os.getenv("POSTGRES_HOST", "localhost"),
        port=os.getenv("POSTGRES_PORT", "5432"),
        database=os.getenv("POSTGRES_DB", "mydatabase"),
    )
    return str(url.render_as_string(hide_password=False))
    
    
def create_async_engine(database_url: str):
    return _create_async_engine(
        database_url,
        echo=True,
        future=True,
    )
    
if __name__ == "__main__":
    print(create_pg_url_from_env())