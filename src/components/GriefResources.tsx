import React, { useState } from 'react';
import {
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Printer,
  Heart,
  ShieldCheck,
  CheckSquare,
  BookOpen,
} from 'lucide-react';
import { GRIEF_ARTICLES, FAQS, BUSINESS_INFO } from '../data/mockData';
import { GriefArticle } from '../types';

interface GriefResourcesProps {
  onOpenAppointment: (topic?: string) => void;
}

export const GriefResources: React.FC<GriefResourcesProps> = ({ onOpenAppointment }) => {
  const [selectedArticle, setSelectedArticle] = useState<GriefArticle | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handlePrintChecklist = () => {
    window.print();
  };

  return (
    <section id="grief-support" className="py-20 sm:py-28 bg-[#0F1419] border-b border-[#FFFFFF10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase block mb-2">
            Guidance & Compassionate Support
          </span>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F5F0] tracking-tight">
            Helpful Resources for the Journey Ahead
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4 mb-6"></div>
          <p className="text-base sm:text-lg text-[#F8F5F0]/75 leading-relaxed font-normal">
            Whether you are preparing arrangements in advance or seeking gentle comfort after a loss, we provide transparent information, grief literature, and answers to your most pressing questions.
          </p>
        </div>

        {/* 2-Column: Pre-Planning & Checklist vs Grief Guidance Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Pre-Planning Focus Card */}
          <div
            id="pre-planning"
            className="lg:col-span-6 bg-[#141A21] rounded-sm border border-[#FFFFFF10] p-8 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-sm bg-[#1A222C] border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#C5A059] uppercase tracking-wider">
                    Advance Peace of Mind
                  </span>
                  <h3 className="font-serif-cormorant text-2xl font-bold text-[#F8F5F0]">
                    The Pre-Planning Advantage
                  </h3>
                </div>
              </div>

              <p className="text-sm text-[#F8F5F0]/75 leading-relaxed mb-6">
                Planning in advance is one of the most loving and thoughtful decisions you can make. By recording your preferences today, you remove burdensome guesswork from your family during an emotionally difficult time.
              </p>

              {/* Checklist Box */}
              <div className="p-5 rounded-sm bg-[#1A222C] border border-[#FFFFFF10] space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-[#C5A059] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-[#C5A059]" />
                    <span>Essential Pre-Planning Checklist</span>
                  </h4>
                  <button
                    onClick={handlePrintChecklist}
                    className="text-xs font-semibold text-[#C5A059] hover:text-[#D4B16A] inline-flex items-center gap-1"
                    title="Print checklist"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                </div>

                <ul className="space-y-2 text-xs text-[#F8F5F0]/80">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-xs border border-[#FFFFFF30] flex items-center justify-center shrink-0"></div>
                    <span>Record vital statistics (Full legal name, SSN, parents' names, military record).</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-xs border border-[#FFFFFF30] flex items-center justify-center shrink-0"></div>
                    <span>Select service preference: Traditional Funeral, Memorial Service, or Cremation.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-xs border border-[#FFFFFF30] flex items-center justify-center shrink-0"></div>
                    <span>Designate resting place wishes: Cemetery plot, mausoleum, or urn disposition.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-xs border border-[#FFFFFF30] flex items-center justify-center shrink-0"></div>
                    <span>Detail personal touches: Favorite hymns, readings, charity donations, flowers.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#FFFFFF08] flex items-center justify-between gap-3">
              <span className="text-xs text-[#F8F5F0]/50">No obligation • Confidential records</span>
              <button
                onClick={() => onOpenAppointment('Pre-Planning Arrangements')}
                className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] text-xs uppercase tracking-wider font-bold rounded-sm shadow-xs transition-colors"
              >
                Schedule Pre-Need Consultation
              </button>
            </div>
          </div>

          {/* Grief Support Guides Card */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#C5A059]" />
                <h3 className="font-serif-cormorant text-2xl font-bold text-[#F8F5F0]">
                  Grief Literature & Guides
                </h3>
              </div>
              <span className="text-xs text-[#F8F5F0]/50">Compassionate Reading</span>
            </div>

            <div className="space-y-3">
              {GRIEF_ARTICLES.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className="p-5 rounded-sm bg-[#141A21] border border-[#FFFFFF10] hover:border-[#C5A059]/40 shadow-md hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-[#C5A059] uppercase tracking-wider">
                      {art.category}
                    </span>
                    <span className="text-xs text-[#F8F5F0]/40">{art.readTime}</span>
                  </div>
                  <h4 className="font-serif-cormorant text-xl font-bold text-[#F8F5F0] group-hover:text-[#C5A059] transition-colors mb-1.5">
                    {art.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#F8F5F0]/70 leading-relaxed line-clamp-2">
                    {art.summary}
                  </p>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#C5A059] group-hover:text-[#D4B16A] inline-flex items-center gap-1 mt-2">
                    Read gentle guide →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase block mb-1">
              Common Inquiries
            </span>
            <h3 className="font-serif-cormorant text-3xl font-bold text-[#F8F5F0]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#141A21] rounded-sm border border-[#FFFFFF10] overflow-hidden shadow-md transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#F8F5F0] hover:bg-[#1A222C]"
                  >
                    <span className="font-serif-cormorant text-lg sm:text-xl">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#C5A059] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#F8F5F0]/40 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#F8F5F0]/75 leading-relaxed border-t border-[#FFFFFF08] pt-3 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grief Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="bg-[#141A21] text-[#F8F5F0] w-full max-w-2xl rounded-sm shadow-2xl border border-[#FFFFFF15] overflow-hidden max-h-[88vh] flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-[#0F1419] text-white p-6 relative border-b border-[#FFFFFF10]">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 text-[#F8F5F0]/60 hover:text-white rounded-full bg-white/5 hover:bg-white/15 transition-colors"
                aria-label="Close article"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
                {selectedArticle.category} • {selectedArticle.readTime}
              </span>
              <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#F8F5F0] mt-1">
                {selectedArticle.title}
              </h3>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-sm leading-relaxed text-[#F8F5F0]/80">
              <p className="text-base text-[#F8F5F0] font-medium italic border-l-2 border-[#C5A059] pl-3 py-1 bg-[#1A222C]">
                {selectedArticle.summary}
              </p>

              <div className="space-y-3 pt-2">
                {selectedArticle.content.map((paragraph, i) => (
                  <p key={i} className="text-[#F8F5F0]/75 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="p-4 rounded-sm bg-[#0F1419] border border-[#FFFFFF10] text-xs text-[#F8F5F0]/70 mt-6">
                <p className="font-semibold text-[#C5A059] mb-1">We are here to support your family</p>
                <p>
                  For personalized bereavement guidance or local support group connections in the Mid-Ohio Valley, please reach out to Bakers Golden Gate at{' '}
                  <strong className="text-[#F8F5F0]">(740) 691-1488</strong>.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#0F1419] border-t border-[#FFFFFF10] flex items-center justify-between">
              <span className="text-xs text-[#F8F5F0]/50">Bakers Golden Gate Care Guide</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 text-xs font-semibold text-[#F8F5F0] bg-[#1A222C] hover:bg-[#253245] border border-[#FFFFFF15] rounded-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
