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
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';
import { ContactFormState } from '../types';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry / Service Question',
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
          subject: 'General Inquiry / Service Question',
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
            Connect with Our Directors
          </span>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F5F0] tracking-tight">
            We Are Here For Your Family Day & Night
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mt-4 mb-6"></div>
          <p className="text-base sm:text-lg text-[#F8F5F0]/75 leading-relaxed font-normal">
            Whether you have an immediate need, wish to ask about upcoming services, or want to discuss advance pre-planning, please reach out to Bakers Golden Gate at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Information & Location Notice */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0F1419] text-white rounded-sm p-8 shadow-xl border border-[#FFFFFF10] space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold block mb-1">
                  Mortuary & Memorial Services
                </span>
                <h3 className="font-serif-cormorant text-3xl font-bold text-[#F8F5F0]">
                  Bakers Golden Gate
                </h3>
                <p className="text-xs text-[#F8F5F0]/60 mt-1">Parkersburg, West Virginia</p>
              </div>

              {/* 24/7 Telephone */}
              <div className="p-4 rounded-sm bg-[#141A21] border border-[#FFFFFF10] space-y-1">
                <span className="text-xs text-[#C5A059] font-medium block">24/7 Immediate & General Line</span>
                <a
                  id="contact-phone-primary"
                  href={`tel:${BUSINESS_INFO.phoneClean}`}
                  className="font-serif-cormorant text-2xl font-bold text-[#F8F5F0] hover:text-[#C5A059] transition-colors flex items-center gap-2.5"
                >
                  <Phone className="w-5 h-5 text-[#C5A059]" />
                  <span>(740) 691-1488</span>
                </a>
                <p className="text-[11px] text-[#F8F5F0]/50">Tap to call directly from mobile or desktop</p>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <span className="text-xs text-[#F8F5F0]/50 block">Direct Email Inquiries</span>
                <a
                  id="contact-email-link"
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-sm sm:text-base font-medium text-[#F8F5F0]/80 hover:text-[#C5A059] transition-colors flex items-center gap-2 break-all"
                >
                  <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>{BUSINESS_INFO.email}</span>
                </a>
              </div>

              {/* Location & Coverage */}
              <div className="space-y-1 pt-2 border-t border-[#FFFFFF10]">
                <span className="text-xs text-[#F8F5F0]/50 block">Location & Service Area</span>
                <div className="flex items-start gap-2 text-sm text-[#F8F5F0]/80">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#F8F5F0]">Parkersburg, WV</p>
                    <p className="text-xs text-[#F8F5F0]/60 mt-1 leading-relaxed">
                      {BUSINESS_INFO.addressNote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="space-y-1 pt-2 border-t border-[#FFFFFF10] text-xs text-[#F8F5F0]/70">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#F8F5F0]">Immediate Needs: 24/7/365</p>
                    <p className="text-[#F8F5F0]/50 text-[11px]">{BUSINESS_INFO.officeHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Map Graphic & Notice Card */}
            <div className="bg-[#0F1419] rounded-sm p-6 border border-[#FFFFFF10] shadow-xl space-y-3">
              <h4 className="font-serif-cormorant text-xl font-bold text-[#F8F5F0] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span>Mid-Ohio Valley Regional Service Area</span>
              </h4>
              <p className="text-xs text-[#F8F5F0]/70 leading-relaxed">
                Centered in Parkersburg, West Virginia, we proudly serve families across Wood County, Pleasants County, Jackson County, Washington County (OH), and surrounding communities.
              </p>
              <div className="h-36 rounded-sm bg-[#141A21] border border-[#FFFFFF10] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-[#1A222C] text-[#C5A059] border border-[#C5A059]/30 flex items-center justify-center mb-2 shadow-xs">
                  <Building className="w-5 h-5" />
                </div>
                <p className="font-serif-cormorant text-base font-bold text-[#F8F5F0]">
                  Parkersburg, West Virginia
                </p>
                <p className="text-[11px] text-[#F8F5F0]/60 mt-0.5">
                  Please call <strong className="text-[#C5A059]">(740) 691-1488</strong> for direct facility arrangements and appointment navigation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0F1419] rounded-sm p-8 sm:p-10 border border-[#FFFFFF10] shadow-xl">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold block mb-1">
                Send an Online Message
              </span>
              <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#F8F5F0] mb-2">
                How May We Assist You?
              </h3>
              <p className="text-xs sm:text-sm text-[#F8F5F0]/70 mb-8 leading-relaxed">
                Fill out the form below, and a compassionate staff member will reply promptly. For urgent matters or deaths that have just occurred, please call <strong className="text-[#C5A059]">740-691-1488</strong> for immediate response.
              </p>

              {success ? (
                <div className="p-6 rounded-sm bg-emerald-950/80 border border-emerald-700/50 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-900/50 text-emerald-300 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif-cormorant text-2xl font-bold text-emerald-200">
                    Message Successfully Sent
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-300 leading-relaxed max-w-md mx-auto">
                    Thank you for reaching out to Bakers Golden Gate. We have received your inquiry and our directors will be in touch with you shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] font-bold text-xs uppercase tracking-wider rounded-sm shadow-xs transition-colors mt-2"
                  >
                    Send Another Message
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
                        Your Full Name *
                      </label>
                      <input
                        id="contact-name-input"
                        type="text"
                        required
                        placeholder="e.g. Robert Jackson"
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
                        placeholder="(740) 555-0144"
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
                        placeholder="youremail@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#141A21] border border-[#FFFFFF15] rounded-sm text-sm text-[#F8F5F0] placeholder-[#F8F5F0]/40 focus:ring-1 focus:ring-[#C5A059] focus:border-transparent focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#F8F5F0]/70 mb-1">
                        Inquiry Topic
                      </label>
                      <select
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#141A21] border border-[#FFFFFF15] rounded-sm text-sm text-[#F8F5F0] focus:ring-1 focus:ring-[#C5A059] focus:border-transparent focus:outline-hidden"
                      >
                        <option value="General Inquiry / Service Question" className="bg-[#141A21] text-[#F8F5F0]">General Inquiry / Question</option>
                        <option value="Immediate Need Assistance" className="bg-[#141A21] text-[#F8F5F0]">Immediate Need Assistance</option>
                        <option value="Funeral & Memorial Planning" className="bg-[#141A21] text-[#F8F5F0]">Funeral & Memorial Planning</option>
                        <option value="Cremation Inquiries" className="bg-[#141A21] text-[#F8F5F0]">Cremation Inquiries</option>
                        <option value="Advance Pre-Planning" className="bg-[#141A21] text-[#F8F5F0]">Advance Pre-Planning</option>
                        <option value="Grief & Aftercare Resources" className="bg-[#141A21] text-[#F8F5F0]">Grief & Aftercare Resources</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#F8F5F0]/70 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      id="contact-message-input"
                      required
                      rows={4}
                      placeholder="Please share how we can assist you or any questions you may have..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#141A21] border border-[#FFFFFF15] rounded-sm text-sm text-[#F8F5F0] placeholder-[#F8F5F0]/40 focus:ring-1 focus:ring-[#C5A059] focus:border-transparent focus:outline-hidden"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-[#F8F5F0]/50">
                      Your information is held in strict privacy and confidentiality.
                    </p>
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-6 py-3 bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] text-xs uppercase tracking-wider font-bold rounded-sm shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 text-[#0F1419]" />
                      <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
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
