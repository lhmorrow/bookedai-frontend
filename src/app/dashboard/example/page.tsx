'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Business {
  id: number;
  name: string;
  slug: string;
  email: string;
  onboarding_status: string;
  telnyx_number?: string;
  vapi_assistant_id?: string;
}

interface Subscription {
  status: string;
  tier: string;
  created_at: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  canceled_at?: string;
}

interface AppointmentStats {
  total_customers: number;
  confirmed_appointments: number;
  pending_appointments: number;
  cancelled_appointments: number;
}

interface Appointment {
  id: number;
  customer_id: number;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  confirmed_slot?: string;
  status: string;
  source: string;
  created_at: string;
  service?: string;
}

const EXAMPLE_BUSINESS: Business = {
  id: 1,
  name: 'Martinez Dental Clinic',
  slug: 'martinez-dental',
  email: 'owner@martinez.com',
  onboarding_status: 'active',
  telnyx_number: '+1 (555) 123-4567',
  vapi_assistant_id: 'assistant_abc123xyz',
};

const EXAMPLE_SUBSCRIPTION: Subscription = {
  status: 'active',
  tier: 'pro',
  created_at: '2026-01-15T10:00:00Z',
  current_period_end: '2026-02-15T10:00:00Z',
  cancel_at_period_end: false,
};

const EXAMPLE_STATS: AppointmentStats = {
  total_customers: 13,
  confirmed_appointments: 5,
  pending_appointments: 4,
  cancelled_appointments: 4,
};

const EXAMPLE_APPOINTMENTS: Appointment[] = [
  { id: 1, customer_id: 1, customer_name: 'Tom Leland', service: 'Furnace Repair', confirmed_slot: '2026-02-16T11:00:00Z', status: 'confirmed', source: 'web', created_at: '2026-02-16T11:00:00Z', customer_email: 'tomleland@hotmail.com', customer_phone: '720-789-4337' },
  { id: 2, customer_id: 2, customer_name: 'Johnson', service: 'Toilet repair', confirmed_slot: '2026-02-16T10:00:00Z', status: 'pending', source: 'web', created_at: '2026-02-16T10:00:00Z', customer_email: 'henryluke368@gmail.com', customer_phone: '432-770-5299' },
  { id: 3, customer_id: 3, customer_name: 'John Booth', service: 'Toilet Repair', confirmed_slot: '2026-02-06T21:00:00Z', status: 'pending', source: 'web', created_at: '2026-02-06T21:00:00Z', customer_email: 'henryluke368@gmail.com', customer_phone: '432-770-0529' },
  { id: 4, customer_id: 4, customer_name: 'Jackson Smith', service: 'Toilet Repair', confirmed_slot: '2026-02-06T20:00:00Z', status: 'pending', source: 'web', created_at: '2026-02-06T20:00:00Z', customer_email: 'henryluke368@gmail.com', customer_phone: '432-770-5290' },
  { id: 5, customer_id: 5, customer_name: 'Allison Smith', service: 'plumbing service', confirmed_slot: '2026-02-06T20:00:00Z', status: 'pending', source: 'web', created_at: '2026-02-06T20:00:00Z', customer_email: 'henryluke368@gmail.com', customer_phone: '432-770-529' },
  { id: 6, customer_id: 6, customer_name: 'Luke Morro', service: 'Toilet repair', confirmed_slot: '2026-02-06T20:00:00Z', status: 'pending', source: 'web', created_at: '2026-02-06T20:00:00Z', customer_email: 'henryluke368@gmail.com', customer_phone: '432-770-5290' },
];

