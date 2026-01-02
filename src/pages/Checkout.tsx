import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CreditCard, Lock, Mail, User, Phone, MapPin, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { createPayHerePayment, submitPayHerePayment, createTwoCheckoutPayment, submitTwoCheckoutPayment, type CheckoutItem } from '@/lib/payments';
import { createTemplatePurchase, getTemplate } from '@/lib/api';
import { downloadTemplate } from '@/lib/clientDownload';
import { useUserAuth } from '@/context/UserAuthContext';
import { DownloadProgress } from '@/components/DownloadProgress';

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { items, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const { user } = useUserAuth();

  // Calculate if this is a free order
  const cartTotal = getTotalPrice();
  const isFreeOrder = cartTotal === 0;

  // Download progress state
  const [downloadProgress, setDownloadProgress] = useState({
    isOpen: false,
    progress: 0,
    currentFile: '',
    totalFiles: 0,
    completedFiles: 0,
    status: 'downloading' as 'downloading' | 'success' | 'error',
    errorMessage: '',
  });
  const [checkoutRef, checkoutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Check for payment success/cancel from payment gateway redirect
  React.useEffect(() => {
    const orderId = searchParams.get('order_id');
    const canceled = searchParams.get('canceled');
    const gateway = searchParams.get('gateway');

    if (orderId) {
      setOrderComplete(true);
      clearCart();
      const gatewayName = gateway === '2checkout' ? '2Checkout' : 'PayHere';
      toast({
        title: 'Payment Successful',
        description: `Your payment has been processed successfully via ${gatewayName}.`,
        variant: 'default',
      });
    } else if (canceled === 'true') {
      toast({
        title: 'Payment Cancelled',
        description: 'Your payment was cancelled. You can try again.',
        variant: 'destructive',
      });
    }
  }, [searchParams, clearCart, toast]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Sri Lanka',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'payhere' | '2checkout'>('payhere');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate unique order ID
  const generateOrderId = (): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    return `DXL-${timestamp}-${random}`.toUpperCase();
  };

  // Handle free order (no payment required)
  const handleFreeOrder = async () => {
    if (!formData.email || !formData.firstName || !formData.lastName) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    try {
      const orderId = generateOrderId();
      const purchaseIds: string[] = [];

      // Create purchase records for each item
      for (const item of items) {
        const purchase = await createTemplatePurchase({
          template_id: item.id,
          customer_email: formData.email,
          customer_name: `${formData.firstName} ${formData.lastName}`,
          price_paid: 0,
          currency: 'USD',
          status: 'completed',
        });
        purchaseIds.push(String(purchase.id));
      }

      // Auto-download templates
      setDownloadProgress({
        isOpen: true,
        progress: 0,
        currentFile: '',
        totalFiles: items.length,
        completedFiles: 0,
        status: 'downloading',
        errorMessage: '',
      });

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const purchaseId = parseInt(purchaseIds[i]);

        // Default to true if download_enabled is not set
        const shouldDownload = item.download_enabled !== false;

        if (shouldDownload) {
          try {
            console.log(`Attempting to download template: ${item.title} (ID: ${item.id}, Purchase ID: ${purchaseId})`);

            // Update current file
            setDownloadProgress(prev => ({
              ...prev,
              currentFile: item.title,
              progress: Math.round((i / items.length) * 100),
            }));

            // Fetch full template data to get storage type
            const templateData = await getTemplate(item.id);

            if (!templateData) {
              throw new Error('Template not found');
            }

            // Use new download function that supports both storage types
            await downloadTemplate(
              templateData,
              (fileProgress) => {
                // Update progress within current file
                const baseProgress = (i / items.length) * 100;
                const fileContribution = (fileProgress / 100) * (100 / items.length);
                setDownloadProgress(prev => ({
                  ...prev,
                  progress: Math.round(baseProgress + fileContribution),
                }));
              }
            );

            // Update completed count
            setDownloadProgress(prev => ({
              ...prev,
              completedFiles: i + 1,
              progress: Math.round(((i + 1) / items.length) * 100),
            }));

            // Small delay between downloads to avoid browser blocking
            if (i < items.length - 1) {
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          } catch (error) {
            console.error(`Failed to download ${item.title}:`, error);
            setDownloadProgress(prev => ({
              ...prev,
              status: 'error',
              errorMessage: error instanceof Error ? error.message : 'Failed to download template',
            }));

            // Wait a bit to show error, then continue
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
      }

      // Show success
      setDownloadProgress(prev => ({
        ...prev,
        status: 'success',
        progress: 100,
      }));

      // Wait to show success message
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Close progress dialog
      setDownloadProgress(prev => ({ ...prev, isOpen: false }));

      // Clear cart and show success
      clearCart();
      setOrderComplete(true);
    } catch (error) {
      console.error('Free order error:', error);
      toast({
        title: 'Error',
        description: 'Failed to process free order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.firstName || !formData.lastName) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare line items
      const lineItems: CheckoutItem[] = items.map((i) => ({
        id: i.id,
        title: i.title,
        price: i.price,
        quantity: i.quantity,
      }));

      const orderId = generateOrderId();

      if (paymentMethod === 'payhere') {
        // PayHere Payment (Primary Gateway)
        const paymentData = createPayHerePayment(
          lineItems,
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            country: formData.country,
          },
          orderId
        );
        submitPayHerePayment(paymentData);
      } else if (paymentMethod === '2checkout') {
        // 2Checkout Payment (Secondary Gateway)
        const paymentData = createTwoCheckoutPayment(
          lineItems,
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.zipCode, // Using zipCode as state for 2Checkout
            zipCode: formData.zipCode,
            country: formData.country,
          },
          orderId
        );
        submitTwoCheckoutPayment(paymentData);
      }
    } catch (err: any) {
      console.error(err);
      toast({
        title: 'Payment Error',
        description: err?.message || 'Unable to start payment checkout. Please try again.',
        variant: 'destructive',
      });
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <Navbar />
        <section className="pt-36 pb-20 bg-darkBlue">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-300 mb-6">Please add items to your cart before checkout.</p>
            <button
              onClick={() => navigate('/templates')}
              className="px-6 py-3 bg-dexRed text-white rounded-lg font-medium hover:bg-dexRed/90 transition-colors"
            >
              Browse Templates
            </button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <Navbar />
        <section className="pt-36 pb-20 min-h-[60vh] flex items-center">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto"
            >
              <div className="mb-6">
                <CheckCircle size={80} className="text-green-400 mx-auto" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
              <p className="text-gray-300 mb-6">
                Thank you for your purchase. Your order has been processed successfully.
              </p>
              <p className="text-gray-400 text-sm mb-8">
                You will receive a confirmation email with your template download links shortly.
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-dexRed text-white rounded-lg font-medium hover:bg-dexRed/90 transition-colors"
              >
                Return to Home
              </button>
            </motion.div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <DownloadProgress
        isOpen={downloadProgress.isOpen}
        progress={downloadProgress.progress}
        currentFile={downloadProgress.currentFile}
        totalFiles={downloadProgress.totalFiles}
        completedFiles={downloadProgress.completedFiles}
        status={downloadProgress.status}
        errorMessage={downloadProgress.errorMessage}
      />

      <div className="bg-background text-foreground min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-36 pb-20 bg-darkBlue">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <AnimatedText
                text="Checkout"
                animation="slide-up"
                className="inline-block text-xl text-dexRed font-medium mb-4"
              />
              <AnimatedText
                text="Complete Your Purchase"
                animation="slide-up"
                delay={100}
                className="text-4xl md:text-5xl font-bold mb-6"
              />
              <AnimatedText
                text="Enter your details below to complete your template purchase."
                animation="slide-up"
                delay={200}
                className="text-gray-300 text-lg"
              />
            </div>
          </div>
        </section>

        {/* Checkout Form */}
        <section ref={checkoutRef} className="section-padding">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Form */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={checkoutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      className="glass rounded-2xl p-6"
                    >
                      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <User size={24} className="text-dexRed" />
                        Personal Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">First Name *</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-dexRed"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Last Name *</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-dexRed"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                            <Mail size={16} />
                            Email *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-dexRed"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                            <Phone size={16} />
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-dexRed"
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Billing Address */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={checkoutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.1 }}
                      className="glass rounded-2xl p-6"
                    >
                      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <MapPin size={24} className="text-dexRed" />
                        Billing Address
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Address</label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-dexRed"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">City</label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-dexRed"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">ZIP Code</label>
                            <input
                              type="text"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-dexRed"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Country</label>
                            <input
                              type="text"
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-dexRed"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Payment Information */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={checkoutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.2 }}
                      className="glass rounded-2xl p-6 space-y-4"
                    >
                      <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                        <CreditCard size={24} className="text-dexRed" />
                        Payment Method
                      </h2>
                      <p className="text-gray-300 text-sm">
                        Choose how you want to pay for your templates.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('payhere')}
                          className={`flex flex-col items-start px-4 py-3 rounded-lg border text-left transition ${paymentMethod === 'payhere'
                            ? 'border-dexRed bg-dexRed/10'
                            : 'border-gray-700 hover:border-gray-500'
                            }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <CreditCard size={18} />
                            <span className="font-medium">PayHere (Primary)</span>
                          </div>
                          <p className="text-xs text-gray-400">
                            Pay securely with your debit or credit card via PayHere payment gateway.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('2checkout')}
                          className={`flex flex-col items-start px-4 py-3 rounded-lg border text-left transition ${paymentMethod === '2checkout'
                            ? 'border-dexRed bg-dexRed/10'
                            : 'border-gray-700 hover:border-gray-500'
                            }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <CreditCard size={18} />
                            <span className="font-medium">2Checkout (Secondary)</span>
                          </div>
                          <p className="text-xs text-gray-400">
                            Pay securely with your debit or credit card via 2Checkout payment gateway.
                          </p>
                        </button>
                      </div>

                      {paymentMethod === 'payhere' && (
                        <>
                          <p className="text-gray-300 text-sm">
                            You&apos;ll be securely redirected to PayHere to complete your purchase.
                          </p>
                          <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                            <Lock size={16} />
                            <span>Payments are securely processed by PayHere. PCI DSS compliant.</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            By proceeding, you agree to our{' '}
                            <a href="/terms-and-conditions" className="text-dexRed hover:underline" target="_blank" rel="noopener noreferrer">
                              Terms and Conditions
                            </a>
                            {' '}and PayHere&apos;s terms.
                          </p>
                        </>
                      )}

                      {paymentMethod === '2checkout' && (
                        <>
                          <p className="text-gray-300 text-sm">
                            You&apos;ll be securely redirected to 2Checkout to complete your purchase.
                          </p>
                          <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                            <Lock size={16} />
                            <span>Payments are securely processed by 2Checkout. PCI DSS compliant.</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            By proceeding, you agree to our{' '}
                            <a href="/terms-and-conditions" className="text-dexRed hover:underline" target="_blank" rel="noopener noreferrer">
                              Terms and Conditions
                            </a>
                            {' '}and 2Checkout&apos;s terms.
                          </p>
                        </>
                      )}
                    </motion.div>
                  </div>

                  {/* Right Column - Order Summary */}
                  <div className="lg:col-span-1">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={checkoutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.3 }}
                      className="glass rounded-2xl p-6 sticky top-24"
                    >
                      <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

                      <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-gray-800">
                            <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={item.image || '/placeholder.svg'}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/placeholder.svg';
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">{item.title}</h4>
                              <p className="text-gray-400 text-xs">
                                LKR {item.price.toFixed(2)} × {item.quantity}
                              </p>
                            </div>
                            <div className="text-sm font-medium">
                              LKR {(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3 mb-6 pb-6 border-b border-gray-800">
                        <div className="flex justify-between text-gray-300">
                          <span>Subtotal</span>
                          <span>LKR {getTotalPrice().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Processing Fee</span>
                          <span className="text-green-400">Free</span>
                        </div>
                      </div>

                      <div className="flex justify-between text-xl font-bold mb-6">
                        <span>Total</span>
                        <span className="text-dexRed">LKR {getTotalPrice().toFixed(2)}</span>
                      </div>

                      <button
                        type={isFreeOrder ? 'button' : 'submit'}
                        onClick={isFreeOrder ? handleFreeOrder : undefined}
                        disabled={isProcessing}
                        className="w-full px-6 py-4 bg-dexRed text-white rounded-lg font-medium hover:bg-dexRed/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing
                          ? isFreeOrder
                            ? 'Processing Free Order...'
                            : `Redirecting to ${paymentMethod === 'payhere' ? 'PayHere' : '2Checkout'}…`
                          : isFreeOrder
                            ? '🎉 Get Free Templates'
                            : paymentMethod === 'payhere'
                              ? `Pay LKR ${getTotalPrice().toFixed(2)} with PayHere`
                              : `Pay USD ${getTotalPrice().toFixed(2)} with 2Checkout`}
                      </button>
                    </motion.div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Checkout;






