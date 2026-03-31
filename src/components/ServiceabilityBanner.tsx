import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing } from '../constants/theme';
import { Typography } from '../constants/typography';

interface ServiceabilityBannerProps {
  isServiceable: boolean;
  address: string;
  onChangeAddress?: () => void;
  estimatedDeliveryTime?: string;
}

export const ServiceabilityBanner: React.FC<ServiceabilityBannerProps> = ({
  isServiceable,
  address,
  onChangeAddress,
  estimatedDeliveryTime,
}) => {
  return (
    <View
      style={[
        styles.container,
        isServiceable ? styles.serviceableContainer : styles.notServiceableContainer,
      ]}
    >
      <View style={styles.leftSection}>
        <Text style={styles.icon}>📍</Text>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.statusText,
              isServiceable ? styles.serviceableText : styles.notServiceableText,
            ]}
          >
            {isServiceable ? 'Delivery available' : 'Location is not serviceable'}
          </Text>
          <Text style={styles.addressText} numberOfLines={1}>
            {address}
          </Text>
          {isServiceable && estimatedDeliveryTime && (
            <Text style={styles.deliveryTimeText}>
              Estimated delivery: {estimatedDeliveryTime}
            </Text>
          )}
        </View>
      </View>
      {onChangeAddress && (
        <Pressable
          style={({ pressed }) => [
            styles.changeButton,
            pressed && styles.changeButtonPressed,
          ]}
          onPress={onChangeAddress}
        >
          <Text style={styles.changeButtonText}>Change</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  serviceableContainer: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  notServiceableContainer: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.sm,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  statusText: {
    ...Typography.body,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  serviceableText: {
    color: '#2E7D32',
  },
  notServiceableText: {
    color: '#C62828',
  },
  addressText: {
    ...Typography.body,
    fontSize: 13,
    color: Colors.text,
    marginBottom: 2,
  },
  deliveryTimeText: {
    ...Typography.body,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  changeButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
  changeButtonPressed: {
    opacity: 0.6,
  },
  changeButtonText: {
    ...Typography.body,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
});
