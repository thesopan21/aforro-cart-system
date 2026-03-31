import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Spacing, Typography } from '../constants/theme';

export interface AddButtonProps {
  /** Press handler */
  onPress?: () => void;
  /** Button text */
  text?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Custom style */
  style?: ViewStyle;
  /** Button size */
  size?: 'small' | 'medium' | 'large';
  /** Full width button */
  fullWidth?: boolean;
}

/**
 * AddButton component for adding items to cart
 * Simple pressable button with "Add" text
 */
export const AddButton: React.FC<AddButtonProps> = ({
  onPress,
  text = 'Add',
  disabled = false,
  style,
  size = 'medium',
  fullWidth = false,
}) => {
  const buttonStyles = [
    styles.button,
    size === 'small' && styles.smallButton,
    size === 'medium' && styles.mediumButton,
    size === 'large' && styles.largeButton,
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    size === 'small' && styles.smallText,
    size === 'medium' && styles.mediumText,
    size === 'large' && styles.largeText,
  ];

  return (
    <Pressable
      style={({ pressed }) => [
        ...buttonStyles,
        pressed && !disabled && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={textStyles}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
  },
  smallButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  mediumButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  largeButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: Colors.textSecondary,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    color: Colors.background,
    fontWeight: '600',
  },
  smallText: {
    ...Typography.bodySmall,
  },
  mediumText: {
    ...Typography.body,
  },
  largeText: {
    ...Typography.h3,
  },
});
