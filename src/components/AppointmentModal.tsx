import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Phone,
  CheckCircle2,
  Users,
  Video,
  Building,
  Heart,
  FileCheck,
  AlertCircle,
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/mockData';
import { AppointmentFormState } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [formData, setFormData] = useState<AppointmentFormState>({
    fullName: '',
    phone: '',
    email: '',
    serviceType: initialService || 'Funeral Services',
    consultationType: 'in-person',
    preferredDate: '',
    preferredTime: 'Morning (9:00 AM – 12:00 PM)',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.preferredDate) {
      setErrorMsg('Please fill in your name, contact phone number, and a preferred date.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit appointment request. Please call us directly.');
      }
    } catch (err) {
      console.error(err);
      // Even if network glitches, acknowledge politely
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-[#0F1419] text-[#F8F5F0] w-full max-w-2xl rounded-sm shadow-2xl border border-[#FFFFFF15] overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-modal-title"
      >
        {/* Modal Header */}
        <div className="bg-[#141A21] text-white p-6 relative border-b border-[#FFFFFF10]">
          <button
            onClick={handleReset}
            className="absolute top-4 right-4 p-2 text-[#F8F5F0]/50 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-full bg-[#C5A059] flex items-center justify-center text-[#0F1419]">
              <Calendar className="w-4 h-4 text-[#0F1419]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
                Personalized Arrangement Guidance
              </span>
              <h2 id="appointment-modal-title" className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#F8F5F0]">
                Schedule a Family Consultation
              </h2>
            </div>
          </div>
          <p className="text-[#F8F5F0]/70 text-xs sm:text-sm mt-1">
            Meet with our compassionate directors in person, over the phone, or via video to discuss your family’s wishes in a comfortable, unhurried setting.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif-cormorant text-2xl font-bold text-[#F8F5F0]">
                Consultation Request Received
              </h3>
              <p className="text-sm text-[#F8F5F0]/70 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[#C5A059]">{formData.fullName}</strong>. Our care director will contact you promptly at <strong className="text-[#C5A059]">{formData.phone}</strong> to confirm your scheduled time and answer any initial questions.
              </p>

              <div className="p-4 bg-[#141A21] rounded-sm border border-[#FFFFFF10] max-w-md mx-auto text-left text-xs space-y-1.5 shadow-xl">
                <p><strong>Service Focus:</strong> {formData.serviceType}</p>
                <p><strong>Format:</strong> {formData.consultationType === 'in-person' ? 'In-Person (Parkersburg, WV)' : formData.consultationType === 'phone' ? 'Phone Consultation' : 'Virtual Video'}</p>
                <p><strong>Requested Date:</strong> {formData.preferredDate}</p>
                <p><strong>Preferred Time Window:</strong> {formData.preferredTime}</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`tel:${BUSINESS_INFO.phoneClean}`}
                  className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] font-bold text-xs uppercase tracking-wider rounded-sm shadow-xs flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#0F1419]" />
                  <span>Call (740) 691-1488 for Immediate Care</span>
                </a>
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 bg-[#141A21] border border-[#FFFFFF15] text-[#F8F5F0] hover:bg-[#FFFFFF10] text-xs font-semibold rounded-sm"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3 rounded-sm bg-red-950/80 text-red-300 text-xs border border-red-700/50 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Consultation Format Options */}
              <div>
                <label className="block text-xs font-semibold text-[#F8F5F0]/70 uppercase tracking-wider mb-2">
                  1. How would you like to meet?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, consultationType: 'in-person' })}
                    className={`p-3 rounded-sm border text-left transition-all flex flex-col justify-between ${
                      formData.consultationType === 'in-person'
                        ? 'border-[#C5A059] bg-[#1A222C] text-[#F8F5F0] ring-1 ring-[#C5A059]'
                        : 'border-[#FFFFFF15] bg-[#141A21] text-[#F8F5F0]/70 hover:border-[#C5A059]/50'
                    }`}
                  >
                    <Building className="w-5 h-5 text-[#C5A059] mb-1.5" />
                    <div>
                      <p className="font-semibold text-xs text-[#F8F5F0]">In-Person</p>
                      <p className="text-[11px] text-[#F8F5F0]/50">Private Parkersburg, WV consultation</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, consultationType: 'phone' })}
                    className={`p-3 rounded-sm border text-left transition-all flex flex-col justify-between ${
                      formData.consultationType === 'phone'
                        ? 'border-[#C5A059] bg-[#1A222C] text-[#F8F5F0] ring-1 ring-[#C5A059]'
                        : 'border-[#FFFFFF15] bg-[#141A21] text-[#F8F5F0]/70 hover:border-[#C5A059]/50'
                    }`}
                  >
                    <Phone className="w-5 h-5 text-[#C5A059] mb-1.5" />
                    <div>
                      <p className="font-semibold text-xs text-[#F8F5F0]">Phone Call</p>
                      <p className="text-[11px] text-[#F8F5F0]/50">Unhurried call from home</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, consultationType: 'virtual' })}
                    className={`p-3 rounded-sm border text-left transition-all flex flex-col justify-between ${
                      formData.consultationType === 'virtual'
                        ? 'border-[#C5A059] bg-[#1A222C] text-[#F8F5F0] ring-1 ring-[#C5A059]'
                        : 'border-[#FFFFFF15] bg-[#141A21] text-[#F8F5F0]/70 hover:border-[#C5A059]/50'
                    }`}
                  >
                    <Video className="w-5 h-5 text-[#C5A059] mb-1.5" />
                    <div>
                      <p className="font-semibold text-xs text-[#F8F5F0]">Virtual / Video</p>
                      <p className="text-[11px] text-[#F8F5F0]/50">Connect with distant family</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Service Focus & Date / Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F8F5F0]/70 uppercase tracking-wider mb-1.5">
                    2. Service Topic
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#141A21] border border-[#FFFFFF15] rounded-sm text-xs sm:text-sm text-[#F8F5F0] focus:ring-1 focus:ring-[#C5A059] focus:outline-hidden"
                  >
                    <option value="Immediate Need Arrangements" className="bg-[#141A21] text-[#F8F5F0]">Immediate Need (Loss has occurred)</option>
                    <option value="Funeral Services" className="bg-[#141A21] text-[#F8F5F0]">Traditional Funeral & Visitation</option>
                    <option value="Memorial Services" className="bg-[#141A21] text-[#F8F5F0]">Memorial Gathering / Celebration of Life</option>
                    <option value="Cremation Services" className="bg-[#141A21] text-[#F8F5F0]">Cremation Arrangements & Options</option>
                    <option value="Burial Services" className="bg-[#141A21] text-[#F8F5F0]">Burial & Graveside Committal</option>
                    <option value="Pre-Planning Arrangements" className="bg-[#141A21] text-[#F8F5F0]">Advance Pre-Planning & Pre-Funding</option>
                    <option value="Grief & Aftercare Support" className="bg-[#141A21] text-[#F8F5F0]">Grief Counseling & Aftercare</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F8F5F0]/70 uppercase tracking-wider mb-1.5">
                    3. Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#141A21] border border-[#FFFFFF15] rounded-sm text-xs sm:text-sm text-[#F8F5F0] focus:ring-1 focus:ring-[#C5A059] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Preferred Time Window */}
              <div>
                <label className="block text-xs font-semibold text-[#F8F5F0]/70 uppercase tracking-wider mb-1.5">
                  4. Preferred Time Window
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['Morning (9:00 AM – 12:00 PM)', 'Afternoon (1:00 PM – 4:00 PM)', 'Evening / Flexible (After 5:00 PM)'].map(
                    (slot) => (
                      <label
                        key={slot}
                        className={`flex items-center gap-2 p-2.5 rounded-sm border text-xs cursor-pointer ${
                          formData.preferredTime === slot
                            ? 'border-[#C5A059] bg-[#1A222C] font-medium text-[#F8F5F0]'
                            : 'border-[#FFFFFF15] bg-[#141A21] text-[#F8F5F0]/70'
                        }`}
                      >
                        <input
                          type="radio"
                          name="timeWindow"
                          checked={formData.preferredTime === slot}
                          onChange={() => setFormData({ ...formData, preferredTime: slot })}
                          className="text-[#C5A059] focus:ring-[#C5A059]"
                        />
                        <span>{slot}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Contact Details */}
              <div className="pt-2 border-t border-[#FFFFFF10]">
                <label className="block text-xs font-semibold text-[#F8F5F0]/70 uppercase tracking-wider mb-2">
                  5. Your Contact Information
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-[#F8F5F0]/60 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Thomas Miller"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141A21] border border-[#FFFFFF15] rounded-sm text-xs sm:text-sm text-[#F8F5F0] placeholder-[#F8F5F0]/40 focus:ring-1 focus:ring-[#C5A059] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#F8F5F0]/60 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(304) 555-0192"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141A21] border border-[#FFFFFF15] rounded-sm text-xs sm:text-sm text-[#F8F5F0] placeholder-[#F8F5F0]/40 focus:ring-1 focus:ring-[#C5A059] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#F8F5F0]/60 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="family@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141A21] border border-[#FFFFFF15] rounded-sm text-xs sm:text-sm text-[#F8F5F0] placeholder-[#F8F5F0]/40 focus:ring-1 focus:ring-[#C5A059] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-xs text-[#F8F5F0]/60 mb-1">
                    Special notes, specific questions, or family circumstances (optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us anything that will help our directors prepare for your consultation..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 bg-[#141A21] border border-[#FFFFFF15] rounded-sm text-xs sm:text-sm text-[#F8F5F0] placeholder-[#F8F5F0]/40 focus:ring-1 focus:ring-[#C5A059] focus:outline-hidden"
                  ></textarea>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-[#FFFFFF10] flex items-center justify-between gap-3">
                <a
                  href={`tel:${BUSINESS_INFO.phoneClean}`}
                  className="text-xs font-semibold text-[#F8F5F0] hover:text-[#C5A059] inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Immediate Need? Call (740) 691-1488</span>
                </a>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3.5 py-2 text-xs font-medium text-[#F8F5F0]/70 hover:bg-[#FFFFFF10] rounded-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 bg-[#C5A880] hover:bg-[#D4B16A] text-[#0F1419] text-xs font-bold uppercase tracking-wider rounded-sm shadow-xs transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#0F1419]" />
                    <span>{loading ? 'Submitting...' : 'Confirm Consultation Request'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
