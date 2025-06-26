from pydantic import BaseModel
from sqlalchemy import Integer, String, Text, ForeignKey, Float, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import expression
from app.repository.database import Base

# Modelo de las Categorias


# TODO: Separar los modelos aquiu y un nuevo archivo para los schemas

class CategoryModel(Base):
    __tablename__ = "category"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text)
    
class CategorySchema(BaseModel):
    name: str
    description: str | None = None
    
    
# Modelo de los productos

class ProductsModel(Base):
    __tablename__ = "product"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    category_id: Mapped[int] = mapped_column(ForeignKey("category.id"), nullable=False)
    category: Mapped["CategoryModel"] = relationship("CategoryModel")
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text)
    image: Mapped[str] = mapped_column(String(255), nullable=False)
    

class ProductSchema(BaseModel):
    category_id: int
    name: str
    description: str
    image: str


# Modelo para las cuentas de Admin

class AdminModel(Base):
    __tablename__ = "admin"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(String(50), nullable=False)


class AdminSchema(BaseModel):
    name: str
    password: str
    email: str
    

# Modelo para pedidos
class OrderModel(Base):
    __tablename__ = "order"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    state: Mapped[str] = mapped_column(String(50), nullable=False)
    description: Mapped[str] = mapped_column(Text)
    amount: Mapped[float] = mapped_column(Float(2), nullable=False)
    delivery_date: Mapped[str] = mapped_column(Date, server_default=expression.func.current_date())

class OrderSchema(BaseModel):
    name: str
    state: str
    description: str
    amount: float
    delivery_date: str

