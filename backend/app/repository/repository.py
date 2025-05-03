from typing import Type, Union, List
from sqlalchemy.orm import sessionmaker
from repository.database import cretare_pg_engine
from repository.crud import CrudFactory
from repository.models import Base, BaseModel

# Solo se crean una vez, y los repositories los comparten
_engine = cretare_pg_engine()

SessionLocal = sessionmaker(
    bind=_engine,
    autoflush=False,
    expire_on_commit=False,
    autocommit=False
)
Model = Base
Schema = BaseModel


class GenericRepository:
    def __init__(self, model: Type[Model], schema: Type[Schema]):
        self.model = model
        self.schema = schema
        # TODO: WARNING: estamos pasando una clase aqui, no una instancia de la clase, no se si la factory con esto se vaya a romper
        # Es lo primero que debemos de considerar si algo falla
        self.crud = CrudFactory(model)
        
    def get_all(self, with_for_update: bool = False) -> list[Model]: 
        with SessionLocal() as session:
            return self.crud.get_many_by_ids(session, with_for_update)

    def query(self, id_: Union[int, str, List[int], List[str]], column: str = "id", with_for_update: bool = False) -> Union[Model, list[Model]]:   
        with SessionLocal() as session:
            if type(id_) != list:
                # Query de un solo elemento
                return self.crud.get_one_by_id(session,id_, column, with_for_update)
            else:
                # Query de muchos elementos
                return self.crud.get_many_by_ids(session, id_, column, with_for_update)
    
    def create(self, schema_data: Union[Schema, List[Schema]],return_models: bool = False) -> Union[ Model, list[Schema], bool]:
        with SessionLocal() as session:
            if type(schema_data) != list:
                # Solo crear un registro 
                return self.crud.create(session,schema_data)
            else:
                # Crea varios registros
                return self.crud.create_many(session, schema_data, return_models)
            
    def update(self, updates:Union[Schema, dict[Union[int, str], Schema]], id_to_edit: Union[int, str], column: str = "id", return_models: bool = False) -> Union[Model, list[Model], bool]:
        with SessionLocal() as session:
            if type(updates) == Schema:
                # Un solo registro se actualiza
                return self.crud.update_by_id(session, updates, id_to_edit, column)
            else:
                # Muchas updates
                return self.crud.update_many_by_ids(session, updates, column, return_models)
             
             
    def delete(self, id_to_delete: Union[int, str, List[int], List[str]], column: str = "id") -> int:
        with SessionLocal() as session:
            if type(id_to_delete) != list:
                # Un solo registro
                return self.crud.remove_by_id(session, id_to_delete, column)
            else:
                # Mas de un registro
                return self.crud.remove_many_by_ids(session, id_to_delete, column)
            
            
                