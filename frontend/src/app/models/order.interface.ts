import { STATE } from "./state.enum";

export interface Order {
    id:number,
    state: STATE,
    name: string,
    description: string,
    amount: number, 
    deliveryDate: string,
}