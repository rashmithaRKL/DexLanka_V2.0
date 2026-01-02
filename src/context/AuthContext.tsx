import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, AdminUser, AdminSession } from '@/lib/supabase';

interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Test Supabase connection
    testSupabaseConnection();
    // Check if user is already logged in
    checkAuth();
  }, []);

  const testSupabaseConnection = async () => {
    try {
      console.log('Testing Supabase connection...');
      const { data, error } = await supabase
        .from('admin_users')
        .select('count')
        .limit(1);
      
      if (error) {
        console.error('Supabase connection failed:', error);
      } else {
        console.log('Supabase connection successful');
      }
    } catch (err) {
      console.error('Supabase connection test failed:', err);
    }
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (token) {
        // For now, just check if token exists and is valid format
        // In production, you might want to validate against a database
        const tokenParts = atob(token).split(':');
        if (tokenParts.length === 3) {
          const [email, timestamp, random] = tokenParts;
          const tokenTime = parseInt(timestamp);
          const now = Date.now();
          const tokenAge = now - tokenTime;
          
          // Token expires after 24 hours
          if (tokenAge < 24 * 60 * 60 * 1000) {
            // Get user data from database
            const { data: userData, error: userError } = await supabase
              .from('admin_users')
              .select('id, email, full_name, role, is_active')
              .eq('email', email)
              .eq('is_active', true)
              .single();

            if (userData) {
              const user: User = {
                id: userData.id,
                email: userData.email,
                full_name: userData.full_name,
                role: userData.role
              };
              setUser(user);
            } else {
              localStorage.removeItem('admin_token');
            }
          } else {
            localStorage.removeItem('admin_token');
          }
        } else {
          localStorage.removeItem('admin_token');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('admin_token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    console.log('Attempting login for:', email);
    
    // Get admin user from database
    const { data: adminUser, error: userError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    console.log('Database query result:', { adminUser, userError });

    if (userError) {
      console.error('Database error:', userError);
      throw new Error(`Database error: ${userError.message}`);
    }

    if (!adminUser) {
      console.log('No admin user found for email:', email);
      throw new Error('Invalid credentials');
    }

    console.log('Found admin user:', { 
      id: adminUser.id, 
      email: adminUser.email, 
      is_active: adminUser.is_active
    });

    // ⚠️ CRITICAL SECURITY WARNING ⚠️
    // This implementation uses PLAIN TEXT password comparison!
    // This is EXTREMELY INSECURE and should NEVER be used in production!
    // 
    // BEFORE DEPLOYING TO PRODUCTION:
    // 1. Install bcrypt: npm install bcrypt @types/bcrypt
    // 2. Hash passwords before storing: bcrypt.hash(password, 10)
    // 3. Compare with: await bcrypt.compare(password, adminUser.password_hash)
    // 
    // For development/testing ONLY:
    if (adminUser.password_hash !== password) {
      throw new Error('Invalid credentials');
    }

    // Generate a session token
    const token = btoa(`${email}:${Date.now()}:${Math.random()}`);

    // Update last login time
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', adminUser.id);

    // Set user data and token
    const userData: User = {
      id: adminUser.id,
      email: adminUser.email,
      full_name: adminUser.full_name,
      role: adminUser.role
    };

    localStorage.setItem('admin_token', token);
    setUser(userData);
  };

  const logout = async () => {
    localStorage.removeItem('admin_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

