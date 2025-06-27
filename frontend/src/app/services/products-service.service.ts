import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { CATEGORY } from '../models/category.enum';
import { Category } from '../models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products: Product[] = JSON.parse(localStorage.getItem("products")!) || [   {
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
      imageUrl: "D1.jpeg"
    },
    {
      id: 3,
      category: CATEGORY.CARRITOSNACKS,
      name: "Carrito de Palomitas",
      description: "Carrito móvil para servir palomitas en fiestas.",
      tags: ['Bebidas'],
      imageUrl: "1.jpg"
    },
    {
      id: 3,
      category: CATEGORY.CARRITOSNACKS,
      name: "Carrito de Si",
      description: "Carrito móvil para servir palomitas en fiestas.",
      tags: ['Bebidas'],
      imageUrl: "2.jpg"
    },
    {
      id: 3,
      category: CATEGORY.CARRITOSNACKS,
      name: "Carrito de UwU",
      description: "Carrito móvil para servir palomitas en fiestas.",
      tags: ['Bebidas'],
      imageUrl: "3.jpg"
    },
    {
      id: 3,
      category: CATEGORY.CARRITOSNACKS,
      name: "Carrito de Ola",
      description: "Carrito móvil para servir palomitas en fiestas.",
      tags: ['Bebidas'],
      imageUrl: "4.jpg"
    },
    {
      id: 3,
      category: CATEGORY.CARRITOSNACKS,
      name: "Carrito de Palomitas",
      description: "Carrito móvil para servir palomitas en fiestas.",
      tags: ['Paletas'],
      imageUrl: "1.jpg"
    },
    {
      id: 3,
      category: CATEGORY.CARRITOSNACKS,
      name: "Carrito de Palomitas",
      description: "Carrito móvil para servir palomitas en fiestas.",
      tags: ['Paletas'],
      imageUrl: "2.jpg"
    },
    {
      id: 3,
      category: CATEGORY.CARRITOSNACKS,
      name: "Carrito de Palomitas",
      description: "Carrito móvil para servir palomitas en fiestas.",
      tags: ['Paletas'],
      imageUrl: "3.jpg"
    },
    {
      id: 3,
      category: CATEGORY.CARRITOSNACKS,
      name: "Carrito de Palomitas",
      description: "Carrito móvil para servir palomitas en fiestas.",
      tags: ['Paletas'],
      imageUrl: "3.jpg"
    },
    {
      id: 3,
      category: CATEGORY.CARRITOSNACKS,
      name: "Carrito de Palomitas",
      description: "Carrito móvil para servir palomitas en fiestas.",
      tags: ['Snacks'],
      imageUrl: ""
    },
    {
      id: 3,
      category: CATEGORY.CARRITOSNACKS,
      name: "Carrito de Palomitas",
      description: "Carrito móvil para servir palomitas en fiestas.",
      tags: ['Snacks'],
      imageUrl: ""
    },
    {
      id: 3,
      category: CATEGORY.CARRITOSNACKS,
      name: "Carrito de Palomitas",
      description: "Carrito móvil para servir palomitas en fiestas.",
      tags: ['Snacks'],
      imageUrl: ""
    },
    {
      id: 3,
      category: CATEGORY.CARRITOSNACKS,
      name: "Carrito de Palomitas",
      description: "Carrito móvil para servir palomitas en fiestas.",
      tags: ['Snacks'],
      imageUrl: ""
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
    {
      id: 13,
      category: CATEGORY.DECORACION,
      name: "Centro de Mesa",
      description: "Decoración elegante para mesas de eventos.",
      tags: ['Flores', 'Mesa', 'Evento'],
      imageUrl: "D2.jpeg"
    },
    {
      id: 14,
      category: CATEGORY.DECORACION,
      name: "Centro de Mesa",
      description: "Decoración elegante para mesas de eventos.",
      tags: ['Flores', 'Mesa', 'Evento'],
      imageUrl: "D3.jpeg"
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
