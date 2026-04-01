import { fontFamily } from '@/constants/typography';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { BorderRadius, Spacing } from '../constants/theme';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export type AlertType = 'warning' | 'info' | 'error' | 'success';

export interface AlertBannerProps {
  /** Alert message(s) - can be string or array of strings */
  message: string | string[];
  /** Alert type - determines default colors and icon */
  type?: AlertType;
  /** Custom icon (overrides default icon for type) */
  icon?: string;
  /** Container style */
  style?: ViewStyle;
  /** Background color */
  backgroundColor?: string;
  /** Border color */
  borderColor?: string;
  /** Text color */
  textColor?: string;
  /** Icon color */
  iconColor?: string;
}


/**
 * Reusable alert banner component for displaying warnings, info, errors, or success messages
 * Supports single or multiple message lines
 */
export const AlertBanner: React.FC<AlertBannerProps> = ({
  message,
  style,
  backgroundColor = '#FFCD341A',
  borderColor = '#FFCD34',
  textColor = '#717171',
}) => {
  const messages = Array.isArray(message) ? message : [message];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        },
        style,
      ]}
    >
      {/* Icon */}
      <View style={styles.iconContainer}>
        <FontAwesome6 name="circle-exclamation" size={24} color="#FFCD34" />
      </View>

      {/* Message(s) */}
      <View style={styles.messageContainer}>
        {messages.map((msg, index) => (
          <Text
            key={index}
            style={[
              styles.messageText,
              { color: textColor  },
              index > 0 && styles.messageTextSpacing,
            ]}
          >
            {msg}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: Spacing.sm,
    paddingTop: 2,
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  messageContainer: {
    flex: 1,
    paddingTop: 2,
  },
  messageText: {
    fontSize: 12,
    fontFamily: fontFamily.plusJakartaSansRegular,
  },
  messageTextSpacing: {
    marginTop: 1,
  },
});
