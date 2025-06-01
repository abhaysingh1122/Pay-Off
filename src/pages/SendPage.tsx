import React from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import PaymentForm from '../components/payment/PaymentForm';
import { useBluetooth } from '../contexts/BluetoothContext';
import { useNavigate } from 'react-router-dom';
import { Send, Bluetooth } from 'lucide-react';

const SendPage: React.FC = () => {
  const { connectedDevice } = useBluetooth();
  const navigate = useNavigate();
  
  const handlePaymentSuccess = () => {
    // Show success message or redirect
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  return (
    <Layout requireAuth>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400 mb-4">
            <Send size={32} />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Send Payment</h1>
          {connectedDevice ? (
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              Send money to <span className="font-medium">{connectedDevice.name}</span>
            </p>
          ) : (
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              No device connected. Please connect to a device first.
            </p>
          )}
        </div>
        
        {!connectedDevice ? (
          <Card className="text-center py-8">
            <Bluetooth size={48} className="mx-auto text-neutral-400 dark:text-neutral-600" />
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              You need to connect to a device before sending a payment.
            </p>
            <button
              onClick={() => navigate('/scan')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800"
            >
              Scan for Devices
            </button>
          </Card>
        ) : (
          <Card>
            <PaymentForm onSuccess={handlePaymentSuccess} />
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default SendPage;