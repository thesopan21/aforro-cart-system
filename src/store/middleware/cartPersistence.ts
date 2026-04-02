import AsyncStorage from '@react-native-async-storage/async-storage';
import { Middleware } from '@reduxjs/toolkit';
import { setCart } from '../slices/cartSlice';

const CART_STORAGE_KEY = '@cart_items';

/**
 * Redux middleware for cart persistence
 * Automatically saves cart state to AsyncStorage on every change
 * and restores it on app launch
 */
export const cartPersistenceMiddleware: Middleware = 
  (store) => (next) => (action: any) => {
    const result = next(action);

    // Save cart to AsyncStorage after every cart action
    if (action.type?.startsWith('cart/')) {
      const state = store.getState();
      AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart.items))
        .catch((error) => {
          console.error('Failed to save cart to storage:', error);
        });
    }

    return result;
  };

/**
 * Load cart from AsyncStorage on app startup
 * Call this in your app initialization
 */
export const loadCartFromStorage = async (dispatch: any) => {
  try {
    const cartData = await AsyncStorage.getItem(CART_STORAGE_KEY);
    if (cartData) {
      const items = JSON.parse(cartData);
      dispatch(setCart(items));
    }
  } catch (error) {
    console.error('Failed to load cart from storage:', error);
  }
};

/**
 * Clear cart from AsyncStorage
 * Useful for logout or data reset
 */
export const clearCartStorage = async () => {
  try {
    await AsyncStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear cart storage:', error);
  }
};
