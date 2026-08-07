import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiChevronRight, FiLock, FiEye, FiEyeOff, FiCheck,
  FiX, FiShield, FiAlertCircle, FiInfo, FiKey,
  FiArrowLeft, FiClock, FiSmartphone
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const requirements = [
  { label: 'At least 8 characters long', test: (p) => p.length >= 8 },
  { label: 'Contains uppercase letter (A–Z)', test: (p) => /[A-Z]/.test(p) },
  { label: 'Contains lowercase letter (a–z)', test: (p) => /[a-z]/.test(p) },
  { label: 'Contains a number (0–9)', test: (p) => /[0-9]/.test(p) },
  { label: 'Contains special character (!@#$)', test: (p) => /[^A-Za-z0-9]/.test(p) },
];

const getStrength = (password) => {
  const passed = requirements.filter(r => r.test(password)).length;
  if (passed === 0) return { label: 'None', color: '#E5E7EB', width: '0%' };
  if (passed <= 2) return { label: 'Weak', color: '#EF4444', width: '30%' };
  if (passed === 3) return { label: 'Fair', color: '#F59E0B', width: '60%' };
  if (passed === 4) return { label: 'Good', color: '#3B82F6', width: '80%' };
  return { label: 'Strong', color: '#10B981', width: '100%' };
};

