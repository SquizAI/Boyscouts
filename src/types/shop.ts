export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  inStock?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}