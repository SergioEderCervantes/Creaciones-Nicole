import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { CATEGORY } from '../models/category.enum';
import { Category } from '../models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products: Product[] = JSON.parse(localStorage.getItem("products")!) || [
    {
      id: 1,
      category: CATEGORY.REPOSTERIA,
      name: "Pastel XV",
      description: "",
      tags: ['XV'],
      imageUrl: "products/1.jpg"
    },
    {
      id: 2,
      category: CATEGORY.DECORACION,
      name: "Pared Floral",
      description: "Decoración elegante para mesas de eventos.",
      tags: ['Flores', 'Mesa', 'Evento'],
      imageUrl: "D3.jpeg"
    },
    {
      id: 3,
      category: CATEGORY.CARRITO,
      name: "Carrito de snacks",
      description: "Carrito móvil para servir snacks en fiestas.",
      tags: ['Snacks'],
      imageUrl: "carrito.jpg"
    },
    {
      id: 4,
      category: CATEGORY.DECORACION,
      name: "Decoracion Touchdown",
      description: "Decoracion estilo football americano.",
      tags: ['fiesta'],
      imageUrl: "D2.jpeg"
    },
    {
      id: 5,
      category: CATEGORY.DECORACION,
      name: "Decoracion Disney",
      description: "Decoracion de fiestas infantiles.",
      tags: ['fiesta'],
      imageUrl: "D1.jpg"
    },
    {
      id: 6,
      category: CATEGORY.REPOSTERIA,
      name: "Pastel Primera comunion",
      description: "Hecho con cupcakes.",
      tags: ['infantiles'],
      imageUrl: "products/r1.jpg"
    },
    {
      id: 7,
      category: CATEGORY.REPOSTERIA,
      name: "Pastel Monster Hight",
      description: "Ideal para tu niña.",
      tags: ['infantiles'],
      imageUrl: "products/r2.jpg"
    },
    {
      id: 8,
      category: CATEGORY.REPOSTERIA,
      name: "Pastel Bacardi",
      description: "Para borracheras.",
      tags: ['adultos,fiesta'],
      imageUrl: "products/r3.jpg"
    },
    {
      id: 9,
      category: CATEGORY.DECORACION,
      name: "Arreglo de globos",
      description: "Personalizable!!.",
      tags: ['fiestas'],
      imageUrl: "products/R4.jpg"
    },
    {
      id: 10,
      category: CATEGORY.POSTRE,
      name: "Cupcackes Espaciales",
      description: "Divertidos y deliciosos.",
      tags: ['fiestas,infantiles'],
      imageUrl: "products/p1.jpg"
    },
    {
      id: 11,
      category: CATEGORY.CARRITO,
      name: "Tablas de queso y carnes frias",
      description: "Para todos tus eventos.",
      tags: ['Snacks'],
      imageUrl: "products/c2.jpg"
    },
    {
      id: 12,
      category: CATEGORY.POSTRE,
      name: "Cupcakes Navideños",
      description: "Con toda la escencia navideña.",
      tags: ['navidad'],
      imageUrl: "products/p2.jpg"
    },
    {
      id: 13,
      category: CATEGORY.POSTRE,
      name: "Gelatina Peach",
      description: "Con tus personajes favoritos.",
      tags: ['fiestas,infantiles'],
      imageUrl: "products/p3.jpg"
    },
    {
      id: 14,
      category: CATEGORY.CARRITO,
      name: "Cubanitos y Mojitos",
      description: "Deliciosas bebidas para un buen ambiente.",
      tags: ['Bebidas'],
      imageUrl: "products/c3.jpg"
    },
    {
      id: 15,
      category: CATEGORY.CARRITO,
      name: "Cerveza y Clericot",
      description: "Deliciosas bebidas para un buen ambiente.",
      tags: ['Bebidas'],
      imageUrl: "/products/c4.jpg"
    },
    {
      id: 16,
      category: CATEGORY.CARRITO,
      name: "Todo tipo de bebidas",
      description: "Que a tu evento no le falte color.",
      tags: ['Bebidas'],
      imageUrl: "products/c5.jpg"
    },
    {
      id: 17,
      category: CATEGORY.CARRITO,
      name: "Carrito de papitas",
      description: "Variedad sabrosa.",
      tags: ['Snacks'],
      imageUrl: "products/c6.jpg"
    },


  ];
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
    localStorage.setItem("products", JSON.stringify(this.products));
    return true;
  }

  editProduct(id: number, newProduct: Product): boolean {
    // Implementar con Put
    return true;
  }

  deleteProduct(id: number): boolean {
    this.products = this.products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(this.products));
    return true;
  }

}
