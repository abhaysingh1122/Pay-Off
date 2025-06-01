import React from 'react';
import { BluetoothDevice } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Bluetooth, Check } from 'lucide-react';

interface DeviceListProps {
  devices: BluetoothDevice[];
  connectedDevice: BluetoothDevice | null;
  onConnect: (deviceId: string) => void;
  onDisconnect: () => void;
}

const DeviceList: React.FC<DeviceListProps> = ({
  devices,
  connectedDevice,
  onConnect,
  onDisconnect,
}) => {
  if (devices.length === 0) {
    return (
      <div className="text-center py-8">
        <Bluetooth size={48} className="mx-auto text-neutral-400 dark:text-neutral-600" />
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">No devices found. Try scanning again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {devices.map((device) => (
        <Card 
          key={device.id} 
          hoverable 
          className={`transition duration-150 ${
            device.connected ? 'border-2 border-primary-500 dark:border-primary-400' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${device.connected ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'}`}>
                <Bluetooth size={20} />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-white">{device.name}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {device.connected ? 'Connected' : 'Available'}
                </p>
              </div>
            </div>
            
            {device.connected ? (
              <Button
                variant="outline"
                size="sm"
                onClick={onDisconnect}
                icon={<Check size={16} />}
              >
                Connected
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => onConnect(device.id)}
                disabled={!!connectedDevice && connectedDevice.id !== device.id}
              >
                Connect
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DeviceList;