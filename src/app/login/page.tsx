'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { setAuth } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('demo123');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Check for demo credentials
    if (email === 'demo@example.com' && password === 'demo123') {
      // Use demo mode
      localStorage.setItem('token', 'demo_token_' + Date.now());
      localStorage.setItem('business_id', '1');
      localStorage.setItem('demo_user', 'true');
      localStorage.setItem('demo_business', JSON.stringify({
        id: 1,
        name: 'Martinez Dental Clinic',
        slug: 'martinez-dental',
        email: 'owner@martinez.com',
        onboarding_status: 'active',
        telnyx_number: '+1 (555) 123-4567',
        vapi_assistant_id: 'assistant_abc123xyz',
      }));
      router.push('/dashboard');
      return;
    }

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.login(email, password);
      setAuth(response.data.token, response.data.business.id);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const loadDemoCredentials = () => {
    setEmail('demo@example.com');
    setPassword('demo123');
    setError('');
  };

  return (
    <div className="pt-20 pb-12 min-h-screen">
      <div className="container-max">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <div className="hidden md:block">
            <h1 className="heading-lg mb-6">Welcome Back</h1>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Manage your account</h3>
                  <p className="text-slate-600">View your dashboard and settings.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold mb-1">View analytics</h3>
                  <p className="text-slate-600">See call logs and business metrics.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Configure settings</h3>
                  <p className="text-slate-600">Update your AI assistant and rules.</p>
                </div>
              </div>
            </div>

            {/* Demo Info */}
            <div className="mt-12 pt-12 border-t border-slate-200">
              <h3 className="font-semibold mb-4 text-slate-900">Try the Demo</h3>
              <p className="text-sm text-slate-600 mb-4">
                Want to see how it works? Click the button below to explore the dashboard with sample data.
              </p>
              <button
                onClick={loadDemoCredentials}
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
              >
                → Load Demo Credentials
              </button>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="heading-sm mb-6">Sign In</h2>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-primary"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-primary"
                  placeholder="••••••••"
                />
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                  {error}
                </div>
              )}

              {/* Demo Helper */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-sm text-blue-900 mb-3">
                  <strong>First time?</strong> Try demo credentials:
                </p>
                <div className="text-xs text-blue-800 mb-3">
                  <p>Email: <code className="font-mono">demo@example.com</code></p>
                  <p>Password: <code className="font-mono">demo123</code></p>
                </div>
                <button
                  type="button"
                  onClick={loadDemoCredentials}
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  → Auto-fill Demo
                </button>
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={loading} className="w-full btn-primary py-3 text-lg mt-6 disabled:opacity-50">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-600">or</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="pt-4 text-center">
                <p className="text-slate-600">
                  Don't have an account?{' '}
                  <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
                    Get started
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
