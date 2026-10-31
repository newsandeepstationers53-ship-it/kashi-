import React from 'react';
import { X, Printer, CheckCircle2, Shield } from 'lucide-react';
import { RepairTicket, PCComponent } from '../types';
import { SHOP_DETAILS } from '../data/shopData';

interface PrintableDocumentProps {
  type: 'ticket' | 'pc_quote';
  ticketData?: RepairTicket;
  quoteData?: {
    components: PCComponent[];
    totalPrice: number;
    totalWattage: number;
    presetTitle?: string;
  };
  onClose: () => void;
}

export const PrintableDocument: React.FC<PrintableDocumentProps> = ({
  type,
  ticketData,
  quoteData,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const todayStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-8 p-6 sm:p-8">
        {/* Modal Controls (No print) */}
        <div className="no-print flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-sm text-slate-800">
              Official Document Preview ({type === 'ticket' ? 'Job Card' : 'PC Estimate'})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Now</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div id="printable-document" className="space-y-6 text-slate-900 bg-white">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-950">
                {SHOP_DETAILS.name}
              </h1>
              <p className="text-xs font-semibold text-slate-600">
                {SHOP_DETAILS.tagline}
              </p>
              <p className="text-[11px] text-slate-600 mt-1">
                {SHOP_DETAILS.address}, {SHOP_DETAILS.landmark}<br />
                {SHOP_DETAILS.city}, {SHOP_DETAILS.state} - {SHOP_DETAILS.pincode}
              </p>
              <p className="text-[11px] font-bold text-slate-800 mt-0.5">
                Helpline / WhatsApp: {SHOP_DETAILS.phoneFormatted} · Email: {SHOP_DETAILS.email}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 border border-slate-300 px-2 py-1 rounded inline-block mb-1">
                {type === 'ticket' ? 'SERVICE JOB CARD' : 'ESTIMATE / QUOTATION'}
              </span>
              <div className="text-xs text-slate-600">
                Date: <span className="font-semibold text-slate-900">{todayStr}</span>
              </div>
              {type === 'ticket' && ticketData && (
                <div className="text-xs font-mono font-bold text-indigo-700 mt-0.5">
                  ID: #{ticketData.id}
                </div>
              )}
            </div>
          </div>

          {/* Ticket Details View */}
          {type === 'ticket' && ticketData && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div>
                  <span className="text-slate-500 block">Customer Name:</span>
                  <span className="font-bold text-sm text-slate-900">{ticketData.customerName}</span>
                  <span className="text-slate-600 block mt-0.5">Phone: {ticketData.customerPhone}</span>
                  {ticketData.customerAddress && (
                    <span className="text-slate-600 block">Address: {ticketData.customerAddress}</span>
                  )}
                </div>
                <div>
                  <span className="text-slate-500 block">Device Particulars:</span>
                  <span className="font-bold text-sm text-slate-900">{ticketData.brand} {ticketData.model}</span>
                  <span className="text-slate-600 block mt-0.5">Type: {ticketData.deviceType.toUpperCase()}</span>
                  <span className="text-slate-600 block">Status: {ticketData.status.toUpperCase()}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">Customer Reported Fault / Issue:</span>
                <p className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800">
                  {ticketData.issueDescription}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">Workshop Diagnostic / Action Taken:</span>
                <p className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800">
                  {ticketData.technicianNotes}
                </p>
              </div>

              {/* Billing Summary Box */}
              <div className="border border-slate-300 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 border-b border-slate-300 text-slate-700">
                    <tr>
                      <th className="p-2">Description</th>
                      <th className="p-2 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="p-2 font-medium">Repair Services, Labor & Genuine Replacement Parts</td>
                      <td className="p-2 text-right font-mono font-semibold">₹{ticketData.estimatedCost.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="border-b border-slate-200 text-slate-600">
                      <td className="p-2">Advance Deposit Paid</td>
                      <td className="p-2 text-right font-mono">(-) ₹{ticketData.advancePaid.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="bg-slate-50 font-bold text-slate-900">
                      <td className="p-2 text-sm">Total Balance Payable on Delivery</td>
                      <td className="p-2 text-right font-mono text-sm text-indigo-700">
                        ₹{Math.max(0, ticketData.estimatedCost - ticketData.advancePaid).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Terms & Barcode */}
              <div className="pt-4 border-t border-slate-200 flex justify-between items-end text-[10px] text-slate-500">
                <div className="space-y-0.5 max-w-sm">
                  <p className="font-bold text-slate-700">Workshop Terms:</p>
                  <p>1. Please present this job token slip during delivery at Shukla Complex.</p>
                  <p>2. Hardware repairs include standard 90-day Kashi Computer service warranty.</p>
                  <p>3. Devices not collected within 30 days are subject to shop storage policy.</p>
                </div>

                <div className="text-right">
                  <div className="font-mono text-xs tracking-widest border border-slate-400 px-3 py-1 mb-1">
                    ||| | |||| | ||||| | ||
                  </div>
                  <span className="font-bold text-slate-800">Authorized Signature</span>
                  <p className="text-[10px]">Kashi Computer, Raebareli</p>
                </div>
              </div>
            </div>
          )}

          {/* PC Quotation View */}
          {type === 'pc_quote' && quoteData && (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center">
                <div>
                  <span className="text-slate-500 block">Configuration Title:</span>
                  <span className="font-bold text-sm text-slate-900">{quoteData.presetTitle || 'Custom Assembled PC Rig'}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block">Estimated Power Draw:</span>
                  <span className="font-semibold text-slate-800">~{quoteData.totalWattage} Watts</span>
                </div>
              </div>

              {/* Table of components */}
              <div className="border border-slate-300 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 border-b border-slate-300 text-slate-700">
                    <tr>
                      <th className="p-2">#</th>
                      <th className="p-2">Component Item</th>
                      <th className="p-2">Specification</th>
                      <th className="p-2 text-right">Price (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quoteData.components.map((item, i) => (
                      <tr key={i} className="border-b border-slate-200">
                        <td className="p-2 text-slate-500">{i + 1}</td>
                        <td className="p-2 font-semibold text-slate-900">{item.name}</td>
                        <td className="p-2 text-slate-600">{item.specs}</td>
                        <td className="p-2 text-right font-mono font-semibold">₹{item.price.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50">
                      <td colSpan={3} className="p-2 font-medium text-slate-600">Professional Cable Routing & Assembling</td>
                      <td className="p-2 text-right text-emerald-600 font-bold">FREE (Waived)</td>
                    </tr>
                    <tr className="bg-slate-100 font-bold text-slate-900 text-sm">
                      <td colSpan={3} className="p-2">Final Estimated Total (GST Inclusive)</td>
                      <td className="p-2 text-right font-mono text-indigo-700">
                        ₹{quoteData.totalPrice.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Terms */}
              <div className="pt-4 border-t border-slate-200 flex justify-between items-end text-[10px] text-slate-500">
                <div className="space-y-0.5 max-w-sm">
                  <p className="font-bold text-slate-700">Quotation Terms:</p>
                  <p>• Prices valid for 7 days subject to market availability.</p>
                  <p>• 100% Genuine brand warranty on all individual components.</p>
                  <p>• Shukla Complex, Rajghat, Raebareli · Phone: 7398396002</p>
                </div>

                <div className="text-right">
                  <span className="font-bold text-slate-800">For Kashi Computer</span>
                  <p className="text-[10px]">Shukla Complex, Rajghat, Raebareli</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
