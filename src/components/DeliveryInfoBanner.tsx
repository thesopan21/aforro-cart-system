import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing } from '../constants/theme';
import { Typography } from '../constants/typography';

export type DeliveryType = 'instant' | 'slot';

interface DeliveryInfoBannerProps {
  hasAddress: boolean;
  isServiceable: boolean | null; // null = not checked yet, true/false = checked
  isLoggedIn: boolean;
  deliveryType?: DeliveryType;
  addressType?: string; // 'Home', 'Work', 'Other'
  address?: string;
  estimatedTime?: string; // e.g., '30-60 mins'
  onAddAddress?: () => void;
  onChangeAddress?: () => void;
  onLogin?: () => void;
}

export const DeliveryInfoBanner: React.FC<DeliveryInfoBannerProps> = ({
  hasAddress,
  isServiceable,
  isLoggedIn,
  deliveryType,
  addressType = 'Home',
  address,
  estimatedTime,
  onAddAddress,
  onChangeAddress,
  onLogin,
}) => {
  const renderContent = () => {
    // Case 1: No address selected - Show "Where would you like us to deliver?"
    if (!hasAddress) {
      return (
        <>
          <View style={styles.leftSection}>
            <Text style={styles.icon}>📍</Text>
            <View style={styles.textContainer}>
              <Text style={styles.deliverToText}>Where would you like us to deliver?</Text>
            </View>
          </View>
          {onAddAddress && (
            <Pressable
              style={({ pressed }) => [
                styles.addAddressButton,
                pressed && styles.addAddressButtonPressed,
              ]}
              onPress={onAddAddress}
            >
              <Text style={styles.addAddressButtonText}>Add address</Text>
            </Pressable>
          )}
        </>
      );
    }

    // Case 2: Address not serviceable - Show RED error
    if (isServiceable === false) {
      return (
        <>
          <View style={styles.leftSection}>
            <Text style={styles.icon}>📍</Text>
            <View style={styles.textContainer}>
              <Text style={styles.notServiceableText}>Location is not serviceable</Text>
              {address && (
                <Text style={styles.addressText} numberOfLines={1}>
                  {address}
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
        </>
      );
    }

    // Case 3: Serviceable but user not logged in
    if (isServiceable === true && !isLoggedIn) {
      return (
        <>
          <View style={styles.leftSection}>
            <Text style={styles.icon}>📍</Text>
            <View style={styles.textContainer}>
              <Text style={styles.deliverToText}>Deliver to</Text>
              {address && (
                <Text style={styles.addressText} numberOfLines={1}>
                  {address}
                </Text>
              )}
            </View>
          </View>
          {onLogin && (
            <Pressable
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.loginButtonPressed,
              ]}
              onPress={onLogin}
            >
              <Text style={styles.loginButtonText}>Login to continue</Text>
            </Pressable>
          )}
        </>
      );
    }

    // Case 4: Serviceable + Logged in + Slot delivery
    if (isServiceable === true && isLoggedIn && deliveryType === 'slot') {
      return (
        <>
          <View style={styles.leftSection}>
            <Text style={styles.icon}>📍</Text>
            <View style={styles.textContainer}>
              <Text style={styles.deliverToText}>
                Deliver to <Text style={styles.addressTypeText}>{addressType}</Text>
              </Text>
              {address && (
                <Text style={styles.addressText} numberOfLines={1}>
                  {address}
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
        </>
      );
    }

    // Case 5: Serviceable + Logged in + Instant delivery
    if (isServiceable === true && isLoggedIn && deliveryType === 'instant') {
      return (
        <>
          <View style={styles.leftSection}>
            <Text style={styles.icon}>📍</Text>
            <View style={styles.textContainer}>
              <Text style={styles.deliverInText}>
                Deliver in <Text style={styles.timeText}>{estimatedTime || '30-60 mins'}</Text>
                <Text style={styles.boltIcon}>⚡</Text>
              </Text>
              <Text style={styles.instantAddressText} numberOfLines={1}>
                <Text style={styles.addressTypeTextSmall}>{addressType}</Text>
                {address && (
                  <>
                    <Text style={styles.separator}> | </Text>
                    <Text style={styles.addressTextSecondary}>{address}</Text>
                  </>
                )}
              </Text>
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
        </>
      );
    }

    return null;
  };

  return <View style={styles.container}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: Spacing.md,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing.sm,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.sm,
  },
  icon: {
    fontSize: 28,
  },
  textContainer: {
    flex: 1,
  },
  deliverToText: {
    ...Typography.body,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.text,
    marginBottom: 2,
  },
  deliverInText: {
    ...Typography.body,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  notServiceableText: {
    ...Typography.body,
    fontSize: 16,
    fontWeight: '600',
    color: '#D32F2F', // Red color for error
    marginBottom: 2,
  },
  timeText: {
    fontWeight: '700',
    color: Colors.text,
  },
  boltIcon: {
    fontSize: 16,
  },
  addressTypeText: {
    fontWeight: '700',
    color: Colors.text,
  },
  addressTypeTextSmall: {
    ...Typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  addressText: {
    ...Typography.body,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  instantAddressText: {
    ...Typography.body,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  addressTextSecondary: {
    color: Colors.textSecondary,
  },
  separator: {
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
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  addAddressButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg + Spacing.md,
    borderRadius: 8,
  },
  addAddressButtonPressed: {
    opacity: 0.8,
  },
  addAddressButtonText: {
    ...Typography.body,
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg + Spacing.md,
    borderRadius: 8,
  },
  loginButtonPressed: {
    opacity: 0.8,
  },
  loginButtonText: {
    ...Typography.body,
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
