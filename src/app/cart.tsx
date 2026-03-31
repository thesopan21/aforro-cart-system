import { AddressBottomSheet, SavedAddress } from '@/components/AddressBottomSheet';
import { AlertBanner } from '@/components/AlertBanner';
import { CartItem, CartItemCard } from '@/components/CartItemCard';
import { CashbackBanner } from '@/components/CashbackBanner';
import { Coupon, CouponCard } from '@/components/CouponCard';
import { DeliveryChip } from '@/components/DeliveryChip';
import { Header } from '@/components/Header';
import { IconButton } from '@/components/IconButton';
import { PriceRow } from '@/components/PriceRow';
import { RecommendationCard, RecommendationProduct } from '@/components/RecommendationCard';
import { SavingsBanner } from '@/components/SavingsBanner';
import { Typography } from '@/constants/typography';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Shadows, Spacing } from '../constants/theme';

const CartScreen = () => {
  const router = useRouter();
  const addressBottomSheetRef = useRef<BottomSheet>(null);

  // Selected delivery address
  const [selectedAddress, setSelectedAddress] = useState<SavedAddress | null>(null);

  // Sample cart items data
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Gold Premium Assam Tea',
      description: 'Rich Taste & Irresistible',
      image: 'https://via.placeholder.com/80/6A1B9A/FFFFFF?text=Tea',
      price: 199,
      originalPrice: 299,
      quantity: 1,
      weight: '1 kg',
    },
    {
      id: '2',
      name: 'Gold Premium Assam Tea',
      description: 'Rich Taste & Irresistible',
      image: 'https://via.placeholder.com/80/6A1B9A/FFFFFF?text=Tea',
      price: 199,
      originalPrice: 299,
      quantity: 1,
      weight: '1 kg',
    },
    {
      id: '3',
      name: 'Gold Premium Assam Tea',
      description: 'Rich Taste & Irresistible',
      image: 'https://via.placeholder.com/80/6A1B9A/FFFFFF?text=Tea',
      price: 199,
      originalPrice: 299,
      quantity: 1,
      weight: '1 kg',
    },
    {
      id: '4',
      name: 'Gold Premium Assam Tea',
      description: 'Rich Taste & Irresistible',
      image: 'https://via.placeholder.com/80/6A1B9A/FFFFFF?text=Tea',
      price: 199,
      originalPrice: 299,
      quantity: 1,
      weight: '1 kg',
    },
  ]);

  // Sample recommendation products data
  const recommendationProducts: RecommendationProduct[] = [
    {
      id: 'rec1',
      name: 'Gold Premium Assam Tea Rich...',
      category: 'Tata Tea',
      image: 'https://via.placeholder.com/140x120/2196F3/FFFFFF?text=SKYR+Yogurt',
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
      image: 'https://via.placeholder.com/140x120/2196F3/FFFFFF?text=SKYR+Yogurt',
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
      image: 'https://via.placeholder.com/140x120/FF9800/FFFFFF?text=Vinegar',
      price: 444,
      originalPrice: 444,
      weight: '1 kg',
      discount: 52,
      hasOptions: false,
    },
  ];

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
  const [deliveryInstructions, setDeliveryInstructions] = useState({
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

  const toggleDeliveryInstruction = (key: keyof typeof deliveryInstructions) => {
    setDeliveryInstructions(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleQuantityIncrease = (itemId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleQuantityDecrease = (itemId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const handleOpenAddressBottomSheet = () => {
    addressBottomSheetRef.current?.expand();
  };

  const handleAddressAdd = (address: SavedAddress) => {
    setSelectedAddress(address);
    addressBottomSheetRef.current?.close();
  };

  const handleAddressSelect = (address: SavedAddress) => {
    setSelectedAddress(address);
    addressBottomSheetRef.current?.close();
  };

  // Auto-open bottom sheet on mount if no address selected
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!selectedAddress) {
        addressBottomSheetRef.current?.expand();
      }
    }, 500); // Delay to ensure component is mounted

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header Section */}
      <Header
        title="Review Cart"
        leftIcon={
          <IconButton
            name="back"
            size={24}
            color={Colors.text}
          />
        }
        onLeftPress={handleBackPress}
        style={styles.header}
        backgroundColor={Colors.background}
      />

      {/* Cart Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Savings Banner */}
        <SavingsBanner amount={99} style={styles.savingsBanner} />

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
        {cartItems.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            onIncrease={handleQuantityIncrease}
            onDecrease={handleQuantityDecrease}
          />
        ))}

        {/* Recommendations Section - "Did you forget?" */}
        <View style={styles.recommendationSection}>
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
        </View>

        {/* Coupons Section */}
        <View style={styles.couponSection}>
          <View style={styles.couponHeader}>
            <Text style={styles.couponHeaderIcon}>🎯</Text>
            <Text style={styles.couponHeaderText}>Top coupons for you</Text>
            <Text style={styles.couponHeaderIcon}>🎯</Text>
          </View>
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
        </View>

        {/* Applied Coupon Savings Banner */}
        {appliedCoupon && (
          <View style={styles.appliedCouponBanner}>
            <Text style={styles.appliedCouponText}>🎉</Text>
            <Text style={styles.appliedCouponText}>
              You are saving ₹{appliedCoupon.discount} with this coupon
            </Text>
            <Text style={styles.appliedCouponText}>🎉</Text>
          </View>
        )}

        {/* View More Coupons Link */}
        <Pressable
          style={({ pressed }) => [
            styles.viewMoreLink,
            pressed && styles.viewMoreLinkPressed,
          ]}
          onPress={handleViewMoreCoupons}
        >
          <Text style={styles.viewMoreText}>View more coupons and offers</Text>
          <Text style={styles.viewMoreArrow}>›</Text>
        </Pressable>

        {/* Cashback Promotion Banner */}
        <CashbackBanner
          amountNeeded={45}
          cashbackPercentage={1}
          style={styles.cashbackBanner}
        />

        {/* Delivery Address Section */}
        <View style={styles.deliveryAddressSection}>
          <View style={styles.deliveryAddressHeader}>
            <Text style={styles.iconEmoji}>📍</Text>
            <Text style={styles.deliveryAddressTitle}>
              Where would you like us to deliver?
            </Text>
          </View>

          {selectedAddress ? (
            <Pressable
              style={({ pressed }) => [
                styles.selectedAddressCard,
                pressed && styles.selectedAddressCardPressed,
              ]}
              onPress={handleOpenAddressBottomSheet}
            >
              <View style={styles.addressInfo}>
                <View style={styles.addressTypeContainer}>
                  <Text style={styles.iconEmojiSmall}>🏠</Text>
                  <Text style={styles.addressType}>{selectedAddress.title}</Text>
                </View>
                <Text style={styles.addressText} numberOfLines={2}>
                  {selectedAddress.address}
                </Text>
                {selectedAddress.landmark && (
                  <Text style={styles.landmarkText}>
                    Landmark: {selectedAddress.landmark}
                  </Text>
                )}
              </View>
              <Text style={styles.changeText}>Change</Text>
            </Pressable>
          ) : (
            <Pressable
              style={({ pressed }) => [
                styles.addAddressButton,
                pressed && styles.addAddressButtonPressed,
              ]}
              onPress={handleOpenAddressBottomSheet}
            >
              <Text style={styles.addAddressButtonText}>Add address</Text>
            </Pressable>
          )}
        </View>

        {/* Delivery Instructions Section */}
        <View style={styles.deliverySection}>
          <Text style={styles.sectionTitle}>Delivery instructions</Text>

          {/* Instruction Chips */}
          <View style={styles.chipsContainer}>
            <DeliveryChip
              icon="🔔"
              label="Don't ring the bell"
              selected={deliveryInstructions.dontRing}
              onPress={() => toggleDeliveryInstruction('dontRing')}
            />
            <DeliveryChip
              icon="📞"
              label="Don't call"
              selected={deliveryInstructions.dontCall}
              onPress={() => toggleDeliveryInstruction('dontCall')}
            />
            <DeliveryChip
              icon="💂"
              label="Leave order with guard"
              selected={deliveryInstructions.leaveWithGuard}
              onPress={() => toggleDeliveryInstruction('leaveWithGuard')}
            />
          </View>

          {/* Custom Instructions Input */}
          <TextInput
            style={styles.customInput}
            placeholder="Type in any other instructions..."
            placeholderTextColor={Colors.textSecondary}
            value={deliveryInstructions.customNote}
            onChangeText={(text) =>
              setDeliveryInstructions(prev => ({ ...prev, customNote: text }))
            }
            multiline
          />
        </View>

        {/* Price Breakdown Section */}
        <View style={styles.priceSection}>
          <PriceRow
            label="Item total"
            value={444}
            badgeText="saved ₹99"
          />
          <PriceRow
            label="Delivery fee"
            value={0}
            originalValue={444}
            isFree
            helperText="Add items worth ₹20 to get free delivery"
          />
          <PriceRow
            label="Discount"
            value={444}
            isDiscount
          />
          <PriceRow
            label="Platform fee"
            value={444}
            isDiscount
          />
        </View>

        {/* Total Payable Amount */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total payable amount</Text>
          <Text style={styles.totalValue}>₹444</Text>
        </View>

        {/* Bottom Savings Banner */}
        <SavingsBanner amount={99} style={styles.bottomSavingsBanner} />

        {/* Cancellation Policy */}
        <View style={styles.policySection}>
          <Text style={styles.policyTitle}>Cancellation policy</Text>
          <Text style={styles.policyText}>
            You can cancel your order for free within the first 90 seconds. After that, a cancellation fee will apply.
          </Text>
        </View>
      </ScrollView>

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
    backgroundColor: Colors.background,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    ...Shadows.small,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  savingsBanner: {
    marginBottom: Spacing.lg,
  },
  alertBanner: {
    marginBottom: Spacing.lg,
  },
  recommendationSection: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.body,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  recommendationScroll: {
    paddingRight: Spacing.lg,
  },
  couponSection: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  couponHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  couponHeaderText: {
    ...Typography.body,
    fontSize: 15,
    fontWeight: '700',
    color: '#00ACC1',
  },
  couponHeaderIcon: {
    fontSize: 16,
  },
  couponScroll: {
    paddingRight: Spacing.lg,
  },
  appliedCouponBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF3E0',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
    marginBottom: Spacing.md,
    gap: Spacing.xs,
  },
  appliedCouponText: {
    ...Typography.body,
    fontSize: 14,
    fontWeight: '600',
    color: '#E65100',
    textAlign: 'center',
  },
  viewMoreLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    marginBottom: Spacing.lg,
    gap: Spacing.xs,
  },
  viewMoreLinkPressed: {
    opacity: 0.6,
  },
  viewMoreText: {
    ...Typography.body,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  viewMoreArrow: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
  cashbackBanner: {
    marginBottom: Spacing.lg,
  },
  deliveryAddressSection: {
    marginBottom: Spacing.lg,
    backgroundColor: '#FFFFFF',
    padding: Spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  deliveryAddressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  iconEmoji: {
    fontSize: 24,
  },
  iconEmojiSmall: {
    fontSize: 16,
  },
  deliveryAddressTitle: {
    ...Typography.body,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  addAddressButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
  },
  addAddressButtonPressed: {
    opacity: 0.8,
  },
  addAddressButtonText: {
    ...Typography.body,
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  selectedAddressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  selectedAddressCardPressed: {
    opacity: 0.7,
  },
  addressInfo: {
    flex: 1,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  addressType: {
    ...Typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
  },
  addressText: {
    ...Typography.body,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: Spacing.xs,
  },
  landmarkText: {
    ...Typography.body,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  changeText: {
    ...Typography.body,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  deliverySection: {
    marginBottom: Spacing.lg,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  customInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    ...Typography.body,
    fontSize: 13,
    color: Colors.text,
    minHeight: 60,
    textAlignVertical: 'top',
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
    marginBottom: Spacing.xl,
  },
  policyTitle: {
    ...Typography.body,
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  policyText: {
    ...Typography.body,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

export default CartScreen;