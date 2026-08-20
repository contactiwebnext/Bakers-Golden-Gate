import React from 'react';
import { Heart, Shield, Sparkles, Users, Award, HandHeart, Check, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface AboutProps {
  onOpenAppointment: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenAppointment }) => {
  const principles = [
    {
      title: 'Compassionate Care',
      desc: 'We approach every family with patient listening, tender empathy, and an understanding of the emotional weight of grief.',
      icon: Heart,
    },
    {
      title: 'Dignity & Respect',
      desc: 'Treating your loved one with solemn reverence and honoring your family’s traditions, values, and personal wishes.',
      icon: Shield,
    },
    {
      title: 'Personalized Service',
      desc: 'Every life tells a unique story. We help design meaningful memorial ceremonies that authentically celebrate that legacy.',
      icon: Sparkles,
    },
    {
      title: 'Support for Families',
      desc: 'From the first phone call through the weeks following the service, our directors remain a dependable source of reassurance.',
      icon: Users,
    },
    {
      title: 'Professional Guidance',
      desc: 'Clear, gentle navigation through all paperwork, cemetery liaison, permits, and planning details with full transparency.',
      icon: HandHeart,
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#141A21] border-b border-[#FFFFFF10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase block mb-2">
            About Bakers Golden Gate
          </span>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F5F0] tracking-tight">
            Dedicated to Serving Families with Quiet Dignity & Heartfelt Care
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4 mb-6"></div>
          <p className="text-base sm:text-lg text-[#F8F5F0]/75 leading-relaxed font-normal">
            Bakers Golden Gate is a trusted mortuary serving Parkersburg, West Virginia and the surrounding Mid-Ohio Valley.
            When a family turns to us, our sole focus is to provide comfort, clarity, and unwavering respect in honoring their loved one’s memory.
          </p>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Authentic narrative */}
          <div className="lg:col-span-7 space-y-6 text-[#F8F5F0]/80 text-base leading-relaxed">
            <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#F8F5F0]">
              A Reassuring Presence in Your Time of Need
            </h3>
            <p>
              Navigating the loss of someone dear is one of life’s most vulnerable moments. At Bakers Golden Gate,
              we believe that funeral care should never feel rushed, impersonal, or overwhelming. We take the time to listen,
              answering every question with patience and ensuring your family feels supported at every juncture.
            </p>
            <p>
              Whether you are seeking a traditional funeral service, a personalized memorial gathering, a dignified cremation,
              or advance pre-planning arrangements, we tailor our assistance to your family's personal wishes and beliefs.
            </p>

            <div className="p-5 rounded-md bg-[#1A222C] border-l-2 border-[#C5A059] space-y-2">
              <p className="font-serif-cormorant text-lg italic text-[#F8F5F0]">
                “Our mission is simple: to treat every family as our own, providing quiet reverence, thoughtful guidance, and a comforting environment.”
              </p>
              <p className="text-xs text-[#C5A059] font-semibold uppercase tracking-wider">— Bakers Golden Gate Care Team</p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                id="about-consultation-btn"
                onClick={onOpenAppointment}
                className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] text-xs uppercase tracking-widest font-bold rounded-sm shadow-md transition-colors"
              >
                Request a Consultation
              </button>
              <a
                id="about-call-link"
                href={`tel:${BUSINESS_INFO.phoneClean}`}
                className="px-5 py-2.5 bg-transparent border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059]/10 text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>Call (740) 691-1488</span>
              </a>
            </div>
          </div>

          {/* Right Column: Serene Image Collage with Warm Borders */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image */}
              <div className="rounded-sm overflow-hidden shadow-2xl border border-[#FFFFFF15]">
                <img
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80"
                  alt="Peaceful chapel setting with warm light and floral remembrance arrangements"
                  className="w-full h-80 sm:h-96 object-cover"
                  loading="lazy"
                />
              </div>

              {/* Overlapping Informational Card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-[#0F1419] text-white p-5 rounded-sm shadow-2xl border border-[#C5A059]/30 max-w-xs">
                <span className="text-xs text-[#C5A059] font-semibold uppercase tracking-wider block mb-1">
                  Community Focused
                </span>
                <p className="text-sm font-medium text-[#F8F5F0]/90">
                  Proudly serving Parkersburg, Wood County, and surrounding Mid-Ohio Valley families.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Principles / Why Families Choose Us Grid */}
        <div className="pt-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase block mb-1">
              Our Core Principles
            </span>
            <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#F8F5F0]">
              Why Families Place Their Trust in Us
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {principles.map((item, idx) => {
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
