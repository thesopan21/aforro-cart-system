# Global Cart System - Implementation Documentation

## Overview

A robust, centralized cart management system implemented using Redux Toolkit with full persistence support. This system ensures that any cart operation (add/remove/update) is automatically reflected across all screens and components.

---

## Architecture

### Core Files

```
src/
├── store/
│   ├── store.ts                    # Redux store configuration
│   ├── hooks.ts                    # Typed Redux hooks
│   ├── slices/
│   │   └── cartSlice.ts           # Cart state & actions
│   └── middleware/
│       └── cartPersistence.ts     # AsyncStorage persistence
├── hooks/
│   └── useCart.ts                 # Custom cart hook (recommended)
└── components/
    ├── CartIcon.tsx               # Cart icon with badge
    ├── CartItemCard.tsx           # Cart item display
    ├── RecommendationCard.tsx     # Product card with cart integration
    └── ProductOptionsBottomSheet.tsx  # Product options with cart
```

---

## Features

✅ **Single Source of Truth** - Redux Toolkit centralized state  
✅ **Automatic UI Sync** - All components update in real-time  
✅ **Persistence** - Cart survives app restarts via AsyncStorage  
✅ **Type-Safe** - Full TypeScript support  
✅ **Memoized Selectors** - Optimized performance  
✅ **Custom Hook** - Clean, reusable API  
✅ **Cart Badge** - Live item count display  
✅ **Edge Case Handling** - Duplicate prevention, quantity validation  

---

## Cart State Structure

```typescript
interface CartState {
  items: CartItem[];
}

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

---

## Usage

### 1. Using the `useCart` Hook (Recommended)

The `useCart` hook provides the cleanest API for interacting with the cart:

```typescript
import { useCart } from '@/hooks/useCart';

