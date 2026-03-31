import { Typography } from '@/constants/typography';
import React from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing } from '../constants/theme';
import { AddButton } from './AddButton';
import { DiscountBadge } from './DiscountBadge';
import { OptionButton } from './OptionButton';

export interface RecommendationProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  originalPrice?: number;
  weight?: string;
  discount?: number;
  hasOptions?: boolean;
  optionsCount?: number;
}

export interface RecommendationCardProps {
  /** Product data */
  product: RecommendationProduct;
  /** Handler for add button press */
  onAddPress?: (productId: string) => void;
  /** Handler for options button press */
  onOptionsPress?: (productId: string) => void;
  /** Container style */
  style?: ViewStyle;
  /** Currency symbol */
  currencySymbol?: string;
}

/**
 * Product recommendation card for "Did you forget?" section
 * Reuses existing DiscountBadge, AddButton, and OptionButton components
 */
export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  product,
  onAddPress,
  onOptionsPress,
  style,
  currencySymbol = '₹',
}) => {
  const handleAddPress = () => {
    onAddPress?.(product.id);
  };

  const handleOptionsPress = () => {
    onOptionsPress?.(product.id);
  };

  const discountPercentage = product.discount ||
    (product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0);

  return (
    <View style={[styles.container, style]}>
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <DiscountBadge
          discount={discountPercentage}
          size="small"
          position="top-left"
        />
      )}

      {/* Product Image */}
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Product Info */}
      <View style={styles.infoContainer}>
        {/* Category */}
        <Text style={styles.category} numberOfLines={1}>
          {product.category}
        </Text>

        {/* Product Name */}
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        {/* Weight */}
        {product.weight && (
          <Text style={styles.weight} numberOfLines={1}>
            {product.weight}
          </Text>
        )}

        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {currencySymbol}{product.price}
          </Text>
          {product.originalPrice && product.originalPrice > product.price && (
            <Text style={styles.originalPrice}>
              {currencySymbol}{product.originalPrice}
            </Text>
          )}
        </View>

        {/* Action Button */}
        {product.hasOptions ? (
          <OptionButton
            text={`${product.optionsCount || 2} options`}
            onPress={handleOptionsPress}
            variant="primary"
            fullWidth
            style={styles.actionButton}
          />
        ) : (
          <AddButton
            text="Add"
            onPress={handleAddPress}
            size="medium"
            fullWidth
            style={styles.actionButton}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    ...Shadows.small,
    marginRight: Spacing.md,
    overflow: 'visible',
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
    backgroundColor: '#F5F5F5',
  },
  infoContainer: {
    padding: Spacing.sm,
  },
  category: {
    ...Typography.body,
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  name: {
    ...Typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
    minHeight: 34,
  },
  weight: {
    ...Typography.body,
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  price: {
    ...Typography.body,
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.text,
  },
  originalPrice: {
    ...Typography.body,
    fontSize: 12,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  actionButton: {
    marginTop: 4,
  },
});
