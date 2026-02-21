'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { setAuth } from '@/lib/auth';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    business_name: '',
    business_slug: '',
    owner_name: '',
    owner_email: '',
    password: '',
    confirmPassword: '',
    business_address: '',
    timezone: 'America/New_York',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from business name
    if (name === 'business_name') {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setFormData((prev) => ({ ...prev, business_slug: slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.business_name || !formData.owner_name || !formData.owner_email || !formData.password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.register({
        business_name: formData.business_name,
        business_slug: formData.business_slug,
        owner_name: formData.owner_name,
        owner_email: formData.owner_email,
        password: formData.password,
        business_address: formData.business_address,
        timezone: formData.timezone,
      });

      // Store auth data
      setAuth(response.data.token, response.data.business.id);

      // Redirect to pricing
      router.push('/pricing');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 pb-12">
      <div className="container-max">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <div className="hidden md:block">
            <h1 className="heading-lg mb-6">Start your free trial</h1>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 bg-dark rounded-full flex items-center justify-center text-white text-sm">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold mb-1">7-day free trial</h3>
                  <p className="text-gray-600">No credit card required. Cancel anytime.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 bg-dark rounded-full flex items-center justify-center text-white text-sm">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Full-featured</h3>
                  <p className="text-gray-600">Access all Pro features during your trial.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 bg-dark rounded-full flex items-center justify-center text-white text-sm">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Expert onboarding</h3>
                  <p className="text-gray-600">Our team will help you get set up in minutes.</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-12 border-t">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-dark mb-2">5,000+</div>
                  <p className="text-sm text-gray-600">Businesses trust us</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-dark mb-2">2M+</div>
                  <p className="text-sm text-gray-600">Calls handled</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Business Name *</label>
                <input
                  type="text"
                  name="business_name"
                  value={formData.business_name}
                  onChange={handleChange}
                  className="input-primary"
                  placeholder="e.g., Martinez Dental"
                />
              </div>

              {/* Business Slug */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">URL Slug (auto-generated)</label>
                <input
                  type="text"
                  name="business_slug"
                  value={formData.business_slug}
                  onChange={handleChange}
                  className="input-primary bg-gray-50"
                  disabled
                  placeholder="martinez-dental"
                />
                <p className="text-xs text-slate-500 mt-1">This is used to identify your business</p>
              </div>

              {/* Owner Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Your Name *</label>
                <input
                  type="text"
                  name="owner_name"
                  value={formData.owner_name}
                  onChange={handleChange}
                  className="input-primary"
                  placeholder="John Martinez"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Email *</label>
                <input
                  type="email"
                  name="owner_email"
                  value={formData.owner_email}
                  onChange={handleChange}
                  className="input-primary"
                  placeholder="john@martinez.com"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-primary"
                  placeholder="••••••••"
                />
                <p className="text-xs text-slate-500 mt-1">At least 6 characters</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-primary"
                  placeholder="••••••••"
                />
              </div>

              {/* Business Address */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">Business Address (optional)</label>
                <input
                  type="text"
                  name="business_address"
                  value={formData.business_address}
                  onChange={handleChange}
                  className="input-primary"
                  placeholder="123 Main St, City, State"
                />
              </div>

              {/* Timezone */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">Timezone</label>
                <select name="timezone" value={formData.timezone} onChange={handleChange} className="input-primary">
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="America/Anchorage">Alaska Time</option>
                  <option value="Pacific/Honolulu">Hawaii Time</option>
                </select>
              </div>

              {/* Error Message */}
              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">{error}</div>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-lg mt-6 disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Get Started Free'}
              </button>

              {/* Terms */}
              <p className="text-xs text-slate-600 text-center">
                By signing up, you agree to our{' '}
                <a href="#" className="underline hover:text-slate-900">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="underline hover:text-slate-900">
                  Privacy Policy
                </a>
              </p>

              {/* Login Link */}
              <div className="pt-4 border-t text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                    Sign in
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
