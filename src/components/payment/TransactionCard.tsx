import React from 'react';
import { Transaction } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const { amount, type, recipient, timestamp, status, note } = transaction;
  
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  const isPositive = type === 'receive';
  
  return (
    <Card className="mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-full ${isPositive ? 'bg-success-100 text-success-600 dark:bg-success-900 dark:text-success-400' : 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'}`}>
            {isPositive ? (
              <ArrowDownLeft size={20} />
            ) : (
              <ArrowUpRight size={20} />
            )}
          </div>
          
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-white">
              {isPositive ? 'Received from' : 'Sent to'} {recipient}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {formattedDate} at {formattedTime}
            </p>
            {note && (
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                Note: {note}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <p className={`font-semibold ${isPositive ? 'text-success-600 dark:text-success-400' : 'text-neutral-900 dark:text-white'}`}>
            {isPositive ? '+' : '-'}${amount.toFixed(2)}
          </p>
          <Badge 
            variant={status === 'completed' ? 'success' : status === 'pending' ? 'warning' : 'error'}
            size="sm"
            className="mt-1"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default TransactionCard;