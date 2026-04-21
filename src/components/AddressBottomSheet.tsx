import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors, Spacing } from '../constants/theme';
import { Typography } from '../constants/typography';
import { LocationCoordinates, useLocation } from '../hooks/useLocation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export interface SavedAddress {
  id: string;
  type: 'home' | 'work' | 'other';
  title: string;
  address: string;
  landmark?: string;
  coordinates?: LocationCoordinates;
}

interface AddressBottomSheetProps {
  onAddressSelect?: (address: SavedAddress) => void;
  onAddressAdd?: (address: SavedAddress) => void;
}

export const AddressBottomSheet = forwardRef<BottomSheet, AddressBottomSheetProps>(
  ({ onAddressSelect, onAddressAdd }, ref) => {
    const snapPoints = useMemo(() => ['35%', '50%'], []);
    const {
      permissionStatus,
      loading: locationLoading,
      getCurrentLocation,
      getAddressFromCoordinates,
    } = useLocation();

    const [detectedAddress, setDetectedAddress] = useState<string>('');
    const [manualAddress, setManualAddress] = useState({
      apartment: '',
      area: '',
      landmark: '',
    });
    const [selectedType, setSelectedType] = useState<'home' | 'work' | 'other'>('home');

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
      []
    );

    const handleUseCurrentLocation = async () => {
      const coords = await getCurrentLocation();
      if (coords) {
        const address = await getAddressFromCoordinates(coords.latitude, coords.longitude);
        if (address) {
          const formattedAddress = [
            address.name,
            address.street,
            address.subregion,
            address.city,
            address.region,
            address.postalCode,
            address.country,
          ]
            .filter(Boolean)
            .join(', ');
          setDetectedAddress(formattedAddress);
        }
      }
    };

    const handleSaveAddress = () => {
      const fullAddress = detectedAddress ||
        `${manualAddress.apartment}, ${manualAddress.area}, ${manualAddress.landmark}`.trim();

      const newAddress: SavedAddress = {
        id: Date.now().toString(),
        type: selectedType,
        title: selectedType.charAt(0).toUpperCase() + selectedType.slice(1),
        address: fullAddress,
        landmark: manualAddress.landmark,
      };

      onAddressAdd?.(newAddress);
    };

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.indicator}
      >
        <BottomSheetView style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.iconEmoji}>📍</Text>
            <Text style={styles.title}>Add Delivery Address</Text>
          </View>

          {/* Use Current Location Button */}
          <Pressable
            style={({ pressed }) => [
              styles.locationButton,
              pressed && styles.locationButtonPressed,
            ]}
            onPress={handleUseCurrentLocation}
            disabled={locationLoading}
          >
            <MaterialCommunityIcons name='map' size={24} color={Colors.primary} />
            <Text style={styles.locationButtonText}>
              {locationLoading ? 'Detecting location...' : 'Use my current location'}
            </Text>
            {locationLoading && (
              <ActivityIndicator size="small" color={Colors.primary} />
            )}
          </Pressable>

          {/* Detected Address Display */}
          {detectedAddress ? (
            <View style={styles.detectedAddressContainer}>
              <Text style={styles.detectedAddressLabel}>Detected Address:</Text>
              <Text style={styles.detectedAddressText}>{detectedAddress}</Text>
            </View>
          ) : null}

          {/* Manual Address Input */}
          <View style={styles.inputSection}>
            <Text style={styles.sectionLabel}>Or enter manually</Text>

            <TextInput
              style={styles.input}
              placeholder="Flat / House No / Floor / Building"
              placeholderTextColor={Colors.textSecondary}
              value={manualAddress.apartment}
              onChangeText={(text) =>
                setManualAddress((prev) => ({ ...prev, apartment: text }))
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Area / Sector / Locality"
              placeholderTextColor={Colors.textSecondary}
              value={manualAddress.area}
              onChangeText={(text) =>
                setManualAddress((prev) => ({ ...prev, area: text }))
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Nearby landmark (optional)"
              placeholderTextColor={Colors.textSecondary}
              value={manualAddress.landmark}
              onChangeText={(text) =>
                setManualAddress((prev) => ({ ...prev, landmark: text }))
              }
            />
          </View>

          {/* Save Button */}
          <Pressable
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.saveButtonPressed,
            ]}
            onPress={handleSaveAddress}
          >
            <Text style={styles.saveButtonText}>Save Address</Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

AddressBottomSheet.displayName = 'AddressBottomSheet';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  indicator: {
    backgroundColor: Colors.border,
    width: 40,
    height: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xxl,
    marginTop: 12,
  },
  iconEmoji: {
    fontSize: 24,
  },
  iconEmojiSmall: {
    fontSize: 18,
  },
  title: {
    ...Typography.h3,
    fontWeight: '700',
    color: Colors.text,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.background,
    marginBottom: Spacing.lg,
  },
  locationButtonPressed: {
    opacity: 0.7,
  },
  locationButtonText: {
    ...Typography.body,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
  },
  detectedAddressContainer: {
    backgroundColor: '#E8F5E9',
    padding: Spacing.md,
    borderRadius: 8,
    marginBottom: Spacing.lg,
  },
  detectedAddressLabel: {
    ...Typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: Spacing.xs,
  },
  detectedAddressText: {
    ...Typography.body,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  inputSection: {
    marginBottom: Spacing.lg,
  },
  sectionLabel: {
    ...Typography.body,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
    textAlign:'center'
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    ...Typography.body,
    fontSize: 14,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  typeSection: {
    marginBottom: Spacing.xl,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  typeButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  typeButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  typeButtonPressed: {
    opacity: 0.7,
  },
  typeButtonText: {
    ...Typography.body,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  typeButtonTextSelected: {
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  saveButtonPressed: {
    opacity: 0.8,
  },
  saveButtonText: {
    ...Typography.body,
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
