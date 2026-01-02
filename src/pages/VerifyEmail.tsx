import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, RefreshCw } from 'lucide-react';
import { useUserAuth } from '@/context/UserAuthContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const VerifyEmail = () => {
  const [isResending, setIsResending] = useState(false);
  const { user, sendVerificationEmail } = useUserAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleResend = async () => {
    setIsResending(true);
    try {
      await sendVerificationEmail();
      toast({
        title: 'Verification email sent!',
        description: 'Please check your inbox and spam folder.',
      });
    } catch (error) {
      toast({
        title: 'Failed to send email',
        description: error instanceof Error ? error.message : 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsResending(false);
    }
  };

  if (user?.email_verified) {
    navigate('/profile');
    return null;
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <section className="pt-36 pb-20 min-h-screen flex items-center bg-darkBlue">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <Card className="glass border-white/10">
              <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-dexRed/20 rounded-full flex items-center justify-center">
                    <Mail className="w-10 h-10 text-dexRed" />
                  </div>
                </div>
                <CardTitle className="text-2xl mt-4">Verify Your Email</CardTitle>
                <CardDescription className="text-gray-400">
                  We've sent a verification link to your email address
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-sm text-gray-300 mb-2">
                      {user?.email || 'your email address'}
                    </p>
                    <p className="text-xs text-gray-400">
                      Click the link in the email to verify your account
                    </p>
                  </div>

                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4 text-dexRed" />
                      <span>Check your inbox</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4 text-dexRed" />
                      <span>Check your spam folder</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4 text-dexRed" />
                      <span>Click the verification link</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <Button
                    onClick={handleResend}
                    variant="outline"
                    className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white"
                    disabled={isResending}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isResending ? 'animate-spin' : ''}`} />
                    {isResending ? 'Sending...' : 'Resend Verification Email'}
                  </Button>

                  <Button
                    onClick={() => navigate('/signin')}
                    variant="ghost"
                    className="w-full text-gray-400 hover:text-white"
                  >
                    Back to Sign In
                  </Button>
                </div>

                <div className="text-center text-xs text-gray-500">
                  <p>Didn't receive the email? Check your spam folder or</p>
                  <p>contact support if the problem persists.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VerifyEmail;