const PasswordInput = ({ name, label, isVisible, placeholder, value, onChange, onToggle }) => (
  <div style={{ marginBottom: '20px' }}>
    <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
      {label} <span style={{ color: '#DC2626' }}>*</span>
    </label>
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', display: 'flex' }}>
        <FiLock size={16} />
      </div>
      <input
        type={isVisible ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%', border: '1.5px solid #E5E7EB', borderRadius: '12px',
          padding: '12px 42px 12px 40px', fontSize: '14px', color: '#111827',
          outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
          transition: 'all 0.2s ease', background: '#F9FAFB'
        }}
        onFocus={e => {
          e.target.style.borderColor = '#2563EB';
          e.target.style.background = '#fff';
          e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.1)';
        }}
        onBlur={e => {
          e.target.style.borderColor = '#E5E7EB';
          e.target.style.background = '#F9FAFB';
          e.target.style.boxShadow = 'none';
        }}
      />
      <button
        type="button"
        onClick={onToggle}
        style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex', padding: '4px', borderRadius: '6px' }}
        onMouseEnter={e => e.currentTarget.style.color = '#374151'}
        onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
      >
        {isVisible ? <FiEyeOff size={16} /> : <FiEye size={16} />}
      </button>
    </div>
  </div>
);

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [show, setShow] = useState({
    current: false, new: false, confirm: false,
  });

  const strength = getStrength(formData.newPassword);
  const allPassed = requirements.every(r => r.test(formData.newPassword));
  const passwordsMatch = formData.newPassword === formData.confirmPassword && formData.confirmPassword !== '';
  const canSubmit = formData.currentPassword && allPassed && passwordsMatch;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.currentPassword) {
      toast.error('Please enter your current password.');
      return;
    }
    if (!allPassed) {
      toast.error('Password does not meet all requirements.');
      return;
    }
    if (!passwordsMatch) {
      toast.error('New passwords do not match!');
      return;
    }

    try {
      const token = localStorage.getItem('userToken');
      const res = await fetch('http://localhost:5000/api/auth/user/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to change password');
      }

      toast.success('Password changed successfully!');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.message);
    }
  };



  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}>
        <Link to="/dashboard" style={{ color: '#6B7280', textDecoration: 'none' }}>Dashboard</Link>
        <FiChevronRight size={14} />
        <Link to="/dashboard/profile" style={{ color: '#6B7280', textDecoration: 'none' }}>My Profile</Link>
        <FiChevronRight size={14} />
        <span style={{ color: '#111827', fontWeight: 500 }}>Change Password</span>
      </div>

      {/* ── HERO BANNER ── */}
      <div style={{
        borderRadius: '18px', overflow: 'hidden', marginBottom: '24px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        position: 'relative',
        padding: '36px 40px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px'
      }}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />
        <div style={{ position: 'absolute', bottom: '-20px', right: '10%', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        
        <div style={{ width: '70px', height: '70px', borderRadius: '16px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(37,99,235,0.4)', flexShrink: 0, position: 'relative', zIndex: 1 }}>
          <FiShield size={32} color="#fff" />
        </div>
        <div style={{ zIndex: 1 }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', margin: '0 0 6px', fontFamily: 'Poppins, sans-serif' }}>Account Security</h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0, maxWidth: '500px' }}>Update your password to keep your academic profile and submissions secure.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* ── MAIN FORM CARD ── */}
        <div style={{ flex: 1, minWidth: '320px', background: '#fff', borderRadius: '18px', border: '1px solid #E9ECF0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
          
          <div style={{ padding: '24px 30px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', margin: 0, fontFamily: 'Poppins, sans-serif' }}>Change Password</h2>
            <Link to="/dashboard/profile" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6B7280', textDecoration: 'none', fontWeight: 500 }}>
              <FiArrowLeft size={14} /> Back to Profile
            </Link>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: '30px' }}>
            
            <PasswordInput 
              name="currentPassword" 
              label="Current Password" 
              isVisible={show.current} 
              placeholder="Enter your current password" 
              value={formData.currentPassword}
              onChange={handleChange}
              onToggle={() => setShow(prev => ({ ...prev, current: !prev.current }))}
            />
            
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #E5E7EB, transparent)', margin: '24px 0' }} />

            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <PasswordInput 
                  name="newPassword" 
                  label="New Password" 
                  isVisible={show.new} 
                  placeholder="Create a strong new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  onToggle={() => setShow(prev => ({ ...prev, new: !prev.new }))} 
                />
                <PasswordInput 
                  name="confirmPassword" 
                  label="Confirm New Password" 
                  isVisible={show.confirm} 
                  placeholder="Re-enter your new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onToggle={() => setShow(prev => ({ ...prev, confirm: !prev.confirm }))} 
                />
              </div>
              
              {/* Requirements & Strength Panel */}
              <div style={{ width: '300px', flexShrink: 0, background: '#F8FAFC', borderRadius: '14px', padding: '20px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Password Strength</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: strength.color }}>{strength.label}</span>
                </div>
                
                <div style={{ height: '6px', background: '#E2E8F0', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
                  <div style={{ height: '100%', width: strength.width, background: strength.color, borderRadius: '10px', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                </div>

                <p style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Requirements</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {requirements.map(({ label: req, test }) => {
                    const ok = test(formData.newPassword);
                    return (
                      <div key={req} style={{ display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: ok ? '#10B981' : '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                          <FiCheck size={11} color={ok ? '#fff' : '#94A3B8'} />
                        </div>
                        <span style={{ fontSize: '12.5px', color: ok ? '#10B981' : '#64748B', fontWeight: ok ? 500 : 400 }}>{req}</span>
                      </div>
                    );
                  })}
                </div>
                
                {formData.confirmPassword && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px dashed #CBD5E1', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {passwordsMatch ? (
                      <><FiCheck size={16} color="#10B981" /><span style={{ fontSize: '13px', color: '#10B981', fontWeight: 600 }}>Passwords match</span></>
                    ) : (
                      <><FiX size={16} color="#EF4444" /><span style={{ fontSize: '13px', color: '#EF4444', fontWeight: 600 }}>Passwords do not match</span></>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: '30px', display: 'flex', gap: '12px' }}>
              <button type="submit" disabled={!canSubmit}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '14px', borderRadius: '12px', border: 'none', cursor: canSubmit ? 'pointer' : 'not-allowed',
                  background: canSubmit ? 'linear-gradient(135deg, #2563EB, #1D4ED8)' : '#E5E7EB',
                  color: canSubmit ? '#fff' : '#9CA3AF', fontSize: '14.5px', fontWeight: 700,
                  boxShadow: canSubmit ? '0 4px 14px rgba(37,99,235,0.35)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                <FiCheck size={18} /> Update Password
              </button>
            </div>
          </form>
        </div>

        {/* ── SIDEBAR CARDS ── */}
        <div style={{ width: '320px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Recent Activity */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E9ECF0', padding: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiClock size={16} color="#2563EB" />
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: 0, fontFamily: 'Poppins, sans-serif' }}>Security History</h3>
            </div>
            
            <div style={{ position: 'relative', paddingLeft: '16px', borderLeft: '2px solid #E5E7EB', marginLeft: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-21px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', border: '2px solid #fff' }} />
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#111827', margin: '0 0 2px' }}>Current login</p>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>New Delhi, India • Chrome on Mac</p>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-21px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', background: '#9CA3AF', border: '2px solid #fff' }} />
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#111827', margin: '0 0 2px' }}>Password changed</p>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>15 Jan 2024 (202 days ago)</p>
              </div>
            </div>
          </div>

          {/* Security Recommendations */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E9ECF0', padding: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: '0 0 16px', fontFamily: 'Poppins, sans-serif' }}>Recommendations</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FiSmartphone size={18} color="#7C3AED" />
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#111827', margin: '0 0 4px' }}>Two-Factor Auth</p>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 8px', lineHeight: 1.4 }}>Add an extra layer of security to your account.</p>
                  <button style={{ background: '#fff', border: '1px solid #E5E7EB', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#374151', cursor: 'pointer' }}>Enable 2FA</button>
                </div>
              </div>
              
              <div style={{ height: '1px', background: '#F3F4F6' }} />
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FiAlertCircle size={18} color="#D97706" />
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#111827', margin: '0 0 4px' }}>Password Age</p>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: 0, lineHeight: 1.4 }}>It's recommended to change passwords every 90 days. Yours is 202 days old.</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
