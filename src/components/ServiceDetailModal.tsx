import React from 'react';
import { X, CheckCircle2, Phone, Calendar, ArrowRight } from 'lucide-react';
import { ServiceCategory } from '../types';
import { BUSINESS_INFO } from '../data/mockData';

interface ServiceDetailModalProps {
  service: ServiceCategory | null;
  onClose: () => void;
  onOpenAppointment: (serviceTitle?: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onOpenAppointment,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-[#141A21] text-[#F8F5F0] w-full max-w-2xl rounded-sm shadow-2xl border border-[#FFFFFF15] overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
      >
        {/* Modal Header with Image Banner */}
        <div className="relative h-44 sm:h-52 overflow-hidden bg-[#0F1419]">
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141A21] via-[#141A21]/60 to-transparent"></div>

          <button
            id="close-service-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#F8F5F0]/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">Service Overview</span>
            <h2 id="service-modal-title" className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#F8F5F0] leading-tight">
              {service.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#C5A059] mt-0.5">{service.subtitle}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          <div>
            <h3 className="font-serif-cormorant text-lg font-bold text-[#F8F5F0] mb-2">About This Service</h3>
            <p className="text-[#F8F5F0]/75 leading-relaxed text-sm">{service.detailedOverview}</p>
          </div>

          {/* What's Included */}
          <div className="p-4 rounded-sm bg-[#1A222C] border border-[#FFFFFF10] shadow-md">
            <h4 className="font-serif-cormorant text-base font-bold text-[#F8F5F0] mb-3">
              Included Care & Arrangements:
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F8F5F0]/80">
              {service.whatsIncluded.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-sm bg-[#0F1419] border border-[#C5A059]/30 text-xs sm:text-sm text-[#F8F5F0]/80 space-y-2">
            <p className="font-semibold text-[#C5A059]">Personalized to Your Family’s Wishes</p>
            <p className="text-[#F8F5F0]/70">
              All arrangements are completely customizable to your family’s religious, cultural, or non-denominational preferences. Please reach out to discuss specific options or special requests.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0F1419] border-t border-[#FFFFFF10] flex flex-wrap items-center justify-between gap-3">
          <a
            href={`tel:${BUSINESS_INFO.phoneClean}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C5A059] hover:text-[#D4B16A]"
          >
            <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Speak with a Director: (740) 691-1488</span>
          </a>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-[#F8F5F0]/60 hover:text-[#F8F5F0] hover:bg-[#141A21] rounded-sm transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenAppointment(service.title);
              }}
              className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] text-xs uppercase tracking-wider font-bold rounded-sm shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0F1419]" />
              <span>Inquire About This Service</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
