'use client';

import Link from 'next/link';

interface PricingCardProps {
  name: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  href: string;
  popular?: boolean;
}

export default function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  href,
  popular = false,
}: PricingCardProps) {
  return (
    <div
      className={`card relative transition-all duration-300 ${
        popular ? 'md:scale-105 ring-2 ring-dark shadow-2xl' : ''
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-dark text-white px-3 py-1 rounded-full text-xs font-semibold">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="heading-sm mb-2">{name}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      <div className="mb-6">
        <span className="heading-lg">${price}</span>
        <span className="text-gray-600">/month</span>
      </div>

      <Link href={href} className={`w-full ${popular ? 'btn-primary' : 'btn-secondary'} mb-8`}>
        {cta}
      </Link>

      <div className="border-t border-gray-200 pt-6">
        <ul className="space-y-4">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
