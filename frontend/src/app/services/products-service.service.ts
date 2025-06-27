import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { CATEGORY } from '../models/category.enum';
import { Category } from '../models/category.interface';
import { PRODUCTS } from '../models/products.array';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products: Product[] = JSON.parse(localStorage.getItem("products")!) || PRODUCTS

  constructor(private http: HttpClient) { }


  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  getProductsByTag(tag: string): Product[] {
    return this.products.filter((p) => p.tags.includes(tag));
  }

  addProduct(product: Product): boolean {
    this.products.push(product);
    this.saveToLocalStorage();
    return true;
  }

  editProduct(id: number, newProduct: Product): boolean {
    // Implementar con Put
    this.products = this.products.map((product) => {
      if(product.id === id){
        return newProduct;
      } else{
        return product;
      }
    });
    this.saveToLocalStorage();
    return true;
  }

  deleteProduct(id: number): boolean {
    this.products = this.products.filter(p => p.id !== id);
    this.saveToLocalStorage();
    return true;
  }


  saveToLocalStorage(): void {
    localStorage.setItem('products', JSON.stringify(this.products));
  }
}