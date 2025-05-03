import pytest
from repository.repository import GenericRepository

@pytest.fixture
def create_factory():
    def _create(repo: GenericRepository, schema):
        return repo.create(schema)
    return _create

@pytest.fixture
def create_many_factory():
    def _create_many(repo: GenericRepository, schemas):
        return repo.create(schema_data=schemas, return_models=True)
    return _create_many

@pytest.fixture
def create_many_with_no_return_models_factory():
    def _create_many_no_return(repo: GenericRepository, schemas):
        return repo.create(schema_data=schemas, return_models=False)
    return _create_many_no_return

@pytest.fixture
def query_by_id_factory():
    def _query_by_id(repo: GenericRepository, id_):
        return repo.query(id_=id_)
    return _query_by_id

@pytest.fixture
def query_by_id_with_for_update_factory():
    def _query_by_id_with_for_update(repo: GenericRepository, id_):
        return repo.query(id_=id_, with_for_update=True)
    return _query_by_id_with_for_update

@pytest.fixture
def query_by_name_factory():
    def _query_by_name(repo: GenericRepository, name):
        return repo.query(id_=name, column="name")
    return _query_by_name

@pytest.fixture
def get_all_factory():
    def _get_all(repo: GenericRepository):
        return repo.get_all()
    return _get_all

@pytest.fixture
def update_one_factory():
    def _update_one(repo: GenericRepository, schema, id_, return_models):
        return repo.update(updates=schema, id_to_edit= id_, return_models = return_models)
    return _update_one

@pytest.fixture
def update_many_factory():
    def _update_many(repo: GenericRepository, updates, column, return_models):
        return repo.update(updates=updates, column=column, return_models=return_models)
    return _update_many

@pytest.fixture
def delete_one_by_id_factory():
    def _delete_one(repo: GenericRepository, id_, column):
        return repo.delete(id_to_delete=id_,column=column)
    return _delete_one

@pytest.fixture
def delete_many_by_ids_factory():
    def _delete_many(repo: GenericRepository, ids, column):
        return repo.delete(ids,column)
    return _delete_many
