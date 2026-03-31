
import { AnimatedScrollView } from '@/components/AnimatedScrollView';
import { CardWrapper } from '@/components/CardWrapper';
import { DiscountBadge } from '@/components/DiscountBadge';
import { Header } from '@/components/Header';
import { IconButton } from '@/components/IconButton';
import { OptionButton } from '@/components/OptionButton';
import { QuantityStepper } from '@/components/QuantityStepper';
import React, { useCallback, useRef, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, ViewToken } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BorderRadius, Colors, Spacing, Typography } from '../constants/theme';
import { Image } from 'expo-image';

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

export default function HomeScreen() {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageCarouselRef = useRef<FlatList>(null);

  // Product images array
  const productImages = [
    'https://via.placeholder.com/300/6A1B9A/FFFFFF?text=Image+1',
    'https://via.placeholder.com/300/7B1FA2/FFFFFF?text=Image+2',
    'https://via.placeholder.com/300/8E24AA/FFFFFF?text=Image+3',
    'https://via.placeholder.com/300/9C27B0/FFFFFF?text=Image+4',
    'https://via.placeholder.com/300/AB47BC/FFFFFF?text=Image+5',
  ];

  // Handle viewable items change for pagination
  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentImageIndex(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 10,
    minimumViewTime: 100,
  }).current;

  // Fallback handler for scroll end to ensure last item is detected
  const handleScrollEnd = useCallback((event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / 200);
    if (index >= 0 && index < productImages.length) {
      setCurrentImageIndex(index);
    }
  }, [productImages.length]);

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
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Dairy milk silk chocolate abcdefghitg..."
        leftIcon={
          <IconButton
            name="back"
            size={24}
            color={Colors.text}
            onPress={() => console.log('Back pressed')}
          />
        }
        rightIcon={
          <IconButton
            name="share"
            size={24}
            color={Colors.text}
            onPress={() => console.log('Share pressed')}
          />
        }
      />
      <AnimatedScrollView
        enableHeaderFade={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Product Card */}
        <CardWrapper
          style={styles.mainProductCard}
          shadowSize="large"
          padding={Spacing.lg}
        >
          {/* Discount Badge */}
          <DiscountBadge
            discount={mainProduct.discount}
            size="large"
          />

          {/* Product Image Carousel */}
          <View style={styles.imageCarouselContainer}>
            <FlatList
              ref={imageCarouselRef}
              data={productImages}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={styles.productImage}
                  contentFit="contain"
                />
              )}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              onMomentumScrollEnd={handleScrollEnd}
              getItemLayout={(data, index) => ({
                length: 200,
                offset: 200 * index,
                index,
              })}
            />

            {/* Pagination Dots */}
            <View style={styles.paginationContainer}>
              {productImages.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    currentImageIndex === index && styles.paginationDotActive,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Product Details */}
          <Text style={styles.brandText}>{mainProduct.brand}</Text>
          <Text style={styles.productName}>{mainProduct.name}</Text>
          <View style={{ 
            flexDirection: 'row', 
            gap: Spacing.sm, 
            alignItems: 'center' ,
            justifyContent: 'space-between',
            }}>
            <View style={{
              justifyContent: 'center',
            }}>
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
              onPress={() => console.log('Options pressed')}
            />
          </View>
          {/* Quantity Stepper Example */}
          {/* <View style={styles.quantitySection}>
            <QuantityStepper
              value={quantity}
              onIncrease={() => setQuantity(quantity + 1)}
              onDecrease={() => setQuantity(quantity - 1)}
              min={1}
              max={10}
              size="medium"
            />
          </View> */}
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
                  onPress={() => console.log('Options pressed:', product.id)}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  mainProductCard: {
    marginBottom: Spacing.xl,
    // alignItems: 'center',
  },
  imageCarouselContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  productImage: {
    width: 200,
    height: 230,
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
  paginationDotActive: {
    backgroundColor: '#FF9800',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  brandText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  productName: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  weight: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    // marginBottom: Spacing.md,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  price: {
    ...Typography.h3,
    color: Colors.text,
  },
  originalPrice: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
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