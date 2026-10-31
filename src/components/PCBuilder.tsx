import React, { useState } from 'react';
import { 
  Cpu, 
  HardDrive, 
  Monitor, 
  Zap, 
  Check, 
  Printer, 
  MessageCircle, 
  Sparkles, 
  RefreshCw, 
  Info, 
  Layers,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Sliders
} from 'lucide-react';
import { PCComponent, PCPreset, Language } from '../types';
import { PC_COMPONENTS, PC_PRESETS, SHOP_DETAILS, createWhatsAppUrl } from '../data/shopData';
import confetti from 'canvas-confetti';

interface PCBuilderProps {
  lang: Language;
  onPrintQuote: (buildData: {
    components: PCComponent[];
    totalPrice: number;
    totalWattage: number;
    presetTitle?: string;
  }) => void;
}

export const PCBuilder: React.FC<PCBuilderProps> = ({ lang, onPrintQuote }) => {
  // Initial selection defaults to Student / Office build
  const [selectedComponents, setSelectedComponents] = useState<{ [key: string]: string }>({
    cpu: 'cpu-1',
    motherboard: 'mb-1',
    ram: 'ram-2',
    storage_primary: 'ssd-2',
    storage_secondary: 'hdd-none',
    gpu: 'gpu-none',
    cabinet: 'cab-1',
    psu: 'psu-2',
    monitor: 'mon-2',
    accessories: 'acc-2',
  });

  const [activePresetId, setActivePresetId] = useState<string | null>('preset-office');

  const handleApplyPreset = (preset: PCPreset) => {
    setActivePresetId(preset.id);
    setSelectedComponents({
      cpu: preset.components.cpu,
      motherboard: preset.components.motherboard,
      ram: preset.components.ram,
      storage_primary: preset.components.storage_primary,
      storage_secondary: preset.components.storage_secondary || 'hdd-none',
      gpu: preset.components.gpu || 'gpu-none',
      cabinet: preset.components.cabinet,
      psu: preset.components.psu,
      monitor: preset.components.monitor || 'mon-none',
      accessories: preset.components.accessories || 'acc-none',
    });

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
  };

  const handleSelectComponent = (category: string, compId: string) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [category]: compId,
    }));
    setActivePresetId(null);
  };

  // Get selected objects
  const getSelectedObject = (category: string): PCComponent | undefined => {
    const id = selectedComponents[category];
    return PC_COMPONENTS.find((c) => c.id === id);
  };

  const currentList = Object.keys(selectedComponents)
    .map((cat) => getSelectedObject(cat))
    .filter((c): c is PCComponent => c !== undefined && c.price > 0);

  const totalPrice = currentList.reduce((acc, curr) => acc + curr.price, 0);

  // Wattage calculation
  const totalWattage = currentList.reduce((acc, curr) => acc + (curr.wattage || 0), 0) + 60; // 60W base for mobo/fans

  const selectedPsu = getSelectedObject('psu');
  const psuWattage = selectedPsu?.wattage || 450;
  const isPsuSufficient = psuWattage >= totalWattage;

  // Motherboard & RAM compatibility check
  const selectedMb = getSelectedObject('motherboard');
  const selectedRam = getSelectedObject('ram');
  const hasRamMismatch =
    selectedMb?.memoryType &&
    selectedRam?.name &&
    ((selectedMb.memoryType === 'DDR5' && !selectedRam.name.includes('DDR5')) ||
     (selectedMb.memoryType === 'DDR4' && selectedRam.name.includes('DDR5')));

  const categoriesOrder: { key: string; labelEn: string; labelHi: string }[] = [
    { key: 'cpu', labelEn: '1. Processor (CPU)', labelHi: '1. प्रोसेसर (CPU)' },
    { key: 'motherboard', labelEn: '2. Motherboard', labelHi: '2. मदरबोर्ड' },
    { key: 'ram', labelEn: '3. Memory (RAM)', labelHi: '3. रैम मेमोरी' },
    { key: 'storage_primary', labelEn: '4. Primary Storage (NVMe / SSD)', labelHi: '4. प्राइमरी एसएसडी' },
    { key: 'storage_secondary', labelEn: '5. Secondary Storage (Optional HDD)', labelHi: '5. सेकेंडरी हार्ड डिस्क' },
    { key: 'gpu', labelEn: '6. Graphics Card (GPU)', labelHi: '6. ग्राफिक्स कार्ड' },
    { key: 'cabinet', labelEn: '7. Cabinet & Case', labelHi: '7. कैबिनेट केस' },
    { key: 'psu', labelEn: '8. Power Supply (SMPS)', labelHi: '8. पावर सप्लाई (SMPS)' },
    { key: 'monitor', labelEn: '9. Monitor / Display', labelHi: '9. मॉनिटर डिस्प्ले' },
    { key: 'accessories', labelEn: '10. Peripherals & UPS', labelHi: '10. कीबोर्ड, माउस व यूपीएस' },
  ];

  const generateWhatsAppMessage = () => {
    let msg = `*Kashi Computer Custom PC Quotation*\n`;
    msg += `Shop: Shukla Complex, Rajghat, Raebareli\n`;
    msg += `---------------------------------------\n`;
    currentList.forEach((item) => {
      msg += `• ${item.name} - ₹${item.price.toLocaleString('en-IN')}\n`;
    });
    msg += `---------------------------------------\n`;
    msg += `*Estimated Total: ₹${totalPrice.toLocaleString('en-IN')}*\n`;
    msg += `Estimated Wattage: ~${totalWattage}W\n\n`;
    msg += `Namaste Sandeep ji, please confirm component availability and best rate for this configuration in your Raebareli store.`;
    return msg;
  };

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-time Raebareli Store Pricing</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {lang === 'hi' ? 'कस्टम पीसी बिल्डर एवं कोटेशन जनरेटर' : 'Interactive Custom PC Configurator'}
        </h2>
        <p className="text-sm text-slate-400">
          {lang === 'hi'
            ? 'अपनी पसंद के पार्ट्स चुनें, वाटेज व अनुकूलता चेक करें और 1-क्लिक में आधिकारिक कोटेशन प्राप्त करें।'
            : 'Select components, verify compatibility and wattage, and get an instant transparent quote from Kashi Computer.'}
        </p>
      </div>

      {/* 1-Click Presets */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>{lang === 'hi' ? 'लोकप्रिय प्री-बिल्ट पैकेज' : 'Popular Pre-Configured Builds'}</span>
          </h3>
          <span className="text-xs text-slate-500">Click any preset to auto-fill</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {PC_PRESETS.map((preset) => {
            const isSelected = activePresetId === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all relative ${
                  isSelected
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </span>
                )}
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
                  {lang === 'hi' ? preset.tagHindi : preset.tag}
                </span>
                <h4 className="font-bold text-white text-sm mt-2 mb-1">
                  {lang === 'hi' ? preset.titleHindi : preset.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                  {preset.description}
                </p>
                <div className="flex items-baseline justify-between pt-2 border-t border-slate-800 text-xs">
                  <span className="text-slate-500">Config:</span>
                  <span className="font-bold text-emerald-400">₹{preset.targetPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Component Pickers (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {categoriesOrder.map((cat) => {
            const options = PC_COMPONENTS.filter((c) => c.category === cat.key);
            const currentSelectedId = selectedComponents[cat.key];

            return (
              <div
                key={cat.key}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{lang === 'hi' ? cat.labelHi : cat.labelEn}</span>
                  </h4>
                  <span className="text-xs text-slate-400">
                    {options.length} options available
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {options.map((opt) => {
                    const isChosen = currentSelectedId === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectComponent(cat.key, opt.id)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                          isChosen
                            ? 'bg-indigo-950/50 border-indigo-500 shadow-sm'
                            : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-950'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-semibold text-slate-200 line-clamp-2">
                              {opt.name}
                            </span>
                            {isChosen && (
                              <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                            {opt.specs}
                          </p>
                        </div>

                        <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-slate-800/50 text-xs">
                          <span className="text-[10px] text-slate-500 font-medium">
                            {opt.brand}
                          </span>
                          <span className={`font-bold ${opt.price === 0 ? 'text-slate-400' : 'text-emerald-400'}`}>
                            {opt.price === 0 ? 'Included / Optional' : `₹${opt.price.toLocaleString('en-IN')}`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Sticky Summary & Action Desk (4 Cols) */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {lang === 'hi' ? 'कोटेशन सारांश' : 'Quotation Summary'}
                </span>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                  GST Ready
                </span>
              </div>
              <div className="text-3xl font-extrabold text-white tracking-tight">
                ₹{totalPrice.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Estimated price with assembling & OS setup included
              </p>
            </div>

            {/* Diagnostics & Specs Badge */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Estimated Power Draw:
                </span>
                <span className="font-semibold text-slate-200">~{totalWattage}W</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Power Supply (SMPS):</span>
                <span className={`font-semibold ${isPsuSufficient ? 'text-emerald-400' : 'text-red-400'}`}>
                  {psuWattage}W {isPsuSufficient ? '(Safe)' : '(Upgrade PSU)'}
                </span>
              </div>

              {hasRamMismatch && (
                <div className="p-2 rounded bg-red-950/50 border border-red-800 text-[11px] text-red-300">
                  Motherboard ({selectedMb?.memoryType}) and RAM DDR type mismatch. Kashi Computer technician will adjust to matching stick.
                </div>
              )}

              <div className="flex justify-between items-center pt-1 border-t border-slate-800/80 text-[11px] text-slate-400">
                <span>Free In-Shop Assembling</span>
                <span className="text-emerald-400 font-semibold">FREE (Save ₹800)</span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <span>Original Windows & Office Setup</span>
                <span className="text-emerald-400 font-semibold">Included</span>
              </div>
            </div>

            {/* Selected Components Itemized List (Condensed) */}
            <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1 text-xs border-t border-b border-slate-800 py-3">
              {currentList.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-slate-300">
                  <span className="truncate pr-2 text-slate-300">{item.name}</span>
                  <span className="font-mono text-slate-200 shrink-0">₹{item.price.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <a
                href={createWhatsAppUrl(generateWhatsAppMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'hi' ? 'व्हाट्सएप पर कोटेशन भेजें' : 'Send Quote to 7398396002'}</span>
              </a>

              <button
                onClick={() => {
                  onPrintQuote({
                    components: currentList,
                    totalPrice,
                    totalWattage,
                    presetTitle: activePresetId ? PC_PRESETS.find(p => p.id === activePresetId)?.title : 'Custom Configured PC',
                  });
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>{lang === 'hi' ? 'आधिकारिक कोटेशन प्रिंट करें' : 'Print / Save Quotation'}</span>
              </button>
            </div>

            {/* Shop Guarantee */}
            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Kashi Computer 1-Year Hardware Support</span>
              </div>
              <p>Pickup available at Shukla Complex, Rajghat, Raebareli.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
