from typing import Type, Union, List
from sqlalchemy.orm import sessionmaker
from repository.database import cretare_pg_engine
from repository.crud import CrudFactory
from repository.models import Base, BaseModel
from sqlalchemy.exc import MultipleResultsFound
from repository.crud import CustomModelsException

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
        self.crud = CrudFactory(model)
        
    def get_all(self, with_for_update: bool = False) -> list[Model]: 
        """Devuelve todos los Registros de la base de datos

        Args:
            with_for_update (bool, optional): Especifica si los modelos retornados son solo para lectura o necesitas modificarlos.
            Defaults to False.

        Returns:
            list[Model]: lista de todos los records del modelo
        """
        with SessionLocal() as session:
            return self.crud.get_many_by_ids(session, with_for_update=with_for_update)

    def query(self, id_: Union[int, str, List[int], List[str]], column: str = "id", with_for_update: bool = False) -> Union[Model, list[Model]]:   
        """ Genera una consulta a la base de datos

        Args:
            id_ (Union[int, str, List[int], List[str]]): el o los ids/atributos a buscar en la base
            column (str, optional): El nombre de la columna que se ejecutara la consulta. Defaults to "id".
            with_for_update (bool, optional): Especifica si los modelos retornados son solo para lectura o necesitas modificarlos. Defaults to False.

        Returns:
            Union[Model, list[Model]]: El registro o lista de registros consultados 
        """
        with SessionLocal() as session:
            try:
                if type(id_) != list:
                    # Query de un solo elemento
                    return self.crud.get_one_by_id(session,id_, column, with_for_update)
                else:
                    # Query de muchos elementos
                    return self.crud.get_many_by_ids(session, id_, column, with_for_update)
            except MultipleResultsFound:
                # La query de get_one_by_id devolvio multiples elementos
                return self.crud.get_many_by_ids(session, [id_], column, with_for_update)
    
    def create(self, schema_data: Union[Schema, List[Schema]],return_models: bool = False) -> Union[ Model, list[Schema], bool]:
        """Crea uno o varios registros nuevos en la base de datos

        Args:
            schema_data (Union[Schema, List[Schema]]): Schema o lista de Schemas los cuales seran creados en la base de datos
            return_models (bool, optional): Al crear más de un registro, ¿deberían devolverse los modelos creados
                o un booleano que indique que han sido creados?. Defaults to False.

        Returns:
            Union[ Model, list[Schema], bool]: El Modelo creado o la lista de modelos creados, o un boolean
        """
        with SessionLocal() as session:
            if type(schema_data) != list:
                # Solo crear un registro 
                return self.crud.create(session,schema_data)
            else:
                # Crea varios registros
                return self.crud.create_many(session, schema_data, return_models)
            
    def update(self, updates:Union[Schema, dict[Union[int, str], Schema]], id_to_edit: Union[int, str] = 0, column: str = "id", return_models: bool = False) -> Union[Model, list[Model], bool]:
        """Actualizar uno o mas Registros en la base de datos

        Args:
            updates (Union[Schema, dict[Union[int, str], Schema]]): Los cambios realizados, si solo se quiere cambiar uno solo se manda el nuevo Schema,
            Si se decide actualizar varios se manda un diccionario de forma [clave]=valor: [id o atributo] = Schema nuevo
            id_to_edit (Union[int, str], optional): Necesario cuando solo se cambia un elemento, especifica el id del elemento que se quiere actualizar. Defaults to 0.
            column (str, optional): Columna la cual se quiere tomar como referencia para encontrar los registros que se quieren actualizar. Defaults to "id".
            return_models (bool, optional): Para cuando se actualiza mas de un registro, especifica si se quiere retornar una lista con todos
            los nuevos regustros actualizados. Defaults to False.

        Raises:
            CustomModelsException: Cuando se quiere actualizar un elemento pero no se brinda id_to_edit

        Returns:
            Union[Model, list[Model], bool]: El modelo actualizado, o la lista de modelos actualizados, o un boolean si se tiene return_models = false
        """
        with SessionLocal() as session:
            if isinstance(updates, Schema):
                if id_to_edit == 0:
                    raise CustomModelsException("Args Exception: no se especifico id para un update a un elemento unico, por favor especifica el id a editar")
                # Un solo registro se actualiza
                return self.crud.update_by_id(session, updates, id_to_edit, column)
            else:
                # Muchas updates
                return self.crud.update_many_by_ids(session, updates, column, return_models)
             
             
    def delete(self, id_to_delete: Union[int, str, List[int], List[str]], column: str = "id") -> int:
        """Elimina uno o varios registros de la base de datos

        Args:
            id_to_delete (Union[int, str, List[int], List[str]]): id o atributo a buscar para eliminar el registro
            column (str, optional): La columna de la base de datos para buscar el id a borrar. Defaults to "id".

        Returns:
            int: Numero de registros eliminados
        """
        with SessionLocal() as session:
            if type(id_to_delete) != list:
                # Un solo registro
                return self.crud.remove_by_id(session, id_to_delete, column)
            else:
                # Mas de un registro
                return self.crud.remove_many_by_ids(session, id_to_delete, column)
            
    def to_schema(self, models: Union[Model, list[Model]]) -> Union[Schema, list[Schema]]:
        """Casteo de Modelos SQLAlchemy (que no debemos de tocar tanto) a Schemas (lo que debemos de manejar)

        Args:
            models (Union[Model, list[Model]]): Modelo a castear

        Returns:
            Union[Schema, list[Schema]]: Schema Pydantic
        """
        if isinstance(models, list):
            return [self.schema.model_validate(model, from_attributes=True) for model in models]
        return self.schema.model_validate(models, from_attributes=True)
    

