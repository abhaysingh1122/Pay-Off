import React, { useState } from 'react';
import { useBluetooth } from '../../contexts/BluetoothContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Send, DollarSign } from 'lucide-react';

interface PaymentFormProps {
  onSuccess?: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSuccess }) => {
  const { connectedDevice, sendPayment, error } = useBluetooth();
  const [amount, setAmount] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!connectedDevice) {
      setFormError('No device connected. Please connect to a device first.');
      return;
    }

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      setFormError('Please enter a valid amount greater than 0.');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await sendPayment(amountNumber, connectedDevice.id, note || undefined);
      
      if (success) {
        setAmount('');
        setNote('');
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setFormError('Payment failed. Please try again.');
      }
    } catch (err) {
      setFormError('An unexpected error occurred');
      console.error('Payment submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="amount"
        type="number"
        label="Amount"
        placeholder="0.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="0.01"
        step="0.01"
        required
        icon={<DollarSign size={16} className="text-neutral-500 dark:text-neutral-400" />}
        error={formError || (error ? error : undefined)}
      />

      <Input
        id="note"
        label="Note (Optional)"
        placeholder="What's this payment for?"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <Button
        type="submit"
        fullWidth
        isLoading={isSubmitting}
        disabled={!connectedDevice}
        icon={<Send size={16} />}
      >
        Send Payment
      </Button>
    </form>
  );
};

export default PaymentForm;