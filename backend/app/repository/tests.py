from repository.crud import CrudFactory
from repository.database import create_async_engine, create_pg_url_from_env
from sqlalchemy.ext.asyncio import async_sessionmaker
from repository.models import CategoryModel, CategorySchema



engine = create_async_engine(create_pg_url_from_env())

SessionLocal = async_sessionmaker(
    bind=engine,
    autoflush=False,
    expire_on_commit=False,
    autocommit=False,
)

CategoryCrud = CrudFactory(CategoryModel)

async def test():
    data = CategorySchema(name="Reposteria", description="Venta de pasteles")
    async with SessionLocal() as session:
        newCategory = await CategoryCrud.create(
            session=session, 
            data= data,
        )
        print(newCategory)
        await session.commit()
        
        
        
async def test2():
    async with SessionLocal() as session:
        category = await CategoryCrud.get_one_by_id(
            session=session,
            id_= "Reposteria",
            column="name",
            with_for_update=True
        )
        print(category)
        print(category.description)
        
