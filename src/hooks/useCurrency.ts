import { useEffect, useState } from 'react';

export type CurrencyCode = 'LKR' | 'USD';

const selectedCurrencyKey = 'dexlanka_selected_currency';
const detectedCountryKey = 'dexlanka_detected_country';

const hasSriLankaBrowserSignal = () => {
  if (typeof window === 'undefined') return false;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const languages = [navigator.language, ...Array.from(navigator.languages || [])].filter(Boolean);
  return timeZone === 'Asia/Colombo' || languages.some((language) => /-LK$/i.test(language));
};

export const lkrBudgetOptions = [
  'Below Rs 25,000',
  'Rs 25,000 - Rs 75,000',
  'Rs 75,000 - Rs 150,000',
  'Rs 150,000 - Rs 300,000',
  'Rs 300,000+',
  'Not sure yet',
];

export const usdBudgetOptions = [
  'Below $100',
  '$100 - $300',
  '$300 - $750',
  '$750 - $1,500',
  '$1,500+',
  'Not sure yet',
];

export const getCurrencyPrice = (
  item: { price?: string; priceLkr?: string; priceUsd?: string },
  currency: CurrencyCode
) => (currency === 'LKR' ? item.priceLkr || item.price : item.priceUsd || item.price) || 'Quote Based';

export const useCurrency = () => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    if (typeof window === 'undefined') return 'USD';
    if (hasSriLankaBrowserSignal()) return 'LKR';
    if (window.sessionStorage.getItem(detectedCountryKey) === 'LK') return 'LKR';
    const selected = window.localStorage.getItem(selectedCurrencyKey);
    return selected === 'LKR' || selected === 'USD' ? selected : 'USD';
  });
  const [countryCode, setCountryCode] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    if (hasSriLankaBrowserSignal()) return 'LK';
    return window.sessionStorage.getItem(detectedCountryKey);
  });
  const [isDetected, setIsDetected] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sriLankaBrowserSignal = hasSriLankaBrowserSignal();
    if (sriLankaBrowserSignal) {
      window.sessionStorage.setItem(detectedCountryKey, 'LK');
      setCountryCode('LK');
      setCurrencyState('LKR');
    }

    const selected = window.localStorage.getItem(selectedCurrencyKey);
    if (!sriLankaBrowserSignal && (selected === 'LKR' || selected === 'USD')) {
      setIsDetected(true);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 1800);

    fetch('https://ipapi.co/json/', { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { country_code?: string } | null) => {
        const detectedCountry = data?.country_code?.toUpperCase() || '';
        if (detectedCountry) {
          window.sessionStorage.setItem(detectedCountryKey, detectedCountry);
          setCountryCode(detectedCountry);
        }
        setCurrencyState(detectedCountry === 'LK' || sriLankaBrowserSignal ? 'LKR' : 'USD');
      })
      .catch(() => {
        setCurrencyState(sriLankaBrowserSignal ? 'LKR' : 'USD');
      })
      .finally(() => {
        window.clearTimeout(timeout);
        setIsDetected(true);
      });

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const setCurrency = (nextCurrency: CurrencyCode) => {
    setCurrencyState(nextCurrency);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(selectedCurrencyKey, nextCurrency);
    }
  };

  return {
    currency,
    countryCode,
    isDetected,
    isSriLanka: currency === 'LKR',
    setCurrency,
  };
};
