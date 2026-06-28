import React, { useState } from 'react';
import axios from 'axios';
import { Bot, Upload, RefreshCw, AlertCircle } from 'lucide-react';

function AiBillScanner({ onDataExtracted }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleScan = async () => {
    if (!file) {
      setError('Please select a bill invoice image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    setError('');

    try {
      // Send directly to your Flask Backend
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data && response.data.data) {
        // Send the structured data back up to the parent view or AddTransaction form
        onDataExtracted(response.data.data);
        setFile(null); // Reset file picker
      } else {
        setError('OCR complete, but could not structure the text data.');
      }
    } catch (err) {
      console.error("OCR Pipeline Error:", err);
      setError(err.response?.data?.error || 'Failed to connect to the AI processing cluster.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl p-5 mb-5 bg-white/[0.015] border border-white/5 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center gap-2.5 pb-3 border-b border-white/5 mb-4">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-cyan-500/10 border border-cyan-500/25 text-cyan-400">
          <Bot className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-white tracking-wide uppercase">Altis AI Document Core</h4>
          <p className="text-[10px] text-slate-400">Scan vendor bills using OCR & AI extraction</p>
        </div>
      </div>

      {error && (
        <div className="mb-3 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center text-xs">
        <div className="flex-1 relative">
          <input 
            type="file" 
            id="ai-bill-upload" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden" 
          />
          <label 
            htmlFor="ai-bill-upload"
            className="w-full flex items-center gap-2 bg-black/50 border border-white/10 hover:border-cyan-500/40 rounded-xl px-3 py-2 text-slate-300 cursor-pointer transition-all truncate"
          >
            <Upload className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span className="truncate">{file ? file.name : "Choose bill image..."}</span>
          </label>
        </div>

        <button
          onClick={handleScan}
          disabled={loading || !file}
          className="py-2 px-4 bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-900/40 disabled:text-slate-500 text-white font-medium rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 min-w-[120px]"
        >
          {loading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Parsing...
            </>
          ) : (
            'Scan with AI'
          )}
        </button>
      </div>
    </div>
  );
}

export default AiBillScanner;