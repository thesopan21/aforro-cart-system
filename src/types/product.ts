
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  weight?: string;
  image: string[]; // Can be a single image URL or an array of image URLs
}
