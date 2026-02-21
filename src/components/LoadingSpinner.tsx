'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-dark mb-4">
          <div className="w-8 h-8 border-3 border-gray-300 border-t-white rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
