import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, Shield, CreditCard, AlertCircle, CheckCircle, Lock } from 'lucide-react';

const TermsAndConditions = () => {
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText
              text="Terms and Conditions"
              animation="slide-up"
              className="inline-block text-xl text-dexRed font-medium mb-4"
            />
            <AnimatedText
              text="Payment Gateway Terms & Company Policies"
              animation="slide-up"
              delay={100}
              className="text-4xl md:text-5xl font-bold mb-6"
            />
            <p className="text-gray-300 text-lg">
              Last Updated: {currentDate}
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section ref={contentRef} className="section-padding">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              className="prose prose-invert prose-lg max-w-none"
            >
              {/* Introduction */}
              <div className="glass rounded-2xl p-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <FileText size={32} className="text-dexRed" />
                  <h2 className="text-3xl font-bold">Introduction</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Welcome to DexLanka. These Terms and Conditions ("Terms") govern your use of our website and services, 
                  including payment processing through our payment gateways. By accessing our website or making a purchase, 
                  you agree to be bound by these Terms. Please read them carefully.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  DexLanka ("we," "us," or "our") operates as a premium IT, branding, and digital services provider 
                  in Sri Lanka. We use PayHere as our primary payment gateway and 2Checkout as our secondary payment 
                  gateway to process payments securely.
                </p>
              </div>

              {/* Payment Gateway Terms */}
              <div className="glass rounded-2xl p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard size={32} className="text-dexRed" />
                  <h2 className="text-3xl font-bold">Payment Gateway Terms</h2>
                </div>

                {/* PayHere Section */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-dexRed">1. PayHere Payment Gateway (Primary)</h3>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      <strong className="text-white">1.1 Payment Processing:</strong> PayHere is our primary payment 
                      gateway for processing transactions. All payments made through PayHere are subject to PayHere's 
                      terms and conditions, which can be found at{' '}
                      <a href="https://www.payhere.lk/terms" target="_blank" rel="noopener noreferrer" className="text-dexRed hover:underline">
                        https://www.payhere.lk/terms
                      </a>.
                    </p>
                    <p>
                      <strong className="text-white">1.2 Security:</strong> PayHere is PCI DSS Level 1 compliant and 
                      uses industry-standard encryption to protect your payment information. We do not store your 
                      complete payment card details on our servers.
                    </p>
                    <p>
                      <strong className="text-white">1.3 Accepted Payment Methods:</strong> PayHere accepts various 
                      payment methods including credit cards, debit cards, and other local payment options available 
                      in Sri Lanka.
                    </p>
                    <p>
                      <strong className="text-white">1.4 Currency:</strong> Payments through PayHere are processed in 
                      Sri Lankan Rupees (LKR) by default. Currency conversion, if applicable, will be handled by your 
                      bank or card issuer.
                    </p>
                    <p>
                      <strong className="text-white">1.5 Transaction Fees:</strong> All transaction fees are included 
                      in the displayed price. No additional fees will be charged at checkout.
                    </p>
                    <p>
                      <strong className="text-white">1.6 Payment Authorization:</strong> By completing a payment through 
                      PayHere, you authorize us to charge your payment method for the total amount of your purchase, 
                      including applicable taxes and fees.
                    </p>
                  </div>
                </div>

                {/* 2Checkout Section */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-dexRed">2. 2Checkout Payment Gateway (Secondary)</h3>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      <strong className="text-white">2.1 Payment Processing:</strong> 2Checkout (now Verifone) serves as 
                      our secondary payment gateway for international transactions. All payments made through 2Checkout 
                      are subject to 2Checkout's terms and conditions, which can be found at{' '}
                      <a href="https://www.2co.com/website-use.html" target="_blank" rel="noopener noreferrer" className="text-dexRed hover:underline">
                        https://www.2co.com/website-use.html
                      </a>.
                    </p>
                    <p>
                      <strong className="text-white">2.2 Security:</strong> 2Checkout is PCI DSS Level 1 compliant and 
                      provides secure payment processing for international customers. Your payment information is encrypted 
                      and processed securely.
                    </p>
                    <p>
                      <strong className="text-white">2.3 Accepted Payment Methods:</strong> 2Checkout accepts major 
                      credit cards, debit cards, PayPal, and other payment methods available in your region.
                    </p>
                    <p>
                      <strong className="text-white">2.4 Currency:</strong> Payments through 2Checkout are typically 
                      processed in USD (United States Dollars). Currency conversion, if applicable, will be handled by 
                      your bank or card issuer according to their exchange rates.
                    </p>
                    <p>
                      <strong className="text-white">2.5 Transaction Fees:</strong> All transaction fees are included 
                      in the displayed price. No additional fees will be charged at checkout.
                    </p>
                    <p>
                      <strong className="text-white">2.6 Payment Authorization:</strong> By completing a payment through 
                      2Checkout, you authorize us to charge your payment method for the total amount of your purchase, 
                      including applicable taxes and fees.
                    </p>
                    <p>
                      <strong className="text-white">2.7 Billing Statement:</strong> Charges on your billing statement 
                      may appear under "2Checkout" or "Verifone" depending on your card issuer.
                    </p>
                  </div>
                </div>

                {/* General Payment Terms */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-dexRed">3. General Payment Terms</h3>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      <strong className="text-white">3.1 Payment Confirmation:</strong> You will receive an email 
                      confirmation once your payment has been successfully processed. Please retain this confirmation 
                      for your records.
                    </p>
                    <p>
                      <strong className="text-white">3.2 Failed Payments:</strong> If a payment fails, you will be 
                      notified immediately. Please ensure your payment method has sufficient funds and is valid. You 
                      may attempt the payment again or use an alternative payment method.
                    </p>
                    <p>
                      <strong className="text-white">3.3 Payment Disputes:</strong> If you have any concerns about 
                      a charge on your account, please contact us immediately at{' '}
                      <a href="mailto:dexlanka@gmail.com" className="text-dexRed hover:underline">dexlanka@gmail.com</a>. 
                      We will investigate and resolve the issue promptly.
                    </p>
                    <p>
                      <strong className="text-white">3.4 Refunds:</strong> Refund requests are subject to our refund 
                      policy outlined below. Refunds, when approved, will be processed through the same payment gateway 
                      used for the original transaction.
                    </p>
                  </div>
                </div>
              </div>

              {/* Company Terms */}
              <div className="glass rounded-2xl p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Shield size={32} className="text-dexRed" />
                  <h2 className="text-3xl font-bold">Company Terms and Conditions</h2>
                </div>

                <div className="space-y-6 text-gray-300">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-dexRed">1. Services</h3>
                    <p className="mb-2">
                      DexLanka provides premium IT, branding, and digital services including but not limited to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Web Development and Web Applications</li>
                      <li>Mobile Application Development</li>
                      <li>UI/UX Design Services</li>
                      <li>E-Commerce Solutions</li>
                      <li>Desktop Applications</li>
                      <li>Digital Marketing Services</li>
                      <li>Template Sales and Customizations</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-dexRed">2. Orders and Purchases</h3>
                    <div className="space-y-3">
                      <p>
                        <strong className="text-white">2.1 Order Acceptance:</strong> All orders are subject to 
                        acceptance by DexLanka. We reserve the right to refuse or cancel any order at our discretion.
                      </p>
                      <p>
                        <strong className="text-white">2.2 Pricing:</strong> All prices are displayed in the currency 
                        specified (LKR for PayHere, USD for 2Checkout) and are subject to change without notice. 
                        However, once you complete a purchase, the price is locked for that transaction.
                      </p>
                      <p>
                        <strong className="text-white">2.3 Digital Products:</strong> Digital products (templates, 
                        software licenses) are delivered immediately upon successful payment confirmation via email 
                        or through your account dashboard.
                      </p>
                      <p>
                        <strong className="text-white">2.4 Custom Services:</strong> For custom development services, 
                        a separate service agreement will be provided outlining project scope, timeline, and deliverables.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-dexRed">3. Refund and Cancellation Policy</h3>
                    <div className="space-y-3">
                      <p>
                        <strong className="text-white">3.1 Digital Products:</strong> Due to the digital nature of 
                        our templates and software products, refunds are generally not available once the product has 
                        been downloaded or accessed. However, we may consider refunds on a case-by-case basis for 
                        technical issues or product defects.
                      </p>
                      <p>
                        <strong className="text-white">3.2 Custom Services:</strong> Refund policies for custom 
                        services will be outlined in the specific service agreement. Generally, refunds are not 
                        available for completed work, but may be considered for cancelled projects before work begins.
                      </p>
                      <p>
                        <strong className="text-white">3.3 Processing Time:</strong> Approved refunds will be processed 
                        within 5-10 business days and will be credited to the original payment method used.
                      </p>
                      <p>
                        <strong className="text-white">3.4 Chargebacks:</strong> Initiating a chargeback without 
                        first contacting us may result in your account being suspended. Please contact us first to 
                        resolve any payment issues.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-dexRed">4. Intellectual Property</h3>
                    <div className="space-y-3">
                      <p>
                        <strong className="text-white">4.1 Ownership:</strong> All content, designs, code, and materials 
                        on this website are the property of DexLanka or our licensors and are protected by copyright 
                        and other intellectual property laws.
                      </p>
                      <p>
                        <strong className="text-white">4.2 License:</strong> When you purchase a template or digital 
                        product, you receive a license to use it for your projects. The license terms will be specified 
                        with each product. Unauthorized distribution, resale, or sharing of purchased products is prohibited.
                      </p>
                      <p>
                        <strong className="text-white">4.3 Custom Work:</strong> For custom development projects, 
                        intellectual property rights will be transferred to you upon full payment, unless otherwise 
                        specified in the service agreement.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-dexRed">5. Data Security and Privacy</h3>
                    <div className="space-y-3">
                      <p>
                        <strong className="text-white">5.1 Data Protection:</strong> We are committed to protecting 
                        your personal information. We use industry-standard security measures to safeguard your data.
                      </p>
                      <p>
                        <strong className="text-white">5.2 Payment Information:</strong> We do not store your complete 
                        payment card details. All payment information is processed securely through our PCI DSS compliant 
                        payment gateways (PayHere and 2Checkout).
                      </p>
                      <p>
                        <strong className="text-white">5.3 Privacy Policy:</strong> Our collection and use of personal 
                        information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-dexRed">6. Limitation of Liability</h3>
                    <div className="space-y-3">
                      <p>
                        <strong className="text-white">6.1 Service Availability:</strong> While we strive to maintain 
                        continuous service availability, we do not guarantee uninterrupted access to our website or services.
                      </p>
                      <p>
                        <strong className="text-white">6.2 Third-Party Services:</strong> We are not responsible for 
                        the availability, accuracy, or reliability of third-party services, including payment gateways. 
                        Any issues with payment processing should be directed to the respective payment gateway provider.
                      </p>
                      <p>
                        <strong className="text-white">6.3 Limitation:</strong> To the maximum extent permitted by law, 
                        DexLanka shall not be liable for any indirect, incidental, special, or consequential damages 
                        arising from your use of our services.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-dexRed">7. Dispute Resolution</h3>
                    <div className="space-y-3">
                      <p>
                        <strong className="text-white">7.1 Contact Us First:</strong> If you have any concerns or 
                        disputes, please contact us at{' '}
                        <a href="mailto:dexlanka@gmail.com" className="text-dexRed hover:underline">dexlanka@gmail.com</a> 
                        {' '}or call us at{' '}
                        <a href="tel:+94705588789" className="text-dexRed hover:underline">+94 70 558 8789</a>. 
                        We will work with you to resolve any issues.
                      </p>
                      <p>
                        <strong className="text-white">7.2 Governing Law:</strong> These Terms are governed by the 
                        laws of Sri Lanka. Any disputes will be subject to the exclusive jurisdiction of the courts 
                        of Sri Lanka.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-dexRed">8. Changes to Terms</h3>
                    <p>
                      We reserve the right to modify these Terms at any time. Changes will be effective immediately 
                      upon posting on this page. Your continued use of our services after changes are posted constitutes 
                      your acceptance of the modified Terms. We recommend reviewing these Terms periodically.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-dexRed">9. Contact Information</h3>
                    <div className="space-y-2">
                      <p>
                        <strong className="text-white">Company:</strong> DexLanka
                      </p>
                      <p>
                        <strong className="text-white">Email:</strong>{' '}
                        <a href="mailto:dexlanka@gmail.com" className="text-dexRed hover:underline">dexlanka@gmail.com</a>
                      </p>
                      <p>
                        <strong className="text-white">Phone:</strong>{' '}
                        <a href="tel:+94705588789" className="text-dexRed hover:underline">+94 70 558 8789</a>
                      </p>
                      <p>
                        <strong className="text-white">Address:</strong> Meegoda, Homagama, Sri Lanka
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="glass rounded-2xl p-8 mb-8 border-l-4 border-dexRed">
                <div className="flex items-start gap-3">
                  <AlertCircle size={24} className="text-dexRed shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Important Notice</h3>
                    <p className="text-gray-300">
                      By using our services and making a payment through PayHere or 2Checkout, you acknowledge that 
                      you have read, understood, and agree to be bound by these Terms and Conditions. If you do not 
                      agree with any part of these Terms, please do not use our services.
                    </p>
                  </div>
                </div>
              </div>

              {/* Agreement */}
              <div className="glass rounded-2xl p-8 bg-gradient-to-r from-dexRed/10 to-transparent border border-dexRed/20">
                <div className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-dexRed shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Your Agreement</h3>
                    <p className="text-gray-300 mb-4">
                      By proceeding with a purchase, you confirm that:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                      <li>You are at least 18 years old and have the legal capacity to enter into this agreement</li>
                      <li>You have read and understood these Terms and Conditions</li>
                      <li>You agree to be bound by these Terms and the terms of our payment gateways</li>
                      <li>All information you provide is accurate and complete</li>
                      <li>You are authorized to use the payment method you provide</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;

