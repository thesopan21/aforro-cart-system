import { appAssets } from "@/assets/images";
import { RecommendationProduct } from "@/types/product";


// Sample recommendation products data
export const recommendationProducts: RecommendationProduct[] = [
  {
    id: 'rec1',
    name: 'Gold Premium Assam Tea Rich...',
    category: 'Tata Tea',
    image: appAssets.similarItem1,
    price: 444,
    originalPrice: 444,
    weight: '1 kg',
    discount: 52,
    hasOptions: true,
    optionsCount: 2,
  },
  {
    id: 'rec2',
    name: 'Gold Premium Assam Tea Rich...',
    category: 'Tata Tea',
    image: appAssets.recommendedItem1,
    price: 444,
    originalPrice: 444,
    weight: '1 kg',
    discount: 52,
    hasOptions: true,
    optionsCount: 2,
  },
  {
    id: 'rec3',
    name: 'Organic apple vinegar',
    category: 'Tata Tea',
    image: appAssets.similarItem1,
    price: 444,
    originalPrice: 444,
    weight: '1 kg',
    discount: 52,
    hasOptions: false,
  },
];