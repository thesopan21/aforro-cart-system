import { useState } from 'react';
import { LocationCoordinates } from './useLocation';

export interface ServiceabilityStatus {
  isServiceable: boolean;
  message: string;
  estimatedDeliveryTime?: string;
}

export const useServiceability = () => {
  const [loading, setLoading] = useState(false);

  const checkServiceability = async (
    address: string,
    coordinates?: LocationCoordinates
  ): Promise<ServiceabilityStatus> => {
    try {
      setLoading(true);

      // Simulate API call to check serviceability
      // In production, replace this with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock logic: For demo, make some addresses not serviceable
      const isServiceable = Math.random() > 0.3; // 70% chance of being serviceable

      if (isServiceable) {
        return {
          isServiceable: true,
          message: 'Delivery available in your area',
          estimatedDeliveryTime: '30-45 mins',
        };
      } else {
        return {
          isServiceable: false,
          message: 'Location is not serviceable',
        };
      }
    } catch (error) {
      console.error('Error checking serviceability:', error);
      return {
        isServiceable: false,
        message: 'Unable to verify serviceability. Please try again.',
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    checkServiceability,
    loading,
  };
};
