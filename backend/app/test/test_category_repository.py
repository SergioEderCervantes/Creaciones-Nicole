import pytest
from repository.repository import GenericRepository
from repository.models import CategoryModel, CategorySchema

@pytest.fixture
def repo():
    return GenericRepository(CategoryModel, CategorySchema)

@pytest.fixture
def schemas():
    return [
        CategorySchema(name="Category1", description="Description1"),
        CategorySchema(name="Category2", description="Description2"),
        CategorySchema(name="Category3", description=None),
    ]

def test_get_all(create_many_factory,get_all_factory, repo, schemas):
    create_many_factory(repo, schemas)
    results = get_all_factory(repo)
    assert len(results) == len(schemas)
    for result, schema in zip(results, schemas):
        assert result.name == schema.name
        assert result.description == schema.description
    
    
def test_create(create_factory, repo, schemas):
    result = create_factory(repo, schemas[0])
    assert result is not None
    assert result.name == schemas[0].name
    assert result.description == schemas[0].description

def test_create_many(create_many_factory, repo, schemas):
    results = create_many_factory(repo, schemas)
    assert len(results) == len(schemas)
    for result, schema in zip(results, schemas):
        assert result.name == schema.name
        assert result.description == schema.description

def test_create_many_with_no_return_models(create_many_with_no_return_models_factory, repo, schemas):
    result = create_many_with_no_return_models_factory(repo, schemas)
    assert result is True

def test_query_by_id(create_factory, query_by_id_factory, repo, schemas):
    model = create_factory(repo, schemas[0])
    result = query_by_id_factory(repo, model.id)
    assert result is not None
    assert result.id == model.id

def test_query_by_id_with_for_update(create_factory, query_by_id_with_for_update_factory, repo, schemas):
    model = create_factory(repo, schemas[0])
    result = query_by_id_with_for_update_factory(repo, model.id)
    assert result is not None
    assert result.id == model.id

def test_query_by_name(create_many_factory, query_by_name_factory, repo, schemas):
    create_many_factory(repo, schemas)
    results = query_by_name_factory(repo, "Category1")
    assert len(results) > 0
    assert all(result.name == "Category1" for result in results)

def test_update_one_by_id(create_factory, update_one_factory, repo, schemas):
    schema = schemas[0]
    model = create_factory(repo, schema)
    schema.name = "Custom_name"
    result = update_one_factory(repo, schema, model.id, True)
    
    assert type(result) == CategoryModel
    assert result.id == model.id
    assert result.name == schema.name
    
    
def test_update_many_by_id(create_many_factory, update_many_factory, repo, schemas):
    # Creamos una copia de los Schemas originales
    schemas_to_edit = schemas.copy()
    # Agregamos los schemas originales a la bd
    models = create_many_factory(repo, schemas)
    
    # Modificamos los schemas y creamos un diccionario que guarda el nuevo schema con el id del modelo
    updated_schemas_dict: dict[int | str, CategorySchema] = {}
    for schema, model in zip(schemas_to_edit, models):
        schema.name = f"Category of id {model.id}"
        updated_schemas_dict[model.id] = schema
    
    # Hacemos el update
    results = update_many_factory(repo, updated_schemas_dict, "id", True)
    
    for result in results:
        assert result.id in updated_schemas_dict
        assert result.name == updated_schemas_dict[result.id].name
    
    
def test_update_many_by_id_with_no_return_models(create_many_factory, update_many_factory, repo, schemas):
    # Creamos una copia de los Schemas originales
    schemas_to_edit = schemas.copy()
    # Agregamos los schemas originales a la bd
    models = create_many_factory(repo, schemas)
    
    # Modificamos los schemas y creamos un diccionario que guarda el nuevo schema con el id del modelo
    updated_schemas_dict: dict[int | str, CategorySchema] = {}
    for schema, model in zip(schemas_to_edit, models):
        schema.name = f"Category of id {model.id}"
        updated_schemas_dict[model.id] = schema
    
    # Hacemos el update
    results = update_many_factory(repo, updated_schemas_dict, "id", False)
    
    assert results is True

def test_delete_one_by_id(create_factory, delete_one_by_id_factory, repo, schemas):
    model = create_factory(repo, schemas[0])
    deleted_rows = delete_one_by_id_factory(repo, model.id, "id")
    assert deleted_rows == 1
    
def test_delete_one_by_name(create_factory, delete_one_by_id_factory, repo, schemas):
    model = create_factory(repo, schemas[0])
    deleted_rows = delete_one_by_id_factory(repo, "Category1", "name")
    assert deleted_rows > 1
    

def test_delete_many_by_ids(create_many_factory, delete_many_by_ids_factory, repo, schemas):
    count = len(schemas)
    models = create_many_factory(repo, schemas)
    deleted_rows = delete_many_by_ids_factory(repo,[model.id for model in models],"id")
    
    assert count == deleted_rows
    
def test_delete_many_by_description(delete_many_by_ids_factory, get_all_factory, repo):
    deleted_rows = delete_many_by_ids_factory(repo,"Description1","description")
    
    results = get_all_factory(repo)
        
    assert deleted_rows > 0
    assert all(result.description != "Description1" for result in results)
    
def test_to_schema_one(create_factory,repo, schemas):
    model = create_factory(repo, schemas[0])
    
    result = repo.to_schema(model)
    
    assert isinstance(result, CategorySchema)
    assert result.description == model.description == schemas[0].description
    assert result.name == model.name == schemas[0].name
    
def test_to_schema_many(create_many_factory,repo, schemas):
    models = create_many_factory(repo, schemas)
    
    results = repo.to_schema(models)
    for result, model in zip(results, models):
        assert isinstance(result, CategorySchema)
        assert result.description == model.description 
        assert result.name == model.name
    