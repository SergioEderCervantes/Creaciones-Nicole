import pytest

@pytest.fixture
def create_factory():
    def _create(repo, schema):
        return repo.create(schema)
    return _create

@pytest.fixture
def create_many_factory():
    def _create_many(repo, schemas):
        return repo.create(schema_data=schemas, return_models=True)
    return _create_many

@pytest.fixture
def create_many_with_no_return_models_factory():
    def _create_many_no_return(repo, schemas):
        return repo.create(schema_data=schemas, return_models=False)
    return _create_many_no_return

@pytest.fixture
def query_by_id_factory():
    def _query_by_id(repo, id_):
        return repo.query(id_=id_)
    return _query_by_id

@pytest.fixture
def query_by_id_with_for_update_factory():
    def _query_by_id_with_for_update(repo, id_):
        return repo.query(id_=id_, with_for_update=True)
    return _query_by_id_with_for_update

@pytest.fixture
def query_by_name_factory():
    def _query_by_name(repo, name):
        return repo.query(id_=name, column="name")
    return _query_by_name
