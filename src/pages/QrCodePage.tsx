import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useUser } from '../contexts/UserContext';
import { QrCode, Copy, Check, DollarSign } from 'lucide-react';

const QrCodePage: React.FC = () => {
  const { user } = useUser();
  const [amount, setAmount] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [copied, setCopied] = useState(false);
  
  const generatePaymentData = () => {
    if (!user) return '';
    
    const paymentData = {
      type: 'payment_request',
      from: user.id,
      name: user.name,
      amount: amount ? parseFloat(amount) : undefined,
      note: note || undefined,
      timestamp: Date.now(),
    };
    
    return JSON.stringify(paymentData);
  };
  
  const paymentData = generatePaymentData();
  const paymentUrl = `payoff://${encodeURIComponent(paymentData)}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(paymentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Layout requireAuth>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400 mb-4">
            <QrCode size={32} />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Receive Payment</h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Generate a QR code to receive payments from others
          </p>
        </div>
        
        <Card className="mb-6">
          <div className="space-y-4">
            <Input
              id="amount"
              type="number"
              label="Amount (Optional)"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0.01"
              step="0.01"
              icon={<DollarSign size={16} className="text-neutral-500 dark:text-neutral-400" />}
            />
            
            <Input
              id="note"
              label="Note (Optional)"
              placeholder="What's this payment for?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </Card>
        
        <Card className="flex flex-col items-center p-8">
          <div className="p-4 bg-white rounded-2xl mb-6">
            <QRCodeSVG
              value={paymentUrl}
              size={220}
              bgColor="#FFFFFF"
              fgColor="#000000"
              level="L"
              includeMargin={false}
            />
          </div>
          
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400 text-center">
            Scan this QR code with Pay-off app to send money{amount ? ` ($${parseFloat(amount).toFixed(2)})` : ''}
          </p>
          
          <Button
            variant="outline"
            onClick={handleCopy}
            icon={copied ? <Check size={16} /> : <Copy size={16} />}
          >
            {copied ? 'Copied' : 'Copy Payment Link'}
          </Button>
        </Card>
      </div>
    </Layout>
  );
};

export default QrCodePage;