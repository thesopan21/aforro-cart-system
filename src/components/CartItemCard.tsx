import React from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../constants/theme';
import { Typography } from '@/constants/typography';
import { QuantityStepper } from './QuantityStepper';
import { CartItem } from '@/store/slices/cartSlice';

export interface CartItemCardProps {
  /** Cart item data */
  item: CartItem;
  /** Handler for quantity increase */
  onIncrease?: (itemId: string) => void;
  /** Handler for quantity decrease */
  onDecrease?: (itemId: string) => void;
  /** Container style */
  style?: ViewStyle;
  /** Currency symbol */
  currencySymbol?: string;
}

/**
 * Cart item card component displaying product info with quantity stepper
 * Reuses existing QuantityStepper component
 */
export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onIncrease,
  onDecrease,
  style,
  currencySymbol = '₹',
}) => {
  const handleIncrease = () => {
    onIncrease?.(item.id);
  };

  const handleDecrease = () => {
    onDecrease?.(item.id);
  };

  // Get the first image if array, or use the value directly
  const imageSource = Array.isArray(item.image) ? item.image[0] : item.image;
  
  // Determine if it's a URI string or a local asset (number from require())
  const imageProps = typeof imageSource === 'string' 
    ? { uri: imageSource } 
    : imageSource;

  return (
    <View style={[styles.container, style]}>
      {/* Product Image */}
      {imageSource && (
        <Image source={imageProps} style={styles.image} resizeMode="cover" />
      )}

      {/* Product Info - Name and Weight */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>
        {item.weight && (
          <Text style={styles.weight}>
            {item.quantity} x {item.weight}
          </Text>
        )}
      </View>

      {/* Stepper and Price Column */}
      <View style={styles.rightColumn}>
        {/* Quantity Stepper */}
        <QuantityStepper
          value={item.quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          min={0}
          size="medium"
        />
        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {currencySymbol}{item.price}
          </Text>
          {item.originalPrice && item.originalPrice > item.price && (
            <Text style={styles.originalPrice}>
              {currencySymbol}{item.originalPrice}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.md,
    backgroundColor: '#F5F5F5',
  },
  infoContainer: {
    flex: 1,
    marginLeft: Spacing.md,
    justifyContent: 'center',
  },
  title: {
    ...Typography.body,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  weight: {
    ...Typography.body,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  rightColumn: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: Spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  price: {
    ...Typography.body,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  originalPrice: {
    ...Typography.body,
    fontSize: 13,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
});
