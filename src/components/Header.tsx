import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, Menu, X, Heart, Calendar, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface HeaderProps {
  onOpenImmediateNeed: () => void;
  onOpenAppointment: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenImmediateNeed,
  onOpenAppointment,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About & Story', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Rates & Pricing', href: '#pricing' },
    { name: 'Dispatch & Info', href: '#pre-planning' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-lg bg-[#0F1419] border-b border-[#FFFFFF10] transition-colors duration-300">
      {/* Top Assistance & Accessibility Bar */}
      <div className="bg-[#0B0F13] text-[#F8F5F0] px-4 py-2 text-xs md:text-sm font-medium border-b border-[#FFFFFF08]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: 24/7 Notice, License & Phone */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 font-semibold tracking-wide text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
              24/7 Immediate Dispatch & Transfers
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-xs text-[#F8F5F0]/70">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              License: <strong className="text-[#C5A059]">WV 2455-5536</strong>
            </span>
            <span className="hidden sm:inline text-[#FFFFFF20]">|</span>
            <a
              id="topbar-phone-link"
              href={`tel:${BUSINESS_INFO.phoneClean}`}
              className="inline-flex items-center gap-1.5 text-[#F8F5F0] hover:text-[#C5A059] transition-colors font-semibold text-xs sm:text-sm"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>740 – 691 – 1488</span>
            </a>
            <span className="hidden lg:inline text-[#FFFFFF20]">|</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-xs text-[#F8F5F0]/70">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              2607 Bartlett St, Parkersburg, WV 26104
            </span>
          </div>

          {/* Right: Immediate Need Quick Trigger */}
          <div className="flex items-center gap-3">
            <button
              id="header-immediate-need-btn"
              onClick={onOpenImmediateNeed}
              className="bg-[#8E2828] hover:bg-[#A32E2E] text-white text-xs font-semibold px-2.5 py-1 rounded-sm transition-colors shadow-xs flex items-center gap-1 border border-[#B93A3A]/40"
            >
              <Heart className="w-3 h-3 text-red-200 fill-red-200" />
              <span>Immediate Need (24/7)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Wordmark */}
          <a id="brand-logo-link" href="#home" className="flex items-center gap-3 group" aria-label="Baker’s Golden Gate Mortuary Transportation LLC Home">
            <div className="w-11 h-11 rounded-full bg-[#1A222C] border-2 border-[#C5A059] flex items-center justify-center text-[#C5A059] shadow-sm group-hover:border-[#D4B16A] transition-colors shrink-0">
              <span className="font-serif-cormorant text-xl font-bold tracking-tight">BG</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif-cormorant text-base sm:text-lg lg:text-xl font-bold tracking-tight text-[#F8F5F0] group-hover:text-[#C5A059] transition-colors leading-snug">
                Baker’s Golden Gate
              </span>
              <span className="text-[10px] sm:text-xs text-[#C5A059] uppercase tracking-[0.18em] font-medium leading-none">
                Mortuary Transportation LLC
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-5 text-xs uppercase tracking-widest font-medium text-[#F8F5F0]/80">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                href={link.href}
                className="hover:text-[#C5A059] transition-colors py-2 border-b-2 border-transparent hover:border-[#C5A059]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="header-book-consultation-btn"
              onClick={onOpenAppointment}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-widest font-semibold rounded-sm bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] shadow-sm transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0F1419]" />
              <span>Request Dispatch</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              id="mobile-header-call-btn"
              href={`tel:${BUSINESS_INFO.phoneClean}`}
              className="p-2 rounded-sm bg-[#C5A059] text-[#0F1419]"
              title="Call Mortuary Transport"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-sm text-[#F8F5F0] hover:bg-[#141A21] transition-colors border border-[#FFFFFF15]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#141A21] border-b border-[#FFFFFF10] px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200 text-[#F8F5F0]">
          <div className="grid grid-cols-1 gap-2 pt-2 border-t border-[#FFFFFF10]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm uppercase tracking-wider font-medium text-[#F8F5F0]/90 rounded-sm hover:bg-[#1A222C] hover:text-[#C5A059] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[#FFFFFF10] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenImmediateNeed();
              }}
              className="w-full py-2.5 px-4 bg-[#8E2828] text-white font-medium rounded-sm text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white" />
              Immediate Need Assistance Guide
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointment();
              }}
              className="w-full py-2.5 px-4 border border-[#C5A059] text-[#C5A059] font-medium rounded-sm text-xs uppercase tracking-wider flex items-center justify-center gap-2 bg-transparent hover:bg-[#C5A059] hover:text-[#0F1419] transition-all"
            >
              <Calendar className="w-4 h-4" />
              Request Transport / Dispatch Consultation
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phoneClean}`}
              className="w-full py-3 px-4 bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] font-bold rounded-sm text-sm flex items-center justify-center gap-2 shadow-sm text-center"
            >
              <Phone className="w-4 h-4 text-[#0F1419]" />
              Call 740 – 691 – 1488 (24/7 Available)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

