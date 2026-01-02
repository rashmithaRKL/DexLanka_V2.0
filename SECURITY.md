# Security Guidelines for DexLanka V2.0

## ⚠️ CRITICAL SECURITY ISSUES - MUST FIX BEFORE PRODUCTION

This document outlines critical security issues in the current codebase and provides guidance on how to fix them before deploying to production.

---

## 🔴 CRITICAL ISSUES

### 1. Plain Text Password Storage (CRITICAL)

**Current Issue:** Passwords are stored as plain text in the database and compared directly without hashing.

**Affected Files:**
- `src/context/AuthContext.tsx` (Admin authentication)
- `src/context/UserAuthContext.tsx` (User authentication)

**Risk Level:** 🔴 **CRITICAL** - If database is compromised, all user passwords are exposed.

**Fix Required:**

#### Step 1: Install bcrypt
```bash
npm install bcrypt @types/bcrypt
```

#### Step 2: Update Registration (UserAuthContext.tsx)
```typescript
import bcrypt from 'bcrypt';

const register = async (email: string, password: string, fullName: string, phone?: string) => {
  // ... existing validation ...
  
  // Hash password before storing
  const password_hash = await bcrypt.hash(password, 10);
  
  const { data: newUser, error } = await supabase
    .from('users')
    .insert({
      email,
      password_hash, // Now properly hashed
      full_name: fullName,
      phone: phone || null,
      is_active: true,
    })
    .select()
    .single();
  
  // ... rest of code ...
};
```

#### Step 3: Update Login (UserAuthContext.tsx)
```typescript
const login = async (email: string, password: string) => {
  const { data: userData, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('is_active', true)
    .single();

  if (error || !userData) {
    throw new Error('Invalid email or password');
  }

  // Use bcrypt to compare password
  const isValid = await bcrypt.compare(password, userData.password_hash);
  
  if (!isValid) {
    throw new Error('Invalid email or password');
  }
  
  // ... rest of code ...
};
```

#### Step 4: Apply same changes to AuthContext.tsx for admin authentication

---

### 2. Weak Session Token Generation (HIGH)

**Current Issue:** Session tokens are generated using simple base64 encoding of predictable values.

**Affected Files:**
- `src/context/AuthContext.tsx` (line 149)
- `src/context/UserAuthContext.tsx` (lines 116-120, 153-157)

**Risk Level:** 🔴 **HIGH** - Tokens can be guessed or forged.

**Fix Required:**

Use crypto-secure random tokens:

```typescript
// Option 1: Use UUID (recommended)
import { v4 as uuidv4 } from 'uuid';
const token = uuidv4();

// Option 2: Use crypto.randomBytes
import crypto from 'crypto';
const token = crypto.randomBytes(32).toString('hex');
```

Install UUID:
```bash
npm install uuid @types/uuid
```

---

### 3. Exposed Credentials in env.example (FIXED ✅)

**Status:** ✅ Fixed - Real credentials have been replaced with placeholders.

**What was done:** All production credentials have been removed from `env.example` and replaced with placeholder values.

---

### 4. Missing .env in .gitignore (FIXED ✅)

**Status:** ✅ Fixed - `.env` files are now properly ignored.

**What was done:** Added `.env`, `.env.local`, `.env.development`, `.env.production`, and `.env.test` to `.gitignore`.

---

## 🟡 HIGH PRIORITY ISSUES

### 5. Console.log Statements in Production

**Issue:** Multiple console.log statements exist throughout the codebase that could leak sensitive information.

**Affected Files:**
- `src/context/AuthContext.tsx` (11 instances)
- `src/pages/Login.tsx` (7 instances)
- `src/lib/emailService.ts` (4 instances)
- `src/lib/api.ts` (2 instances)
- And others...

**Risk Level:** 🟡 **MEDIUM** - Could expose sensitive data in production.

**Fix Required:**

1. **Option 1:** Remove all console.log statements from authentication and sensitive areas
2. **Option 2:** Use a logging library with environment-based logging:

```typescript
// Create src/lib/logger.ts
const isDev = import.meta.env.DEV;

export const logger = {
  log: (...args: any[]) => isDev && console.log(...args),
  error: (...args: any[]) => console.error(...args), // Always log errors
  warn: (...args: any[]) => isDev && console.warn(...args),
};

// Replace console.log with logger.log
import { logger } from '@/lib/logger';
logger.log('User logged in:', user.email);
```

---

### 6. Client-Side Secret Key Exposure

