import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShoppingCart, Eye, Star, Tag, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface Template {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
  tags?: string[];
  rating?: number;
  sales?: number;
  previewUrl?: string;
  isFeatured?: boolean;
}

interface TemplateCardProps {
  template: Template;
  delay?: number;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, delay = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { addToCart, isInCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart({
      id: template.id,
      title: template.title,
      category: template.category,
      price: template.price,
      description: template.description,
      image: template.image,
      tags: template.tags || [],
    });
    toast({
      title: 'Added to cart',
      description: `${template.title} has been added to your cart.`,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: delay * 0.1
      }}
      className={`glass rounded-2xl overflow-hidden h-full flex flex-col ${
        template.isFeatured ? 'border-dexRed ring-1 ring-dexRed' : 'border-gray-800'
      } transition-all hover:shadow-neon hover:-translate-y-1 group`}
    >
      {/* Featured Badge */}
      {template.isFeatured && (
        <div className="bg-dexRed text-white text-sm font-medium py-1 px-4 text-center">
          ⭐ Featured Template
        </div>
      )}

      {/* Image Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        <Link to={`/template/${template.id}`} className="block">
          <div className="aspect-video flex items-center justify-center">
            <img
              src={template.image || '/placeholder.svg'}
              alt={template.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </div>
        </Link>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-dexRed/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
            {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
          </span>
        </div>

        {/* Overlay with action buttons on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 pointer-events-none group-hover:pointer-events-auto z-20">
          <Link
            to={`/template/${template.id}`}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center gap-2 pointer-events-auto"
          >
            <Eye size={18} />
            Preview
          </Link>
          {isInCart(template.id) ? (
            <Link
              to="/cart"
              className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center gap-2 pointer-events-auto"
            >
              <Check size={18} />
              In Cart
            </Link>
          ) : (
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-dexRed text-white rounded-lg font-medium hover:bg-dexRed/90 transition-colors flex items-center gap-2 pointer-events-auto"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title and Rating */}
        <div className="mb-3">
          <Link to={`/template/${template.id}`}>
            <h3 className="text-xl font-semibold mb-2 line-clamp-1 hover:text-dexRed transition-colors">{template.title}</h3>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center text-yellow-400">
              <Star size={14} className="fill-current" />
              <span className="ml-1 text-gray-300">{template.rating || 0}</span>
            </div>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">{template.sales || 0} sales</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 flex-1">
          {template.description}
        </p>

        {/* Tags */}
        {template.tags && template.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {template.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded-md flex items-center gap-1"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price and Action Button */}
        <div className="mt-auto pt-4 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-white">${template.price}</span>
              <span className="text-gray-400 text-sm ml-1">one-time</span>
            </div>
            {isInCart(template.id) ? (
              <Link
                to="/cart"
                className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center gap-2 text-sm"
              >
                <Check size={16} />
                In Cart
              </Link>
            ) : (
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-dexRed text-white rounded-lg font-medium hover:bg-dexRed/90 transition-colors flex items-center gap-2 text-sm"
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateCard;

