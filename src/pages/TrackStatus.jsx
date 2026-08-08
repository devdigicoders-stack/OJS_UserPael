import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  FiChevronRight, FiArrowLeft, FiRefreshCw, FiCopy, FiCalendar, FiBookOpen,
  FiFileText, FiCheck, FiMail, FiBook, FiExternalLink, FiSearch, FiUsers,
  FiCheckCircle, FiInfo, FiPaperclip, FiHelpCircle
} from 'react-icons/fi';
import { toast } from 'react-toastify';

import { useJournalContext } from '../context/JournalContext';

const TrackStatus = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { journals } = useJournalContext();
  const currentJournal = journals.find(j => j.id === id) || journals[0] || {
    id: 'PRAXIS-2024-0512', title: 'A Novel Approach to AI in Healthcare',
    dept: 'Computer Science', primaryAuthor: 'Dr. Rahul Sharma',
    status: 'Published', date: '12 May 2024'
  };

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

  const detailLabelStyle = { fontSize: '12px', color: '#6B7280', fontWeight: 500 };
  const detailValStyle = { fontSize: '13px', color: '#111827', fontWeight: 600 };

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
            <Link to="/dashboard/journal-details" style={{ color: '#6B7280', textDecoration: 'none', fontWeight: 500 }}>Journal Details</Link>
            <FiChevronRight size={13} />
            <span style={{ color: '#2563EB', fontWeight: 600 }}>Track Status</span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '6px 0 2px' }}>Track Submission Status</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>Monitor the progress of your journal at every stage.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => navigate(`/dashboard/journal-details/${currentJournal.id}`)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: '#fff', border: '1.5px solid #E5E7EB',
              color: '#4B5563', borderRadius: '10px', padding: '9px 16px',
              fontWeight: 600, fontSize: '13px', cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}
          >
            <FiArrowLeft size={14} /> Back to Journal Details
          </button>
          <button
            onClick={() => toast.info('Status updated!')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: '#2563EB', border: 'none',
              color: '#fff', borderRadius: '10px', padding: '9px 16px',
              fontWeight: 600, fontSize: '13px', cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(37,99,235,0.2)',
            }}
          >
            <FiRefreshCw size={14} /> Refresh Status
          </button>
        </div>
      </div>

      {/* ── Upper Section (Journal Info Card) ── */}
      <div style={{ ...cardStyle, padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <img
            src={currentJournal.image ? `${import.meta.env.VITE_API_URL.replace('/api', '')}/${currentJournal.image.replace(/\\/g, '/')}` : `https://picsum.photos/seed/${currentJournal.id}/160/140`}
            alt="journal-pic"
            style={{ width: '90px', height: '110px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #E5E7EB', flexShrink: 0 }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
            <span style={badgeStyle}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#137333' }} /> {currentJournal.status}</span>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '2px 0', lineHeight: 1.4 }}>
              {currentJournal.title}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#4B5563' }}>
              <FiBookOpen size={14} color="#6B7280" /> Department of {currentJournal.dept}
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>
              <span style={{ fontWeight: 600, color: '#374151' }}>Authors:</span> {currentJournal.primaryAuthor}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#4B5563', marginTop: '2px' }}>
              <span style={{ fontWeight: 600 }}>Submission ID:</span> {currentJournal.id}
              <FiCopy size={13} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => copyToClipboard(currentJournal.id)} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '24px', background: '#F8FAFC', padding: '16px 20px', borderRadius: '12px', border: '1px solid #F1F5F9' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#6B7280', marginBottom: '4px' }}>
                <FiCalendar size={13} /> Submitted On
              </div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>{currentJournal.date}</p>
              <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>10:30 AM</p>
            </div>
            <div style={{ width: '1px', background: '#E5E7EB' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#6B7280', marginBottom: '4px' }}>
                <FiCalendar size={13} /> Last Updated
              </div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>{currentJournal.date}</p>
              <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>11:20 AM</p>
            </div>
            <div style={{ width: '1px', background: '#E5E7EB' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#6B7280', marginBottom: '4px' }}>
                <FiInfo size={13} /> Current Status
              </div>
              <span style={{ ...badgeStyle, padding: '3px 8px', fontSize: '11px' }}><div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#137333' }} /> {currentJournal.status}</span>
              <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '4px 0 0' }}>{currentJournal.date}, 11:20 AM</p>
            </div>
          </div>
        </div>

        {/* Horizontal Progress Bar */}
        <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', margin: '0 10px' }}>
          <div style={{ position: 'absolute', top: '34px', left: '8%', right: '8%', height: '2.5px', background: '#2563EB', zIndex: 0 }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 1, flex: 1 }}>
            <div style={{ background: '#22C55E', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #fff', boxShadow: '0 0 0 1px #22C55E' }}>
              <FiCheck size={14} color="#fff" />
            </div>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#111827' }}>Submitted</span>
            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>12 May 2024</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 1, flex: 1 }}>
            <div style={{ background: '#22C55E', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #fff', boxShadow: '0 0 0 1px #22C55E' }}>
              <FiCheck size={14} color="#fff" />
            </div>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#111827' }}>Under Review</span>
            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>14 May 2024</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 1, flex: 1 }}>
            <div style={{ background: '#22C55E', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #fff', boxShadow: '0 0 0 1px #22C55E' }}>
              <FiCheck size={14} color="#fff" />
            </div>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#111827' }}>Review Completed</span>
            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>18 May 2024</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 1, flex: 1 }}>
            <div style={{ background: '#22C55E', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #fff', boxShadow: '0 0 0 1px #22C55E' }}>
              <FiCheck size={14} color="#fff" />
            </div>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#111827' }}>Accepted</span>
            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>19 May 2024</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 1, flex: 1 }}>
            <div style={{ background: '#2563EB', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #fff', boxShadow: '0 0 0 1px #2563EB' }}>
              <FiBook size={12} color="#fff" />
            </div>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#2563EB' }}>Published</span>
            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>20 May 2024</span>
          </div>
        </div>

      </div>

      {/* ── Lower Section (Timeline + Summary Panels) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.1fr', gap: '16px' }}>

        {/* Timeline List */}
        <div style={{ ...cardStyle, padding: '24px' }}>
          <h3 style={{ fontSize: '15.5px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '0 0 20px' }}>Submission Timeline</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '17px', top: '24px', bottom: '24px', width: '2px', background: '#E5E7EB', zIndex: 0 }} />

            <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
              <div style={timelineIconStyle('#22C55E', '#DCFCE7')}>
                <FiCheck size={16} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: 0 }}>Submitted</h4>
                  <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>12 May 2024, 10:30 AM</span>
                </div>
                <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>Your manuscript has been successfully submitted.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
              <div style={timelineIconStyle('#D97706', '#FEF3C7')}>
                <FiSearch size={14} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: 0 }}>Under Review</h4>
                  <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>14 May 2024, 02:15 PM</span>
                </div>
                <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>Your manuscript is now under review by the editorial team.</p>
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
                <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>The review process is completed. The editorial team is making a decision.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
              <div style={timelineIconStyle('#059669', '#D1FAE5')}>
                <FiCheckCircle size={15} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: 0 }}>Accepted</h4>
                  <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>19 May 2024, 05:20 PM</span>
                </div>
                <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>Congratulations! Your manuscript has been accepted for publication.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
              <div style={timelineIconStyle('#2563EB', '#EFF6FF')}>
                <FiBook size={14} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#2563EB', margin: 0 }}>Published</h4>
                  <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>20 May 2024, 11:20 AM</span>
                </div>
                <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>Your article has been published successfully. It is now available online.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Info panels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Submission Summary */}
          <div style={{ ...cardStyle, padding: '20px 22px' }}>
            <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '0 0 16px' }}>Submission Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#6B7280' }}>
                  <FiPaperclip size={14} /> Total Files
                </div>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>4 Files</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#6B7280' }}>
                  <FiFileText size={14} /> Total Pages
                </div>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>12 Pages</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#6B7280' }}>
                  <FiBookOpen size={14} /> Word Count
                </div>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>5,426 Words</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#6B7280' }}>
                  <FiInfo size={14} /> DOI
                </div>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#2563EB', cursor: 'pointer' }} onClick={() => copyToClipboard('10.1234/ijcs.2024.0512')}>10.1234/ijcs.2024.0512</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#6B7280', flexShrink: 0 }}>
                  <FiBook size={14} /> Journal
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827', textAlign: 'right', lineHeight: 1.4, maxWidth: '160px' }}>
                  International Journal of Computer Science (IJCS)
                </span>
              </div>
            </div>
          </div>

          {/* Handling Editor */}
          <div style={{ ...cardStyle, padding: '18px 20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '0 0 14px' }}>Handling Editor</h3>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                alt="editor-pic"
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Dr. Neha Kapoor</span>
                <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 500 }}>Editor, IJCS Publications</span>
                <a href="mailto:neha.kapoor@ijcs.org" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#2563EB', fontWeight: 600, textDecoration: 'none', marginTop: '2px' }}>
                  <FiMail size={11} /> neha.kapoor@ijcs.org
                </a>
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

      {/* Footer Alert Banner */}
      <div style={{ ...cardStyle, background: 'linear-gradient(to right, #F0FDF4, #DCFCE7)', border: '1px solid #BBF7D0', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#22C55E', borderRadius: '50%', padding: '6px', display: 'flex' }}>
            <FiCheck size={14} color="#fff" />
          </div>
          <div>
            <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#14532D', margin: '0 0 2px' }}>Your article is now published!</h4>
            <p style={{ fontSize: '12px', color: '#15803D', margin: 0 }}>Thank you for contributing to the research community.</p>
          </div>
        </div>
        <a href={`http://localhost:5175/journals/${currentJournal.id}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1px solid #86EFAC', color: '#166534', padding: '8px 16px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>
          View Published Article <FiExternalLink size={13} />
        </a>
      </div>

    </div>
  );
};

export default TrackStatus;
