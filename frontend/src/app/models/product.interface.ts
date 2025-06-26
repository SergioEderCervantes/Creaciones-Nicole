import { CATEGORY } from "./category.enum";

export interface Product{
    id: number,
    category: CATEGORY,
    name: string,
    description: string,
    tags: string[],
    imageUrl: string,
}