import CryptoJS from 'crypto-js'

export interface CheckoutItem {
  id: number
  title: string
  price: number
  quantity: number
}

export interface PayHereCustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: string
  city?: string
  country?: string
}

export interface PayHerePaymentData {
  merchant_id: string
  return_url: string
  cancel_url: string
  notify_url: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  address?: string
  city?: string
  country?: string
  order_id: string
  items: string
  currency: string
  amount: string
  hash: string
}

export interface TwoCheckoutCustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
}

export interface TwoCheckoutPaymentData {
  sid: string
  mode: string
  merchant_order_id: string
  currency_code: string
  total: string
  cart_order_id: string
  x_receipt_link_url: string
  card_holder_name: string
  street_address: string
  city: string
  state: string
  zip: string
  country: string
  email: string
  phone: string
  lang: string
  demo: string
}

/**
 * Generate MD5 hash for PayHere payment security
 */
function generateMD5Hash(text: string): string {
  return CryptoJS.MD5(text).toString().toUpperCase()
}

/**
 * Create PayHere payment form data (Primary Payment Gateway)
 */
export function createPayHerePayment(
  items: CheckoutItem[],
  customerInfo: PayHereCustomerInfo,
  orderId: string
): PayHerePaymentData {
  // Get environment variables
  const merchantId = import.meta.env.VITE_PAYHERE_MERCHANT_ID
  const merchantSecret = import.meta.env.VITE_PAYHERE_MERCHANT_SECRET
  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin

  if (!merchantId) {
    throw new Error('PayHere Merchant ID is not configured. Please set VITE_PAYHERE_MERCHANT_ID in your environment variables.')
  }

  if (!merchantSecret) {
    throw new Error('PayHere Merchant Secret is not configured. Please set VITE_PAYHERE_MERCHANT_SECRET in your environment variables.')
  }

  // Validate input
  if (!items || items.length === 0) {
    throw new Error('No items in cart')
  }

  // Calculate total amount
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const amount = totalAmount.toFixed(2)
  const currency = 'LKR' // PayHere default currency, can be changed to USD if needed

  // Format items as string (item_name_1|item_number_1|quantity_1|amount_1,item_name_2|...)
  const itemsString = items
    .map((item) => {
      return `${item.title}|${item.id}|${item.quantity}|${(item.price * item.quantity).toFixed(2)}`
    })
    .join(',')

  // Generate hash using MD5 as per PayHere specification:
  // hash = md5(merchant_id + order_id + amount + currency + md5(merchant_secret))
  const merchantSecretHash = generateMD5Hash(merchantSecret)
  const rawHash = `${merchantId}${orderId}${amount}${currency}${merchantSecretHash}`
  const hash = generateMD5Hash(rawHash)

  return {
    merchant_id: merchantId,
    return_url: `${siteUrl}/checkout?order_id=${orderId}&gateway=payhere`,
    cancel_url: `${siteUrl}/checkout?canceled=true&gateway=payhere`,
    notify_url: `${siteUrl}/api/payhere/notify`,
    first_name: customerInfo.firstName,
    last_name: customerInfo.lastName,
    email: customerInfo.email,
    phone: customerInfo.phone || '',
    address: customerInfo.address || '',
    city: customerInfo.city || '',
    country: customerInfo.country || 'Sri Lanka',
    order_id: orderId,
    items: itemsString,
    currency: currency,
    amount: amount,
    hash: hash,
  }
}

/**
 * Submit PayHere payment form (Primary Payment Gateway)
 */
export function submitPayHerePayment(paymentData: PayHerePaymentData): void {
  const isSandbox = import.meta.env.VITE_PAYHERE_SANDBOX === 'true' || !import.meta.env.VITE_PAYHERE_SANDBOX
  const payHereUrl = isSandbox
    ? 'https://sandbox.payhere.lk/pay/checkout'
    : 'https://www.payhere.lk/pay/checkout'

  // Create a form and submit it
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = payHereUrl
  form.style.display = 'none'

  // Add all form fields
  Object.entries(paymentData).forEach(([key, value]) => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = key
    input.value = String(value)
    form.appendChild(input)
  })

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

/**
 * Create 2Checkout payment form data (Secondary Payment Gateway)
 */
export function createTwoCheckoutPayment(
  items: CheckoutItem[],
  customerInfo: TwoCheckoutCustomerInfo,
  orderId: string
): TwoCheckoutPaymentData {
  // Get environment variables
  const sellerId = import.meta.env.VITE_2CHECKOUT_SELLER_ID
  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin
  const isSandbox = import.meta.env.VITE_2CHECKOUT_SANDBOX === 'true' || !import.meta.env.VITE_2CHECKOUT_SANDBOX

  if (!sellerId) {
    throw new Error('2Checkout Seller ID is not configured. Please set VITE_2CHECKOUT_SELLER_ID in your environment variables.')
  }

  // Validate input
  if (!items || items.length === 0) {
    throw new Error('No items in cart')
  }

  // Calculate total amount
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const amount = totalAmount.toFixed(2)

  // 2Checkout requires product information
  // For simplicity, we'll use the first item as the main product
  // In production, you may want to handle multiple items differently
  const mainItem = items[0]

  return {
    sid: sellerId,
    mode: '2CO', // 2Checkout mode
    merchant_order_id: orderId,
    currency_code: 'USD', // 2Checkout typically uses USD
    total: amount,
    cart_order_id: orderId,
    x_receipt_link_url: `${siteUrl}/checkout?order_id=${orderId}&gateway=2checkout`,
    card_holder_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
    street_address: customerInfo.address || '',
    city: customerInfo.city || '',
    state: customerInfo.state || '',
    zip: customerInfo.zipCode || '',
    country: customerInfo.country || 'LK',
    email: customerInfo.email,
    phone: customerInfo.phone || '',
    lang: 'en',
    demo: isSandbox ? 'Y' : 'N',
  }
}

/**
 * Submit 2Checkout payment form (Secondary Payment Gateway)
 */
export function submitTwoCheckoutPayment(paymentData: TwoCheckoutPaymentData): void {
  const isSandbox = import.meta.env.VITE_2CHECKOUT_SANDBOX === 'true' || !import.meta.env.VITE_2CHECKOUT_SANDBOX
  const twoCheckoutUrl = isSandbox
    ? 'https://sandbox.2checkout.com/checkout/purchase'
    : 'https://www.2checkout.com/checkout/purchase'

  // Create a form and submit it
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = twoCheckoutUrl
  form.style.display = 'none'

  // Add all form fields
  Object.entries(paymentData).forEach(([key, value]) => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = key
    input.value = String(value)
    form.appendChild(input)
  })

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}
