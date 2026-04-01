# Aforro Cart System

A production-ready e-commerce mobile application built with React Native and Expo, featuring comprehensive cart management, delivery options, and a modern UI/UX design.

## Overview

Aforro Cart System is a full-featured shopping cart and checkout application designed for quick commerce platforms. It provides users with an intuitive interface to browse products, manage cart items, apply coupons, select delivery addresses, and track savings—all while offering real-time serviceability checks and delivery options.


## Features

### Cart & Checkout
- **Smart Cart Management** - Add, remove, and update product quantities with instant state synchronization
- **Product Variants** - Select from multiple product options (size, weight) via bottom sheet interface
- **Quantity Controls** - Smooth increment/decrement with visual feedback
- **Auto-calculated Totals** - Real-time calculation of item totals, discounts, and savings

### Coupons & Savings
- **Multi-coupon Support** - Browse and apply multiple promotional codes
- **Dynamic Discount Calculation** - Automatic price adjustments based on applied coupons
- **Savings Tracker** - Visual display of total savings from discounts and offers
- **Cashback Banners** - Promotional cashback information display

### Delivery Management
- **Address Management** - Add, select, and manage multiple delivery addresses
- **Serviceability Check** - Real-time verification of delivery availability for selected locations
- **Delivery Options** - Choose between instant delivery and slot-based delivery
- **Custom Instructions** - Add delivery preferences (don't ring bell, leave with guard, etc.)
- **Location Services** - GPS-based address detection and coordinates tracking

### Product Experience
- **Image Carousel** - Swipeable product image gallery with pagination dots
- **Discount Badges** - Visual percentage-off indicators
- **Product Recommendations** - Smart suggestions for related products
- **Similar Products** - Cross-sell and upsell recommendations

### User Experience
- **Authentication** - Mock authentication system (ready for backend integration)
- **Animated Scroll Views** - Smooth scrolling with performance optimizations
- **Bottom Sheet Modals** - Native-feeling bottom sheets for options and addresses
- **Alert Banners** - Contextual information and error messaging
- **Responsive Design** - Optimized layouts for various screen sizes

## Tech Stack

### Core Framework
- **React Native** `0.83.4` - Cross-platform mobile development
- **Expo SDK** `~55.0.9` - Development platform and tooling
- **TypeScript** `~5.9.2` - Type-safe JavaScript

### State Management
- **Redux Toolkit** `^2.11.2` - Predictable state container
- **React Redux** `^9.2.0` - React bindings for Redux

### Navigation & Routing
- **Expo Router** `~55.0.8` - File-based routing system
- **React Navigation** `^7.1.33` - Navigation infrastructure

### UI & Animation
- **React Native Reanimated** `4.2.1` - Production-ready animations
- **React Native Gesture Handler** `~2.30.0` - Native gesture handling
- **@gorhom/bottom-sheet** `^5.2.8` - Performant bottom sheet component
- **React Native Reanimated Carousel** `^4.0.3` - Smooth image carousels

### Images & Icons
- **Expo Image** `~55.0.6` - High-performance image component
- **@expo/vector-icons** `^15.1.1` - Icon library

### Device Features
- **Expo Location** `~55.1.4` - GPS and location services
- **Expo Device** `~55.0.10` - Device information

### Development Tools
- **ESLint** `^9.0.0` - Code linting
- **Metro Bundler** - JavaScript bundler (via React Native)

## Architecture

### Design Pattern
The application follows a **component-based architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (React Components + Expo Router)       │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      State Management Layer             │
│        (Redux Toolkit)                  │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│       Business Logic Layer              │
│    (Custom Hooks + Services)            │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Data Layer                      │
│   (Mock Data + Types/Interfaces)        │
└─────────────────────────────────────────┘
```

### Key Architectural Decisions

**1. File-based Routing**
- Expo Router provides intuitive navigation structure
- Reduces boilerplate code for route configuration
- Type-safe navigation params

**2. Redux Toolkit for State**
- Centralized cart and product state management
- Immutable state updates with Immer
- Simplified action creators and reducers
- Better dev tools integration

**3. Custom Hooks Pattern**
- `useAuth` - Authentication logic abstraction
- `useLocation` - GPS and permission handling
- `useServiceability` - Delivery area verification
- Promotes code reusability and testability

**4. Typed Props & Interfaces**
- Full TypeScript coverage for type safety
- Prevents runtime errors
- Better IDE autocomplete and documentation

**5. Modular Component Library**
- Reusable UI components (`CardWrapper`, `Header`, `QuantityStepper`)
- Consistent design system via `theme.ts` and `typography.ts`
- Easier maintenance and scalability

## Folder Structure

```
aforro-cart-system/
├── app.json                    # Expo configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── eas.json                    # EAS Build configuration
│
├── src/
│   ├── app/                    # File-based routing (Expo Router)
│   │   ├── _layout.tsx         # Root layout component
│   │   ├── index.tsx           # Home/Product detail screen
│   │   └── cart.tsx            # Cart & checkout screen
│   │
│   ├── components/             # Reusable UI components
│   │   ├── AddButton.tsx
│   │   ├── CartItemCard.tsx
│   │   ├── CartSummary.tsx
│   │   ├── CouponCard.tsx
│   │   ├── ProductOptionsBottomSheet.tsx
│   │   ├── QuantityStepper.tsx
│   │   └── ... (20+ components)
│   │
│   ├── constants/              # Design system constants
│   │   ├── theme.ts            # Colors, spacing, shadows
│   │   └── typography.ts       # Font styles and sizes
│   │
│   ├── data/                   # Mock data for development
│   │   ├── product.ts
│   │   ├── recommendedProduct.ts
│   │   └── similarProducts.ts
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts          # Authentication logic
│   │   ├── useLocation.ts      # GPS/location handling
│   │   └── useServiceability.ts # Delivery check logic
│   │
│   ├── store/                  # Redux state management
│   │   ├── store.ts            # Redux store configuration
│   │   ├── hooks.ts            # Typed Redux hooks
│   │   └── slices/
│   │       ├── cartSlice.ts    # Cart state & actions
│   │       └── productSlice.ts # Product state & actions
│   │
│   └── types/                  # TypeScript interfaces
│       └── product.ts          # Product type definitions
│
├── assets/                     # Static assets
│   ├── fonts/                  # Custom fonts
│   ├── icons/                  # App icons
│   └── images/                 # Image assets
│
├── android/                    # Android native code
└── ios/                        # iOS native code
```

## API Integration

### Current State
The application currently uses **mock data and simulated API calls** for development and demonstration purposes. Mock implementations are found in:
- `/src/data/` - Static product data
- `/src/hooks/useServiceability.ts` - Simulated delivery checks
- `/src/hooks/useAuth.ts` - Mock authentication

**Data Flow**
```
User Action → Dispatch Redux Action → API Call → Update Redux State → UI Re-render
```

**Recommended Libraries for Production**
- **Axios** or **React Query** for HTTP requests
- **Redux Thunk/RTK Query** for async actions
- **Sentry** for error tracking

## Project Setup

### Prerequisites
- **Node.js** - v18.0.0 or higher
- **npm** or **yarn** - Latest stable version
- **Expo CLI** - Installed globally (optional but recommended)
- **iOS Simulator** (macOS only) or **Android Emulator**
- **EAS CLI** - For building production apps

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd aforro-cart-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npx expo start
```

### Running the App

#### iOS (macOS required)
```bash
# Using Expo Go
npx expo start
# Press 'i' to open iOS simulator

# Using development build
npx expo run:ios --device
```

#### Android
```bash
# Using Expo Go
npx expo start
# Press 'a' to open Android emulator

# Using development build
npx expo run:android --device
```

#### Web (Development Only)
```bash
npx expo start --web
```

### Building for Production

#### Using EAS Build
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

#### Local Builds
```bash
# Generate native folders
npx expo prebuild

# Build Android APK
cd android && ./gradlew assembleRelease

# Build iOS (requires macOS and Xcode)
cd ios && xcodebuild -workspace CartSystem.xcworkspace -scheme CartSystem archive
```

## Key Technical Decisions

### 1. Expo vs React Native CLI
**Choice:** Expo Managed Workflow

**Rationale:**
- Faster development cycle with minimal native code configuration
- Built-in OTA updates capability
- Simplified build process via EAS
- Rich ecosystem of pre-built modules (Image, Location, Font)
- Easier to maintain cross-platform consistency

### 2. Redux Toolkit vs Context API
**Choice:** Redux Toolkit

**Rationale:**
- Cart state needs to be accessible across multiple screens
- Better DevTools for debugging state changes
- Middleware support for future API integration
- Scalable for adding features like wish lists, order history

### 3. Expo Router vs React Navigation
**Choice:** Expo Router (file-based routing)

**Rationale:**
- Intuitive folder structure maps directly to routes
- Automatic deep linking configuration
- Type-safe navigation with typed routes
- Better alignment with modern web frameworks (Next.js pattern)

### 4. Bottom Sheet Library
**Choice:** `@gorhom/bottom-sheet`

**Rationale:**
- Most performant React Native bottom sheet library
- Smooth 60 FPS animations using Reanimated
- Rich feature set (snap points, backdrop, keyboard handling)
- Active maintenance and community support

### 5. Image Library
**Choice:** Expo Image

**Rationale:**
- Superior caching mechanism
- Lazy loading and progressive rendering
- Support for various formats including WebP and AVIF
- Better memory management than React Native's Image component

## Performance Optimizations

### 1. Memoization
- `React.memo()` for complex components (CartItemCard, RecommendationCard)
- `useMemo()` for cart total calculations
- `useCallback()` for event handlers passed as props

### 2. List Rendering
- FlatList with `keyExtractor` for efficient rendering
- `windowSize` optimization for long lists
- `removeClippedSubviews` for offscreen component cleanup

### 3. Image Optimization
- Expo Image with built-in caching
- Appropriate image sizes for different screen densities
- Lazy loading for below-the-fold images

### 4. State Updates
- Redux Toolkit's Immer for efficient immutable updates
- Selective component subscriptions using `useAppSelector`
- Batched state updates in React 19

### 5. Animation Performance
- Reanimated 2 for running animations on UI thread
- `useSharedValue` instead of React state for animation values
- Worklets for complex gesture calculations

### 6. Bundle Size
- Code splitting via dynamic imports (prepared for future screens)
- Tree shaking of unused modules
- Hermes engine for faster startup times (Android)

## Testing

### Testing Strategy (Recommended)

**Unit Testing**
```bash
# Install Jest and testing libraries
npm install --save-dev jest @testing-library/react-native

# Test Redux slices
src/store/slices/__tests__/cartSlice.test.ts

# Test custom hooks
src/hooks/__tests__/useAuth.test.ts
```

**Component Testing**
```bash
# Test isolated components
src/components/__tests__/CartItemCard.test.tsx
src/components/__tests__/QuantityStepper.test.tsx
```

**E2E Testing**
```bash
# Install Detox or Maestro
npm install --save-dev detox

# Test critical user flows
e2e/cart-checkout.test.ts
```

### Running Tests (When Implemented)
```bash
npm test                  # Run all tests
npm test -- --watch      # Watch mode
npm test -- --coverage   # Coverage report
```

## Future Improvements

### Short-term Enhancements
- **Backend Integration** - Connect to real API endpoints
- **Payment Gateway** - Integrate Stripe/Razorpay for checkout
- **Order History** - Track past orders and reorder functionality
- **Search & Filter** - Product search with category filters
- **Push Notifications** - Order updates and promotional alerts

### Medium-term Features
- **Wish List** - Save products for later
- **Product Reviews** - User ratings and reviews
- **Multi-language Support** - i18n implementation
- **Dark Mode** - Theme switching capability
- **Social Login** - Google/Facebook authentication

### Long-term Vision
- **AR Product Preview** - View products in your space
- **Voice Search** - Voice-based product discovery
- **Smart Recommendations** - ML-based personalization
- **Subscription Model** - Recurring delivery subscriptions
- **Analytics Dashboard** - User behavior tracking

### Technical Debt
- Add comprehensive unit test coverage (target: 80%+)
- Implement error boundary for graceful error handling
- Set up CI/CD pipeline (GitHub Actions/Bitrise)
- Add accessibility features (screen reader support)
- Implement offline mode with local data sync

## Demo

### Screenshots
_Screenshots to be added_

### Demo Videos

#### Android Demo
_Android demo video will be uploaded here_

<!-- 
To add Android demo video:
1. Record a screen recording of the Android app
2. Upload to GitHub repository or host on YouTube/Vimeo
3. Replace the placeholder below with actual video embed or link
-->

**Android Demo:** [Video Link Coming Soon]

#### iOS Demo
_iOS demo video will be uploaded here_

<!-- 
To add iOS demo video:
1. Record a screen recording of the iOS app using QuickTime/iOS screen recording
2. Upload to GitHub repository or host on YouTube/Vimeo
3. Replace the placeholder below with actual video embed or link
-->

**iOS Demo:** [Video Link Coming Soon]

### Live Demo
_Expo Go QR Code for instant preview (development build)_

```bash
# Generate QR code for testing
npx expo start
```

## Author

**[Sopan Bhere]**
- Email: sam21sop@gmail.com
- LinkedIn: [https://www.linkedin.com/in/thesopan21]()
- GitHub: [@thesopan21](https://github.com/thesopan21)

---

## License

This project is for educational/portfolio purposes. All rights reserved.

## Acknowledgments

- Design inspiration from modern quick commerce platforms
- Expo team for excellent documentation and tooling
- Redux Toolkit for simplified state management
- React Native community for comprehensive libraries

---

**Built with ❤️ using React Native and Expo**
