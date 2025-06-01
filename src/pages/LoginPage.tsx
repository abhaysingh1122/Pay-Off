import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useUser } from '../contexts/UserContext';
import { LogIn, Mail, User } from 'lucide-react';

interface LocationState {
  from?: Location;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState)?.from?.pathname || '/';
  
  if (isAuthenticated) {
    navigate(from, { replace: true });
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      try {
        login(email, name);
        navigate(from, { replace: true });
      } catch (err) {
        setError('Login failed. Please try again.');
        console.error('Login error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400 mb-4">
            <LogIn size={32} />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Welcome to Pay-off</h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Login to access your account
          </p>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={16} className="text-neutral-500 dark:text-neutral-400" />}
              error={error}
              required
            />
            
            <Input
              id="name"
              label="Your Name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User size={16} className="text-neutral-500 dark:text-neutral-400" />}
              required
            />
            
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
            >
              Login / Sign Up
            </Button>
            
            <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
              For demo purposes, no password is required.
              <br />
              Just enter any email and name to continue.
            </p>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;