import React from 'react';
import { 
  Phone, 
  MessageCircle, 
  Wrench, 
  Cpu, 
  Search, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Award, 
  ChevronRight,
  Printer,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { SHOP_DETAILS, createWhatsAppUrl } from '../data/shopData';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onNavigate, onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 border-b border-slate-800">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-900/20 via-blue-900/10 to-transparent pointer-events-none blur-3xl -z-10" />
      <div className="absolute -top-12 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Urgent contact pill / notification banner */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs sm:text-sm text-slate-300 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-amber-400">
            {lang === 'hi' ? 'राजघाट, रायबरेली में उपलब्ध' : 'Shop Open at Shukla Complex'}
          </span>
          <span className="text-slate-500">|</span>
          <span>{lang === 'hi' ? 'तुरंत सहायता: 7398396002' : 'Direct Helpline: 7398396002'}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        </div>

        {/* Hero Main Heading & Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              {lang === 'hi' ? (
                <>
                  रायबरेली का विश्वसनीय <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-200 to-indigo-300">
                    कंप्यूटर, लैपटॉप रिपेयर
                  </span> एवं डिजिटल सेवा केंद्र
                </>
              ) : (
                <>
                  Trusted Computer Repair, <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-200 to-indigo-300">
                    Custom PC Builds
                  </span> & Digital Services in Raebareli
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {lang === 'hi'
                ? 'शुक्ला कॉम्प्लेक्स, राजघाट पर स्थित। लैपटॉप-कंप्यूटर चिप-लेवल रिपेयर, स्क्रीन एवं मदरबोर्ड रिप्लेसमेंट, प्रिंटर टोनर, हाई-स्पीड एसएसडी अपग्रेड तथा सभी सरकारी ऑनलाइन फॉर्म व ई-सेवाएं।'
                : 'Located at Shukla Complex, Rajghat, Raebareli. Expert chip-level laptop & desktop servicing, screen/hinge repair, custom gaming & billing PCs, printer refilling, and CSC digital online services.'}
            </p>

            {/* Quick feature tags */}
            <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'hi' ? '90 दिन रिपेयर वारंटी' : '90-Day Repair Warranty'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'hi' ? 'ओरिजिनल स्पेयर पार्ट्स' : '100% Genuine Parts'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'hi' ? 'हाथ के हाथ डायग्नोसिस' : 'Same-Day Urgent Service'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'hi' ? 'पारदर्शी बिलिंग' : 'Fair Local Pricing'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                <Wrench className="w-4 h-4" />
                <span>{lang === 'hi' ? 'रिपेयर टोकन बुक करें' : 'Book a Repair'}</span>
              </button>

              <button
                onClick={() => onNavigate('builder')}
                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all"
              >
                <Cpu className="w-4 h-4" />
                <span>{lang === 'hi' ? 'कस्टम पीसी बिल्डर' : 'Build Custom PC'}</span>
              </button>

              <a
                href={createWhatsAppUrl("Namaste Sandeep ji (Kashi Computer), I need details about repair service / PC quotation in Raebareli.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 font-semibold text-sm flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${SHOP_DETAILS.phone}`}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 font-semibold text-sm flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>7398396002</span>
              </a>
            </div>

            {/* Address Snippet */}
            <div className="pt-2 flex items-start gap-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                {lang === 'hi'
                  ? 'पता: शुक्ला कॉम्प्लेक्स, राजघाट, रायबरेली (सुपरमार्केट रोड के पास) · पिन: 229001'
                  : 'Address: Shukla Complex, Rajghat, Raebareli, UP - 229001 (Near Supermarket Road)'}
              </span>
            </div>
          </div>

          {/* Right Column: 4 Interactive Fast-Action Tiles */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
            {/* Tile 1: Track Repair */}
            <div
              onClick={() => onNavigate('tracker')}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {lang === 'hi' ? 'रिपेयर स्टेटस चेक करें' : 'Track Existing Job'}
                  </h3>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'hi'
                  ? 'अपना जॉब टोकन (उदा. KC-1082) या मोबाइल नंबर डालकर लाइव स्थिति देखें।'
                  : 'Enter Job Ticket (e.g. KC-1082) or mobile number for real-time workshop status.'}
              </p>
            </div>

            {/* Tile 2: Custom PC Builder */}
            <div
              onClick={() => onNavigate('builder')}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-amber-300 transition-colors">
                    {lang === 'hi' ? 'कस्टम पीसी कोटेशन' : 'PC Builder & Wattage Calc'}
                  </h3>
                </div>
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
                  Free Estimate
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'hi'
                  ? 'स्टूडेंट, शॉप बिलिंग, फोटो/वीडियो एडिटिंग या गेमिंग के लिए तुरंत कोटेशन बनाएं।'
                  : 'Configure components, calculate price & wattage, and send direct WhatsApp quote.'}
              </p>
            </div>

            {/* Tile 3: Browse Parts & Laptops */}
            <div
              onClick={() => onNavigate('store')}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {lang === 'hi' ? 'दुकान इन्वेंटरी व लैपटॉप' : 'Laptops, SSDs & Accessories'}
                  </h3>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'hi'
                  ? 'ब्रांडेड एसएसडी, रैम, कीबोर्ड, लेज़र प्रिंटर, सीपी प्लस सीसीटीवी कैमरा स्टॉक।'
                  : 'Crucial/Kingston SSDs, HP LaserJet printers, Logitech combos, CCTV kits.'}
              </p>
            </div>

            {/* Tile 4: CSC Cyber Cafe Services */}
            <div
              onClick={() => onNavigate('csc')}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {lang === 'hi' ? 'सरकारी फॉर्म एवं ई-सेवाएं' : 'Govt Online Forms & CSC'}
                  </h3>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'hi'
                  ? 'यूपी पुलिस, एसएससी, आधार पीवीसी प्रिंटिंग, पैन कार्ड, आय-जाति प्रमाण पत्र।'
                  : 'Fast online exam applications, instant PVC Aadhaar cards, PAN card correction.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
