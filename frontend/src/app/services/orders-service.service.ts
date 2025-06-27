import { Injectable } from '@angular/core';
import { Order } from '../models/order.interface';
import { STATE } from '../models/state.enum';
import { HttpClient } from '@angular/common/http';
import { ORDERS } from '../models/orders.array';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private orders: Order[] = JSON.parse(localStorage.getItem("orders")!) || ORDERS

  constructor(private http: HttpClient) {

  }

  getOrders(): Order[] {
    return this.orders;
  }

  getOrderById(id: number): Order | undefined {
    return this.orders.find((o) => o.id == id);
  }

  addOrder(order: Order) {
    this.orders.push(order);
    this.saveToLocalStorage();
    return true;
  }

  editOrder(id: number, newOrder: Order): boolean {
    this.orders = this.orders.map((order) =>
      (order.id === id) ? newOrder : order
    );
    this.saveToLocalStorage();
    return true;
  }

  deleteOrder(id: number): boolean {
    // Implementar con delete
    this.orders = this.orders.filter(p => p.id !== id);
    this.saveToLocalStorage();
    return true;
  }

  saveToLocalStorage(): void {
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }
}
