import { fontFamily, Typography } from '@/constants/typography';
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
  backgroundColor = '#DAF6FC',
  textColor = '#0C748C',
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
    borderRadius: BorderRadius.md,
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 0px 15.2px 0px #6262621F',
  },
  text: {
    ...Typography.body,
    fontSize: 12,
    fontFamily: fontFamily.plusJakartaSansSemiBold,
    textAlign: 'center',
  },
});
