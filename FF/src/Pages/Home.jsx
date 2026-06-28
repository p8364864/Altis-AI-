// import { useState, useEffect } from 'react'
// import Navbar from '../Components/Navbar'
// import backimage from '../assets/Gemini_Generated_Image_7ldcfq7ldcfq7ldc.png'

// function Home() {
//   const [showNavbar, setShowNavbar] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   // 🔥 COOL SCROLL DETECTION LOGIC
//   // Is logic se hum check karenge ki user page par niche ja raha hai ya upar
//   useEffect(() => {
//     const controlNavbar = () => {
//       if (typeof window !== 'undefined') {
//         // Agar user niche scroll kar raha hai toh navbar ko hide karo, agar upar aa raha hai toh show karo
//         if (window.scrollY > lastScrollY && window.scrollY > 100) { 
//           setShowNavbar(false); // Hide on scroll down
//         } else {
//           setShowNavbar(true);  // Show on scroll up
//         }
//         setLastScrollY(window.scrollY);
//       }
//     };

//     window.addEventListener('scroll', controlNavbar);
//     return () => {
//       window.removeEventListener('scroll', controlNavbar);
//     };
//   }, [lastScrollY]);

//   const handleGetStarted = () => {
//     window.location.href = 'http://localhost:5173/login';
//   };

//   // HIGHLY OPTIMIZED PREMIUM SMOOTH SCROLL MECHANISM
//   const scrollToSection = (e, sectionId) => {
//     if (e) e.preventDefault(); 
//     const element = document.getElementById(sectionId);
    
//     if (element) {
//       const offset = 85; 
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - offset;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth' 
//       });
//     }
//   };

//   return (
//     <div className="relative min-h-screen w-full overflow-x-hidden font-sans text-white bg-black">
//       {/* BACKGROUND IMAGE LAYER */}
//       <img 
//         className='fixed inset-0 h-full w-full object-cover z-0'  
//         src={backimage}
//         alt="background" 
//       />
//       <div className="fixed inset-0 bg-black/60 z-0 backdrop-blur-[2px]"></div>

//       {/* 🔥 FLOATING NAVBAR with dynamic visible state parameter */}
//       <Navbar onScrollToSection={scrollToSection} visible={showNavbar} />

//       {/* Main Content Wrapper */}
//       <div className="relative z-10 w-full flex flex-col items-center">
        
//         {/* ========================================================================
//              1. HERO SECTION
//            ======================================================================== */}
//         <section className="min-h-screen max-w-7xl mx-auto px-4 pt-36 pb-20 flex flex-col items-center justify-center text-center sm:px-6 lg:px-8">
//           <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 border border-blue-500/30 bg-blue-500/5 backdrop-blur-md text-xs text-blue-300 font-medium tracking-wide mb-6 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.1)]">
//             ✨ Introducing Altis AI v1.0
//           </div>

//           <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight max-w-4xl">
//             Smart Finance.<br />
//             <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
//               Stronger Business.
//             </span>
//           </h1>

//           <p className="mt-6 text-gray-300 text-sm sm:text-lg max-w-2xl leading-relaxed">
//             AI-powered financial insights, automated reports, and real-time smart analytics 
//             built to help you make faster, smarter business decisions.
//           </p>

//           <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
//             <button
//               type="button"
//               onClick={handleGetStarted}
//               className="w-full sm:w-auto text-sm rounded-xl px-8 py-4 bg-blue-500/20 backdrop-blur-md border border-blue-500/40 text-blue-100 hover:text-white hover:bg-blue-500/30 hover:border-blue-400 font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_35px_rgba(59,130,246,0.4)]"
//             >
//               Get Started for Free
//             </button>
//             <button
//               type="button"
//               onClick={(e) => scrollToSection(e, 'features')}
//               className="w-full sm:w-auto text-sm rounded-xl px-8 py-4 bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 font-medium tracking-wide transition-all text-center cursor-pointer"
//             >
//               Learn Features
//             </button>
//           </div>
//         </section>

