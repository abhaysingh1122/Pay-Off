import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import TransactionCard from '../components/payment/TransactionCard';
import Input from '../components/ui/Input';
import { useUser } from '../contexts/UserContext';
import { Clock, Search, FilterX } from 'lucide-react';

const HistoryPage: React.FC = () => {
  const { transactions } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTransactions = transactions.filter(transaction => 
    transaction.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (transaction.note && transaction.note.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <Layout requireAuth>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400 mb-4">
            <Clock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Payment History</h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            View all your transactions
          </p>
        </div>
        
        <div className="mb-6">
          <Input
            placeholder="Search by name or note..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={18} className="text-neutral-500 dark:text-neutral-400" />}
          />
        </div>
        
        {filteredTransactions.length > 0 ? (
          <div>
            {filteredTransactions.map((transaction) => (
              <TransactionCard 
                key={transaction.id} 
                transaction={transaction} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FilterX size={48} className="mx-auto text-neutral-400 dark:text-neutral-600" />
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              {transactions.length > 0
                ? 'No transactions match your search.'
                : 'No transactions yet. Start sending or receiving payments!'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HistoryPage;