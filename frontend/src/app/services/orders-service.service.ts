import { Injectable } from '@angular/core';
import { Order } from '../models/order.interface';
import { STATE } from '../models/state.enum';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {

  private orders: Order[] = [
    {
      id: 1,
      state: STATE.PENDING,
      description: "Carrito donde se sirva mojitos, Cheves y clericot",
      name: "Carrito de bebidas",
      amount: 2000,
      deliveryDate: "20/06/2025"
    },
    {
      id: 2,
      state: STATE.PENDING,
      description: "Mesa de postres con variedad de dulces y pasteles",
      name: "Mesa de postres",
      amount: 1500,
      deliveryDate: "22/06/2025"
    },
    {
      id: 3,
      state: STATE.PENDING,
      description: "Servicio de barra de café con barista profesional",
      name: "Barra de café",
      amount: 1800,
      deliveryDate: "25/06/2025"
    },
    {
      id: 4,
      state: STATE.PENDING,
      description: "Carrito de snacks con papas, palomitas y nachos",
      name: "Carrito de snacks",
      amount: 1200,
      deliveryDate: "28/06/2025"
    }
  ];

  constructor(private http: HttpClient) {

  }

  getOrders(): Order[]{
    return this.orders;
  }

  getOrderById(id: number): Order | undefined{
    return this.orders.find((o) => o.id == id);
  }

  editOrder(id:number, newOrder: Order): boolean{
    // Implementar con Put
    return true;
  }
  
  deleteOrder(id:number):boolean{
    // Implementar con delete
    return true;
  }
}
