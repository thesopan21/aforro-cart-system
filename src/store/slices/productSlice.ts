import { mainProduct } from '@/data/product';
import { Product } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  selectedProduct: Product;
}

const initialState: ProductState = {
  selectedProduct: mainProduct,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
    resetToMainProduct: (state) => {
      state.selectedProduct = mainProduct;
    },
  },
});

export const { setSelectedProduct, resetToMainProduct } = productSlice.actions;
export default productSlice.reducer;
