
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { BorderRadius, Colors, Spacing, Typography } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedScrollView } from '@/components/AnimatedScrollView';
import { CardWrapper } from '@/components/CardWrapper';
import { Header } from '@/components/Header';
import { IconButton } from '@/components/IconButton';

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
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{mainProduct.discount}%</Text>
            <Text style={styles.discountText}>OFF</Text>
          </View>

          {/* Product Image */}
          <Image
            source={{ uri: mainProduct.image }}
            style={styles.productImage}
            resizeMode="contain"
          />

          {/* Product Details */}
          <Text style={styles.brandText}>{mainProduct.brand}</Text>
          <Text style={styles.productName}>{mainProduct.name}</Text>
          <Text style={styles.weight}>{mainProduct.weight}</Text>

          {/* Price Section */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{mainProduct.price}</Text>
            <Text style={styles.originalPrice}>₹{mainProduct.originalPrice}</Text>
          </View>

          {/* Add to Cart Button */}
          <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>2 options</Text>
          </Pressable>
        </CardWrapper>

        {/* Similar Products Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Similar product</Text>

          <View style={styles.horizontalScroll}>
            {similarProducts.map((product) => (
              <CardWrapper
                key={product.id}
                style={styles.productCard}
                onPress={() => console.log('Product pressed:', product.id)}
                shadowSize="small"
                padding={Spacing.sm}
              >
                {/* Discount Badge */}
                <View style={styles.smallDiscountBadge}>
                  <Text style={styles.smallDiscountText}>{product.discount}%</Text>
                  <Text style={styles.smallDiscountText}>OFF</Text>
                </View>

                {/* Product Image */}
                <Image
                  source={{ uri: product.image }}
                  style={styles.smallProductImage}
                  resizeMode="contain"
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

                {/* Action Button */}
                <Pressable style={styles.smallAddButton}>
                  <Text style={styles.smallAddButtonText}>2 options</Text>
                </Pressable>
              </CardWrapper>
            ))}
          </View>
        </View>

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
    alignItems: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    backgroundColor: Colors.badge,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    zIndex: 1,
  },
  discountText: {
    color: Colors.background,
    fontSize: 12,
    fontWeight: '700',
  },
  productImage: {
    width: 200,
    height: 200,
    marginVertical: Spacing.lg,
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
    textAlign: 'center',
  },
  weight: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
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
  addButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: Colors.background,
    ...Typography.body,
    fontWeight: '600',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  horizontalScroll: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  productCard: {
    width: 140,
  },
  smallDiscountBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.badge,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    zIndex: 1,
  },
  smallDiscountText: {
    color: Colors.background,
    fontSize: 10,
    fontWeight: '700',
  },
  smallProductImage: {
    width: '100%',
    height: 100,
    marginBottom: Spacing.sm,
  },
  smallBrand: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  smallProductName: {
    ...Typography.bodySmall,
    color: Colors.text,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  smallWeight: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  smallPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  smallPrice: {
    ...Typography.bodySmall,
    color: Colors.text,
    fontWeight: '700',
  },
  smallOriginalPrice: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  smallAddButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
  },
  smallAddButtonText: {
    color: Colors.background,
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  descriptionText: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
});
