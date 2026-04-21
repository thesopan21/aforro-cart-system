import { AddressBottomSheet, SavedAddress } from '@/components/AddressBottomSheet';
import { AlertBanner } from '@/components/AlertBanner';
import { CardWrapper } from '@/components/CardWrapper';
import { CartItemCard } from '@/components/CartItemCard';
import { CashbackBanner } from '@/components/CashbackBanner';
import { CartSummary } from '@/components/CartSummary';
import { Coupon, CouponCard } from '@/components/CouponCard';
import { DeliveryInfoBanner, DeliveryType } from '@/components/DeliveryInfoBanner';
import { DeliveryInstructions, DeliveryInstructionsState } from '@/components/DeliveryInstructions';
import { Header } from '@/components/Header';
import { RecommendationCard, } from '@/components/RecommendationCard';
import { SavingsBanner } from '@/components/SavingsBanner';
import { fontFamily, Typography } from '@/constants/typography';
import { recommendationProducts } from '@/data/recommendedProduct';
import { useAuth } from '@/hooks/useAuth';
import { ServiceabilityStatus, useServiceability } from '@/hooks/useServiceability';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateQuantity } from '@/store/slices/cartSlice';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Shadows, Spacing } from '../constants/theme';

const CartScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const addressBottomSheetRef = useRef<BottomSheet>(null);
  const { checkServiceability, loading: checkingServiceability } = useServiceability();
  const { isLoggedIn, login } = useAuth();

  // Selected delivery address
  const [selectedAddress, setSelectedAddress] = useState<SavedAddress | null>(null);
  const [serviceabilityStatus, setServiceabilityStatus] = useState<ServiceabilityStatus | null>(null);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('instant'); // 'instant' or 'slot'

  // Sample coupons data
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: 'c1',
      code: 'ABCDEFGHI',
      discount: 250,
      minAmount: 700,
      description: 'Add items worth ₹700 to avail this offer',
      isApplied: false,
    },
    {
      id: 'c2',
      code: 'ABCDEFGHI',
      discount: 250,
      minAmount: 1200,
      description: 'Upto ₹250 on orders above ₹1200',
      isApplied: true,
    },
    {
      id: 'c3',
      code: 'ABCDEFGHI',
      discount: 250,
      minAmount: 1000,
      description: 'Upto ₹250 on orders above ₹1000',
      isApplied: false,
    },
  ]);

  // Delivery instructions state
  const [deliveryInstructions, setDeliveryInstructions] = useState<DeliveryInstructionsState>({
    dontRing: false,
    dontCall: false,
    leaveWithGuard: false,
    customNote: '',
  });

  const handleBackPress = () => {
    router.back();
  };

  const handleAddProduct = (productId: string) => {
    console.log('Add product:', productId);
    // Add to cart logic here
  };

  const handleProductOptions = (productId: string) => {
    console.log('Show options for:', productId);
    // Show options bottom sheet logic here
  };

  const handleApplyCoupon = (couponId: string) => {
    setCoupons(prevCoupons =>
      prevCoupons.map(coupon =>
        coupon.id === couponId ? { ...coupon, isApplied: true } : coupon
      )
    );
  };

  const handleRemoveCoupon = (couponId: string) => {
    setCoupons(prevCoupons =>
      prevCoupons.map(coupon =>
        coupon.id === couponId ? { ...coupon, isApplied: false } : coupon
      )
    );
  };

  const handleViewMoreCoupons = () => {
    console.log('View more coupons');
    // Navigate to coupons page
  };

  const appliedCoupon = coupons.find(c => c.isApplied);

  // Calculate cart totals
  const itemTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemSavings = cartItems.reduce((sum, item) => {
    if (item.originalPrice && item.originalPrice > item.price) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);
  const couponDiscount = appliedCoupon?.discount || 0;
  const platformFee = -444; // Platform fee waiver or discount
  const deliveryFee = selectedAddress && serviceabilityStatus?.isServiceable ? 0 : null;
  const totalPayable = deliveryFee !== null 
    ? itemTotal - couponDiscount + platformFee + deliveryFee
    : null;
  const totalSavings = itemSavings + couponDiscount + (platformFee < 0 ? Math.abs(platformFee) : 0);

  const handleQuantityIncrease = (itemId: string) => {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
      dispatch(updateQuantity({ id: itemId, quantity: item.quantity + 1 }));
    }
  };

  const handleQuantityDecrease = (itemId: string) => {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
      dispatch(updateQuantity({ id: itemId, quantity: item.quantity - 1 }));
    }
  };

  const handleOpenAddressBottomSheet = () => {
    addressBottomSheetRef.current?.expand();
  };

  const handleLogin = async () => {
    // In production, open login modal/screen
    Alert.alert(
      'Login Required',
      'Please login to continue with checkout',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Login',
          onPress: async () => {
            // Simulate login
            const result = await login('9876543210');
            if (result.success) {
              Alert.alert('Success', 'Logged in successfully');
            }
          },
        },
      ]
    );
  };

  const handleAddressAdd = async (address: SavedAddress) => {
    setSelectedAddress(address);
    addressBottomSheetRef.current?.close();

    // ALWAYS check serviceability regardless of login status
    const status = await checkServiceability(address.address, address.coordinates);
    setServiceabilityStatus(status);

    // Determine delivery type based on serviceability (only if logged in)
    if (isLoggedIn && status.isServiceable) {
      // In production, this would come from API/product data
      if (status.estimatedDeliveryTime) {
        setDeliveryType('instant');
      } else {
        setDeliveryType('slot');
      }
    }
  };

  const handleAddressSelect = async (address: SavedAddress) => {
    setSelectedAddress(address);
    addressBottomSheetRef.current?.close();

    // ALWAYS check serviceability regardless of login status
    const status = await checkServiceability(address.address, address.coordinates);
    setServiceabilityStatus(status);

    // Determine delivery type based on serviceability (only if logged in)
    if (isLoggedIn && status.isServiceable) {
      if (status.estimatedDeliveryTime) {
        setDeliveryType('instant');
      } else {
        setDeliveryType('slot');
      }
    }
  };

  // Auto-open bottom sheet on mount if no address selected (regardless of login)
  useEffect(() => {
    if (!selectedAddress) {
      const timer = setTimeout(() => {
        addressBottomSheetRef.current?.expand();
      }, 500); // Delay to ensure component is mounted

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      {/* Header Section */}
      <Header
        title="Review Cart"
        leftIcon={
          <Entypo name="chevron-left" size={24} color="black" />
        }
        onLeftPress={handleBackPress}
      />

      {/* Cart Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Savings Banner */}
        <SavingsBanner
          amount={99}
          style={styles.savingsBanner}
        />

        {/* Warning/Alert Banner */}
        <AlertBanner
          type="warning"
          message={[
            'Your order might be delayed due to high demand',
            'Your order might be delayed due to high demand',
          ]}
          style={styles.alertBanner}
        />

        {/* Cart Items List */}
        <CardWrapper style={styles.mainProductCard}>
          {cartItems.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              onIncrease={handleQuantityIncrease}
              onDecrease={handleQuantityDecrease}
            />
          ))}
        </CardWrapper>


        {/* Recommendations Section - "Did you forget?" */}
        <CardWrapper style={styles.recommendationSection}>
          <Text style={styles.sectionTitle}>Did you forget?</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendationScroll}
          >
            {recommendationProducts.map((product) => (
              <RecommendationCard
                key={product.id}
                product={product}
                onAddPress={handleAddProduct}
                onOptionsPress={handleProductOptions}
              />
            ))}
          </ScrollView>
        </CardWrapper>

        {/* Coupons Section */}
        <CardWrapper style={styles.couponSection}>
          {/* 2. Heading section */}
          <View style={styles.couponHeader}>
            <MaterialCommunityIcons name="sale" size={16} color="#0C748C" />
            <Text style={styles.couponHeaderText}>Top coupons for you</Text>
            <MaterialCommunityIcons name="sale" size={16} color="#0C748C" />
          </View>

          {/* Dashed line */}
          <View style={styles.dashedLine} />

          {/* 3. Coupon cards section */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.couponScroll}
          >
            {coupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                onApply={handleApplyCoupon}
                onRemove={handleRemoveCoupon}
              />
            ))}
          </ScrollView>

          {/* Dashed line */}
          <View style={styles.dashedLine} />

          {/* 4. Savings info section (conditional) */}
          {appliedCoupon && (
            <>
              <View style={styles.savingsInfo}>
                <Text style={styles.savingsInfoText}>🎉</Text>
                <Text style={styles.savingsInfoText}>
                  You are <Text style={styles.highlightedText}>saving ₹{appliedCoupon.discount}</Text> with this coupon
                </Text>
                <Text style={styles.savingsInfoText}>🎉</Text>
              </View>
              {/* Dashed line */}
              <View style={styles.dashedLine} />
            </>
          )}

          {/* 5. View more link section */}
          <Pressable
            style={({ pressed }) => [
              styles.viewMoreLink,
              pressed && styles.viewMoreLinkPressed,
            ]}
            onPress={handleViewMoreCoupons}
          >
            <Text style={styles.viewMoreText}>View more coupons and offers</Text>
            <Entypo name="chevron-right" size={16} color={Colors.textSecondary} />
          </Pressable>
        </CardWrapper>

        {/* Cashback Promotion Banner */}
        <CardWrapper style={styles.cashbackSection}>
          <CashbackBanner
            amountNeeded={45}
            cashbackPercentage={1}
            style={styles.cashbackBanner}
          />
        </CardWrapper>

        {/* Delivery Instructions Section */}
        <CardWrapper style={styles.deliverySection}>
          <DeliveryInstructions
            instructions={deliveryInstructions}
            onChange={setDeliveryInstructions}
          />
        </CardWrapper>

        {/* Cart Summary Section */}
        <CardWrapper style={styles.summarySection}>
          <CartSummary
            itemTotal={itemTotal}
            itemSavings={itemSavings}
            deliveryFee={deliveryFee}
            discount={couponDiscount}
            platformFee={platformFee}
            total={totalPayable}
            totalSavings={totalSavings}
            hasAddress={!!selectedAddress}
          />
        </CardWrapper>

        <CardWrapper padding={Spacing.lg}>
          <Text style={styles.sectionTitle}>Cancellation policy</Text>
          <Text style={styles.policyText}>
            You can cancel your order for free within the first 90 seconds. 
            After that, a cancellation fee will apply.
          </Text>
        </CardWrapper>
      </ScrollView>

      {/* Delivery Info Banner - Fixed below header */}
      <DeliveryInfoBanner
        hasAddress={!!selectedAddress}
        isServiceable={serviceabilityStatus?.isServiceable ?? null}
        isLoggedIn={isLoggedIn}
        deliveryType={deliveryType}
        addressType={selectedAddress?.type}
        address={selectedAddress?.address}
        estimatedTime={serviceabilityStatus?.estimatedDeliveryTime}
        onAddAddress={handleOpenAddressBottomSheet}
        onChangeAddress={handleOpenAddressBottomSheet}
        onLogin={handleLogin}
      />

      {/* Proceed Button - Fixed at bottom */}
      {/* <View style={styles.proceedContainer}>
        <View style={styles.proceedTopSection}>
          <View>
            <Text style={styles.toPayLabel}>To Pay</Text>
            <Text style={styles.toPayAmount}>
              {totalPayable !== null ? `₹${totalPayable}` : '--'}
            </Text>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.proceedButton,
              // Disable if: no address OR not serviceable
              (!selectedAddress || serviceabilityStatus?.isServiceable === false) && styles.proceedButtonDisabled,
              pressed && styles.proceedButtonPressed,
            ]}
            disabled={!selectedAddress || serviceabilityStatus?.isServiceable === false}
            onPress={() => {
              if (!isLoggedIn) {
                handleLogin();
              } else {
                console.log('Proceed to checkout');
              }
            }}
          >
            <Text style={styles.proceedButtonText}>
              {!isLoggedIn ? 'Login to continue' : 'Proceed'}
            </Text>
          </Pressable>
        </View>
      </View> */}

      {/* Address Bottom Sheet */}
      <AddressBottomSheet
        ref={addressBottomSheetRef}
        onAddressAdd={handleAddressAdd}
        onAddressSelect={handleAddressSelect}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: 120, // Extra padding for fixed proceed button
  },
  savingsBanner: {
    marginBottom: Spacing.md,
  },
  alertBanner: {
    marginBottom: Spacing.md,
  },
  mainProductCard: {
    marginBottom: Spacing.md,
  },
  recommendationSection: {
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.body,
    fontSize: 16,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  recommendationScroll: {
    paddingRight: Spacing.lg,
  },
  couponSection: {
    marginBottom: Spacing.lg,
  },
  cashbackSection: {
    marginBottom: Spacing.lg,
  },
  dashedLine: {
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#D4D4D4',
    marginVertical: Spacing.md,
  },
  couponHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  couponHeaderText: {
    fontSize: 14,
    fontFamily: fontFamily.plusJakartaSansSemiBold,
    color: '#0C748C',
  },
  couponHeaderIcon: {
    fontSize: 16,
  },
  couponScroll: {
    paddingRight: Spacing.lg,
    paddingVertical: 24,
    paddingLeft: 4
  },
  savingsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  savingsInfoText: {
    fontSize: 12,
    fontFamily: fontFamily.plusJakartaSansRegular,
    color: '#0C748C',
    textAlign: 'center',
  },
  highlightedText: {
    fontFamily: fontFamily.plusJakartaSansMedium,
    color: '#0C748C',
  },
  viewMoreLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  viewMoreLinkPressed: {
    opacity: 0.6,
  },
  viewMoreText: {
    fontSize: 12,
    color: '#989898',
    fontFamily: fontFamily.plusJakartaSansSemiBold,
  },
  viewMoreArrow: {
    fontSize: 20,
    color: '#989898',
  },
  cashbackBanner: {
    marginBottom: Spacing.lg,
  },
  deliveryInstructionsScroll: {
    flex: 1,
  },
  deliveryInstructionsContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: 120, // Extra padding for fixed proceed button
  },
  deliverySection: {
    marginBottom: Spacing.lg,
  },
  summarySection: {
    marginBottom: Spacing.lg,
    padding: 0
  },
  priceSection: {
    marginBottom: Spacing.lg,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    marginBottom: Spacing.lg,
  },
  totalLabel: {
    ...Typography.body,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  totalValue: {
    ...Typography.body,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  bottomSavingsBanner: {
    marginBottom: Spacing.lg,
  },
  policySection: {
    marginBottom: Spacing.lg,
  },
  policyText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontFamily: fontFamily.plusJakartaSansRegular,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  loadingText: {
    ...Typography.body,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  proceedContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    ...Shadows.small,
  },
  proceedTopSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toPayLabel: {
    ...Typography.body,
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  toPayAmount: {
    ...Typography.body,
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  proceedButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl * 2,
    borderRadius: 8,
    minWidth: 150,
    alignItems: 'center',
  },
  proceedButtonDisabled: {
    backgroundColor: Colors.border,
    opacity: 0.5,
  },
  proceedButtonPressed: {
    opacity: 0.8,
  },
  proceedButtonText: {
    ...Typography.body,
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default CartScreen;