import { Typography } from '@/constants/typography';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { BorderRadius, Spacing } from '../constants/theme';

export interface SavingsBannerProps {
  /** Amount being saved */
  amount: number;
  /** Currency symbol */
  currencySymbol?: string;
  /** Custom message (if not provided, uses default format) */
  message?: string;
  /** Container style */
  style?: ViewStyle;
  /** Background color */
  backgroundColor?: string;
  /** Text color */
  textColor?: string;
}

/**
 * Reusable savings banner component to display savings information
 * Used in cart screen to show total savings
 */
export const SavingsBanner: React.FC<SavingsBannerProps> = ({
  amount,
  currencySymbol = '₹',
  message,
  style,
  backgroundColor = '#E0F7FA',
  textColor = '#00695C',
}) => {
  const displayMessage = message || `You are saving ${currencySymbol}${amount} with this order!`;

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <Text style={[styles.text, { color: textColor }]}>
        {displayMessage}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...Typography.body,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});
