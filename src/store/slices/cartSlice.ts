import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface CartItem {
  id: string;
  name: string;
  description?: string;
  image?: string | number | (string | number)[];
  price: number;
  originalPrice?: number;
  quantity: number;
  weight?: string;
  unit?: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      const quantityToAdd = action.payload.quantity ?? 1;
      
      if (existingItem) {
        // Increase quantity if item already exists
        existingItem.quantity += quantityToAdd;
      } else {
        // Add new item with specified quantity or default to 1
        state.items.push({
          ...action.payload,
          quantity: quantityToAdd,
        });
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        // Ensure quantity never goes below 1, remove item if 0 or less
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        if (item.quantity <= 1) {
          // Remove item if quantity would go to 0
          state.items = state.items.filter(item => item.id !== action.payload);
        } else {
          item.quantity -= 1;
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    // For hydrating cart from storage
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

// =======================
// SELECTORS (Derived State)
// =======================

// Base selector for cart items
export const selectCartItems = (state: RootState) => state.cart.items;

// Memoized selector for total items count
export const selectTotalItems = createSelector(
  [selectCartItems],
  (items) => items.reduce((total: number, item: CartItem) => total + item.quantity, 0)
);

// Memoized selector for total price
export const selectTotalPrice = createSelector(
  [selectCartItems],
  (items) => items.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0)
);

// Memoized selector for total savings
export const selectTotalSavings = createSelector(
  [selectCartItems],
  (items) => items.reduce((total: number, item: CartItem) => {
    if (item.originalPrice && item.originalPrice > item.price) {
      return total + ((item.originalPrice - item.price) * item.quantity);
    }
    return total;
  }, 0)
);

// Selector factory to check if a product is in cart
export const selectIsInCart = (productId: string) => 
  createSelector(
    [selectCartItems],
    (items) => items.some((item: CartItem) => item.id === productId)
  );

// Selector factory to get cart item by id
export const selectCartItemById = (productId: string) =>
  createSelector(
    [selectCartItems],
    (items) => items.find((item: CartItem) => item.id === productId)
  );

// Selector for cart item quantity
export const selectCartItemQuantity = (productId: string) =>
  createSelector(
    [selectCartItems],
    (items) => {
      const item = items.find((item: CartItem) => item.id === productId);
      return item?.quantity ?? 0;
    }
  );

// Selector for cart empty state
export const selectIsCartEmpty = createSelector(
  [selectCartItems],
  (items) => items.length === 0
);

export const { 
  addToCart, 
  updateQuantity, 
  incrementQuantity,
  decrementQuantity,
  removeFromCart, 
  clearCart,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
