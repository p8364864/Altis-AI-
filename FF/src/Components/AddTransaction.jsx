// import { useState } from 'react'
// import axios from 'axios'
// import { FileText, Wallet, Plus, CheckCircle, XCircle } from 'lucide-react'

// function AddTransaction({ initialType = 'invoice', onTransactionAdded }) {
//   const [type, setType] = useState(initialType); // 'invoice' ya 'expense'
//   const [formData, setFormData] = useState({
//     docNumber: '',
//     name: '',
//     amount: '',
//     status: 'Pending',
//     gstRate: '18',
//     gstType: 'Intra-State' // Tracks selection
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: '', isError: false });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ text: '', isError: false });

//     if (!formData.docNumber || !formData.name || !formData.amount) {
//       setMessage({ text: 'Please fill all structural parameters.', isError: true });
//       setLoading(false);
//       return;
//     }

//     try {
//       const endpoint = type === 'invoice' 
//         ? 'http://localhost:8000/api/transactions/add-invoice' 
//         : 'http://localhost:8000/api/transactions/add-expense';

//       const payload = type === 'invoice' 
//         ? { 
//             invoiceNumber: formData.docNumber, 
//             clientName: formData.name, 
//             amount: formData.amount, 
//             status: formData.status,
//             gstRate: Number(formData.gstRate),
//             gstType: formData.gstType
//           }
//         : { 
//             billNumber: formData.docNumber, 
//             vendorName: formData.name, 
//             amount: formData.amount, 
//             status: formData.status,
//             gstRate: Number(formData.gstRate),
//             gstType: formData.gstType
//           };

//       const response = await axios.post(endpoint, payload, { withCredentials: true });

//       if (response.data.success) {
//         setMessage({ text: `${type === 'invoice' ? 'Invoice' : 'Expense Bill'} securely saved!`, isError: false });
//         setFormData({ 
//           docNumber: '', 
//           name: '', 
//           amount: '', 
//           status: 'Pending', 
//           gstRate: '18', 
//           gstType: 'Intra-State' 
//         });
//         if (onTransactionAdded) onTransactionAdded();
//       }
//     } catch (error) {
//       console.error("Transaction deployment mismatch:", error);
//       setMessage({ text: error.response?.data?.error || 'Database handshake failed.', isError: true });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="rounded-2xl p-5 flex flex-col gap-4 ledger-card"
//       style={{
//         background: 'rgba(255,255,255,0.012)',
//         border: '1px solid rgba(255,255,255,0.06)',
//         backdropFilter: 'blur(24px)',
//         boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
//       }}>
      
//       <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
//         <div>
//           <h4 className="text-sm font-semibold text-white tracking-wide">Data Ledger Input</h4>
//           <p className="text-[10px] font-light text-slate-400">Stream records directly into live database aggregates</p>
//         </div>
        
//         <div className="flex p-0.5 rounded-lg bg-black/40 border border-white/5">
//           <button
//             type="button"
//             onClick={() => { setType('invoice'); setFormData(p => ({...p, status: 'Pending'})); }}
//             className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-all ${type === 'invoice' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' : 'text-slate-400'}`}
//           >
//             Invoice
//           </button>
//           <button
//             type="button"
//             onClick={() => { setType('expense'); setFormData(p => ({...p, status: 'Pending'})); }}
//             className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-all ${type === 'expense' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/20' : 'text-slate-400'}`}
//           >
//             Bill / Expense
//           </button>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 mt-1">
        
//         <div className="flex flex-col gap-1">
//           <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">{type === 'invoice' ? 'Invoice Reference' : 'Bill Reference'}</label>
//           <input
//             type="text"
//             name="docNumber"
//             value={formData.docNumber}
//             onChange={handleChange}
//             placeholder={type === 'invoice' ? '#INV-2026-001' : '#BILL-AWS-902'}
//             className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 transition-colors font-mono"
//           />
//         </div>

//         <div className="flex flex-col gap-1">
//           <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">{type === 'invoice' ? 'Client Descriptor' : 'Vendor Descriptor'}</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder={type === 'invoice' ? 'Acme Corporate Enterprise' : 'Amazon Web Services'}
//             className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 transition-colors"
//           />
//         </div>

