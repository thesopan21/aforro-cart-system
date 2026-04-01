
import { appAssets } from '@/assets/images';
import { AnimatedScrollView } from '@/components/AnimatedScrollView';
import { CardWrapper } from '@/components/CardWrapper';
import { DiscountBadge } from '@/components/DiscountBadge';
import { Header } from '@/components/Header';
import { OptionButton } from '@/components/OptionButton';
import { ProductOption, ProductOptionsBottomSheet } from '@/components/ProductOptionsBottomSheet';
import { fontFamily, Typography } from '@/constants/typography';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import BottomSheet from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BorderRadius, Colors, Spacing, } from '../constants/theme';
/**
 * Example usage of AnimatedScrollView and CardWrapper components
 * This demonstrates a product detail screen similar to the attached design
 */

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  weight: string;
  image: string;
}

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
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
    // Add your logic here (e.g., add to cart)
  };

  // Product images array
  const productImages = [
    appAssets.itemImage,
    appAssets.itemImage,
    appAssets.itemImage,
  ];

  const mainProduct: Product = {
    id: '1',
    name: 'Dairy milk Silk Chocolate Bar',
    brand: 'Cadbury',
    price: 444,
    originalPrice: 444,
    discount: 52,
    weight: '64 g',
    image: 'https://via.placeholder.com/300',
  };

  const similarProducts: Product[] = [
    {
      id: '2',
      name: 'Gold Premium Assam Tea Rich...',
      brand: 'Tata Tea',
      price: 444,
      originalPrice: 444,
      discount: 52,
      weight: '1kg',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      name: 'Gold Premium Assam Tea Rich...',
      brand: 'Tata Tea',
      price: 444,
      originalPrice: 444,
      discount: 52,
      weight: '1kg',
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <Header
        title="Dairy milk silk chocolate abcdefghitg..."
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
            discount={mainProduct.discount}
            size="large"
          />

          {/* Product Image Carousel */}
          <View style={styles.imageCarouselContainer}>
            <Carousel
              loop
              width={screenWidth - 32}
              height={280}
              data={productImages}
              scrollAnimationDuration={300}
              onSnapToItem={(index) => setCurrentImageIndex(index)}
              onProgressChange={progressValue}
              renderItem={({ item }) => (
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
              data={productImages}
              dotStyle={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: Colors.border,
              }}
              activeDotStyle={{
                backgroundColor: '#FF9800',
                width: 10,
                height: 10,
                borderRadius: 5,
              }}
              containerStyle={styles.paginationContainer}
            />
          </View>

          {/* Product Details */}
          <Text style={styles.brandText}>{mainProduct.brand}</Text>
          <Text style={styles.productName} numberOfLines={2}>{mainProduct.name}</Text>
          <View style={styles.productDetailsRow}>
            <View style={styles.weightPriceContainer}>
              <Text style={styles.weight}>{mainProduct.weight}</Text>
              {/* Price Section */}
              <View style={styles.priceContainer}>
                <Text style={styles.price}>₹{mainProduct.price}</Text>
                <Text style={styles.originalPrice}>₹{mainProduct.originalPrice}</Text>
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
              <View
                key={product.id}
                style={styles.productCard}
              >
                {/* Discount Badge */}
                <DiscountBadge discount={product.discount} size="small" />

                {/* Product Image */}
                <Image
                  source={{ uri: product.image }}
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
              </View>
            ))}
          </ScrollView>
        </CardWrapper>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <CardWrapper padding={Spacing.lg}>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </Text>
          </CardWrapper>
        </View>
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
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  horizontalScrollContent: {
    gap: Spacing.md,
  },
  productCard: {
    width: 180,
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  smallProductImage: {
    width: '100%',
    height: 120,
    marginBottom: Spacing.md,
    marginTop: Spacing.sm,
  },
  smallBrand: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  smallProductName: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 20,
  },
  smallWeight: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
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
    fontWeight: '700',
  },
  smallOriginalPrice: {
    ...Typography.body,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  descriptionText: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
});