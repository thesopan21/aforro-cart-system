import React, { forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { BorderRadius, Colors, Spacing } from '../constants/theme';
import { Typography } from '@/constants/typography';
import { QuantityStepper } from './QuantityStepper';
import { useRouter } from 'expo-router';

export interface ProductOption {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  weight?: string;
  available: boolean;
}

export interface ProductOptionsBottomSheetProps {
  title?: string;
  options: ProductOption[];
  onSelectOption?: (option: ProductOption, quantity: number) => void;
  /** Text for confirm button */
  confirmButtonText?: string;
  /** Enable navigation to cart screen (default: true) */
  enableCartNavigation?: boolean;
}

export const ProductOptionsBottomSheet = forwardRef<BottomSheet, ProductOptionsBottomSheetProps>(
  ({ 
    title = 'Select Options', options, onSelectOption, confirmButtonText = 'Go to Cart', enableCartNavigation = true }, ref) => {
    const router = useRouter();
    const [quantities, setQuantities] = React.useState<{ [key: string]: number }>(
      options.reduce((acc, option) => ({ ...acc, [option.id]: 1 }), {})
    );
    const [addedItems, setAddedItems] = React.useState<Set<string>>(new Set());

    const snapPoints = useMemo(() => ['50%', '75%'], []);

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

    const handleQuantityChange = (optionId: string, newQuantity: number) => {
      setQuantities((prev) => ({ ...prev, [optionId]: newQuantity }));
    };

    const handleSelectOption = (option: ProductOption) => {
      if (option.available && onSelectOption) {
        onSelectOption(option, quantities[option.id]);
        setAddedItems((prev) => new Set(prev).add(option.id));
      }
    };

    const handleConfirm = () => {
      if (enableCartNavigation) {
        // Close the bottom sheet first
        if (ref && typeof ref !== 'function' && ref.current) {
          ref.current.close();
        }
        // Navigate to cart screen after a short delay to allow sheet to close
        setTimeout(() => {
          router.push('/cart');
        }, 300);
      }
    };

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.optionsList}>
            {options.map((option) => (
              <View
                key={option.id}
                style={[
                  styles.optionCard,
                  !option.available && styles.optionCardDisabled,
                ]}
              >
                <View style={styles.optionInfo}>
                  <Text style={styles.optionName}>{option.name}</Text>
                  {option.weight && (
                    <Text style={styles.optionWeight}>{option.weight}</Text>
                  )}
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>₹{option.price}</Text>
                    {option.originalPrice && option.originalPrice > option.price && (
                      <Text style={styles.originalPrice}>₹{option.originalPrice}</Text>
                    )}
                  </View>
                </View>

                <View style={styles.optionActions}>
                  <QuantityStepper
                    value={quantities[option.id]}
                    onIncrease={() =>
                      handleQuantityChange(option.id, quantities[option.id] + 1)
                    }
                    onDecrease={() =>
                      handleQuantityChange(option.id, quantities[option.id] - 1)
                    }
                    min={1}
                    max={10}
                    size="small"
                    disabled={!option.available}
                  />
                  <Pressable
                    style={[
                      styles.addButton,
                      !option.available && styles.addButtonDisabled,
                    ]}
                    onPress={() => handleSelectOption(option)}
                    disabled={!option.available}
                  >
                    <Text
                      style={[
                        styles.addButtonText,
                        !option.available && styles.addButtonTextDisabled,
                      ]}
                    >
                      {option.available ? 'Add' : 'Out of Stock'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>

          {/* Confirm Button */}
          {enableCartNavigation && addedItems.size > 0 && (
            <View style={styles.confirmButtonContainer}>
              <Pressable
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>
                  {confirmButtonText} ({addedItems.size} item{addedItems.size > 1 ? 's' : ''})
                </Text>
              </Pressable>
            </View>
          )}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

ProductOptionsBottomSheet.displayName = 'ProductOptionsBottomSheet';

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
  },
  handleIndicator: {
    backgroundColor: Colors.border,
    width: 40,
    height: 4,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  optionsList: {
    gap: Spacing.md,
  },
  optionCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionCardDisabled: {
    opacity: 0.6,
  },
  optionInfo: {
    flex: 1,
  },
  optionName: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  optionWeight: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  price: {
    ...Typography.h3,
    color: Colors.text,
    fontWeight: '700',
  },
  originalPrice: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  optionActions: {
    gap: Spacing.sm,
    alignItems: 'flex-end',
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    minWidth: 80,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: Colors.textSecondary,
  },
  addButtonText: {
    ...Typography.body,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  addButtonTextDisabled: {
    color: Colors.border,
  },
  confirmButtonContainer: {
    marginTop: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md + 2,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    ...Typography.body,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