//         <div className="flex flex-col gap-1">
//           <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Financial Amount (INR)</label>
//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             placeholder="₹ Amount"
//             className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 transition-colors font-mono"
//           />
//         </div>

//         {/* ─── GST DROP-DOWNS (ADDED) ─── */}
//         <div className="grid grid-cols-2 gap-3">
//           <div className="flex flex-col gap-1">
//             <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">GST Slab Rate</label>
//             <select
//               name="gstRate"
//               value={formData.gstRate}
//               onChange={handleChange}
//               className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 transition-colors [&>option]:bg-slate-950 font-mono"
//             >
//               <option value="0">0% Exempt</option>
//               <option value="5">5%</option>
//               <option value="12">12%</option>
//               <option value="18">18% Standard</option>
//               <option value="28">28%</option>
//             </select>
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Supply Territory</label>
//             <select
//               name="gstType"
//               value={formData.gstType}
//               onChange={handleChange}
//               className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 transition-colors [&>option]:bg-slate-950"
//             >
//               <option value="Intra-State">Intra-State (CGST+SGST)</option>
//               <option value="Inter-State">Inter-State (IGST)</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex flex-col gap-1">
//           <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Payment Execution State</label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 transition-colors [&>option]:bg-slate-950"
//           >
//             <option value="Pending">Pending Validation</option>
//             <option value="Paid">Settled / Paid</option>
//             {type === 'expense' && <option value="Overdue">Breached / Overdue</option>}
//           </select>
//         </div>

