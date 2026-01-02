import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, Session, AuthError, Provider } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  provider?: string;
  email_verified?: boolean;
  created_at: string;
  updated_at?: string;
  is_new_user?: boolean; // Track if this is a new or existing customer
}

interface UserAuthContextType {
  user: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isNewUser: boolean;
  sessionExpiresAt: Date | null;
  register: (email: string, password: string, fullName: string, phone?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithOAuth: (provider: Provider) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  refreshUser: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

// Session storage keys
const SESSION_STORAGE_KEY = 'dexlanka_session';
const SESSION_EXPIRY_KEY = 'dexlanka_session_expiry';
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
};

export const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [sessionExpiresAt, setSessionExpiresAt] = useState<Date | null>(null);
  const sessionCheckInterval = useRef<NodeJS.Timeout | null>(null);
  const loadingTimeout = useRef<NodeJS.Timeout | null>(null);

  // Check if session is expired
  const isSessionExpired = useCallback(() => {
    const expiryStr = localStorage.getItem(SESSION_EXPIRY_KEY);
    if (!expiryStr) return true;
    
    const expiryDate = new Date(expiryStr);
    return new Date() > expiryDate;
  }, []);

  // Store session with 30-day expiry
  const storeSession = useCallback((session: Session) => {
    const expiryDate = new Date(Date.now() + SESSION_DURATION);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    localStorage.setItem(SESSION_EXPIRY_KEY, expiryDate.toISOString());
    setSessionExpiresAt(expiryDate);
    console.log('✅ Session stored. Expires at:', expiryDate.toLocaleString());
  }, []);

