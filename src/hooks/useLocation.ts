import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export interface LocationPermissionStatus {
  granted: boolean;
  canAskAgain: boolean;
  status: Location.PermissionStatus;
}

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number | null;
}

export const useLocation = () => {
  const [permissionStatus, setPermissionStatus] = useState<LocationPermissionStatus>({
    granted: false,
    canAskAgain: true,
    status: Location.PermissionStatus.UNDETERMINED,
  });
  const [location, setLocation] = useState<LocationCoordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check permission status on mount
  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    try {
      const { status, canAskAgain } = await Location.getForegroundPermissionsAsync();
      setPermissionStatus({
        granted: status === 'granted',
        canAskAgain,
        status,
      });
    } catch (err) {
      setError('Failed to check location permission');
      console.error('Error checking permission:', err);
    }
  };

  const requestPermission = async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();

      const granted = status === 'granted';
      setPermissionStatus({
        granted,
        canAskAgain,
        status,
      });

      return granted;
    } catch (err) {
      setError('Failed to request location permission');
      console.error('Error requesting permission:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async (): Promise<LocationCoordinates | null> => {
    try {
      setLoading(true);
      setError(null);

      // Check if permission is granted
      if (!permissionStatus.granted) {
        const granted = await requestPermission();
        if (!granted) {
          setError('Location permission not granted');
          return null;
        }
      }

      // Get current location
      const locationResult = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const coords: LocationCoordinates = {
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
        accuracy: locationResult.coords.accuracy,
      };

      setLocation(coords);
      return coords;
    } catch (err) {
      setError('Failed to get current location');
      console.error('Error getting location:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getAddressFromCoordinates = async (
    latitude: number,
    longitude: number
  ): Promise<Location.LocationGeocodedAddress | null> => {
    try {
      const addresses = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addresses.length > 0) {
        return addresses[0];
      }
      return null;
    } catch (err) {
      console.error('Error getting address:', err);
      return null;
    }
  };

  return {
    permissionStatus,
    location,
    loading,
    error,
    checkPermission,
    requestPermission,
    getCurrentLocation,
    getAddressFromCoordinates,
  };
};
