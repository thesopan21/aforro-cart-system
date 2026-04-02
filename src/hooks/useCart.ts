import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateQuantity as updateQuantityAction,
  incrementQuantity as incrementQuantityAction,
  decrementQuantity as decrementQuantityAction,
  clearCart as clearCartAction,
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
  selectTotalSavings,
  selectCartItemQuantity,
  selectIsCartEmpty,
  CartItem,
} from '@/store/slices/cartSlice';

/**
 * Custom hook for cart operations and state access
 * Provides a clean API for managing the shopping cart throughout the app
 * 
 * @example
 * ```tsx
 * const { cartItems, totalItems, addToCart, isInCart } = useCart();
 * 
 * // Check if product is in cart
 * const inCart = isInCart('product-123');
 * 
 * // Add product to cart
 * addToCart({
 *   id: 'product-123',
 *   name: 'Product Name',
 *   price: 100,
 *   image: require('./image.png')
 * });
 * ```
 */
export const useCart = () => {
  const dispatch = useAppDispatch();
  
  // Select cart state
  const cartItems = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectTotalItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const totalSavings = useAppSelector(selectTotalSavings);
  const isEmpty = useAppSelector(selectIsCartEmpty);

  /**
   * Add product to cart
   * If product already exists, increases quantity
   * @param product - Product to add (quantity defaults to 1 if not specified)
   */
  const addToCart = useCallback(
    (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
      dispatch(addToCartAction(product));
    },
    [dispatch]
  );

  /**
   * Remove product from cart completely
   * @param productId - ID of the product to remove
   */
  const removeFromCart = useCallback(
    (productId: string) => {
      dispatch(removeFromCartAction(productId));
    },
    [dispatch]
  );

  /**
   * Update product quantity
   * If quantity is 0 or less, removes the item
   * @param productId - ID of the product
   * @param quantity - New quantity value
   */
  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      dispatch(updateQuantityAction({ id: productId, quantity }));
    },
    [dispatch]
  );

  /**
   * Increment product quantity by 1
   * @param productId - ID of the product
   */
  const incrementQuantity = useCallback(
    (productId: string) => {
      dispatch(incrementQuantityAction(productId));
    },
    [dispatch]
  );

  /**
   * Decrement product quantity by 1
   * If quantity becomes 0, removes the item
   * @param productId - ID of the product
   */
  const decrementQuantity = useCallback(
    (productId: string) => {
      dispatch(decrementQuantityAction(productId));
    },
    [dispatch]
  );

  /**
   * Clear entire cart
   */
  const clearCart = useCallback(() => {
    dispatch(clearCartAction());
  }, [dispatch]);

  /**
   * Check if a product is in the cart
   * @param productId - ID of the product to check
   * @returns true if product is in cart
   */
  const isInCart = useCallback(
    (productId: string): boolean => {
      return cartItems.some((item: CartItem) => item.id === productId);
    },
    [cartItems]
  );

  /**
   * Get quantity of a specific product in cart
   * @param productId - ID of the product
   * @returns quantity of the product (0 if not in cart)
   */
  const getItemQuantity = useCallback(
    (productId: string): number => {
      const item = cartItems.find((item: CartItem) => item.id === productId);
      return item?.quantity ?? 0;
    },
    [cartItems]
  );

  /**
   * Get cart item by ID
   * @param productId - ID of the product
   * @returns CartItem or undefined if not found
   */
  const getCartItem = useCallback(
    (productId: string): CartItem | undefined => {
      return cartItems.find((item: CartItem) => item.id === productId);
    },
    [cartItems]
  );

  // Return memoized object to prevent unnecessary re-renders
  return useMemo(
    () => ({
      // State
      cartItems,
      totalItems,
      totalPrice,
      totalSavings,
      isEmpty,
      
      // Actions
      addToCart,
      removeFromCart,
      updateQuantity,
      incrementQuantity,
      decrementQuantity,
      clearCart,
      
      // Utility functions
      isInCart,
      getItemQuantity,
      getCartItem,
    }),
    [
      cartItems,
      totalItems,
      totalPrice,
      totalSavings,
      isEmpty,
      addToCart,
      removeFromCart,
      updateQuantity,
      incrementQuantity,
      decrementQuantity,
      clearCart,
      isInCart,
      getItemQuantity,
      getCartItem,
    ]
  );
};

export default useCart;
