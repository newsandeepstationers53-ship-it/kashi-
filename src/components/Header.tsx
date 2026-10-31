import React from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Wrench, 
  Cpu, 
  Search, 
  FileText, 
  ShoppingBag, 
  Shield, 
  MessageCircle,
  Menu,
  X,
  Lock
} from 'lucide-react';
import { SHOP_DETAILS, createWhatsAppUrl } from '../data/shopData';
import { Language } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenBooking: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  onOpenBooking,
  isAdminOpen,
  setIsAdminOpen,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home', labelHi: 'होम', icon: null },
    { id: 'repair', label: 'Repairs & Services', labelHi: 'रिपेयर सेवाएं', icon: Wrench },
    { id: 'builder', label: 'Custom PC Builder', labelHi: 'कस्टम पीसी', icon: Cpu, badge: 'New' },
    { id: 'tracker', label: 'Track Repair', labelHi: 'स्टेटस चेक', icon: Search },
    { id: 'store', label: 'Products & Parts', labelHi: 'हार्डवेयर स्टोर', icon: ShoppingBag },
    { id: 'csc', label: 'CSC E-Forms', labelHi: 'ई-सेवा व फॉर्म', icon: FileText },
    { id: 'contact', label: 'Contact & Map', labelHi: 'दुकान का पता', icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      {/* Top micro bar for quick business info */}
      <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{SHOP_DETAILS.address}, {SHOP_DETAILS.city}</span>
            </span>
            <span className="hidden sm:inline-block text-slate-600">·</span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Open: {SHOP_DETAILS.hours.weekdays}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800 rounded p-0.5 border border-slate-700">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
                  lang === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
                  lang === 'hi' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* Direct Call / WhatsApp */}
            <a
              href={`tel:${SHOP_DETAILS.phone}`}
              className="flex items-center gap-1.5 font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{SHOP_DETAILS.phone}</span>
            </a>

            <a
              href={createWhatsAppUrl("Namaste Kashi Computer, I have an inquiry about computer repair / product in Raebareli shop.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Admin Desk link */}
            <button
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs transition-colors ${
                isAdminOpen 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Shop Staff / Admin Desk"
            >
              <Lock className="w-3 h-3" />
              <span className="hidden sm:inline">Staff Desk</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div 
          onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/30 group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5 text-indigo-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                {lang === 'hi' ? SHOP_DETAILS.nameHindi : SHOP_DETAILS.name}
              </h1>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-700/50 px-1.5 py-0.5 rounded">
                Raebareli
              </span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-1">
              {lang === 'hi' ? 'शुक्ला कॉम्प्लेक्स, राजघाट · 7398396002' : 'Shukla Complex, Rajghat · 7398396002'}
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-slate-800 shadow-sm border border-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />}
                <span>{lang === 'hi' ? item.labelHi : item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-1 rounded">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/10 transition-all active:scale-95"
          >
            <Wrench className="w-4 h-4" />
            <span>{lang === 'hi' ? 'रिपेयर बुक करें' : 'Book Repair'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 py-3 space-y-1 shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {Icon && <Icon className="w-4 h-4 text-indigo-400" />}
                  <span>{lang === 'hi' ? item.labelHi : item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center gap-1.5"
            >
              <Wrench className="w-4 h-4" />
              <span>{lang === 'hi' ? 'रिपेयर बुक करें' : 'Book Repair'}</span>
            </button>
            <a
              href={`tel:${SHOP_DETAILS.phone}`}
              className="py-2.5 px-4 rounded-lg text-sm font-semibold bg-slate-800 text-amber-400 hover:bg-slate-700 flex items-center justify-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
