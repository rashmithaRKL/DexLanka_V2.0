import { useEffect, useState } from 'react';

export type CurrencyCode = 'LKR' | 'USD';

const selectedCurrencyKey = 'dexlanka_selected_currency';
const detectedCountryKey = 'dexlanka_detected_country';
const detectedCountryNameKey = 'dexlanka_detected_country_name';

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

export const getCountryNameFromCode = (countryCode?: string | null) => {
  if (!countryCode) return '';
  const normalizedCode = countryCode.toUpperCase();
  if (normalizedCode === 'LK') return 'Sri Lanka';

  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(normalizedCode) || '';
  } catch {
    return normalizedCode;
  }
};

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
  const [countryName, setCountryName] = useState(() => {
    if (typeof window === 'undefined') return '';
    if (hasSriLankaBrowserSignal()) return 'Sri Lanka';
    return (
      window.sessionStorage.getItem(detectedCountryNameKey) ||
      getCountryNameFromCode(window.sessionStorage.getItem(detectedCountryKey))
    );
  });
  const [isDetected, setIsDetected] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sriLankaBrowserSignal = hasSriLankaBrowserSignal();
    if (sriLankaBrowserSignal) {
      window.sessionStorage.setItem(detectedCountryKey, 'LK');
      window.sessionStorage.setItem(detectedCountryNameKey, 'Sri Lanka');
      setCountryCode('LK');
      setCountryName('Sri Lanka');
      setCurrencyState('LKR');
    }

    const selected = window.localStorage.getItem(selectedCurrencyKey);
    const hasManualCurrency = selected === 'LKR' || selected === 'USD';

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 1800);

    fetch('https://ipapi.co/json/', { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { country_code?: string; country_name?: string } | null) => {
        const detectedCountry = data?.country_code?.toUpperCase() || '';
        if (detectedCountry) {
          const detectedCountryName = data?.country_name || getCountryNameFromCode(detectedCountry);
          window.sessionStorage.setItem(detectedCountryKey, detectedCountry);
          window.sessionStorage.setItem(detectedCountryNameKey, detectedCountryName);
          setCountryCode(detectedCountry);
          setCountryName(detectedCountryName);
        }
        if (!hasManualCurrency || sriLankaBrowserSignal || detectedCountry === 'LK') {
          setCurrencyState(detectedCountry === 'LK' || sriLankaBrowserSignal ? 'LKR' : 'USD');
        }
      })
      .catch(() => {
        if (!hasManualCurrency || sriLankaBrowserSignal) {
          setCurrencyState(sriLankaBrowserSignal ? 'LKR' : 'USD');
        }
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
    countryName,
    isDetected,
    isSriLanka: currency === 'LKR',
    setCurrency,
  };
};
