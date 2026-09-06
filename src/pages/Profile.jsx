import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FiChevronRight, FiEdit3, FiCheck, FiCamera, FiGlobe,
  FiTwitter, FiLinkedin, FiLink, FiFileText,
  FiTrendingUp, FiEye, FiDownload, FiStar, FiInfo,
  FiLock, FiTag, FiX, FiMail, FiPhone, FiMapPin,
  FiAward, FiBookOpen, FiCalendar, FiUsers, FiBook,
  FiActivity, FiCopy, FiExternalLink, FiCheckCircle
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useJournalContext } from '../context/JournalContext';

const TABS = ['Personal Info', 'Academic Info', 'Research Interests', 'Social & Links'];

const Profile = () => {
  const { updateProfile, journals, userStats } = useJournalContext();
  const [activeTab, setActiveTab] = useState('Personal Info');
  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef(null);

  // Initialize with some default safe fields so UI doesn't break
  const [formData, setFormData] = useState({
    name: '', title: '', firstName: '', lastName: '', email: '', phone: '',
    institution: '', department: '', designation: '', 
    city: '', country: '', dob: '', gender: '', bio: '',
    orcid: '', researcherId: '', scopusId: '', googleScholar: '',
    website: '', twitter: '', linkedin: '', researchGate: '',
    specializations: [], newSpec: '', initials: 'U', profilePic: ''
  });

  React.useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) return;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/user/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      if (response.ok) {
        // Map backend name to firstName and lastName for the UI
        let fName = data.name || '';
        let lName = '';
        if (data.name && data.name.includes(' ')) {
          const parts = data.name.split(' ');
          lName = parts.pop();
          fName = parts.join(' ');
        }

        setFormData(prev => ({
          ...prev,
          name: data.name || '',
          firstName: fName,
          lastName: lName,
          email: data.email || '',
          phone: data.phone || '',
          institution: data.institution || '',
          department: data.department || '',
          designation: data.designation || '',
          initials: data.initials || 'U',
          title: data.title || '',
          dob: data.dob || '',
          gender: data.gender || '',
          city: data.city || '',
          country: data.country || '',
          bio: data.bio || '',
          orcid: data.orcid || '',
          researcherId: data.researcherId || '',
          scopusId: data.scopusId || '',
          googleScholar: data.googleScholar || '',
          specializations: data.specializations || [],
          website: data.website || '',
          twitter: data.twitter || '',
          linkedin: data.linkedin || '',
          researchGate: data.researchGate || '',
          profilePic: data.profilePic || ''
        }));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const token = localStorage.getItem('userToken');
      if (!token) return;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/user/avatar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Avatar uploaded successfully!');
        setFormData(prev => ({ ...prev, profilePic: data.profilePic }));
        updateProfile(data); // Assuming updateProfile merges data
      } else {
        toast.error(data.message || 'Failed to upload avatar');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Error uploading avatar');
    }
  };

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const addSpec = () => {
    if (formData.newSpec.trim()) {
      setFormData(p => ({ ...p, specializations: [...p.specializations, p.newSpec.trim()], newSpec: '' }));
    }
  };

  const removeSpec = (i) => setFormData(p => ({ ...p, specializations: p.specializations.filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) return;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Profile updated successfully!');
        
        // Update initials locally if name changed
        if (data.initials) {
          setFormData(prev => ({ ...prev, initials: data.initials }));
        }
        
        // Also update Context if necessary
        updateProfile(data);
        setEditMode(false);
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error connecting to the server');
    }
  };

  const copyToClipboard = (text) => { navigator.clipboard.writeText(text); toast.success('Copied!'); };

  const inp = (disabled = false) => ({
    width: '100%', border: `1.5px solid ${!editMode || disabled ? '#F3F4F6' : '#E5E7EB'}`,
    borderRadius: '9px', padding: '10px 14px', fontSize: '13.5px',
    color: !editMode || disabled ? '#9CA3AF' : '#374151',
    background: !editMode || disabled ? '#F9FAFB' : '#fff',
    outline: 'none', fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box', transition: 'border-color 0.15s',
  });

  const formatStat = (num) => {
    if (!num) return '0';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const stats = [
    { label: 'Articles', val: userStats?.total || journals.length.toString(), icon: FiFileText, color: '#2563EB', bg: '#EFF6FF' },
    { label: 'Citations', val: formatStat(userStats?.totalCitations), icon: FiTrendingUp, color: '#059669', bg: '#ECFDF5' },
    { label: 'Views', val: formatStat(userStats?.totalViews), icon: FiEye, color: '#7C3AED', bg: '#F5F3FF' },
    { label: 'Downloads', val: formatStat(userStats?.totalDownloads), icon: FiDownload, color: '#D97706', bg: '#FFFBEB' },
  ];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>
        <Link to="/dashboard" style={{ color: '#6B7280', textDecoration: 'none' }}>Dashboard</Link>
        <FiChevronRight size={14} />
        <span style={{ color: '#111827', fontWeight: 500 }}>My Profile</span>
      </div>

      {/* ── HERO COVER BANNER ── */}
      <div style={{
        borderRadius: '18px', overflow: 'hidden', marginBottom: '20px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        position: 'relative',
      }}>
        {/* Cover gradient */}
        <div style={{
          height: '160px',
          background: 'linear-gradient(135deg, #0f2460 0%, #1a3a8f 40%, #1E6BA8 70%, #0d5c52 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative circles */}
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '30%', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ position: 'absolute', top: '20px', left: '60%', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

          {/* Edit cover button */}
          <button onClick={() => toast.info('Cover photo upload')}
            style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: '8px', padding: '7px 12px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
            <FiCamera size={13} /> Edit Cover
          </button>
        </div>

        {/* Profile info row */}
        <div style={{ background: '#fff', padding: '0 28px 20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '18px' }}>
            {/* Avatar */}
            <div style={{ position: 'relative', marginTop: '-44px' }}>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleAvatarUpload}
              />
              <div style={{
                width: '88px', height: '88px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #1E3A8A, #2563EB)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 800, fontSize: '30px',
                fontFamily: 'Poppins, sans-serif',
                border: '4px solid #fff',
                boxShadow: '0 4px 20px rgba(37,99,235,0.35)',
                overflow: 'hidden'
              }}>
                {formData.profilePic ? (
                  <img src={`${(import.meta.env.VITE_API_URL || 'https://api.praxis.org.in/api').replace(/\/api\/?$/, '')}${formData.profilePic}`} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  formData.initials
                )}
              </div>
              <button onClick={() => fileInputRef.current.click()}
                style={{ position: 'absolute', bottom: '2px', right: '2px', width: '26px', height: '26px', borderRadius: '50%', background: '#2563EB', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
                <FiCamera size={12} />
              </button>
            </div>

            {/* Name & title */}
            <div style={{ paddingBottom: '2px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: 0, fontFamily: 'Poppins, sans-serif' }}>
                  {formData.title} {formData.firstName} {formData.lastName}
                </h1>
                <span style={{ background: '#ECFDF5', color: '#059669', fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FiCheckCircle size={10} /> Verified
                </span>
              </div>
              <p style={{ fontSize: '13.5px', color: '#2563EB', fontWeight: 600, margin: '0 0 3px' }}>{formData.designation}</p>
              <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiMapPin size={12} /> {formData.institution} · {formData.city}, {formData.country}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '8px', paddingBottom: '2px' }}>
            {!editMode ? (
              <button onClick={() => setEditMode(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: '9px', border: '1.5px solid #2563EB', background: '#EFF6FF', color: '#2563EB', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                <FiEdit3 size={14} /> Edit Profile
              </button>
            ) : (
              <>
                <button onClick={() => setEditMode(false)}
                  style={{ padding: '9px 16px', borderRadius: '9px', border: '1.5px solid #E5E7EB', background: '#fff', color: '#6B7280', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button onClick={handleSave}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: '9px', border: 'none', background: 'linear-gradient(135deg,#2563EB,#1D4ED8)', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 3px 12px rgba(37,99,235,0.3)' }}>
                  <FiCheck size={14} /> Save Changes
                </button>
              </>
            )}
            <Link to="/dashboard/change-password"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '9px', border: '1.5px solid #E5E7EB', background: '#fff', color: '#374151', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>
              <FiLock size={14} /> Password
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
        {stats.map(({ label, val, icon: Icon, color, bg }) => (
          <div key={label} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E9ECF0', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={20} color={color} />
            </div>
            <div>
              <p style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: 0, fontFamily: 'Poppins, sans-serif', lineHeight: 1 }}>{val}</p>
              <p style={{ fontSize: '12px', color: '#6B7280', margin: '3px 0 0' }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main 2-col Layout ── */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* Left Sidebar */}
        <div style={{ width: '240px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* Contact card */}
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #E9ECF0', boxShadow: '0 1px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', background: 'linear-gradient(135deg, #F8FAFF, #EFF6FF)', borderBottom: '1px solid #E9ECF0' }}>
              <p style={{ fontWeight: 700, fontSize: '13.5px', color: '#111827', margin: 0, fontFamily: 'Poppins, sans-serif' }}>Contact Information</p>
            </div>
            <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {[
                { icon: FiMail, val: formData.email, color: '#2563EB' },
                { icon: FiPhone, val: formData.phone, color: '#059669' },
                { icon: FiMapPin, val: `${formData.city}, ${formData.country}`, color: '#D97706' },
                { icon: FiCalendar, val: formData.dob, color: '#7C3AED' },
              ].map(({ icon: Icon, val, color }, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#F9FAFB', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={13} color={color} />
                  </div>
                  <span style={{ fontSize: '12px', color: '#374151', wordBreak: 'break-all' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Researcher IDs */}
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #E9ECF0', boxShadow: '0 1px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', background: 'linear-gradient(135deg, #F8FAFF, #F5F3FF)', borderBottom: '1px solid #E9ECF0' }}>
              <p style={{ fontWeight: 700, fontSize: '13.5px', color: '#111827', margin: 0, fontFamily: 'Poppins, sans-serif' }}>Researcher IDs</p>
            </div>
            <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'ORCID iD', val: formData.orcid, color: '#059669' },
                { label: 'Scopus Author ID', val: formData.scopusId, color: '#D97706' },
                { label: 'Google Scholar', val: formData.googleScholar, color: '#2563EB' },
                { label: 'ResearcherID', val: formData.researcherId, color: '#7C3AED' },
              ].map(({ label, val, color }) => (
                <div key={label}>
                  <p style={{ fontSize: '10px', color: '#9CA3AF', margin: '0 0 2px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px' }}>{label}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <p style={{ fontSize: '12px', color, fontWeight: 600, margin: 0, flex: 1 }}>{val}</p>
                    <button onClick={() => copyToClipboard(val)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#D1D5DB', padding: 0, display: 'flex' }}>
                      <FiCopy size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>

        {/* ─── Right: Tabbed Form ─── */}
        <div style={{ flex: 1, minWidth: '320px' }}>
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #E9ECF0', boxShadow: '0 1px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>

            {/* Tab nav */}
            <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', padding: '0 20px', overflowX: 'auto', background: '#FAFBFF' }}>
              {TABS.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  style={{ padding: '14px 16px', fontSize: '13px', fontWeight: activeTab === tab ? 700 : 500, color: activeTab === tab ? '#2563EB' : '#6B7280', borderBottom: `2.5px solid ${activeTab === tab ? '#2563EB' : 'transparent'}`, border: 'none', background: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s' }}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Edit mode banner */}
            {editMode && (
              <div style={{ padding: '10px 20px', background: '#EFF6FF', borderBottom: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiInfo size={14} color="#2563EB" />
                <span style={{ fontSize: '12.5px', color: '#1E40AF' }}>Edit mode active — make your changes, then click <strong>Save Changes</strong>.</span>
              </div>
            )}

            <div style={{ padding: '24px' }}>

              {/* ── Personal Info ── */}
              {activeTab === 'Personal Info' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Title</label>
                      <select name="title" value={formData.title} onChange={handleChange} disabled={!editMode}
                        style={{ ...inp(!editMode), cursor: editMode ? 'pointer' : 'not-allowed' }}>
                        {['Dr.', 'Prof.', 'Mr.', 'Ms.', 'Mrs.'].map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    {['firstName', 'lastName'].map((f, i) => (
                      <div key={f}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>{i === 0 ? 'First Name' : 'Last Name'} <span style={{ color: '#DC2626' }}>*</span></label>
                        <input name={f} value={formData[f]} onChange={handleChange} disabled={!editMode} type="text" style={inp(!editMode)} onFocus={e => editMode && (e.target.style.borderColor = '#2563EB')} onBlur={e => (e.target.style.borderColor = '#E5E7EB')} />
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Email <span style={{ color: '#DC2626' }}>*</span></label>
                      <div style={{ position: 'relative' }}>
                        <input name="email" value={formData.email} disabled type="email" style={{ ...inp(true), paddingRight: '36px' }} />
                        <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}><FiCheckCircle size={14} color="#059669" /></span>
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Phone</label>
                      <input name="phone" value={formData.phone} onChange={handleChange} disabled={!editMode} type="tel" style={inp(!editMode)} onFocus={e => editMode && (e.target.style.borderColor = '#2563EB')} onBlur={e => (e.target.style.borderColor = '#E5E7EB')} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Date of Birth</label>
                      <input name="dob" value={formData.dob} onChange={handleChange} disabled={!editMode} type="date" style={inp(!editMode)} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Gender</label>
                      <select name="gender" value={formData.gender} onChange={handleChange} disabled={!editMode} style={{ ...inp(!editMode), cursor: editMode ? 'pointer' : 'not-allowed' }}>
                        {['Male', 'Female', 'Other', 'Prefer not to say'].map(g => <option key={g}>{g}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    {['city', 'country'].map((f) => (
                      <div key={f}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>{f.charAt(0).toUpperCase() + f.slice(1)}</label>
                        <input name={f} value={formData[f]} onChange={handleChange} disabled={!editMode} style={inp(!editMode)} onFocus={e => editMode && (e.target.style.borderColor = '#2563EB')} onBlur={e => (e.target.style.borderColor = '#E5E7EB')} />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Bio / Research Summary</label>
                    <textarea name="bio" value={formData.bio} onChange={handleChange} disabled={!editMode} rows={4} style={{ ...inp(!editMode), resize: 'vertical' }} onFocus={e => editMode && (e.target.style.borderColor = '#2563EB')} onBlur={e => (e.target.style.borderColor = '#E5E7EB')} />
                  </div>
                </div>
              )}

              {/* ── Academic Info ── */}
              {activeTab === 'Academic Info' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    {[
                      { f: 'designation', label: 'Designation / Title' },
                      { f: 'department', label: 'Department' },
                    ].map(({ f, label }) => (
                      <div key={f}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>{label}</label>
                        <input name={f} value={formData[f]} onChange={handleChange} disabled={!editMode} style={inp(!editMode)} onFocus={e => editMode && (e.target.style.borderColor = '#2563EB')} onBlur={e => (e.target.style.borderColor = '#E5E7EB')} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Institution / University <span style={{ color: '#DC2626' }}>*</span></label>
                    <input name="institution" value={formData.institution} onChange={handleChange} disabled={!editMode} style={inp(!editMode)} onFocus={e => editMode && (e.target.style.borderColor = '#2563EB')} onBlur={e => (e.target.style.borderColor = '#E5E7EB')} />
                  </div>

                  <div style={{ borderTop: '1px dashed #E5E7EB', paddingTop: '18px' }}>
                    <p style={{ fontSize: '11.5px', color: '#9CA3AF', fontWeight: 700, margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Researcher Profile IDs</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      {[
                        { f: 'orcid', label: 'ORCID iD' },
                        { f: 'researcherId', label: 'ResearcherID' },
                        { f: 'scopusId', label: 'Scopus Author ID' },
                        { f: 'googleScholar', label: 'Google Scholar ID' },
                      ].map(({ f, label }) => (
                        <div key={f}>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>{label}</label>
                          <input name={f} value={formData[f]} onChange={handleChange} disabled={!editMode} style={inp(!editMode)} onFocus={e => editMode && (e.target.style.borderColor = '#2563EB')} onBlur={e => (e.target.style.borderColor = '#E5E7EB')} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Research Interests ── */}
              {activeTab === 'Research Interests' && (
                <div>
                  <p style={{ fontSize: '13.5px', color: '#6B7280', margin: '0 0 18px', lineHeight: 1.6 }}>
                    Your research areas help editors assign your submissions to the most relevant reviewers and improve discoverability.
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px', marginBottom: '22px', minHeight: '50px' }}>
                    {formData.specializations.map((s, i) => (
                      <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)', color: '#1D4ED8', fontSize: '13px', fontWeight: 600, padding: '7px 14px', borderRadius: '24px', border: '1.5px solid #BFDBFE', transition: 'all 0.15s' }}>
                        <FiTag size={12} /> {s}
                        {editMode && (
                          <button onClick={() => removeSpec(i)} style={{ border: 'none', background: 'rgba(220,38,38,0.12)', borderRadius: '50%', cursor: 'pointer', color: '#DC2626', padding: '2px', display: 'flex', lineHeight: 1 }}>
                            <FiX size={11} />
                          </button>
                        )}
                      </span>
                    ))}
                    {formData.specializations.length === 0 && (
                      <p style={{ color: '#9CA3AF', fontSize: '13px', fontStyle: 'italic' }}>No specializations added yet.</p>
                    )}
                  </div>

                  {editMode && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        value={formData.newSpec}
                        name="newSpec"
                        onChange={handleChange}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSpec())}
                        placeholder="Type a research area and press Enter..."
                        style={{ ...inp(false), flex: 1 }}
                        onFocus={e => (e.target.style.borderColor = '#2563EB')}
                        onBlur={e => (e.target.style.borderColor = '#E5E7EB')}
                      />
                      <button onClick={addSpec}
                        style={{ padding: '10px 18px', borderRadius: '9px', border: 'none', background: 'linear-gradient(135deg,#2563EB,#1D4ED8)', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>
                        + Add
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ── Social & Links ── */}
              {activeTab === 'Social & Links' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { icon: FiGlobe, name: 'website', label: 'Personal / Lab Website', placeholder: 'https://yourwebsite.com', color: '#374151' },
                    { icon: FiTwitter, name: 'twitter', label: 'Twitter / X Handle', placeholder: '@username', color: '#1DA1F2' },
                    { icon: FiLinkedin, name: 'linkedin', label: 'LinkedIn Profile URL', placeholder: 'linkedin.com/in/username', color: '#0A66C2' },
                    { icon: FiLink, name: 'researchGate', label: 'ResearchGate Profile', placeholder: 'Your ResearchGate username', color: '#00CCBB' },
                  ].map(({ icon: Icon, name, label, placeholder, color }) => (
                    <div key={name}>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        <Icon size={14} color={color} /> {label}
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input type="text" name={name} value={formData[name]} onChange={handleChange} disabled={!editMode} placeholder={placeholder}
                          style={{ ...inp(!editMode), paddingLeft: '38px' }}
                          onFocus={e => editMode && (e.target.style.borderColor = color)}
                          onBlur={e => (e.target.style.borderColor = '#E5E7EB')}
                        />
                        <Icon size={14} color={color} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.7 }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Save bar */}
              {editMode && (
                <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button onClick={() => setEditMode(false)}
                    style={{ padding: '10px 20px', borderRadius: '9px', border: '1.5px solid #E5E7EB', background: '#fff', color: '#6B7280', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    Cancel
                  </button>
                  <button onClick={handleSave}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 22px', borderRadius: '9px', border: 'none', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>
                    <FiCheck size={14} /> Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
