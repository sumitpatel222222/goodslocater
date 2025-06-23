import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ShoppingBag } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userType, setUserType] = useState<'customer' | 'shopkeeper'>('customer');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password, userType); // Pass userType!
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (user.userType === 'shopkeeper') {
        navigate('/inventory');
      } else if (user.userType === 'customer') {
        navigate('/');
      }
      // If login fails, error is set and no navigation happens
    } catch (err) {
      // Do nothing here, error will be shown by your AuthContext
    }
  };

  // Note for demo purposes
  const demoCredentials = {
    customer: { email: 'jane@example.com', password: '123456' },
    shopkeeper: { email: 'john@example.com', password: '123456' }
  };

  const fillDemoCredentials = () => {
    if (userType === 'customer') {
      setEmail(demoCredentials.customer.email);
      setPassword(demoCredentials.customer.password);
    } else {
      setEmail(demoCredentials.shopkeeper.email);
      setPassword(demoCredentials.shopkeeper.password);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto py-12 px-4 bg-white dark:bg-gray-900 transition-colors rounded-lg">
        <Card>
          <CardHeader>
            <div className="text-center">
              <ShoppingBag className="h-12 w-12 text-indigo-600 mx-auto" />
              <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome Back</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Sign in to your account to continue
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={userType === 'customer' ? 'primary' : 'outline'}
                  onClick={() => setUserType('customer')}
                  className="w-full"
                  leftIcon={<User className="h-4 w-4" />}
                >
                  Customer
                </Button>
                <Button
                  type="button"
                  variant={userType === 'shopkeeper' ? 'primary' : 'outline'}
                  onClick={() => setUserType('shopkeeper')}
                  className="w-full"
                  leftIcon={<ShoppingBag className="h-4 w-4" />}
                >
                  Shopkeeper
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                leftIcon={<Mail className="h-5 w-5" />}
              />
              
              <Input
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                leftIcon={<Lock className="h-5 w-5" />}
              />
              
              {error && (
                <div className="text-red-600 text-sm rounded p-2 bg-red-50 mt-2">
                  {error}
                </div>
              )}
              
              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="mt-6">
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Sign up</Link>
              </p>
            </div>

            {/* Demo note */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center text-sm text-gray-500">
                <p>For demo purposes, use:</p>
                <div className="mt-2 p-2 bg-gray-50 rounded text-left text-xs">
                  <p><strong>Customer:</strong> {demoCredentials.customer.email} / {demoCredentials.customer.password}</p>
                  <p><strong>Shopkeeper:</strong> {demoCredentials.shopkeeper.email} / {demoCredentials.shopkeeper.password}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={fillDemoCredentials}
                >
                  Fill Demo Credentials
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

// Removed duplicate login function that references undefined setIsLoading and setError.
// The login logic should be handled by the useAuth context or inside a React component where state setters are defined.

export default LoginPage;