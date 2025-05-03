from sqlalchemy import delete, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from repository.models import Base, BaseModel

Model = Base 
Schema = BaseModel

class CustomModelsException(Exception):
    pass


class IntegrityConflictException(Exception):
    pass


class NotFoundException(Exception):
    pass


def CrudFactory(model: Model):
    class Crud:
        @classmethod
        def create(cls,session: Session,data:Schema) ->Model:
            """Accepts a Pydantic model, creates a new record in the database, catches
            any integrity errors, and returns the record.

            Args:
                session (Session): SQLAlchemy session
                data (Schema): Pydantic model

            Raises:
                IntegrityConflictException: if creation conflicts with existing data
                CustomModelsException: if an unknown error occurs

            Returns:
                Model: created SQLAlchemy model
            """
            try:
                db_model = model(**data.model_dump())
                session.add(db_model)
                session.commit()
                session.refresh(db_model)
                return db_model
            except IntegrityError:
                raise IntegrityConflictException(
                    f"{model.__tablename__} conflicts with existing data.",
                )
            except Exception as e:
                raise CustomModelsException(f"Unknown error occurred: {e}") from e
            
        @classmethod
        def create_many(cls,session: Session,data: list[Schema],return_models: bool = False) -> list[Model] | bool:
            """Accepts a list of Pydantic models, creates a bunch of new records in the database, catches
            any integrity errors, and returns the records.

            Args:
                session (Session): SQLAlchemy session
                data (list[Schema]): list of Pydantic models
                return_models (bool, optional): Should the created models be returned
                    or a boolean indicating they have been created. Defaults to False.

            Raises:
                IntegrityConflictException: if creation conflicts with existing data
                CustomModelsException: if an unknown error occurs

            Returns:
                list[Model] | bool: list of created SQLAlchemy models or boolean
            """
            db_models = [model(**d.model_dump()) for d in data]
            try:
                session.add_all(db_models)
                session.commit()
            except IntegrityError:
                raise IntegrityConflictException(
                    f"{model.__tablename__} conflict with existing data.",
                )
            except Exception as e:
                raise CustomModelsException(f"Unknown error occurred: {e}") from e

            if not return_models:
                return True

            for m in db_models:
                session.refresh(m)

            return db_models
        
        @classmethod
        def get_one_by_id( cls, session: Session, id_: str | int, column: str = "id", with_for_update: bool = False) -> Model:
            """Fetches one record from the database based on a column value and returns
            it, or returns None if it does not exist. Raises an exception if the column
            doesn't exist.

            Args:
                session (Session): SQLAlchemy session
                id_ (str | int): value to search for in `column`.
                column (str, optional): the column name in which to search.
                    Defaults to "id".
                with_for_update (bool, optional): Should the returned row be locked
                    during the lifetime of the current open transactions.
                    Defaults to False.

            Raises:
                CustomModelsException: if the column does not exist on the model

            Returns:
                Model: SQLAlchemy model or None
            """
            try:
                q = select(model).where(getattr(model, column) == id_)
            except AttributeError:
                raise CustomModelsException(
                    f"Column {column} not found on {model.__tablename__}.",
                )

            if with_for_update:
                q = q.with_for_update()

            results = session.execute(q).scalars().all()
            print(results)
            if not results:
                # Sin resultado
                print("Retornando NONE")
                return None
            if len(results) == 1:
                # Resultado Unico
                print("Retornando UNICO VALOR")
                return results[0]
            # Multiples resultados
            print("Retornando MULTIPLES VALORES")
            return results
        
        @classmethod
        def get_many_by_ids(cls, session: Session, ids: list[str | int] = None, column: str = "id", with_for_update: bool = False) -> list[Model]:
            """Fetches multiple records from the database based on a column value and
            returns them. Raises an exception if the column doesn't exist.
            if there's no id's or column specified, it returns all records from the table
            Args:
                session (Session): SQLAlchemy session
                ids (list[str  |  int], optional): list of values to search for in
                    `column`. Defaults to None.
                column (str, optional): the column name in which to search
                    Defaults to "id".
                with_for_update (bool, optional): Should the returned rows be locked
                    during the lifetime of the current open transactions.
                    Defaults to False.

            Raises:
                CustomModelsException: if the column does not exist on the model

            Returns:
                list[Model]: list of SQLAlchemy models
            """
            q = select(model)
            if ids:
                try:
                    q = q.where(getattr(model, column).in_(ids))
                except AttributeError:
                    raise CustomModelsException(
                        f"Column {column} not found on {model.__tablename__}.",
                    )

            if with_for_update:
                q = q.with_for_update()

            rows = session.execute(q)
            return rows.unique().scalars().all()
        
        @classmethod
        def update_by_id( cls, session: Session, data: Schema, id_: str | int, column: str = "id") -> Model:
            """Updates a record in the database based on a column value and returns the
            updated record. Raises an exception if the record isn't found or if the
            column doesn't exist.

            Args:
                session (Session): SQLAlchemy session
                data (Schema): Pydantic schema for the updated data.
                id_ (str | int): value to search for in `column`
                column (str, optional): the column name in which to search
                    Defaults to "id".
            Raises:
                NotFoundException: if the record isn't found
                IntegrityConflictException: if the update conflicts with existing data

            Returns:
                Model: updated SQLAlchemy model
            """
            db_model = cls.get_one_by_id(
                session, id_, column=column, with_for_update=True
            )
            if not db_model:
                raise NotFoundException(
                    f"{model.__tablename__} {column}={id_} not found.",
                )

            values = data.model_dump(exclude_unset=True)
            for k, v in values.items():
                setattr(db_model, k, v)

            try:
                session.commit()
                session.refresh(db_model)
                return db_model
            except IntegrityError:
                raise IntegrityConflictException(
                    f"{model.__tablename__} {column}={id_} conflict with existing data.",
                )
                
        @classmethod
        def update_many_by_ids( cls, session: Session, updates: dict[str | int, Schema], column: str = "id", return_models: bool = False,) -> list[Model] | bool:
            """Updates multiple records in the database based on a column value and
            returns the updated records. Raises an exception if the column doesn't
            exist.

            Args:
                session (Session): SQLAlchemy session
                updates (dict[str  |  int, Schema]): dictionary of id_ to
                    Pydantic update schema
                column (str, optional): the column name in which to search.
                    Defaults to "id".
                return_models (bool, optional): Should the created models be returned
                    or a boolean indicating they have been created. Defaults to False.
                    Defaults to False.

            Raises:
                IntegrityConflictException: if the update conflicts with existing data

            Returns:
                list[Model] | bool: list of updated SQLAlchemy models or boolean
            """
            updates = {str(id): update for id, update in updates.items() if update}
            ids = list(updates.keys())
            db_models = cls.get_many_by_ids(
                session, ids=ids, column=column, with_for_update=True
            )

            for db_model in db_models:
                values = updates[str(getattr(db_model, column))].model_dump(
                    exclude_unset=True
                )
                for k, v in values.items():
                    setattr(db_model, k, v)
                session.add(db_model)

            try:
                session.commit()
            except IntegrityError:
                raise IntegrityConflictException(
                    f"{model.__tablename__} conflict with existing data.",
                )

            if not return_models:
                return True

            for db_model in db_models:
                session.refresh(db_model)

            return db_models
        
        @classmethod
        def remove_by_id(cls, session: Session, id_: str | int, column: str = "id",) -> int:
            """Removes a record from the database based on a column value. Raises an
            exception if the column doesn't exist.

            Args:
                session (Session): SQLAlchemy session
                id (str | int): value to search for in `column` and delete
                column (str, optional): the column name in which to search.
                    Defaults to "id".

            Raises:
                CustomModelsException: if the column does not exist on the model

            Returns:
                int: number of rows removed, 1 if successful, 0 if not. Can be greater
                    than 1 if id_ is not unique in the column.
            """
            try:
                query = delete(model).where(getattr(model, column) == id_)
            except AttributeError:
                raise CustomModelsException(
                    f"Column {column} not found on {model.__tablename__}.",
                )

            rows = session.execute(query)
            session.commit()
            return rows.rowcount
        
        @classmethod
        def remove_many_by_ids( cls, session: Session, ids: list[str | int], column: str = "id") -> int:
            """Removes multiple records from the database based on a column value.
            Raises an exception if the column doesn't exist.

            Args:
                session (Session): SQLAlchemy session
                ids (list[str  |  int]): list of values to search for in `column` and
                column (str, optional): the column name in which to search.
                    Defaults to "id".

            Raises:
                CustomModelsException: if ids is empty to stop deleting an entire table
                CustomModelsException: if column does not exist on the model

            Returns:
                int: _description_
            """
            if not ids:
                raise CustomModelsException("No ids provided.")

            try:
                query = delete(model).where(getattr(model, column).in_(ids))
            except AttributeError:
                raise CustomModelsException(
                    f"Column {column} not found on {model.__tablename__}.",
                )

            rows = session.execute(query)
            session.commit()
            return rows.rowcount
        
        
    Crud.model = model
    return Crud