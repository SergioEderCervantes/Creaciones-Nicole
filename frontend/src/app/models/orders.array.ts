import { Order } from "./order.interface";
import { STATE } from "./state.enum";

export const ORDERS: Order[] = [
    {
        id: 1,
        state: STATE.PENDING,
        description: "Carrito donde se sirva mojitos, Cheves y clericot",
        name: "Carrito de bebidas",
        amount: 2000,
        deliveryDate: "20/06/2025"
    },
    {
        id: 2,
        state: STATE.PENDING,
        description: "Mesa de postres con variedad de dulces y pasteles",
        name: "Mesa de postres",
        amount: 1500,
        deliveryDate: "22/06/2025"
    },
    {
        id: 3,
        state: STATE.PENDING,
        description: "Servicio de barra de café con barista profesional",
        name: "Barra de café",
        amount: 1800,
        deliveryDate: "25/06/2025"
    },
    {
        id: 4,
        state: STATE.PENDING,
        description: "Carrito de snacks con papas, palomitas y nachos",
        name: "Carrito de snacks",
        amount: 1200,
        deliveryDate: "28/06/2025"
    },
    {
        id: 5,
        state: STATE.PENDING,
        description: "Estación de tacos con variedad de guisos y salsas",
        name: "Estación de tacos",
        amount: 2500,
        deliveryDate: "30/06/2025"
    },
    {
        id: 6,
        state: STATE.PENDING,
        description: "Mesa de quesos y carnes frías para eventos",
        name: "Mesa de quesos",
        amount: 1700,
        deliveryDate: "02/07/2025"
    },
    {
        id: 7,
        state: STATE.PENDING,
        description: "Carrito de helados con diferentes sabores",
        name: "Carrito de helados",
        amount: 1300,
        deliveryDate: "05/07/2025"
    },
    {
        id: 8,
        state: STATE.PENDING,
        description: "Barra de ensaladas frescas y toppings variados",
        name: "Barra de ensaladas",
        amount: 1400,
        deliveryDate: "08/07/2025"
    },
    {
        id: 9,
        state: STATE.PENDING,
        description: "Estación de pizzas artesanales al horno",
        name: "Estación de pizzas",
        amount: 2200,
        deliveryDate: "10/07/2025"
    },
    {
        id: 10,
        state: STATE.PENDING,
        description: "Mesa de frutas frescas y fuentes de chocolate",
        name: "Mesa de frutas",
        amount: 1600,
        deliveryDate: "12/07/2025"
    }
];