**Issue:** Ensure Stripe secret keys and service role keys are NEVER included in frontend code.

**Current Status:** ✅ Good - Secret keys are only used in Supabase Edge Functions (server-side).

**Verification Required:**
- ✅ `STRIPE_SECRET_KEY` - Only in edge functions
- ✅ `SUPABASE_SERVICE_ROLE_KEY` - Only in edge functions
- ✅ `VITE_STRIPE_PUBLISHABLE_KEY` - Correctly prefixed with VITE_ for client use

---

### 7. CORS and API Security

**Current Status:** ✅ Supabase handles CORS automatically with Row Level Security (RLS) policies.

**Best Practices:**
- ✅ RLS enabled on all tables
- ✅ Public endpoints restricted appropriately
- ⚠️ Review admin policies to ensure email-based access control is properly configured

---

## 🟢 RECOMMENDED IMPROVEMENTS

### 8. Input Validation

**Recommendation:** Add comprehensive input validation using Zod or similar library.

```typescript
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Use in login form
const result = loginSchema.safeParse({ email, password });
if (!result.success) {
  throw new Error(result.error.issues[0].message);
}
```

---

### 9. Rate Limiting

**Recommendation:** Implement rate limiting for authentication endpoints to prevent brute force attacks.

**Options:**
- Use Supabase Edge Functions with rate limiting
- Implement client-side rate limiting with exponential backoff
- Use a service like Cloudflare for DDoS protection

---

### 10. Two-Factor Authentication (2FA)

**Recommendation:** Consider implementing 2FA for admin accounts.

**Options:**
- Use Supabase Auth with MFA (built-in)
- Implement TOTP (Time-based One-Time Password) using libraries like `otplib`

---

### 11. Session Management

**Current Issue:** Sessions are stored in localStorage, which is vulnerable to XSS attacks.

**Recommendation:**
- Use httpOnly cookies (requires backend)
- Implement token refresh mechanism
- Add session timeout
- Clear sessions on logout

---

### 12. HTTPS Enforcement

**Recommendation:** Ensure all production deployments use HTTPS.

**Deployment Platforms:**
- ✅ Vercel - Automatic HTTPS
- ✅ Netlify - Automatic HTTPS
- ✅ Supabase - Automatic HTTPS

---

## 📋 Pre-Production Checklist

Before deploying to production, ensure:

- [ ] **Password hashing implemented** - Using bcrypt with proper salt rounds
- [ ] **Secure token generation** - Using cryptographically secure random tokens
- [ ] **Environment variables secured** - `.env` file not committed to git
- [ ] **Console.log statements removed** - Especially from authentication code
- [ ] **RLS policies tested** - Ensure proper access control
- [ ] **Input validation added** - For all user inputs
- [ ] **Error messages sanitized** - Don't leak system information
- [ ] **HTTPS enabled** - On all production endpoints
- [ ] **Dependency audit** - Run `npm audit` and fix vulnerabilities
- [ ] **Admin emails configured** - Update RLS policies with correct admin emails
- [ ] **Stripe webhook secret set** - Configure in production
- [ ] **Database backups enabled** - Supabase automatic backups
- [ ] **Rate limiting implemented** - For sensitive endpoints

---

## 🔒 Security Best Practices

### For Developers

1. **Never commit sensitive data** - Use environment variables
2. **Keep dependencies updated** - Run `npm audit` regularly
3. **Use HTTPS everywhere** - Even in development
4. **Validate all inputs** - Client-side and server-side
5. **Log security events** - But not sensitive data
6. **Review code for security** - Before merging
7. **Use prepared statements** - Supabase does this automatically
8. **Implement proper error handling** - Don't expose stack traces

### For Deployment

1. **Use separate environments** - Development, staging, production
2. **Rotate credentials regularly** - API keys, secrets, passwords
3. **Monitor for suspicious activity** - Use logging and analytics
4. **Set up alerts** - For failed login attempts, unusual activity
5. **Keep backups** - Regular database backups
6. **Document security procedures** - For your team
7. **Conduct security audits** - Periodically review security

---

## 📞 Reporting Security Issues

If you discover a security vulnerability, please:

1. **DO NOT** create a public GitHub issue
2. Email security concerns to: dexlanka@gmail.com
3. Provide detailed information about the vulnerability
4. Wait for acknowledgment before public disclosure

---

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Supabase Security Best Practices](https://supabase.com/docs/guides/platform/security)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [React Security Best Practices](https://react.dev/learn/security)

---

**Last Updated:** December 4, 2025  
**Version:** 1.0

