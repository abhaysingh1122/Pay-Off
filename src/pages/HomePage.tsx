import React from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import TransactionCard from '../components/payment/TransactionCard';
import { useUser } from '../contexts/UserContext';
import { useBluetooth } from '../contexts/BluetoothContext';
import { Wallet, Send, QrCode, Scan, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { user, transactions } = useUser();
  const { connectedDevice } = useBluetooth();
  const navigate = useNavigate();
  
  const recentTransactions = transactions.slice(0, 3);
  
  return (
    <Layout requireAuth>
      <div className="space-y-8">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-700 dark:to-primary-900 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
              <p className="mt-2 text-primary-100">Your secure offline payment solution</p>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center">
                  <Wallet size={24} className="text-primary-200" />
                  <span className="ml-2 text-sm font-medium">Your Balance</span>
                </div>
                <div className="mt-1 text-3xl font-bold">${user?.balance.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center" onClick={() => navigate('/scan')}>
              <div className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400 mb-3">
                  <Scan size={24} />
                </div>
                <h3 className="font-medium">Scan & Pay</h3>
              </div>
            </Card>
            
            <Card 
              className="text-center" 
              onClick={() => navigate(connectedDevice ? '/send' : '/scan')}
            >
              <div className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-secondary-100 text-secondary-600 dark:bg-secondary-900 dark:text-secondary-400 mb-3">
                  <Send size={24} />
                </div>
                <h3 className="font-medium">Send Money</h3>
              </div>
            </Card>
            
            <Card className="text-center" onClick={() => navigate('/qr-code')}>
              <div className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-accent-100 text-accent-600 dark:bg-accent-900 dark:text-accent-400 mb-3">
                  <QrCode size={24} />
                </div>
                <h3 className="font-medium">Receive Money</h3>
              </div>
            </Card>
            
            <Card className="text-center" onClick={() => navigate('/history')}>
              <div className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 mb-3">
                  <ArrowRight size={24} />
                </div>
                <h3 className="font-medium">See All</h3>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Recent transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Recent Transactions</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/history')}
            >
              View All
            </Button>
          </div>
          
          {recentTransactions.length > 0 ? (
            <div>
              {recentTransactions.map((transaction) => (
                <TransactionCard 
                  key={transaction.id} 
                  transaction={transaction} 
                />
              ))}
            </div>
          ) : (
            <Card className="text-center py-8">
              <p className="text-neutral-600 dark:text-neutral-400">No transactions yet.</p>
              <Button 
                variant="primary" 
                className="mt-4"
                onClick={() => navigate('/scan')}
              >
                Make Your First Payment
              </Button>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;