/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Obituaries } from './components/Obituaries';
import { GriefResources } from './components/GriefResources';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ImmediateNeedModal } from './components/ImmediateNeedModal';
import { AppointmentModal } from './components/AppointmentModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { AICareAssistant } from './components/AICareAssistant';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  const [immediateNeedOpen, setImmediateNeedOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [appointmentInitialService, setAppointmentInitialService] = useState<string | undefined>(undefined);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  // Accessibility state
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const handleOpenAppointment = (serviceTitle?: string) => {
    setAppointmentInitialService(serviceTitle);
    setAppointmentOpen(true);
  };

  const fontSizeClass =
    fontSize === 'larger'
      ? 'text-lg [&_p]:text-lg [&_h1]:text-6xl [&_h2]:text-5xl [&_h3]:text-3xl'
      : fontSize === 'large'
      ? 'text-base [&_p]:text-base [&_h1]:text-5xl [&_h2]:text-4xl [&_h3]:text-2xl'
      : '';

  return (
    <div
      className={`min-h-screen bg-[#0F1419] text-[#F8F5F0] flex flex-col selection:bg-[#C5A059]/30 selection:text-[#F8F5F0] ${fontSizeClass}`}
    >
      {/* Sticky Top Header */}
      <Header
        onOpenImmediateNeed={() => setImmediateNeedOpen(true)}
        onOpenAppointment={() => handleOpenAppointment()}
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with 24/7 Call & CTAs */}
        <Hero
          onOpenImmediateNeed={() => setImmediateNeedOpen(true)}
          onOpenAppointment={() => handleOpenAppointment()}
        />

        {/* 2. About Section & Principles */}
        <About onOpenAppointment={() => handleOpenAppointment()} />

        {/* 3. Services Section & Detailed Modals */}
        <Services onOpenAppointment={handleOpenAppointment} />

        {/* 4. Obituaries, Memorial Candles & Condolences */}
        <Obituaries />

        {/* 5. Grief Resources, Pre-Planning Checklist & FAQs */}
        <GriefResources onOpenAppointment={handleOpenAppointment} />

        {/* 6. Contact, Phone, Email & Parkersburg Location */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenImmediateNeed={() => setImmediateNeedOpen(true)}
        onOpenAppointment={() => handleOpenAppointment()}
        onOpenPrivacy={() => setPrivacyOpen(true)}
      />

      {/* Modals & Floating Widgets */}
      <ImmediateNeedModal
        isOpen={immediateNeedOpen}
        onClose={() => setImmediateNeedOpen(false)}
        onOpenAppointment={() => handleOpenAppointment('Immediate Need Arrangements')}
      />

      <AppointmentModal
        isOpen={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
        initialService={appointmentInitialService}
      />

      <PrivacyPolicyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />

      {/* 24/7 AI Care Assistant */}
      <AICareAssistant />

      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  );
}
