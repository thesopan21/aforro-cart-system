
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

/**
 * This interface is used for the product data in the recommendation cards. It has a simpler structure than the main Product interface, and includes only the fields needed for display in the recommendation context.
 */
export interface RecommendationProduct {
  id: string;
  name: string;
  category: string;
  image: string | number | (string | number)[];
  price: number;
  originalPrice?: number;
  weight?: string;
  discount?: number;
  hasOptions?: boolean;
  optionsCount?: number;
}