import { Component } from '@angular/core';
import { Product } from '../../../models/product.interface';
import { ProductsService } from '../../../services/products-service.service';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';

import { CommonModule } from '@angular/common';
import { CATEGORY } from '../../../models/category.enum';


@Component({
    selector: 'app-carrucel',
    templateUrl: './carrucel.component.html',
    styleUrl: './carrucel.component.css',
    standalone: true,
    imports: [Carousel, ButtonModule, Tag, CommonModule],
    providers: [ProductsService]
})
export class CarouselComponent {
    products: Product[] = [];
    responsiveOptions: any[] = [];

    selectedCategory = CATEGORY.REPOSTERIA;

  tagGroups: { tag: string; products: Product[] }[] = [];


    constructor(private productsService: ProductsService) {}

    ngOnInit() {
        const allProducts = this.productsService.getProducts();

        const filteredByCategory = allProducts.filter(
        (p) => p.category === this.selectedCategory
        );

        const uniqueTags = new Set<string>();
        filteredByCategory.forEach((p) => p.tags.forEach((tag) => uniqueTags.add(tag)));

        this.tagGroups = Array.from(uniqueTags).map((tag) => ({
        tag,
        products: filteredByCategory.filter((p) => p.tags.includes(tag)),
        }));
        


        this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 2,
                numScroll: 1,
            },
            {
                breakpoint: '1199px',
                numVisible: 3,
                numScroll: 1,
            },
            {
                breakpoint: '767px',
                numVisible: 2,
                numScroll: 1,
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1,
            },
        ];
    }

    getSeverity(status: string) {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warn';
        case 'OUTOFSTOCK':
            return 'danger';
        default:
            return 'info'; // o cualquier valor por defecto
    }
}

}

