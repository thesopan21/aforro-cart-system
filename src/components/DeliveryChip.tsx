import { Typography } from '@/constants/typography';
import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../constants/theme';

export interface DeliveryChipProps {
  /** Chip label text */
  label: string;
  /** Icon/emoji to display */
  icon?: string;
  /** Selected state */
  selected?: boolean;
  /** Press handler */
  onPress?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Container style */
  style?: ViewStyle;
}

/**
 * Delivery instruction chip component
 * Toggle-able chip button for delivery preferences
 */
export const DeliveryChip: React.FC<DeliveryChipProps> = ({
  label,
  icon,
  selected = false,
  onPress,
  disabled = false,
  style,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        disabled && styles.chipDisabled,
        pressed && !disabled && styles.chipPressed,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text
        style={[
          styles.label,
          selected && styles.labelSelected,
          disabled && styles.labelDisabled,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    gap: Spacing.xs,
  },
  chipSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  chipDisabled: {
    opacity: 0.5,
  },
  chipPressed: {
    opacity: 0.7,
  },
  icon: {
    fontSize: 14,
  },
  label: {
    ...Typography.body,
    fontSize: 13,
    color: Colors.text,
  },
  labelSelected: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  labelDisabled: {
    color: Colors.textSecondary,
  },
});