function ProductCard({ product }) {
  const {
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    isInCart,
    getItemQuantity,
    totalItems,
    totalPrice,
  } = useCart();

  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

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

  return (
    <View>
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

### 2. Direct Redux Access (Advanced)

For more control, use Redux hooks directly:

```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, selectCartItems, selectTotalItems } from '@/store/slices/cartSlice';

function Component() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectTotalItems);

  const handleAdd = () => {
    dispatch(addToCart({
      id: '123',
      name: 'Product',
      price: 100,
      // ... other fields
    }));
  };
}
```

---

## Available Actions

### `addToCart(product)`
Adds a product to cart. If it already exists, increases quantity.
```typescript
addToCart({
  id: 'product-123',
  name: 'Product Name',
  price: 100,
  quantity: 1, // optional, defaults to 1
});
```

### `removeFromCart(productId)`
Removes a product completely from cart.
```typescript
removeFromCart('product-123');
```

### `updateQuantity(productId, quantity)`
Sets a specific quantity. If quantity ≤ 0, removes the item.
```typescript
updateQuantity('product-123', 5);
```

### `incrementQuantity(productId)`
Increases quantity by 1.
```typescript
incrementQuantity('product-123');
```

### `decrementQuantity(productId)`
Decreases quantity by 1. Removes item if quantity becomes 0.
```typescript
decrementQuantity('product-123');
```

### `clearCart()`
Removes all items from cart.
```typescript
clearCart();
```

---

## Selectors (Derived State)

Selectors automatically compute values from cart state:

```typescript
import {
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
  selectTotalSavings,
  selectIsCartEmpty,
} from '@/store/slices/cartSlice';

// In component:
const cartItems = useAppSelector(selectCartItems);
const totalItems = useAppSelector(selectTotalItems);      // Sum of all quantities
const totalPrice = useAppSelector(selectTotalPrice);      // Total cart value
const totalSavings = useAppSelector(selectTotalSavings);  // Total discount
const isEmpty = useAppSelector(selectIsCartEmpty);        // Boolean
```

---

## Cart Persistence

Cart data is automatically saved to AsyncStorage and restored on app launch.

### How It Works
1. **Middleware** - Intercepts all cart actions and saves to storage
2. **App Launch** - `_layout.tsx` calls `loadCartFromStorage()` on startup
3. **Storage Key** - Data stored under `@cart_items`

### Manual Operations

```typescript
import { loadCartFromStorage, clearCartStorage } from '@/store/middleware/cartPersistence';
import { store } from '@/store/store';

// Manually reload cart
await loadCartFromStorage(store.dispatch);

// Clear cart storage (e.g., on logout)
await clearCartStorage();
```

---

## Components

### CartIcon
Shopping cart icon with live badge count. Auto-navigates to cart screen.

```typescript
import { CartIcon } from '@/components/CartIcon';

<Header
  rightIcon={<CartIcon />}
/>
```

**Props:**
- `color?: string` - Icon color (default: '#858585')
- `size?: number` - Icon size (default: 24)
- `badgeColor?: string` - Badge background (default: primary color)
- `badgeTextColor?: string` - Badge text color (default: white)

### RecommendationCard
Product card with automatic cart integration. Shows "Add" button or quantity stepper based on cart state.

```typescript
<RecommendationCard
  product={product}
  onAddPress={(id) => console.log('Added:', id)}
  onOptionsPress={(id) => console.log('Options:', id)}
/>
```

### ProductOptionsBottomSheet
Bottom sheet for product variants with cart integration.

```typescript
<ProductOptionsBottomSheet
  ref={bottomSheetRef}
  title="Select Size"
  options={productOptions}
  productImage={product.image}
/>
```

---

## Best Practices

### ✅ DO

```typescript
// Use the useCart hook for cleaner code
const { addToCart, isInCart } = useCart();

// Check if item is in cart before showing UI
if (isInCart(productId)) {
  return <QuantityStepper ... />;
}

// Use memoized selectors for derived state
const totalPrice = useAppSelector(selectTotalPrice);
```

### ❌ DON'T

```typescript
// Don't manually calculate totals
const total = cartItems.reduce((sum, item) => sum + item.price, 0); // ❌

// Don't pass cart state through props
<Component cartItems={cartItems} /> // ❌

// Don't duplicate cart logic
const [localCart, setLocalCart] = useState([]); // ❌
```

---

## Edge Cases Handled

1. **Duplicate Adds** - Automatically increases quantity instead of creating duplicates
2. **Zero Quantity** - Automatically removes item when quantity reaches 0
3. **Rapid Taps** - Redux Toolkit's Immer ensures safe state updates
4. **App Reload** - Cart persists via AsyncStorage
5. **Empty Cart** - `selectIsCartEmpty` selector for conditional rendering

---

## Migration Guide

If you have existing cart logic, follow these steps:

### Step 1: Replace Local State
```typescript
// Before
const [cartItems, setCartItems] = useState([]);

// After
const { cartItems } = useCart();
```

### Step 2: Replace Manual Operations
```typescript
// Before
const handleAdd = () => {
  setCartItems([...cartItems, product]);
};

// After
const { addToCart } = useCart();
const handleAdd = () => {
  addToCart(product);
};
```

### Step 3: Update Conditionals
```typescript
// Before
const inCart = cartItems.some(item => item.id === product.id);

// After
const { isInCart } = useCart();
const inCart = isInCart(product.id);
```

---

## Performance Optimization

The cart system includes several optimizations:

1. **Memoized Selectors** - Prevent unnecessary re-renders
2. **useCallback** - Stable function references in useCart hook
3. **Immer** - Efficient immutable updates via Redux Toolkit
4. **Selective Subscriptions** - Components only re-render when their selected data changes

---

## Testing Cart Operations

```typescript
// Add item
addToCart({ id: '1', name: 'Test', price: 100 });
console.log(totalItems); // 1

// Add same item again
addToCart({ id: '1', name: 'Test', price: 100 });
console.log(getItemQuantity('1')); // 2

// Update quantity
updateQuantity('1', 5);
console.log(getItemQuantity('1')); // 5

// Remove item
removeFromCart('1');
console.log(isEmpty); // true
```

---

## Troubleshooting

### Cart not persisting?
- Check if `loadCartFromStorage()` is called in `_layout.tsx`
- Verify AsyncStorage package is installed
- Check console for storage errors

### UI not updating?
- Ensure you're using Redux hooks (`useCart` or `useAppSelector`)
- Verify component is inside Redux `<Provider>`
- Check that actions are dispatched correctly

### Badge not showing count?
- Confirm `<CartIcon />` is used in header
- Verify `totalItems` selector is working
- Check if items are actually in cart state

---

## Support

For issues or questions:
1. Check TypeScript errors - all types are exported
2. Verify Redux DevTools for state inspection
3. Review component implementations in `/src/components/`

---

## Summary

This cart system provides:
- ✅ Centralized state management
- ✅ Automatic UI synchronization
- ✅ Persistent storage
- ✅ Type safety
- ✅ Performance optimizations
- ✅ Clean, reusable API

All cart operations are handled through a single source of truth, ensuring consistency across the entire application.
