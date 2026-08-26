import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Building,
  Heart,
  ShieldCheck,
  Navigation,
  Truck,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';
import { ContactFormState } from '../types';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    subject: 'Mortuary Transportation & Dispatch Request',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim() || !formState.message.trim()) {
      setErrorMessage('Please provide your name, phone number, and a message.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setFormState({
          name: '',
          email: '',
          phone: '',
          subject: 'Mortuary Transportation & Dispatch Request',
          message: '',
        });
      } else {
        setErrorMessage(data.error || 'Unable to submit your message. Please call us directly.');
      }
    } catch (err) {
      console.error(err);
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#141A21] border-b border-[#FFFFFF10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase block mb-2">
            24/7 Dispatch & Inquiries
          </span>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F5F0] tracking-tight">
            Contact Baker’s Golden Gate Mortuary Transportation
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4 mb-6"></div>
          <p className="text-base sm:text-lg text-[#F8F5F0]/75 leading-relaxed font-normal">
            We are on call 24 hours a day, 7 days a week, 365 days a year. Whether you need immediate decedent transport, an inter-facility transfer, or trade service rates, contact us anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Information & Location Notice */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0F1419] text-white rounded-sm p-8 shadow-xl border border-[#FFFFFF10] space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold block mb-1">
                  Licensed Mortuary Transportation
                </span>
                <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#F8F5F0]">
                  Baker’s Golden Gate
                </h3>
                <p className="text-xs text-[#C5A059] font-semibold mt-1">
                  License: WV 2455-5536 • Thomas Baker, Founder
                </p>
              </div>

              {/* 24/7 Telephone */}
              <div className="p-4 rounded-sm bg-[#141A21] border border-[#FFFFFF10] space-y-1">
                <span className="text-xs text-[#C5A059] font-medium block">24/7 Dispatch & Immediate Line</span>
                <a
                  id="contact-phone-primary"
                  href={`tel:${BUSINESS_INFO.phoneClean}`}
                  className="font-serif-cormorant text-2xl font-bold text-[#F8F5F0] hover:text-[#C5A059] transition-colors flex items-center gap-2.5"
                >
                  <Phone className="w-5 h-5 text-[#C5A059]" />
                  <span>740 – 691 – 1488</span>
                </a>
                <p className="text-[11px] text-[#F8F5F0]/50">Tap to call our on-duty transport coordinator</p>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <span className="text-xs text-[#F8F5F0]/50 block">Official Dispatch Email</span>
                <a
                  id="contact-email-link"
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-sm sm:text-base font-medium text-[#F8F5F0]/90 hover:text-[#C5A059] transition-colors flex items-center gap-2 break-all"
                >
                  <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>{BUSINESS_INFO.email}</span>
                </a>
              </div>

              {/* Physical Location */}
              <div className="space-y-1 pt-2 border-t border-[#FFFFFF10]">
                <span className="text-xs text-[#F8F5F0]/50 block">Headquarters & Operating Base</span>
                <div className="flex items-start gap-2 text-sm text-[#F8F5F0]/80">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#F8F5F0]">2607 Bartlett Street</p>
                    <p className="text-xs text-[#F8F5F0]/70 mt-0.5">Parkersburg, WV 26104</p>
                    <p className="text-xs text-[#F8F5F0]/50 mt-1 leading-relaxed">
                      Central dispatch location serving Wood County, statewide West Virginia, Ohio, and surrounding inter-state transport routes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="space-y-1 pt-2 border-t border-[#FFFFFF10] text-xs text-[#F8F5F0]/70">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#F8F5F0]">24 Hours a Day / 7 Days a Week</p>
                    <p className="text-[#F8F5F0]/50 text-[11px]">365 Days a Year Immediate Response</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Transport Hub Card */}
            <div className="bg-[#0F1419] rounded-sm p-6 border border-[#FFFFFF10] shadow-xl space-y-3">
              <h4 className="font-serif-cormorant text-xl font-bold text-[#F8F5F0] flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C5A059]" />
                <span>Service Coverage Area</span>
              </h4>
              <p className="text-xs text-[#F8F5F0]/70 leading-relaxed">
                Operating out of Parkersburg, WV with licensed capabilities across West Virginia, Ohio, airport transfers (83” limit), body donation facilities, and medical examiner routes.
              </p>
              <div className="h-32 rounded-sm bg-[#141A21] border border-[#FFFFFF10] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                <div className="w-9 h-9 rounded-full bg-[#1A222C] text-[#C5A059] border border-[#C5A059]/30 flex items-center justify-center mb-1.5 shadow-xs">
                  <Building className="w-4 h-4" />
                </div>
                <p className="font-serif-cormorant text-base font-bold text-[#F8F5F0]">
                  2607 Bartlett Street, Parkersburg, WV 26104
                </p>
                <p className="text-[11px] text-[#C5A059] mt-0.5 font-medium">
                  WV 2455-5536 • 740 – 691 – 1488
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Dispatch Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0F1419] rounded-sm p-8 sm:p-10 border border-[#FFFFFF10] shadow-xl">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold block mb-1">
                Dispatch Request & Inquiries
              </span>
              <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#F8F5F0] mb-2">
                How Can We Assist Your Organization or Family?
              </h3>
              <p className="text-xs sm:text-sm text-[#F8F5F0]/70 mb-8 leading-relaxed">
                Send your transfer request or inquiry below. For urgent decedent removals or hospital house calls requiring immediate response, call <strong className="text-[#C5A059]">740 – 691 – 1488</strong> directly.
              </p>

              {success ? (
                <div className="p-6 rounded-sm bg-emerald-950/80 border border-emerald-700/50 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-900/50 text-emerald-300 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif-cormorant text-2xl font-bold text-emerald-200">
                    Inquiry Received
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-300 leading-relaxed max-w-md mx-auto">
                    Thank you for contacting Baker’s Golden Gate Mortuary Transportation LLC. Our logistics coordinator will review your request and get in touch promptly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] font-bold text-xs uppercase tracking-wider rounded-sm shadow-xs transition-colors mt-2"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-sm bg-red-950/80 text-red-300 text-xs border border-red-700/50 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#F8F5F0]/70 mb-1">
                        Your Name / Organization Contact *
                      </label>
                      <input
                        id="contact-name-input"
                        type="text"
                        required
                        placeholder="e.g. Funeral Director / Family Rep"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#141A21] border border-[#FFFFFF15] rounded-sm text-sm text-[#F8F5F0] placeholder-[#F8F5F0]/40 focus:ring-1 focus:ring-[#C5A059] focus:border-transparent focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#F8F5F0]/70 mb-1">
                        Phone Number *
                      </label>
                      <input
                        id="contact-phone-input"
                        type="tel"
                        required
                        placeholder="740 – 555 – 0199"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#141A21] border border-[#FFFFFF15] rounded-sm text-sm text-[#F8F5F0] placeholder-[#F8F5F0]/40 focus:ring-1 focus:ring-[#C5A059] focus:border-transparent focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#F8F5F0]/70 mb-1">
                        Email Address (optional)
                      </label>
                      <input
                        id="contact-email-input"
                        type="email"
                        placeholder="director@facility.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#141A21] border border-[#FFFFFF15] rounded-sm text-sm text-[#F8F5F0] placeholder-[#F8F5F0]/40 focus:ring-1 focus:ring-[#C5A059] focus:border-transparent focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#F8F5F0]/70 mb-1">
                        Transport Service Category
                      </label>
                      <select
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#141A21] border border-[#FFFFFF15] rounded-sm text-sm text-[#F8F5F0] focus:ring-1 focus:ring-[#C5A059] focus:border-transparent focus:outline-hidden"
                      >
                        <option value="House Call Removal" className="bg-[#141A21] text-[#F8F5F0]">House Call Removal</option>
                        <option value="Hospital / Nursing Home Removal" className="bg-[#141A21] text-[#F8F5F0]">Hospital / Nursing Home Removal</option>
                        <option value="Local / Long Distance Transports" className="bg-[#141A21] text-[#F8F5F0]">Local / Long Distance Transports</option>
                        <option value="Funeral Home to Funeral Home (cot, 83” limit)" className="bg-[#141A21] text-[#F8F5F0]">Funeral Home to Funeral Home (cot, 83” limit)</option>
                        <option value="Funeral Home to Crematory (83” limit)" className="bg-[#141A21] text-[#F8F5F0]">Funeral Home to Crematory (83” limit)</option>
                        <option value="Coroner’s Office & Medical Examiner Transport" className="bg-[#141A21] text-[#F8F5F0]">Coroner’s Office & Medical Examiner Transport</option>
                        <option value="Transport to Body Donation Facilities" className="bg-[#141A21] text-[#F8F5F0]">Transport to Body Donation Facilities</option>
                        <option value="Private Transport for Families" className="bg-[#141A21] text-[#F8F5F0]">Private Transport for Families</option>
                        <option value="Airport Transports (83” limit)" className="bg-[#141A21] text-[#F8F5F0]">Airport Transports (83” limit)</option>
                        <option value="General Mortuary Logistics Inquiry" className="bg-[#141A21] text-[#F8F5F0]">General Mortuary Logistics Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#F8F5F0]/70 mb-1">
                      Transport Details / Pickup & Destination Notes *
                    </label>
                    <textarea
                      id="contact-message-input"
                      required
                      rows={4}
                      placeholder="Please specify pickup location, destination facility, timing requirements, and any special considerations..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#141A21] border border-[#FFFFFF15] rounded-sm text-sm text-[#F8F5F0] placeholder-[#F8F5F0]/40 focus:ring-1 focus:ring-[#C5A059] focus:border-transparent focus:outline-hidden"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-[#F8F5F0]/50">
                      All dispatch inquiries are handled under strict confidentiality and professional protocol.
                    </p>
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-6 py-3 bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] text-xs uppercase tracking-wider font-bold rounded-sm shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 text-[#0F1419]" />
                      <span>{loading ? 'Submitting...' : 'Submit Transport Request'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

