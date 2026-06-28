// src/Components/AiAssistance.jsx
import { useState } from 'react';
import axios from 'axios';
import { Bot, Clock } from 'lucide-react';

function AiAssistance() {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);

  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || aiLoading) return;

    const userQuery = chatInput.trim();
    setChatHistory((prev) => [...prev, { sender: 'user', text: userQuery }]);
    setChatInput('');
    setAiLoading(true);

    try {
      // Connect to the python app.py running on port 5001
      const response = await axios.post('http://localhost:5001/chat', {
        question: userQuery
      });

      if (response.data && response.data.answer) {
        setChatHistory((prev) => [...prev, { sender: 'bot', text: response.data.answer }]);
      } else {
        setChatHistory((prev) => [...prev, { sender: 'bot', text: 'No response token returned.' }]);
      }
    } catch (error) {
      console.error("AI Node offline error:", error);
      setChatHistory((prev) => [
        ...prev, 
        { sender: 'bot', text: `Connection Error: ${error.response?.data?.error || error.message}` }
      ]);
    } finally {
      setAiLoading(false);
      setTimeout(() => {
        const box = document.getElementById('chat-thread-box');
        if (box) box.scrollTop = box.scrollHeight;
      }, 50);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 items-start w-full max-w-4xl mx-auto">
      <div className="rounded-2xl p-6 bg-white/[0.012] border border-white/6 backdrop-blur-3xl min-h-[550px] flex flex-col justify-between shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-500/25 text-blue-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">Altis Financial AI Engine</h4>
            <p className="text-[11px] font-light text-slate-400 mt-0.5">Automated accounting, tax compliance & ledger advisory node</p>
          </div>
        </div>

        {/* Conversation Logs */}
        <div 
          className="flex-1 overflow-y-auto my-4 p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col gap-3 max-h-[380px]"
          id="chat-thread-box"
        >
          <div className="flex flex-col items-start max-w-[85%] bg-white/[0.03] border border-white/5 rounded-2xl p-3.5 text-xs text-slate-200">
            <span className="text-[10px] uppercase tracking-wider font-bold text-blue-400 mb-1">Altis AI</span>
            Hello! I am your financial assistant. Ask me anything about accounting, taxes, metrics, or GST liability tracking.
          </div>

          {chatHistory.map((msg, index) => (
            <div 
              key={index} 
              className={`flex flex-col max-w-[85%] rounded-2xl p-3.5 text-xs border ${
                msg.sender === 'user' 
                  ? 'self-end bg-blue-600/10 border-blue-500/20 text-blue-200' 
                  : 'self-start bg-white/[0.03] border-white/5 text-slate-200'
              }`}
            >
              <span className={`text-[10px] uppercase tracking-wider font-bold mb-1 ${msg.sender === 'user' ? 'text-blue-300' : 'text-blue-400'}`}>
                {msg.sender === 'user' ? 'You' : 'Altis AI'}
              </span>
              <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
            </div>
          ))}

          {aiLoading && (
            <div className="self-start flex items-center gap-2 bg-white/[0.02] border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-400 animate-pulse">
              <Clock className="w-3.5 h-3.5 text-blue-400 animate-spin" />
              Synthesizing financial metrics data...
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSendChatMessage} className="flex gap-2 items-center">
          <input 
            type="text" 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            disabled={aiLoading}
            placeholder="Ask about GST liabilities, vendor metrics, account streams..."
            className="flex-1 bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
          />
          <button 
            type="submit"
            disabled={aiLoading || !chatInput.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900/40 text-white rounded-xl px-5 py-3 text-xs font-semibold tracking-wide transition-all"
          >
            Transmit
          </button>
        </form>

      </div>
    </div>
  );
}

export default AiAssistance;