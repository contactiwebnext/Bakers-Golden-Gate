import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  Calculator,
  ShieldCheck,
  Truck,
  Clock,
  UserPlus,
  Package,
  Flame,
  Plane,
  Box,
  Car,
  AlertTriangle,
  Scale,
  CheckCircle2,
  Info,
  ArrowRight,
  Phone,
  FileText,
  FileSpreadsheet,
} from 'lucide-react';
import { OFFICIAL_PRICE_LIST, PRIMARY_COVERAGE_AREA, BUSINESS_INFO } from '../data/mockData';

interface PricingSectionProps {
  onOpenAppointment: (serviceTitle?: string) => void;
}

const itemIconMap: Record<string, React.FC<{ className?: string }>> = {
  'local-transport': Truck,
  'waiting-time': Clock,
  'extra-help': UserPlus,
  'body-bag': Package,
  'cremation-box-transport': Flame,
  'airport-pickup-delivery': Plane,
  'casket-transport': Box,
  'coach-rental': Car,
  'decomposition-fee': AlertTriangle,
  'obese-fee': Scale,
};

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenAppointment }) => {
  // Calculator State
  const [transportType, setTransportType] = useState<string>('local-transport');
  const [miles, setMiles] = useState<number>(35);
  const [waitingHours, setWaitingHours] = useState<number>(0);
  const [extraHelp, setExtraHelp] = useState<boolean>(false);
  const [bodyBag, setBodyBag] = useState<boolean>(false);
  const [decomposition, setDecomposition] = useState<boolean>(false);
  const [obeseFee, setObeseFee] = useState<boolean>(false);

  // Quote calculation logic adhering strictly to the user's price list & rules
  const quote = useMemo(() => {
    let baseFee = 100.0;
    let mileageRate = 0;
    let mileageCost = 0;
    let mileageNote = 'Included within 40-mile PCA';

    if (transportType === 'cremation-box-transport') {
      baseFee = 125.0;
    } else if (transportType === 'airport-pickup-delivery' || transportType === 'casket-transport') {
      baseFee = 225.0;
    } else if (transportType === 'coach-rental') {
      baseFee = 350.0;
    }

    // Mileage calculation based on rules:
    // PCA (<= 40 miles): included in base
    // 41 – 199 miles: base fee $100 + $2.50 per loaded mile
    // Over 200 miles: removal fee $80 + $3.00 per loaded mile
    if (miles > 200) {
      // Over 200 miles rule: removal fee $80 + $3.00 per loaded mile (unless specialized flat coach)
      if (transportType === 'coach-rental') {
        baseFee = 350.0;
        mileageRate = 3.0;
        mileageCost = miles * 3.0;
        mileageNote = `${miles} loaded miles @ $3.00/mile (Over 200 mi rate)`;
      } else {
        baseFee = 80.0; // Removal fee for 200+ miles
        mileageRate = 3.0;
        mileageCost = miles * 3.0;
        mileageNote = `${miles} loaded miles @ $3.00/mile ($80 removal fee + mileage)`;
      }
    } else if (miles > 40) {
      // 41 – 199 miles: base fee ($100 or special base) + $2.50 per loaded mile
      mileageRate = 2.5;
      const extraMiles = miles;
      mileageCost = extraMiles * 2.5;
      mileageNote = `${miles} loaded miles @ $2.50/mile (41–199 mi rate)`;
    } else {
      mileageCost = 0;
      mileageNote = `${miles} loaded miles (Included in Primary Coverage Area)`;
    }

    // Addons
    const waitingCost = waitingHours * 25.0;
    const extraHelpCost = extraHelp ? 50.0 : 0;
    const bodyBagCost = bodyBag ? 25.0 : 0;
    const decompCost = decomposition ? 50.0 : 0;
    const obeseCost = obeseFee ? 50.0 : 0;

    const addOnsTotal = waitingCost + extraHelpCost + bodyBagCost + decompCost + obeseCost;
    const total = baseFee + mileageCost + addOnsTotal;

    return {
      baseFee,
      mileageCost,
      mileageNote,
      waitingCost,
      extraHelpCost,
      bodyBagCost,
      decompCost,
      obeseCost,
      addOnsTotal,
      total,
    };
  }, [transportType, miles, waitingHours, extraHelp, bodyBag, decomposition, obeseFee]);

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#0B0F13] border-b border-[#FFFFFF10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase block mb-2">
            Transparent Mortuary Rates
          </span>
          <h2 className="font-serif-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F5F0] tracking-tight">
            Official Price List & Mileage Calculator
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4 mb-6"></div>
          <p className="text-base sm:text-lg text-[#F8F5F0]/75 leading-relaxed font-normal">
            Bakers Golden Gate Mortuary Transportation, LLC operates with 100% upfront pricing for funeral directors, medical examiners, healthcare facilities, and private families.
          </p>
        </div>

        {/* Primary Coverage Area & Policy Banner */}
        <div className="bg-[#141A21] rounded-sm p-6 sm:p-8 border border-[#C5A059]/40 shadow-2xl mb-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#C5A059] text-xs font-semibold tracking-wider uppercase">
                <Truck className="w-3.5 h-3.5" />
                <span>Primary Coverage Area (PCA)</span>
              </div>
              <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#F8F5F0]">
                40 Driving Miles From Place of Pick Up to Drop Off
              </h3>
              <p className="text-sm text-[#F8F5F0]/75 leading-relaxed">
                Standard local transports within the 40-mile PCA are billed at a flat <strong className="text-[#C5A059]">$100.00</strong> base fee. Additional transportation outside the PCA is clearly structured below.
              </p>
            </div>

            <div className="bg-[#0F1419] p-5 rounded-sm border border-[#FFFFFF15] space-y-2.5 text-xs text-[#F8F5F0]/80">
              <div className="flex items-start gap-2 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <span>WV Chief Medical Examiner Accepted</span>
              </div>
              <p className="text-[11px] text-[#F8F5F0]/60 leading-normal">
                We accept payment from the WV Chief Medical Examiner’s Office. The receiver is responsible for any mileage difference.
              </p>
              <div className="pt-2 border-t border-[#FFFFFF10] text-[10px] text-[#C5A059] font-medium uppercase tracking-wider">
                Pricing is subject to change with or without notice.
              </div>
            </div>
          </div>

          {/* Mileage Tiers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#FFFFFF10]">
            <div className="bg-[#0F1419]/70 p-4 rounded-sm border border-[#FFFFFF10]">
              <div className="text-[10px] text-[#C5A059] uppercase tracking-wider font-semibold">Tier 1: Inside PCA</div>
              <div className="text-xl font-serif-cormorant font-bold text-[#F8F5F0] mt-1">$100.00 Flat Base</div>
              <p className="text-xs text-[#F8F5F0]/60 mt-1">Up to 40 driving miles (pickup to drop off)</p>
            </div>

            <div className="bg-[#0F1419]/70 p-4 rounded-sm border border-[#FFFFFF10]">
              <div className="text-[10px] text-[#C5A059] uppercase tracking-wider font-semibold">Tier 2: 41 – 199 Miles</div>
              <div className="text-xl font-serif-cormorant font-bold text-[#F8F5F0] mt-1">$100 Base + $2.50/mi</div>
              <p className="text-xs text-[#F8F5F0]/60 mt-1">$2.50 per loaded mile outside PCA</p>
            </div>

            <div className="bg-[#0F1419]/70 p-4 rounded-sm border border-[#FFFFFF10]">
              <div className="text-[10px] text-[#C5A059] uppercase tracking-wider font-semibold">Tier 3: Over 200 Miles</div>
              <div className="text-xl font-serif-cormorant font-bold text-[#F8F5F0] mt-1">$80 Removal + $3.00/mi</div>
              <p className="text-xs text-[#F8F5F0]/60 mt-1">$80 removal fee plus $3.00 per loaded mile</p>
            </div>
          </div>
        </div>

        {/* 2-Column Section: Left Price List Cards / Right Interactive Estimator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Price List (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
                  Standardized Fee Schedule
                </span>
                <h3 className="font-serif-cormorant text-2xl font-bold text-[#F8F5F0]">
                  Itemized Rate Card
                </h3>
              </div>
              <span className="text-xs text-[#F8F5F0]/50">10 Line Items</span>
            </div>

            <div className="space-y-3">
              {OFFICIAL_PRICE_LIST.map((item, idx) => {
                const Icon = itemIconMap[item.id] || DollarSign;
                return (
                  <div
                    key={item.id}
                    id={`price-item-${item.id}`}
                    className={`p-4 rounded-sm border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      item.highlight
                        ? 'bg-[#141A21] border-[#C5A059]/40 shadow-lg'
                        : 'bg-[#10151C] border-[#FFFFFF10] hover:border-[#FFFFFF20]'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-9 h-9 rounded-sm flex items-center justify-center shrink-0 mt-0.5 ${
                        item.highlight
                          ? 'bg-[#C5A059] text-[#0F1419]'
                          : 'bg-[#1A222C] text-[#C5A059] border border-[#C5A059]/30'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-sm text-[#F8F5F0]">
                            {item.item}
                          </h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-xs bg-[#1A222C] text-[#C5A059] font-mono border border-[#FFFFFF10]">
                            {item.unit}
                          </span>
                        </div>
                        <p className="text-xs text-[#F8F5F0]/65 mt-0.5 leading-relaxed">
                          {item.details}
                        </p>
                      </div>
                    </div>

                    <div className="sm:text-right shrink-0 pl-12 sm:pl-0">
                      <div className="font-serif-cormorant text-2xl font-bold text-[#C5A059] tracking-tight">
                        {item.priceDisplay}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Mileage & Quote Estimator (5 Cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-[#141A21] rounded-sm p-6 sm:p-7 border border-[#C5A059]/40 shadow-2xl space-y-6">
              <div className="flex items-center gap-3 border-b border-[#FFFFFF10] pb-4">
                <div className="w-10 h-10 rounded-sm bg-[#C5A059] flex items-center justify-center text-[#0F1419] shrink-0">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold block">
                    Real-Time Logistics
                  </span>
                  <h3 className="font-serif-cormorant text-2xl font-bold text-[#F8F5F0]">
                    Transport Cost Estimator
                  </h3>
                </div>
              </div>

              {/* 1. Base Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#F8F5F0]/80 uppercase tracking-wider mb-2">
                  1. Select Base Service
                </label>
                <select
                  value={transportType}
                  onChange={(e) => setTransportType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0F1419] border border-[#FFFFFF15] rounded-sm text-xs sm:text-sm text-[#F8F5F0] focus:ring-1 focus:ring-[#C5A059] focus:outline-hidden"
                >
                  <option value="local-transport">Local Transport (40 mi PCA) — $100.00</option>
                  <option value="cremation-box-transport">Cremation Box Transport (up to 40 mi) — $125.00</option>
                  <option value="airport-pickup-delivery">Airport Pick Up or Delivery (83” limit) — $225.00</option>
                  <option value="casket-transport">Casket Transport (83” limit) — $225.00</option>
                  <option value="coach-rental">Coach Rental with Driver (Ford Expedition, 4h) — $350.00</option>
                </select>
              </div>

              {/* 2. Loaded Driving Miles Slider & Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#F8F5F0]/80 uppercase tracking-wider">
                    2. Loaded Driving Miles
                  </label>
                  <span className="font-mono text-xs text-[#C5A059] font-bold">
                    {miles} miles
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="350"
                  step="1"
                  value={miles}
                  onChange={(e) => setMiles(Number(e.target.value))}
                  className="w-full h-2 bg-[#0F1419] rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
                />
                <div className="flex justify-between text-[10px] text-[#F8F5F0]/40 mt-1 font-mono">
                  <span>0 mi (PCA)</span>
                  <span>40 mi (PCA limit)</span>
                  <span>200 mi</span>
                  <span>350+ mi</span>
                </div>
                <p className="text-[11px] text-[#C5A059] mt-2 font-medium">
                  {quote.mileageNote}
                </p>
              </div>

              {/* 3. Optional Add-ons & Surcharges */}
              <div className="space-y-2.5 pt-2 border-t border-[#FFFFFF10]">
                <label className="block text-xs font-semibold text-[#F8F5F0]/80 uppercase tracking-wider">
                  3. Optional Services & Add-ons
                </label>

                {/* Waiting Time */}
                <div className="flex items-center justify-between p-2.5 rounded-sm bg-[#0F1419] border border-[#FFFFFF10] text-xs">
                  <div>
                    <span className="font-medium text-[#F8F5F0]">Waiting Time ($25/hour)</span>
                    <p className="text-[10px] text-[#F8F5F0]/50">Standby time beyond standard turnaround</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setWaitingHours(Math.max(0, waitingHours - 1))}
                      className="w-6 h-6 rounded-sm bg-[#1A222C] text-[#F8F5F0] hover:bg-[#C5A059] hover:text-[#0F1419] text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-sm w-4 text-center text-[#C5A059]">
                      {waitingHours}
                    </span>
                    <button
                      type="button"
                      onClick={() => setWaitingHours(waitingHours + 1)}
                      className="w-6 h-6 rounded-sm bg-[#1A222C] text-[#F8F5F0] hover:bg-[#C5A059] hover:text-[#0F1419] text-xs font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Extra Help ($50) */}
                <label className="flex items-center justify-between p-2.5 rounded-sm bg-[#0F1419] border border-[#FFFFFF10] cursor-pointer hover:border-[#C5A059]/40 text-xs">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={extraHelp}
                      onChange={(e) => setExtraHelp(e.target.checked)}
                      className="rounded-xs text-[#C5A059] focus:ring-[#C5A059] accent-[#C5A059]"
                    />
                    <span className="text-[#F8F5F0]">Extra Help (2nd Technician)</span>
                  </div>
                  <span className="font-mono text-[#C5A059] font-bold">+$50.00</span>
                </label>

                {/* Body Bag ($25) */}
                <label className="flex items-center justify-between p-2.5 rounded-sm bg-[#0F1419] border border-[#FFFFFF10] cursor-pointer hover:border-[#C5A059]/40 text-xs">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={bodyBag}
                      onChange={(e) => setBodyBag(e.target.checked)}
                      className="rounded-xs text-[#C5A059] focus:ring-[#C5A059] accent-[#C5A059]"
                    />
                    <span className="text-[#F8F5F0]">Body Bag Unit</span>
                  </div>
                  <span className="font-mono text-[#C5A059] font-bold">+$25.00</span>
                </label>

                {/* Decomposition Fee ($50) */}
                <label className="flex items-center justify-between p-2.5 rounded-sm bg-[#0F1419] border border-[#FFFFFF10] cursor-pointer hover:border-[#C5A059]/40 text-xs">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={decomposition}
                      onChange={(e) => setDecomposition(e.target.checked)}
                      className="rounded-xs text-[#C5A059] focus:ring-[#C5A059] accent-[#C5A059]"
                    />
                    <span className="text-[#F8F5F0]">Decomposition Protocol</span>
                  </div>
                  <span className="font-mono text-[#C5A059] font-bold">+$50.00</span>
                </label>

                {/* Obese Fee (>300 lbs) ($50) */}
                <label className="flex items-center justify-between p-2.5 rounded-sm bg-[#0F1419] border border-[#FFFFFF10] cursor-pointer hover:border-[#C5A059]/40 text-xs">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={obeseFee}
                      onChange={(e) => setObeseFee(e.target.checked)}
                      className="rounded-xs text-[#C5A059] focus:ring-[#C5A059] accent-[#C5A059]"
                    />
                    <span className="text-[#F8F5F0]">Obese Handling (over 300 lbs.)</span>
                  </div>
                  <span className="font-mono text-[#C5A059] font-bold">+$50.00</span>
                </label>
              </div>

              {/* Total Quote Breakdown Card */}
              <div className="bg-[#0B0F13] p-5 rounded-sm border border-[#C5A059]/50 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#F8F5F0]/70">
                  <span>Base Transport / Removal Fee:</span>
                  <span className="font-mono text-[#F8F5F0] font-semibold">${quote.baseFee.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#F8F5F0]/70">
                  <span>Loaded Mileage ({miles} mi):</span>
                  <span className="font-mono text-[#F8F5F0] font-semibold">${quote.mileageCost.toFixed(2)}</span>
                </div>

                {quote.addOnsTotal > 0 && (
                  <div className="flex items-center justify-between text-xs text-[#F8F5F0]/70">
                    <span>Add-ons & Protocol Fees:</span>
                    <span className="font-mono text-[#F8F5F0] font-semibold">+${quote.addOnsTotal.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-[#FFFFFF15] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#C5A059] uppercase tracking-wider font-semibold block">
                      Estimated Total
                    </span>
                    <span className="text-xs text-[#F8F5F0]/60">Subject to final routing</span>
                  </div>
                  <div className="font-serif-cormorant text-3xl font-bold text-[#C5A059]">
                    ${quote.total.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  id="estimator-dispatch-btn"
                  onClick={() => onOpenAppointment(`Estimated Dispatch: $${quote.total.toFixed(2)} (${miles} miles)`)}
                  className="w-full py-3 bg-[#C5A059] hover:bg-[#D4B16A] text-[#0F1419] font-bold text-xs uppercase tracking-wider rounded-sm shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4 text-[#0F1419]" />
                  <span>Request Dispatch With This Estimate</span>
                </button>

                <a
                  href={`tel:${BUSINESS_INFO.phoneClean}`}
                  className="w-full py-2.5 bg-[#1A222C] hover:bg-[#25303D] text-[#F8F5F0] text-xs font-semibold uppercase tracking-wider rounded-sm border border-[#FFFFFF15] transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Call 740 – 691 – 1488 (Immediate Dispatch)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
