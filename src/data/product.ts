import { appAssets } from "@/assets/images";
import { Product } from "@/types/product";


// Product images array
const productImages = [
  appAssets.itemImage,
  appAssets.itemImage,
  appAssets.itemImage,
];



export const mainProduct: Product = {
  id: '1',
  name: 'Dairy milk Silk Chocolate Bar',
  brand: 'Cadbury',
  price: 444,
  originalPrice: 444,
  discount: 52,
  weight: '64 g',
  image: productImages,
};