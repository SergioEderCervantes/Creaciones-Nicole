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
import { UploadsServiceService } from '../../services/uploads-service.service';

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
  newURL: string = '';

  constructor(private http: HttpClient, private uploadService: UploadsServiceService) { }

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
        this.previewUrl = 'https://backcreacionesnicole.onrender.com' + this.data.imageUrl;
        console.log(this.data)
      }
    }
  }


  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.producto.imageUrl = input.files[0];
      this.previewUrl = URL.createObjectURL(this.producto.imageUrl);
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

    // const formData = new FormData();
    // formData.append('image', this.producto.imageUrl);

    //------------------LO QUE FUNIONA --------------------
    // const productoFinal: Omit<Product, 'id'> = {
    //   category: this.producto.category,
    //   name: this.producto.name,
    //   description: this.producto.description,
    //   tags: this.producto.tags,
    //   imageUrl: "pastelMemo.jpg", // obtenido del backend
    // };

    

    // this.productoGuardado.emit(productoFinal);
    // this.close();

    this.uploadService.subirImagen(this.producto.imageUrl).subscribe({
    next: (res) => {
      const productoFinal: Omit<Product, 'id'> = {
        category: this.producto.category,
        name: this.producto.name,
        description: this.producto.description,
        tags: this.producto.tags,
        imageUrl: res.imageUrl // ⚠️ Respuesta del backend
      };

      this.productoGuardado.emit(productoFinal);
      this.close();
    },
    error: (err) => {
      console.error('Error al subir imagen:', err);
      }
    });
  }

  saveEdit(){
    //Para cambiar la imagen
    if (!this.producto.imageUrl) {
      console.error('No se seleccionó imagen');
      if(this.data?.imageUrl) {
        const productEdited: Product = {
        id: this.data?.id ?? 0,
        category: this.producto.category,
        name: this.producto.name,
        description: this.producto.description,
        tags: this.producto.tags,
        imageUrl: this.data?.imageUrl
      };
      this.editedProduct.emit(productEdited);
      this.close();
      }
      return;
    }
    this.uploadService.subirImagen(this.producto.imageUrl).subscribe({
    next: (res) => {
      this.newURL = res.imageUrl // ⚠️ Respuesta del backend
      // Pa no complicar, construimos un newData con lo de los formularios mas lo de la data
      
      const productEdited: Product = {
        id: this.data?.id ?? 0,
        category: this.producto.category,
        name: this.producto.name,
        description: this.producto.description,
        tags: this.producto.tags,
        //imageUrl: this.data?.imageUrl ?? ''
        imageUrl: this.newURL
      };
      this.editedProduct.emit(productEdited);
      this.close();
    },
    error: (err) => {
      console.error('Error al subir imagen:', err);
      }
    });

    
  }

  close() {
    this.editting = false;
    this.visibleChange.emit(false);
    this.limpiarForm();
  }

  limpiarForm() {
    this.producto = {
      category: '' as CATEGORY,
      name: '',
      description: '',
      tags: [],
      imageUrl: undefined
    };
    this.tagsInput = '';
    this.previewUrl = null;
    this.newURL = '';
  }

}
