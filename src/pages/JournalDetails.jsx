import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiChevronRight, FiArrowLeft, FiActivity, FiCopy, FiCalendar, FiBookOpen,
  FiFileText, FiLayers, FiClock, FiCheck, FiDownload, FiExternalLink,
  FiEye, FiShare2, FiPrinter, FiCheckCircle, FiInfo, FiUser, FiUsers, FiEdit3, FiSend,
  FiPlus, FiMoreVertical, FiMessageSquare, FiPaperclip, FiSmile, FiMail, FiHelpCircle,
  FiLink, FiArrowRight, FiBook, FiUploadCloud, FiEdit, FiAward, FiStar, FiUpload, FiMessageCircle,
  FiGlobe, FiLock, FiTwitter, FiLinkedin, FiFacebook
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useJournalContext } from '../context/JournalContext';

const JournalDetails = () => {
  const navigate = useNavigate();
  const { journals } = useJournalContext();
  const currentJournal = journals[0] || {
    id: 'OJS-2024-0512', title: 'A Novel Approach to AI in Healthcare',
    dept: 'Computer Science', primaryAuthor: 'Dr. Rahul Sharma',
    status: 'Published', date: '12 May 2024'
  };

  const [activeTab, setActiveTab] = useState('Summary');
  const [activeMessage, setActiveMessage] = useState(1);
  const [activeSubTab, setActiveSubTab] = useState('Publication Details');
  const [activeCommMsg, setActiveCommMsg] = useState(1);
  const [commReplyText, setCommReplyText] = useState('');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied: ${text}`);
  };

  const cardStyle = {
    background: '#fff', borderRadius: '14px',
    border: '1px solid #E9ECF0', boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
  };

  const badgeStyle = {
    background: '#E6F4EA', color: '#137333',
    padding: '4px 10px', borderRadius: '20px',
    fontSize: '11.5px', fontWeight: 600, display: 'inline-flex',
    alignItems: 'center', gap: '4px', width: 'fit-content'
  };

  const tabItemStyle = (name) => ({
    padding: '10px 16px', fontSize: '13.5px', fontWeight: activeTab === name ? 700 : 500,
    color: activeTab === name ? '#2563EB' : '#6B7280', borderBottom: `2.5px solid ${activeTab === name ? '#2563EB' : 'transparent'}`,
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
    transition: 'all 0.2s', textDecoration: 'none'
  });

  const subTabItemStyle = (name) => ({
    padding: '8px 14px', fontSize: '12.5px', fontWeight: activeSubTab === name ? 700 : 500,
    color: activeSubTab === name ? '#2563EB' : '#6B7280', borderBottom: `2px solid ${activeSubTab === name ? '#2563EB' : 'transparent'}`,
    cursor: 'pointer', transition: 'all 0.2s'
  });

  const detailLabelStyle = { fontSize: '12.5px', color: '#6B7280', fontWeight: 500, width: '120px', flexShrink: 0 };
  const detailValStyle = { fontSize: '13px', color: '#111827', fontWeight: 600, margin: 0 };

  const actionBtnStyle = {
    width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
    background: '#fff', border: '1px solid #E5E7EB', color: '#4B5563',
    padding: '10px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
    cursor: 'pointer', transition: 'all 0.2s'
  };

  const timelineIconStyle = (color, bg) => ({
    background: bg, color: color, width: '36px', height: '36px',
    borderRadius: '50%', display: 'flex', alignItems: 'center',
    justifyContent: 'center', flexShrink: 0, border: '4px solid #fff',
    boxShadow: '0 0 0 1px #E5E7EB'
  });

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* ── Breadcrumb & Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#9CA3AF' }}>
            <Link to="/dashboard" style={{ color: '#6B7280', textDecoration: 'none', fontWeight: 500 }}>Dashboard</Link>
            <FiChevronRight size={13} />
            <Link to="/dashboard/journal-status" style={{ color: '#6B7280', textDecoration: 'none', fontWeight: 500 }}>My Journals</Link>
            <FiChevronRight size={13} />
            <span style={{ color: activeTab === 'Summary' ? '#2563EB' : '#6B7280', fontWeight: activeTab === 'Summary' ? 600 : 500, cursor: 'pointer' }} onClick={() => setActiveTab('Summary')}>Journal Details</span>
            {activeTab !== 'Summary' && (
              <>
                <FiChevronRight size={13} />
                <span style={{ color: '#2563EB', fontWeight: 600 }}>{activeTab}</span>
              </>
            )}
            {activeTab === 'Publication' && activeSubTab !== 'Publication Details' && (
              <>
                <FiChevronRight size={13} />
                <span style={{ color: '#2563EB', fontWeight: 600 }}>{activeSubTab}</span>
              </>
            )}
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '6px 0 2px' }}>
            {activeTab === 'Summary' ? 'Journal Details' : activeTab === 'Decision' ? 'Decision Letter' : (activeTab === 'Publication' && activeSubTab !== 'Publication Details') ? activeSubTab : activeTab}
          </h2>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
            {activeTab === 'Summary' 
              ? 'View complete details and status of your submitted journal.' 
              : activeTab === 'Review History' 
              ? 'Track the review process and editor decisions for your journal.'
              : activeTab === 'Communication'
              ? 'View all communications and messages related to your submission.'
              : activeTab === 'Decision'
              ? 'View and download the editorial decision letter for your submission.'
              : activeTab === 'Publication'
              ? 'View publication details and access your published article.'
              : 'View status panel details.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => navigate('/dashboard/journal-status')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: '#fff', border: '1.5px solid #E5E7EB',
              color: '#4B5563', borderRadius: '10px', padding: '9px 16px',
              fontWeight: 600, fontSize: '13px', cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}
          >
            <FiArrowLeft size={14} /> Back to My Journals
          </button>
          {activeTab === 'Publication' && activeSubTab === 'Publication Details' ? (
            <button
              onClick={() => toast.info('Navigating to published article...')}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: '#2563EB', border: 'none',
                color: '#fff', borderRadius: '10px', padding: '9px 16px',
                fontWeight: 600, fontSize: '13px', cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(37,99,235,0.2)',
              }}
            >
              View Published Article <FiExternalLink size={14} />
            </button>
          ) : (
            <button
              onClick={() => navigate('/dashboard/track-status')}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: '#2563EB', border: 'none',
                color: '#fff', borderRadius: '10px', padding: '9px 16px',
                fontWeight: 600, fontSize: '13px', cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(37,99,235,0.2)',
              }}
            >
              <FiActivity size={14} /> Track Status
            </button>
          )}
        </div>
      </div>

      {/* ── Top Layout (Info Card + Timeline/Meta) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: activeTab === 'Publication' ? '1fr' : '1.5fr 1fr', gap: '16px' }}>
        
        {/* Info Card */}
        <div style={{ ...cardStyle, padding: '24px', display: 'flex', gap: '20px', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <img
              src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=160&auto=format&fit=crop&q=80"
              alt="journal-pic"
              style={{ width: activeTab === 'Publication' ? '90px' : '120px', height: activeTab === 'Publication' ? '110px' : '140px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #E5E7EB', flexShrink: 0 }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <span style={badgeStyle}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#137333' }} /> {currentJournal.status}</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '4px 0 2px', lineHeight: 1.4 }}>
                {currentJournal.title}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#4B5563' }}>
                <FiBookOpen size={14} color="#6B7280" /> Department of {currentJournal.dept}
              </div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>
                <span style={{ fontWeight: 600, color: '#374151' }}>Authors:</span> {currentJournal.primaryAuthor}
              </div>
              {activeTab === 'Publication' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                  <span><span style={{ fontWeight: 600, color: '#374151' }}>Journal:</span> International Journal of Computer Science (IJCS)</span>
                  <span><span style={{ fontWeight: 600, color: '#374151' }}>DOI:</span> 10.1234/ijcs.2024.0512 <FiCopy size={12} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => copyToClipboard('10.1234/ijcs.2024.0512')} /></span>
                </div>
              )}
              {activeTab !== 'Publication' && (
                <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid #F3F4F6', paddingTop: '10px', marginTop: '4px' }}>
                  <div>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 2px' }}>Submission ID</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', fontWeight: 700, color: '#4B5563' }}>
                      {currentJournal.id}
                      <FiCopy size={13} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => copyToClipboard(currentJournal.id)} />
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 2px' }}>Submitted On</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', fontWeight: 600, color: '#4B5563' }}>
                      {currentJournal.date}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {activeTab === 'Publication' && (
            <div style={{ display: 'flex', gap: '24px', background: '#F8FAFC', padding: '16px 24px', borderRadius: '12px', border: '1px solid #F1F5F9', flexShrink: 0 }}>
              {activeSubTab === 'Communication' ? (
                <>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>
                      <FiCalendar size={13} /> Current Status
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} /> Published
                    </p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>20 May 2024, 11:20 AM</p>
                  </div>
                  <div style={{ width: '1px', background: '#E5E7EB' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>
                      <FiCalendar size={13} /> Decision Date
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>19 May 2024</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>05:20 PM</p>
                  </div>
                  <div style={{ width: '1px', background: '#E5E7EB' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>
                      <FiUser size={13} /> Editor
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>Editorial Team</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>editor@ijcs.org</p>
                  </div>
                  <div style={{ width: '1px', background: '#E5E7EB' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>
                      <FiLink size={13} /> Article DOI
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#2563EB', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      10.1234/ijcs.2024.0512
                      <FiCopy size={12} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => copyToClipboard('10.1234/ijcs.2024.0512')} />
                    </p>
                  </div>
                </>
              ) : activeSubTab === 'Publication Details' ? (
                <>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>
                      <FiCalendar size={13} /> Published On
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>20 May 2024</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>11:20 AM</p>
                  </div>
                  <div style={{ width: '1px', background: '#E5E7EB' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>
                      <FiBook size={13} /> Volume / Issue
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>Volume 15, Issue 2</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>May 2024</p>
                  </div>
                  <div style={{ width: '1px', background: '#E5E7EB' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>
                      <FiFileText size={13} /> Pages
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>123 - 138</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>(16 Pages)</p>
                  </div>
                  <div style={{ width: '1px', background: '#E5E7EB' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>
                      <FiActivity size={13} /> Article Status
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#10B981', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} /> Published
                    </p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>Online & Active</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>
                      <FiCalendar size={13} /> Published On
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>20 May 2024</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>11:20 AM</p>
                  </div>
                  <div style={{ width: '1px', background: '#E5E7EB' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>
                      <FiBook size={13} /> Volume / Issue
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>Volume 15, Issue 2</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>May 2024</p>
                  </div>
                  <div style={{ width: '1px', background: '#E5E7EB' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>
                      <FiFileText size={13} /> Pages
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>123 - 138</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>(16 Pages)</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Timeline (Only shown in summary/timeline layouts, hidden in publication view layout) */}
        {activeTab !== 'Publication' && (
          <div style={{ ...cardStyle, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>Submission Timeline</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '9px', top: '10px', bottom: '10px', width: '2px', background: '#2563EB' }} />
              
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                <div style={{ background: '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                  <FiCheck size={11} color="#fff" />
                </div>
                <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#374151', flex: 1 }}>Submitted</span>
                <span style={{ fontSize: '11px', color: '#9CA3AF' }}>12 May 2024, 10:30 AM</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                <div style={{ background: '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                  <FiCheck size={11} color="#fff" />
                </div>
                <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#374151', flex: 1 }}>Under Review</span>
                <span style={{ fontSize: '11px', color: '#9CA3AF' }}>14 May 2024, 02:15 PM</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                <div style={{ background: '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                  <FiCheck size={11} color="#fff" />
                </div>
                <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#374151', flex: 1 }}>Review Completed</span>
                <span style={{ fontSize: '11px', color: '#9CA3AF' }}>18 May 2024, 03:45 PM</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                <div style={{ background: '#2563EB', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
                </div>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#2563EB', flex: 1 }}>Published</span>
                <span style={{ fontSize: '11px', color: '#9CA3AF' }}>20 May 2024, 11:20 AM</span>
              </div>
            </div>
            
            <div style={{ borderRadius: '8px', border: '1px solid #BBF7D0', background: '#F0FDF4', padding: '8px 12px', marginTop: '6px' }}>
              <p style={{ fontSize: '11.5px', color: '#166534', margin: 0, lineHeight: 1.5 }}>
                Your journal has been published successfully. <br/>You can view or download your published article.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* ── Widget Row ── */}
      {activeTab !== 'Publication' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          <div style={{ ...cardStyle, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#EFF6FF', borderRadius: '8px', padding: '8px', display: 'flex' }}>
              <FiLayers size={16} color="#2563EB" />
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 2px' }}>Research Area</p>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#374151', margin: 0 }}>CS / AI</p>
            </div>
          </div>
          <div style={{ ...cardStyle, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#DCFCE7', borderRadius: '8px', padding: '8px', display: 'flex' }}>
              <FiFileText size={16} color="#16A34A" />
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 2px' }}>Files Submitted</p>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#374151', margin: 0 }}>4 Files</p>
            </div>
          </div>
          <div style={{ ...cardStyle, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#FEF3C7', borderRadius: '8px', padding: '8px', display: 'flex' }}>
              <FiBookOpen size={16} color="#D97706" />
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 2px' }}>Total Pages</p>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#374151', margin: 0 }}>12 Pages</p>
            </div>
          </div>
          <div style={{ ...cardStyle, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#F3E8FF', borderRadius: '8px', padding: '8px', display: 'flex' }}>
              <FiClock size={16} color="#9333EA" />
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 2px' }}>Last Updated</p>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#374151', margin: 0 }}>20 May 2024, 11:20 AM</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Tabs Bar ── */}
      <div style={{ borderBottom: '1px solid #E5E7EB', display: 'flex', gap: '16px', paddingLeft: '4px' }}>
        <span onClick={() => setActiveTab('Summary')} style={tabItemStyle('Summary')}>Summary</span>
        <span onClick={() => navigate('/dashboard/journal-files')} style={tabItemStyle('Files')}>Files</span>
        <span onClick={() => setActiveTab('Review History')} style={tabItemStyle('Review History')}>Review History</span>
        <span onClick={() => setActiveTab('Communication')} style={tabItemStyle('Communication')}>Communication</span>
        <span onClick={() => setActiveTab('Decision')} style={tabItemStyle('Decision')}>Decision Letter</span>
        <span onClick={() => setActiveTab('Publication')} style={tabItemStyle('Publication')}>Publication</span>
      </div>

      {/* ── Tab Content ── */}
      
      {/* SUMMARY TAB */}
      {activeTab === 'Summary' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 240px', gap: '16px', alignItems: 'start' }}>
          
          {/* Abstract Box */}
          <div style={{ ...cardStyle, padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827', margin: 0, fontFamily: 'Poppins, sans-serif' }}>Abstract</h4>
            <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
              This paper presents a novel approach to leveraging artificial intelligence techniques to improve healthcare outcomes. We propose a framework that integrates machine learning models with real-time patient data to assist in early diagnosis, treatment planning, and outcome prediction. Experimental results demonstrate the effectiveness of our approach in improving accuracy and efficiency in healthcare systems.
            </p>
            <div style={{ marginTop: '8px' }}>
              <h5 style={{ fontSize: '12.5px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>Keywords</h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['Artificial Intelligence', 'Healthcare', 'Machine Learning', 'Deep Learning', 'Diagnosis', 'Predictive Analytics'].map(kw => (
                  <span key={kw} style={{ background: '#EFF6FF', color: '#2563EB', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 }}>{kw}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1.5px solid #E5E7EB', color: '#4B5563', padding: '9px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                <FiDownload size={14} /> Download Published Article (PDF)
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#2563EB', border: 'none', color: '#fff', padding: '9px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                View Published Article <FiExternalLink size={14} />
              </button>
            </div>
          </div>

          {/* Details Box */}
          <div style={{ ...cardStyle, padding: '24px' }}>
            <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827', margin: '0 0 16px', fontFamily: 'Poppins, sans-serif' }}>Details</h4>
            <div>
              <p style={detailLabelStyle}>Journal Title</p>
              <p style={detailValStyle}>A Novel Approach to AI in Healthcare</p>
              
              <p style={detailLabelStyle}>Corresponding Author</p>
              <p style={detailValStyle}>Dr. Rahul Sharma</p>

              <p style={detailLabelStyle}>Co-authors</p>
              <p style={detailValStyle}>Dr. Priya Verma, Dr. Amit Kumar</p>

              <p style={detailLabelStyle}>Journal/Conference</p>
              <p style={detailValStyle}>International Journal of Computer Science (IJCS)</p>

              <p style={detailLabelStyle}>DOI</p>
              <p style={{ ...detailValStyle, display: 'flex', alignItems: 'center', gap: '6px' }}>
                10.1234/ijcs.2024.0512
                <FiCopy size={12} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => copyToClipboard('10.1234/ijcs.2024.0512')} />
              </p>

              <p style={detailLabelStyle}>Publisher</p>
              <p style={{ ...detailValStyle, marginBottom: 0 }}>IJCS Publications</p>
            </div>
          </div>

          {/* Actions Box */}
          <div style={{ ...cardStyle, padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: '0 0 6px', fontFamily: 'Poppins, sans-serif' }}>Actions</h4>
            <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
              <FiEye size={14} color="#2563EB" /> View Full Details
            </button>
            <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
              <FiDownload size={14} color="#2563EB" /> Download All Files
            </button>
            <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
              <FiFileText size={14} color="#2563EB" /> Download Decision Letter
            </button>
            <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
              <FiShare2 size={14} color="#2563EB" /> Share Journal
            </button>
            <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
              <FiPrinter size={14} color="#2563EB" /> Print Details
            </button>
          </div>

        </div>
      )}

      {/* REVIEW HISTORY TAB */}
      {activeTab === 'Review History' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px', alignItems: 'start' }}>
          
          {/* Left Column (Timeline) */}
          <div style={{ ...cardStyle, padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '17px', top: '24px', bottom: '24px', width: '2px', background: '#E5E7EB', zIndex: 0 }} />

              <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                <div style={timelineIconStyle('#2563EB', '#EFF6FF')}>
                  <FiSend size={16} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: 0 }}>Submitted to Journal</h4>
                    <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>12 May 2024, 10:30 AM</span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>Your manuscript has been successfully submitted to the journal.</p>
                  <span style={{ fontSize: '11.5px', color: '#9CA3AF', fontWeight: 500 }}>by Author</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                <div style={timelineIconStyle('#D97706', '#FEF3C7')}>
                  <FiUser size={15} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: 0 }}>Under Review</h4>
                    <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>14 May 2024, 02:15 PM</span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>The manuscript has been assigned to reviewers.</p>
                  <span style={{ fontSize: '11.5px', color: '#9CA3AF', fontWeight: 500 }}>by Editorial Team</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                <div style={timelineIconStyle('#9333EA', '#F3E8FF')}>
                  <FiUsers size={14} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: 0 }}>Review Completed</h4>
                    <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>18 May 2024, 03:45 PM</span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>Both reviewers have submitted their reviews.</p>
                  <span style={{ fontSize: '11.5px', color: '#9CA3AF', fontWeight: 500 }}>by Reviewers</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                <div style={timelineIconStyle('#0284C7', '#E0F2FE')}>
                  <FiFileText size={15} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: 0 }}>Editor Decision</h4>
                    <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>19 May 2024, 05:20 PM</span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>The editor has made a decision based on reviewer comments.</p>
                  <span style={{ fontSize: '11.5px', color: '#9CA3AF', fontWeight: 500 }}>by Handling Editor</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                <div style={timelineIconStyle('#16A34A', '#DCFCE7')}>
                  <FiBookOpen size={14} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#16A34A', margin: 0 }}>Published</h4>
                    <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>20 May 2024, 11:20 AM</span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>Your article has been published successfully.</p>
                  <span style={{ fontSize: '11.5px', color: '#9CA3AF', fontWeight: 500 }}>by Editorial Team</span>
                </div>
              </div>

            </div>

            {/* Success green alert at bottom of timeline */}
            <div style={{ borderRadius: '12px', border: '1px solid #BBF7D0', background: '#F0FDF4', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: '#22C55E', borderRadius: '50%', padding: '5px', display: 'flex' }}>
                  <FiCheck size={14} color="#fff" />
                </div>
                <div>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#14532D', margin: '0 0 2px' }}>Your article is now published and available online.</h4>
                  <p style={{ fontSize: '12px', color: '#15803D', margin: 0 }}>Thank you for contributing to the research community.</p>
                </div>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1px solid #86EFAC', color: '#166534', padding: '8px 16px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
                View Published Article <FiExternalLink size={13} />
              </button>
            </div>

          </div>

          {/* Right Column (Reviewers & Details) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Reviewers */}
            <div style={{ ...cardStyle, padding: '20px 22px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '0 0 16px' }}>Reviewers</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="rev-pic-1"
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Dr. Amit Kumar</span>
                    <span style={{ fontSize: '11px', color: '#6B7280' }}>amk@jics.org</span>
                  </div>
                  <span style={{ background: '#DCFCE7', color: '#15803D', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>Completed</span>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                    alt="rev-pic-2"
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Dr. Priya Verma</span>
                    <span style={{ fontSize: '11px', color: '#6B7280' }}>priya.verma@jics.org</span>
                  </div>
                  <span style={{ background: '#DCFCE7', color: '#15803D', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>Completed</span>
                </div>
              </div>
            </div>

            {/* Review Details */}
            <div style={{ ...cardStyle, padding: '20px 22px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '0 0 16px' }}>Review Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 500 }}>Round</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>1</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 500 }}>Reviewers Invited</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>2</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 500 }}>Reviews Submitted</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>2</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 500 }}>Average Rating</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#D97706', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    ★★★★★ <span style={{ color: '#111827' }}>4.5 / 5</span>
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 500 }}>Recommendation</span>
                  <span style={{ background: '#DCFCE7', color: '#15803D', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>Accept</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ ...cardStyle, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', margin: '0 0 6px', fontFamily: 'Poppins, sans-serif' }}>Actions</h4>
              <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                <FiEye size={14} color="#2563EB" /> View All Reviews
              </button>
              <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                <FiDownload size={14} color="#2563EB" /> Download Reviews
              </button>
              <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                <FiFileText size={14} color="#2563EB" /> View Decision Letter
              </button>
            </div>

          </div>

        </div>
      )}

      {/* COMMUNICATION TAB */}
      {activeTab === 'Communication' && (
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1.4fr 1fr', gap: '16px', alignItems: 'start' }}>
          
          {/* Left Column: Conversations list */}
          <div style={{ ...cardStyle, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827', margin: 0, fontFamily: 'Poppins, sans-serif' }}>Conversations</h3>
              <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#2563EB', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: '8px', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}>
                <FiPlus size={12} /> New Message
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '360px', overflowY: 'auto' }}>
              <div 
                onClick={() => setActiveMessage(1)} 
                style={{ 
                  display: 'flex', gap: '10px', padding: '10px 12px', borderRadius: '10px', 
                  background: activeMessage === 1 ? '#EFF6FF' : '#fff', 
                  border: `1px solid ${activeMessage === 1 ? '#BFDBFE' : '#F3F4F6'}`,
                  cursor: 'pointer', transition: 'all 0.15s', position: 'relative'
                }}
              >
                <div style={{ background: '#3B82F6', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '11.5px', flexShrink: 0 }}>
                  EA
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>Editorial Team</span>
                    <span style={{ fontSize: '10px', color: '#9CA3AF' }}>20 May</span>
                  </div>
                  <span style={{ fontSize: '11.5px', color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Your article has been published successfully.
                  </span>
                </div>
                <div style={{ position: 'absolute', right: '6px', top: '18px', width: '6px', height: '6px', borderRadius: '50%', background: '#2563EB' }} />
              </div>

              <div 
                onClick={() => setActiveMessage(2)} 
                style={{ 
                  display: 'flex', gap: '10px', padding: '10px 12px', borderRadius: '10px', 
                  background: activeMessage === 2 ? '#EFF6FF' : '#fff', 
                  border: `1px solid ${activeMessage === 2 ? '#BFDBFE' : '#F3F4F6'}`,
                  cursor: 'pointer', transition: 'all 0.15s', position: 'relative'
                }}
              >
                <div style={{ background: '#10B981', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '11.5px', flexShrink: 0 }}>
                  AK
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>Dr. Amit Kumar</span>
                    <span style={{ fontSize: '10px', color: '#9CA3AF' }}>18 May</span>
                  </div>
                  <span style={{ fontSize: '11.5px', color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Review completed and recommendation shared.
                  </span>
                </div>
                <div style={{ position: 'absolute', right: '6px', top: '18px', width: '6px', height: '6px', borderRadius: '50%', background: '#2563EB' }} />
              </div>

              <div 
                onClick={() => setActiveMessage(3)} 
                style={{ 
                  display: 'flex', gap: '10px', padding: '10px 12px', borderRadius: '10px', 
                  background: activeMessage === 3 ? '#EFF6FF' : '#fff', 
                  border: `1px solid ${activeMessage === 3 ? '#BFDBFE' : '#F3F4F6'}`,
                  cursor: 'pointer', transition: 'all 0.15s'
                }}
              >
                <div style={{ background: '#F59E0B', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '11.5px', flexShrink: 0 }}>
                  PV
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>Dr. Priya Verma</span>
                    <span style={{ fontSize: '10px', color: '#9CA3AF' }}>16 May</span>
                  </div>
                  <span style={{ fontSize: '11.5px', color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Some minor revisions suggested.
                  </span>
                </div>
              </div>

              <div 
                onClick={() => setActiveMessage(4)} 
                style={{ 
                  display: 'flex', gap: '10px', padding: '10px 12px', borderRadius: '10px', 
                  background: activeMessage === 4 ? '#EFF6FF' : '#fff', 
                  border: `1px solid ${activeMessage === 4 ? '#BFDBFE' : '#F3F4F6'}`,
                  cursor: 'pointer', transition: 'all 0.15s'
                }}
              >
                <div style={{ background: '#3B82F6', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '11.5px', flexShrink: 0 }}>
                  EA
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>Editorial Team</span>
                    <span style={{ fontSize: '10px', color: '#9CA3AF' }}>14 May</span>
                  </div>
                  <span style={{ fontSize: '11.5px', color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Your manuscript is under review.
                  </span>
                </div>
              </div>

              <div 
                onClick={() => setActiveMessage(5)} 
                style={{ 
                  display: 'flex', gap: '10px', padding: '10px 12px', borderRadius: '10px', 
                  background: activeMessage === 5 ? '#EFF6FF' : '#fff', 
                  border: `1px solid ${activeMessage === 5 ? '#BFDBFE' : '#F3F4F6'}`,
                  cursor: 'pointer', transition: 'all 0.15s'
                }}
              >
                <div style={{ background: '#3B82F6', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '11.5px', flexShrink: 0 }}>
                  EA
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>Editorial Team</span>
                    <span style={{ fontSize: '10px', color: '#9CA3AF' }}>12 May</span>
                  </div>
                  <span style={{ fontSize: '11.5px', color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Thank you for your submission.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column: Chat details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* Message Area */}
            <div style={{ ...cardStyle, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px', minHeight: '320px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ background: '#3B82F6', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px' }}>
                    EA
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Editorial Team</span>
                    <span style={{ fontSize: '11px', color: '#6B7280' }}>editorial@ijcs.org</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto' }}>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>20 May 2024, 11:20 AM</span>
                  <FiMoreVertical size={16} color="#9CA3AF" style={{ cursor: 'pointer' }} />
                </div>
              </div>

              {/* Message Content */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flex: 1, marginTop: '8px' }}>
                <div style={{ background: '#3B82F6', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '10.5px', flexShrink: 0 }}>
                  EA
                </div>
                <div style={{ background: '#F0F5FF', border: '1px solid #DCE6FF', padding: '16px', borderRadius: '0 12px 12px 12px', flex: 1 }}>
                  <p style={{ fontSize: '12.5px', color: '#1E293B', fontWeight: 600, margin: '0 0 10px' }}>Dear Dr. Rahul Sharma,</p>
                  <p style={{ fontSize: '12.5px', color: '#334155', lineHeight: 1.6, margin: '0 0 10px' }}>
                    We are pleased to inform you that your article "A Novel Approach to AI in Healthcare" has been published successfully in Volume 15, Issue 2 (May 2024) of International Journal of Computer Science (IJCS).
                  </p>
                  <p style={{ fontSize: '12.5px', color: '#334155', lineHeight: 1.6, margin: '0 0 12px' }}>
                    Thank you for your valuable contribution.
                  </p>
                  <p style={{ fontSize: '12.5px', color: '#1E293B', fontWeight: 600, margin: '0 0 2px' }}>Best regards,</p>
                  <p style={{ fontSize: '12.5px', color: '#1E293B', fontWeight: 600, margin: 0 }}>Editorial Team</p>
                  <p style={{ fontSize: '10px', color: '#9CA3AF', textAlign: 'right', margin: '8px 0 0' }}>11:20 AM</p>
                </div>
              </div>
            </div>

            {/* Input Box */}
            <div style={{ ...cardStyle, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <textarea placeholder="Type your message here..." rows="2" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '13px', color: '#111827', resize: 'none', fontFamily: 'inherit' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F3F4F6', paddingTop: '10px' }}>
                <div style={{ display: 'flex', gap: '12px', color: '#9CA3AF' }}>
                  <FiPaperclip size={16} style={{ cursor: 'pointer' }} />
                  <FiSmile size={16} style={{ cursor: 'pointer' }} />
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F3F4F6', border: 'none', color: '#9CA3AF', padding: '8px 16px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'not-allowed' }}>
                  <FiSend size={13} /> Send Message
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Sidebar summaries */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Communication Summary */}
            <div style={{ ...cardStyle, padding: '20px 22px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '0 0 16px' }}>Communication Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 500 }}>Total Messages</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>5</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 500 }}>Unread Messages</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>0</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 500 }}>Last Message</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>20 May 2024</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 500 }}>Participants</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>3</span>
                </div>
              </div>
            </div>

            {/* Participants list */}
            <div style={{ ...cardStyle, padding: '20px 22px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '0 0 16px' }}>Participants</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ background: '#E0F2FE', color: '#0369A1', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '11px' }}>
                    EA
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>Editorial Team</span>
                    <span style={{ fontSize: '10.5px', color: '#6B7280' }}>editorial@ijcs.org</span>
                  </div>
                  <span style={{ background: '#DCFCE7', color: '#15803D', padding: '2px 6px', borderRadius: '4px', fontSize: '9.5px', fontWeight: 700 }}>Editor</span>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ background: '#D1FAE5', color: '#047857', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '11px' }}>
                    AK
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>Dr. Amit Kumar</span>
                    <span style={{ fontSize: '10.5px', color: '#6B7280' }}>amit.kumar@ijcs.org</span>
                  </div>
                  <span style={{ background: '#F3E8FF', color: '#7E22CE', padding: '2px 6px', borderRadius: '4px', fontSize: '9.5px', fontWeight: 700 }}>Reviewer</span>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ background: '#FFEDD5', color: '#C2410C', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '11px' }}>
                    PV
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>Dr. Priya Verma</span>
                    <span style={{ fontSize: '10.5px', color: '#6B7280' }}>priya.verma@ijcs.org</span>
                  </div>
                  <span style={{ background: '#F3E8FF', color: '#7E22CE', padding: '2px 6px', borderRadius: '4px', fontSize: '9.5px', fontWeight: 700 }}>Reviewer</span>
                </div>
              </div>
            </div>

            {/* Need Help? */}
            <div style={{ borderRadius: '14px', border: '1px solid #DBEAFE', background: '#EFF6FF', padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '10px' }}>
                <FiHelpCircle size={16} color="#2563EB" />
                <h4 style={{ fontWeight: 700, fontSize: '13.5px', color: '#1E40AF', margin: 0 }}>Need Help?</h4>
              </div>
              <p style={{ fontSize: '12px', color: '#1D4ED8', lineHeight: 1.6, margin: '0 0 12px' }}>
                If you have any queries regarding your submission, feel free to contact the editorial office.
              </p>
              <button style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#fff', border: '1px solid #93C5FD', color: '#1E40AF', borderRadius: '8px', padding: '7px 14px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', width: '100%', justifyContent: 'center' }}>
                <FiMail size={12} /> Contact Editorial Office
              </button>
            </div>

          </div>

        </div>
      )}

      {/* DECISION LETTER TAB */}
      {activeTab === 'Decision' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.1fr', gap: '16px', alignItems: 'start' }}>
          
          {/* Left Column (Viewer Card) */}
          <div style={{ ...cardStyle, padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#D1FAE5', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiCheck size={16} color="#059669" />
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: 0 }}>Editorial Decision</h4>
                <span style={{ background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 700, marginTop: '2px', display: 'inline-block' }}>Accept</span>
              </div>
              <span style={{ fontSize: '12.5px', color: '#6B7280', marginLeft: 'auto' }}>The editorial team has accepted your manuscript for publication.</span>
            </div>

            {/* Document Viewer Frame */}
            <div style={{ border: '1px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden' }}>
              {/* PDF Toolbar */}
              <div style={{ background: '#F8FAFC', padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5E7EB', fontSize: '12px', color: '#4B5563' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <FiFileText size={14} />
                  <span>Decision_Letter.pdf</span>
                </div>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <span>Page 1 / 1</span>
                  <span>|</span>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: '#4B5563' }}>-</button>
                    <span>100%</span>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: '#4B5563' }}>+</button>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <FiDownload size={14} style={{ cursor: 'pointer' }} />
                  <FiPrinter size={14} style={{ cursor: 'pointer' }} />
                </div>
              </div>

              {/* Letter content */}
              <div style={{ background: '#fff', padding: '40px', minHeight: '360px', fontFamily: 'Georgia, serif' }}>
                <div style={{ borderBottom: '2px solid #1E3A8A', paddingBottom: '12px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1E3A8A', margin: 0, fontFamily: 'Georgia, serif' }}>IJCS</h3>
                    <p style={{ fontSize: '11px', color: '#6B7280', margin: '2px 0 0', fontWeight: 600 }}>International Journal of Computer Science</p>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '12px', color: '#4B5563' }}>
                    <p style={{ margin: 0 }}>Date: 19 May 2024</p>
                    <p style={{ margin: '2px 0 0' }}>Ref: IJCS/2024/0512</p>
                  </div>
                </div>

                <div style={{ fontSize: '13px', color: '#334155', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p style={{ fontWeight: 'bold' }}>Dear Dr. Rahul Sharma,</p>
                  <p>
                    We are pleased to inform you that your manuscript entitled <span style={{ fontWeight: 'bold' }}>"A Novel Approach to AI in Healthcare"</span> has been accepted for publication in <span style={{ fontStyle: 'italic' }}>International Journal of Computer Science (IJCS)</span>, Volume 15, Issue 2 (May 2024).
                  </p>
                  <p>
                    The reviews submitted for your manuscript indicate its originality, contribution to the research area, and clear presentation. We thank you for your valuable contribution to the journal and we look forward to your continued support in the future.
                  </p>
                  <div style={{ marginTop: '24px', borderTop: '1px dashed #E5E7EB', paddingTop: '16px', maxWidth: '240px' }}>
                    <p style={{ margin: '0 0 4px', fontWeight: 'bold' }}>Best regards,</p>
                    {/* Simulated sign */}
                    <div style={{ fontStyle: 'italic', color: '#2563EB', fontSize: '16px', margin: '6px 0', fontFamily: 'cursive' }}>Dr. Priya Verma</div>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>Editor-in-Chief</p>
                    <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: '#6B7280' }}>International Journal of Computer Science (IJCS)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar details) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Decision Details */}
            <div style={{ ...cardStyle, padding: '20px 22px' }}>
              <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '0 0 16px' }}>Decision Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={detailLabelStyle}>Decision</span>
                  <span style={{ background: '#DCFCE7', color: '#15803D', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>Accept</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={detailLabelStyle}>Decision Date</span>
                  <span style={detailValStyle}>19 May 2024</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={detailLabelStyle}>Decision By</span>
                  <span style={detailValStyle}>Editorial Team</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ ...detailLabelStyle, flexShrink: 0 }}>Comments</span>
                  <span style={{ ...detailValStyle, textAlign: 'right', maxWidth: '140px', lineHeight: 1.4 }}>Manuscript accepted for publication.</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ ...cardStyle, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', margin: '0 0 6px', fontFamily: 'Poppins, sans-serif' }}>Actions</h4>
              <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                <FiDownload size={14} color="#2563EB" style={{ flexShrink: 0 }} /> Download Decision Letter (PDF)
              </button>
              <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                <FiMail size={14} color="#2563EB" style={{ flexShrink: 0 }} /> Send to Email
              </button>
              <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                <FiPrinter size={14} color="#2563EB" style={{ flexShrink: 0 }} /> Print Decision Letter
              </button>
            </div>

            {/* Timeline */}
            <div style={{ ...cardStyle, padding: '20px 22px' }}>
              <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', margin: '0 0 14px', fontFamily: 'Poppins, sans-serif' }}>Timeline</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '9px', top: '10px', bottom: '10px', width: '2px', background: '#2563EB' }} />
                
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                  <div style={{ background: '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                    <FiCheck size={11} color="#fff" />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151', flex: 1 }}>Submitted</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>12 May 2024</span>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                  <div style={{ background: '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                    <FiCheck size={11} color="#fff" />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151', flex: 1 }}>Under Review</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>14 May 2024</span>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                  <div style={{ background: '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                    <FiCheck size={11} color="#fff" />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151', flex: 1 }}>Review Completed</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>18 May 2024</span>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                  <div style={{ background: '#2563EB', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB', flex: 1 }}>Accepted</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>19 May 2024</span>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                  <div style={{ background: '#fff', border: '2px solid #9CA3AF', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                  </div>
                  <span style={{ fontSize: '12px', color: '#6B7280', flex: 1 }}>Published</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>20 May 2024</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* PUBLICATION TAB */}
      {activeTab === 'Publication' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Sub Tabs */}
          <div style={{ borderBottom: '1px solid #E5E7EB', display: 'flex', gap: '16px', paddingLeft: '4px' }}>
            <span onClick={() => setActiveSubTab('Publication Details')} style={subTabItemStyle('Publication Details')}>Publication Details</span>
            <span onClick={() => setActiveSubTab('Article Information')} style={subTabItemStyle('Article Information')}>Article Information</span>
            <span onClick={() => setActiveSubTab('Review & Decision')} style={subTabItemStyle('Review & Decision')}>Review & Decision</span>
            <span onClick={() => setActiveSubTab('Communication')} style={subTabItemStyle('Communication')}>Communication</span>
            <span onClick={() => setActiveSubTab('Citations & Metrics')} style={subTabItemStyle('Citations & Metrics')}>Citations & Metrics</span>
            <span onClick={() => setActiveSubTab('Download & Share')} style={subTabItemStyle('Download & Share')}>Download & Share</span>
          </div>

          {activeSubTab === 'Publication Details' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.1fr', gap: '16px', alignItems: 'start' }}>
              
              {/* Publication Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ ...cardStyle, padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>Publication Details</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px' }}>
                    <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><FiUser size={13} /> Article Title</span>
                      <span style={{ color: '#111827', fontWeight: 600, flex: 1 }}>A Novel Approach to AI in Healthcare</span>
                    </div>

                    <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><FiBookOpen size={13} /> Journal Name</span>
                      <span style={{ color: '#111827', fontWeight: 600, flex: 1 }}>International Journal of Computer Science (IJCS)</span>
                    </div>

                    <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><FiLink size={13} /> DOI</span>
                      <span style={{ color: '#2563EB', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => copyToClipboard('10.1234/ijcs.2024.0512')}>
                        10.1234/ijcs.2024.0512 <FiCopy size={12} color="#9CA3AF" />
                      </span>
                    </div>

                    <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><FiCalendar size={13} /> Published On</span>
                      <span style={{ color: '#111827', fontWeight: 600, flex: 1 }}>20 May 2024, 11:20 AM</span>
                    </div>

                    <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><FiBook size={13} /> Volume / Issue</span>
                      <span style={{ color: '#111827', fontWeight: 600, flex: 1 }}>Volume 15, Issue 2, May 2024</span>
                    </div>

                    <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><FiFileText size={13} /> Pages</span>
                      <span style={{ color: '#111827', fontWeight: 600, flex: 1 }}>123 - 138 (16 Pages)</span>
                    </div>

                    <div style={{ display: 'flex', paddingBottom: '4px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><FiLink size={13} /> Article URL</span>
                      <span style={{ color: '#2563EB', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => copyToClipboard('https://ijcs.org/volume-15/issue-2/ijcs.2024.0512')}>
                        https://ijcs.org/volume-15/issue-2/ijcs.2024.0512 <FiExternalLink size={12} color="#9CA3AF" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Article Visibility & Access */}
                <div style={{ ...cardStyle, padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>Article Visibility & Access</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    <div style={{ border: '1px solid #E5E7EB', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                      <div style={{ background: '#EFF6FF', borderRadius: '8px', padding: '8px', display: 'flex' }}><FiGlobe size={16} color="#2563EB" /></div>
                      <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827', margin: 0 }}>Publicly Available</h4>
                      <p style={{ fontSize: '11px', color: '#6B7280', margin: 0, lineHeight: 1.4 }}>Your article is available to all readers worldwide.</p>
                    </div>

                    <div style={{ border: '1px solid #E5E7EB', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                      <div style={{ background: '#FEF3C7', borderRadius: '8px', padding: '8px', display: 'flex' }}><FiLock size={16} color="#D97706" /></div>
                      <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827', margin: 0 }}>Open Access</h4>
                      <p style={{ fontSize: '11px', color: '#6B7280', margin: 0, lineHeight: 1.4 }}>This is an open access article.</p>
                    </div>

                    <div style={{ border: '1px solid #E5E7EB', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                      <div style={{ background: '#ECFDF5', borderRadius: '8px', padding: '8px', display: 'flex' }}><FiEye size={16} color="#10B981" /></div>
                      <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827', margin: 0 }}>Indexed</h4>
                      <p style={{ fontSize: '11px', color: '#6B7280', margin: 0, lineHeight: 1.4 }}>The article will be indexed in major databases.</p>
                    </div>
                  </div>

                  <div style={{ background: '#EFF6FF', border: '1px solid #DBEAFE', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#1E40AF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiInfo size={14} color="#2563EB" />
                    <span>It may take a few days for indexing services to update and reflect your article.</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Timeline & Congratulations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Timeline */}
                <div style={{ ...cardStyle, padding: '20px 22px' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', margin: '0 0 14px', fontFamily: 'Poppins, sans-serif' }}>Publication Timeline</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '9px', top: '10px', bottom: '10px', width: '2px', background: '#2563EB' }} />
                    
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                      <div style={{ background: '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                        <FiCheck size={11} color="#fff" />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151', flex: 1 }}>Submitted</span>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>12 May 2024, 10:30 AM</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                      <div style={{ background: '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                        <FiCheck size={11} color="#fff" />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151', flex: 1 }}>Under Review</span>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>14 May 2024, 02:15 PM</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                      <div style={{ background: '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                        <FiCheck size={11} color="#fff" />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151', flex: 1 }}>Review Completed</span>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>18 May 2024, 03:45 PM</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                      <div style={{ background: '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                        <FiCheck size={11} color="#fff" />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151', flex: 1 }}>Decision Made</span>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>19 May 2024, 05:20 PM</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                      <div style={{ background: '#2563EB', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB', flex: 1 }}>Published</span>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>20 May 2024, 11:20 AM</span>
                    </div>
                  </div>

                  {/* Timeline Success notice banner */}
                  <div style={{ background: '#F0FDF4', border: '1px solid #DCFCE7', borderRadius: '8px', padding: '12px', marginTop: '16px', fontSize: '12px', color: '#15803D', lineHeight: 1.5 }}>
                    Your article is now live and accessible to readers worldwide. Thank you for contributing to the research community!
                  </div>
                </div>

                {/* Share & Promote */}
                <div style={{ ...cardStyle, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>Share & Promote</h3>
                  <span style={{ fontSize: '11.5px', color: '#6B7280' }}>Share your published work and increase its visibility.</span>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px' }}>
                    <button style={{ ...actionBtnStyle, padding: '8px 10px', fontSize: '11.5px' }}><FiTwitter size={13} color="#1DA1F2" /> Share on Twitter</button>
                    <button style={{ ...actionBtnStyle, padding: '8px 10px', fontSize: '11.5px' }}><FiLinkedin size={13} color="#0A66C2" /> Share on LinkedIn</button>
                    <button style={{ ...actionBtnStyle, padding: '8px 10px', fontSize: '11.5px' }}><FiFacebook size={13} color="#1877F2" /> Share on Facebook</button>
                    <button style={{ ...actionBtnStyle, padding: '8px 10px', fontSize: '11.5px' }} onClick={() => copyToClipboard('https://ijcs.org/volume-15/issue-2/ijcs.2024.0512')}><FiLink size={13} color="#2563EB" /> Copy Article Link</button>
                    <button style={{ ...actionBtnStyle, padding: '8px 10px', fontSize: '11.5px' }}><FiMail size={13} color="#2563EB" /> Email to Colleagues</button>
                    <button style={{ ...actionBtnStyle, padding: '8px 10px', fontSize: '11.5px' }}><FiActivity size={13} color="#EF4444" /> View Altmetric</button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {activeSubTab === 'Article Information' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.1fr', gap: '16px', alignItems: 'start' }}>
              
              {/* Article Information Box */}
              <div style={{ ...cardStyle, padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>Article Information</h3>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#fff', border: '1px solid #D1D5DB', color: '#374151', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                    <FiEdit size={12} /> Edit
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12.5px' }}>
                  <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px' }}>
                    <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0 }}>Article Title</span>
                    <span style={{ color: '#111827', fontWeight: 600 }}>A Novel Approach to AI in Healthcare</span>
                  </div>

                  <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px' }}>
                    <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0 }}>Journal</span>
                    <span style={{ color: '#111827', fontWeight: 600 }}>International Journal of Computer Science (IJCS)</span>
                  </div>

                  <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px' }}>
                    <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0 }}>Article Type</span>
                    <span style={{ color: '#111827', fontWeight: 600 }}>Research Article</span>
                  </div>

                  <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px' }}>
                    <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0 }}>Subject Area</span>
                    <span style={{ color: '#111827', fontWeight: 600 }}>Computer Science / Artificial Intelligence</span>
                  </div>

                  <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px', alignItems: 'center' }}>
                    <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0 }}>Keywords</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {['Artificial Intelligence', 'Healthcare', 'Machine Learning', 'Deep Learning', 'Diagnostics'].map(tag => (
                        <span key={tag} style={{ background: '#EFF6FF', color: '#2563EB', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px' }}>
                    <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0 }}>Abstract</span>
                    <span style={{ color: '#4B5563', lineHeight: 1.6, flex: 1 }}>
                      This paper presents a novel approach to leveraging artificial intelligence techniques to improve healthcare outcomes. We propose a framework that integrates machine learning models with real-time patient data to assist in early diagnosis, treatment planning, and outcome prediction. Experimental results demonstrate the effectiveness of our approach in improving accuracy and efficiency in healthcare systems.
                    </span>
                  </div>

                  <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px', alignItems: 'center' }}>
                    <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0 }}>DOI</span>
                    <span style={{ color: '#2563EB', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => copyToClipboard('10.1234/ijcs.2024.0512')}>
                      10.1234/ijcs.2024.0512 <FiCopy size={12} color="#9CA3AF" />
                    </span>
                  </div>

                  <div style={{ display: 'flex', paddingBottom: '4px' }}>
                    <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0 }}>Funding</span>
                    <span style={{ color: '#4B5563' }}>Not Applicable</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Authors & Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Authors */}
                <div style={{ ...cardStyle, padding: '20px 22px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '0 0 16px' }}>Authors</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80" alt="auth-1" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>Dr. Rahul Sharma</span>
                        <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 500 }}>Corresponding Author</span>
                        <span style={{ fontSize: '10.5px', color: '#9CA3AF' }}>rahul.sharma@univ.edu</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="auth-2" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>Dr. Priya Verma</span>
                        <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 500 }}>Co-author</span>
                        <span style={{ fontSize: '10.5px', color: '#9CA3AF' }}>priya.verma@univ.edu</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="auth-3" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>Dr. Amit Kumar</span>
                        <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 500 }}>Co-author</span>
                        <span style={{ fontSize: '10.5px', color: '#9CA3AF' }}>amit.kumar@univ.edu</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ ...cardStyle, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', margin: '0 0 6px', fontFamily: 'Poppins, sans-serif' }}>Actions</h4>
                  <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                    <FiEye size={14} color="#2563EB" /> View Full Article
                  </button>
                  <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                    <FiDownload size={14} color="#2563EB" /> Download Article (PDF)
                  </button>
                  <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                    <FiFileText size={14} color="#2563EB" /> Download Certificate
                  </button>
                  <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                    <FiShare2 size={14} color="#2563EB" /> Share Article
                  </button>
                  <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                    <FiPrinter size={14} color="#2563EB" /> Print Article
                  </button>
                </div>
              </div>

            </div>
          )}

          {activeSubTab === 'Review & Decision' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.1fr', gap: '16px', alignItems: 'start' }}>
              
              {/* Reports & Editorial Decisions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Reports Container */}
                <div style={{ ...cardStyle, padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>Peer Review Reports</h3>
                  
                  {/* Reviewer 1 */}
                  <div style={{ border: '1px solid #E5E7EB', borderRadius: '10px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ background: '#2563EB', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px', flexShrink: 0 }}>
                      R1
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                      <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>Reviewer 1</h4>
                          <span style={{ background: '#DCFCE7', color: '#15803D', padding: '1px 6px', borderRadius: '4px', fontSize: '9.5px', fontWeight: 700, marginTop: '2px', display: 'inline-block' }}>Completed</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#9CA3AF', marginLeft: 'auto' }}>
                          <FiCalendar size={12} /> Reviewed on 14 May 2024
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '12px', marginTop: '4px' }}>
                        <span style={{ color: '#6B7280', fontWeight: 500 }}>Recommendation</span>
                        <span style={{ background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 700 }}>Accept</span>
                      </div>
                      <p style={{ fontSize: '12.5px', color: '#4B5563', margin: '4px 0 0', lineHeight: 1.5 }}>
                        The manuscript is well-written and presents a significant contribution to the field. Minor revisions suggested in methodology section.
                      </p>
                      <button style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #2563EB', color: '#2563EB', background: '#fff', borderRadius: '6px', padding: '5px 12px', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', marginTop: '6px', alignSelf: 'flex-start' }}>
                        <FiEye size={12} /> View Full Report
                      </button>
                    </div>
                  </div>

                  {/* Reviewer 2 */}
                  <div style={{ border: '1px solid #E5E7EB', borderRadius: '10px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ background: '#7C3AED', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px', flexShrink: 0 }}>
                      R2
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                      <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>Reviewer 2</h4>
                          <span style={{ background: '#DCFCE7', color: '#15803D', padding: '1px 6px', borderRadius: '4px', fontSize: '9.5px', fontWeight: 700, marginTop: '2px', display: 'inline-block' }}>Completed</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#9CA3AF', marginLeft: 'auto' }}>
                          <FiCalendar size={12} /> Reviewed on 13 May 2024
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '12px', marginTop: '4px' }}>
                        <span style={{ color: '#6B7280', fontWeight: 500 }}>Recommendation</span>
                        <span style={{ background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 700 }}>Accept</span>
                      </div>
                      <p style={{ fontSize: '12.5px', color: '#4B5563', margin: '4px 0 0', lineHeight: 1.5 }}>
                        Good quality research with clear results and strong conclusions. Some minor language and formatting issues.
                      </p>
                      <button style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #2563EB', color: '#2563EB', background: '#fff', borderRadius: '6px', padding: '5px 12px', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', marginTop: '6px', alignSelf: 'flex-start' }}>
                        <FiEye size={12} /> View Full Report
                      </button>
                    </div>
                  </div>

                </div>

                {/* Editorial Decision Box */}
                <div style={{ ...cardStyle, padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>Editorial Decision</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: '#D1FAE5', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FiCheck size={16} color="#059669" />
                    </div>
                    <div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Decision</span>
                        <span style={{ background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 700 }}>Accept</span>
                      </div>
                      <p style={{ fontSize: '11.5px', color: '#6B7280', margin: '4px 0 0' }}>
                        The editorial team has accepted your manuscript for publication. <br/>
                        Decided on: <span style={{ fontWeight: 600, color: '#4B5563' }}>19 May 2024, 05:20 PM</span> | Decided by: <span style={{ fontWeight: 600, color: '#4B5563' }}>Editorial Team</span>
                      </p>
                    </div>
                  </div>

                  {/* Editor's Comments */}
                  <div style={{ borderLeft: '4px solid #10B981', background: '#F0FDF4', padding: '16px', borderRadius: '0 8px 8px 0', marginTop: '6px' }}>
                    <div style={{ fontSize: '13px', color: '#166534', fontStyle: 'italic', lineHeight: 1.6 }}>
                      "We are pleased to accept your manuscript for publication in IJCS. Please address the minor comments and complete the publication process."
                    </div>
                    <span style={{ fontSize: '11.5px', color: '#15803D', fontWeight: 700, marginTop: '8px', display: 'block' }}>— Editor's Comments</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Timeline & Summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Timeline */}
                <div style={{ ...cardStyle, padding: '20px 22px' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', margin: '0 0 14px', fontFamily: 'Poppins, sans-serif' }}>Review Timeline</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '9px', top: '10px', bottom: '10px', width: '2px', background: '#2563EB' }} />
                    
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                      <div style={{ background: '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                        <FiCheck size={11} color="#fff" />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151', flex: 1 }}>Submitted</span>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>12 May 2024, 10:30 AM</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                      <div style={{ background: '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                        <FiCheck size={11} color="#fff" />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151', flex: 1 }}>Under Review</span>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>12 May 2024, 11:45 AM</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                      <div style={{ background: '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                        <FiCheck size={11} color="#fff" />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151', flex: 1 }}>Review Completed</span>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>14 May 2024, 02:15 PM</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                      <div style={{ background: '#2563EB', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB', flex: 1 }}>Decision Made</span>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>19 May 2024, 05:20 PM</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                      <div style={{ background: '#fff', border: '2px solid #9CA3AF', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                      </div>
                      <span style={{ fontSize: '12px', color: '#6B7280', flex: 1 }}>Published</span>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>20 May 2024, 11:20 AM</span>
                    </div>
                  </div>
                </div>

                {/* Review Summary */}
                <div style={{ ...cardStyle, padding: '20px 22px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '0 0 16px' }}>Review Summary</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 500 }}>Total Reviewers</span>
                      <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>2</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 500 }}>Completed Reviews</span>
                      <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>2</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 500 }}>Pending Reviews</span>
                      <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>0</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 500 }}>Average Recommendation</span>
                      <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        ★★★★★ <span style={{ color: '#111827' }}>(5.0)</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ ...cardStyle, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', margin: '0 0 6px', fontFamily: 'Poppins, sans-serif' }}>Actions</h4>
                  <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                    <FiEye size={14} color="#2563EB" /> View All Reviews
                  </button>
                  <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                    <FiDownload size={14} color="#2563EB" /> Download All Reviews (PDF)
                  </button>
                  <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                    <FiFileText size={14} color="#2563EB" /> Download Decision Letter
                  </button>
                  <button style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                    <FiAward size={14} color="#2563EB" /> Appeal Decision
                  </button>
                </div>

              </div>

            </div>
          )}

          {activeSubTab === 'Communication' && (
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1.4fr 1fr', gap: '16px', alignItems: 'start' }}>
              
              {/* Message Center list */}
              <div style={{ ...cardStyle, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827', margin: 0, fontFamily: 'Poppins, sans-serif' }}>Message Center</h3>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>View and send messages to the editorial team.</span>
                </div>

                {/* Dropdown status selector */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px' }}>
                  <select style={{ border: 'none', background: 'transparent', fontSize: '12px', fontWeight: 600, color: '#4B5563', outline: 'none', cursor: 'pointer' }}>
                    <option>All Messages</option>
                    <option>Editorial Team</option>
                    <option>Reviewers</option>
                  </select>
                </div>

                {/* Messages Sidebar List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '380px', overflowY: 'auto' }}>
                  {[
                    { id: 1, title: 'Final Decision - Article Accepted', sender: 'Editorial Team', time: '19 May 2024, 05:25 PM', status: 'green' },
                    { id: 2, title: 'Minor Revisions Required', sender: 'Reviewer 1', time: '14 May 2024, 11:45 AM', status: 'blue' },
                    { id: 3, title: 'Review Report Submitted', sender: 'Reviewer 2', time: '13 May 2024, 10:30 AM', status: 'none' },
                    { id: 4, title: 'Submission Acknowledgement', sender: 'Editorial Team', time: '12 May 2024, 10:30 AM', status: 'none' }
                  ].map(m => (
                    <div 
                      key={m.id}
                      onClick={() => setActiveCommMsg(m.id)}
                      style={{
                        display: 'flex', gap: '10px', padding: '10px 12px', borderRadius: '10px',
                        background: activeCommMsg === m.id ? '#EFF6FF' : '#fff',
                        border: `1px solid ${activeCommMsg === m.id ? '#BFDBFE' : '#F3F4F6'}`,
                        cursor: 'pointer', transition: 'all 0.15s', position: 'relative'
                      }}
                    >
                      <div style={{ background: activeCommMsg === m.id ? '#2563EB' : '#F3F4F6', color: activeCommMsg === m.id ? '#fff' : '#6B7280', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <FiMail size={12} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, overflow: 'hidden' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.title}</span>
                        <span style={{ fontSize: '11px', color: '#6B7280' }}>{m.sender}</span>
                        <span style={{ fontSize: '10px', color: '#9CA3AF' }}>{m.time}</span>
                      </div>
                      {m.status === 'green' && <div style={{ position: 'absolute', right: '10px', top: '10px', width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />}
                      {m.status === 'blue' && <div style={{ position: 'absolute', right: '10px', top: '10px', width: '6px', height: '6px', borderRadius: '50%', background: '#2563EB' }} />}
                    </div>
                  ))}
                  <button style={{ background: 'none', border: '1px solid #E5E7EB', borderRadius: '8px', color: '#4B5563', padding: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', marginTop: '4px' }}>
                    Load More
                  </button>
                </div>
              </div>

              {/* Message Details Pane */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ ...cardStyle, padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', minHeight: '340px' }}>
                  
                  {/* Subject Header */}
                  <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', margin: 0 }}>Final Decision - Article Accepted</h3>
                        <span style={{ background: '#DCFCE7', color: '#15803D', padding: '1px 6px', borderRadius: '4px', fontSize: '9.5px', fontWeight: 700 }}>Accept</span>
                      </div>
                      <span style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px', display: 'inline-block' }}>
                        From: <span style={{ fontWeight: 600, color: '#374151' }}>Editorial Team</span> • 19 May 2024, 05:25 PM
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto', color: '#9CA3AF' }}>
                      <FiStar size={15} style={{ cursor: 'pointer' }} />
                      <FiMoreVertical size={16} style={{ cursor: 'pointer' }} />
                    </div>
                  </div>

                  {/* Mail Message Box */}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flex: 1, marginTop: '4px' }}>
                    <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', flex: 1, fontSize: '12.5px', color: '#334155', lineHeight: 1.6 }}>
                      <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#1E293B' }}>Dear Dr. Rahul Sharma,</p>
                      <p style={{ margin: '0 0 12px' }}>
                        We are pleased to inform you that your manuscript titled <br/>
                        <span style={{ fontWeight: 700, color: '#1E293B' }}>"A Novel Approach to AI in Healthcare"</span> <br/>
                        has been accepted for publication in International Journal of Computer Science (IJCS).
                      </p>
                      <p style={{ margin: '0 0 12px' }}>Your article will move to the publication stage. <br/>Congratulations!</p>
                      <p style={{ margin: '14px 0 2px', fontWeight: 600, color: '#1E293B' }}>Best regards,</p>
                      <p style={{ margin: '0 0 2px', fontWeight: 600, color: '#1E293B' }}>Editorial Team</p>
                      <p style={{ margin: 0, fontSize: '11.5px', color: '#6B7280' }}>International Journal of Computer Science (IJCS)</p>
                    </div>
                  </div>

                  {/* Reply Input Section */}
                  <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '10px' }}>
                    <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #E5E7EB', paddingBottom: '6px', marginBottom: '10px', fontSize: '12px' }}>
                      <span style={{ fontWeight: 700, color: '#2563EB', borderBottom: '2px solid #2563EB', paddingBottom: '6px', cursor: 'pointer' }}>Reply</span>
                      <span style={{ color: '#6B7280', paddingBottom: '6px', cursor: 'pointer' }}>New Message</span>
                    </div>

                    <textarea 
                      placeholder="Type your message..." 
                      rows="2" 
                      value={commReplyText}
                      onChange={e => setCommReplyText(e.target.value)}
                      style={{ width: '100%', border: 'none', outline: 'none', fontSize: '12.5px', color: '#111827', resize: 'none', fontFamily: 'inherit' }} 
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                      <div style={{ display: 'flex', gap: '12px', color: '#9CA3AF' }}>
                        <FiPaperclip size={15} style={{ cursor: 'pointer' }} />
                        <FiSmile size={15} style={{ cursor: 'pointer' }} />
                      </div>
                      <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#2563EB', border: 'none', color: '#fff', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 6px rgba(37,99,235,0.3)' }}>
                        Send Message <FiSend size={12} />
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Actions & Participants */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Quick Actions */}
                <div style={{ ...cardStyle, padding: '20px 22px' }}>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '0 0 16px' }}>Quick Actions</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button style={{ ...actionBtnStyle, padding: '8px 12px' }}><FiMail size={13} color="#2563EB" /> Send New Message</button>
                    <button style={{ ...actionBtnStyle, padding: '8px 12px' }}><FiUpload size={13} color="#2563EB" /> Upload Additional File</button>
                    <button style={{ ...actionBtnStyle, padding: '8px 12px' }}><FiMessageCircle size={13} color="#2563EB" /> View All Messages</button>
                    <button style={{ ...actionBtnStyle, padding: '8px 12px' }}><FiDownload size={13} color="#2563EB" /> Download All Messages</button>
                  </div>
                </div>

                {/* Participants */}
                <div style={{ ...cardStyle, padding: '20px 22px' }}>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '0 0 16px' }}>Participants</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ background: '#EFF6FF', color: '#2563EB', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '11px' }}>E</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', flex: 1 }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>Editorial Team</span>
                        <span style={{ fontSize: '10.5px', color: '#9CA3AF' }}>editor@ijcs.org</span>
                      </div>
                      <span style={{ background: '#DCFCE7', color: '#15803D', padding: '1px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: 700 }}>Editor</span>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ background: '#EFF6FF', color: '#2563EB', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '11px' }}>R</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', flex: 1 }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>Dr. Rahul Sharma <span style={{ fontWeight: 500, color: '#9CA3AF' }}>(You)</span></span>
                        <span style={{ fontSize: '10.5px', color: '#9CA3AF' }}>rahul.sharma@univ.edu</span>
                      </div>
                      <span style={{ background: '#E0F2FE', color: '#0369A1', padding: '1px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: 700 }}>Author</span>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ background: '#F3E8FF', color: '#7E22CE', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '11px' }}>R1</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', flex: 1 }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>Reviewer 1</span>
                        <span style={{ fontSize: '10.5px', color: '#9CA3AF' }}>rev1@ijcs.org</span>
                      </div>
                      <span style={{ background: '#F3E8FF', color: '#7E22CE', padding: '1px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: 700 }}>Reviewer</span>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ background: '#F3E8FF', color: '#7E22CE', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '11px' }}>R2</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', flex: 1 }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>Reviewer 2</span>
                        <span style={{ fontSize: '10.5px', color: '#9CA3AF' }}>rev2@ijcs.org</span>
                      </div>
                      <span style={{ background: '#F3E8FF', color: '#7E22CE', padding: '1px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: 700 }}>Reviewer</span>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          )}

          {activeSubTab === 'Citations & Metrics' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr 1fr', gap: '16px', marginTop: '4px' }}>
              
              {/* Citation APA Card */}
              <div style={{ ...cardStyle, padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', margin: 0, fontFamily: 'Poppins, sans-serif' }}>Citation (APA Style)</h4>
                <p style={{ fontSize: '11.5px', color: '#4B5563', lineHeight: 1.6, margin: 0, fontStyle: 'italic', background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', border: '1px dashed #E2E8F0' }}>
                  Sharma, R., Verma, P., & Kumar, A. (2024). A novel approach to AI in healthcare. International Journal of Computer Science (IJCS), 15(2), 123-138. https://doi.org/10.1234/ijcs.2024.0512
                </p>
                <button onClick={() => copyToClipboard('Sharma, R., Verma, P., & Kumar, A. (2024). A novel approach to AI in healthcare. International Journal of Computer Science (IJCS), 15(2), 123-138. https://doi.org/10.1234/ijcs.2024.0512')} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#fff', border: '1px solid #E5E7EB', color: '#2563EB', padding: '6px 12px', borderRadius: '8px', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }}>
                  <FiCopy size={12} /> Copy Citation
                </button>
              </div>

              {/* Citations & Metrics */}
              <div style={{ ...cardStyle, padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', margin: 0, fontFamily: 'Poppins, sans-serif' }}>Citations & Metrics</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '10px', padding: '10px 14px', textAlign: 'center' }}>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 4px' }}>Citations</p>
                    <p style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 2px' }}>12</p>
                    <span style={{ fontSize: '10px', color: '#9CA3AF' }}>Total Citations</span>
                  </div>
                  <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '10px', padding: '10px 14px', textAlign: 'center' }}>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 4px' }}>Views</p>
                    <p style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 2px' }}>245</p>
                    <span style={{ fontSize: '10px', color: '#9CA3AF' }}>Total Views</span>
                  </div>
                  <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '10px', padding: '10px 14px', textAlign: 'center' }}>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 4px' }}>Downloads</p>
                    <p style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 2px' }}>156</p>
                    <span style={{ fontSize: '10px', color: '#9CA3AF' }}>Total Downloads</span>
                  </div>
                  <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '10px', padding: '10px 14px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 4px' }}>Altmetric</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'conic-gradient(#34D399 25%, #60A5FA 0 50%, #F59E0B 0 75%, #EF4444 0)' }} />
                      <p style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: 0 }}>35</p>
                    </div>
                    <span style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '2px' }}>Altmetric Score</span>
                  </div>
                </div>
                <button style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#fff', border: '1px solid #E5E7EB', color: '#2563EB', padding: '6px 12px', borderRadius: '8px', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }}>
                  View Detailed Metrics <FiExternalLink size={12} />
                </button>
              </div>

              {/* Quick Links */}
              <div style={{ ...cardStyle, padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', margin: 0, fontFamily: 'Poppins, sans-serif' }}>Quick Links</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button style={{ ...actionBtnStyle, padding: '8px 12px', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}><FiBook size={14} color="#2563EB" /> Journal Homepage</span>
                    <FiExternalLink size={13} color="#9CA3AF" />
                  </button>
                  <button style={{ ...actionBtnStyle, padding: '8px 12px', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}><FiFileText size={14} color="#2563EB" /> Author Guidelines</span>
                    <FiExternalLink size={13} color="#9CA3AF" />
                  </button>
                  <button onClick={() => navigate('/dashboard/upload-journal')} style={{ ...actionBtnStyle, padding: '8px 12px', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}><FiUploadCloud size={14} color="#2563EB" /> Submit Another Article</span>
                    <FiArrowRight size={13} color="#2563EB" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {activeSubTab === 'Download & Share' && (
            <div style={{ ...cardStyle, padding: '36px', textAlign: 'center', color: '#9CA3AF' }}>
              <FiLayers size={36} style={{ marginBottom: '10px' }} />
              <p style={{ margin: 0, fontSize: '14px' }}>{activeSubTab} content is loading...</p>
            </div>
          )}

          {/* Stepper workflow next and help prompts */}
          {activeSubTab === 'Article Information' && (
            <>
              {/* Bottom alert & flow step */}
              <div style={{ borderRadius: '12px', border: '1px solid #BBF7D0', background: '#F0FDF4', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ background: '#22C55E', borderRadius: '50%', padding: '5px', display: 'flex' }}>
                    <FiCheck size={14} color="#fff" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#14532D', margin: '0 0 2px' }}>Your article information has been saved successfully.</h4>
                    <p style={{ fontSize: '12px', color: '#15803D', margin: 0 }}>You can now proceed to the next step in the journal workflow.</p>
                  </div>
                </div>
                <button onClick={() => setActiveSubTab('Review & Decision')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#22C55E', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 10px rgba(34,197,94,0.3)' }}>
                  Next: Review & Decision <FiArrowRight size={14} />
                </button>
              </div>

              {/* Blue support card */}
              <div style={{ borderRadius: '12px', border: '1px solid #DBEAFE', background: '#EFF6FF', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', fontSize: '12.5px', color: '#1E40AF' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiInfo size={16} color="#2563EB" />
                  <span>Need help? If you have any questions, please contact the editorial office.</span>
                </div>
                <span style={{ fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', color: '#2563EB' }}>Contact Support</span>
              </div>
            </>
          )}

          {activeSubTab === 'Review & Decision' && (
            <>
              {/* Bottom alert & flow step */}
              <div style={{ borderRadius: '12px', border: '1px solid #DBEAFE', background: '#EFF6FF', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ background: '#2563EB', borderRadius: '50%', padding: '5px', display: 'flex' }}>
                    <FiCheck size={14} color="#fff" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#1E40AF', margin: '0 0 2px' }}>You have accepted the decision.</h4>
                    <p style={{ fontSize: '12px', color: '#1E40AF', margin: 0 }}>Your article will be moved to the next stage for publication.</p>
                  </div>
                </div>
                <button onClick={() => setActiveSubTab('Communication')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1.5px solid #2563EB', color: '#2563EB', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 6px rgba(37,99,235,0.1)' }}>
                  Next: Communication <FiArrowRight size={14} />
                </button>
              </div>
            </>
          )}

          {activeSubTab === 'Communication' && (
            <>
              {/* Bottom alert & flow step */}
              <div style={{ borderRadius: '12px', border: '1px solid #DBEAFE', background: '#EFF6FF', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FiInfo size={16} color="#2563EB" />
                  <span style={{ fontSize: '12.5px', color: '#1E40AF' }}>All communications are secure and will be recorded for editorial purposes.</span>
                </div>
                <button onClick={() => setActiveSubTab('Publication Details')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#2563EB', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 10px rgba(37,99,235,0.3)' }}>
                  Next: Publication <FiArrowRight size={14} />
                </button>
              </div>
            </>
          )}

          {activeSubTab === 'Publication Details' && (
            <>
              {/* Bottom alert & flow step */}
              <div style={{ borderRadius: '12px', border: '1px solid #DBEAFE', background: '#EFF6FF', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px', fontSize: '12.5px', color: '#1E40AF' }}>
                <FiCheckCircle size={16} color="#2563EB" />
                <span>Thank you for publishing with International Journal of Computer Science (IJCS). We appreciate your valuable contribution. 🎉</span>
              </div>
            </>
          )}

          {activeSubTab !== 'Publication Details' && activeSubTab !== 'Article Information' && activeSubTab !== 'Review & Decision' && activeSubTab !== 'Communication' && activeSubTab !== 'Download & Share' && (
            <div style={{ ...cardStyle, padding: '36px', textAlign: 'center', color: '#9CA3AF' }}>
              <FiLayers size={36} style={{ marginBottom: '10px' }} />
              <p style={{ margin: 0, fontSize: '14px' }}>{activeSubTab} content is loading...</p>
            </div>
          )}

        </div>
      )}

      {/* Non-summary Tab Placeholders */}
      {activeTab !== 'Summary' && activeTab !== 'Review History' && activeTab !== 'Communication' && activeTab !== 'Decision' && activeTab !== 'Publication' && (
        <div style={{ ...cardStyle, padding: '36px', textAlign: 'center', color: '#9CA3AF' }}>
          <FiLayers size={36} style={{ marginBottom: '10px' }} />
          <p style={{ margin: 0, fontSize: '14px' }}>{activeTab} details are loading...</p>
        </div>
      )}

      {/* Footer Info */}
      {activeTab !== 'Publication' && (
        <div style={{ borderRadius: '12px', border: '1px solid #DBEAFE', background: '#EFF6FF', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
          <FiInfo size={18} color="#2563EB" />
          <p style={{ fontSize: '13px', color: '#1E40AF', margin: 0 }}>
            {activeTab === 'Decision' 
              ? 'Your article has been accepted and will be published soon.'
              : 'Thank you for contributing to the research community. Your work has been successfully published. 🎉'}
          </p>
        </div>
      )}

    </div>
  );
};

export default JournalDetails;