  // Clear session storage
  const clearSession = useCallback(() => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.removeItem(SESSION_EXPIRY_KEY);
    setSessionExpiresAt(null);
    console.log('🗑️ Session cleared');
  }, []);

  // Periodic session check every 5 minutes
  const startSessionCheck = useCallback(() => {
    if (sessionCheckInterval.current) {
      clearInterval(sessionCheckInterval.current);
    }

    sessionCheckInterval.current = setInterval(async () => {
      console.log('🔄 Checking session validity...');
      
      // Check if 30-day session expired
      if (isSessionExpired()) {
        console.log('⏰ Session expired after 30 days');
        await supabase.auth.signOut();
        clearSession();
        setUser(null);
        setSession(null);
        return;
      }

      // Check Supabase session
      const { data: { session: currentSession }, error } = await supabase.auth.getSession();
      
      if (error || !currentSession) {
        console.log('❌ Session invalid, logging out');
        clearSession();
        setUser(null);
        setSession(null);
      } else {
        console.log('✅ Session valid');
        // Refresh token if needed
        const { data: { session: refreshedSession } } = await supabase.auth.refreshSession();
        if (refreshedSession) {
          setSession(refreshedSession);
          storeSession(refreshedSession);
        }
      }
    }, 5 * 60 * 1000); // Check every 5 minutes
  }, [isSessionExpired, clearSession, storeSession]);

  // Stop session check
  const stopSessionCheck = useCallback(() => {
    if (sessionCheckInterval.current) {
      clearInterval(sessionCheckInterval.current);
      sessionCheckInterval.current = null;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    let realtimeSubscription: any = null;

    // Set loading timeout - max 10 seconds
    loadingTimeout.current = setTimeout(() => {
      if (isMounted && isLoading) {
        console.log('⚠️ Loading timeout - forcing completion');
        setIsLoading(false);
      }
    }, 10000);

    // Initialize auth
    const initAuth = async () => {
      try {
        console.log('🚀 Initializing authentication...');

        // Check if 30-day session expired
        if (isSessionExpired()) {
          console.log('⏰ 30-day session expired, clearing...');
          clearSession();
          // Don't call signOut here - let Supabase handle it naturally
          setIsLoading(false);
          return;
        }

        // Get current session
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.warn('⚠️ Error getting session:', error.message);
          clearSession();
          setIsLoading(false);
          return;
        }

        if (currentSession?.user) {
          console.log('✅ Active session found');
          setSession(currentSession);
          storeSession(currentSession);
          // Load profile in background - don't await
          loadUserProfile(currentSession.user).catch(err => {
            console.warn('⚠️ Profile load error (non-blocking):', err);
          });
          startSessionCheck();

          // Set up real-time subscription for user profile updates
          try {
            realtimeSubscription = supabase
              .channel('user-profile-changes')
              .on(
                'postgres_changes',
                {
                  event: '*', // Listen to all changes (INSERT, UPDATE, DELETE)
                  schema: 'public',
                  table: 'users',
                  filter: `id=eq.${currentSession.user.id}`,
                },
                (payload) => {
                  console.log('🔄 Real-time profile update received:', payload.eventType);
                  if (payload.eventType === 'UPDATE' && payload.new) {
                    // Update user state immediately when database changes
                    setUser(prev => prev ? {
                      ...prev,
                      ...payload.new,
                      updated_at: payload.new.updated_at || prev.updated_at,
                    } : null);
                    console.log('✅ Profile updated in real-time from database');
                  }
                }
              )
              .subscribe();

            console.log('👂 Real-time subscription active for profile updates');
          } catch (realtimeError) {
            console.log('ℹ️ Real-time subscription not available (database may not support it)');
          }
        } else {
          console.log('ℹ️ No active session');
          clearSession();
        }
      } catch (error) {
        console.error('❌ Auth initialization error:', error);
        clearSession();
      } finally {
        if (isMounted) {
          setIsLoading(false);
          if (loadingTimeout.current) {
            clearTimeout(loadingTimeout.current);
          }
        }
      }
    };

    initAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('🔔 Auth state changed:', event);
      
      if (!isMounted) return;

      if (event === 'SIGNED_IN' && currentSession) {
        console.log('✅ User signed in successfully');
        setSession(currentSession);
        storeSession(currentSession);
        // Load profile in background - don't block
        loadUserProfile(currentSession.user).catch(err => {
          console.warn('⚠️ Profile load error (non-blocking):', err);
        });
        startSessionCheck();
        setIsLoading(false);

        // Set up real-time subscription when user signs in
        try {
          if (realtimeSubscription) {
            await supabase.removeChannel(realtimeSubscription);
          }
          realtimeSubscription = supabase
            .channel('user-profile-changes')
            .on(
              'postgres_changes',
              {
                event: '*',
                schema: 'public',
                table: 'users',
                filter: `id=eq.${currentSession.user.id}`,
              },
              (payload) => {
                console.log('🔄 Real-time profile update:', payload.eventType);
                if (payload.eventType === 'UPDATE' && payload.new) {
                  setUser(prev => prev ? {
                    ...prev,
                    ...payload.new,
                    updated_at: payload.new.updated_at || prev.updated_at,
                  } : null);
                  console.log('✅ Profile updated in real-time');
                }
              }
            )
            .subscribe();
        } catch (realtimeError) {
          console.log('ℹ️ Real-time subscription not available');
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('👋 User signed out');
        setUser(null);
        setSession(null);
        clearSession();
        stopSessionCheck();
        setIsLoading(false);
        // Remove real-time subscription on logout
        if (realtimeSubscription) {
          await supabase.removeChannel(realtimeSubscription);
          realtimeSubscription = null;
        }
      } else if (event === 'TOKEN_REFRESHED' && currentSession) {
        console.log('🔄 Token refreshed');
        setSession(currentSession);
        storeSession(currentSession);
        setIsLoading(false);
      } else if (event === 'INITIAL_SESSION') {
        // Initial session check - don't set loading to false here, let initAuth handle it
        console.log('ℹ️ Initial session check');
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
      stopSessionCheck();
      if (realtimeSubscription) {
        supabase.removeChannel(realtimeSubscription);
      }
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current);
      }
    };
  }, [isSessionExpired, clearSession, storeSession, startSessionCheck, stopSessionCheck]);

  const loadUserProfile = async (authUser: User) => {
    // IMMEDIATELY set user from auth data - don't wait for database
    const userData: UserProfile = {
      id: authUser.id,
      email: authUser.email!,
      full_name: authUser.user_metadata?.full_name || 
                 authUser.user_metadata?.name || 
                 authUser.email?.split('@')[0] || 
                 'User',
      avatar_url: authUser.user_metadata?.avatar_url || 
                 authUser.user_metadata?.picture || 
                 undefined,
      phone: authUser.user_metadata?.phone || undefined,
      provider: authUser.app_metadata?.provider || 'email',
      email_verified: authUser.email_confirmed_at != null,
      created_at: authUser.created_at,
      is_new_user: true, // Default to new, will update if found in DB
    };

    // Set user immediately - user is logged in NOW
    setUser(userData);
    console.log('✅ User logged in and profile set from auth data');

    // Now try database operations in background (non-blocking)
    try {
      console.log('👤 Checking database for profile...');

      // Try to check database (optional - don't block if it fails)
      const { data: existingProfile, error: fetchError } = await supabase
        .from('users')
        .select('id, email, full_name')
        .eq('id', authUser.id)
        .maybeSingle();

      if (!fetchError && existingProfile) {
        // Profile exists in database - EXISTING CUSTOMER
        console.log('👋 EXISTING CUSTOMER - profile found in database');
        setIsNewUser(false);
        // Update user with database data if available
        setUser(prev => prev ? {
          ...prev,
          full_name: existingProfile.full_name || prev.full_name,
          email: existingProfile.email || prev.email,
          is_new_user: false,
        } : prev);
      } else {
        // Profile doesn't exist - NEW CUSTOMER
        console.log('🆕 NEW CUSTOMER - no profile in database');
        setIsNewUser(true);
        
        // Try to create profile in database (optional - don't block if it fails)
        try {
          const minimalProfile = {
            id: authUser.id,
            email: authUser.email!,
            full_name: userData.full_name,
          };
          
          const { error: insertError } = await supabase
            .from('users')
            .insert(minimalProfile);
          
          if (!insertError) {
            console.log('✅ Profile saved to database');
          } else {
            console.log('ℹ️ Profile not saved to database:', insertError.message);
          }
        } catch (dbError: any) {
          // Database insert failed - that's OK, we'll use auth data
          console.log('ℹ️ Profile not saved to database (table may not exist) - using auth data');
        }
      }
    } catch (dbError: any) {
      // Database query failed - that's OK, we'll use auth data
      console.log('ℹ️ Could not check database - using auth data only');
      setIsNewUser(true); // Assume new if we can't check
    }
  };

  const register = async (email: string, password: string, fullName: string, phone?: string) => {
    setIsLoading(true);
    try {
      console.log('📝 Registering new user:', email);
      
      // Register with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone || null,
          },
          emailRedirectTo: `${window.location.origin}/verify-email`,
        },
      });

      if (error) throw error;

      if (data.session) {
        console.log('✅ Registration successful - NEW CUSTOMER');
        storeSession(data.session);
        startSessionCheck();
        setIsNewUser(true);
      }

      if (data.user) {
        await loadUserProfile(data.user);
        console.log('✅ User profile created');
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      clearSession();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('🔐 Logging in:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        console.log('✅ Login successful - session stored for 30 days');
        storeSession(data.session);
        startSessionCheck();
      }

      if (data.user) {
        await loadUserProfile(data.user);
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      clearSession();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithOAuth = async (provider: Provider) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error('OAuth login error:', error);
      setIsLoading(false);
      throw error;
    }
    // Note: isLoading will be set to false by onAuthStateChange
  };

  const logout = async () => {
    try {
      console.log('👋 Logging out...');
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setIsNewUser(false);
      clearSession();
      stopSessionCheck();
      console.log('✅ Logged out successfully');
    } catch (error) {
      console.error('❌ Logout error:', error);
      // Force clear even if error
      setUser(null);
      setSession(null);
      clearSession();
      stopSessionCheck();
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    // OPTIMISTIC UPDATE - Update UI immediately before API call
    const previousUser = user;
    setUser(prev => prev ? { ...prev, ...updates, updated_at: new Date().toISOString() } : null);
    console.log('🔄 Profile updated in UI (real-time)');

    try {
      // Try to update database
      const updateData: any = { ...updates };
      
      // Only add updated_at if the column exists
      try {
        updateData.updated_at = new Date().toISOString();
      } catch (e) {
        // Ignore if column doesn't exist
      }

      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', user.id);

      if (error) {
        console.warn('⚠️ Could not update database profile:', error.message);
        console.log('ℹ️ Profile changes saved to auth metadata instead');
        
        // Fallback: Update auth metadata
        const { error: authError } = await supabase.auth.updateUser({
          data: updates
        });
        
        if (authError) {
          // Rollback on error
          setUser(previousUser);
          throw new Error(`Update failed: ${authError.message}`);
        }
      } else {
        console.log('✅ Profile updated in database');
      }

      // Update is already reflected in UI (optimistic update)
      // No need to refresh - changes are already visible!
      
    } catch (error) {
      // Rollback on error
      setUser(previousUser);
      throw new Error(`Update failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const refreshUser = async () => {
    if (!session?.user) return;

    try {
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (!error && userData) {
        setUser({
          id: userData.id,
          email: userData.email,
          full_name: userData.full_name,
          phone: userData.phone || undefined,
          avatar_url: userData.avatar_url || undefined,
          provider: userData.provider || 'email',
          email_verified: userData.email_verified ?? session.user.email_confirmed_at != null,
          created_at: userData.created_at || session.user.created_at,
          updated_at: userData.updated_at,
        });
      } else {
        // Fallback to auth data if database query fails
        console.log('ℹ️ Using auth data for refresh');
        await loadUserProfile(session.user);
      }
    } catch (error) {
      console.log('ℹ️ Could not refresh from database, using auth data');
      await loadUserProfile(session.user);
    }
  };

  const sendVerificationEmail = async () => {
    if (!session?.user?.email) {
      throw new Error('No email address found');
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: session.user.email,
      options: {
        emailRedirectTo: `${window.location.origin}/verify-email`,
      },
    });

    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: !!session && !isSessionExpired(),
        isLoading,
        isNewUser,
        sessionExpiresAt,
        register,
        login,
        loginWithOAuth,
        logout,
        updateProfile,
        refreshUser,
        sendVerificationEmail,
        resetPassword,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};
