'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="section-spacing bg-gradient-to-b from-white via-blue-50 to-white pt-32">
        <div className="container-max text-center">
          <div className="mb-8 inline-block">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              24/7 AI RECEPTIONIST FOR SMALL BUSINESS
            </span>
          </div>
          
          <h1 className="heading-xl gradient-text mb-8 leading-tight">
            Never miss a<br />customer lead again.
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Boost revenue with a virtual pro that handles your scheduling, answers questions, and confirms jobs—while you're on site or off the clock.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-primary text-lg px-8 py-4">
              Buy Now
            </Link>
            <Link href="/dashboard/example" className="btn-secondary text-lg px-8 py-4">
              See the Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="section-spacing container-max">
        <h2 className="heading-lg text-center mb-12">Why BookedAI?</h2>
        <div className="grid-auto">
          <div className="card">
            <div className="w-12 h-12 bg-blue-600 rounded-lg mb-4 flex items-center justify-center text-white text-xl">
              ☎️
            </div>
            <h3 className="heading-sm mb-3">24/7 Availability</h3>
            <p className="text-slate-600">
              Answer calls anytime, even after hours. Never lose a customer due to a missed call.
            </p>
          </div>

          <div className="card">
            <div className="w-12 h-12 bg-blue-600 rounded-lg mb-4 flex items-center justify-center text-white text-xl">
              📅
            </div>
            <h3 className="heading-sm mb-3">Smart Scheduling</h3>
            <p className="text-slate-600">
              Customers book appointments directly through the AI. No human coordination needed.
            </p>
          </div>

          <div className="card">
            <div className="w-12 h-12 bg-blue-600 rounded-lg mb-4 flex items-center justify-center text-white text-xl">
              💬
            </div>
            <h3 className="heading-sm mb-3">SMS Integration</h3>
            <p className="text-slate-600">
              Automated reminders reduce no-shows by up to 40%. Keep customers informed effortlessly.
            </p>
          </div>

          <div className="card">
            <div className="w-12 h-12 bg-blue-600 rounded-lg mb-4 flex items-center justify-center text-white text-xl">
              🤖
            </div>
            <h3 className="heading-sm mb-3">Powered by AI</h3>
            <p className="text-slate-600">
              Advanced NLP understands context and customer intent. Feels like a real receptionist.
            </p>
          </div>

          <div className="card">
            <div className="w-12 h-12 bg-blue-600 rounded-lg mb-4 flex items-center justify-center text-white text-xl">
              🔌
            </div>
            <h3 className="heading-sm mb-3">Built-in Integrations</h3>
            <p className="text-slate-600">
              Connect to Stripe, Telnyx, VAPI, and more. Works with your existing tools.
            </p>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing container-max">
        <h2 className="heading-lg text-center mb-12">Common Questions</h2>
        <div className="max-w-2xl mx-auto space-y-6">
          <details className="card cursor-pointer">
            <summary className="flex items-center justify-between select-none">
              <span className="heading-sm">How long does it take to set up?</span>
              <span className="text-2xl">+</span>
            </summary>
            <p className="text-slate-600 mt-4 leading-relaxed">
              Setup takes about 10 minutes. We'll walk you through connecting your phone number, setting your business hours, and configuring your appointment slots. You can be live in minutes.
            </p>
          </details>

          <details className="card cursor-pointer">
            <summary className="flex items-center justify-between select-none">
              <span className="heading-sm">What phone systems do you support?</span>
              <span className="text-2xl">+</span>
            </summary>
            <p className="text-slate-600 mt-4 leading-relaxed">
              We work with any phone number. Our AI answers calls to your existing business number and can transfer calls to you, voicemail, or another line anytime.
            </p>
          </details>

          <details className="card cursor-pointer">
            <summary className="flex items-center justify-between select-none">
              <span className="heading-sm">Can I customize what the AI says?</span>
              <span className="text-2xl">+</span>
            </summary>
            <p className="text-slate-600 mt-4 leading-relaxed">
              Absolutely. You can customize the greeting, appointment rules, follow-up messages, and more. The AI adapts to your business's specific needs.
            </p>
          </details>

          <details className="card cursor-pointer">
            <summary className="flex items-center justify-between select-none">
              <span className="heading-sm">What if I need help?</span>
              <span className="text-2xl">+</span>
            </summary>
            <p className="text-slate-600 mt-4 leading-relaxed">
              Our support team is available via email and SMS. We also provide onboarding for setup to ensure you get the most out of BookedAI.
            </p>
          </details>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-spacing bg-slate-900 text-white">
        <div className="container-max text-center">
          <h2 className="heading-lg mb-6">Ready to Stop Missing Calls?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that have eliminated missed appointments and reduced no-shows.
          </p>
          <Link href="/signup" className="bg-white text-slate-900 font-semibold px-8 py-4 rounded-lg hover:bg-slate-100 transition inline-block text-lg">
            Buy Now
          </Link>
        </div>
      </section>
    </div>
  );
}
