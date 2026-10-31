import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  Wrench, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Printer, 
  Save, 
  X, 
  TrendingUp, 
  Clock, 
  Search,
  User,
  Phone,
  Laptop
} from 'lucide-react';
import { RepairTicket, RepairStatus, Language } from '../types';
import { SHOP_DETAILS } from '../data/shopData';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: RepairTicket[];
  onUpdateTicket: (ticket: RepairTicket) => void;
  onAddTicket: (ticket: RepairTicket) => void;
  onPrintTicket: (ticket: RepairTicket) => void;
  lang: Language;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  tickets,
  onUpdateTicket,
  onAddTicket,
  onPrintTicket,
  lang,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [activeTab, setActiveTab] = useState<'tickets' | 'new_job'>('tickets');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Editing state for ticket modal
  const [editingTicket, setEditingTicket] = useState<RepairTicket | null>(null);

  // New ticket state
  const [newJob, setNewJob] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: 'Raebareli',
    deviceType: 'laptop' as RepairTicket['deviceType'],
    brand: '',
    model: '',
    issueDescription: '',
    estimatedCost: 1000,
    advancePaid: 0,
    technicianNotes: 'Walk-in customer at Shukla Complex counter.',
    isPriority: false,
  });

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '7398' || pinInput === '1234') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN. Hint: First 4 digits of shop phone (7398)');
    }
  };

  const handleSaveTicketStatus = (ticket: RepairTicket, newStatus: RepairStatus, notes: string, cost: number, advance: number) => {
    const updated: RepairTicket = {
      ...ticket,
      status: newStatus,
      technicianNotes: notes,
      estimatedCost: cost,
      advancePaid: advance,
      updates: [
        {
          date: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          status: newStatus,
          note: notes || `Status updated to ${newStatus} by shopkeeper.`
        },
        ...ticket.updates,
      ]
    };
    onUpdateTicket(updated);
    setEditingTicket(null);
  };

  const handleCreateWalkinJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.customerName || !newJob.customerPhone || !newJob.brand) return;

    const newId = `KC-${Math.floor(1095 + Math.random() * 50)}`;
    const today = new Date().toISOString().split('T')[0];
    const estDate = new Date(Date.now() + 48 * 3600000).toISOString().split('T')[0];

    const ticket: RepairTicket = {
      id: newId,
      customerName: newJob.customerName,
      customerPhone: newJob.customerPhone,
      customerAddress: newJob.customerAddress,
      deviceType: newJob.deviceType,
      brand: newJob.brand,
      model: newJob.model || 'Standard',
      issueDescription: newJob.issueDescription,
      receivedDate: today,
      estimatedDate: estDate,
      status: 'received',
      technicianNotes: newJob.technicianNotes,
      estimatedCost: Number(newJob.estimatedCost),
      advancePaid: Number(newJob.advancePaid),
      isPriority: newJob.isPriority,
      updates: [
        {
          date: `${today} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          status: 'received',
          note: 'Walk-in job registered at Shukla Complex counter.'
        }
      ]
    };

    onAddTicket(ticket);
    setActiveTab('tickets');
    // reset form
    setNewJob({
      customerName: '',
      customerPhone: '',
      customerAddress: 'Raebareli',
      deviceType: 'laptop',
      brand: '',
      model: '',
      issueDescription: '',
      estimatedCost: 1000,
      advancePaid: 0,
      technicianNotes: 'Walk-in customer at Shukla Complex counter.',
      isPriority: false,
    });
  };

  // Metrics
  const activeCount = tickets.filter(t => t.status !== 'delivered').length;
  const readyCount = tickets.filter(t => t.status === 'ready').length;
  const inRepairCount = tickets.filter(t => t.status === 'in_repair' || t.status === 'testing').length;
  const totalRev = tickets.reduce((acc, t) => acc + t.estimatedCost, 0);

  const filteredTickets = tickets.filter(t => {
    const matchesFilter = filterStatus === 'all' || t.status === filterStatus;
    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerPhone.includes(searchQuery) ||
      t.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-850 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Kashi Computer Staff Desk
                </h3>
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                  Internal Shopkeeper Mode
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Shukla Complex, Rajghat Workshop Management
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Authentication Screen */}
        {!isAuthenticated ? (
          <div className="p-8 max-w-md mx-auto text-center space-y-5 my-auto">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white">Staff Authentication</h4>
              <p className="text-xs text-slate-400">
                Enter shop security PIN to update repair statuses and register walk-ins.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-3">
              <input
                type="password"
                maxLength={4}
                autoFocus
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter 4-digit PIN..."
                className="w-full text-center tracking-widest text-lg font-mono px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />

              {pinError && (
                <p className="text-xs text-red-400 font-medium">{pinError}</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
              >
                Access Staff Portal
              </button>

              <p className="text-[11px] text-slate-500">
                Quick Demo Access PIN: <span className="text-amber-400 font-mono font-bold">7398</span>
              </p>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Top Stat Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block">Active Jobs</span>
                <span className="text-xl font-bold text-white">{activeCount}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block">In Repair / Lab</span>
                <span className="text-xl font-bold text-amber-400">{inRepairCount}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block">Ready for Pickup</span>
                <span className="text-xl font-bold text-emerald-400">{readyCount}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block">Est. Revenue</span>
                <span className="text-xl font-bold text-indigo-400">₹{totalRev.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 gap-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('tickets')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'tickets'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                  }`}
                >
                  Manage Jobs ({tickets.length})
                </button>
                <button
                  onClick={() => setActiveTab('new_job')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                    activeTab === 'new_job'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Walk-in Check-in</span>
                </button>
              </div>

              {activeTab === 'tickets' && (
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search jobs..."
                      className="pl-8 pr-3 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="received">Received</option>
                    <option value="diagnostic">Diagnostic</option>
                    <option value="waiting_approval">Waiting Approval</option>
                    <option value="in_repair">In Repair</option>
                    <option value="testing">Testing</option>
                    <option value="ready">Ready for Pickup</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              )}
            </div>

            {/* Tab 1: Ticket Management List */}
            {activeTab === 'tickets' && (
              <div className="space-y-3">
                {filteredTickets.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white text-sm">{t.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          t.status === 'ready' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                          t.status === 'in_repair' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                          t.status === 'delivered' ? 'bg-slate-800 text-slate-400' :
                          'bg-indigo-950 text-indigo-300 border border-indigo-800'
                        }`}>
                          {t.status.replace('_', ' ')}
                        </span>
                        {t.isPriority && (
                          <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-1 rounded">Urgent</span>
                        )}
                      </div>
                      <p className="font-semibold text-slate-200">
                        {t.customerName} ({t.customerPhone}) · {t.brand} {t.model}
                      </p>
                      <p className="text-slate-400 line-clamp-1">{t.issueDescription}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-slate-400 block">Estimate:</span>
                        <span className="font-bold text-white">₹{t.estimatedCost}</span>
                      </div>

                      <button
                        onClick={() => onPrintTicket(t)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                        title="Print Job Slip"
                      >
                        <Printer className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setEditingTicket(t)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Register New Walk-in Check-in */}
            {activeTab === 'new_job' && (
              <form onSubmit={handleCreateWalkinJob} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white">Register Walk-in Device at Shukla Complex Counter</h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Customer Name *</label>
                    <input
                      type="text"
                      required
                      value={newJob.customerName}
                      onChange={(e) => setNewJob({ ...newJob, customerName: e.target.value })}
                      placeholder="e.g. Alok Verma"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Customer Phone *</label>
                    <input
                      type="tel"
                      required
                      value={newJob.customerPhone}
                      onChange={(e) => setNewJob({ ...newJob, customerPhone: e.target.value })}
                      placeholder="10-digit mobile"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Device Type</label>
                    <select
                      value={newJob.deviceType}
                      onChange={(e) => setNewJob({ ...newJob, deviceType: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    >
                      <option value="laptop">Laptop</option>
                      <option value="desktop">Desktop / CPU</option>
                      <option value="printer">Printer / Cartridge</option>
                      <option value="monitor">Monitor</option>
                      <option value="cctv">CCTV / DVR</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Brand & Model *</label>
                    <input
                      type="text"
                      required
                      value={newJob.brand}
                      onChange={(e) => setNewJob({ ...newJob, brand: e.target.value })}
                      placeholder="e.g. Dell Inspiron 5570"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Estimated Cost (₹)</label>
                    <input
                      type="number"
                      value={newJob.estimatedCost}
                      onChange={(e) => setNewJob({ ...newJob, estimatedCost: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="text-slate-400 block mb-1">Customer Reported Fault *</label>
                  <textarea
                    rows={2}
                    required
                    value={newJob.issueDescription}
                    onChange={(e) => setNewJob({ ...newJob, issueDescription: e.target.value })}
                    placeholder="Describe problem..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('tickets')}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
                  >
                    Register Job Card & Generate Ticket
                  </button>
                </div>
              </form>
            )}

            {/* Update Status Modal / Overlay */}
            {editingTicket && (
              <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h4 className="font-bold text-white text-sm">
                      Update Job {editingTicket.id} ({editingTicket.brand} {editingTicket.model})
                    </h4>
                    <button onClick={() => setEditingTicket(null)} className="text-slate-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">Set New Status</label>
                      <select
                        id="status-select"
                        defaultValue={editingTicket.status}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                      >
                        <option value="received">Received at Shukla Complex</option>
                        <option value="diagnostic">Diagnostic & Inspection</option>
                        <option value="waiting_approval">Waiting Customer Approval</option>
                        <option value="in_repair">Repair in Progress</option>
                        <option value="testing">Burn-in & Quality Testing</option>
                        <option value="ready">Ready for Pickup at Desk</option>
                        <option value="delivered">Delivered / Handed Over</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-400 block mb-1">Total Bill (₹)</label>
                        <input
                          id="cost-input"
                          type="number"
                          defaultValue={editingTicket.estimatedCost}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Advance Received (₹)</label>
                        <input
                          id="advance-input"
                          type="number"
                          defaultValue={editingTicket.advancePaid}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Technician Log / Action Taken</label>
                      <textarea
                        id="note-input"
                        rows={3}
                        defaultValue={editingTicket.technicianNotes}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                        placeholder="Add update for customer..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => setEditingTicket(null)}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const status = (document.getElementById('status-select') as HTMLSelectElement).value as RepairStatus;
                        const cost = Number((document.getElementById('cost-input') as HTMLInputElement).value);
                        const advance = Number((document.getElementById('advance-input') as HTMLInputElement).value);
                        const note = (document.getElementById('note-input') as HTMLTextAreaElement).value;
                        handleSaveTicketStatus(editingTicket, status, note, cost, advance);
                      }}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Status & Notify</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
