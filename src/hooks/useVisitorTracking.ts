import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Simple visitor tracking - in production, use a proper analytics service
export const useVisitorTracking = () => {
  useEffect(() => {
    const trackVisitor = () => {
      try {
        // Get or create session ID
        let sessionId = sessionStorage.getItem('visitor_session_id');
        if (!sessionId) {
          sessionId = uuidv4();
          sessionStorage.setItem('visitor_session_id', sessionId);
        }

        // Track page view
        const pageView = {
          sessionId,
          pageUrl: window.location.pathname,
          referrer: document.referrer,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        };

        // Store in localStorage for demo purposes
        // In production, send this to your backend
        const visits = JSON.parse(localStorage.getItem('site_visits') || '[]');
        visits.push(pageView);
        
        // Keep only last 1000 visits for demo
        if (visits.length > 1000) {
          visits.shift();
        }
        
        localStorage.setItem('site_visits', JSON.stringify(visits));

        // Update visitor count
        const visitorData = JSON.parse(localStorage.getItem('visitor_data') || '{}');
        const today = new Date().toISOString().split('T')[0];
        
        if (!visitorData[today]) {
          visitorData[today] = {
            visitors: new Set(),
            pageViews: 0,
          };
        }
        
        // Convert Set to Array for storage, then back to Set
        const todayVisitors = new Set(visitorData[today].visitors || []);
        todayVisitors.add(sessionId);
        
        visitorData[today] = {
          visitors: Array.from(todayVisitors),
          pageViews: (visitorData[today].pageViews || 0) + 1,
        };

        // Keep only last 365 days
        const dates = Object.keys(visitorData);
        if (dates.length > 365) {
          dates.sort();
          dates.slice(0, dates.length - 365).forEach(date => {
            delete visitorData[date];
          });
        }

        localStorage.setItem('visitor_data', JSON.stringify(visitorData));
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    trackVisitor();
  }, []);
};

export const getAnalytics = () => {
  try {
    const visitorData = JSON.parse(localStorage.getItem('visitor_data') || '{}');
    const visits = JSON.parse(localStorage.getItem('site_visits') || '[]');
    
    const today = new Date().toISOString().split('T')[0];
    const thisMonth = today.substring(0, 7); // YYYY-MM
    const thisYear = today.substring(0, 4); // YYYY

    // Calculate daily stats
    const todayData = visitorData[today] || { visitors: [], pageViews: 0 };
    const dailyVisitors = todayData.visitors?.length || 0;
    const dailyPageViews = todayData.pageViews || 0;

    // Calculate monthly stats
    let monthlyVisitors = new Set();
    let monthlyPageViews = 0;
    Object.entries(visitorData).forEach(([date, data]: [string, any]) => {
      if (date.startsWith(thisMonth)) {
        (data.visitors || []).forEach((v: string) => monthlyVisitors.add(v));
        monthlyPageViews += data.pageViews || 0;
      }
    });

    // Calculate yearly stats
    let yearlyVisitors = new Set();
    let yearlyPageViews = 0;
    Object.entries(visitorData).forEach(([date, data]: [string, any]) => {
      if (date.startsWith(thisYear)) {
        (data.visitors || []).forEach((v: string) => yearlyVisitors.add(v));
        yearlyPageViews += data.pageViews || 0;
      }
    });

    // Get last 7 days data for chart
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayData = visitorData[dateStr] || { visitors: [], pageViews: 0 };
      last7Days.push({
        date: dateStr,
        visitors: dayData.visitors?.length || 0,
        pageViews: dayData.pageViews || 0,
      });
    }

    // Get popular pages
    const pageCount: Record<string, number> = {};
    visits.forEach((visit: any) => {
      pageCount[visit.pageUrl] = (pageCount[visit.pageUrl] || 0) + 1;
    });
    const popularPages = Object.entries(pageCount)
      .map(([url, count]) => ({ url, views: count }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    return {
      daily: {
        visitors: dailyVisitors,
        pageViews: dailyPageViews,
      },
      monthly: {
        visitors: monthlyVisitors.size,
        pageViews: monthlyPageViews,
      },
      yearly: {
        visitors: yearlyVisitors.size,
        pageViews: yearlyPageViews,
      },
      last7Days,
      popularPages,
      totalVisits: visits.length,
    };
  } catch (error) {
    console.error('Error getting analytics:', error);
    return {
      daily: { visitors: 0, pageViews: 0 },
      monthly: { visitors: 0, pageViews: 0 },
      yearly: { visitors: 0, pageViews: 0 },
      last7Days: [],
      popularPages: [],
      totalVisits: 0,
    };
  }
};

