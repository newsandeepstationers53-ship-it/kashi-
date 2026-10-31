import React from 'react';
import { 
  Monitor, 
  Cpu, 
  Zap, 
  Printer, 
  HardDrive, 
  ShieldCheck, 
  Clock, 
  Phone, 
  MessageCircle,
  Wrench,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { SERVICE_ITEMS, SHOP_DETAILS, createWhatsAppUrl } from '../data/shopData';
import { Language } from '../types';

interface ServicesSectionProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang, onOpenBooking }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor': return <Monitor className="w-5 h-5 text-indigo-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-amber-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'Printer': return <Printer className="w-5 h-5 text-emerald-400" />;
      case 'HardDrive': return <HardDrive className="w-5 h-5 text-blue-400" />;
      default: return <ShieldCheck className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-400">
          <Wrench className="w-3.5 h-3.5" />
          <span>Professional Chip-Level Repair Lab</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {lang === 'hi' ? 'विशेषज्ञ कंप्यूटर एवं लैपटॉप रिपेयर सेवाएं' : 'Expert Repair & IT Services in Raebareli'}
        </h2>
        <p className="text-sm text-slate-400">
          {lang === 'hi'
            ? 'शुक्ला कॉम्प्लेक्स, राजघाट पर आधुनिक माइक्रो-सोल्डरिंग उपकरण व प्रमाणित टेक्नीशियन द्वारा काम।'
            : 'From chip-level motherboard restoration to same-day printer cartridge refilling, we handle it all with authentic warranty.'}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICE_ITEMS.map((service) => {
          return (
            <div
              key={service.id}
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition-all group shadow-sm hover:shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                    {service.category}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {lang === 'hi' ? service.titleHindi : service.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang === 'hi' ? service.descriptionHindi : service.description}
                  </p>
                </div>

                {/* Specs Box */}
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      Turnaround:
                    </span>
                    <span className="font-semibold text-slate-200">{service.turnaround}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Warranty:
                    </span>
                    <span className="font-semibold text-slate-200">{service.warranty}</span>
                  </div>
                </div>
              </div>

              {/* Price & Booking Button */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-slate-500 block">Starting from</span>
                  <span className="text-base font-bold text-emerald-400">₹{service.startingPrice}</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={createWhatsAppUrl(`Namaste Kashi Computer, I need inquiry regarding *${service.title}* at your Shukla Complex shop.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition-colors"
                    title="WhatsApp Inquiry"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  <button
                    onClick={onOpenBooking}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'बुक करें' : 'Book Service'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Workshop Assurance Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <h3 className="text-base font-bold text-white">
            {lang === 'hi' ? 'चिंतामुक्त हार्डवेयर रिपेयरिंग गारंटी' : 'Why Raebareli Trusts Kashi Computer'}
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            {lang === 'hi'
              ? 'बिना ग्राहक की पूर्व स्वीकृति के कोई पार्ट नहीं बदला जाता। पुराना बदला हुआ खराब पार्ट आपको वापस दिया जाता है।'
              : 'No unexpected charges. Free honest diagnostic check, 100% data confidentiality, and replaced faulty parts returned to you.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${SHOP_DETAILS.phone}`}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call 7398396002</span>
          </a>
          <button
            onClick={onOpenBooking}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md"
          >
            {lang === 'hi' ? 'सर्विस टोकन लें' : 'Generate Token'}
          </button>
        </div>
      </div>
    </div>
  );
};
