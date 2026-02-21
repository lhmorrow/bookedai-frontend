'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { businessAPI } from '@/lib/api';
import { getToken } from '@/lib/auth';

export default function SuccessPage() {
  const router = useRouter();

  const [status, setStatus] = useState<'loading' | 'provisioning' | 'active' | 'error'>('loading');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    // Poll for provisioning status
    let interval: NodeJS.Timeout;
    let attempts = 0;
    const maxAttempts = 120; // 2 minutes with 1-second checks

    const checkStatus = async () => {
      try {
        const response = await businessAPI.me();
        const onboardingStatus = response.data.onboarding_status;

        setProgress((attempts / maxAttempts) * 100);

        if (onboardingStatus === 'active') {
          setStatus('active');
          clearInterval(interval);
          // Redirect to dashboard after 2 seconds
          setTimeout(() => router.push('/dashboard'), 2000);
        } else if (onboardingStatus === 'provisioning') {
          setStatus('provisioning');
        } else if (onboardingStatus === 'failed') {
          setStatus('error');
          setError('Provisioning failed. Please contact support.');
          clearInterval(interval);
        }

        attempts++;
        if (attempts >= maxAttempts) {
          setStatus('error');
          setError('Provisioning timed out. Please contact support.');
          clearInterval(interval);
        }
      } catch (err: any) {
        console.error('Failed to check status:', err);
        // Continue polling even if there's an error
        attempts++;
        if (attempts >= maxAttempts) {
          setStatus('error');
          setError('Failed to check provisioning status. Please contact support.');
          clearInterval(interval);
        }
      }
    };

    checkStatus();
    interval = setInterval(checkStatus, 1000);

    return () => clearInterval(interval);
  }, [router]);

  if (status === 'error') {
    return (
      <div className="pt-20 pb-12 min-h-screen flex items-center">
        <div className="container-max w-full">
          <div className="max-w-md mx-auto">
            <div className="card text-center">
              <div className="text-4xl mb-4">❌</div>
              <h1 className="heading-sm mb-4">Oops! Something went wrong</h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <div className="space-y-3">
                <Link href="/dashboard" className="btn-primary block">
                  Go to Dashboard
                </Link>
                <a href="mailto:support@bookedai.com" className="btn-ghost block">
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'active') {
    return (
      <div className="pt-20 pb-12 min-h-screen flex items-center">
        <div className="container-max w-full">
          <div className="max-w-md mx-auto">
            <div className="card text-center">
              <div className="text-5xl mb-4 animate-bounce">✓</div>
              <h1 className="heading-sm mb-4">Welcome to BookedAI!</h1>
              <p className="text-gray-600 mb-6">
                Your AI receptionist is now live and ready to answer calls 24/7.
              </p>
              <p className="text-sm text-gray-500 mb-8">Redirecting to your dashboard...</p>
              <Link href="/dashboard" className="btn-primary inline-block">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading / Provisioning state
  return (
    <div className="pt-20 pb-12 min-h-screen flex items-center">
      <div className="container-max w-full">
        <div className="max-w-md mx-auto">
          <div className="card text-center">
            <div className="mb-8">
              <div className="w-16 h-16 mx-auto bg-dark rounded-full flex items-center justify-center mb-4">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
              </div>
            </div>

            <h1 className="heading-sm mb-4">Setting up your account...</h1>
            <p className="text-gray-600 mb-8">
              We're provisioning your phone number and AI assistant. This usually takes 5-10 minutes.
            </p>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-dark h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(progress, 95)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{Math.floor(Math.min(progress, 95))}%</p>
            </div>

            {/* Steps */}
            <div className="space-y-3 text-left mb-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-dark text-white rounded-full flex items-center justify-center text-sm">✓</div>
                <p className="text-sm">Payment confirmed</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-dark text-white rounded-full flex items-center justify-center text-sm animate-pulse">
                  →
                </div>
                <p className="text-sm">Provisioning phone number</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-sm">→</div>
                <p className="text-sm text-gray-500">Configuring AI assistant</p>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center">
              You can close this window. We'll send you an email when everything is ready.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
