import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Wrench, 
  Phone, 
  MessageCircle, 
  Printer, 
  Calendar, 
  Shield, 
  ChevronRight,
  User,
  Laptop,
  Check,
  FileText
} from 'lucide-react';
import { RepairTicket, RepairStatus, Language } from '../types';
import { SHOP_DETAILS, createWhatsAppUrl } from '../data/shopData';

interface RepairTrackerProps {
  tickets: RepairTicket[];
  lang: Language;
  onOpenBooking: () => void;
  onPrintTicket: (ticket: RepairTicket) => void;
}

export const RepairTracker: React.FC<RepairTrackerProps> = ({
  tickets,
  lang,
  onOpenBooking,
  onPrintTicket,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<RepairTicket | null>(tickets[0] || null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setErrorMsg(lang === 'hi' ? 'कृपया जॉब आईडी या फोन नंबर दर्ज करें' : 'Please enter Job ID or Phone Number');
      return;
    }

    const found = tickets.find(
      (t) =>
        t.id.toLowerCase() === query ||
        t.customerPhone.replace(/\D/g, '').includes(query.replace(/\D/g, '')) ||
        t.customerName.toLowerCase().includes(query)
    );

    if (found) {
      setSelectedTicket(found);
      setErrorMsg('');
    } else {
      setErrorMsg(
        lang === 'hi'
          ? `कोई टिकट नहीं मिला: "${searchQuery}"। कृपया जॉब नंबर जैसे KC-1082 या फोन नंबर चेक करें।`
          : `No repair job found for "${searchQuery}". Please check your Ticket ID (e.g. KC-1082) or phone number.`
      );
    }
  };

  const statusSteps: { key: RepairStatus; labelEn: string; labelHi: string; descEn: string; descHi: string }[] = [
    { key: 'received', labelEn: 'Received', labelHi: 'जमा हुआ', descEn: 'Device received at Shukla Complex counter', descHi: 'डिवाइस शुक्ला कॉम्प्लेक्स काउंटर पर जमा हुई' },
    { key: 'diagnostic', labelEn: 'Diagnostic', labelHi: 'जांच जारी', descEn: 'Hardware & motherboard inspection in progress', descHi: 'हार्डवेयर व मदरबोर्ड की जांच जारी है' },
    { key: 'waiting_approval', labelEn: 'Approval', labelHi: 'स्वीकृति', descEn: 'Quotation sent; awaiting customer confirmation', descHi: 'कोटेशन भेजा गया; ग्राहक की पुष्टि का इंतज़ार' },
    { key: 'in_repair', labelEn: 'Repairing', labelHi: 'रिपेयर कार्य', descEn: 'Precision replacement & soldering in workshop', descHi: 'वर्कशॉप में रिपेयरिंग व पार्ट्स बदलना जारी' },
    { key: 'testing', labelEn: 'Testing', labelHi: 'टेस्टिंग', descEn: 'Burn-in stress tests & quality inspection', descHi: 'क्वालिटी व हीटिंग स्ट्रेस टेस्टिंग' },
    { key: 'ready', labelEn: 'Ready for Pickup', labelHi: 'तैयार है', descEn: 'Ready for collection at Shukla Complex desk', descHi: 'शुक्ला कॉम्प्लेक्स काउंटर से प्राप्त करने हेतु तैयार' },
    { key: 'delivered', labelEn: 'Delivered', labelHi: 'डिलीवर हुआ', descEn: 'Device handed over with warranty receipt', descHi: 'वारंटी रसीद के साथ हैंडओवर पूर्ण' },
  ];

  const getStepIndex = (status: RepairStatus) => {
    return statusSteps.findIndex((s) => s.key === status);
  };

  const currentStepIdx = selectedTicket ? getStepIndex(selectedTicket.status) : -1;

  const getStatusBadge = (status: RepairStatus) => {
    switch (status) {
      case 'ready':
        return <span className="text-emerald-400 font-semibold bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded text-xs">Ready for Pickup</span>;
      case 'in_repair':
        return <span className="text-amber-300 font-semibold bg-amber-950/80 border border-amber-500/40 px-2.5 py-1 rounded text-xs">In Repair</span>;
      case 'testing':
        return <span className="text-blue-300 font-semibold bg-blue-950/80 border border-blue-500/40 px-2.5 py-1 rounded text-xs">Quality Testing</span>;
      case 'diagnostic':
        return <span className="text-indigo-300 font-semibold bg-indigo-950/80 border border-indigo-500/40 px-2.5 py-1 rounded text-xs">Diagnostic</span>;
      case 'waiting_approval':
        return <span className="text-purple-300 font-semibold bg-purple-950/80 border border-purple-500/40 px-2.5 py-1 rounded text-xs">Awaiting Approval</span>;
      case 'delivered':
        return <span className="text-slate-300 font-semibold bg-slate-800 border border-slate-700 px-2.5 py-1 rounded text-xs">Completed & Delivered</span>;
      default:
        return <span className="text-slate-400 font-semibold bg-slate-800 border border-slate-700 px-2.5 py-1 rounded text-xs">Received</span>;
    }
  };

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-400">
          <Wrench className="w-3.5 h-3.5" />
          <span>Kashi Computer Workshop Live Status</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {lang === 'hi' ? 'कंप्यूटर व लैपटॉप रिपेयर ट्रैकर' : 'Live Repair Job Status Tracker'}
        </h2>
        <p className="text-sm text-slate-400">
          {lang === 'hi'
            ? 'शुक्ला कॉम्प्लेक्स वर्कशॉप में जमा अपने लैपटॉप, डेस्कटॉप या प्रिंटर की लाइव स्थिति देखें।'
            : 'Track the repair progress of your device submitted at Shukla Complex, Rajghat, Raebareli.'}
        </p>
      </div>

      {/* Search Input Box */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'hi' ? 'जॉब आईडी (जैसे KC-1082) या मोबाइल नंबर दर्ज करें...' : 'Enter Job ID (e.g. KC-1082) or Phone Number...'}
              className="w-full pl-12 pr-28 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
            />
          </div>
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors"
          >
            {lang === 'hi' ? 'सर्च करें' : 'Track'}
          </button>
        </form>

        {errorMsg && (
          <div className="mt-2.5 p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Quick Sample Tickets Clicker */}
        <div className="mt-3 flex items-center gap-2 flex-wrap text-xs text-slate-400">
          <span>{lang === 'hi' ? 'सैंपल जॉब चेक करें:' : 'Try sample job IDs:'}</span>
          {tickets.slice(0, 4).map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTicket(t);
                setSearchQuery(t.id);
                setErrorMsg('');
              }}
              className={`px-2 py-0.5 rounded border transition-colors ${
                selectedTicket?.id === t.id
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              {t.id} ({t.brand} {t.deviceType})
            </button>
          ))}
        </div>
      </div>

      {/* Selected Ticket Details Card */}
      {selectedTicket && (
        <div className="max-w-4xl mx-auto bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          {/* Card Header */}
          <div className="p-6 bg-slate-850 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-white tracking-wider font-mono">
                  {selectedTicket.id}
                </span>
                {getStatusBadge(selectedTicket.status)}
                {selectedTicket.isPriority && (
                  <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded">
                    Urgent Express
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {selectedTicket.brand} {selectedTicket.model} · Checked in on {selectedTicket.receivedDate}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => onPrintTicket(selectedTicket)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'जॉब रसीद प्रिंट' : 'Print Receipt'}</span>
              </button>

              <a
                href={createWhatsAppUrl(`Namaste Sandeep ji (Kashi Computer), I am inquiring about my repair job ${selectedTicket.id} for ${selectedTicket.brand} ${selectedTicket.model}. Please update me on current status.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Workshop</span>
              </a>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="p-6 border-b border-slate-800 bg-slate-950/40">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
              {lang === 'hi' ? 'कार्य प्रगति टाइमलाइन' : 'Live Workflow Progress'}
            </h4>

            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-4 left-6 right-6 h-0.5 bg-slate-800" />
              <div 
                className="hidden md:block absolute top-4 left-6 h-0.5 bg-indigo-500 transition-all duration-500" 
                style={{ 
                  width: `${Math.min(100, Math.max(0, (currentStepIdx / (statusSteps.length - 2)) * 100))}%` 
                }} 
              />

              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {statusSteps.slice(0, 6).map((step, idx) => {
                  const isDone = idx < currentStepIdx;
                  const isCurrent = idx === currentStepIdx;
                  const isPending = idx > currentStepIdx;

                  return (
                    <div key={step.key} className="flex flex-col md:items-center text-left md:text-center relative">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-2 z-10 transition-colors ${
                          isDone
                            ? 'bg-indigo-600 text-white ring-4 ring-indigo-950'
                            : isCurrent
                            ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-950 animate-pulse'
                            : 'bg-slate-800 text-slate-500 border border-slate-700'
                        }`}
                      >
                        {isDone ? <Check className="w-4 h-4" /> : idx + 1}
                      </div>

                      <span
                        className={`text-xs font-semibold ${
                          isCurrent
                            ? 'text-amber-400'
                            : isDone
                            ? 'text-slate-200'
                            : 'text-slate-500'
                        }`}
                      >
                        {lang === 'hi' ? step.labelHi : step.labelEn}
                      </span>
                      <span className="text-[11px] text-slate-400 hidden md:block mt-0.5 line-clamp-2">
                        {lang === 'hi' ? step.descHi : step.descEn}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Ticket Information & Workshop Log */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Device & Customer Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {lang === 'hi' ? 'डिवाइस एवं समस्या विवरण' : 'Device & Complaint Details'}
              </h4>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3 text-sm">
                <div>
                  <span className="text-xs text-slate-500 block">Reported Issue:</span>
                  <p className="text-slate-200 font-medium">{selectedTicket.issueDescription}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-500 block">Customer Name:</span>
                    <span className="font-semibold text-slate-300">{selectedTicket.customerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Contact Phone:</span>
                    <span className="font-semibold text-slate-300">{selectedTicket.customerPhone}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Estimated Ready:</span>
                    <span className="font-semibold text-amber-400">{selectedTicket.estimatedDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Workshop Location:</span>
                    <span className="font-semibold text-slate-300">Shukla Complex, Rajghat</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-slate-400">Total Estimated Cost:</span>
                    <div className="text-base font-bold text-emerald-400">₹{selectedTicket.estimatedCost}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400">Advance Paid: ₹{selectedTicket.advancePaid}</span>
                    <div className="font-semibold text-slate-200">
                      Balance Due: ₹{Math.max(0, selectedTicket.estimatedCost - selectedTicket.advancePaid)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Technician Log & Updates */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {lang === 'hi' ? 'टेक्नीशियन नोट्स व अपडेट्स' : 'Workshop Logs & Technician Notes'}
              </h4>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-800/40 text-xs">
                  <span className="text-indigo-400 font-semibold block mb-1">Latest Technician Note:</span>
                  <p className="text-slate-300 leading-relaxed">{selectedTicket.technicianNotes}</p>
                </div>

                {/* Timeline History */}
                <div className="space-y-2 pt-1 max-h-48 overflow-y-auto pr-1">
                  {selectedTicket.updates.map((update, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-300">{update.status.toUpperCase()}</span>
                          <span className="text-[10px] text-slate-500">{update.date}</span>
                        </div>
                        <p className="text-slate-400 text-[11px]">{update.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Assistance */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Includes 90-day Kashi Computer service warranty</span>
            </span>
            <span>Shop Desk: Shukla Complex, Rajghat, Raebareli · Phone: 7398396002</span>
          </div>
        </div>
      )}

      {/* CTA: Bring device in */}
      <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/50 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">
            {lang === 'hi' ? 'क्या आपका कंप्यूटर या लैपटॉप खराब है?' : 'Need to submit a new device for repair?'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'hi'
              ? 'ऑनलाइन टोकन जनरेट करें और शुक्ला कॉम्प्लेक्स दुकान पर प्राथमिकता के साथ सर्विस प्राप्त करें।'
              : 'Generate an instant workshop token online and get fast priority inspection at Shukla Complex.'}
          </p>
        </div>
        <button
          onClick={onOpenBooking}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shrink-0"
        >
          <Wrench className="w-4 h-4" />
          <span>{lang === 'hi' ? 'नया टोकन बनाएं' : 'Book Repair Token'}</span>
        </button>
      </div>
    </div>
  );
};
