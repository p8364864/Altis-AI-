import { useState, useEffect } from 'react';
import axios from 'axios';

// 📂 Added visible prop to receive show/hide states from Home.jsx
function Navbar({ onScrollToSection, visible }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/check-session', { 
          withCredentials: true 
        });
        if (response.data.isAuthenticated) {
          setIsLoggedIn(true);
          setUserProfile(response.data.user);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUserProfile(null);
      }
    };
    checkAuthStatus();
  }, []);

  const handleNavigation = (route) => {
    window.location.href = `http://localhost:5173/${route}`;
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/auth/logout', {}, { withCredentials: true });
      setIsLoggedIn(false);
      setUserProfile(null);
      window.location.href = 'http://localhost:5173/';
    } catch (error) {
      alert("Error logging out. Please try again.");
    }
  };

  return (
    /* 🔥 FIXED CONTAINER WITH CINEMATIC HIDING ANIMATION CLASSHOLDERS
       Humne 'absolute' ko 'fixed' se replace kiya aur transition configuration add kiya. */
    <div className={`w-full px-4 pt-4 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
    }`}>
      <nav className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-lg transition-all duration-300">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            {/* BRAND LOGO */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation('')}>
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 3h20v4H2zm0 6h20v4H2zm0 6h20v4H2z" opacity=".3"/>
                <path d="M12 2L2 22h20L12 2zm0 3.99L19.53 19H4.47L12 5.99z"/>
              </svg>
              <span className="text-xl font-bold text-white tracking-wide">
                Altis <span className="text-blue-400/90 font-light">AI</span>
              </span>
            </div>

            {/* CENTRAL DESKTOP LINKS */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={(e) => onScrollToSection(e, 'features')} 
                className="text-xs font-medium text-gray-300 hover:text-white tracking-wide transition-colors bg-transparent border-none cursor-pointer"
              >
                Features
              </button>
              <button 
                onClick={(e) => onScrollToSection(e, 'analytics')} 
                className="text-xs font-medium text-gray-300 hover:text-white tracking-wide transition-colors bg-transparent border-none cursor-pointer"
              >
                Analytics
              </button>
              <button 
                onClick={(e) => onScrollToSection(e, 'pricing')} 
                className="text-xs font-medium text-gray-300 hover:text-white tracking-wide transition-colors bg-transparent border-none cursor-pointer"
              >
                Pricing
              </button>
            </div>

            {/* DYNAMIC DESKTOP ACTION BUTTONS */}
            <div className="hidden md:flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <span className="text-xs text-gray-400 font-light mr-2">
                    Hi, <span className="text-white font-medium">{userProfile?.name || 'User'}</span>
                  </span>
                  <button type="button" onClick={() => handleNavigation('dashboard')} className="text-xs font-medium text-blue-400 hover:text-blue-300 px-4 py-2 transition-colors">
                    Dashboard
                  </button>
                  <button type="button" onClick={handleLogout} className="text-xs rounded-xl px-4 py-2 bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 font-medium tracking-wide transition-all">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button type="button" onClick={() => handleNavigation('login')} className="text-xs font-medium text-gray-300 hover:text-white px-4 py-2 transition-colors">
                    Login
                  </button>
                  <button type="button" onClick={() => handleNavigation('login')} className="text-xs rounded-xl px-5 py-2.5 bg-blue-500/10 backdrop-blur-md border border-blue-500/30 text-blue-200 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/50 font-medium tracking-wide transition-all shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                    Get Started
                  </button>
                </>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <div className="flex md:hidden">
              <button type="button" onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center rounded-xl p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none transition-colors">
                {isOpen ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* DYNAMIC MOBILE MENU DROPDOWN */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-72 border-t border-white/5 bg-black/10' : 'max-h-0'}`}>
          <div className="space-y-1 px-4 py-3 flex flex-col items-start">
            <button onClick={(e) => { setIsOpen(false); onScrollToSection(e, 'features'); }} className="w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all bg-transparent border-none cursor-pointer">Features</button>
            <button onClick={(e) => { setIsOpen(false); onScrollToSection(e, 'analytics'); }} className="w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all bg-transparent border-none cursor-pointer">Analytics</button>
            <button onClick={(e) => { setIsOpen(false); onScrollToSection(e, 'pricing'); }} className="w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all bg-transparent border-none cursor-pointer">Pricing</button>
            
            <div className="flex flex-col gap-2 pt-4 border-t border-white/5 mt-2 w-full">
              {isLoggedIn ? (
                <>
                  <div className="text-xs text-gray-400 text-center mb-1">Logged in as: <span className="text-white font-medium">{userProfile?.name}</span></div>
                  <button type="button" onClick={() => handleNavigation('dashboard')} className="w-full text-center text-sm font-medium text-blue-400 py-2 bg-blue-500/5 border border-blue-500/20 rounded-xl">Dashboard</button>
                  <button type="button" onClick={handleLogout} className="w-full text-center text-sm rounded-xl py-2 bg-white/5 border border-white/10 text-white font-medium">Logout</button>
                </>
              ) : (
                <>
                  <button type="button" onClick={() => handleNavigation('login')} className="w-full text-center text-sm font-medium text-gray-300 hover:text-white py-2">Login</button>
                  <button type="button" onClick={() => handleNavigation('login')} className="w-full text-center text-sm rounded-xl py-2 bg-blue-500/20 border border-blue-500/40 text-white font-medium">Get Started</button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;




// import { useState, useEffect } from 'react';
// import axios from 'axios';

// // 📂 Added an optional 'isDashboard' prop to instantly switch positioning behavior
// function Navbar({ onScrollToSection, visible, isDashboard = false }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userProfile, setUserProfile] = useState(null);

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/auth/check-session', { 
//           withCredentials: true 
//         });
//         if (response.data.isAuthenticated) {
//           setIsLoggedIn(true);
//           setUserProfile(response.data.user);
//         }
//       } catch (error) {
//         setIsLoggedIn(false);
//         setUserProfile(null);
//       }
//     };
//     checkAuthStatus();
//   }, []);

//   const handleNavigation = (route) => {
//     window.location.href = `http://localhost:5173/${route}`;
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:8000/api/auth/logout', {}, { withCredentials: true });
//       setIsLoggedIn(false);
//       setUserProfile(null);
//       window.location.href = 'http://localhost:5173/';
//     } catch (error) {
//       alert("Error logging out. Please try again.");
//     }
//   };

//   return (
//     /* 🔥 DYNAMIC POSITIONING SYSTEM:
//       If it's on the Dashboard, it stays normal ('relative').
//       If it's on the Home page, it floats cleanly over the hero background ('absolute top-0 left-0 right-0 z-50').
//     */
//     <div className={`w-full px-4 pt-4 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out ${
//       isDashboard ? 'relative' : 'absolute top-0 left-0 right-0 z-50'
//     } ${
//       visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
//     }`}>
//       <nav className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-lg transition-all duration-300">
//         <div className="px-4 sm:px-6 lg:px-8">
//           <div className="flex h-16 items-center justify-between">
            
//             {/* BRAND LOGO */}
//             <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation('')}>
//               <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M2 3h20v4H2zm0 6h20v4H2zm0 6h20v4H2z" opacity=".3"/>
//                 <path d="M12 2L2 22h20L12 2zm0 3.99L19.53 19H4.47L12 5.99z"/>
//               </svg>
//               <span className="text-xl font-bold text-white tracking-wide">
//                 Altis <span className="text-blue-400/90 font-light">AI</span>
//               </span>
//             </div>

//             {/* CENTRAL DESKTOP LINKS */}
//             <div className="hidden md:flex items-center gap-8">
//               <button 
//                 onClick={(e) => onScrollToSection && onScrollToSection(e, 'features')} 
//                 className="text-xs font-medium text-gray-300 hover:text-white tracking-wide transition-colors bg-transparent border-none cursor-pointer"
//               >
//                 Features
//               </button>
//               <button 
//                 onClick={(e) => onScrollToSection && onScrollToSection(e, 'analytics')} 
//                 className="text-xs font-medium text-gray-300 hover:text-white tracking-wide transition-colors bg-transparent border-none cursor-pointer"
//               >
//                 Analytics
//               </button>
//               <button 
//                 onClick={(e) => onScrollToSection && onScrollToSection(e, 'pricing')} 
//                 className="text-xs font-medium text-gray-300 hover:text-white tracking-wide transition-colors bg-transparent border-none cursor-pointer"
//               >
//                 Pricing
//               </button>
//             </div>

//             {/* DYNAMIC DESKTOP ACTION BUTTONS */}
//             <div className="hidden md:flex items-center gap-4">
//               {isLoggedIn ? (
//                 <>
//                   <span className="text-xs text-gray-400 font-light mr-2">
//                     Hi, <span className="text-white font-medium">{userProfile?.name || 'User'}</span>
//                   </span>
//                   <button type="button" onClick={() => handleNavigation('dashboard')} className="text-xs font-medium text-blue-400 hover:text-blue-300 px-4 py-2 transition-colors">
//                     Dashboard
//                   </button>
//                   <button type="button" onClick={handleLogout} className="text-xs rounded-xl px-4 py-2 bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 font-medium tracking-wide transition-all">
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button type="button" onClick={() => handleNavigation('login')} className="text-xs font-medium text-gray-300 hover:text-white px-4 py-2 transition-colors">
//                     Login
//                   </button>
//                   <button type="button" onClick={() => handleNavigation('login')} className="text-xs rounded-xl px-5 py-2.5 bg-blue-500/10 backdrop-blur-md border border-blue-500/30 text-blue-200 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/50 font-medium tracking-wide transition-all shadow-[0_0_15px_rgba(59,130,246,0.15)]">
//                     Get Started
//                   </button>
//                 </>
//               )}
//             </div>

//             {/* MOBILE MENU BUTTON */}
//             <div className="flex md:hidden">
//               <button type="button" onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center rounded-xl p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none transition-colors">
//                 {isOpen ? (
//                   <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
//                 ) : (
//                   <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
//                 )}
//               </button>
//             </div>

//           </div>
//         </div>

//         {/* DYNAMIC MOBILE MENU DROPDOWN */}
//         <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-72 border-t border-white/5 bg-black/10' : 'max-h-0'}`}>
//           <div className="space-y-1 px-4 py-3 flex flex-col items-start">
//             <button onClick={(e) => { setIsOpen(false); onScrollToSection && onScrollToSection(e, 'features'); }} className="w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all bg-transparent border-none cursor-pointer">Features</button>
//             <button onClick={(e) => { setIsOpen(false); onScrollToSection && onScrollToSection(e, 'analytics'); }} className="w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all bg-transparent border-none cursor-pointer">Analytics</button>
//             <button onClick={(e) => { setIsOpen(false); onScrollToSection && onScrollToSection(e, 'pricing'); }} className="w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all bg-transparent border-none cursor-pointer">Pricing</button>
            
//             <div className="flex flex-col gap-2 pt-4 border-t border-white/5 mt-2 w-full">
//               {isLoggedIn ? (
//                 <>
//                   <div className="text-xs text-gray-400 text-center mb-1">Logged in as: <span className="text-white font-medium">{userProfile?.name}</span></div>
//                   <button type="button" onClick={() => handleNavigation('dashboard')} className="w-full text-center text-sm font-medium text-blue-400 py-2 bg-blue-500/5 border border-blue-500/20 rounded-xl">Dashboard</button>
//                   <button type="button" onClick={handleLogout} className="w-full text-center text-sm rounded-xl py-2 bg-white/5 border border-white/10 text-white font-medium">Logout</button>
//                 </>
//               ) : (
//                 <>
//                   <button type="button" onClick={() => handleNavigation('login')} className="w-full text-center text-sm font-medium text-gray-300 hover:text-white py-2">Login</button>
//                   <button type="button" onClick={() => handleNavigation('login')} className="w-full text-center text-sm rounded-xl py-2 bg-blue-500/20 border border-blue-500/40 text-white font-medium">Get Started</button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default Navbar;