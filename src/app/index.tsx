
import { AnimatedScrollView } from '@/components/AnimatedScrollView';
import { CardWrapper } from '@/components/CardWrapper';
import { DiscountBadge } from '@/components/DiscountBadge';
import { Header } from '@/components/Header';
import { OptionButton } from '@/components/OptionButton';
import { ProductOption, ProductOptionsBottomSheet } from '@/components/ProductOptionsBottomSheet';
import { fontFamily, Typography } from '@/constants/typography';
import { similarProducts } from '@/data/similarProducts';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedProduct } from '@/store/slices/productSlice';
import { Product } from '@/types/product';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import BottomSheet from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../constants/theme';
/**
 * Example usage of AnimatedScrollView and CardWrapper components
 * This demonstrates a product detail screen similar to the attached design
 */

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector((state) => state.product.selectedProduct);

  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const progressValue = useSharedValue<number>(0);

  // Sample product options
  const productOptions: ProductOption[] = [
    {
      id: '1',
      name: 'Dairy milk Silk Chocolate Bar - 64g',
      price: 444,
      originalPrice: 550,
      weight: '64 g',
      available: true,
    },
    {
      id: '2',
      name: 'Dairy milk Silk Chocolate Bar - 128g',
      price: 850,
      originalPrice: 1000,
      weight: '128 g',
      available: true,
    },
    {
      id: '3',
      name: 'Dairy milk Silk Chocolate Bar - 256g',
      price: 1600,
      originalPrice: 1900,
      weight: '256 g',
      available: false,
    },
  ];

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const handleSelectOption = (option: ProductOption, quantity: number) => {
    console.log('Selected option:', option, 'Quantity:', quantity);

    // Update the selected product with the chosen variant
    const updatedProduct: Product = {
      ...selectedProduct,
      id: option.id,
      name: option.name,
      price: option.price,
      originalPrice: option.originalPrice ? option.originalPrice : option.price,
      weight: option.weight,
      discount: option.originalPrice ? Math.round(((option.originalPrice - option.price) / option.originalPrice) * 100) : 0,
    };

    dispatch(setSelectedProduct(updatedProduct));
    setQuantity(quantity);

    // Close the bottom sheet
    bottomSheetRef.current?.close();
  };

  const handleProductClick = (product: Product) => {
    dispatch(setSelectedProduct(product));
    // Scroll to top when product changes
    setCurrentImageIndex(0);
  };



  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <Header
        title={selectedProduct.name}
        leftIcon={
          <Entypo name="chevron-left" size={24} color="black" />
        }
        rightIcon={
          <Feather name="share-2" size={24} color="#858585" />
        }
      />
      <AnimatedScrollView
        enableHeaderFade={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Product Card */}
        <CardWrapper style={styles.mainProductCard}>
          {/* Discount Badge */}
          <DiscountBadge
            discount={selectedProduct.discount}
            size="large"
          />

          {/* Product Image Carousel */}
          <View style={styles.imageCarouselContainer}>
            <Carousel
              loop
              width={screenWidth - 32}
              height={280}
              data={selectedProduct.image}
              scrollAnimationDuration={300}
              onSnapToItem={(index) => setCurrentImageIndex(index)}
              onProgressChange={progressValue}
              renderItem={({ item }: { item: string }) => (
                <View style={styles.carouselItem}>
                  <Image
                    source={item}
                    style={styles.productImage}
                    contentFit="contain"
                  />
                </View>
              )}
            />

            {/* Pagination Dots */}
            <Pagination.Basic
              progress={progressValue}
              data={selectedProduct.image}
              dotStyle={styles.paginationDot}
              activeDotStyle={styles.paginationActiveDot}
              containerStyle={styles.paginationContainer}
            />
          </View>

          {/* Product Details */}
          <Text style={styles.brandText}>{selectedProduct.brand}</Text>
          <Text style={styles.productName} numberOfLines={2}>{selectedProduct.name}</Text>
          <View style={styles.productDetailsRow}>
            <View style={styles.weightPriceContainer}>
              <Text style={styles.weight}>{selectedProduct.weight}</Text>
              {/* Price Section */}
              <View style={styles.priceContainer}>
                <Text style={styles.price}>₹{selectedProduct.price}</Text>
                <Text style={styles.originalPrice}>₹{selectedProduct.originalPrice}</Text>
              </View>
            </View>

            {/* Option Button */}
            <OptionButton
              text="2 options"
              onPress={handleOpenBottomSheet}
            />
          </View>
        </CardWrapper>

        {/* Similar Products Section */}
        <CardWrapper style={styles.section} padding={Spacing.lg}>
          <Text style={styles.sectionTitle}>Similar product</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {similarProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => handleProductClick(product)}
                activeOpacity={0.7}
              >
                {/* Discount Badge */}
                <DiscountBadge
                  discount={product.discount}
                  size="small"
                />

                {/* Product Image */}
                <Image
                  source={product.image}
                  style={styles.smallProductImage}
                  contentFit="contain"
                />

                {/* Product Info */}
                <Text style={styles.smallBrand}>{product.brand}</Text>
                <Text style={styles.smallProductName} numberOfLines={2}>
                  {product.name}
                </Text>
                <Text style={styles.smallWeight}>{product.weight}</Text>

                {/* Price */}
                <View style={styles.smallPriceContainer}>
                  <Text style={styles.smallPrice}>₹{product.price}</Text>
                  <Text style={styles.smallOriginalPrice}>₹{product.originalPrice}</Text>
                </View>

                {/* Options Button */}
                <OptionButton
                  text="2 options"
                  onPress={handleOpenBottomSheet}
                  fullWidth
                  variant="primary"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </CardWrapper>

        {/* Description Section */}
        <View style={styles.section}>
          <CardWrapper padding={Spacing.lg}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </Text>
          </CardWrapper>
        </View>

        {/* Customer also bought Section */}
        <CardWrapper style={styles.section} padding={Spacing.lg}>
          <Text style={styles.sectionTitle}>Customer also bought</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {similarProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => handleProductClick(product)}
                activeOpacity={0.7}
              >
                {/* Discount Badge */}
                <DiscountBadge
                  discount={product.discount}
                  size="small"
                />

                {/* Product Image */}
                <Image
                  source={product.image}
                  style={styles.smallProductImage}
                  contentFit="contain"
                />

                {/* Product Info */}
                <Text style={styles.smallBrand}>{product.brand}</Text>
                <Text style={styles.smallProductName} numberOfLines={2}>
                  {product.name}
                </Text>
                <Text style={styles.smallWeight}>{product.weight}</Text>

                {/* Price */}
                <View style={styles.smallPriceContainer}>
                  <Text style={styles.smallPrice}>₹{product.price}</Text>
                  <Text style={styles.smallOriginalPrice}>₹{product.originalPrice}</Text>
                </View>

                {/* Options Button */}
                <OptionButton
                  text="2 options"
                  onPress={handleOpenBottomSheet}
                  fullWidth
                  variant="primary"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </CardWrapper>
      </AnimatedScrollView>

      {/* Bottom Sheet for Product Options */}
      <ProductOptionsBottomSheet
        ref={bottomSheetRef}
        title="Select Size"
        options={productOptions}
        onSelectOption={handleSelectOption}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FBFBFB'
  },
  scrollContent: {
    padding: 16,
  },
  mainProductCard: {
    marginBottom: Spacing.md,
  },
  imageCarouselContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: Spacing.lg,
  },
  carouselItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.md,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  paginationActiveDot: {
    backgroundColor: '#FF9800',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  brandText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontSize: 12,
    fontFamily: fontFamily.plusJakartaSansRegular,
    marginBottom: Spacing.xs,
  },
  productName: {
    ...Typography.h3,
    color: Colors.text,
    fontFamily: fontFamily.plusJakartaSansSemiBold,
    marginBottom: Spacing.xs,
  },
  weight: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontSize: 12,
    fontFamily: fontFamily.plusJakartaSansRegular,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    // backgroundColor:'red'
    // marginBottom: Spacing.lg,
  },
  price: {
    ...Typography.h3,
    color: Colors.text,
    fontSize: 14,
    fontFamily: fontFamily.plusJakartaSansSemiBold,
  },
  originalPrice: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontSize: 12,
    fontFamily: fontFamily.plusJakartaSansRegular,
    textDecorationLine: 'line-through',
  },
  productDetailsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weightPriceContainer: {
    justifyContent: 'center',
  },
  quantitySection: {
    marginTop: Spacing.md,
    alignItems: 'center',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.black,
    fontFamily: fontFamily.plusJakartaSansSemiBold,
    fontSize: 14,
    marginBottom: Spacing.md,
  },
  horizontalScrollContent: {
    gap: Spacing.md,
    paddingRight: Spacing.md,
  },
  productCard: {
    width: 120,
  },
  smallProductImage: {
    width: 44,
    height: 120,
    alignSelf: 'center',
  },
  smallBrand: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 10,
    fontFamily: fontFamily.plusJakartaSansSemiBold,
    marginBottom: 2,
  },
  smallProductName: {
    ...Typography.body,
    color: Colors.text,
    fontSize: 12,
    fontFamily: fontFamily.plusJakartaSansSemiBold,
  },
  smallWeight: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 10,
    fontFamily: fontFamily.plusJakartaSansRegular,
  },
  smallPriceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  smallPrice: {
    ...Typography.h3,
    color: Colors.text,
    fontSize: 12,
    fontFamily: fontFamily.plusJakartaSansSemiBold,
  },
  smallOriginalPrice: {
    ...Typography.body,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
    fontSize: 10,
    fontFamily: fontFamily.plusJakartaSansRegular,
  },
  descriptionText: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
});