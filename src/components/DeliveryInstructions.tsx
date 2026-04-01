import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../constants/theme';
import { fontFamily, Typography } from '@/constants/typography';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export interface DeliveryInstructionsState {
  dontRing: boolean;
  dontCall: boolean;
  leaveWithGuard: boolean;
  customNote: string;
}

export interface DeliveryInstructionsProps {
  /** Current delivery instructions state */
  instructions: DeliveryInstructionsState;
  /** Callback when instructions change */
  onChange: (instructions: DeliveryInstructionsState) => void;
  /** Container style */
  style?: ViewStyle;
}

/**
 * Delivery Instructions component with preset options and custom note input
 * Shows chips for common delivery preferences and text input for custom instructions
 */
export const DeliveryInstructions: React.FC<DeliveryInstructionsProps> = ({
  instructions,
  onChange,
  style,
}) => {
  const toggleOption = (key: keyof Omit<DeliveryInstructionsState, 'customNote'>) => {
    onChange({
      ...instructions,
      [key]: !instructions[key],
    });
  };

  const handleCustomNoteChange = (text: string) => {
    onChange({
      ...instructions,
      customNote: text,
    });
  };

  return (
    <View style={[styles.container, style]}>
      {/* Title */}
      <Text style={styles.title}>Delivery instructions</Text>

      {/* Instruction Chips */}
      <View style={styles.chipsContainer}>
        {/* Don't ring the bell */}
        <Pressable
          style={({ pressed }) => [
            styles.chip,
            instructions.dontRing && styles.chipSelected,
            pressed && styles.chipPressed,
          ]}
          onPress={() => toggleOption('dontRing')}
        >
          <MaterialCommunityIcons
            name="bell-off"
            size={12}
            color={instructions.dontRing ? '#FF8024' : Colors.text}
          />
          <Text style={[
            styles.chipText,
            instructions.dontRing && styles.chipTextSelected,
          ]}>
            Don't ring the bell
          </Text>
        </Pressable>

        {/* Don't call */}
        <Pressable
          style={({ pressed }) => [
            styles.chip,
            instructions.dontCall && styles.chipSelected,
            pressed && styles.chipPressed,
          ]}
          onPress={() => toggleOption('dontCall')}
        >
          <MaterialCommunityIcons
            name="phone-off"
            size={12}
            color={instructions.dontCall ? '#FF8024' : Colors.text}
          />
          <Text style={[
            styles.chipText,
            instructions.dontCall && styles.chipTextSelected,
          ]}>
            Don't call
          </Text>
        </Pressable>

        {/* Leave order with guard */}
        <Pressable
          style={({ pressed }) => [
            styles.chip,
            instructions.leaveWithGuard && styles.chipSelected,
            pressed && styles.chipPressed,
          ]}
          onPress={() => toggleOption('leaveWithGuard')}
        >
          <FontAwesome6
            name="person-military-pointing"
            size={12}
            color={instructions.leaveWithGuard ? '#FF8024' : Colors.text}
          />
          <Text style={[
            styles.chipText,
            instructions.leaveWithGuard && styles.chipTextSelected,
          ]}>
            Leave order with guard
          </Text>
        </Pressable>
      </View>

      {/* Custom Note Input */}
      <TextInput
        style={styles.customInput}
        placeholder="Type in any other instructions..."
        placeholderTextColor={Colors.textSecondary}
        value={instructions.customNote}
        onChangeText={handleCustomNoteChange}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  title: {
    fontSize: 12,
    fontFamily: fontFamily.plusJakartaSansSemiBold,
    color: Colors.text,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    padding: 4,
    borderRadius: 4,
    borderWidth: 0.3,
    borderColor: '#ACACAC',
    backgroundColor: '#FFFFFF',
  },
  chipSelected: {
    borderColor: '#FF964A',
    borderWidth: 0.5,
    backgroundColor: '#FFEADB80',
  },
  chipPressed: {
    opacity: 0.7,
  },
  chipText: {
    fontSize: 10,
    fontFamily: fontFamily.plusJakartaSansRegular,
    color: Colors.text,
  },
  chipTextSelected: {
    color: '#FF8024',
    fontWeight: '500',
  },
  customInput: {
    borderBottomWidth: 1,
    borderColor: '#E7E7E7',
    paddingVertical: Spacing.sm,
    fontSize: 11,
    color: Colors.textSecondary,
    minHeight: 30,
    textAlignVertical: 'top',
  },
});
