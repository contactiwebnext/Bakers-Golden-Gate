import React, { useState } from 'react';
import {
  HeartHandshake,
  Sparkles,
  Flame,
  Compass,
  FileCheck,
  Heart,
  ArrowRight,
  Phone,
  CheckCircle,
} from 'lucide-react';
import { SERVICES_DATA, BUSINESS_INFO } from '../data/mockData';
import { ServiceCategory } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServicesProps {
  onOpenAppointment: (serviceTitle?: string) => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  HeartHandshake,
  Sparkles,
  Flame,
  Compass,
  FileCheck,
  ShieldHeart: Heart,
};

export const Services: React.FC<ServicesProps> = ({ onOpenAppointment }) => {
  const [selectedService, setSelectedService] = useState<ServiceCategory | null>(null);

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#0F1419] border-b border-[#FFFFFF10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase block mb-2">
            Mortuary & Memorial Offerings
          </span>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F5F0] tracking-tight">
            Thoughtful Services Honoring Every Memory
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4 mb-6"></div>
          <p className="text-base sm:text-lg text-[#F8F5F0]/75 leading-relaxed font-normal">
            Every family’s journey is distinct. We offer a comprehensive suite of funeral, cremation, burial, and memorial options designed to provide peace of mind and heartfelt closure.
          </p>
        </div>

        {/* 6-Card Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {SERVICES_DATA.map((service) => {
            const Icon = iconMap[service.iconName] || HeartHandshake;
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="bg-[#141A21] rounded-sm border border-[#FFFFFF10] hover:border-[#C5A059]/40 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* Image & Category Banner */}
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141A21] via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-[#C5A059] uppercase">
                        Bakers Golden Gate
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-sm bg-[#1A222C] border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif-cormorant text-2xl font-bold text-[#F8F5F0] leading-tight">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-xs text-[#C5A059] font-medium mb-3">{service.subtitle}</p>
                    <p className="text-sm text-[#F8F5F0]/70 leading-relaxed mb-4">{service.description}</p>

                    {/* Quick Bullet Highlights */}
                    <ul className="space-y-1.5 pt-3 border-t border-[#FFFFFF08] text-xs text-[#F8F5F0]/80">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Bar */}
                <div className="p-6 pt-0 flex items-center justify-between gap-2 border-t border-[#FFFFFF08] mt-4">
                  <button
                    id={`learn-more-${service.id}`}
                    onClick={() => setSelectedService(service)}
                    className="text-xs sm:text-sm font-semibold text-[#C5A059] hover:text-[#D4B16A] inline-flex items-center gap-1.5 transition-colors py-1"
                  >
                    <span>View Details & What's Included</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenAppointment(service.title)}
                    className="px-3 py-1.5 bg-transparent hover:bg-[#C5A059] border border-[#C5A059] text-[#C5A059] hover:text-[#0F1419] rounded-sm text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Personalized Consultation Callout */}
        <div className="bg-[#141A21] text-white rounded-sm p-8 sm:p-10 border border-[#C5A059]/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase">
              No-Obligation Consultation
            </span>
            <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#F8F5F0]">
              Have questions regarding funeral, burial, or cremation options?
            </h3>
            <p className="text-sm text-[#F8F5F0]/75 max-w-2xl">
              Our directors are always available to speak with you openly, explain choices transparently, and help your family make informed decisions without pressure.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              id="services-call-btn"
              href={`tel:${BUSINESS_INFO.phoneClean}`}
              className="px-5 py-3 rounded-sm bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] font-bold text-xs uppercase tracking-widest transition-colors inline-flex items-center gap-2 shadow-md"
            >
              <Phone className="w-4 h-4 text-[#0F1419]" />
              <span>Call (740) 691-1488</span>
            </a>
            <button
              onClick={() => onOpenAppointment()}
              className="px-5 py-3 rounded-sm bg-transparent hover:bg-[#C5A059]/10 text-[#C5A059] font-semibold text-xs uppercase tracking-widest border border-[#C5A059]/50 transition-colors"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenAppointment={onOpenAppointment}
      />
    </section>
  );
};
