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

  const discountPercentage = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  return (
    <View style={[styles.container, style]}>
      {/* Product Image */}
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      )}

      {/* Product Info */}
      <View style={styles.infoContainer}>
        {/* Title and Description */}
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {item.name}
          </Text>
          {item.description && (
            <Text style={styles.description} numberOfLines={1}>
              {item.description}
            </Text>
          )}
          {/* Weight/Unit Info */}
          {item.weight && (
            <Text style={styles.weight}>
              {item.quantity} x {item.weight}
            </Text>
          )}
        </View>

        {/* Price and Quantity Row */}
        <View style={styles.bottomRow}>
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

          {/* Quantity Stepper */}
          <QuantityStepper
            value={item.quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            min={0}
            size="medium"
          />
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
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...Typography.body,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  description: {
    ...Typography.body,
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  weight: {
    ...Typography.body,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
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
