import React from 'react';
import { Heart, Shield, Sparkles, Users, Award, HandHeart, Check, Phone, ShieldCheck, Truck, Building2, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface AboutProps {
  onOpenAppointment: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenAppointment }) => {
  const coreValues = [
    {
      title: 'Professionalism & Competency',
      desc: 'Over 30 years of mortuary industry leadership ensuring all removals, interstate transfers, and facility handovers adhere to the highest regulatory standards.',
      icon: Award,
    },
    {
      title: 'Dignity & Reverence',
      desc: 'Every decedent is treated with utmost solemnity, respect, and careful protection from the moment we arrive to final destination handover.',
      icon: Shield,
    },
    {
      title: 'Empathy in Action',
      desc: 'Understanding that passing is an emotional and vulnerable time for families. A reassuring, compassionate presence eases the burden.',
      icon: Heart,
    },
    {
      title: 'Seamless Logistics Coordination',
      desc: 'Working closely with funeral directors, hospital staff, hospice nurses, county coroners, and state medical examiners for punctual, smooth transfers.',
      icon: Truck,
    },
    {
      title: 'Dependability & Integrity',
      desc: '24/7/365 on-call readiness with transparent communication, licensed accountability (WV 2455-5536), and uncompromised service quality.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#141A21] border-b border-[#FFFFFF10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase block mb-2">
            Welcome to Baker’s Golden Gate
          </span>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F5F0] tracking-tight">
            Reliable & Professional Mortuary Transportation
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4 mb-6"></div>
          <p className="text-base sm:text-lg text-[#F8F5F0]/75 leading-relaxed font-normal">
            Baker’s Golden Gate Mortuary Transportation LLC provides reliable and professional mortuary transportation services for funeral homes, mortuary providers, medical examiners, and private families.
          </p>
        </div>

        {/* Founder Story & Core Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Authentic narrative & Thomas Baker's vision */}
          <div className="lg:col-span-7 space-y-6 text-[#F8F5F0]/80 text-base leading-relaxed">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#C5A059] text-xs font-semibold uppercase tracking-wider">
              <span>Over 30 Years of Industry Excellence</span>
            </div>

            <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#F8F5F0]">
              Founded by Thomas Baker: Upholding the Highest Standards of Care
            </h3>

            <p>
              Baker’s Golden Gate Mortuary Transportation LLC was founded by <strong>Thomas Baker</strong>, who brought <strong>over 30 years of experience</strong> to create a mortuary transportation service that upholds the highest standards of professionalism, competency, and care.
            </p>

            <p>
              With a deep understanding of the field, Thomas established Baker’s Golden Gate to ensure that every transfer is handled with dignity, respect, and adherence to industry’s best practices. The company is dedicated to serving the community with compassion and excellence during times of grief and loss.
            </p>

            <p>
              Recognizing that the passing of a loved one is an emotional and challenging experience for families, Baker’s Golden Gate aims to provide professional and empathetic services that help ease some of the burdens they face.
            </p>

            {/* Thomas's Philosophy Quote Box */}
            <div className="p-5 rounded-sm bg-[#1A222C] border-l-3 border-[#C5A059] shadow-xl space-y-3">
              <p className="font-serif-cormorant text-lg sm:text-xl italic text-[#F8F5F0] leading-relaxed">
                “Professionalism and empathy go hand in hand. Small gestures of kindness, a reassuring presence, and a commitment to respectful service can make a significant difference during these difficult moments.”
              </p>
              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-[#C5A059] font-bold uppercase tracking-wider">
                  — Thomas Baker, Founder & Director
                </span>
                <span className="text-[#F8F5F0]/50">30+ Years of Mortuary Service</span>
              </div>
            </div>

            <p className="text-sm sm:text-base">
              Thomas works closely with <strong>funeral homes, hospitals, nursing facilities, coroners, medical examiners</strong>, and other healthcare providers to coordinate logistics seamlessly—allowing families and funeral directors to focus on emotional well-being and memorial care.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                id="about-dispatch-btn"
                onClick={onOpenAppointment}
                className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] text-xs uppercase tracking-widest font-bold rounded-sm shadow-md transition-colors"
              >
                Request Transport / Dispatch
              </button>
              <a
                id="about-call-link"
                href={`tel:${BUSINESS_INFO.phoneClean}`}
                className="px-5 py-2.5 bg-transparent border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059]/10 text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>Call 740 – 691 – 1488</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Collage & Facility Highlights */}
          <div className="lg:col-span-5 relative space-y-6">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image */}
              <div className="rounded-sm overflow-hidden shadow-2xl border border-[#FFFFFF15] bg-[#0F1419]">
                <img
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80"
                  alt="Dignified, professional mortuary and transport service"
                  className="w-full h-80 sm:h-96 object-cover opacity-85"
                  loading="lazy"
                />
              </div>

              {/* Overlapping Informational Card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-[#0F1419] text-white p-5 rounded-sm shadow-2xl border border-[#C5A059]/40 max-w-xs space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#C5A059] font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Parkersburg Headquarters</span>
                </div>
                <p className="text-sm font-semibold text-[#F8F5F0]">
                  2607 Bartlett Street
                </p>
                <p className="text-xs text-[#F8F5F0]/70">
                  Parkersburg, WV 26104 • License WV 2455-5536
                </p>
              </div>
            </div>

            {/* Quick Stat Blocks */}
            <div className="grid grid-cols-2 gap-3 pt-6">
              <div className="p-4 rounded-sm bg-[#1A222C] border border-[#FFFFFF10]">
                <span className="text-2xl font-bold font-serif-cormorant text-[#C5A059] block">30+ Years</span>
                <span className="text-xs text-[#F8F5F0]/70 font-medium">Founder Experience</span>
              </div>
              <div className="p-4 rounded-sm bg-[#1A222C] border border-[#FFFFFF10]">
                <span className="text-2xl font-bold font-serif-cormorant text-[#C5A059] block">9 Services</span>
                <span className="text-xs text-[#F8F5F0]/70 font-medium">Specialized Transports</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Principles / Standards of Excellence */}
        <div className="pt-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase block mb-1">
              Our Core Standards
            </span>
            <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#F8F5F0]">
              Why Funeral Directors, Facilities & Families Rely on Baker’s Golden Gate
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {coreValues.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#1A222C] p-6 rounded-sm border border-[#FFFFFF10] hover:border-[#C5A059]/40 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#141A21] border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif-cormorant text-xl font-bold text-[#F8F5F0] mb-2">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-[#F8F5F0]/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

