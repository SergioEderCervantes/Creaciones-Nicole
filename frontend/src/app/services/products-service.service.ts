import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { CATEGORY } from '../models/category.enum';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products: Product[] = [
    {
      id: 1,
      category: CATEGORY.REPOSTERIA,
      name: "Pastel XV",
      description: "",
      tags: ['XV'],
      imageUrl: "pasteleria.jpg"
    },
    {
      id: 2,
      category: CATEGORY.DECORACION,
      name: "Centro de Mesa Floral",
      description: "Decoración elegante para mesas de eventos.",
      tags: ['Flores', 'Mesa', 'Evento'],
      imageUrl: "pasteleria.jpg"
    },
    {
      id: 3,
      category: CATEGORY.CARRITOSNACKS,
      name: "Carrito de Palomitas",
      description: "Carrito móvil para servir palomitas en fiestas.",
      tags: ['Snacks', 'Fiesta', 'Palomitas'],
      imageUrl: "pasteleria.jpg"
    },
    {
      id: 4,
      category: CATEGORY.POSTRES,
      name: "Mesa de Postres",
      description: "Variedad de postres para eventos especiales.",
      tags: ['Dulces', 'Evento', 'Mesa'],
      imageUrl: "pasteleria.jpg"
    },
    {
      id: 5,
      category: CATEGORY.REPOSTERIA,
      name: "Pastel Elegante",
      description: "",
      tags: ['Elegante'],
      imageUrl: "pastelElegante.jpg"
    },
    {
      id: 6,
      category: CATEGORY.REPOSTERIA,
      name: "Pastel Elegante",
      description: "",
      tags: ['Elegante'],
      imageUrl: "pastelElegante2.jpg"
    },
    {
      id: 7,
      category: CATEGORY.REPOSTERIA,
      name: "Pastel elegante",
      description: "",
      tags: [ 'Elegante'],
      imageUrl: "pastelfresa.jpg"
    },
    {
      id: 8,
      category: CATEGORY.REPOSTERIA,
      name: "Pastel XV lindo",
      description: "",
      tags: [ 'XV'],
      imageUrl: "pasteleria.jpg"
    },
    {
      id: 9,
      category: CATEGORY.REPOSTERIA,
      name: "Pastel XV lindo",
      description: "",
      tags: [ 'XV'],
      imageUrl: "pasteleria.jpg"
    },
    {
      id: 10,
      category: CATEGORY.REPOSTERIA,
      name: "Pastel Elegante",
      description: "",
      tags: ['Elegante'],
      imageUrl: "pastelElegante.jpg"
    },
    {
      id: 11,
      category: CATEGORY.REPOSTERIA,
      name: "Pastel Elegante",
      description: "",
      tags: ['Elegante'],
      imageUrl: "pastelElegante2.jpg"
    },
    {
      id: 12,
      category: CATEGORY.REPOSTERIA,
      name: "Pastel elegante",
      description: "",
      tags: [ 'Elegante'],
      imageUrl: "pastelfresa.jpg"
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

  editProduct(id: number, newProduct: Product): boolean {
    // Implementar con Put
    return true;
  }

  deleteProduct(id: number): boolean {
    // Implementar con delete
    return true;
  }

}
