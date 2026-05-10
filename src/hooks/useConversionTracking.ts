import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackEvent } from '@/lib/analytics';

const getPageType = (pathname: string) => {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/project/')) return 'project';
  if (pathname.startsWith('/blog/')) return 'blog_post';
  if (pathname === '/blog') return 'blog';
  if (pathname === '/contact') return 'contact';
  if (pathname === '/packages') return 'packages';
  if (pathname.includes('website') || pathname.includes('system') || pathname.includes('development') || pathname.includes('migration')) {
    return 'service';
  }
  return 'page';
};

export const useConversionTracking = () => {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const pageType = getPageType(location.pathname);
    trackEvent('page_view', {
      page_path: location.pathname,
      page_type: pageType,
    });

    if (pageType === 'service') trackEvent('service_page_view', { page_path: location.pathname });
    if (pageType === 'project') trackEvent('project_page_view', { page_path: location.pathname });
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;
      const button = target?.closest('button') as HTMLButtonElement | null;

      if (anchor?.href.includes('wa.me')) {
        trackEvent('whatsapp_click', {
          page_path: location.pathname,
          link_text: anchor.textContent?.trim() || anchor.getAttribute('aria-label') || 'WhatsApp',
        });
      }

      if (anchor?.href.startsWith('tel:')) {
        trackEvent('phone_click', { page_path: location.pathname });
      }

      const text = (anchor?.textContent || button?.textContent || '').trim().toLowerCase();
      if (text.includes('package')) {
        trackEvent('package_click', { page_path: location.pathname, label: text });
      }
      if (text.includes('audit')) {
        trackEvent('free_audit_click', { page_path: location.pathname, label: text });
      }
      if (location.pathname.startsWith('/blog') && (text.includes('consultation') || text.includes('quote') || text.includes('contact'))) {
        trackEvent('blog_cta_click', { page_path: location.pathname, label: text });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [location.pathname]);

  useEffect(() => {
    const trackedDepths = new Set<number>();
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = Math.round((window.scrollY / scrollable) * 100);
      [25, 50, 75, 90].forEach((threshold) => {
        if (depth >= threshold && !trackedDepths.has(threshold)) {
          trackedDepths.add(threshold);
          trackEvent('scroll_depth', { page_path: location.pathname, depth: threshold });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);
};

