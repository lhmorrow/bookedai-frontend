'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';
import LoadingSpinner from './LoadingSpinner';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthed(true);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthed) {
    return null;
  }

  return <>{children}</>;
}
