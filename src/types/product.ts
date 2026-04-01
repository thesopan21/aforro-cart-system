
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  weight?: string;
  image: (string | number)[]; // Array of URI strings or local assets (require() returns number)
}
