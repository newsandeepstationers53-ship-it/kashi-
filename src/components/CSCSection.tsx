import React, { useState } from 'react';
import { 
  FileText, 
  CreditCard, 
  CheckCircle2, 
  Camera, 
  Zap, 
  HelpCircle, 
  MessageCircle, 
  Clock, 
  Shield, 
  AlertCircle,
  Award,
  ChevronRight
} from 'lucide-react';
import { CSC_SERVICES, SHOP_DETAILS, createWhatsAppUrl } from '../data/shopData';
import { Language, CSCService } from '../types';

interface CSCSectionProps {
  lang: Language;
}

export const CSCSection: React.FC<CSCSectionProps> = ({ lang }) => {
  const [selectedService, setSelectedService] = useState<CSCService>(CSC_SERVICES[0]);

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400">
          <Award className="w-3.5 h-3.5" />
          <span>CSC E-District & Cyber Cafe Counter</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {lang === 'hi' ? 'डिजिटल ई-सेवाएं एवं सरकारी ऑनलाइन फॉर्म' : 'CSC E-Governance & Cyber Cafe Services'}
        </h2>
        <p className="text-sm text-slate-400">
          {lang === 'hi'
            ? 'शुक्ला कॉम्प्लेक्स, राजघाट पर बिना किसी गलती के सरकारी नौकरी फॉर्म, पीवीसी आधार, नया पैन कार्ड व प्रमाणपत्र बनवाएं।'
            : 'Fast, verified online exam applications, instant waterproof PVC Aadhaar cards, PAN card corrections, and official certificates.'}
        </p>
      </div>

      {/* Main Layout: Service Grid & Interactive Document Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Services Cards (7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CSC_SERVICES.map((srv) => {
            const isSelected = selectedService.id === srv.id;
            return (
              <div
                key={srv.id}
                onClick={() => setSelectedService(srv)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-950/40 border-blue-500 shadow-md shadow-blue-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                    <span className="text-blue-400 font-semibold">{srv.department}</span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {srv.turnaround}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug mb-1">
                    {lang === 'hi' ? srv.titleHindi : srv.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-400">{srv.fee}</span>
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-0.5 group-hover:text-blue-300">
                    View Documents <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Document Checklist Helper Box (5 Cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-1">
                {lang === 'hi' ? 'आवश्यक दस्तावेज चेकलिस्ट' : 'Required Document Checklist'}
              </span>
              <h3 className="text-lg font-bold text-white">
                {lang === 'hi' ? selectedService.titleHindi : selectedService.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'hi'
                  ? 'दुकान आने से पहले यह सुनिश्चित करें कि आपके पास निम्नलिखित कागजात मौजूद हैं:'
                  : 'Bring these documents to Kashi Computer at Shukla Complex, Rajghat to avoid multiple trips:'}
              </p>
            </div>

            {/* Checklist items */}
            <div className="space-y-2.5 p-4 rounded-xl bg-slate-950 border border-slate-800">
              {selectedService.requiredDocuments.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>

            {/* Turnaround & Service Fee */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block mb-0.5">Estimated Time:</span>
                <span className="font-semibold text-amber-400">{selectedService.turnaround}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block mb-0.5">Counter Fee:</span>
                <span className="font-semibold text-emerald-400">{selectedService.fee}</span>
              </div>
            </div>

            {/* WhatsApp Inquiry */}
            <a
              href={createWhatsAppUrl(`Namaste Sandeep ji (Kashi Computer), I want to apply for *${selectedService.title}*. Please let me know if the portal is currently live.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === 'hi' ? 'व्हाट्सएप पर जानकारी लें' : 'Inquire on WhatsApp (7398396002)'}</span>
            </a>

            <div className="text-[11px] text-slate-500 text-center">
              Counter located at Shukla Complex, Rajghat, Raebareli
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