export default function ExampleDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'setup' | 'sms'>('overview');

  const business = EXAMPLE_BUSINESS;
  const subscription = EXAMPLE_SUBSCRIPTION;
  const stats = EXAMPLE_STATS;
  const appointments = EXAMPLE_APPOINTMENTS;

  return (
    <div className="pt-20 pb-12">
      <div className="container-max">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="heading-lg">Dashboard</h1>
            <p className="text-slate-600 mt-2">Preview what you'll see as a customer</p>
          </div>
          <Link href="/" className="btn-ghost">
            Back to Home
          </Link>
        </div>

        {/* Example Mode Banner */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl flex items-start gap-4">
          <div className="text-3xl">✨</div>
          <div className="flex-1">
            <h3 className="font-bold text-blue-900 mb-2 text-lg">Example Dashboard</h3>
            <p className="text-sm text-blue-800 mb-4">
              This is a preview of what your BookedAI dashboard will look like. See live appointment data, customer analytics, and manage your AI receptionist all in one place.
            </p>
            <div className="flex gap-3">
              <Link href="/signup" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold">
                → Create Your Account
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition text-sm font-semibold">
                → Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Status Banner */}
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2">✓ Your account is active!</h3>
          <p className="text-sm text-green-800">
            Your AI receptionist is now answering calls 24/7.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-slate-200">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 border-b-2 font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('setup')}
              className={`py-3 border-b-2 font-semibold transition-colors ${
                activeTab === 'setup'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Phone Setup
            </button>
            <button
              onClick={() => setActiveTab('sms')}
              className={`py-3 border-b-2 font-semibold transition-colors ${
                activeTab === 'sms'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              SMS & Reminders
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div>
              <h2 className="heading-sm mb-6">Appointment Analytics</h2>
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {/* Total Customers */}
                <div className="card bg-gradient-to-br from-blue-50 to-white border-l-4 border-blue-600">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Total Customers</p>
                      <p className="heading-lg text-slate-900">{stats.total_customers}</p>
                    </div>
                    <div className="text-3xl">👥</div>
                  </div>
                </div>

                {/* Confirmed */}
                <div className="card bg-gradient-to-br from-green-50 to-white border-l-4 border-green-600">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">Confirmed</p>
                      <p className="heading-lg text-slate-900">{stats.confirmed_appointments}</p>
                    </div>
                    <div className="text-3xl">✓</div>
                  </div>
                </div>

                {/* Pending */}
                <div className="card bg-gradient-to-br from-amber-50 to-white border-l-4 border-amber-600">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">Pending</p>
                      <p className="heading-lg text-slate-900">{stats.pending_appointments}</p>
                    </div>
                    <div className="text-3xl">⏳</div>
                  </div>
                </div>

                {/* Cancelled */}
                <div className="card bg-gradient-to-br from-red-50 to-white border-l-4 border-red-600">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">Cancelled</p>
                      <p className="heading-lg text-slate-900">{stats.cancelled_appointments}</p>
                    </div>
                    <div className="text-3xl">✕</div>
                  </div>
                </div>
              </div>

              {/* Chart Section */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Status Distribution Pie Chart */}
                <div className="card">
                  <h3 className="heading-sm mb-6">Appointment Status Distribution</h3>
                  <div className="flex items-center justify-center">
                    <div className="relative w-40 h-40">
                      <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                        {(() => {
                          const total = stats.confirmed_appointments + stats.pending_appointments + stats.cancelled_appointments || 1;
                          const confirmedPercent = (stats.confirmed_appointments / total) * 100;
                          const pendingPercent = (stats.pending_appointments / total) * 100;
                          const cancelledPercent = (stats.cancelled_appointments / total) * 100;
                          
                          let offset = 0;
                          
                          return (
                            <>
                              {/* Confirmed */}
                              <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="8"
                                strokeDasharray={`${confirmedPercent * 2.83} 283`}
                                strokeDashoffset={-offset}
                              />
                              {/* Pending */}
                              <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="#f59e0b"
                                strokeWidth="8"
                                strokeDasharray={`${pendingPercent * 2.83} 283`}
                                strokeDashoffset={-(offset + confirmedPercent * 2.83)}
                              />
                              {/* Cancelled */}
                              <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="8"
                                strokeDasharray={`${cancelledPercent * 2.83} 283`}
                                strokeDashoffset={-(offset + confirmedPercent * 2.83 + pendingPercent * 2.83)}
                              />
                            </>
                          );
                        })()}
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-slate-900">
                            {stats.confirmed_appointments + stats.pending_appointments + stats.cancelled_appointments}
                          </p>
                          <p className="text-xs text-slate-600">Total</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                        <span className="text-sm text-slate-600">Confirmed</span>
                      </div>
                      <span className="font-semibold text-slate-900">{stats.confirmed_appointments}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-600"></div>
                        <span className="text-sm text-slate-600">Pending</span>
                      </div>
                      <span className="font-semibold text-slate-900">{stats.pending_appointments}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-600"></div>
                        <span className="text-sm text-slate-600">Cancelled</span>
                      </div>
                      <span className="font-semibold text-slate-900">{stats.cancelled_appointments}</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="card">
                  <h3 className="heading-sm mb-6">Summary</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-900 font-semibold mb-1">Active Customers</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.total_customers}</p>
                      <p className="text-xs text-blue-700 mt-2">Total unique customers who have booked</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="text-sm text-green-900 font-semibold mb-1">Confirmed Bookings</p>
                      <p className="text-2xl font-bold text-green-600">{stats.confirmed_appointments}</p>
                      <p className="text-xs text-green-700 mt-2">Appointments ready and scheduled</p>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <p className="text-sm text-amber-900 font-semibold mb-1">Pending Action</p>
                      <p className="text-2xl font-bold text-amber-600">{stats.pending_appointments}</p>
                      <p className="text-xs text-amber-700 mt-2">Awaiting confirmation from customers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Data Table */}
            <div className="card">
              <h3 className="heading-sm mb-6">Company Data</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">Service</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">Phone</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((apt) => (
                      <tr key={apt.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 text-slate-900">{apt.customer_name || 'N/A'}</td>
                        <td className="py-3 px-4 text-slate-600">{apt.service || 'N/A'}</td>
                        <td className="py-3 px-4 text-slate-600">
                          {apt.confirmed_slot
                            ? new Date(apt.confirmed_slot).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : 'N/A'}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
                              apt.status === 'confirmed'
                                ? 'bg-green-100 text-green-700'
                                : apt.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : apt.status === 'cancelled'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{apt.customer_phone || 'N/A'}</td>
                        <td className="py-3 px-4 text-slate-600 text-xs">
                          {new Date(apt.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Business Info */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="space-y-6">
                  <div className="card">
                    <h2 className="heading-sm mb-6">Business Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-slate-600">Business Name</label>
                        <p className="text-lg text-slate-900">{business.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-600">Business Email</label>
                        <p className="text-lg text-slate-900">{business.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-600">Business Page</label>
                        <p className="text-lg text-blue-600 font-mono">bookedai.com/{business.slug}</p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-600">Status</label>
                        <p className="text-lg">
                          <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                            Active
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {business.telnyx_number && (
                    <div className="card">
                      <h2 className="heading-sm mb-6">Connected Services</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-semibold text-slate-600">Telnyx Phone Number</label>
                          <p className="text-lg text-slate-900 font-mono">{business.telnyx_number}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            This is your business's new AI-powered phone number
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="card">
                  <h2 className="heading-sm mb-6">Subscription</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-600">Plan</label>
                      <p className="text-lg text-slate-900 capitalize font-semibold">{subscription.tier}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-600">Status</label>
                      <p className="text-lg">
                        <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">
                          {subscription.status}
                        </span>
                      </p>
                    </div>
                    {subscription.current_period_end && (
                      <div>
                        <label className="text-sm font-semibold text-slate-600">Renews</label>
                        <p className="text-sm text-slate-900">
                          {new Date(subscription.current_period_end).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    <div className="pt-4 border-t border-slate-200">
                      <Link href="/pricing" className="btn-secondary w-full text-center block">
                        Manage Plan
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phone Setup Tab */}
        {activeTab === 'setup' && (
          <div className="max-w-4xl">
            <div className="space-y-6">
              <div className="card">
                <h2 className="heading-sm mb-4">📞 Phone Setup Instructions</h2>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-blue-900 font-semibold mb-2">Your Telnyx Number:</p>
                  <p className="text-2xl font-mono font-bold text-blue-600">{business.telnyx_number}</p>
                </div>

                <h3 className="heading-md text-lg mb-4">How It Works</h3>
                <p className="text-slate-600 mb-6">
                  Your customers call your main business number. If you don't answer, calls automatically route to the AI receptionist.
                  You can also set up special rules based on time of day, call type, or caller ID.
                </p>

                <div className="space-y-6">
                  <div className="border border-slate-200 rounded-lg p-6">
                    <h4 className="font-semibold text-slate-900 mb-3">Option 1: Enable Call Forwarding (Easiest)</h4>
                    <p className="text-slate-600 mb-4 text-sm">
                      If you have no answer or are unavailable, forward calls to the AI:
                    </p>
                    <div className="bg-slate-50 p-4 rounded font-mono text-sm space-y-3">
                      <div>
                        <p className="font-semibold text-slate-900 mb-2">AT&T:</p>
                        <code className="text-slate-700">**61*{business.telnyx_number}# (then press call)</code>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 mb-2">Verizon:</p>
                        <code className="text-slate-700">*71{business.telnyx_number} (then press call)</code>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 mb-2">T-Mobile:</p>
                        <code className="text-slate-700">**61*{business.telnyx_number}# (then press call)</code>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 mb-2">Cricket:</p>
                        <code className="text-slate-700">*61*{business.telnyx_number}# (then press call)</code>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-4">
                      ℹ️ If done correctly, you won't hear a tone. The menu will appear when done.
                    </p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-semibold text-green-900 mb-3">✓ Why This Works</h4>
                    <ul className="text-sm text-green-900 space-y-2">
                      <li>• When you don't answer, the call goes to voicemail</li>
                      <li>• Your voicemail routing sends it to the Telnyx number</li>
                      <li>• The AI answers and schedules the appointment</li>
                      <li>• You get an SMS notification with the details</li>
                      <li>• Customer receives a booking confirmation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SMS Tab */}
        {activeTab === 'sms' && (
          <div className="max-w-4xl">
            <div className="space-y-6">
              <div className="card">
                <h2 className="heading-sm mb-4">💬 SMS & Reminder Notifications</h2>

                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-4">Your SMS Number</h3>
                    <p className="text-sm text-blue-800 mb-2">
                      The same Telnyx number handles both voice calls AND text messages:
                    </p>
                    <p className="text-2xl font-mono font-bold text-blue-600 my-4">{business.telnyx_number}</p>
                    <p className="text-sm text-blue-800">
                      Customers can text this number to book appointments or get information.
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-6">
                    <h4 className="font-semibold text-slate-900 mb-4">📅 Appointment Reminders (Automatic)</h4>
                    <p className="text-slate-600 mb-4">
                      BookedAI automatically sends SMS reminders to customers about upcoming appointments.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-slate-900 text-sm mb-2">Default Reminder Schedule:</h5>
                        <div className="bg-slate-50 p-4 rounded space-y-2">
                          <p className="text-sm text-slate-700">
                            <strong>24 hours before:</strong> "Hi! Just confirming your appointment tomorrow at 2:00 PM with {business.name}. Reply YES to confirm or CANCEL to reschedule."
                          </p>
                          <p className="text-sm text-slate-700">
                            <strong>1 hour before:</strong> "Hi! Your appointment is in 1 hour at {business.name}. We're looking forward to seeing you!"
                          </p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold text-slate-900 text-sm mb-2">Benefits:</h5>
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li>✓ Reduces no-shows by 40%</li>
                          <li>✓ Customers can confirm or reschedule via SMS</li>
                          <li>✓ Fully automated - no manual effort</li>
                          <li>✓ Improves customer engagement</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-6">
                    <h4 className="font-semibold text-slate-900 mb-4">📤 How BookedAI Contacts Customers</h4>
                    <p className="text-slate-600 mb-4">
                      When a customer books via phone or text, here's what happens:
                    </p>

                    <div className="space-y-3">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                          1
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">Customer calls or texts</p>
                          <p className="text-sm text-slate-600">AI answers and collects booking details</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                          2
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">Booking confirmed</p>
                          <p className="text-sm text-slate-600">You receive SMS on your personal phone with details</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                          3
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">Customer gets confirmation</p>
                          <p className="text-sm text-slate-600">
                            They receive SMS confirmation: "Your appointment is confirmed for [date/time]. Reply to confirm or ask questions."
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                          4
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">Reminder sent</p>
                          <p className="text-sm text-slate-600">24 hours before appointment, customer gets reminder SMS</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
