import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, Eye, EyeOff, Database } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const testConnection = async () => {
    try {
      console.log('Testing Supabase connection...');
      setConnectionStatus('Testing connection...');
      
      const { data, error } = await supabase
        .from('admin_users')
        .select('count')
        .limit(1);
      
      if (error) {
        console.error('Connection failed:', error);
        setConnectionStatus(`❌ Connection failed: ${error.message}`);
      } else {
        console.log('Connection successful:', data);
        setConnectionStatus('✅ Connection successful!');
      }
    } catch (err) {
      console.error('Connection test error:', err);
      setConnectionStatus(`❌ Connection error: ${err}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Login attempt started...');
      await login(email, password);
      console.log('Login successful, navigating to admin...');
      navigate('/admin');
    } catch (err) {
      console.error('Login failed:', err);
      setError(`Login failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-darkBg via-darkBlue to-darkBg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="glass border-white/10">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-dexRed/20 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-dexRed" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">
              <span className="dex-span">Dex</span>
              <span className="lanka-span">Lanka</span>
            </CardTitle>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-500/50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Admin Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 focus:border-dexRed"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-white/5 border-white/10 focus:border-dexRed"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-dexRed hover:bg-dexRed/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>

              <div className="mt-4 space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={testConnection}
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  <Database className="w-4 h-4 mr-2" />
                  Test Database Connection
                </Button>
                {connectionStatus && (
                  <div className="text-sm text-center text-gray-300">
                    {connectionStatus}
                  </div>
                )}
              </div>

              
            </form>
          </CardContent>
        </Card>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6 text-gray-400 text-sm"
        >
          © 2024 DexLanka. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;

