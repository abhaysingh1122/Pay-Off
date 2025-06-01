import React, { createContext, useContext, useState, useCallback } from 'react';
import { BluetoothDevice, PaymentRequest } from '../types';
import { useUser } from './UserContext';

interface BluetoothContextType {
  devices: BluetoothDevice[];
  connectedDevice: BluetoothDevice | null;
  isScanning: boolean;
  scanForDevices: () => Promise<void>;
  connectToDevice: (deviceId: string) => Promise<void>;
  disconnectDevice: () => void;
  sendPayment: (amount: number, recipientId: string, note?: string) => Promise<boolean>;
  receivePayment: (paymentRequest: PaymentRequest) => Promise<boolean>;
  error: string | null;
}

const BluetoothContext = createContext<BluetoothContextType | undefined>(undefined);

export const BluetoothProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, addTransaction, updateBalance } = useUser();

  // Check if Web Bluetooth API is available
  const isWebBluetoothAvailable = () => {
    return typeof navigator !== 'undefined' && 'bluetooth' in navigator;
  };

  // Scan for nearby Bluetooth devices
  const scanForDevices = useCallback(async () => {
    setError(null);

    if (!isWebBluetoothAvailable()) {
      setError('Web Bluetooth API is not available in your browser');
      return;
    }

    try {
      setIsScanning(true);
      
      // For demo purposes, simulate finding devices
      // In a real app, this would use the Web Bluetooth API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockDevices: BluetoothDevice[] = [
        { id: '1', name: 'John\'s iPhone', connected: false },
        { id: '2', name: 'Sarah\'s Android', connected: false },
        { id: '3', name: 'Pay-off Terminal', connected: false },
        { id: '4', name: 'Alex\'s Device', connected: false },
      ];
      
      setDevices(mockDevices);
    } catch (err) {
      setError('Failed to scan for devices. Please try again.');
      console.error('Bluetooth scan error:', err);
    } finally {
      setIsScanning(false);
    }
  }, []);

  // Connect to a specific Bluetooth device
  const connectToDevice = useCallback(async (deviceId: string) => {
    setError(null);
    
    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const device = devices.find(d => d.id === deviceId);
      
      if (!device) {
        throw new Error('Device not found');
      }
      
      const connectedDeviceData = { ...device, connected: true };
      setConnectedDevice(connectedDeviceData);
      
      // Update devices list
      setDevices(devices.map(d => 
        d.id === deviceId ? connectedDeviceData : d
      ));
      
    } catch (err) {
      setError('Failed to connect to device. Please try again.');
      console.error('Bluetooth connection error:', err);
    }
  }, [devices]);

  // Disconnect from currently connected device
  const disconnectDevice = useCallback(() => {
    if (connectedDevice) {
      // Update devices list
      setDevices(devices.map(d => 
        d.id === connectedDevice.id ? { ...d, connected: false } : d
      ));
      
      setConnectedDevice(null);
    }
  }, [connectedDevice, devices]);

  // Send payment to connected device
  const sendPayment = useCallback(async (amount: number, recipientId: string, note?: string) => {
    if (!connectedDevice || !user) {
      setError('No connected device or user not logged in');
      return false;
    }

    if (user.balance < amount) {
      setError('Insufficient balance');
      return false;
    }

    try {
      // Simulate payment process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user balance
      updateBalance(-amount);
      
      // Add transaction to history
      addTransaction({
        amount,
        type: 'send',
        recipient: connectedDevice.name,
        recipientId,
        status: 'completed',
        note,
      });
      
      return true;
    } catch (err) {
      setError('Payment failed. Please try again.');
      console.error('Payment error:', err);
      return false;
    }
  }, [connectedDevice, user, addTransaction, updateBalance]);

  // Receive payment from another device
  const receivePayment = useCallback(async (paymentRequest: PaymentRequest) => {
    if (!user) {
      setError('User not logged in');
      return false;
    }

    try {
      // Simulate receiving payment
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update user balance
      updateBalance(paymentRequest.amount);
      
      // Add transaction to history
      addTransaction({
        amount: paymentRequest.amount,
        type: 'receive',
        recipient: paymentRequest.from,
        recipientId: paymentRequest.from,
        status: 'completed',
        note: paymentRequest.note,
      });
      
      return true;
    } catch (err) {
      setError('Failed to process incoming payment');
      console.error('Payment receive error:', err);
      return false;
    }
  }, [user, addTransaction, updateBalance]);

  return (
    <BluetoothContext.Provider
      value={{
        devices,
        connectedDevice,
        isScanning,
        scanForDevices,
        connectToDevice,
        disconnectDevice,
        sendPayment,
        receivePayment,
        error,
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};

export const useBluetooth = (): BluetoothContextType => {
  const context = useContext(BluetoothContext);
  
  if (context === undefined) {
    throw new Error('useBluetooth must be used within a BluetoothProvider');
  }
  
  return context;
};