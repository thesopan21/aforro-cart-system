import { appAssets } from "@/assets/images";
import { Product } from "@/types/product";

const productImages = [
  appAssets.similarItem1,
  appAssets.similarItem1,
  appAssets.similarItem1,
];

export const similarProducts: Product[] = [
  {
    id: '2',
    name: 'Gold Premium Assam Tea Rich...',
    brand: 'Tata Tea',
    price: 444,
    originalPrice: 499,
    discount: 52,
    weight: '1kg',
    image: productImages,
  },
  {
    id: '3',
    name: 'Gold Premium Assam Tea Rich...',
    brand: 'Tata Tea',
    price: 444,
    originalPrice: 499,
    discount: 52,
    weight: '1kg',
    image: productImages,
  },
  {
    id: '4',
    name: 'Gold Premium Assam Tea Rich...',
    brand: 'Tata Tea',
    price: 444,
    originalPrice: 499,
    discount: 52,
    weight: '1kg',
    image: productImages,
  },
];
