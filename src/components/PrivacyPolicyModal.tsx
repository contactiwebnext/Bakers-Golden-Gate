import React from 'react';
import { X, Shield } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-[#0F1419] text-[#F8F5F0] w-full max-w-2xl rounded-sm shadow-2xl border border-[#FFFFFF15] overflow-hidden max-h-[88vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-title"
      >
        <div className="bg-[#141A21] text-white p-6 relative border-b border-[#FFFFFF10]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#F8F5F0]/50 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-[#C5A059]" />
            <h2 id="privacy-title" className="font-serif-cormorant text-2xl font-bold text-[#F8F5F0]">
              Privacy Policy & Family Confidentiality
            </h2>
          </div>
          <p className="text-xs text-[#F8F5F0]/60">Bakers Golden Gate • Parkersburg, WV</p>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#F8F5F0]/80 leading-relaxed">
          <p>
            At Bakers Golden Gate, we deeply respect the sanctity of the information you share with us during some of the most sensitive moments in your life.
          </p>

          <h3 className="font-semibold text-sm text-[#F8F5F0] pt-2">1. Collection of Information</h3>
          <p>
            We only collect personal information—such as names, phone numbers, email addresses, and service preferences—when willingly provided through our consultation scheduler, contact forms, or condolence tribute book.
          </p>

          <h3 className="font-semibold text-sm text-[#F8F5F0] pt-2">2. Use and Protection of Data</h3>
          <p>
            Your information is used strictly to coordinate funeral, memorial, burial, or cremation arrangements and to communicate directly with your family. We never sell, rent, or distribute personal information to third parties.
          </p>

          <h3 className="font-semibold text-sm text-[#F8F5F0] pt-2">3. Public Memorial Tributes</h3>
          <p>
            Messages and virtual candles left in the online memorial book are viewable by other visitors to honor the deceased. If you wish to have a condolence message modified or removed, please contact our office.
          </p>

          <h3 className="font-semibold text-sm text-[#F8F5F0] pt-2">4. Contact Us</h3>
          <p>
            For any privacy inquiries or records assistance, please contact us at {BUSINESS_INFO.phone} or email {BUSINESS_INFO.email}.
          </p>
        </div>

        <div className="p-4 bg-[#141A21] border-t border-[#FFFFFF10] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#C5A880] hover:bg-[#D4B16A] text-[#0F1419] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
          >
            Close Privacy Statement
          </button>
        </div>
      </div>
    </div>
  );
};
