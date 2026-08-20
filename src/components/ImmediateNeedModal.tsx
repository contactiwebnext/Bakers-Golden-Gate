import React from 'react';
import { X, Phone, Heart, FileText, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface ImmediateNeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAppointment: () => void;
}

export const ImmediateNeedModal: React.FC<ImmediateNeedModalProps> = ({
  isOpen,
  onClose,
  onOpenAppointment,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-[#0F1419] text-[#F8F5F0] w-full max-w-2xl rounded-sm shadow-2xl border border-[#FFFFFF15] overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="immediate-need-title"
      >
        {/* Modal Header */}
        <div className="bg-[#141A21] text-white p-6 relative border-b border-[#FFFFFF10]">
          <button
            id="close-immediate-need-modal"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#F8F5F0]/50 hover:text-white rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-red-950/80 border border-red-700/50 flex items-center justify-center text-red-400">
              <Heart className="w-5 h-5 fill-red-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">Immediate Assistance</span>
              <h2 id="immediate-need-title" className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#F8F5F0]">
                What To Do When a Loss Has Occurred
              </h2>
            </div>
          </div>
          <p className="text-[#F8F5F0]/70 text-sm mt-2">
            Please know that you do not have to walk through these hours alone. Our directors in Parkersburg, WV are available right now.
          </p>
        </div>

        {/* Modal Body - 3 Clear Immediate Steps */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Step 1 */}
          <div className="flex gap-4 items-start p-4 rounded-sm bg-[#141A21] border border-[#FFFFFF10] shadow-xl">
            <div className="w-8 h-8 rounded-full bg-[#C5A059] text-[#0F1419] font-bold flex items-center justify-center shrink-0 text-base">
              1
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-semibold text-base text-[#F8F5F0]">First: Official Medical Notification</h3>
              <p className="text-[#F8F5F0]/70 leading-relaxed">
                If passing occurs at home under hospice or palliative care, notify the attending nurse first. If passing was unexpected, call 911 immediately. If in a hospital or care facility, the staff will notify attending medical staff.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 items-start p-4 rounded-sm bg-[#1A222C] border border-[#C5A059]/40 shadow-xl">
            <div className="w-8 h-8 rounded-full bg-[#0F1419] text-[#C5A059] border border-[#C5A059]/40 font-bold flex items-center justify-center shrink-0 text-base">
              2
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="font-semibold text-base text-[#F8F5F0]">Second: Call Bakers Golden Gate (24/7)</h3>
              <p className="text-[#F8F5F0]/80 leading-relaxed">
                Call our direct family line at <strong className="text-[#C5A059] font-bold">(740) 691-1488</strong>. We will arrange gentle, dignified transport of your loved one into our protective care and help you coordinate the next steps unhurriedly.
              </p>
              <a
                id="modal-direct-call-btn"
                href={`tel:${BUSINESS_INFO.phoneClean}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-900/80 hover:bg-red-800 text-red-100 font-bold text-xs uppercase tracking-wider rounded-sm shadow-xs border border-red-700/50 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call (740) 691-1488 Now</span>
              </a>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 items-start p-4 rounded-sm bg-[#141A21] border border-[#FFFFFF10] shadow-xl">
            <div className="w-8 h-8 rounded-full bg-[#C5A059] text-[#0F1419] font-bold flex items-center justify-center shrink-0 text-base">
              3
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-semibold text-base text-[#F8F5F0]">Third: Gather Initial Documents (When Ready)</h3>
              <p className="text-[#F8F5F0]/70 leading-relaxed mb-2">
                When you are ready for your arrangement conference, it is helpful to bring or prepare:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#F8F5F0]/80">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                  <span>Social Security Number</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                  <span>Date & Place of Birth</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                  <span>Parents' Names & Mother's Maiden</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                  <span>Military Discharge (DD-214) if veteran</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                  <span>Recent Photo for Memorial/Obituary</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                  <span>Any pre-arranged planning papers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#141A21] border-t border-[#FFFFFF10] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenAppointment();
            }}
            className="text-xs font-semibold text-[#C5A059] hover:text-[#D4B16A] underline underline-offset-2"
          >
            Or schedule an arrangement conference online →
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#F8F5F0]/70 hover:bg-[#FFFFFF10] rounded-sm transition-colors"
            >
              Close
            </button>
            <a
              href={`tel:${BUSINESS_INFO.phoneClean}`}
              className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-1.5 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#0F1419]" />
              <span>Call 740-691-1488</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
