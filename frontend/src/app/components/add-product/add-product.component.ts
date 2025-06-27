import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CATEGORY } from '../../models/category.enum';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  @Input() visible!: boolean;
  @Input() data!: Product | undefined;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() editedProduct = new EventEmitter<Product>();

  //@Output() productoGuardado = new EventEmitter<Omit<Product, 'id' | 'imageUrl'>>();
  @Output() productoGuardado = new EventEmitter<Omit<Product, 'id'>>();


  editting:boolean = false;
  categorias = Object.values(CATEGORY)

  producto: Omit<Product, 'id' | 'imageUrl'> & { imageUrl?: File } = {
    category: '' as CATEGORY,
    name: '',
    description: '',
    tags: [],
    imageUrl: undefined
  };



  tagsInput: string = '';
  previewUrl: string | null = null;

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
        this.producto.name = this.data.name;
        this.producto.category = this.data.category;
        this.producto.description = this.data.description;
        this.producto.tags = this.data.tags;
      }
    }
  }


  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.producto.imageUrl = input.files[0];
    }
    console.log(this.producto.imageUrl);
  }

  saveProduct() {
    this.producto.tags = this.tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    if(this.editting){
      this.saveEdit();
      return
    }
    if (!this.producto.imageUrl) {
      console.error('No se seleccionó imagen');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.producto.imageUrl);

    const productoFinal: Omit<Product, 'id'> = {
      category: this.producto.category,
      name: this.producto.name,
      description: this.producto.description,
      tags: this.producto.tags,
      imageUrl: "pastelMemo.jpg", // obtenido del backend
    };

    this.productoGuardado.emit(productoFinal);
    this.close();
  }

  saveEdit(){
    // Pa no complicar, construimos un newData con lo de los formularios mas lo de la data
    const productEdited: Product = {
      id: this.data?.id ?? 0,
      category: this.producto.category,
      name: this.producto.name,
      description: this.producto.description,
      tags: this.producto.tags,
      imageUrl: this.data?.imageUrl ?? ''
    };
    this.editedProduct.emit(productEdited);
    this.close();
  }

  close() {
    this.editting = false;
    this.visibleChange.emit(false);
  }

}
