import { CATEGORY } from "./category.enum";
import { Product } from "./product.interface";

export const PRODUCTS: Product[] =  [
  {
    id: 1,
    category: CATEGORY.REPOSTERIA,
    name: "Pastel XV",
    description: "Haz de tu fiesta de XV años un momento inolvidable con este pastel espectacular.",
    tags: ['XV'],
    imageUrl: "/uploads/products/1.jpg"
  },
  {
    id: 2,
    category: CATEGORY.DECORACION,
    name: "Pared Floral",
    description: "Transforma tu evento con una pared floral elegante y llena de vida.",
    tags: ['Flores', 'Mesa', 'Evento'],
    imageUrl: "/uploads/D3.jpeg"
  },
  {
    id: 3,
    category: CATEGORY.CARRITO,
    name: "Carrito de snacks",
    description: "Sorprende a tus invitados con snacks deliciosos y presentación única.",
    tags: ['Snacks'],
    imageUrl: "/uploads/carrito.jpg"
  },
  {
    id: 4,
    category: CATEGORY.DECORACION,
    name: "Decoracion Touchdown",
    description: "¡Lleva la emoción del fútbol americano a tu fiesta con esta decoración única!",
    tags: ['fiesta'],
    imageUrl: "/uploads/D2.jpeg"
  },
  {
    id: 5,
    category: CATEGORY.DECORACION,
    name: "Decoracion Disney",
    description: "Haz realidad la magia de Disney en la fiesta de tus pequeños.",
    tags: ['fiesta'],
    imageUrl: "/uploads/D1.jpeg"
  },
  {
    id: 6,
    category: CATEGORY.REPOSTERIA,
    name: "Pastel Primera comunion",
    description: "Celebra momentos especiales con un pastel de cupcakes delicioso y original.",
    tags: ['infantiles'],
    imageUrl: "/uploads/products/r1.jpg"
  },
  {
    id: 7,
    category: CATEGORY.REPOSTERIA,
    name: "Pastel Monster Hight",
    description: "El pastel perfecto para sorprender a tu niña en su día especial.",
    tags: ['infantiles'],
    imageUrl: "/uploads/products/r2.jpg"
  },
  {
    id: 8,
    category: CATEGORY.REPOSTERIA,
    name: "Pastel Bacardi",
    description: "¡Dale un toque divertido y atrevido a tu fiesta con este pastel para adultos!",
    tags: ['adultos,fiesta'],
    imageUrl: "/uploads/products/r3.jpg"
  },
  {
    id: 9,
    category: CATEGORY.DECORACION,
    name: "Arreglo de globos",
    description: "Personaliza tu evento con arreglos de globos llenos de color y alegría.",
    tags: ['fiestas'],
    imageUrl: "/uploads/products/D4.jpg"
  },
  {
    id: 10,
    category: CATEGORY.POSTRE,
    name: "Cupcackes Espaciales",
    description: "Endulza tu fiesta con cupcakes temáticos, ¡diversión y sabor en cada bocado!",
    tags: ['fiestas,infantiles'],
    imageUrl: "/uploads/products/p1.jpg"
  },
  {
    id: 11,
    category: CATEGORY.CARRITO,
    name: "Tablas de queso y carnes frias",
    description: "Impresiona a tus invitados con una selección gourmet para cualquier ocasión.",
    tags: ['Snacks'],
    imageUrl: "/uploads/products/c2.jpg"
  },
  {
    id: 12,
    category: CATEGORY.POSTRE,
    name: "Cupcakes Navideños",
    description: "Disfruta la magia de la Navidad con cupcakes llenos de sabor y alegría.",
    tags: ['navidad'],
    imageUrl: "/uploads/products/p2.jpg"
  },
  {
    id: 13,
    category: CATEGORY.POSTRE,
    name: "Gelatina Peach",
    description: "Sorprende con gelatinas divertidas y personalizadas para tus fiestas.",
    tags: ['fiestas,infantiles'],
    imageUrl: "/uploads/products/p3.jpg"
  },
  {
    id: 14,
    category: CATEGORY.CARRITO,
    name: "Cubanitos y Mojitos",
    description: "Refresca tu evento con bebidas y botanas irresistibles y llenas de sabor.",
    tags: ['Bebidas'],
    imageUrl: "/uploads/products/c3.jpg"
  },
  {
    id: 15,
    category: CATEGORY.CARRITO,
    name: "Cerveza y Clericot",
    description: "¡Ambiente y sabor garantizados con nuestras bebidas para tu fiesta!",
    tags: ['Bebidas'],
    imageUrl: "/uploads//products/c4.jpg"
  },
  {
    id: 16,
    category: CATEGORY.CARRITO,
    name: "Todo tipo de bebidas",
    description: "Dale color y alegría a tu evento con nuestra barra de bebidas variada.",
    tags: ['Bebidas'],
    imageUrl: "/uploads/products/c5.jpg"
  },
  {
    id: 17,
    category: CATEGORY.CARRITO,
    name: "Carrito de papitas",
    description: "¡Variedad de papitas crujientes para consentir a todos tus invitados!",
    tags: ['Snacks'],
    imageUrl: "/uploads/products/c6.jpg"
  },
  ];
