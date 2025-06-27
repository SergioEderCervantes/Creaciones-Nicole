import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ProductsService } from '../../services/products-service.service';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-cart',
  imports: [
    CarouselModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  bebidas: Product[] = [];
  paletas: Product[] = [];
  chascas: Product[] = [];
  snacks: Product[] = [];
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  

  constructor(private ProductsService: ProductsService) { }

  ngOnInit() {
    this.bebidas = this.ProductsService.getProductsByTag('Bebidas');
    console.log(this.bebidas);
    this.paletas = this.ProductsService.getProductsByTag('Paletas');
    this.chascas = this.ProductsService.getProductsByTag('Chascas');
    this.snacks = this.ProductsService.getProductsByTag('Snacks');
  }
}
