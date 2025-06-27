import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Order } from '../../models/order.interface';
import { STATE } from '../../models/state.enum';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-add-order',
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    CalendarModule
  ],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css'
})
export class AddOrderComponent {
  @Input() visible!: boolean;
  @Input() data!: Order | undefined;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() editedOrder = new EventEmitter<Order>();

  //@Output() productoGuardado = new EventEmitter<Omit<Product, 'id' | 'imageUrl'>>();
  @Output() pedidoGuardado = new EventEmitter<Omit<Order, 'id'>>();


  editting:boolean = false;
  estados = Object.values(STATE)

  order: Omit<Order, 'id'>= {
    state: '' as STATE,
    name: '',
    description: '',
    amount: 0,
    deliveryDate: '',
  };

  fechaEntrega = new Date();

  constructor(private http: HttpClient) { }

  ngOnInit(){
    console.log('Valor en el hijo ngOnInit:', this.data);

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      console.log("Se cambio!");
      console.log('Nuevo valor en el hijo:', this.data);
      if (this.data){
        this.editting = true;
        this.order.name = this.data.name;
        this.order.state = this.data.state;
        this.order.description = this.data.description;
        this.order.amount = this.data.amount;
        this.order.deliveryDate = this.data.deliveryDate;
      }
    }
  }

  saveOrder() {
    this.order.deliveryDate = this.formatearFecha(this.fechaEntrega);
    const pedidoFinal: Omit<Order, 'id'> = {
      state: this.order.state,
      name: this.order.name,
      description: this.order.description,
      amount: this.order.amount,
      deliveryDate: this.order.deliveryDate
    };
    console.log(this.order.deliveryDate)

    this.pedidoGuardado.emit(pedidoFinal);
    this.close();
  }

  saveEdit(){
    // Pa no complicar, construimos un newData con lo de los formularios mas lo de la data
    this.order.deliveryDate = this.formatearFecha(this.fechaEntrega);
    const OrderEdited: Order = {
      id: this.data?.id ?? 0,
      state: this.order.state,
      name: this.order.name,
      description: this.order.description,
      amount: this.order.amount,
      deliveryDate: this.order.deliveryDate
    };
    console.log(this.order.deliveryDate)
    this.editedOrder.emit(OrderEdited);
    this.close();
  }

  close() {
    this.editting = false;
    this.visibleChange.emit(false);
    this.limpiarForm();
  }

  formatearFecha(fecha: Date): string {
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // +1 porque los meses empiezan en 0
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  limpiarForm() {
    this.order = {
      state: '' as STATE,
      name: '',
      description: '',
      amount: 0,
      deliveryDate: '',
    };
  }
}
