export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  avatar?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'send' | 'receive';
  timestamp: number;
  recipient: string;
  recipientId: string;
  status: 'completed' | 'pending' | 'failed';
  note?: string;
}

export interface BluetoothDevice {
  id: string;
  name: string;
  connected: boolean;
}

export interface PaymentRequest {
  id: string;
  amount: number;
  from: string;
  to: string;
  note?: string;
  timestamp: number;
}

export type ThemeMode = 'light' | 'dark';