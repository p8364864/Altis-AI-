import { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Wallet, 
  Package, 
  Percent, 
  BarChart3, 
  Bot, 
  Settings, 
  AlertTriangle 
} from 'lucide-react';

function Sidebar({ currentView, onViewChange }) {
  const [lowStockProducts, setLowStockProducts] = useState([
    { name: 'Product A', stock: 5 },
    { name: 'Product B', stock: 2 }
  ]);

  const menuItems = [
    { id: 'Dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'Invoices', name: 'Invoices', icon: FileText },
    { id: 'Expenses', name: 'Expenses', icon: Wallet },
    { id: 'Inventory', name: 'Inventory', icon: Package },
    { id: 'GST & Taxes', name: 'GST & Taxes', icon: Percent },
    { id: 'Reports', name: 'Reports', icon: BarChart3 },
    { id: 'AI Assistant', name: 'AI Assistant', icon: Bot },
    { id: 'Settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-[#0b1329]/50 backdrop-blur-xl text-[#94a3b8] flex flex-col justify-between p-4 border-r border-white/5 shadow-2xl shadow-black/40">
      
      {/* Top Section: Brand Logo & Navigation */}
      <div>
        {/* 🌟 BRAND LOGO */}
        <div className="flex items-center gap-2 px-3 py-4 mb-6">
          <svg className="w-6 h-6 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 3h20v4H2zm0 6h20v4H2zm0 6h20v4H2z" opacity=".3"/>
            <path d="M12 2L2 22h20L12 2zm0 3.99L19.53 19H4.47L12 5.99z"/>
          </svg>
          <span className="text-xl font-bold text-white tracking-wide">
            Altis <span className="text-blue-400/90 font-light">AI</span>
          </span>
        </div>

        {/* Dynamic Navigation Links Matrix */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isItemActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isItemActive
                    ? 'bg-slate-100/10 text-white shadow-lg shadow-black/10 border border-white/10 backdrop-blur-md'
                    : 'hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isItemActive ? 'text-blue-400' : 'text-slate-400'}`} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Low Stock Alert Widget */}
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 shadow-inner">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-500/80 animate-pulse" />
          <span>Low Stock Alert</span>
        </div>
        
        <div className="space-y-2.5">
          {lowStockProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between bg-black/20 p-2.5 rounded-xl border border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                  <Package className="w-4 h-4 text-slate-400" />
                </div>
                <span className="text-sm font-medium text-slate-200">{product.name}</span>
              </div>
              <span className="text-xs text-amber-400 font-medium bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                {product.stock} in stock
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Sidebar;

