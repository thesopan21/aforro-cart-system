import { useState } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export const useAuth = () => {
  // For demo purposes, managing auth state locally
  // In production, this would integrate with your actual auth service
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = user !== null;

  const login = async (phone: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone,
      };

      setUser(mockUser);
      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    isLoggedIn,
    isLoading,
    login,
    logout,
  };
};
