import { CATEGORY } from "./category.enum";

export interface Category{
    name: CATEGORY,
    subcategory: SUBCATEGORY
}

export enum SUBCATEGORY {
    BEBIDAS = "Bebidas",
    PALETAS = "Paletas",
    CHASCAS = "Chascas",
    SNACKS = "Snacks"
}