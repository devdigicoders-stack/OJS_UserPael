import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiMail, FiLock, FiEye, FiEyeOff,
  FiArrowLeft, FiLogIn, FiBookOpen,
  FiBarChart2, FiGlobe, FiFileText, FiShield
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useJournalContext } from '../context/JournalContext';
import logo from '../assets/logo.png';

const features = [
  { Icon: FiFileText, title: 'Easy Journal Submission', desc: 'Submit your research in a few simple steps.' },
  { Icon: FiBarChart2, title: 'Track Your Progress', desc: 'Monitor the status of your submissions in real-time.' },
  { Icon: FiGlobe, title: 'Global Visibility', desc: 'Increase the impact and visibility of your research.' },
];

const Login = () => {
  const navigate = useNavigate();
  const { refreshData } = useJournalContext();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', role: 'Author', remember: false });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token && token !== 'undefined' && token !== 'null') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Minimum 6 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error('Please enter valid credentials');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          role: form.role
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and user details
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userProfile', JSON.stringify(data.user));

        // Refresh context data now that token is available and wait for it
        await refreshData();

        toast.success('Welcome back! Login successful.');
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      toast.error('Error connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    border: `1px solid ${errors[field] ? '#F87171' : '#E5E7EB'}`,
    borderRadius: '12px',
    padding: '13px 14px',
    fontSize: '14px',
    color: '#1F2937',
    background: errors[field] ? '#FFF5F5' : '#FFFFFF',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  });

  const labelStyle = {
    display: 'block', fontSize: '13.5px', fontWeight: 600,
    color: '#374151', marginBottom: '7px',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Left Panel ── */}
      <div style={{
        width: '420px', flexShrink: 0,
        background: 'linear-gradient(160deg, #0f2460 0%, #1a3a8f 45%, #0f766e 100%)',
        color: '#fff', padding: '44px 40px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden',
      }} className="hidden lg:flex">
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-70px', left: '-70px', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', bottom: '30px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', top: '45%', left: '30%', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />

        {/* Logo & Welcome */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Brand/Logo Area */}
          <div style={{ marginBottom: '25px', textAlign: 'center' }}>
            <div className="bg-white p-2 rounded-lg inline-block shadow-sm">
              <img src={logo} alt="Praxis Logo" className="h-12 object-contain" />
            </div>
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'Poppins, sans-serif', lineHeight: 1.25, marginBottom: '12px' }}>
            Welcome Back to<br />
            <span style={{ color: '#fff' }}>Praxis </span>
            <span style={{ color: '#60b4ff' }}>Portal</span>
          </h1>
          <div style={{ width: '44px', height: '4px', background: '#60b4ff', borderRadius: '4px', marginBottom: '16px' }} />
          <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75 }}>
            Sign in to access your research dashboard, track submissions, and connect with the global academic community.
          </p>
        </div>

        {/* Features */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {features.map(({ Icon, title, desc }) => (
            <div key={title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '22px' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '10px', flexShrink: 0, display: 'flex' }}>
                <Icon size={17} />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '13px', fontFamily: 'Poppins, sans-serif' }}>{title}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', marginTop: '3px', lineHeight: 1.55 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Security note */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
          <FiShield size={13} />
          Your data is secured with industry-standard encryption
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div style={{ flex: 1, background: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
        {/* Back to Home */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '22px 28px' }}>
          <Link to="/" >

          </Link>
        </div>

        {/* Form Container */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px 40px' }}>
          <div style={{ width: '100%', maxWidth: '440px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
              <div style={{ background: '#EFF6FF', color: '#2563EB', borderRadius: '16px', padding: '14px', display: 'flex' }}>
                <FiLogIn size={26} />
              </div>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>Sign In</h2>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: '3px 0 0' }}>Welcome back to Praxis</p>
              </div>
            </div>

            {/* Card */}
            <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #F3F4F6', boxShadow: '0 8px 40px rgba(0,0,0,0.07)', padding: '32px' }}>
              <form onSubmit={handleSubmit} noValidate>
                {/* Email */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={labelStyle}>Email Address <span style={{ color: '#EF4444' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <FiMail style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} size={16} />
                    <input
                      name="email" type="email" id="login-email"
                      value={form.email} onChange={handleChange}
                      placeholder="Enter your email address"
                      style={{ ...inputStyle('email'), paddingLeft: '40px' }}
                    />
                  </div>
                  {errors.email && <p style={{ color: '#EF4444', fontSize: '11.5px', marginTop: '5px' }}>{errors.email}</p>}
                </div>

                {/* Password */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '7px' }}>
                    <label style={{ ...labelStyle, marginBottom: 0 }}>Password <span style={{ color: '#EF4444' }}>*</span></label>
                    {/* <a href="#" style={{ fontSize: '12.5px', color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>
                      Forgot Password?
                    </a> */}
                  </div>
                  <div style={{ position: 'relative' }}>
                    <FiLock style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} size={16} />
                    <input
                      name="password" id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password} onChange={handleChange}
                      placeholder="Enter your password"
                      style={{ ...inputStyle('password'), paddingLeft: '40px', paddingRight: '44px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex' }}
                    >
                      {showPassword ? <FiEye size={17} /> : <FiEyeOff size={17} />}
                    </button>
                  </div>
                  {errors.password && <p style={{ color: '#EF4444', fontSize: '11.5px', marginTop: '5px' }}>{errors.password}</p>}
                </div>

                {/* Role Selection */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Role <span style={{ color: '#EF4444' }}>*</span></label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    style={{ ...inputStyle('role'), appearance: 'auto', cursor: 'pointer' }}
                  >
                    <option value="Author">Author</option>
                    <option value="Reviewer">Reviewer</option>
                    <option value="Editor">Editor</option>
                  </select>
                </div>

                {/* Remember Me */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
                  <input
                    type="checkbox" id="remember" name="remember"
                    checked={form.remember} onChange={handleChange}
                    style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#2563EB' }}
                  />
                  <label htmlFor="remember" style={{ fontSize: '13px', color: '#4B5563', cursor: 'pointer' }}>Remember me</label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: loading ? '#93C5FD' : '#2563EB',
                    color: '#fff', border: 'none', borderRadius: '12px',
                    padding: '13px', fontSize: '14px', fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    boxShadow: '0 4px 14px rgba(37,99,235,0.35)',
                    transition: 'background 0.2s', marginBottom: '18px',
                  }}
                >
                  {loading ? (
                    <>
                      <svg style={{ animation: 'spin 1s linear infinite', width: '16px', height: '16px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    <><FiLogIn size={16} /> Sign In</>
                  )}
                </button>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ flex: 1, height: '1px', background: '#F3F4F6' }} />
                  <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>New to Praxis?</span>
                  <div style={{ flex: 1, height: '1px', background: '#F3F4F6' }} />
                </div>

                {/* Register Link */}
                <Link
                  to="/register"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    border: '2px solid #2563EB', color: '#2563EB',
                    borderRadius: '12px', padding: '11px',
                    fontWeight: 700, fontSize: '14px', textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2563EB'; }}
                >
                  Create an Account
                </Link>
              </form>
            </div>

            {/* Footer */}
            <p style={{ textAlign: 'center', fontSize: '12px', color: '#9CA3AF', marginTop: '20px' }}>
              By signing in, you agree to our{' '}
              <Link to="/terms" style={{ color: '#60A5FA', textDecoration: 'none' }}>Terms</Link>
              {' '}and{' '}
              <Link to="/privacy" style={{ color: '#60A5FA', textDecoration: 'none' }}>Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus, select:focus { border-color: #3B82F6 !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.15) !important; }
        @media (max-width: 1024px) { .hidden.lg\\:flex { display: none !important; } }
      `}</style>
    </div>
  );
};

export default Login;
