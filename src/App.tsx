
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";
import { StickyWhatsApp } from "./components/MarketingSections";
import { AuthProvider } from "./context/AuthContext";
import { UserAuthProvider } from "./context/UserAuthContext";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import { servicePages } from "./data/site";

const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Packages = lazy(() => import("./pages/Packages"));
const Contact = lazy(() => import("./pages/Contact"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Templates = lazy(() => import("./pages/Templates"));
const TemplatePreview = lazy(() => import("./pages/TemplatePreview"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Admin = lazy(() => import("./pages/Admin"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const TemplateDemo = lazy(() => import("./pages/TemplateDemo"));
const ServiceLandingPage = lazy(() => import("./pages/ServiceLandingPage"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

// const queryClient = new QueryClient();

const App = () => {

  const [queryClient] = useState(() => new QueryClient());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const markLoaded = () => setIsLoaded(true);
    if (document.readyState === "complete") {
      markLoaded();
    } else {
      window.addEventListener("load", markLoaded);
    }
    return () => window.removeEventListener("load", markLoaded);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <UserAuthProvider>
            <CartProvider>
              {!isLoaded && <Loader />}
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Suspense fallback={<Loader />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/packages" element={<Packages />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/template/:id" element={<TemplatePreview />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/project/:id" element={<ProjectDetail />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/auth/callback" element={<AuthCallback />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                    <Route path="/terms-payment-refund-cancellation" element={<TermsAndConditions />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/demo/template/:id" element={<TemplateDemo />} />
                    {servicePages.map((page) => (
                      <Route key={page.path} path={page.path} element={<ServiceLandingPage />} />
                    ))}
                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute>
                          <Admin />
                        </ProtectedRoute>
                      }
                    />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <StickyWhatsApp />
              </BrowserRouter>
            </CartProvider>
          </UserAuthProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
