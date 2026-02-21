'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, getBusinessId } from '@/lib/auth';
import { subscriptionAPI } from '@/lib/api';

const pricingTiers = [
  {
    name: 'Starter',
    price: 129,
    minutes: 100,
    callRange: '~25–30 calls/month',
    overage: '$0.35/min',
    description: 'Small businesses missing a few calls per day.',
    features: [
      '24/7 AI virtual assistant',
      'Natural language understanding',
      'SMS reminders and automation',
      'Instant call transfer support',
    ],
    cta: 'Buy Now',
    tier: 'starter',
  },
  {
    name: 'Growth',
    price: 199,
    minutes: 300,
    callRange: '~75–100 calls/month',
    overage: '$0.25/min',
    description: 'Busy businesses getting steady daily calls.',
    features: [
      '24/7 AI virtual assistant',
      'Natural language understanding',
      'SMS reminders & automation',
      'Instant call transfer support',
    ],
    cta: 'Buy Now',
    tier: 'pro',
    popular: true,
  },
  {
    name: 'Pro',
    price: 349,
    minutes: 700,
    callRange: '~175–230 calls/month',
    overage: '$0.20/min',
    description: 'High-volume businesses with consistent call flows.',
    features: [
      '24/7 AI virtual assistant',
      'Natural language understanding',
      'SMS Reminders & automation',
      'Instant call transfer support',
    ],
    cta: 'Buy Now',
    tier: 'elite',
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (tier: string) => {
    try {
      setError(null);
      setLoadingTier(tier);

      // Get auth token - if not authenticated, redirect to signup
      const token = getToken();
      if (!token) {
        router.push('/signup');
        return;
      }

      // Call backend checkout endpoint
      const response = await subscriptionAPI.checkout(tier);

      // Redirect to Stripe checkout
      if (response.data?.checkout_url) {
        window.location.href = response.data.checkout_url;
      } else {
        setError('Failed to initiate checkout. Please try again.');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err?.response?.data?.error || 'Checkout failed. Please try again.');
      setLoadingTier(null);
    }
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="section-spacing bg-slate-900 text-white">
        <div className="container-max text-center">
          <h1 className="heading-xl mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            No hidden fees. No long-term contracts. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-spacing bg-slate-900">
        <div className="container-max">
          {error && (
            <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg text-red-100">
              {error}
            </div>
          )}
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => {
              return (
                <div key={tier.tier} className={`relative ${tier.popular ? 'md:scale-105' : ''}`}>
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className={`rounded-xl border-2 h-full transition-all ${
                    tier.popular
                      ? 'border-blue-600 bg-slate-800 shadow-2xl'
                      : 'border-slate-700 bg-slate-800 hover:shadow-xl'
                  } p-8`}>
                    <h3 className="heading-md text-white mb-2">{tier.name}</h3>
                    
                    <div className="mb-8">
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="heading-lg text-white">${tier.price}</span>
                        <span className="text-slate-400">/month</span>
                      </div>
                      <div className="space-y-2 text-sm text-slate-300 mb-4 pb-4 border-b border-slate-700">
                        <div>
                          <span className="text-slate-400">Handles </span>
                          <span className="text-white font-semibold">{tier.callRange}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">({typeof tier.minutes === 'number' ? tier.minutes : tier.minutes} AI talk minutes included)</span>
                        </div>
                        {tier.overage && (
                          <div>
                            <span className="text-slate-400">Overage: </span>
                            <span className="text-white font-semibold">{tier.overage}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCheckout(tier.tier)}
                      disabled={loadingTier === tier.tier}
                      className={`block w-full text-center py-3 rounded-lg font-semibold transition-all mb-8 ${
                        loadingTier === tier.tier ? 'opacity-75 cursor-not-allowed' : ''
                      } ${
                        tier.popular
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-slate-700 text-white hover:bg-slate-600'
                      }`}
                    >
                      {loadingTier === tier.tier ? 'Loading...' : tier.cta}
                    </button>

                    <div className="space-y-4 mb-6">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex gap-3">
                          <span className="text-blue-400">✓</span>
                          <span className="text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-slate-700 pt-4">
                      <p className="text-slate-400 text-sm"><span className="text-white font-semibold">Perfect for:</span></p>
                      <p className="text-slate-300 text-sm mt-2">{tier.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing bg-slate-900 container-max">
        <h2 className="heading-lg text-center mb-12 text-white">Pricing Questions</h2>
        <div className="max-w-2xl mx-auto space-y-6">
          <details className="bg-slate-800 rounded-xl border border-slate-700 cursor-pointer">
            <summary className="flex items-center justify-between select-none p-6">
              <span className="heading-sm text-white">Can I change plans anytime?</span>
              <span className="text-2xl text-slate-400">+</span>
            </summary>
            <p className="text-slate-300 px-6 pb-6">
              Yes. Upgrade or downgrade anytime. We'll prorate your billing accordingly. No penalties, no extra fees.
            </p>
          </details>

          <details className="bg-slate-800 rounded-xl border border-slate-700 cursor-pointer">
            <summary className="flex items-center justify-between select-none p-6">
              <span className="heading-sm text-white">What happens if I exceed my AI minutes?</span>
              <span className="text-2xl text-slate-400">+</span>
            </summary>
            <p className="text-slate-300 px-6 pb-6">
              Overages are charged per minute: Starter at $0.35/min and Growth at $0.25/min. Pro plan has unlimited minutes. We'll alert you when you're approaching your included minutes.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
