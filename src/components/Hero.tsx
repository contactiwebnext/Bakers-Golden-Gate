import React from 'react';
import { Phone, Calendar, Heart, Shield, Clock, Compass, MapPin, ArrowRight, ShieldCheck, Award, Truck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface HeroProps {
  onOpenImmediateNeed: () => void;
  onOpenAppointment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenImmediateNeed, onOpenAppointment }) => {
  return (
    <section id="home" className="relative overflow-hidden bg-[#0F1419] text-[#F8F5F0] py-16 sm:py-24 lg:py-28">
      {/* Background Video with Balanced Cinematic Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src="https://n9njqyniusmbotqu.public.blob.vercel-storage.com/Create_mortuary_services_video_202608210245.mp4"
          poster="/src/assets/images/hero_memorial_bg_1787260617034.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center brightness-75 contrast-105"
        />
        {/* Layered directional dark gradients to ensure perfect text contrast while showcasing the video */}
        <div className="absolute inset-0 bg-[#0F1419]/75"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] via-transparent to-[#0F1419]/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Subtle Trust Badge with License & Location */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-xs sm:text-sm font-medium mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>WV License: <strong>WV 2455-5536</strong> • 2607 Bartlett St, Parkersburg, WV</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8F5F0] leading-[1.15] mb-4 text-center">
            Baker’s Golden Gate <br />
            <span className="text-[#C5A059]">Mortuary Transportation LLC</span>
          </h1>

          {/* Subheading / Value Proposition */}
          <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-4">
            Reliable & Professional Mortuary Transportation Services
          </p>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg lg:text-xl text-[#F8F5F0]/80 font-normal leading-relaxed mb-8 max-w-3xl text-center">
            Founded by <strong>Thomas Baker</strong> with over 30 years of dedicated mortuary logistics experience. Upholding the highest standards of professionalism, competency, and care for funeral homes, mortuary providers, medical examiners, and families across West Virginia and Ohio.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 w-full sm:w-auto">
            {/* Primary Call CTA */}
            <a
              id="hero-call-cta"
              href={`tel:${BUSINESS_INFO.phoneClean}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-sm bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] font-bold text-xs sm:text-sm uppercase tracking-widest shadow-lg transition-all transform active:scale-98"
            >
              <Phone className="w-4 h-4 text-[#0F1419]" />
              <span>Call 740 – 691 – 1488</span>
            </a>

            {/* Request Dispatch / Consultation */}
            <button
              id="hero-consultation-btn"
              onClick={onOpenAppointment}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-[#1A222C] hover:bg-[#253245] text-[#F8F5F0] font-semibold text-xs sm:text-sm uppercase tracking-widest border border-[#FFFFFF20] transition-colors shadow-md"
            >
              <Calendar className="w-4 h-4 text-[#C5A059]" />
              <span>Request Dispatch / Transport</span>
            </button>

            {/* View Services Link CTA */}
            <a
              id="hero-services-cta"
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-sm bg-transparent hover:bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/50 font-semibold text-xs sm:text-sm uppercase tracking-widest transition-colors"
            >
              <Truck className="w-4 h-4 text-[#C5A059]" />
              <span>Our 9 Transport Services</span>
            </a>
          </div>

          {/* Immediate Need Alert Bar */}
          <div className="w-full max-w-2xl p-4 rounded-sm bg-[#141A21]/90 backdrop-blur-xs border border-[#C5A059]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#F8F5F0] text-center sm:text-left shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#8E2828] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#F8F5F0]">Urgent Transfer or Removal Dispatch Needed?</p>
                <p className="text-xs text-[#F8F5F0]/70">Our Parkersburg on-call drivers are ready 24/7/365.</p>
              </div>
            </div>
            <button
              id="hero-immediate-guide-btn"
              onClick={onOpenImmediateNeed}
              className="text-xs sm:text-sm font-semibold text-[#C5A059] hover:text-[#D4B16A] underline underline-offset-4 flex items-center gap-1 transition-colors self-center shrink-0"
            >
              <span>Immediate Protocol Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Feature Pillar Badges under Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#FFFFFF10]">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <p className="text-xs text-[#F8F5F0]/50 uppercase tracking-wider font-medium">Response</p>
              <p className="text-sm font-semibold text-[#F8F5F0]">24/7 Immediate Dispatch</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <p className="text-xs text-[#F8F5F0]/50 uppercase tracking-wider font-medium">Experience</p>
              <p className="text-sm font-semibold text-[#F8F5F0]">30+ Years Industry Leadership</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <p className="text-xs text-[#F8F5F0]/50 uppercase tracking-wider font-medium">Headquarters</p>
              <p className="text-sm font-semibold text-[#F8F5F0]">2607 Bartlett St, Parkersburg</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <p className="text-xs text-[#F8F5F0]/50 uppercase tracking-wider font-medium">Accreditation</p>
              <p className="text-sm font-semibold text-[#F8F5F0]">WV License 2455-5536</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

