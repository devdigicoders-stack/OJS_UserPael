import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff,
  FiArrowLeft, FiCheck, FiAlertCircle, FiBookOpen,
  FiBarChart2, FiGlobe, FiFileText
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const departments = [
  'Computer Science', 'Electronics & Communication', 'Mechanical Engineering',
  'Civil Engineering', 'Biotechnology', 'Chemistry', 'Physics',
  'Mathematics', 'Management', 'Humanities & Social Sciences', 'Other',
];

const designations = [
  'Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer',
  'Research Scholar / PhD Student', 'Post-Doctoral Researcher',
  'Student (UG)', 'Student (PG)', 'Scientist', 'Industry Professional', 'Other',
];

const features = [
  { Icon: FiFileText, title: 'Easy Journal Submission', desc: 'Submit your research in a few simple steps.' },
  { Icon: FiBarChart2, title: 'Track Your Progress', desc: 'Monitor the status of your submissions in real-time.' },
  { Icon: FiGlobe, title: 'Global Visibility', desc: 'Increase the impact and visibility of your research.' },
];

const PasswordStrength = ({ password }) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const labels = [
    { key: 'length', text: 'At least 8 characters' },
    { key: 'uppercase', text: 'One uppercase letter' },
    { key: 'number', text: 'One number' },
    { key: 'special', text: 'One special character' },
  ];
  return (
    <div style={{ marginTop: '12px', padding: '12px 14px', borderRadius: '12px', border: '1px solid #DBEAFE', background: 'rgba(239,246,255,0.7)' }}>
      <p style={{ fontSize: '12px', fontWeight: 600, color: '#1D4ED8', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
        <FiAlertCircle size={13} /> Password must contain:
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
        {labels.map(({ key, text }) => (
          <span key={key} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: checks[key] ? '#16A34A' : '#9CA3AF' }}>
            <FiCheck size={11} style={{ color: checks[key] ? '#22C55E' : '#D1D5DB' }} />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', institution: '',
    department: '', designation: '', password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    if (!form.institution.trim()) errs.institution = 'Institution is required';
    if (!form.department) errs.department = 'Select a department';
    if (!form.designation) errs.designation = 'Select a designation';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'Min 8 characters';
    if (!form.confirmPassword) errs.confirmPassword = 'Confirm your password';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (!agreed) errs.agreed = 'You must agree to the Terms & Conditions';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error('Please fix the errors before submitting');
      return;
    }
    setLoading(true);
    await new Promise(res => setTimeout(res, 1500));
    setLoading(false);
    toast.success('Account created successfully! Please login.');
    navigate('/login');
  };

  const inputStyle = (field) => ({
    width: '100%',
    border: `1px solid ${errors[field] ? '#F87171' : '#E5E7EB'}`,
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '13.5px',
    color: '#1F2937',
    background: errors[field] ? '#FFF5F5' : '#FFFFFF',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  });

  const labelStyle = {
    display: 'block', fontSize: '13px', fontWeight: 600,
    color: '#374151', marginBottom: '6px',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Left Panel ── */}
      <div style={{
        width: '360px', flexShrink: 0,
        background: 'linear-gradient(160deg, #0f2460 0%, #1a3a8f 45%, #0f766e 100%)',
        color: '#fff', padding: '40px 36px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden',
      }} className="hidden lg:flex">
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', bottom: '40px', right: '-50px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        {/* Logo & Welcome */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
            <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '12px', padding: '10px', display: 'flex' }}>
              <FiBookOpen size={20} />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '16px', fontFamily: 'Poppins, sans-serif' }}>OJS Portal</p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>Open Journal System</p>
            </div>
          </div>

          <h1 style={{ fontSize: '30px', fontWeight: 800, fontFamily: 'Poppins, sans-serif', lineHeight: 1.25, marginBottom: '12px' }}>
            Welcome to<br />
            <span style={{ color: '#fff' }}>OJS </span>
            <span style={{ color: '#60b4ff' }}>Portal</span>
          </h1>
          <div style={{ width: '44px', height: '4px', background: '#60b4ff', borderRadius: '4px', marginBottom: '16px' }} />
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            Join our global research community and share your innovative research with the world.
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
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', marginTop: '2px', lineHeight: 1.5 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Book image placeholder */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ borderRadius: '16px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', height: '100px', display: 'flex', alignItems: 'flex-end', padding: '12px 16px' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>© {new Date().getFullYear()} OJS Portal. All rights reserved.</span>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div style={{ flex: 1, background: '#F8FAFC', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Back to Home */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 28px' }}>
          <Link to="/" >
            {/* <FiArrowLeft size={14} /> Back to Home */}
          </Link>
        </div>

        {/* Form */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 24px 40px' }}>
          <div style={{ width: '100%', maxWidth: '680px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
              <div style={{ background: '#EFF6FF', color: '#2563EB', borderRadius: '16px', padding: '14px', display: 'flex' }}>
                <FiUser size={24} />
              </div>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>Create Your Account</h2>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: '3px 0 0' }}>Fill in your details to register with OJS Portal</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Row 1: Full Name + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Full Name <span style={{ color: '#EF4444' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <FiUser style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} size={14} />
                    <input name="fullName" type="text" value={form.fullName} onChange={handleChange} placeholder="Enter your full name" style={{ ...inputStyle('fullName'), paddingLeft: '36px' }} />
                  </div>
                  {errors.fullName && <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px' }}>{errors.fullName}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Email Address <span style={{ color: '#EF4444' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <FiMail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} size={14} />
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email address" style={{ ...inputStyle('email'), paddingLeft: '36px' }} />
                  </div>
                  {errors.email && <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px' }}>{errors.email}</p>}
                </div>
              </div>

              {/* Row 2: Phone + Institution */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Phone Number <span style={{ color: '#EF4444' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <FiPhone style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} size={14} />
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" style={{ ...inputStyle('phone'), paddingLeft: '36px' }} />
                  </div>
                  {errors.phone && <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px' }}>{errors.phone}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Institution / University <span style={{ color: '#EF4444' }}>*</span></label>
                  <input name="institution" type="text" value={form.institution} onChange={handleChange} placeholder="Enter your institution" style={inputStyle('institution')} />
                  {errors.institution && <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px' }}>{errors.institution}</p>}
                </div>
              </div>

              {/* Row 3: Department + Designation */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Department <span style={{ color: '#EF4444' }}>*</span></label>
                  <select name="department" value={form.department} onChange={handleChange} style={{ ...inputStyle('department'), appearance: 'auto', cursor: 'pointer' }}>
                    <option value="">Select your department</option>
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errors.department && <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px' }}>{errors.department}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Designation <span style={{ color: '#EF4444' }}>*</span></label>
                  <select name="designation" value={form.designation} onChange={handleChange} style={{ ...inputStyle('designation'), appearance: 'auto', cursor: 'pointer' }}>
                    <option value="">Select your designation</option>
                    {designations.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errors.designation && <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px' }}>{errors.designation}</p>}
                </div>
              </div>

              {/* Row 4: Password + Confirm */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '8px' }}>
                <div>
                  <label style={labelStyle}>Password <span style={{ color: '#EF4444' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <FiLock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} size={14} />
                    <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Create a strong password" style={{ ...inputStyle('password'), paddingLeft: '36px', paddingRight: '40px' }} />
                    <button type="button" onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex' }}>
                      {showPassword ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                    </button>
                  </div>
                  {errors.password && <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px' }}>{errors.password}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Confirm Password <span style={{ color: '#EF4444' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <FiLock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} size={14} />
                    <input name="confirmPassword" type={showConfirm ? 'text' : 'password'} value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password" style={{ ...inputStyle('confirmPassword'), paddingLeft: '36px', paddingRight: '40px' }} />
                    <button type="button" onClick={() => setShowConfirm(v => !v)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex' }}>
                      {showConfirm ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px' }}>{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Password Strength */}
              {form.password && <PasswordStrength password={form.password} />}

              {/* Terms */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', margin: '18px 0 0' }}>
                <input type="checkbox" id="terms" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ marginTop: '2px', width: '16px', height: '16px', cursor: 'pointer', accentColor: '#2563EB', flexShrink: 0 }} />
                <label htmlFor="terms" style={{ fontSize: '13px', color: '#4B5563', cursor: 'pointer' }}>
                  I agree to the{' '}
                  <Link to="/terms" style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>Terms & Conditions</Link>
                  {' '}and{' '}
                  <Link to="/privacy-policy" style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</Link>
                </label>
              </div>
              {errors.agreed && <p style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px' }}>{errors.agreed}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', marginTop: '20px',
                  background: loading ? '#93C5FD' : '#2563EB',
                  color: '#fff', border: 'none', borderRadius: '12px',
                  padding: '13px', fontSize: '14px', fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 4px 14px rgba(37,99,235,0.35)',
                  transition: 'background 0.2s',
                }}
              >
                {loading ? (
                  <>
                    <svg style={{ animation: 'spin 1s linear infinite', width: '16px', height: '16px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <><FiUser size={16} /> Register</>
                )}
              </button>

              {/* Login Link */}
              <p style={{ textAlign: 'center', fontSize: '13px', color: '#6B7280', marginTop: '18px' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#2563EB', fontWeight: 700, textDecoration: 'none' }}>Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus, select:focus { border-color: #3B82F6 !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
        @media (max-width: 1024px) { .hidden.lg\\:flex { display: none !important; } }
      `}</style>
    </div>
  );
};

export default Register;