//         {/* ========================================================================
//              2. FEATURES SECTION
//            ======================================================================== */}
//         <section id="features" className="w-full max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 border-t border-white/5">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Everything you need to grow</h2>
//             <p className="mt-4 text-gray-400 text-sm sm:text-base">Stop handling accounting templates manually. Let AI automate your financial pipelines perfectly.</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="p-6 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-xl flex flex-col gap-4">
//               <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-white/5 flex items-center justify-center text-blue-400">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
//                 </svg>
//               </div>
//               <h3 className="text-lg font-medium text-white">Real-time Analytics</h3>
//               <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Monitor cashflows, incoming margins, and active sales indexes immediately on live custom charts.</p>
//             </div>

//             <div className="p-6 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-xl flex flex-col gap-4">
//               <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-white/5 flex items-center justify-center text-blue-400">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
//                 </svg>
//               </div>
//               <h3 className="text-lg font-medium text-white">Bank-Grade Security</h3>
//               <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Protected with rigorous end-to-end multi-layer data encryptions and cookies session guards.</p>
//             </div>

//             <div className="p-6 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-xl flex flex-col gap-4">
//               <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-white/5 flex items-center justify-center text-blue-400">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
//                 </svg>
//               </div>
//               <h3 className="text-lg font-medium text-white">AI Assistant</h3>
//               <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Get auto-generated financial feedback loops, audit alerts, and predictions to minimize asset leaks.</p>
//             </div>
//           </div>
//         </section>

//         {/* ========================================================================
//              3. ANALYTICS PREVIEW SECTION
//            ======================================================================== */}
//         <section id="analytics" className="w-full max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 border-t border-white/5">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
//                 Advanced Metrics
//               </span>
//               <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4">
//                 Crystal Clear Financial Dashboards
//               </h2>
//               <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
//                 Altis AI automatically reads your transaction pipelines and builds responsive interactive layouts. Visualizing trends, overhead ratios, and month-over-month compound growth factors has never looked this seamless.
//               </p>
//               <div className="mt-6 space-y-3">
//                 <div className="flex items-center gap-3 text-sm text-gray-300">
//                   <span className="text-blue-400 text-lg">✦</span> Automated Expense Categorization
//                 </div>
//                 <div className="flex items-center gap-3 text-sm text-gray-300">
//                   <span className="text-blue-400 text-lg">✦</span> Runway & Cash Burn Prediction
//                 </div>
//               </div>
//             </div>
            
//             <div className="w-full h-64 sm:h-80 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl flex flex-col p-6 justify-between overflow-hidden relative group">
//               <div className="absolute -top-12 -right-12 h-32 w-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
//               <div className="flex justify-between items-center border-b border-white/5 pb-4">
//                 <div className="flex gap-2">
//                   <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
//                   <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
//                   <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
//                 </div>
//                 <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Live Metrics Panel</span>
//               </div>
//               <div className="flex-1 flex items-center justify-center">
//                 <div className="text-center space-y-2">
//                   <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">$48,250.00</div>
//                   <p className="text-xs text-gray-400 font-medium tracking-wide">Net Revenue Generated This Month</p>
//                 </div>
//               </div>
//               <div className="h-12 w-full bg-white/5 border border-white/5 rounded-xl flex items-center justify-between px-4 text-[11px] text-gray-400">
//                 <span>AI Prediction: <span className="text-green-400 font-medium">+12.4% Next Quarter</span></span>
//                 <span className="text-blue-400 font-medium cursor-pointer hover:underline" onClick={handleGetStarted}>View live metrics →</span>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ========================================================================
//              4. PRICING SECTION
//            ======================================================================== */}
//         <section id="pricing" className="w-full max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 border-t border-white/5">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Simple, transparent pricing</h2>
//             <p className="mt-4 text-gray-400 text-sm sm:text-base">Start tracking today. Scale up your ledger requirements whenever your company scales.</p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//             <div className="p-8 rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-xl flex flex-col justify-between gap-6">
//               <div>
//                 <h4 className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Starter Plan</h4>
//                 <div className="flex items-baseline gap-1 mt-2">
//                   <span className="text-4xl font-bold">$0</span>
//                   <span className="text-gray-400 text-xs">/ month</span>
//                 </div>
//                 <p className="text-gray-400 text-xs mt-3 leading-relaxed">Perfect layout architecture for individual hobbyists or bootstrapped startup tracking setup.</p>
//                 <ul className="mt-6 space-y-3 text-xs text-gray-300">
//                   <li className="flex items-center gap-2">✅ 1 Connected Dashboard Project</li>
//                   <li className="flex items-center gap-2">✅ Standard Cashflow Reports</li>
//                   <li className="flex items-center gap-2">✅ 5 Custom AI Prompt Inquiries/day</li>
//                 </ul>
//               </div>
//               <button onClick={handleGetStarted} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold tracking-wide hover:bg-white/10 transition-all cursor-pointer">
//                 Choose Free Tier
//               </button>
//             </div>

