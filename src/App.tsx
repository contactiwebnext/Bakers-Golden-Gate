/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { PricingSection } from './components/PricingSection';
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

  const handleOpenAppointment = (serviceTitle?: string) => {
    setAppointmentInitialService(serviceTitle);
    setAppointmentOpen(true);
  };

  return (
    <div
      className="min-h-screen bg-[#0F1419] text-[#F8F5F0] flex flex-col selection:bg-[#C5A059]/30 selection:text-[#F8F5F0]"
    >
      {/* Sticky Top Header */}
      <Header
        onOpenImmediateNeed={() => setImmediateNeedOpen(true)}
        onOpenAppointment={() => handleOpenAppointment()}
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

        {/* 4. Official Price List & Interactive Mileage Calculator */}
        <PricingSection onOpenAppointment={handleOpenAppointment} />

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
