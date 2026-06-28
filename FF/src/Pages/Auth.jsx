import { useState } from 'react'
import backimage from '../assets/Gemini_Generated_Image_7ldcfq7ldcfq7ldc.png'
import axios from 'axios'; 

function Auth() {
  const [activeTab, setActiveTab] = useState('login') 

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Triggers the Google Auth sequence on the backend
  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:8000/api/auth/google';
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 

    if (regPassword.length < 8) {
      return alert("Password must be at least 8 characters long.");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(regPassword)) {
      return alert(
        "Password must contain at least:\n" +
        "• One uppercase letter\n" +
        "• One lowercase letter\n" +
        "• One number\n" +
        "• One special character (@, $, !, %, *, ?, &)"
      );
    }

    if (regPassword !== regConfirmPassword) {
      return alert("Passwords do not match!");
    }

    alert(`Sending to backend: Email is "${regEmail}" and Password is "${regPassword}"`);

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        fullName: regName,
        email: regEmail,
        password: regPassword
      });

      alert(response.data.message);
      setActiveTab('login');
    } catch (error) {
      console.error("AXIOS ERROR DETAILS:", error);
      alert("Backend Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email: loginEmail,
        password: loginPassword
      }, { withCredentials: true });

      window.location.href = 'http://localhost:5173/';
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden font-sans">
      <img 
        className='absolute inset-0 h-full w-full object-cover'  
        src={backimage}
        alt="background" 
      />
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between p-4 lg:p-8">
        <div className="flex-1 flex items-center justify-center my-auto">
          <div className="w-[95%] max-w-7xl rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-[1.1fr_2fr]">

              {/* LEFT PANEL: Branding & Features */}
              <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between gap-12">
                <div>
                  <div className="flex items-center gap-2 mb-12">
                    <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2 3h20v4H2zm0 6h20v4H2zm0 6h20v4H2z" opacity=".3"/>
                      <path d="M12 2L2 22h20L12 2zm0 3.99L19.53 19H4.47L12 5.99z"/>
                    </svg>
                    <h1 className="text-2xl font-bold text-white tracking-wide">
                      Altis <span className="text-blue-400/90 font-light">AI</span>
                    </h1>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-semibold text-white leading-tight tracking-tight">
                    Smart Finance.<br />
                    <span className="text-blue-400">Stronger Business.</span>
                  </h2>

                  <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-sm">
                    AI-powered financial insights, automated reports, and real-time analytics to help you make smarter decisions.
                  </p>

                  <div className="space-y-6 mt-10">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-white/5 flex items-center justify-center shrink-0 text-blue-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white text-sm font-medium">Real-time Analytics</h3>
                        <p className="text-gray-400 text-xs mt-0.5">Track your business performance in real time.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-white/5 flex items-center justify-center shrink-0 text-blue-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white text-sm font-medium">Secure & Reliable</h3>
                        <p className="text-gray-400 text-xs mt-0.5">Bank-grade security to keep your data safe.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-white/5 flex items-center justify-center shrink-0 text-blue-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white text-sm font-medium">AI Assistant</h3>
                        <p className="text-gray-400 text-xs mt-0.5">Get AI-powered insights and smart recommendations.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-xs border-t border-white/5 pt-4">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>Trusted by 10,000+ businesses worldwide</span>
                </div>
              </div>

              {/* RIGHT SIDE: Interactive Auth Forms Container */}
              <div className="flex flex-col">
                <div className="grid grid-cols-2 border-b border-white/10 text-center">
                  <button 
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className={`py-4 text-sm font-medium tracking-wide border-b-2 transition-all ${activeTab === 'login' ? 'text-white border-blue-500 bg-white/5' : 'text-gray-400 border-transparent hover:text-white'}`}
                  >
                    Login
                  </button>
                  <button 
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className={`py-4 text-sm font-medium tracking-wide border-b-2 transition-all ${activeTab === 'register' ? 'text-white border-blue-500 bg-white/5' : 'text-gray-400 border-transparent hover:text-white'}`}
                  >
                    Register
                  </button>
                </div>

                <div className="grid md:grid-cols-2 flex-1 divide-y md:divide-y-0 md:divide-x divide-white/10">

                  {/* LOGIN SUB-PANEL */}
                  <form onSubmit={handleLoginSubmit} className={`p-8 lg:p-10 flex flex-col justify-between ${activeTab === 'register' ? 'hidden md:flex' : 'flex'}`}>
                    <div>
                      <div className="mb-6">
                        <h2 className="text-xl font-medium text-white">Welcome back!</h2>
                        <p className="text-gray-400 text-xs mt-1">Login to your account to continue</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-gray-400 block mb-1.5 font-medium">Email Address</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" /></svg>
                            </span>
                            <input
                              type="email"
                              required
                              value={loginEmail}
                              onChange={(e) => setLoginEmail(e.target.value)}
                              placeholder="Enter your email"
                              className="w-full text-xs rounded-xl border border-white/10 bg-black/20 pl-10 pr-4 py-3 text-white outline-none focus:border-blue-500 focus:bg-black/40 transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-gray-400 block mb-1.5 font-medium">Password</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </span>
                            <input
                              type="password"
                              required
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              placeholder="Enter your password"
                              className="w-full text-xs rounded-xl border border-white/10 bg-black/20 pl-10 pr-10 py-3 text-white outline-none focus:border-blue-500 focus:bg-black/40 transition-all"
                            />
                          </div>
                        </div>

                        {/* BLUE GLASSY BUTTON */}
                        <button type="submit" className="w-full text-xs rounded-xl py-3 bg-blue-500/10 backdrop-blur-md border border-blue-500/30 text-blue-200 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/50 font-medium tracking-wide transition-all shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] mt-2">
                          Login
                        </button>

                        {/* OR WITH GOOGLE DIVIDER */}
                        <div className="flex items-center my-4">
                          <div className="flex-grow border-t border-white/5"></div>
                          <span className="mx-3 text-[10px] uppercase tracking-wider text-gray-500 font-medium">Or</span>
                          <div className="flex-grow border-t border-white/5"></div>
                        </div>

                        {/* GLASSY GOOGLE BUTTON */}
                        <button 
                          type="button" 
                          onClick={handleGoogleSignIn}
                          className="w-full text-xs rounded-xl py-2.5 bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 font-medium tracking-wide transition-all flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                            <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.103C18.22 1.832 15.422 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.743-.08-1.313-.178-1.777H12.24z"/>
                          </svg>
                          Sign in with Google
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* REGISTER SUB-PANEL */}
                  <form onSubmit={handleRegisterSubmit} className={`p-8 lg:p-10 flex flex-col justify-between ${activeTab === 'login' ? 'hidden md:flex' : 'flex'}`}>
                    <div>
                      <div className="mb-6">
                        <h2 className="text-xl font-medium text-white">Create your account</h2>
                        <p className="text-gray-400 text-xs mt-1">Fill in the details to get started</p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-400 block mb-1 font-medium">Full Name</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 0118 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </span>
                            <input
                              type="text"
                              value={regName}
                              onChange={(e) => setRegName(e.target.value)}
                              placeholder="Enter your full name"
                              className="w-full text-xs rounded-xl border border-white/10 bg-black/20 pl-10 pr-4 py-2.5 text-white outline-none focus:border-blue-500 focus:bg-black/40 transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-gray-400 block mb-1 font-medium">Email Address</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" /></svg>
                            </span>
                            <input
                              type="email"
                              required
                              value={regEmail}
                              onChange={(e) => setRegEmail(e.target.value)}
                              placeholder="Enter your email"
                              className="w-full text-xs rounded-xl border border-white/10 bg-black/20 pl-10 pr-4 py-2.5 text-white outline-none focus:border-blue-500 focus:bg-black/40 transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-gray-400 block mb-1 font-medium">Password</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </span>
                            <input
                              type="password"
                              required
                              value={regPassword}
                              onChange={(e) => setRegPassword(e.target.value)}
                              placeholder="Create a password"
                              className="w-full text-xs rounded-xl border border-white/10 bg-black/20 pl-10 pr-10 py-2.5 text-white outline-none focus:border-blue-500 focus:bg-black/40 transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-gray-400 block mb-1 font-medium">Confirm Password</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </span>
                            <input
                              type="password"
                              required
                              value={regConfirmPassword}
                              onChange={(e) => setRegConfirmPassword(e.target.value)}
                              placeholder="Confirm your password"
                              className="w-full text-xs rounded-xl border border-white/10 bg-black/20 pl-10 pr-10 py-2.5 text-white outline-none focus:border-blue-500 focus:bg-black/40 transition-all"
                            />
                          </div>
                        </div>

                        {/* BLUE GLASSY BUTTON */}
                        <button type="submit" className="w-full text-xs rounded-xl py-3 bg-blue-500/10 backdrop-blur-md border border-blue-500/30 text-blue-200 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/50 font-medium tracking-wide transition-all shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] mt-3">
                          Create Account
                        </button>

                        {/* OR WITH GOOGLE DIVIDER */}
                        <div className="flex items-center my-3">
                          <div className="flex-grow border-t border-white/5"></div>
                          <span className="mx-3 text-[10px] uppercase tracking-wider text-gray-500 font-medium">Or</span>
                          <div className="flex-grow border-t border-white/5"></div>
                        </div>

                        {/* GLASSY GOOGLE BUTTON */}
                        <button 
                          type="button" 
                          onClick={handleGoogleSignIn}
                          className="w-full text-xs rounded-xl py-2.5 bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 font-medium tracking-wide transition-all flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                            <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.103C18.22 1.832 15.422 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.743-.08-1.313-.178-1.777H12.24z"/>
                          </svg>
                          Sign up with Google
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-gray-500 text-[11px] px-4 mt-4 lg:mt-0">
          <span>&copy; 2026 Altis AI. All rights reserved.</span>
          <div className="flex gap-4 sm:gap-6">
            <a href="#privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#terms" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <span>&bull;</span>
            <a href="#help" className="hover:text-gray-300 transition-colors">Help Center</a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Auth





















