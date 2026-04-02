# Cart System - Quick API Reference

## useCart Hook

```typescript
import { useCart } from '@/hooks/useCart';

const {
  // State
  cartItems,       // CartItem[] - All items in cart
  totalItems,      // number - Total quantity
  totalPrice,      // number - Total value
  totalSavings,    // number - Total discounts
  isEmpty,         // boolean - Is cart empty?
  
  // Actions
  addToCart,           // (product) => void
  removeFromCart,      // (productId) => void
  updateQuantity,      // (productId, quantity) => void
  incrementQuantity,   // (productId) => void
  decrementQuantity,   // (productId) => void
  clearCart,           // () => void
  
  // Utilities
  isInCart,           // (productId) => boolean
  getItemQuantity,    // (productId) => number
  getCartItem,        // (productId) => CartItem | undefined
} = useCart();
```

## Common Patterns

### 1. Add to Cart Button

```typescript
const handleAdd = () => {
  addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    weight: product.weight,
  });
};
```

### 2. Conditional Rendering (Add vs Stepper)

```typescript
{isInCart(product.id) ? (
  <QuantityStepper
    value={getItemQuantity(product.id)}
    onIncrease={() => incrementQuantity(product.id)}
    onDecrease={() => decrementQuantity(product.id)}
  />
) : (
  <AddButton onPress={handleAdd} />
)}
```

### 3. Cart Badge

```typescript
import { CartIcon } from '@/components/CartIcon';

<Header rightIcon={<CartIcon />} />
```

### 4. Cart Summary

```typescript
<Text>Items: {totalItems}</Text>
<Text>Total: ₹{totalPrice}</Text>
<Text>Savings: ₹{totalSavings}</Text>
```

### 5. Empty Cart Check

```typescript
{isEmpty ? (
  <EmptyCartMessage />
) : (
  <CartItemsList items={cartItems} />
)}
```

### 6. Direct Quantity Update

```typescript
updateQuantity('product-123', 5);
```

### 7. Remove Item

```typescript
removeFromCart('product-123');
```

### 8. Clear All

```typescript
clearCart();
```

## Full Component Example

```typescript
import { useCart } from '@/hooks/useCart';

function ProductCard({ product }) {
  const { 
    addToCart, 
    isInCart, 
    getItemQuantity, 
    incrementQuantity, 
    decrementQuantity 
  } = useCart();
  
  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <View>
      <Image source={product.image} />
      <Text>{product.name}</Text>
      <Text>₹{product.price}</Text>
      
      {inCart ? (
        <QuantityStepper
          value={quantity}
          onIncrease={() => incrementQuantity(product.id)}
          onDecrease={() => decrementQuantity(product.id)}
        />
      ) : (
        <AddButton onPress={handleAdd} />
      )}
    </View>
  );
}
```

## Direct Redux Access (Advanced)

```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  addToCart as addToCartAction,
  selectCartItems,
  selectTotalItems 
} from '@/store/slices/cartSlice';

const dispatch = useAppDispatch();
const items = useAppSelector(selectCartItems);
const total = useAppSelector(selectTotalItems);

dispatch(addToCartAction({ id: '123', name: 'Product', price: 100 }));
```

## Persistence Functions

```typescript
import { loadCartFromStorage, clearCartStorage } from '@/store/middleware/cartPersistence';
import { store } from '@/store/store';

// Load cart from storage
await loadCartFromStorage(store.dispatch);

// Clear storage (e.g., on logout)
await clearCartStorage();
```

## CartItem Type

```typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string | number | (string | number)[];
  weight?: string;
  description?: string;
  unit?: string;
}
```

## Available Selectors

```typescript
import {
  selectCartItems,      // CartItem[]
  selectTotalItems,     // number
  selectTotalPrice,     // number
  selectTotalSavings,   // number
  selectIsCartEmpty,    // boolean
} from '@/store/slices/cartSlice';

const items = useAppSelector(selectCartItems);
const total = useAppSelector(selectTotalItems);
```

## CartIcon Props

```typescript
<CartIcon 
  color="#858585"           // Icon color
  size={24}                 // Icon size
  badgeColor="#FF6B6B"      // Badge background
  badgeTextColor="#FFF"     // Badge text color
/>
```