//             <div className="p-8 rounded-3xl border border-blue-500/30 bg-blue-950/10 backdrop-blur-xl shadow-2xl flex flex-col justify-between gap-6 relative overflow-hidden">
//               <div className="absolute top-0 right-0 bg-blue-500 text-black px-4 py-1 text-[10px] font-bold uppercase rounded-bl-xl tracking-wider">
//                 Popular
//               </div>
//               <div>
//                 <h4 className="text-blue-400 text-xs uppercase tracking-wider font-semibold">Enterprise Pro</h4>
//                 <div className="flex items-baseline gap-1 mt-2">
//                   <span className="text-4xl font-bold">$29</span>
//                   <span className="text-gray-400 text-xs">/ month</span>
//                 </div>
//                 <p className="text-gray-400 text-xs mt-3 leading-relaxed">Engineered systematically for growing medium organizations with custom audit pipelines.</p>
//                 <ul className="mt-6 space-y-3 text-xs text-gray-300">
//                   <li className="flex items-center gap-2">✅ Unlimited Dashboard Connections</li>
//                   <li className="flex items-center gap-2">✅ Advanced Analytics & Forecasting</li>
//                   <li className="flex items-center gap-2">✅ Continuous 24/7 Priority AI Tokens</li>
//                   <li className="flex items-center gap-2">✅ Multi-user Team Workspace Access</li>
//                 </ul>
//               </div>
//               <button onClick={handleGetStarted} className="w-full py-3 rounded-xl bg-blue-500/20 border border-blue-500/40 text-xs font-semibold tracking-wide text-blue-200 hover:text-white hover:bg-blue-500/30 transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)] cursor-pointer">
//                 Upgrade to Pro
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* ========================================================================
//              5. FOOTER SECTION
//            ======================================================================== */}
//         <footer className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 border-t border-white/5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-xs">
//           <span>&copy; 2026 Altis AI. All rights reserved.</span>
//           <div className="flex gap-4">
//             <a href="#privacy" className="hover:text-gray-300 transition-all">Privacy Policy</a>
//             <span>&bull;</span>
//             <a href="#terms" className="hover:text-gray-300 transition-all">Terms of Service</a>
//           </div>
//         </footer>

//       </div>
//     </div>
//   )
// }

// export default Home;






import { useState, useEffect, useRef } from 'react'
import Navbar from '../Components/Navbar'
import backimage from '../assets/Gemini_Generated_Image_7ldcfq7ldcfq7ldc.png'
 
/* ─── tiny hook: fires once when element enters viewport ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}
 
/* ─── animated counter ─── */
function Counter({ target, prefix = '', suffix = '', duration = 1800 }) {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}
 
