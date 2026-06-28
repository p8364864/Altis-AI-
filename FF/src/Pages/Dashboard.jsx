import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import ReportsPanel from '../Components/ReportsPanel';
import Sidebar from '../Components/Sidebar'
import DashboardNavbar from '../Components/DashboardNavbar'
import AddTransaction from '../Components/AddTransaction'
import AiBillScanner from '../Components/AiBillScanner';
import AiAssistance from '../Components/AiAssistance';
import backimage from '../assets/Gemini_Generated_Image_7ldcfq7ldcfq7ldc.png'
import { 
  DollarSign, Wallet, TrendingUp, Clock, Layers, FileText, Bot, ShieldCheck, 
  Package, Plus, Boxes, AlertTriangle, CheckCircle2, Edit2, Trash2, X, Percent, Scale 
} from 'lucide-react'

// ─── Animated Counter Hook ───────────────────────────────────────────────────
function useCountUp(target, duration = 1200, started = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started || target === 0) { setValue(0); return; }
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, started, duration]);
  return value;
}

// ─── Metric Card Component ────────────────────────────────────────────────────
function MetricCard({ title, value, icon: Icon, color, footerDot, footerText, loading, animStarted, index }) {
  const animated = useCountUp(value, 1400, animStarted);

  return (
    <div
      className="relative rounded-2xl p-5 overflow-hidden group cursor-default"
      style={{
        background: 'rgba(255,255,255,0.018)',
        border: `1px solid rgba(255,255,255,0.06)`,
        backdropFilter: 'blur(24px)',
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)`,
        animation: `cardEntrance 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s both`,
        transition: 'all 0.4s',
      }}
    >
      <div className="relative flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(148,163,184,0.8)' }}>{title}</span>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-4 relative">
        <h3 className="text-2xl font-bold tracking-tight text-white font-mono">
          {loading
            ? <div className="w-28 h-7 rounded-lg animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
            : `₹${animated.toLocaleString('en-IN')}`
          }
        </h3>
      </div>

      <div className="mt-4 pt-3 flex items-center gap-1.5 relative" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: footerDot }} />
        <span className="text-[9px] font-light tracking-wide truncate" style={{ color: 'rgba(100,116,139,0.85)' }}>{footerText}</span>
      </div>
    </div>
  );
}

// ─── Local Add Inventory Component (Matches UI Consistency) ───────────────────
function AddInventoryItem({ onInventoryAdded, editingItem = null, onCancelEdit = null }) {
  const [formData, setFormData] = useState(editingItem ? { 
    itemName: editingItem.itemName, 
    sku: editingItem.sku, 
    quantity: editingItem.quantity.toString(), 
    unitPrice: editingItem.unitPrice.toString() 
  } : { itemName: '', sku: '', quantity: '', unitPrice: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setSubmitting(true);
      
      if (editingItem) {
        await axios.put(`http://localhost:8000/api/Inventory/${editingItem._id}`, {
          ...formData,
          quantity: Number(formData.quantity),
          unitPrice: Number(formData.unitPrice)
        }, { withCredentials: true });
      } else {
        await axios.post('http://localhost:8000/api/Inventory', {
          ...formData,
          quantity: Number(formData.quantity),
          unitPrice: Number(formData.unitPrice)
        }, { withCredentials: true });
      }
      
      setFormData({ itemName: '', sku: '', quantity: '', unitPrice: '' });
      onInventoryAdded();
      if (onCancelEdit) onCancelEdit();
    } catch (err) {
      console.error("Inventory Provisioning Error:", err);
      setError(err.response?.data?.error || "Failed to save inventory item");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl p-6 bg-white/[0.015] border border-white/5 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold tracking-wide text-white flex items-center gap-2">
          <Boxes className="w-4 h-4 text-purple-400" /> 
          {editingItem ? 'Edit Asset' : 'Stock Provisioning Engine'}
        </h3>
        {editingItem && onCancelEdit && (
          <button onClick={onCancelEdit} className="text-slate-400 hover:text-white transition">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <p className="text-[11px] text-slate-400 mb-5">
        {editingItem ? 'Update asset details' : 'Deploy new assets into the tracking catalog clusters'}
      </p>
      
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
        <div>
          <label className="block text-slate-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">Asset Item Name</label>
          <input required type="text" value={formData.itemName} onChange={e => setFormData({...formData, itemName: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-all" placeholder="e.g., Quantum Framework Chip" />
        </div>
        <div>
          <label className="block text-slate-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">SKU / Token Reference ID</label>
          <input required type="text" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-all" placeholder="e.g., QNTM-NEXUS-01" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">Initial Units</label>
            <input required type="number" min="0" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-all" placeholder="0" />
          </div>
          <div>
            <label className="block text-slate-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">Unit Value (₹)</label>
            <input required type="number" min="0" step="0.01" value={formData.unitPrice} onChange={e => setFormData({...formData, unitPrice: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-all" placeholder="0.00" />
          </div>
        </div>
        <button type="submit" disabled={submitting}
          className="mt-2 w-full py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 text-white font-medium rounded-xl transition-all shadow-lg shadow-purple-600/10 flex items-center justify-center gap-1.5">
          <Plus className="w-4 h-4" /> {submitting ? 'Syncing Base Ledger...' : editingItem ? 'Update Asset Entry' : 'Commit Asset Entry'}
        </button>
      </form>
    </div>
  );
}

// ─── Main Dashboard Component ─────────────────────────────────────────────────
function Dashboard() {
  const [currentView, setCurrentView] = useState('Dashboard');
  const [metrics, setMetrics] = useState({ totalRevenue: 0, totalExpenses: 0, netProfit: 0, totalReceivable: 0, totalPayable: 0 });
  const [invoicesList, setInvoicesList] = useState([]);
  const [billsList, setBillsList] = useState([]);
  const [inventoryList, setInventoryList] = useState([]); 
  
  const [loading, setLoading] = useState(true);
  const [animStarted, setAnimStarted] = useState(false);
  const [activeLedgerTab, setActiveLedgerTab] = useState('invoices');
  const [refreshToggle, setRefreshToggle] = useState(false);
  const [editingInventoryItem, setEditingInventoryItem] = useState(null); 
  const [deletingItemId, setDeletingItemId] = useState(null); 

  // 🌟 State cache layer holding extracted OCR response parameters downstream
  const [scannedExpenseCache, setScannedExpenseCache] = useState(null);

  const reloadLedgerState = () => setRefreshToggle(!refreshToggle);

  const handleDeleteInventoryItem = async (itemId) => {
    try {
      setDeletingItemId(itemId);
      await axios.delete(`http://localhost:8000/api/Inventory/${itemId}`, { withCredentials: true });
      reloadLedgerState();
    } catch (err) {
      console.error("Inventory deletion error:", err);
      alert('Failed to delete inventory item');
    } finally {
      setDeletingItemId(null);
    }
  };

  useEffect(() => {
    const fetchAllDashboardData = async () => {
      try {
        setLoading(true);
        
        const [overviewRes, invoicesRes, billsRes, inventoryRes] = await Promise.all([
          axios.get('http://localhost:8000/api/Transaction/analytics/overview', { withCredentials: true })
            .catch(() => ({ data: { success: true, totalRevenue: 0, totalExpenses: 0, netProfit: 0, totalReceivable: 0, totalPayable: 0 } })),
          axios.get('http://localhost:8000/api/Transaction/Invoices', { withCredentials: true })
            .catch(() => ({ data: { success: true, invoices: [] } })),
          axios.get('http://localhost:8000/api/Transaction/Expenses', { withCredentials: true })
            .catch(() => ({ data: { success: true, bills: [] } })),
          axios.get('http://localhost:8000/api/Inventory', { withCredentials: true })
            .catch(() => ({ data: { success: true, inventory: [] } })) 
        ]);

        if (overviewRes.data && overviewRes.data.success) {
          setMetrics(overviewRes.data);
        }
        setInvoicesList(invoicesRes.data.invoices || []);
        setBillsList(billsRes.data.bills || []);
        setInventoryList(inventoryRes.data.inventory || []);

      } catch (error) {
        console.error("Pipeline Balance Synchronization Error:", error);
      } finally {
        setLoading(false);
        setTimeout(() => setAnimStarted(true), 100);
      }
    };
    fetchAllDashboardData();
  }, [refreshToggle]);

  // ─── DYNAMIC GST COMPLIANCE PARSING CORE ───────────────────────────────────
  const taxCalculations = useMemo(() => {
    let totalOutputGst = 0;
    let totalInputTaxCredit = 0;
    let cgstPool = 0;
    let sgstPool = 0;
    let igstPool = 0;
    const compiledLedger = [];

    invoicesList.forEach(inv => {
      const amt = Number(inv.amount) || 0;
      const rate = inv.gstRate !== undefined ? Number(inv.gstRate) : 18;
      const type = inv.gstType || 'Intra-State';
      const taxComponent = amt * (rate / 100);
      totalOutputGst += taxComponent;

      if (type === 'Intra-State') {
        cgstPool += taxComponent / 2;
        sgstPool += taxComponent / 2;
      } else {
        igstPool += taxComponent;
      }

      compiledLedger.push({
        id: inv._id,
        ref: inv.invoiceNumber,
        party: inv.clientName,
        direction: 'Output (Sale)',
        base: amt,
        rate: rate,
        tax: taxComponent,
        type: type
      });
    });

    billsList.forEach(bill => {
      const amt = Number(bill.amount) || 0;
      const rate = bill.gstRate !== undefined ? Number(bill.gstRate) : 18;
      const type = bill.gstType || 'Intra-State';
      const taxComponent = amt * (rate / 100);
      totalInputTaxCredit += taxComponent;

      if (type === 'Intra-State') {
        cgstPool -= taxComponent / 2;
        sgstPool -= taxComponent / 2;
      } else {
        igstPool -= taxComponent;
      }

      compiledLedger.push({
        id: bill._id,
        ref: bill.billNumber,
        party: bill.vendorName,
        direction: 'Input Credit (Purchase)',
        base: amt,
        rate: rate,
        tax: taxComponent,
        type: type
      });
    });

    return {
      outputGst: Math.round(totalOutputGst),
      itc: Math.round(totalInputTaxCredit),
      netPayable: Math.round(totalOutputGst - totalInputTaxCredit),
      cgst: Math.round(Math.max(0, cgstPool)),
      sgst: Math.round(Math.max(0, sgstPool)),
      igst: Math.round(Math.max(0, igstPool)),
      ledger: compiledLedger
    };
  }, [invoicesList, billsList]);

  const cards = [
    { title: 'Total Revenue', value: metrics.totalRevenue, icon: DollarSign, color: '#60a5fa', footerDot: '#60a5fa', footerText: 'Ledger Engine Active' },
    { title: 'Total Expenses', value: metrics.totalExpenses, icon: Wallet, color: '#fbbf24', footerDot: '#fbbf24', footerText: 'Monitored Costs' },
    { title: 'Net Profit', value: metrics.netProfit, icon: TrendingUp, color: '#34d399', footerDot: '#34d399', footerText: 'Yield Status Clean' },
    { title: 'Receivables', value: metrics.totalReceivable, icon: Clock, color: '#a78bfa', footerDot: '#a78bfa', footerText: 'Pending Settlement Clears' },
    { title: 'Payables', value: metrics.totalPayable, icon: Layers, color: '#22d3ee', footerDot: '#22d3ee', footerText: 'Outstanding Balances' },
  ];

  const getStockStatus = (qty) => {
    if (qty === 0) return { label: 'Out of Stock', classes: 'bg-rose-500/10 text-rose-400 border border-rose-500/20', icon: AlertTriangle };
    if (qty <= 10) return { label: 'Low Stock', classes: 'bg-amber-500/10 text-amber-400 border border-amber-500/20', icon: AlertTriangle };
    return { label: 'In Stock', classes: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20', icon: CheckCircle2 };
  };

  return (
    <>
      <style>{`
        @keyframes cardEntrance { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .ledger-card { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .ledger-card:hover { transform: translateY(-2px); }
      `}</style>

      <div className="relative min-h-screen w-full overflow-hidden font-sans text-white bg-black flex flex-col">
        <img className="fixed inset-0 h-full w-full object-cover z-0 pointer-events-none opacity-60" src={backimage} alt="background" />
        <div className="fixed inset-0 z-0 pointer-events-none bg-slate-950/60 backdrop-blur-[2px]" />

        <div className="relative z-10 flex h-screen w-full overflow-hidden">
          <div className="flex-shrink-0 h-full">
            <Sidebar currentView={currentView} onViewChange={setCurrentView} />
          </div>

          <div className="flex-1 flex flex-col h-full overflow-y-auto">
            <div className="w-full flex-shrink-0 pt-2 px-2">
              <DashboardNavbar />
            </div>

            <main className="p-6 flex-1 flex flex-col gap-6">
              
              {/* ─── VIEW 1: GENERAL DASHBOARD OVERVIEW ─── */}
              {currentView === 'Dashboard' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {cards.map((card, i) => (
                      <MetricCard key={card.title} {...card} loading={loading} animStarted={animStarted} index={i} />
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full">
                    <div className="lg:col-span-2 flex flex-col rounded-2xl overflow-hidden ledger-card bg-white/[0.012] border border-white/6 backdrop-blur-3xl min-h-[340px]">
                      <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/5 bg-white/[0.008]">
                        <div>
                          <h4 className="text-sm font-semibold tracking-wide text-white">Core Document Ledger</h4>
                          <p className="text-[11px] font-light text-slate-400 mt-0.5">Real-time dynamic entry logs matrix</p>
                        </div>
                        <div className="flex p-1 rounded-xl bg-black/40 border border-white/5">
                          <button type="button" onClick={() => setActiveLedgerTab('invoices')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${activeLedgerTab === 'invoices' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-slate-400'}`}>
                            Sales Invoices
                          </button>
                          <button type="button" onClick={() => setActiveLedgerTab('bills')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${activeLedgerTab === 'bills' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400'}`}>
                            Vendor Bills
                          </button>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-start items-center">
                        {((activeLedgerTab === 'invoices' ? invoicesList : billsList).length === 0) ? (
                          <div className="text-center flex flex-col items-center gap-3 mt-12">
                            <FileText className="w-5 h-5 text-slate-500" />
                            <span className="text-xs font-medium text-slate-400">Database Ledger Empty</span>
                          </div>
                        ) : (
                          <div className="overflow-x-auto w-full">
                            <table className="w-full text-left text-xs">
                              <thead>
                                <tr className="text-slate-400 border-b border-white/10">
                                  <th className="pb-2">Reference ID</th>
                                  <th className="pb-2">Counterparty</th>
                                  <th className="pb-2">Financial Amount</th>
                                  <th className="pb-2">Execution State</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(activeLedgerTab === 'invoices' ? invoicesList : billsList).map((item) => (
                                  <tr key={item._id} className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                                    <td className="py-2.5 font-mono text-blue-400">{item.invoiceNumber || item.billNumber}</td>
                                    <td className="py-2.5 text-slate-200">{item.clientName || item.vendorName}</td>
                                    <td className="py-2.5 font-bold">₹{item.amount.toLocaleString('en-IN')}</td>
                                    <td className="py-2.5">
                                      <span className={`px-2 py-0.5 rounded text-[10px] ${item.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>{item.status}</span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl p-5 flex flex-col gap-4 ledger-card bg-white/[0.012] border border-white/6 backdrop-blur-3xl">
                      <div className="flex items-center gap-2.5 pb-3 border-b border-white/5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-500/25 text-blue-400">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white tracking-wide">Altis AI Engine v1.0</h4>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 flex-1 justify-center items-center py-4 min-h-[160px]">
                        <ShieldCheck className="w-7 h-7 text-blue-500/40" />
                        <span className="text-xs font-medium text-slate-300">System Idle &amp; Secure</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
           

              {/* ─── VIEW 2: INVOICES PANEL VIEW ─── */}
              {currentView === 'Invoices' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                  <div className="lg:col-span-1">
                    <AddTransaction initialType="invoice" onTransactionAdded={reloadLedgerState} />
                  </div>
                  <div className="lg:col-span-2 rounded-2xl p-6 bg-white/[0.01] border border-white/5 backdrop-blur-xl min-h-[400px] flex flex-col justify-start">
                    <div>
                      <h3 className="text-sm font-semibold tracking-wide text-white mb-1">Invoice Automation Node</h3>
                      <p className="text-[11px] text-slate-400 mb-6">Direct records entry logs for account streams</p>
                      
                      {invoicesList.length === 0 ? (
                        <div className="text-center p-12 border border-dashed border-white/5 rounded-xl text-slate-500 text-xs">
                          No active invoices found inside MongoDB clusters. Add a record to map values instantly.
                        </div>
                      ) : (
                        <div className="overflow-x-auto w-full">
                          <table className="w-full text-left text-xs">
                            <thead>
                              <tr className="text-slate-400 border-b border-white/10 pb-2">
                                <th className="pb-3">Invoice Number</th>
                                <th className="pb-3">Client Name</th>
                                <th className="pb-3">Amount</th>
                                <th className="pb-3">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.02]">
                              {invoicesList.map((invoice) => (
                                <tr key={invoice._id} className="hover:bg-white/[0.01] transition-colors">
                                  <td className="py-3 font-mono text-blue-400">{invoice.invoiceNumber}</td>
                                  <td className="py-3 text-slate-200">{invoice.clientName}</td>
                                  <td className="py-3 font-semibold text-white">₹{Number(invoice.amount).toLocaleString('en-IN')}</td>
                                  <td className="py-3">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${invoice.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>{invoice.status}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

             {/*─── VIEW 3: EXPENSES PANEL VIEW ───*/}
{currentView === 'Expenses' && (
  <div className="flex flex-col gap-6 w-full animate-[cardEntrance_0.4s_ease-out]">
    
    {/* Upper Control Workspace: Interactive Split Row Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch w-full">
      {/* Box A: Automated AI OCR Stream Node */}
      <div className="h-full flex flex-col justify-between">
        <AiBillScanner onDataExtracted={(extractedJson) => setScannedExpenseCache(extractedJson)} />
      </div>
      
      {/* Box B: Structural Parameters Manual/Prefilled Entry Node */}
      <div className="h-full flex flex-col justify-between">
        <AddTransaction 
          initialType="expense" 
          onTransactionAdded={() => {
            reloadLedgerState();
            setScannedExpenseCache(null);
          }} 
          prefilledData={scannedExpenseCache} 
        />
      </div>
    </div>

    {/* Lower Control Workspace: Complete Audit Table Grid spanning full width */}
    <div className="w-full rounded-2xl p-6 bg-white/[0.01] border border-white/5 backdrop-blur-xl min-h-[300px]">
      <div>
        <h3 className="text-sm font-semibold tracking-wide text-white mb-1">Vendor Bill Auditing Node</h3>
        <p className="text-[11px] text-slate-400 mb-6">Operational costs monitoring matrix</p>
        
        {billsList.length === 0 ? (
          <div className="text-center p-12 border border-dashed border-white/5 rounded-xl text-slate-500 text-xs">
            No overhead expenses registered.
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-white/10 pb-2">
                  <th className="pb-3">Bill Number</th>
                  <th className="pb-3">Vendor Name</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {billsList.map((bill) => (
                  <tr key={bill._id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-3 font-mono text-cyan-400">{bill.billNumber}</td>
                    <td className="py-3 text-slate-200">{bill.vendorName}</td>
                    <td className="py-3 font-semibold text-white">₹{Number(bill.amount).toLocaleString('en-IN')}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${bill.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>{bill.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>

  </div>
)}

              {/* ─── NEW VIEW 6: REPORTS & ANALYTICS PANEL ─── */}
              {currentView === 'Reports' && (
                <ReportsPanel />
              )}

              {/* ─── VIEW 4: INVENTORY MANAGEMENT PANEL ─── */}
              {currentView === 'Inventory' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                  <div className="lg:col-span-1">
                    <AddInventoryItem 
                      onInventoryAdded={reloadLedgerState} 
                      editingItem={editingInventoryItem}
                      onCancelEdit={() => setEditingInventoryItem(null)}
                    />
                  </div>
                  <div className="lg:col-span-2 rounded-2xl p-6 bg-white/[0.01] border border-white/5 backdrop-blur-xl min-h-[460px] flex flex-col justify-start">
                    <div>
                      <h3 className="text-sm font-semibold tracking-wide text-white mb-1">Asset Inventory Vault Matrix</h3>
                      <p className="text-[11px] text-slate-400 mb-6">Real-time dynamic item allocation monitoring engine</p>
                      
                      {inventoryList.length === 0 ? (
                        <div className="text-center p-12 border border-dashed border-white/5 rounded-xl text-slate-500 text-xs">
                          No items discovered inside inventory clusters. Provision your first asset on the left.
                        </div>
                      ) : (
                        <div className="overflow-x-auto w-full">
                          <table className="w-full text-left text-xs">
                            <thead>
                              <tr className="text-slate-400 border-b border-white/10 pb-2">
                                <th className="pb-3">SKU / Token</th>
                                <th className="pb-3">Item Name</th>
                                <th className="pb-3">Stock Units</th>
                                <th className="pb-3">Price / Unit</th>
                                <th className="pb-3">Total Capital</th>
                                <th className="pb-3">Allocation Status</th>
                                <th className="pb-3">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.02]">
                              {inventoryList.map((item) => {
                                const status = getStockStatus(item.quantity);
                                const StatusIcon = status.icon;
                                return (
                                  <tr key={item._id} className="hover:bg-white/[0.01] transition-colors">
                                    <td className="py-3.5 font-mono text-purple-400">{item.sku}</td>
                                    <td className="py-3.5 text-slate-200 font-medium">{item.itemName}</td>
                                    <td className="py-3.5 font-semibold text-white font-mono">{item.quantity}</td>
                                    <td className="py-3.5 text-slate-300 font-mono">₹{Number(item.unitPrice).toLocaleString('en-IN')}</td>
                                    <td className="py-3.5 font-bold text-white font-mono">₹{(item.quantity * item.unitPrice).toLocaleString('en-IN')}</td>
                                    <td className="py-3.5">
                                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${status.classes}`}>
                                        <StatusIcon className="w-3 h-3" />
                                        {status.label}
                                      </span>
                                    </td>
                                    <td className="py-3.5 flex gap-2">
                                      <button
                                        onClick={() => setEditingInventoryItem(item)}
                                        className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-all border border-blue-500/20 hover:border-blue-500/40"
                                        title="Edit item"
                                      >
                                        <Edit2 className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteInventoryItem(item._id)}
                                        disabled={deletingItemId === item._id}
                                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all border border-red-500/20 hover:border-red-500/40 disabled:opacity-50"
                                        title="Delete item"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── 🌟 NEW SUB-COMPONENT SELECTION ─── */}
  {currentView === 'AI Assistant' && (
    <AiAssistance />
  )}






              {/* ─── 🌟 NEW VIEW 5: GST & TAXES PANEL COMPLIANCE VIEW ─── */}
              {currentView === 'GST & Taxes' && (
                <div className="flex flex-col gap-6">
                  
                  {/* Tax KPI Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <MetricCard 
                      title="Total Output GST (Collected)" 
                      value={taxCalculations.outputGst} 
                      icon={Percent} 
                      color="#38bdf8" 
                      footerDot="#38bdf8" 
                      footerText="Tax aggregated via client transactions" 
                      loading={loading} 
                      animStarted={animStarted} 
                      index={0} 
                    />
                    <MetricCard 
                      title="Input Tax Credit (ITC Available)" 
                      value={taxCalculations.itc} 
                      icon={Scale} 
                      color="#a78bfa" 
                      footerDot="#a78bfa" 
                      footerText="Deductible procurement tax offsets" 
                      loading={loading} 
                      animStarted={animStarted} 
                      index={1} 
                    />
                    <MetricCard 
                      title="Net GST Liability Payable" 
                      value={taxCalculations.netPayable} 
                      icon={Layers} 
                      color={taxCalculations.netPayable >= 0 ? '#ef4444' : '#22c55e'} 
                      footerDot={taxCalculations.netPayable >= 0 ? '#ef4444' : '#22c55e'} 
                      footerText={taxCalculations.netPayable >= 0 ? "Outstanding remittance due" : "Credit balance carry-forward assets"} 
                      loading={loading} 
                      animStarted={animStarted} 
                      index={2} 
                    />
                  </div>

                  {/* Central / State / Integrated Splitting Bars Matrix */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/[0.01] border border-white/5 rounded-2xl p-4 backdrop-blur-md">
                    <div className="p-4 bg-black/30 border border-white/[0.03] rounded-xl flex flex-col">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">CGST Pool (Central Cluster)</span>
                      <span className="text-xl font-bold font-mono mt-1 text-slate-200">₹{taxCalculations.cgst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="p-4 bg-black/30 border border-white/[0.03] rounded-xl flex flex-col">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">SGST Pool (State Remittance)</span>
                      <span className="text-xl font-bold font-mono mt-1 text-slate-200">₹{taxCalculations.sgst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="p-4 bg-black/30 border border-white/[0.03] rounded-xl flex flex-col">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">IGST Pool (Integrated Cluster)</span>
                      <span className="text-xl font-bold font-mono mt-1 text-slate-200">₹{taxCalculations.igst.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Consolidated Central Tax Audit Table Ledger */}
                  <div className="rounded-2xl p-6 bg-white/[0.012] border border-white/5 backdrop-blur-xl min-h-[380px] flex flex-col justify-start">
                    <div className="pb-4 mb-4 border-b border-white/5">
                      <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-300 mb-0.5">Tax Compliance Audit Matrix</h3>
                      <p className="text-[11px] text-slate-400 tracking-wide">Consolidated cross-reference for all output liabilities and input credit tokens</p>
                    </div>

                    {taxCalculations.ledger.length === 0 ? (
                      <div className="text-center p-14 border border-dashed border-white/5 rounded-xl text-slate-500 text-xs tracking-wide">No transactions indexed to live tax records.</div>
                    ) : (
                      <div className="overflow-x-auto w-full">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="text-slate-400 uppercase tracking-wider border-b border-white/10 pb-2">
                              <th className="pb-3">Ref Code</th>
                              <th className="pb-3">Counterparty Entity</th>
                              <th className="pb-3">Type</th>
                              <th className="pb-3">Base Price</th>
                              <th className="pb-3">GST Slab</th>
                              <th className="pb-3">Tax Value</th>
                              <th className="pb-3">Territory</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/[0.02]">
                            {taxCalculations.ledger.map((row) => (
                              <tr key={row.id} className="hover:bg-white/[0.01] transition-colors">
                                <td className="py-3.5 font-mono text-blue-400 font-medium">{row.ref}</td>
                                <td className="py-3.5 text-slate-200">{row.party}</td>
                                <td className="py-3.5 font-medium">
                                  <span className={`px-2 py-0.5 rounded text-[10px] ${row.direction.startsWith('Output') ? 'text-sky-400 bg-sky-500/10' : 'text-purple-400 bg-purple-500/10'}`}>{row.direction}</span>
                                </td>
                                <td className="py-3.5 font-mono text-slate-300">₹{row.base.toLocaleString('en-IN')}</td>
                                <td className="py-3.5 font-bold font-mono text-amber-400">{row.rate}%</td>
                                <td className="py-3.5 font-bold font-mono text-white">₹{Math.round(row.tax).toLocaleString('en-IN')}</td>
                                <td className="py-3.5 text-slate-400 font-light">{row.type}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                </div>
              )}

            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;