//         {message.text && (
//           <div className={`p-2.5 rounded-xl text-[10px] flex items-start gap-2 border ${message.isError ? 'bg-red-500/5 border-red-500/10 text-red-400' : 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400'}`}>
//             {message.isError ? <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" /> : <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />}
//             <span className="leading-relaxed font-medium">{message.text}</span>
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 border active:scale-[0.98] ${
//             loading 
//               ? 'bg-white/5 border-white/10 text-slate-500 cursor-not-allowed' 
//               : type === 'invoice'
//                 ? 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.05)]'
//                 : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.05)]'
//           }`}
//         >
//           <Plus className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
//           <span>{loading ? 'Transmitting Data...' : `Commit ${type === 'invoice' ? 'Invoice' : 'Expense Bill'}`}</span>
//         </button>

//       </form>
//     </div>
//   )
// }

// export default AddTransaction;
















import { useState, useEffect } from 'react'
import axios from 'axios'
import { FileText, Wallet, Plus, CheckCircle, XCircle } from 'lucide-react'

function AddTransaction({ initialType = 'invoice', onTransactionAdded, prefilledData = null }) {
  const [type, setType] = useState(initialType); // 'invoice' ya 'expense'
  const [formData, setFormData] = useState({
    docNumber: '',
    name: '',
    amount: '',
    status: 'Pending',
    gstRate: '18',
    gstType: 'Intra-State' // Tracks selection
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });

  // 🌟 AI Extraction Data Sync Listener
  useEffect(() => {
    if (prefilledData && type === 'expense') {
      setFormData((prev) => ({
        ...prev,
        docNumber: prefilledData.billReferenceNo || prev.docNumber,
        name: prefilledData.vendorDescription || prev.name,
        amount: prefilledData.amount !== null && prefilledData.amount !== undefined ? prefilledData.amount.toString() : prev.amount,
        gstRate: prefilledData.gstRate !== null && prefilledData.gstRate !== undefined ? prefilledData.gstRate.toString() : prev.gstRate,
      }));
      setMessage({ text: 'AI successfully populated parameters!', isError: false });
    }
  }, [prefilledData, type]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', isError: false });

    if (!formData.docNumber || !formData.name || !formData.amount) {
      setMessage({ text: 'Please fill all structural parameters.', isError: true });
      setLoading(false);
      return;
    }

    try {
      const endpoint = type === 'invoice' 
        ? 'http://localhost:8000/api/Transaction/Invoices' 
        : 'http://localhost:8000/api/Transaction/Expenses';

      const payload = type === 'invoice' 
        ? { 
            invoiceNumber: formData.docNumber, 
            clientName: formData.name, 
            amount: Number(formData.amount), 
            status: formData.status,
            gstRate: Number(formData.gstRate),
            gstType: formData.gstType
          }
        : { 
            billNumber: formData.docNumber, 
            vendorName: formData.name, 
            amount: Number(formData.amount), 
            status: formData.status,
            gstRate: Number(formData.gstRate),
            gstType: formData.gstType
          };

      const response = await axios.post(endpoint, payload, { withCredentials: true });

      if (response.data && response.data.success) {
        setMessage({ text: `${type === 'invoice' ? 'Invoice' : 'Expense Bill'} securely saved!`, isError: false });
        setFormData({ 
          docNumber: '', 
          name: '', 
          amount: '', 
          status: 'Pending', 
          gstRate: '18', 
          gstType: 'Intra-State' 
        });
        if (onTransactionAdded) onTransactionAdded();
      }
    } catch (error) {
      console.error("Transaction deployment mismatch:", error);
      setMessage({ text: error.response?.data?.error || 'Database handshake failed.', isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl p-5 flex flex-col gap-4 ledger-card"
      style={{
        background: 'rgba(255,255,255,0.012)',
        border: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(24px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}>
      
      <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div>
          <h4 className="text-sm font-semibold text-white tracking-wide">Data Ledger Input</h4>
          <p className="text-[10px] font-light text-slate-400">Stream records directly into live database aggregates</p>
        </div>
        
        <div className="flex p-0.5 rounded-lg bg-black/40 border border-white/5">
          <button
            type="button"
            onClick={() => { setType('invoice'); setFormData(p => ({...p, status: 'Pending'})); }}
            className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-all ${type === 'invoice' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' : 'text-slate-400'}`}
          >
            Invoice
          </button>
          <button
            type="button"
            onClick={() => { setType('expense'); setFormData(p => ({...p, status: 'Pending'})); }}
            className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-all ${type === 'expense' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/20' : 'text-slate-400'}`}
          >
            Bill / Expense
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 mt-1">
        
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">{type === 'invoice' ? 'Invoice Reference' : 'Bill Reference'}</label>
          <input
            type="text"
            name="docNumber"
            value={formData.docNumber}
            onChange={handleChange}
            placeholder={type === 'invoice' ? '#INV-2026-001' : '#BILL-AWS-902'}
            className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 transition-colors font-mono"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">{type === 'invoice' ? 'Client Descriptor' : 'Vendor Descriptor'}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={type === 'invoice' ? 'Acme Corporate Enterprise' : 'Amazon Web Services'}
            className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Financial Amount (INR)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="₹ Amount"
            className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 transition-colors font-mono"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">GST Slab Rate</label>
            <select
              name="gstRate"
              value={formData.gstRate}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 transition-colors [&>option]:bg-slate-950 font-mono"
            >
              <option value="0">0% Exempt</option>
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18% Standard</option>
              <option value="28">28%</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Supply Territory</label>
            <select
              name="gstType"
              value={formData.gstType}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 transition-colors [&>option]:bg-slate-950"
            >
              <option value="Intra-State">Intra-State (CGST+SGST)</option>
              <option value="Inter-State">Inter-State (IGST)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Payment Execution State</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 transition-colors [&>option]:bg-slate-950"
          >
            <option value="Pending">Pending Validation</option>
            <option value="Paid">Settled / Paid</option>
            {type === 'expense' && <option value="Overdue">Breached / Overdue</option>}
          </select>
        </div>

        {message.text && (
          <div className={`p-2.5 rounded-xl text-[10px] flex items-start gap-2 border ${message.isError ? 'bg-red-500/5 border-red-500/10 text-red-400' : 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400'}`}>
            {message.isError ? <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" /> : <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />}
            <span className="leading-relaxed font-medium">{message.text}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 border active:scale-[0.98] ${
            loading 
              ? 'bg-white/5 border-white/10 text-slate-500 cursor-not-allowed' 
              : type === 'invoice'
                ? 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.05)]'
                : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.05)]'
          }`}
        >
          <Plus className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Transmitting Data...' : `Commit ${type === 'invoice' ? 'Invoice' : 'Expense Bill'}`}</span>
        </button>

      </form>
    </div>
  )
}

export default AddTransaction;