/* ─── floating orb background particles ─── */
function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {[
        { size: 320, top: '10%',  left: '5%',   delay: '0s',   dur: '18s', color: 'rgba(59,130,246,0.07)' },
        { size: 240, top: '55%',  left: '80%',  delay: '3s',   dur: '22s', color: 'rgba(45,212,191,0.06)' },
        { size: 180, top: '75%',  left: '15%',  delay: '6s',   dur: '15s', color: 'rgba(59,130,246,0.05)' },
        { size: 140, top: '30%',  left: '60%',  delay: '1.5s', dur: '20s', color: 'rgba(45,212,191,0.04)' },
        { size: 200, top: '5%',   left: '70%',  delay: '9s',   dur: '25s', color: 'rgba(59,130,246,0.06)' },
      ].map((orb, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            animation: `orbFloat ${orb.dur} ease-in-out infinite alternate`,
            animationDelay: orb.delay,
            filter: 'blur(40px)',
          }}
        />
      ))}
      <style>{`
        @keyframes orbFloat {
          0%   { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-40px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
 
/* ─── animated grid lines overlay ─── */
function GridOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
      }}
    />
  );
}
 
/* ─── reveal wrapper ─── */
function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const [ref, inView] = useInView();
  const transforms = { up: 'translateY(40px)', down: 'translateY(-40px)', left: 'translateX(-40px)', right: 'translateX(40px)' };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate(0)' : transforms[direction],
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(.22,.68,0,1.2) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
 
/* ─── feature card ─── */
function FeatureCard({ icon, title, desc, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay} direction="up">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: '24px',
          borderRadius: '16px',
          border: `1px solid ${hovered ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.08)'}`,
          background: hovered ? 'rgba(59,130,246,0.07)' : 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          transition: 'all 0.35s cubic-bezier(.22,.68,0,1.2)',
          transform: hovered ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
          boxShadow: hovered ? '0 20px 60px rgba(59,130,246,0.15)' : '0 4px 20px rgba(0,0,0,0.3)',
          cursor: 'default',
        }}
      >
        <div
          style={{
            height: 48, width: 48, borderRadius: 12,
            background: hovered ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.08)',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#60a5fa',
            transition: 'all 0.35s ease',
            transform: hovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0) scale(1)',
          }}
        >
          {icon}
        </div>
        <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 16, margin: 0 }}>{title}</h3>
        <p style={{ color: '#9ca3af', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{desc}</p>
      </div>
    </Reveal>
  );
}
 
