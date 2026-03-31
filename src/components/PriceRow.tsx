import { Typography } from '@/constants/typography';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors, Spacing } from '../constants/theme';

export interface PriceRowProps {
  /** Label text */
  label: string;
  /** Price value */
  value: number | string;
  /** Currency symbol */
  currencySymbol?: string;
  /** Original/strikethrough value */
  originalValue?: number;
  /** Badge text (e.g., "saved ₹99") */
  badgeText?: string;
  /** Helper text below label */
  helperText?: string;
  /** Helper text color */
  helperTextColor?: string;
  /** Show as discount (green, negative) */
  isDiscount?: boolean;
  /** Show as FREE */
  isFree?: boolean;
  /** Value text color */
  valueColor?: string;
  /** Container style */
  style?: ViewStyle;
}

/**
 * Price row component for displaying price breakdown items
 * Supports badges, strikethrough prices, helper text, and FREE display
 */
export const PriceRow: React.FC<PriceRowProps> = ({
  label,
  value,
  currencySymbol = '₹',
  originalValue,
  badgeText,
  helperText,
  helperTextColor = '#FF9800',
  isDiscount = false,
  isFree = false,
  valueColor,
  style,
}) => {
  const displayValue = typeof value === 'number'
    ? `${isDiscount && value > 0 ? '-' : ''}${currencySymbol}${Math.abs(value)}`
    : value;

  const priceColor = valueColor || (isDiscount ? '#4CAF50' : Colors.text);

  return (
    <View style={[styles.container, style]}>
      {/* Left side - Label */}
      <View style={styles.labelContainer}>
        <View style={styles.labelRow}>
          <Text style={styles.bulletPoint}>●</Text>
          <Text style={styles.label}>{label}</Text>
          {badgeText && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badgeText}</Text>
            </View>
          )}
        </View>
        {helperText && (
          <Text style={[styles.helperText, { color: helperTextColor }]}>
            {helperText}
          </Text>
        )}
      </View>

      {/* Right side - Value */}
      <View style={styles.valueContainer}>
        {originalValue && (
          <Text style={styles.originalValue}>
            {currencySymbol}{originalValue}
          </Text>
        )}
        {isFree ? (
          <Text style={[styles.value, styles.freeText]}>FREE</Text>
        ) : (
          <Text style={[styles.value, { color: priceColor }]}>
            {displayValue}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: Spacing.sm,
  },
  labelContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    flexWrap: 'wrap',
  },
  bulletPoint: {
    fontSize: 6,
    color: Colors.text,
    lineHeight: 14,
  },
  label: {
    ...Typography.body,
    fontSize: 14,
    color: Colors.text,
  },
  badge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    ...Typography.body,
    fontSize: 10,
    color: '#E65100',
    fontWeight: '600',
  },
  helperText: {
    ...Typography.body,
    fontSize: 11,
    marginLeft: 10,
    marginTop: 2,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  value: {
    ...Typography.body,
    fontSize: 14,
    fontWeight: '600',
  },
  originalValue: {
    ...Typography.body,
    fontSize: 13,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  freeText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
