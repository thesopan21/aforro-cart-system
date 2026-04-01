import React from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../constants/theme';
import { fontFamily, Typography } from '@/constants/typography';
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
        <View style={styles.imageContainer}>
          <Image source={imageProps} style={styles.image} resizeMode="cover" />
        </View>
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
          size="small"
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
    marginBottom: Spacing.xl,
  },
  imageContainer: {
    width: 56,
    height: 56,
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: Spacing.md,
    justifyContent: 'space-around',
  },
  title: {
    ...Typography.body,
    fontSize: 11,
    fontFamily: fontFamily.plusJakartaSansSemiBold,
    color: '#5D5D5D',
  },
  weight: {
    fontSize: 11,
    color: '#C0C0C0',
    fontFamily: fontFamily.plusJakartaSansRegular,
  },
  rightColumn: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: Spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  price: {
    fontSize: 14,
    fontFamily: fontFamily.plusJakartaSansSemiBold,
    color: '#292C3F',
  },
  originalPrice: {
    fontSize: 12,
    color: '#D4D4D4',
    fontFamily: fontFamily.plusJakartaSansRegular,
    textDecorationLine: 'line-through',
  },
});