/* ─── animated bar chart in dashboard ─── */
function MiniBarChart() {
  const [ref, inView] = useInView();
  const bars = [42, 65, 55, 80, 70, 95, 88];
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 60, padding: '0 4px' }}>
      {bars.map((h, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div
            style={{
              width: '100%',
              height: inView ? `${h}%` : '0%',
              background: i === 5 ? 'linear-gradient(to top, #3b82f6, #2dd4bf)' : 'rgba(59,130,246,0.3)',
              borderRadius: '3px 3px 0 0',
              transition: `height 0.8s cubic-bezier(.22,.68,0,1.2) ${i * 80}ms`,
              boxShadow: i === 5 ? '0 0 8px rgba(59,130,246,0.5)' : 'none',
            }}
          />
          <span style={{ fontSize: 8, color: '#6b7280', fontFamily: 'monospace' }}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}
 
/* ─── pulsing live indicator ─── */
function LiveBadge() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#4ade80' }}>
      <span style={{ position: 'relative', display: 'inline-flex' }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%', background: '#4ade80', display: 'block',
          animation: 'ping 1.2s ease-in-out infinite',
        }} />
        <span style={{
          position: 'absolute', inset: 0, borderRadius: '50%', background: '#4ade80',
          width: 8, height: 8, opacity: 0.75,
        }} />
      </span>
      LIVE
      <style>{`
        @keyframes ping {
          0%   { transform: scale(1); opacity: 1; }
          75%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
 
/* ─── typing text animation ─── */
function TypingText({ words }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [displayed, setDisplayed] = useState('');
 
  useEffect(() => {
    const word = words[wordIndex];
    let timeout;
    if (!deleting && charIndex < word.length) {
      timeout = setTimeout(() => {
        setDisplayed(word.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, 80);
    } else if (!deleting && charIndex === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(word.slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
      }, 45);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex(i => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words]);
 
  return (
    <span style={{
      background: 'linear-gradient(90deg, #60a5fa, #2dd4bf)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}>
      {displayed}
      <span style={{
        display: 'inline-block', width: 3, height: '0.85em',
        background: 'linear-gradient(#60a5fa, #2dd4bf)',
        marginLeft: 2, verticalAlign: 'text-bottom',
        animation: 'blink 0.8s step-end infinite',
      }} />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
}
 
/* ════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
function Home() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
 
  useEffect(() => {
    // hero entrance
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);
 
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);
 
  const handleGetStarted = () => {
    window.location.href = 'http://localhost:5173/login';
  };
 
  const scrollToSection = (e, sectionId) => {
    if (e) e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };
 
  // shared slide-up style for hero children
  const heroItem = (delay) => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(.22,.68,0,1.2) ${delay}ms`,
  });
 
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans text-white bg-black">
 
      {/* ── Background layers ── */}
      <img
        className='fixed inset-0 h-full w-full object-cover z-0'
        src={backimage}
        alt="background"
        style={{ filter: 'brightness(0.8)' }}
      />
      <div className="fixed inset-0 bg-black/60 z-0 backdrop-blur-[2px]" />
      <GridOverlay />
      <FloatingOrbs />
 
      {/* ── Navbar ── */}
      <Navbar onScrollToSection={scrollToSection} visible={showNavbar} />
 
      {/* ── Page content ── */}
      <div className="relative z-10 w-full flex flex-col items-center">
 
        {/* ════════════ 1. HERO ════════════ */}
        <section className="min-h-screen max-w-7xl mx-auto px-4 pt-36 pb-20 flex flex-col items-center justify-center text-center sm:px-6 lg:px-8">
 
          {/* Badge */}
          <div style={heroItem(0)}>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 border border-blue-500/30 bg-blue-500/5 backdrop-blur-md text-xs text-blue-300 font-medium tracking-wide mb-6 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
              style={{ animation: 'pulse 2s ease-in-out infinite' }}
            >
              ✨ Introducing Altis AI v1.0
            </div>
          </div>
 
          {/* Headline */}
          <div style={heroItem(150)}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight max-w-4xl">
              Smart Finance.<br />
              <TypingText words={['Stronger Business.', 'Smarter Decisions.', 'Faster Growth.']} />
            </h1>
          </div>
 
          {/* Subtext */}
          <div style={heroItem(300)}>
            <p className="mt-6 text-gray-300 text-sm sm:text-lg max-w-2xl leading-relaxed">
              AI-powered financial insights, automated reports, and real-time smart analytics
              built to help you make faster, smarter business decisions.
            </p>
          </div>
 
          {/* Stats row */}
          <div style={heroItem(420)} className="mt-8 flex gap-8 sm:gap-16 items-center justify-center">
            {[
              { value: 12400, suffix: '+', label: 'Businesses' },
              { value: 99, suffix: '.9% Uptime', label: '' },
              { value: 48, prefix: '$', suffix: 'M+ Tracked', label: '' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">
                  <Counter target={s.value} prefix={s.prefix || ''} suffix={s.suffix} />
                </div>
                {s.label && <div className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wider">{s.label}</div>}
              </div>
            ))}
          </div>
 
          {/* CTA Buttons */}
          <div style={heroItem(500)} className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
            <button
              type="button"
              onClick={handleGetStarted}
              className="w-full sm:w-auto text-sm rounded-xl px-8 py-4 bg-blue-500/20 backdrop-blur-md border border-blue-500/40 text-blue-100 hover:text-white hover:bg-blue-500/30 hover:border-blue-400 font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_35px_rgba(59,130,246,0.4)]"
              style={{ position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => {
                const shine = e.currentTarget.querySelector('.btn-shine');
                if (shine) { shine.style.left = '120%'; }
              }}
              onMouseLeave={e => {
                const shine = e.currentTarget.querySelector('.btn-shine');
                if (shine) { shine.style.left = '-60%'; }
              }}
            >
              <span
                className="btn-shine"
                style={{
                  position: 'absolute', top: 0, left: '-60%', width: '40%', height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                  transition: 'left 0.5s ease', pointerEvents: 'none', skewX: '-20deg',
                }}
              />
              Get Started for Free →
            </button>
            <button
              type="button"
              onClick={(e) => scrollToSection(e, 'features')}
              className="w-full sm:w-auto text-sm rounded-xl px-8 py-4 bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 font-medium tracking-wide transition-all text-center cursor-pointer"
            >
              Learn Features
            </button>
          </div>
 
          {/* Scroll cue */}
          <div style={{ ...heroItem(700), marginTop: 48 }}>
            <div
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                color: 'rgba(156,163,175,0.5)', fontSize: 11, letterSpacing: '0.1em',
                animation: 'bounce 2s ease-in-out infinite',
              }}
              onClick={(e) => scrollToSection(e, 'features')}
              className="cursor-pointer"
            >
              <span>SCROLL</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
          <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }`}</style>
        </section>
 
        {/* ════════════ 2. FEATURES ════════════ */}
        <section id="features" className="w-full max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 border-t border-white/5">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Everything you need to grow</h2>
              <p className="mt-4 text-gray-400 text-sm sm:text-base">Stop handling accounting templates manually. Let AI automate your financial pipelines perfectly.</p>
            </div>
          </Reveal>
 
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              delay={0}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>}
              title="Real-time Analytics"
              desc="Monitor cashflows, incoming margins, and active sales indexes immediately on live custom charts."
            />
            <FeatureCard
              delay={120}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}
              title="Bank-Grade Security"
              desc="All your financial data is encrypted end-to-end with zero trust architecture and SOC 2 compliance."
            />
            <FeatureCard
              delay={240}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>}
              title="AI Assistant"
              desc="Get auto-generated financial feedback loops, audit alerts, and predictions to minimize asset leaks."
            />
          </div>
        </section>
 
        {/* ════════════ 3. ANALYTICS PREVIEW ════════════ */}
        <section id="analytics" className="w-full max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 border-t border-white/5">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
 
            <Reveal direction="left">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                  Advanced Metrics
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4">
                  Crystal Clear Financial Dashboards
                </h2>
                <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
                  Altis AI automatically reads your transaction pipelines and builds responsive interactive layouts.
                  Visualizing trends, overhead ratios, and month-over-month compound growth factors has never looked this seamless.
                </p>
                <div className="mt-6 space-y-3">
                  {['Automated Expense Categorization', 'Runway & Cash Burn Prediction'].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm text-gray-300"
                      style={{
                        transition: 'color 0.2s',
                      }}
                    >
                      <span className="text-blue-400 text-lg">✦</span> {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
 
            <Reveal direction="right" delay={100}>
              <div
                className="w-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl flex flex-col p-6 justify-between overflow-hidden relative"
                style={{
                  minHeight: 280,
                  boxShadow: '0 0 60px rgba(59,130,246,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                {/* glow orb inside card */}
                <div className="absolute -top-12 -right-12 h-32 w-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
 
                {/* Window chrome */}
                <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex items-center gap-2">
                    <LiveBadge />
                    <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Metrics Panel</span>
                  </div>
                </div>
 
                {/* Revenue number */}
                <div className="text-center py-2">
                  <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
                    $<Counter target={48250} />.00
                  </div>
                  <p className="text-xs text-gray-400 font-medium tracking-wide mt-1">Net Revenue Generated This Month</p>
                </div>
 
                {/* Mini bar chart */}
                <div className="mt-4">
                  <MiniBarChart />
                </div>
 
                {/* Footer bar */}
                <div className="h-12 w-full bg-white/5 border border-white/5 rounded-xl flex items-center justify-between px-4 text-[11px] text-gray-400 mt-4">
                  <span>AI Prediction: <span className="text-green-400 font-medium">+12.4% Next Quarter</span></span>
                  <span
                    className="text-blue-400 font-medium cursor-pointer hover:underline"
                    onClick={handleGetStarted}
                  >
                    View live →
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
 
        {/* ════════════ 4. PRICING ════════════ */}
        <section id="pricing" className="w-full max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 border-t border-white/5">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Simple, transparent pricing</h2>
              <p className="mt-4 text-gray-400 text-sm sm:text-base">Start tracking today. Scale up your ledger requirements whenever your company scales.</p>
            </div>
          </Reveal>
 
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
 
            {/* Free tier */}
            <Reveal direction="left" delay={100}>
              <div className="p-8 rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-xl flex flex-col justify-between gap-6 h-full transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1">
                <div>
                  <h4 className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Starter Plan</h4>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-gray-400 text-xs">/ month</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-3 leading-relaxed">Perfect layout architecture for individual hobbyists or bootstrapped startup tracking setup.</p>
                  <ul className="mt-6 space-y-3 text-xs text-gray-300">
                    {['1 Connected Dashboard Project', 'Standard Cashflow Reports', '5 Custom AI Prompt Inquiries/day'].map(f => (
                      <li key={f} className="flex items-center gap-2">✅ {f}</li>
                    ))}
                  </ul>
                </div>
                <button onClick={handleGetStarted} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold tracking-wide hover:bg-white/10 transition-all cursor-pointer">
                  Choose Free Tier
                </button>
              </div>
            </Reveal>
 
            {/* Pro tier */}
            <Reveal direction="right" delay={200}>
              <div
                className="p-8 rounded-3xl border border-blue-500/30 bg-blue-950/10 backdrop-blur-xl shadow-2xl flex flex-col justify-between gap-6 relative overflow-hidden h-full transition-all duration-300 hover:-translate-y-1"
                style={{ boxShadow: '0 0 40px rgba(59,130,246,0.1)' }}
              >
                <div className="absolute top-0 right-0 bg-blue-500 text-black px-4 py-1 text-[10px] font-bold uppercase rounded-bl-xl tracking-wider">Popular</div>
 
                {/* animated glow ring */}
                <div
                  className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)',
                    animation: 'pulse 3s ease-in-out infinite',
                  }}
                />
 
                <div>
                  <h4 className="text-blue-400 text-xs uppercase tracking-wider font-semibold">Enterprise Pro</h4>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-gray-400 text-xs">/ month</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-3 leading-relaxed">Engineered systematically for growing medium organizations with custom audit pipelines.</p>
                  <ul className="mt-6 space-y-3 text-xs text-gray-300">
                    {['Unlimited Dashboard Connections', 'Advanced Analytics & Forecasting', 'Continuous 24/7 Priority AI Tokens', 'Multi-user Team Workspace Access'].map(f => (
                      <li key={f} className="flex items-center gap-2">✅ {f}</li>
                    ))}
                  </ul>
                </div>
                <button onClick={handleGetStarted} className="w-full py-3 rounded-xl bg-blue-500/20 border border-blue-500/40 text-xs font-semibold tracking-wide text-blue-200 hover:text-white hover:bg-blue-500/30 transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)] cursor-pointer">
                  Upgrade to Pro
                </button>
              </div>
            </Reveal>
          </div>
        </section>
 
        {/* ════════════ 5. FOOTER ════════════ */}
        <footer className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 border-t border-white/5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-xs">
          <span>&copy; 2026 Altis AI. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-gray-300 transition-all">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#terms" className="hover:text-gray-300 transition-all">Terms of Service</a>
          </div>
        </footer>
 
      </div>
    </div>
  );
}
 
export default Home;