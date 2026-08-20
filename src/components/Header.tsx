import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, Menu, X, Heart, Calendar, Eye, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface HeaderProps {
  onOpenImmediateNeed: () => void;
  onOpenAppointment: () => void;
  fontSize: 'normal' | 'large' | 'larger';
  setFontSize: (size: 'normal' | 'large' | 'larger') => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenImmediateNeed,
  onOpenAppointment,
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Obituaries & Tributes', href: '#obituaries' },
    { name: 'Pre-Planning', href: '#pre-planning' },
    { name: 'Grief Support', href: '#grief-support' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-lg bg-[#0F1419] border-b border-[#FFFFFF10] transition-colors duration-300">
      {/* Top Assistance & Accessibility Bar */}
      <div className="bg-[#0B0F13] text-[#F8F5F0] px-4 py-2 text-xs md:text-sm font-medium border-b border-[#FFFFFF08]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: 24/7 Notice & Phone */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 font-semibold tracking-wide text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
              24/7 Immediate Family Assistance
            </span>
            <a
              id="topbar-phone-link"
              href={`tel:${BUSINESS_INFO.phoneClean}`}
              className="inline-flex items-center gap-1.5 text-[#F8F5F0] hover:text-[#C5A059] transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>(740) 691-1488</span>
            </a>
            <span className="hidden sm:inline text-[#FFFFFF20]">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[#F8F5F0]/70">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              Parkersburg, WV
            </span>
          </div>

          {/* Right: Accessibility Controls & Immediate Need Quick Trigger */}
          <div className="flex items-center gap-3">
            {/* Font Resizing for Seniors */}
            <div className="hidden md:flex items-center gap-1 bg-[#141A21] px-2 py-0.5 rounded-sm border border-[#FFFFFF15] text-[#F8F5F0]/70">
              <span className="text-[11px] text-[#F8F5F0]/50 mr-1">Text:</span>
              <button
                id="font-size-normal"
                onClick={() => setFontSize('normal')}
                className={`px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${
                  fontSize === 'normal' ? 'bg-[#C5A059] text-[#0F1419] font-bold' : 'hover:text-white'
                }`}
                title="Normal text size"
              >
                A
              </button>
              <button
                id="font-size-large"
                onClick={() => setFontSize('large')}
                className={`px-1.5 py-0.5 rounded text-sm font-semibold transition-colors ${
                  fontSize === 'large' ? 'bg-[#C5A059] text-[#0F1419] font-bold' : 'hover:text-white'
                }`}
                title="Large text size"
              >
                A+
              </button>
              <button
                id="font-size-larger"
                onClick={() => setFontSize('larger')}
                className={`px-1.5 py-0.5 rounded text-base font-bold transition-colors ${
                  fontSize === 'larger' ? 'bg-[#C5A059] text-[#0F1419] font-bold' : 'hover:text-white'
                }`}
                title="Extra large text size"
              >
                A++
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              id="high-contrast-toggle"
              onClick={() => setHighContrast(!highContrast)}
              className={`text-xs px-2 py-0.5 rounded border transition-colors flex items-center gap-1 ${
                highContrast
                  ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold'
                  : 'bg-[#141A21] text-[#F8F5F0]/70 border-[#FFFFFF15] hover:text-white'
              }`}
              title="Toggle high contrast mode"
            >
              <Eye className="w-3 h-3" />
              <span className="hidden sm:inline">{highContrast ? 'Standard Mode' : 'High Contrast'}</span>
            </button>

            {/* Immediate Need Button */}
            <button
              id="header-immediate-need-btn"
              onClick={onOpenImmediateNeed}
              className="bg-[#8E2828] hover:bg-[#A32E2E] text-white text-xs font-semibold px-2.5 py-1 rounded transition-colors shadow-xs flex items-center gap-1 border border-[#B93A3A]/40"
            >
              <Heart className="w-3 h-3 text-red-200 fill-red-200" />
              <span>Immediate Need</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Wordmark */}
          <a id="brand-logo-link" href="#home" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-[#1A222C] border-2 border-[#C5A059] flex items-center justify-center text-[#C5A059] shadow-sm group-hover:border-[#D4B16A] transition-colors">
              <span className="font-serif-cormorant text-xl font-bold tracking-tight">BG</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif tracking-[0.15em] uppercase text-[#C5A059] leading-tight">
                Bakers Golden Gate
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#F8F5F0]/60 uppercase font-medium mt-0.5">
                Funeral & Memorial Services • Parkersburg, WV
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs uppercase tracking-widest font-medium text-[#F8F5F0]/80">
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
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs uppercase tracking-widest font-semibold rounded-sm border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0F1419] transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Consultation</span>
            </button>

            <a
              id="header-call-btn"
              href={`tel:${BUSINESS_INFO.phoneClean}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-sm bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] shadow-sm transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#0F1419]" />
              <span>740-691-1488</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              id="mobile-header-call-btn"
              href={`tel:${BUSINESS_INFO.phoneClean}`}
              className="p-2 rounded-sm bg-[#C5A059] text-[#0F1419]"
              title="Call Mortuary"
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
              Schedule Family Consultation
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phoneClean}`}
              className="w-full py-3 px-4 bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] font-bold rounded-sm text-sm flex items-center justify-center gap-2 shadow-sm text-center"
            >
              <Phone className="w-4 h-4 text-[#0F1419]" />
              Call (740) 691-1488 (24/7 Available)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
