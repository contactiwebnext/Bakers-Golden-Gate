import React, { useState, useEffect } from 'react';
import {
  Search,
  Flame,
  Heart,
  MessageSquare,
  Calendar,
  MapPin,
  X,
  Send,
  Sparkles,
  Share2,
  Check,
  Flower2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { OBITUARIES_DATA } from '../data/mockData';
import { Obituary, TributeItem } from '../types';

export const Obituaries: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedObituary, setSelectedObituary] = useState<Obituary | null>(null);
  const [tributes, setTributes] = useState<TributeItem[]>([]);
  const [loadingTributes, setLoadingTributes] = useState(false);

  // Tribute Form state
  const [authorName, setAuthorName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [condolenceMessage, setCondolenceMessage] = useState('');
  const [isLightingCandle, setIsLightingCandle] = useState(true);
  const [submittingTribute, setSubmittingTribute] = useState(false);
  const [tributeSuccess, setTributeSuccess] = useState(false);

  // Local state for candle counts
  const [candleCounts, setCandleCounts] = useState<Record<string, number>>(() => {
    const counts: Record<string, number> = {};
    OBITUARIES_DATA.forEach((o) => {
      counts[o.id] = o.virtualCandlesCount;
    });
    return counts;
  });

  const [copiedLink, setCopiedLink] = useState(false);

  // Fetch tributes when an obituary is selected
  useEffect(() => {
    if (selectedObituary) {
      setLoadingTributes(true);
      fetch(`/api/tributes?obituaryId=${selectedObituary.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setTributes(data);
          }
        })
        .catch((err) => console.error('Error loading tributes:', err))
        .finally(() => setLoadingTributes(false));
    }
  }, [selectedObituary]);

  const handleLightCandle = (obitId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // Trigger gentle celebratory petals/golden sparkles
    confetti({
      particleCount: 28,
      spread: 55,
      origin: { y: 0.6 },
      colors: ['#DFC7A2', '#C5A880', '#E5C38F', '#FAF9F6'],
      shapes: ['circle'],
      scalar: 0.8,
    });

    setCandleCounts((prev) => ({
      ...prev,
      [obitId]: (prev[obitId] || 0) + 1,
    }));
  };

  const handleShare = (obit: Obituary) => {
    if (navigator.share) {
      navigator
        .share({
          title: `In Loving Memory of ${obit.fullName}`,
          text: `Memorial tribute and services for ${obit.fullName} in Parkersburg, WV - Bakers Golden Gate.`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleSubmitTribute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedObituary || !authorName.trim() || !condolenceMessage.trim()) return;

    setSubmittingTribute(true);
    try {
      const payload = {
        obituaryId: selectedObituary.id,
        author: authorName.trim(),
        relation: relationship.trim() || 'Friend / Community Member',
        message: condolenceMessage.trim(),
        candleLit: isLightingCandle,
      };

      const res = await fetch('/api/tributes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.tribute) {
        setTributes((prev) => [data.tribute, ...prev]);
        if (isLightingCandle) {
          handleLightCandle(selectedObituary.id);
        }
        setTributeSuccess(true);
        setAuthorName('');
        setRelationship('');
        setCondolenceMessage('');
        setTimeout(() => setTributeSuccess(false), 4000);
      }
    } catch (err) {
      console.error('Error submitting tribute:', err);
    } finally {
      setSubmittingTribute(false);
    }
  };

  const filteredObituaries = OBITUARIES_DATA.filter(
    (item) =>
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="obituaries" className="py-20 sm:py-28 bg-[#141A21] border-b border-[#FFFFFF10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase block mb-2">
            In Loving Memory
          </span>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F5F0] tracking-tight">
            Current Services & Memorial Tributes
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4 mb-6"></div>
          <p className="text-base sm:text-lg text-[#F8F5F0]/75 leading-relaxed font-normal">
            We invite you to remember cherished lives, view upcoming service arrangements, light a virtual memorial candle, and leave heartfelt messages of condolence for grieving families.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="w-5 h-5 text-[#F8F5F0]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="obituary-search-input"
              type="text"
              placeholder="Search by loved one's name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#1A222C] border border-[#FFFFFF15] rounded-sm text-sm text-[#F8F5F0] placeholder-[#F8F5F0]/40 focus:outline-hidden focus:ring-1 focus:ring-[#C5A059] focus:border-transparent shadow-lg"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#F8F5F0]/50 hover:text-white px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Obituaries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredObituaries.map((obit) => {
            const candles = candleCounts[obit.id] || obit.virtualCandlesCount;
            return (
              <div
                key={obit.id}
                id={`obituary-card-${obit.id}`}
                onClick={() => setSelectedObituary(obit)}
                className="bg-[#1A222C] rounded-sm border border-[#FFFFFF10] shadow-xl hover:shadow-2xl hover:border-[#C5A059]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Portrait / Photo Header */}
                  <div className="relative h-64 overflow-hidden bg-slate-950">
                    <img
                      src={obit.imageUrl}
                      alt={obit.fullName}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A222C] via-[#1A222C]/20 to-transparent"></div>

                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-sm bg-[#0F1419]/80 backdrop-blur-xs text-[#C5A059] text-xs font-semibold border border-[#C5A059]/30">
                        {obit.serviceType}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-xs text-[#C5A059] font-semibold tracking-wider block">
                        {obit.years}
                      </span>
                      <h3 className="font-serif-cormorant text-2xl font-bold leading-tight text-[#F8F5F0]">
                        {obit.fullName}
                      </h3>
                    </div>
                  </div>

                  {/* Summary & Service Details */}
                  <div className="p-6">
                    <div className="flex items-start gap-2 text-xs text-[#F8F5F0]/75 mb-3 bg-[#141A21] p-2.5 rounded-sm border border-[#FFFFFF08]">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{obit.serviceDateLocation}</span>
                    </div>

                    <p className="text-sm text-[#F8F5F0]/70 line-clamp-3 leading-relaxed mb-4">
                      {obit.summary}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions Bar */}
                <div className="px-6 py-4 bg-[#0F1419] border-t border-[#FFFFFF08] flex items-center justify-between">
                  {/* Light Candle Button */}
                  <button
                    onClick={(e) => handleLightCandle(obit.id, e)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C5A059] hover:text-[#D4B16A] bg-[#141A21] hover:bg-[#1A222C] px-3 py-1.5 rounded-sm border border-[#C5A059]/40 transition-colors"
                    title="Light a virtual memorial candle"
                  >
                    <Flame className="w-3.5 h-3.5 text-amber-400 animate-candle" />
                    <span>{candles} Candles Lit</span>
                  </button>

                  <span className="text-xs uppercase tracking-wider font-semibold text-[#F8F5F0]/80 group-hover:text-[#C5A059] inline-flex items-center gap-1 transition-colors">
                    View Tribute Book →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredObituaries.length === 0 && (
          <div className="text-center py-16 bg-[#1A222C] rounded-sm border border-[#FFFFFF10] p-8 max-w-md mx-auto">
            <p className="text-base text-[#F8F5F0]/80 mb-2">No memorial records found matching "{searchTerm}".</p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs font-semibold text-[#C5A059] underline"
            >
              Clear search filter
            </button>
          </div>
        )}
      </div>

      {/* Obituary Detail & Memorial Condolence Modal */}
      {selectedObituary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="bg-[#141A21] text-[#F8F5F0] w-full max-w-3xl rounded-sm shadow-2xl border border-[#FFFFFF15] overflow-hidden max-h-[92vh] flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Top Banner */}
            <div className="relative bg-[#0F1419] text-white p-6 pb-8 border-b border-[#FFFFFF10]">
              <button
                onClick={() => setSelectedObituary(null)}
                className="absolute top-4 right-4 p-2 text-[#F8F5F0]/60 hover:text-white rounded-full bg-white/5 hover:bg-white/15 transition-colors z-10"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#C5A059] shadow-lg shrink-0 bg-slate-900">
                  <img
                    src={selectedObituary.imageUrl}
                    alt={selectedObituary.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
                    In Loving Remembrance
                  </span>
                  <h2 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#F8F5F0]">
                    {selectedObituary.fullName}
                  </h2>
                  <p className="text-sm text-[#C5A059]">{selectedObituary.years}</p>
                  <p className="text-xs text-[#F8F5F0]/70 flex items-center justify-center sm:justify-start gap-1 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    {selectedObituary.serviceDateLocation}
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-[#FFFFFF10]">
                <button
                  onClick={() => handleLightCandle(selectedObituary.id)}
                  className="px-4 py-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-transform active:scale-95"
                >
                  <Flame className="w-4 h-4 text-[#0F1419] fill-[#0F1419] animate-candle" />
                  <span>Light a Candle ({candleCounts[selectedObituary.id] || selectedObituary.virtualCandlesCount})</span>
                </button>

                <button
                  onClick={() => handleShare(selectedObituary)}
                  className="px-3.5 py-2 rounded-sm bg-[#1A222C] hover:bg-[#253245] text-[#F8F5F0] font-medium text-xs flex items-center gap-1.5 border border-[#FFFFFF15] transition-colors"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-[#C5A059]" />}
                  <span>{copiedLink ? 'Link Copied' : 'Share Obituary'}</span>
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-8 text-sm">
              {/* Full Life Story */}
              <div>
                <h3 className="font-serif-cormorant text-2xl font-bold text-[#F8F5F0] mb-3 pb-2 border-b border-[#FFFFFF10]">
                  Obituary & Life Legacy
                </h3>
                <div className="text-[#F8F5F0]/80 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
                  {selectedObituary.fullObituary}
                </div>
              </div>

              {/* Condolences & Tributes Wall */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#FFFFFF10]">
                  <h3 className="font-serif-cormorant text-2xl font-bold text-[#F8F5F0] flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-400 fill-red-400/20" />
                    <span>Condolence Book & Memories</span>
                  </h3>
                  <span className="text-xs text-[#F8F5F0]/50 font-medium">{tributes.length} tributes posted</span>
                </div>

                {/* Submit a Tribute Form */}
                <form
                  onSubmit={handleSubmitTribute}
                  className="bg-[#1A222C] p-5 rounded-sm border border-[#FFFFFF10] shadow-md mb-6 space-y-3"
                >
                  <h4 className="font-medium text-sm text-[#F8F5F0] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>Leave a Condolence Message for the Family</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#F8F5F0]/70 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John & Sarah Miller"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#141A21] border border-[#FFFFFF15] rounded-sm text-[#F8F5F0] focus:ring-1 focus:ring-[#C5A059] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#F8F5F0]/70 mb-1">
                        Relationship / Community (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Neighbor, Coworker, Friend"
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#141A21] border border-[#FFFFFF15] rounded-sm text-[#F8F5F0] focus:ring-1 focus:ring-[#C5A059] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#F8F5F0]/70 mb-1">Your Message or Memory *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share a cherished memory, comfort, or prayer for the family..."
                      value={condolenceMessage}
                      onChange={(e) => setCondolenceMessage(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#141A21] border border-[#FFFFFF15] rounded-sm text-[#F8F5F0] focus:ring-1 focus:ring-[#C5A059] focus:outline-hidden"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 text-xs text-[#F8F5F0]/70 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isLightingCandle}
                        onChange={(e) => setIsLightingCandle(e.target.checked)}
                        className="rounded text-[#C5A059] focus:ring-[#C5A059]"
                      />
                      <span>Light a virtual memorial candle with this note</span>
                    </label>

                    <button
                      type="submit"
                      disabled={submittingTribute}
                      className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] text-xs uppercase tracking-wider font-bold rounded-sm shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submittingTribute ? 'Posting...' : 'Post Tribute'}</span>
                    </button>
                  </div>

                  {tributeSuccess && (
                    <div className="p-2.5 rounded-sm bg-emerald-950/80 text-emerald-300 text-xs border border-emerald-700/50 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Thank you. Your message of comfort has been added to the memorial book.</span>
                    </div>
                  )}
                </form>

                {/* List of Tributes */}
                {loadingTributes ? (
                  <p className="text-xs text-[#F8F5F0]/50 text-center py-4">Loading condolences...</p>
                ) : tributes.length === 0 ? (
                  <div className="text-center py-6 bg-[#1A222C] rounded-sm border border-[#FFFFFF10] text-xs text-[#F8F5F0]/60">
                    Be the first to share a warm memory or prayer for the family.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tributes.map((tribute) => (
                      <div
                        key={tribute.id}
                        className="p-4 rounded-sm bg-[#0F1419] border border-[#FFFFFF08] shadow-md space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-[#F8F5F0]">{tribute.author}</span>
                            {tribute.relation && (
                              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#1A222C] text-[#F8F5F0]/60 border border-[#FFFFFF10]">
                                {tribute.relation}
                              </span>
                            )}
                          </div>
                          {tribute.candleLit && (
                            <span className="text-[11px] text-[#C5A059] flex items-center gap-1 bg-[#C5A059]/10 px-2 py-0.5 rounded border border-[#C5A059]/30">
                              <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                              Candle Lit
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-[#F8F5F0]/80 leading-relaxed italic">
                          "{tribute.message}"
                        </p>
                        <span className="text-[10px] text-[#F8F5F0]/40 block">
                          {new Date(tribute.timestamp).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#0F1419] border-t border-[#FFFFFF10] flex items-center justify-between">
              <span className="text-xs text-[#F8F5F0]/50">Arrangements by Bakers Golden Gate • Parkersburg, WV</span>
              <button
                onClick={() => setSelectedObituary(null)}
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
