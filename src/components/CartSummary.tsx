import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors, Spacing } from '../constants/theme';
import { fontFamily, Typography } from '@/constants/typography';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export interface CartSummaryProps {
  /** Item total amount */
  itemTotal: number;
  /** Amount saved on items */
  itemSavings?: number;
  /** Delivery fee (null if not calculated yet) */
  deliveryFee: number | null;
  /** Discount amount */
  discount?: number;
  /** Platform fee */
  platformFee?: number;
  /** Total amount calculated */
  total: number | null;
  /** Overall savings to display */
  totalSavings?: number;
  /** Whether address is added */
  hasAddress?: boolean;
  /** Currency symbol */
  currencySymbol?: string;
  /** Container style */
  style?: ViewStyle;
}

/**
 * Cart summary component showing price breakdown
 * Displays item total, delivery fee, discounts, platform fee, total, and savings
 */
export const CartSummary: React.FC<CartSummaryProps> = ({
  itemTotal,
  itemSavings,
  deliveryFee,
  discount = 0,
  platformFee = 0,
  total,
  totalSavings,
  hasAddress = false,
  currencySymbol = '₹',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Item Total */}
      <View style={styles.topContainer}>
        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <MaterialCommunityIcons name="currency-rupee" size={18} color={Colors.text} />
            <Text style={styles.label}>Item total</Text>
            {itemSavings && itemSavings > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  Saved {currencySymbol}{itemSavings}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.value}>{currencySymbol}{itemTotal}</Text>
        </View>

        {/* Delivery Fee */}
        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <MaterialCommunityIcons name="truck-delivery" size={18} color={Colors.text} />
            <View style={styles.labelTextContainer}>
              <Text style={styles.label}>Delivery fee</Text>
              {!hasAddress && (
                <Text style={styles.helperText}>Add address to get the exact fee</Text>
              )}
            </View>
          </View>
          <Text style={styles.value}>
            {deliveryFee === null ? '--' : deliveryFee === 0 ? 'FREE' : `${currencySymbol}${deliveryFee}`}
          </Text>
        </View>

        {/* Discount */}
        {discount > 0 && (
          <>
            <View style={styles.row}>
              <View style={styles.labelContainer}>
                <MaterialCommunityIcons name="sale" size={18} color={Colors.text} />
                <Text style={styles.label}>Discount</Text>
              </View>
              <Text style={styles.value}>-{currencySymbol}{discount}</Text>
            </View>

            {/* Dashed Line */}
            <View style={styles.dashedLine} />
          </>
        )}

        {/* Platform Fee */}
        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <FontAwesome name="tag" size={16} color={Colors.text} />
            <Text style={styles.label}>Platform fee</Text>
          </View>
          <Text style={[styles.value]}>
            {platformFee < 0 ? '-' : ''}{currencySymbol}{Math.abs(platformFee)}
          </Text>
        </View>

        {/* Dashed Line */}
        <View style={styles.dashedLine} />

        {/* Total Payable Amount */}
        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total payable amount</Text>
          <Text style={styles.totalValue}>
            {total === null ? '--' : `${currencySymbol}${total}`}
          </Text>
        </View>
      </View>

      {/* Savings Banner */}
      {totalSavings && totalSavings > 0 && (
        <View style={styles.savingsBannerContainer}>
          {/* Scalloped edge effect */}
          <View style={styles.scallopsContainer}>
            {Array.from({ length: 15 }).map((_, index) => (
              <View key={index} style={styles.scallop} />
            ))}
          </View>
          <View style={styles.savingsBanner}>
            <Text style={styles.savingsText}>
              You are saving {currencySymbol}{totalSavings} with this order!
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.xs,
  },
  topContainer: {
    padding: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: Spacing.xs,

  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  labelTextContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: fontFamily.plusJakartaSansMedium,
    color: '#5D5D5D',
  },
  badge: {
    backgroundColor: '#FFEADB',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 27,
    marginLeft: Spacing.xs,
    alignSelf:'center'
  },
  badgeText: {
    fontSize: 8,
    fontFamily: fontFamily.plusJakartaSansSemiBold,
    color: '#FF8024',
  },
  helperText: {
    fontSize: 11,
    fontFamily: fontFamily.plusJakartaSansRegular,
    color: '#FF8024',
    marginTop: 2,
  },
  value: {
    fontSize: 12,
    fontFamily: fontFamily.plusJakartaSansRegular,
    color: '#363636',
  },
  dashedLine: {
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    marginVertical: 10,
  },
  totalRow: {
    paddingVertical: Spacing.sm,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: fontFamily.plusJakartaSansSemiBold,
    color: Colors.text,
  },
  totalValue: {
    fontSize: 16,
    fontFamily: fontFamily.plusJakartaSansBold,
    color: Colors.text,
  },
  savingsBannerContainer: {
    marginTop: Spacing.md,
    position: 'relative',
  },
  scallopsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: -8,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  scallop: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  savingsBanner: {
    backgroundColor: '#E0F7FA',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
  },
  savingsText: {
    fontSize: 14,
    fontFamily: fontFamily.plusJakartaSansSemiBold,
    color: '#00838F',
    textAlign: 'center',
  },
});
