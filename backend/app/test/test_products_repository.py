# # test_product_repo.py

# import pytest
# from repository.repository import GenericRepository
# from repository.models import ProductModel, ProductSchema

# @pytest.fixture
# def repo():
#     return GenericRepository(ProductModel, ProductSchema)

# @pytest.fixture
# def schemas():
#     return [
#         ProductSchema(name="Product1", price=100, description="ProdDesc1"),
#         ProductSchema(name="Product2", price=200, description="ProdDesc2"),
#         ProductSchema(name="Product3", price=300, description=None),
#     ]

# def test_create(create_factory, repo, schemas):
#     result = create_factory(repo, schemas[0])
#     assert result is not None
#     assert result.name == schemas[0].name
#     assert result.price == schemas[0].price

# def test_create_many(create_many_factory, repo, schemas):
#     results = create_many_factory(repo, schemas)
#     assert len(results) == len(schemas)
#     for result, schema in zip(results, schemas):
#         assert result.name == schema.name
#         assert result.price == schema.price

# def test_create_many_with_no_return_models(create_many_with_no_return_models_factory, repo, schemas):
#     result = create_many_with_no_return_models_factory(repo, schemas)
#     assert result is True

# def test_query_by_id(create_factory, query_by_id_factory, repo, schemas):
#     model = create_factory(repo, schemas[0])
#     result = query_by_id_factory(repo, model.id)
#     assert result is not None
#     assert result.id == model.id

# def test_query_by_id_with_for_update(create_factory, query_by_id_with_for_update_factory, repo, schemas):
#     model = create_factory(repo, schemas[0])
#     result = query_by_id_with_for_update_factory(repo, model.id)
#     assert result is not None
#     assert result.id == model.id

# def test_query_by_name(create_many_factory, query_by_name_factory, repo, schemas):
#     create_many_factory(repo, schemas)
#     results = query_by_name_factory(repo, "Product1")
#     assert len(results) > 0
#     assert all(result.name == "Product1" for result in results)
