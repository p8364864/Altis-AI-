import { useState, useEffect } from 'react';
import { LogOut, User } from 'lucide-react';
import axios from 'axios';

function DashboardNavbar() {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState('Welcome back');

  useEffect(() => {
    // 1. Fetch User Profile
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/check-session', { 
          withCredentials: true 
        });
        if (response.data.isAuthenticated) {
          setUserProfile(response.data.user);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // 2. Dynamic Time-based Greeting Constructor
    const currentHour = new Date().getHours();
    if (currentHour < 12) setGreeting('Good morning');
    else if (currentHour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/auth/logout', {}, { withCredentials: true });
      window.location.href = 'http://localhost:5173/';
    } catch (error) {
      alert('Error logging out. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-20 bg-transparent flex items-center justify-between px-8">
        <div className="w-24 h-4 bg-white/5 rounded animate-pulse"></div>
        <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    /* 🌟 THE GRID FIX: 
       `justify-between` forces the greeting to the far left, and user profile/logout actions to the far right on the exact same horizontal line.
    */
    <div className="w-full h-20 bg-transparent flex items-center justify-between px-8 mt-2 select-none">
      
      {/* LEFT SIDE: Dynamic Welcome Greeting */}
      <div className="animate-fade-in">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{userProfile?.name || 'User'}</span> 👋
        </h1>
        <p className="text-slate-400 text-xs font-light mt-0.5 tracking-wide hidden sm:block">
          Here is what's happening with your system metrics today.
        </p>
      </div>

      {/* RIGHT SIDE: Profile Session Pill Container */}
      <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl shadow-black/20">
        
        {/* User Info Segment */}
        <div className="flex items-center gap-3">
          {/* Neon Gradient Avatar Icon */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <User className="w-4 h-4 text-white" />
          </div>

          {/* Email context layout */}
          <div className="flex flex-col hidden md:flex">
            <p className="text-xs font-semibold text-slate-200 tracking-wide">
              {userProfile?.name || 'User'}
            </p>
            <p className="text-[10px] text-slate-500 font-light tracking-normal">
              {userProfile?.email || 'user@example.com'}
            </p>
          </div>
        </div>

        {/* Divider line vertical stroke */}
        <div className="w-px h-5 bg-white/10"></div>

        {/* Glossy Interactive Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 hover:bg-red-500/10 hover:border-red-500/20 text-slate-300 hover:text-red-400 font-medium text-xs transition-all duration-300 group"
        >
          <LogOut className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

    </div>
  );
}

export default DashboardNavbar;
