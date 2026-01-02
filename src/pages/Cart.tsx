import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [cartRef, cartInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      toast({
        title: 'Item removed',
        description: 'Item has been removed from your cart.',
      });
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
    toast({
      title: 'Item removed',
      description: 'Item has been removed from your cart.',
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart.',
    });
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText
              text="Shopping Cart"
              animation="slide-up"
              className="inline-block text-xl text-dexRed font-medium mb-4"
            />
            <AnimatedText
              text="Your Template Cart"
              animation="slide-up"
              delay={100}
              className="text-4xl md:text-5xl font-bold mb-6"
            />
            <AnimatedText
              text="Review your selected templates and proceed to checkout when ready."
              animation="slide-up"
              delay={200}
              className="text-gray-300 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section ref={cartRef} className="section-padding">
        <div className="container mx-auto px-6">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={cartInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              className="text-center py-20"
            >
              <ShoppingBag size={64} className="text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-gray-400 mb-6">Start adding templates to your cart to get started!</p>
              <Link
                to="/templates"
                className="inline-block px-6 py-3 bg-dexRed text-white rounded-lg font-medium hover:bg-dexRed/90 transition-colors"
              >
                Browse Templates
              </Link>
            </motion.div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <Link
                  to="/templates"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft size={18} />
                  Continue Shopping
                </Link>
                <button
                  onClick={handleClearCart}
                  className="text-gray-400 hover:text-red-400 transition-colors text-sm"
                >
                  Clear Cart
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={cartInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glass rounded-2xl p-6"
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Image */}
                        <div className="flex-shrink-0">
                          <div className="w-full sm:w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden">
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
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                                <span className="text-sm text-gray-400 capitalize">{item.category}</span>
                              </div>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-gray-400 hover:text-red-400 transition-colors p-2"
                                aria-label="Remove item"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{item.description}</p>
                          </div>

                          {/* Quantity and Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-400">Quantity:</span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="w-12 text-center font-medium">{item.quantity}</span>
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-white">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                              {item.quantity > 1 && (
                                <div className="text-sm text-gray-400">
                                  ${item.price.toFixed(2)} each
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={cartInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="glass rounded-2xl p-6 sticky top-24"
                  >
                    <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-300">
                        <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                        <span>${getTotalPrice().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Processing Fee</span>
                        <span className="text-green-400">Free</span>
                      </div>
                      <div className="border-t border-gray-800 pt-4">
                        <div className="flex justify-between text-xl font-bold">
                          <span>Total</span>
                          <span className="text-dexRed">${getTotalPrice().toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      to="/checkout"
                      className="w-full block text-center px-6 py-4 bg-dexRed text-white rounded-lg font-medium hover:bg-dexRed/90 transition-colors mb-4"
                    >
                      Proceed to Checkout
                    </Link>

                    <Link
                      to="/templates"
                      className="w-full block text-center px-6 py-4 border border-gray-700 text-gray-300 rounded-lg font-medium hover:bg-white/10 transition-colors"
                    >
                      Continue Shopping
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;






