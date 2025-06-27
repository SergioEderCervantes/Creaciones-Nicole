import { Component, EventEmitter, Input, Output } from '@angular/core';
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
   @Output() visibleChange = new EventEmitter<boolean>();
   @Output() newProduct = new EventEmitter<Product>();
   //@Output() productoGuardado = new EventEmitter<Omit<Product, 'id' | 'imageUrl'>>();
   @Output() productoGuardado = new EventEmitter<Omit<Product, 'id'>>();

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

  constructor(private http: HttpClient) {}

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

      const productoEmitido = {
      category: this.producto.category,
      name: this.producto.name,
      description: this.producto.description,
      tags: this.producto.tags,
    };

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
    imageUrl: "pastelMemo.jpg" // obtenido del backend
  };

  this.productoGuardado.emit(productoFinal);
  this.close();
  }

  close() {
    this.visibleChange.emit(false);
  }

}
