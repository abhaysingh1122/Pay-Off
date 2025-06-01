import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import DeviceList from '../components/bluetooth/DeviceList';
import { useBluetooth } from '../contexts/BluetoothContext';
import { Bluetooth, RefreshCw, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScanPage: React.FC = () => {
  const { devices, connectedDevice, isScanning, scanForDevices, connectToDevice, disconnectDevice, error } = useBluetooth();
  const [hasScanned, setHasScanned] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-scan when page loads
    if (!hasScanned && devices.length === 0) {
      handleScan();
    }
  }, [devices.length, hasScanned]);

  const handleScan = async () => {
    setHasScanned(true);
    await scanForDevices();
  };

  return (
    <Layout requireAuth>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400 mb-4">
            <Bluetooth size={32} />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Scan for Devices</h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Discover nearby Bluetooth devices to connect and make payments
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-error-100 border border-error-200 rounded-lg text-error-800 dark:bg-error-900/50 dark:border-error-800 dark:text-error-400">
            {error}
          </div>
        )}

        <div className="flex justify-center mb-6">
          <Button
            onClick={handleScan}
            isLoading={isScanning}
            icon={<RefreshCw size={18} className={isScanning ? 'animate-spin' : ''} />}
          >
            {isScanning ? 'Scanning...' : hasScanned ? 'Scan Again' : 'Scan for Devices'}
          </Button>
        </div>

        <DeviceList
          devices={devices}
          connectedDevice={connectedDevice}
          onConnect={connectToDevice}
          onDisconnect={disconnectDevice}
        />

        {connectedDevice && (
          <div className="mt-8 flex justify-center">
            <Button
              variant="primary"
              icon={<Send size={18} />}
              onClick={() => navigate('/send')}
            >
              Send Payment to {connectedDevice.name}
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ScanPage;