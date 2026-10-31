/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Mail, 
  ShieldCheck, 
  Heart,
  ChevronUp
} from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PCBuilder } from './components/PCBuilder';
import { RepairTracker } from './components/RepairTracker';
import { ProductCatalog } from './components/ProductCatalog';
import { CSCSection } from './components/CSCSection';
import { ContactAndLocation } from './components/ContactAndLocation';
import { RepairBookingModal } from './components/RepairBookingModal';
import { AdminPortal } from './components/AdminPortal';
import { PrintableDocument } from './components/PrintableDocument';

import { SHOP_DETAILS, INITIAL_REPAIR_TICKETS, createWhatsAppUrl } from './data/shopData';
import { RepairTicket, PCComponent, Language } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [lang, setLang] = useState<Language>('en');
  
  // Repair tickets state with localStorage persistence
  const [tickets, setTickets] = useState<RepairTicket[]>(() => {
    const saved = localStorage.getItem('kashi_repair_tickets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_REPAIR_TICKETS;
      }
    }
    return INITIAL_REPAIR_TICKETS;
  });

  useEffect(() => {
    localStorage.setItem('kashi_repair_tickets', JSON.stringify(tickets));
  }, [tickets]);

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [printDoc, setPrintDoc] = useState<{
    isOpen: boolean;
    type: 'ticket' | 'pc_quote';
    ticketData?: RepairTicket;
    quoteData?: {
      components: PCComponent[];
      totalPrice: number;
      totalWattage: number;
      presetTitle?: string;
    };
  }>({
    isOpen: false,
    type: 'ticket',
  });

  const handleAddTicket = (newTicket: RepairTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

  const handleUpdateTicket = (updatedTicket: RepairTicket) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t))
    );
  };

  const handlePrintTicket = (ticket: RepairTicket) => {
    setPrintDoc({
      isOpen: true,
      type: 'ticket',
      ticketData: ticket,
    });
  };

  const handlePrintQuote = (quoteData: {
    components: PCComponent[];
    totalPrice: number;
    totalWattage: number;
    presetTitle?: string;
  }) => {
    setPrintDoc({
      isOpen: true,
      type: 'pc_quote',
      quoteData,
    });
  };

  // Scroll to top helper on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Global Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        onOpenBooking={() => setIsBookingOpen(true)}
        isAdminOpen={isAdminOpen}
        setIsAdminOpen={setIsAdminOpen}
      />

      {/* Main View Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6">
        {currentTab === 'home' && (
          <div className="space-y-12">
            <Hero
              lang={lang}
              onNavigate={(tab) => setCurrentTab(tab)}
              onOpenBooking={() => setIsBookingOpen(true)}
            />
            <ServicesSection
              lang={lang}
              onOpenBooking={() => setIsBookingOpen(true)}
            />
            <div className="border-t border-slate-800/80 pt-8">
              <RepairTracker
                tickets={tickets}
                lang={lang}
                onOpenBooking={() => setIsBookingOpen(true)}
                onPrintTicket={handlePrintTicket}
              />
            </div>
            <div className="border-t border-slate-800/80 pt-8">
              <ContactAndLocation lang={lang} />
            </div>
          </div>
        )}

        {currentTab === 'repair' && (
          <ServicesSection
            lang={lang}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {currentTab === 'builder' && (
          <PCBuilder
            lang={lang}
            onPrintQuote={handlePrintQuote}
          />
        )}

        {currentTab === 'tracker' && (
          <RepairTracker
            tickets={tickets}
            lang={lang}
            onOpenBooking={() => setIsBookingOpen(true)}
            onPrintTicket={handlePrintTicket}
          />
        )}

        {currentTab === 'store' && (
          <ProductCatalog lang={lang} />
        )}

        {currentTab === 'csc' && (
          <CSCSection lang={lang} />
        )}

        {currentTab === 'contact' && (
          <ContactAndLocation lang={lang} />
        )}
      </main>

      {/* Floating Mobile WhatsApp Button */}
      <aside aria-label="Quick Contact Helpline" className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5">
        <a
          href={createWhatsAppUrl("Namaste Kashi Computer, I am messaging from your website regarding repair / PC build in Raebareli.")}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-950/60 active:scale-95 transition-transform border border-emerald-400/40"
          title="Chat with Kashi Computer on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </aside>

      {/* Footer */}
      <footer className="mt-16 bg-slate-900 border-t border-slate-800 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Shop Brand & Address */}
          <div className="space-y-3 md:col-span-1">
            <h3 className="text-base font-bold text-white tracking-tight">
              {lang === 'hi' ? SHOP_DETAILS.nameHindi : SHOP_DETAILS.name}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {lang === 'hi' ? SHOP_DETAILS.taglineHindi : SHOP_DETAILS.tagline}
            </p>
            <div className="space-y-1 text-slate-400 pt-1">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{SHOP_DETAILS.address}, {SHOP_DETAILS.city}, UP - {SHOP_DETAILS.pincode}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`tel:${SHOP_DETAILS.phone}`} className="hover:text-white transition-colors">{SHOP_DETAILS.phoneFormatted}</a>
              </p>
              <p className="flex items-center gap-1.5 truncate">
                <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="truncate">{SHOP_DETAILS.email}</span>
              </p>
            </div>
          </div>

          {/* Col 2: Services Quick Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Services in Raebareli
            </h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => setCurrentTab('repair')} className="hover:text-white transition-colors">Laptop Screen & Hinge Repair</button></li>
              <li><button onClick={() => setCurrentTab('repair')} className="hover:text-white transition-colors">Motherboard Chip-Level Repair</button></li>
              <li><button onClick={() => setCurrentTab('repair')} className="hover:text-white transition-colors">SSD Upgrades & Windows Clone</button></li>
              <li><button onClick={() => setCurrentTab('repair')} className="hover:text-white transition-colors">HP LaserJet Cartridge Refill</button></li>
              <li><button onClick={() => setCurrentTab('repair')} className="hover:text-white transition-colors">CCTV Camera Setup</button></li>
            </ul>
          </div>

          {/* Col 3: CSC & PC Building */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Digital & Hardware
            </h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => setCurrentTab('builder')} className="hover:text-white transition-colors">Custom Gaming & Office PC</button></li>
              <li><button onClick={() => setCurrentTab('store')} className="hover:text-white transition-colors">Crucial & Kingston SSDs</button></li>
              <li><button onClick={() => setCurrentTab('csc')} className="hover:text-white transition-colors">UP Police & SSC Online Forms</button></li>
              <li><button onClick={() => setCurrentTab('csc')} className="hover:text-white transition-colors">Aadhaar PVC Card (5 Mins)</button></li>
              <li><button onClick={() => setCurrentTab('tracker')} className="hover:text-white transition-colors">Track Repair Job Status</button></li>
            </ul>
          </div>

          {/* Col 4: Shop Timings & Fast Actions */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Store Timings
            </h4>
            <div className="space-y-1 text-slate-300">
              <p className="flex justify-between">
                <span>Mon – Sat:</span>
                <span className="font-semibold text-white">{SHOP_DETAILS.hours.weekdays}</span>
              </p>
              <p className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-semibold text-emerald-400">{SHOP_DETAILS.hours.sunday}</span>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
              >
                Book Repair Token Online
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-slate-800/80 max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} {SHOP_DETAILS.name}. All rights reserved. Shukla Complex, Rajghat, Raebareli, UP.</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>Direct Shop Contact: 7398396002</span>
          </p>
        </div>
      </footer>

      {/* Modals & Dialogs */}
      <RepairBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        lang={lang}
        onAddTicket={handleAddTicket}
        onPrintTicket={handlePrintTicket}
      />

      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        tickets={tickets}
        onUpdateTicket={handleUpdateTicket}
        onAddTicket={handleAddTicket}
        onPrintTicket={handlePrintTicket}
        lang={lang}
      />

      {printDoc.isOpen && (
        <PrintableDocument
          type={printDoc.type}
          ticketData={printDoc.ticketData}
          quoteData={printDoc.quoteData}
          onClose={() => setPrintDoc((prev) => ({ ...prev, isOpen: false }))}
        />
      )}
    </div>
  );
}
