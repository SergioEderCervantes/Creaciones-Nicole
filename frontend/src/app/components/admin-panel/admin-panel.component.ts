import { ChangeDetectorRef, Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { Product } from '../../models/product.interface';
import { Order } from '../../models/order.interface';
import { Column } from '../../models/column.interface';
import { BlockState } from '../../models/BlockState.interface';
import { faPencilAlt, faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductsService } from '../../services/products-service.service';
import { OrdersService } from '../../services/orders-service.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ChartModule, TableModule, ToastModule, ProgressSpinnerModule, AddProductComponent],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  providers: [MessageService]
})
export class AdminPanelComponent {
  // Helpers
  readonly productType: string = "product";
  readonly orderType: string = "order";
  readonly platformId = inject(PLATFORM_ID);

  // Cosas del Auth
  isLoggedIn: boolean = false;
  username: string = '';


  // Arrays que devuelven los observables para reservaciones y extravios
  products: Product[] = [];
  orders: Order[] = []
  productoSeleccionado: Product | null = null;


  //Popuos
  showProductPopUp: boolean = false;

  // Prueba de tabla ccon primeNG
  prodCols: Column[] = [];
  selectedProduct!: Product;
  ordCols: Column[] = [];
  selectedOrder!: Order;

  // BlockStates
  // Objeto que mantiene el estado de cada bloque
  blocksState: { [key: string]: BlockState } = {
    tablaProd: { isMaximized: false, loading: signal(false) },
    tablaOrd: { isMaximized: false, loading: signal(false) },
  };

  // Iconos
  editIcon = faPencilAlt;
  deleteIcon = faTrashAlt;
  addIcon = faPlusCircle;

  // Edicion
  productData!: any;

  // Dieg: aqui va a ir la data de los pedidos cuando se editen
  orderData!:any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private cd: ChangeDetectorRef,
    private productSrv: ProductsService,
    private orderSrv: OrdersService
  ) { }

  ngOnInit() {
    this.validateAdmin();
    this.fetchData();
    this.initPrimeNgTable();
  }


  validateAdmin(): void {
    // TODO Validar admin y agarrar username
    if (!this.authService.logguedIn) {
      // Redirect a loguin
      this.router.navigate(['/login'])
    }
  }

  fetchData(): void {
    // Iniciar el loader de todos
    Object.keys(this.blocksState).forEach(key => this.setLoading(key, false));

    // Tomar los datos de los servicios
    this.products = this.productSrv.getProducts();
    this.orders = this.orderSrv.getOrders();


  }

  initPrimeNgTable(): void {
    this.prodCols = [
      { field: 'category', header: 'Categoria' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'tags', header: 'Tags' },
      { field: 'action', header: 'Accion' },
    ]
    this.ordCols = [
      { field: 'state', header: 'Estado del pedido' },
      { field: 'name', header: 'Nombre' },
      { field: 'amount', header: 'Cantidad' },
      { field: 'deliveryDate', header: 'Fecha de entrega' },
      { field: 'action', header: 'Accion' },
    ]
  }

  manageLogout() {
    this.authService.logout();
    this.router.navigate(['/'])
  }

  toggleMaximize(block: string): void {
    this.setLoading(block, true);
    this.blocksState[block].isMaximized = !this.blocksState[block].isMaximized;
    // Cuando acaba la animacion de crecimiento o decrecimiento se quita el loader
    setTimeout(() => {
      this.setLoading(block, false);
    }, 500);
  }

  setLoading(block: string, loading: boolean): void {
    this.blocksState[block].loading.set(loading);
  }

  // Metodos que hacen falta:
  // Start manual fetch, el select de las tablas, todo lo relacionado a editar, borrar y agregar registros
  onRegisterSelect(event: any, type: string): void {
    const data = event.data;
    let summary: string;
    let msg: string;
    if (type == this.productType) {
      summary = "Descripcion del producto:";
      msg = `${data.name}, ${data.description}`;
    } else {
      summary = "Descripcion del pedido";
      msg = `${data.name}, ${data.description}, fecha de entrega: ${data.deliveryDate}`;
    }
    this.messageService.add({ severity: 'info', summary: summary, detail: msg});
  }

  handleEdit(type: string, id: number): void {
    if (type == "productType") {
      this.productData = this.products.find((p) => p.id === id);
      this.showProductPopUp = true;
    } else {
      // Diego aqui agarras la data del pedido, si copias la logica del add-product al formulario de las orders, esto funciona cn madre
      // this.orderData = this.orders.find((o) => o.id === id);
      // this.showOrderPopUp = true;
    }
  }

  handleDelete(type: string, id: number): void {
    if (type == "productType") {
      this.productSrv.deleteProduct(id);
      this.updateFake(this.productType);
    } else{
      this.orderSrv.deleteOrder(id);
      this.updateFake(this.orderType);
    }
  }

  handleNew(type: string): void {
    if (type == "productType") {
      this.showProductPopUp = true;
    } else {
      // this.showOrderPopUp = true;
    }
  }

  onProductoGuardado(nuevo: Omit<Product, 'id'>) {
    const productoCompleto: Product = {
      ...nuevo,
      id: this.generarIdUnico(),
      //imageUrl: 'ruta/temporal.jpg' // aquí puedes usar lo que obtengas del backend
    };
    this.productSrv.addProduct(productoCompleto);
    this.updateFake(this.productType)
  }

  // Diego llama a esta funcion cuando se termine de editar un pedido
  onPedidoeditado(nuevo: Order) {
    console.log("Asi llega al panel: ", nuevo);
    this.orderSrv.editOrder(nuevo.id, nuevo);
    this.updateFake(this.orderType);
  }

  // Diego aqui implementa la logica que tienes para añadir un producto pero para reservaciones
  // onPedidoGuardado(nuevo: Omit<Product, 'id'>) {
    // const productoCompleto: Product = {
    //   ...nuevo,
    //   id: this.generarIdUnico(),
    //   //imageUrl: 'ruta/temporal.jpg' // aquí puedes usar lo que obtengas del backend
    // };
    // this.productSrv.addProduct(productoCompleto);
    // this.updateFake(this.orderType)
  // }

  onProductoeditado(nuevo: Product) {
    console.log("Asi llega al panel: ", nuevo);
    this.productSrv.editProduct(nuevo.id, nuevo);
    this.updateFake(this.productType);
  }

  updateFake(type: string) {
    if (type === this.productType) {
      this.setLoading("tablaProd", true);
      setTimeout(() => {
        this.products = this.productSrv.getProducts();
        this.setLoading("tablaProd", false);
      }, 1000);

    } else {
      this.setLoading("tablaOrd", true);
      setTimeout(() => {
        this.orders = this.orderSrv.getOrders();
        this.setLoading("tablaOrd", false);
      }, 1000);

    }
  }
  generarIdUnico(): number {
    return Date.now();
  }

}
