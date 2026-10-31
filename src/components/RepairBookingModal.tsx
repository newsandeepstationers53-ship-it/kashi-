import React, { useState } from 'react';
import { 
  X, 
  Wrench, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  AlertCircle,
  Clock,
  Printer,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RepairTicket, Language } from '../types';
import { SHOP_DETAILS, createWhatsAppUrl } from '../data/shopData';

interface RepairBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onAddTicket: (ticket: RepairTicket) => void;
  onPrintTicket: (ticket: RepairTicket) => void;
}

export const RepairBookingModal: React.FC<RepairBookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  onAddTicket,
  onPrintTicket,
}) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    area: 'Rajghat',
    deviceType: 'laptop' as RepairTicket['deviceType'],
    brand: '',
    model: '',
    issueDescription: '',
    urgency: 'standard' as 'standard' | 'urgent',
    serviceMode: 'walkin' as 'walkin' | 'pickup',
  });

  const [createdTicket, setCreatedTicket] = useState<RepairTicket | null>(null);
  const [validationError, setValidationError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.customerPhone.trim() || !formData.brand.trim() || !formData.issueDescription.trim()) {
      setValidationError(lang === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें।' : 'Please fill all required fields.');
      return;
    }

    const randomNum = Math.floor(1091 + Math.random() * 50);
    const newId = `KC-${randomNum}`;
    const today = new Date().toISOString().split('T')[0];
    const estDate = new Date(Date.now() + (formData.urgency === 'urgent' ? 24 : 48) * 3600000).toISOString().split('T')[0];

    const newTicket: RepairTicket = {
      id: newId,
      customerName: formData.customerName.trim(),
      customerPhone: formData.customerPhone.trim(),
      customerAddress: `${formData.area}, Raebareli (${formData.serviceMode === 'pickup' ? 'Home Pickup Requested' : 'Walk-in Shop'})`,
      deviceType: formData.deviceType,
      brand: formData.brand.trim(),
      model: formData.model.trim() || 'Standard Model',
      issueDescription: formData.issueDescription.trim(),
      receivedDate: today,
      estimatedDate: estDate,
      status: 'received',
      technicianNotes: `Token booked online. Customer chose ${formData.serviceMode === 'pickup' ? 'doorstep pickup' : 'walk-in at Shukla Complex'}.`,
      estimatedCost: formData.urgency === 'urgent' ? 1200 : 800,
      advancePaid: 0,
      isPriority: formData.urgency === 'urgent',
      updates: [
        {
          date: `${today} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          status: 'received',
          note: `Booking created online by customer. Token #${newId} assigned.`
        }
      ]
    };

    onAddTicket(newTicket);
    setCreatedTicket(newTicket);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    setCreatedTicket(null);
    setFormData({
      customerName: '',
      customerPhone: '',
      area: 'Rajghat',
      deviceType: 'laptop',
      brand: '',
      model: '',
      issueDescription: '',
      urgency: 'standard',
      serviceMode: 'walkin',
    });
    setValidationError('');
    onClose();
  };

  const raebareliAreas = [
    'Rajghat / Shukla Complex',
    'Civil Lines',
    'Supermarket',
    'Kutchery Road',
    'Degree College Chauraha',
    'ITI Colony',
    'Indira Nagar',
    'Sultanpur Road',
    'Lalganj Road',
    'Bachhrawan Road',
    'Other Raebareli Area',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Top Header */}
        <div className="p-5 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {lang === 'hi' ? 'कंप्यूटर व लैपटॉप रिपेयर टोकन' : 'Book Workshop Repair Token'}
              </h3>
              <p className="text-xs text-slate-400">
                {SHOP_DETAILS.name} · Shukla Complex, Rajghat
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success screen after creation */}
        {createdTicket ? (
          <div className="p-6 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                {lang === 'hi' ? 'टोकन सफलतापूर्वक दर्ज हुआ' : 'Repair Booking Confirmed!'}
              </span>
              <h4 className="text-2xl font-mono font-bold text-white tracking-widest">
                {createdTicket.id}
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                {lang === 'hi'
                  ? `धन्यवाद ${createdTicket.customerName}! आपका टोकन नंबर ${createdTicket.id} Kashi Computer वर्कशॉप में दर्ज हो गया है।`
                  : `Thank you ${createdTicket.customerName}! Your job card token #${createdTicket.id} is confirmed.`}
              </p>
            </div>

            {/* Quick summary box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Device:</span>
                <span className="text-slate-200 font-semibold">{createdTicket.brand} {createdTicket.model} ({createdTicket.deviceType})</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Service Mode:</span>
                <span className="text-slate-200 font-semibold">{formData.serviceMode === 'pickup' ? 'Home Pickup' : 'Shop Walk-in (Shukla Complex)'}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Contact Phone:</span>
                <span className="text-slate-200 font-semibold">{createdTicket.customerPhone}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Turnaround:</span>
                <span className="text-amber-400 font-semibold">{createdTicket.estimatedDate}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5">
              <a
                href={createWhatsAppUrl(`Namaste Sandeep ji (Kashi Computer), I have generated repair token *${createdTicket.id}* for my *${createdTicket.brand} ${createdTicket.model}* (${createdTicket.issueDescription}). Customer: ${createdTicket.customerName}, Phone: ${createdTicket.customerPhone}, Area: ${formData.area}. Please confirm receipt.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'hi' ? 'व्हाट्सएप पर टोकन भेजें (7398396002)' : 'Send to Shop on WhatsApp (7398396002)'}</span>
              </a>

              <div className="flex gap-2">
                <button
                  onClick={() => onPrintTicket(createdTicket)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'जॉब स्लिप प्रिंट करें' : 'Print Job Slip'}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{lang === 'hi' ? 'पूर्ण करें' : 'Done & Close'}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Form screen */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {validationError && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {lang === 'hi' ? 'आपका नाम *' : 'Customer Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {lang === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number *'}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  placeholder="10-digit phone (e.g. 9838...)"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {lang === 'hi' ? 'डिवाइस प्रकार *' : 'Device Category *'}
                </label>
                <select
                  value={formData.deviceType}
                  onChange={(e) => setFormData({ ...formData, deviceType: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="laptop">Laptop (लैपटॉप)</option>
                  <option value="desktop">Desktop / Assembled PC (डेस्कटॉप)</option>
                  <option value="printer">Printer / Cartridge (प्रिंटर)</option>
                  <option value="monitor">Monitor / Screen (मॉनिटर)</option>
                  <option value="cctv">CCTV / DVR (कैमरा)</option>
                  <option value="other">Other Peripheral (अन्य)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {lang === 'hi' ? 'रायबरेली में इलाका / पता' : 'Raebareli Area'}
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  {raebareliAreas.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {lang === 'hi' ? 'ब्रांड (कंपनी) *' : 'Brand Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="Dell, HP, Lenovo, ASUS, Epson..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {lang === 'hi' ? 'मॉडल नंबर' : 'Model / Year'}
                </label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  placeholder="e.g. Inspiron 3511 / LaserJet 1020"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {lang === 'hi' ? 'समस्या का संक्षिप्त विवरण *' : 'Issue / Fault Description *'}
              </label>
              <textarea
                required
                rows={2}
                value={formData.issueDescription}
                onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
                placeholder="e.g. Broken display hinge, laptop not powering on, paper jamming, slow Windows 11..."
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Service Preferences */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div 
                onClick={() => setFormData({ ...formData, serviceMode: 'walkin' })}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                  formData.serviceMode === 'walkin'
                    ? 'bg-indigo-950/40 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="text-xs font-bold block mb-0.5">Walk-in at Shop</span>
                <span className="text-[11px] text-slate-400 block">Bring to Shukla Complex, Rajghat</span>
              </div>

              <div 
                onClick={() => setFormData({ ...formData, serviceMode: 'pickup' })}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                  formData.serviceMode === 'pickup'
                    ? 'bg-indigo-950/40 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="text-xs font-bold block mb-0.5">Doorstep Pickup</span>
                <span className="text-[11px] text-slate-400 block">Technician visit across Raebareli</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
              <span>Workshop Desk: 7398396002</span>
              <span>Rajghat, Raebareli</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              <Wrench className="w-4 h-4" />
              <span>{lang === 'hi' ? 'जॉब टोकन जनरेट करें' : 'Generate Workshop Token'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
