import React from 'react';
import { Phone, Mail, MapPin, Heart, Shield, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface FooterProps {
  onOpenImmediateNeed: () => void;
  onOpenAppointment: () => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenImmediateNeed,
  onOpenAppointment,
  onOpenPrivacy,
}) => {
  return (
    <footer className="bg-[#0F1419] text-[#F8F5F0]/70 border-t border-[#FFFFFF10]">
      {/* 24/7 Immediate Help Banner */}
      <div className="bg-[#141A21] py-6 px-4 border-b border-[#FFFFFF10]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-950/80 border border-red-700/50 flex items-center justify-center text-red-400 shrink-0 shadow-xs">
              <Heart className="w-5 h-5 fill-red-400" />
            </div>
            <div>
              <p className="text-[#F8F5F0] font-semibold text-sm">Need immediate assistance in Parkersburg?</p>
              <p className="text-xs text-[#F8F5F0]/60">Directors are available 24 hours a day, 7 days a week.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              id="footer-call-btn"
              href={`tel:${BUSINESS_INFO.phoneClean}`}
              className="px-5 py-2.5 rounded-sm bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#0F1419]" />
              <span>Call (740) 691-1488</span>
            </a>
            <button
              onClick={onOpenImmediateNeed}
              className="px-4 py-2.5 rounded-sm bg-[#1A222C] hover:bg-[#253245] text-[#F8F5F0] font-medium text-xs border border-[#FFFFFF15] transition-colors"
            >
              Immediate Need Guide
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#141A21] border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
                <span className="font-serif-cormorant text-lg font-bold">BG</span>
              </div>
              <span className="font-serif-cormorant text-2xl font-bold text-[#F8F5F0] tracking-tight">
                Bakers Golden Gate
              </span>
            </div>

            <p className="text-sm text-[#F8F5F0]/60 leading-relaxed max-w-sm">
              Providing compassionate care, funeral services, memorial gatherings, cremation, and burial assistance for families in Parkersburg, West Virginia and the Mid-Ohio Valley.
            </p>

            <div className="pt-2 text-xs text-[#F8F5F0]/60 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Parkersburg, WV (Mid-Ohio Valley)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneClean}`} className="hover:text-[#C5A059] transition-colors">
                  740-691-1488
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-[#C5A059] transition-colors">
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif-cormorant text-lg font-bold text-[#F8F5F0] tracking-wide">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F8F5F0]/60">
              <li>
                <a href="#home" className="hover:text-[#C5A059] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#C5A059] transition-colors">
                  About Bakers Golden Gate
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#C5A059] transition-colors">
                  Mortuary & Memorial Services
                </a>
              </li>
              <li>
                <a href="#obituaries" className="hover:text-[#C5A059] transition-colors">
                  Current Obituaries & Tributes
                </a>
              </li>
              <li>
                <a href="#pre-planning" className="hover:text-[#C5A059] transition-colors">
                  Advance Pre-Planning
                </a>
              </li>
              <li>
                <a href="#grief-support" className="hover:text-[#C5A059] transition-colors">
                  Grief Resources & Guides
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#C5A059] transition-colors">
                  Contact & Location
                </a>
              </li>
            </ul>
          </div>

          {/* Consultation & Support Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif-cormorant text-lg font-bold text-[#F8F5F0] tracking-wide">
              Family Assistance
            </h4>
            <p className="text-xs text-[#F8F5F0]/60 leading-relaxed">
              Schedule an in-person or phone consultation with a licensed funeral professional.
            </p>
            <button
              id="footer-book-consultation"
              onClick={onOpenAppointment}
              className="w-full py-2.5 px-4 bg-[#C5A880] hover:bg-[#D4B16A] text-[#0F1419] font-bold text-xs uppercase tracking-wider rounded-sm transition-colors shadow-xs"
            >
              Book Consultation
            </button>
            <button
              onClick={onOpenPrivacy}
              className="text-xs text-[#F8F5F0]/60 hover:text-[#C5A059] underline underline-offset-2 block pt-2"
            >
              Privacy Policy & Confidentiality
            </button>
          </div>
        </div>

        {/* Bottom Bar with Developer Attribution */}
        <div className="mt-12 pt-8 border-t border-[#FFFFFF10] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F5F0]/50">
          <p>© {new Date().getFullYear()} Bakers Golden Gate. All rights reserved. Parkersburg, WV.</p>

          {/* Centered / aligned developer attribution as requested in the requirements */}
          <div className="text-center sm:text-right">
            <span>
              Developed by{' '}
              <a
                href="https://iwebnext.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C5A059] hover:text-[#D4B16A] font-medium underline underline-offset-4 transition-colors"
              >
                iWebNext
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
