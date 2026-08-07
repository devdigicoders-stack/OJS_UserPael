import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiChevronRight, FiSearch, FiX, FiAlertCircle, FiXCircle,
  FiEye, FiDownload, FiRefreshCw, FiUploadCloud, FiMail,
  FiCalendar, FiUsers, FiFileText, FiBookOpen, FiEdit3,
  FiArrowRight, FiInfo, FiClock, FiCheckCircle, FiFilter,
  FiList, FiGrid, FiChevronDown, FiChevronUp, FiSend,
  FiBook, FiPaperclip, FiMessageSquare
} from 'react-icons/fi';
import { toast } from 'react-toastify';

import { useJournalContext } from '../context/JournalContext';

const STAGE_LABELS = {
  'Peer Review': { color: '#D97706', bg: '#FFFBEB' },
  'Editorial Screening': { color: '#7C3AED', bg: '#F5F3FF' },
  'Final Decision': { color: '#DC2626', bg: '#FEF2F2' },
};

const RejectedJournals = () => {
  const { journals, updateJournalStatus } = useJournalContext();

  const rejectedData = journals.filter(j => j.status === 'Rejected').map(j => ({
    id: j.id,
    title: j.title,
    journal: j.category || 'General',
    dept: `Department of ${j.dept}`,
    authors: [j.primaryAuthor || 'Unknown Author'],
    submittedDate: j.date,
    rejectedDate: j.date,
    category: j.category,
    type: 'Research Article',
    stage: 'Peer Review',
    editor: 'Dr. Editor',
    editorEmail: 'editor@journal.org',
    rejectionReasons: [
      'The manuscript does not meet the journal\'s scope.',
      'Literature review is incomplete.',
    ],
    reviewerComments: [
      { reviewer: 'Reviewer 1', comment: 'The methodology section lacks rigour.', rating: 2 },
    ],
    suggestions: [
      'Expand data collection for statistical significance.',
      'Update literature review with recent studies.',
    ],
    canResubmit: true,
    abstract: j.abstract || 'Abstract not available.',
    keywords: j.keywords || ['Research', j.category],
    color: '#DC2626',
    abbr: j.category ? j.category.substring(0,3).toUpperCase() : 'JNL',
  }));

  const [search, setSearch] = useState('');
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [activeModalTab, setActiveModalTab] = useState('reasons');
  const [resubmitText, setResubmitText] = useState('');
  const [showResubmit, setShowResubmit] = useState(false);

  const filtered = rejectedData.filter(j => {
    const q = search.toLowerCase();
    return j.title.toLowerCase().includes(q) ||
      j.journal.toLowerCase().includes(q) ||
      j.category.toLowerCase().includes(q);
  });

  const card = {
    background: '#fff',
    borderRadius: '14px',
    border: '1px solid #E9ECF0',
    boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
  };

  const handleResubmit = (j) => {
    updateJournalStatus(j.id, 'Processing');
    toast.success(`Resubmission initiated for "${j.title.substring(0, 40)}..."`);
    setSelectedJournal(null);
    setResubmitText('');
  };

  const handleDownload = (fileName) => {
    toast.success(`Starting download: ${fileName}`);
    setTimeout(() => toast.success(`${fileName} downloaded successfully!`), 1500);
  };

  const renderStars = (rating) => (
    <span>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= rating ? '#F59E0B' : '#D1D5DB', fontSize: '14px' }}>★</span>
      ))}
    </span>
  );

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>
        <Link to="/dashboard" style={{ color: '#6B7280', textDecoration: 'none' }}>Dashboard</Link>
        <FiChevronRight size={14} />
        <span style={{ color: '#111827', fontWeight: 500 }}>Rejected Journals</span>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>
            Rejected Journals
          </h1>
          <p style={{ fontSize: '13.5px', color: '#6B7280', margin: '4px 0 0' }}>
            Review rejection reasons, reviewer feedback, and resubmit improved versions.
          </p>
        </div>
        <Link to="/dashboard/upload-journal"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#fff', fontWeight: 600, fontSize: '13px', borderRadius: '10px', padding: '10px 18px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(37,99,235,0.35)' }}>
          <FiUploadCloud size={15} /> Submit New Article
        </Link>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))', gap: '14px', marginBottom: '22px' }}>
        {[
          { label: 'Total Rejected', val: rejectedData.length, icon: FiXCircle, color: '#DC2626', bg: '#FEF2F2' },
          { label: 'Can Resubmit', val: rejectedData.filter(j => j.canResubmit).length, icon: FiRefreshCw, color: '#2563EB', bg: '#EFF6FF' },
          { label: 'At Peer Review', val: rejectedData.filter(j => j.stage === 'Peer Review').length, icon: FiEye, color: '#D97706', bg: '#FFFBEB' },
          { label: 'At Screening', val: rejectedData.filter(j => j.stage === 'Editorial Screening').length, icon: FiFilter, color: '#7C3AED', bg: '#F5F3FF' },
        ].map(({ label, val, icon: Icon, color, bg }) => (
          <div key={label} style={{ ...card, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={18} color={color} />
            </div>
            <div>
              <p style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: 0, fontFamily: 'Poppins, sans-serif', lineHeight: 1 }}>{val}</p>
              <p style={{ fontSize: '12px', color: '#6B7280', margin: '3px 0 0' }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Info Banner */}
      <div style={{ background: 'linear-gradient(135deg, #FEF3C7, #FFFBEB)', border: '1px solid #FDE68A', borderRadius: '12px', padding: '14px 18px', marginBottom: '18px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <FiInfo size={17} color="#D97706" style={{ flexShrink: 0, marginTop: '1px' }} />
        <div>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#92400E', margin: '0 0 2px' }}>Don't be discouraged — rejections are part of the research journey!</p>
          <p style={{ fontSize: '12.5px', color: '#B45309', margin: 0, lineHeight: 1.5 }}>
            Review the detailed feedback below, revise your manuscript accordingly, and resubmit with confidence.
            Articles that are substantially revised often get accepted upon resubmission.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ ...card, padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '7px 12px', flex: 1, minWidth: '200px' }}>
          <FiSearch size={14} color="#9CA3AF" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by title, journal, category..."
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', color: '#374151', flex: 1 }} />
          {search && <button onClick={() => setSearch('')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 0, display: 'flex' }}><FiX size={14} /></button>}
        </div>

        <div style={{ display: 'flex', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
          {[{ mode: 'card', Icon: FiGrid }, { mode: 'list', Icon: FiList }].map(({ mode, Icon }) => (
            <button key={mode} onClick={() => setViewMode(mode)}
              style={{ padding: '8px 12px', border: 'none', cursor: 'pointer', background: viewMode === mode ? '#DC2626' : '#fff', color: viewMode === mode ? '#fff' : '#6B7280', display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}>
              <Icon size={15} />
            </button>
          ))}
        </div>
        <span style={{ fontSize: '12px', color: '#9CA3AF', marginLeft: 'auto' }}>{filtered.length} article{filtered.length !== 1 ? 's' : ''} found</span>
      </div>

      {/* ─── CARD VIEW ─── */}
      {viewMode === 'card' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.length === 0 && (
            <div style={{ ...card, padding: '48px', textAlign: 'center' }}>
              <FiXCircle size={40} color="#D1D5DB" style={{ marginBottom: '12px' }} />
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#374151', margin: 0 }}>No rejected articles found</p>
            </div>
          )}
          {filtered.map(j => {
            const isExpanded = expandedId === j.id;
            return (
              <div key={j.id} style={{ ...card, overflow: 'hidden', transition: 'box-shadow 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.10)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.05)'}
              >
                {/* Red top bar */}
                <div style={{ height: '4px', background: `linear-gradient(90deg, ${j.color}, ${j.color}66)` }} />

                <div style={{ padding: '20px 24px', display: 'flex', gap: '18px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                  {/* Cover */}
                  <div style={{ width: '76px', height: '90px', borderRadius: '10px', flexShrink: 0, background: `linear-gradient(135deg, ${j.color}dd, ${j.color}88)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <p style={{ fontWeight: 800, fontSize: '13px', margin: 0 }}>{j.abbr}</p>
                    <FiBook size={20} style={{ marginTop: '8px', opacity: 0.7 }} />
                  </div>

                  {/* Main Info */}
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    {/* Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                      <span style={{ background: '#FEE2E2', color: '#991B1B', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FiXCircle size={10} /> Rejected
                      </span>
                      <span style={{ background: STAGE_LABELS[j.stage]?.bg || '#F9FAFB', color: STAGE_LABELS[j.stage]?.color || '#6B7280', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px' }}>
                        Stage: {j.stage}
                      </span>
                      {j.canResubmit && (
                        <span style={{ background: '#ECFDF5', color: '#059669', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <FiRefreshCw size={10} /> Can Resubmit
                        </span>
                      )}
                      <span style={{ background: '#F9FAFB', color: '#6B7280', fontSize: '11px', padding: '3px 10px', borderRadius: '20px' }}>{j.type}</span>
                    </div>

                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: '0 0 5px', fontFamily: 'Poppins, sans-serif', lineHeight: 1.4 }}>{j.title}</h3>
                    <p style={{ fontSize: '12.5px', color: '#2563EB', fontWeight: 500, margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <FiBookOpen size={12} /> {j.journal}
                    </p>
                    <p style={{ fontSize: '12.5px', color: '#6B7280', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <FiUsers size={12} /> {j.authors.join(', ')}
                    </p>

                    {/* Dates + Editor */}
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FiCalendar size={11} color="#9CA3AF" />
                        <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>Submitted:</span>
                        <span style={{ fontSize: '11.5px', color: '#374151', fontWeight: 500 }}>{j.submittedDate}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FiXCircle size={11} color="#DC2626" />
                        <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>Rejected:</span>
                        <span style={{ fontSize: '11.5px', color: '#DC2626', fontWeight: 600 }}>{j.rejectedDate}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FiMail size={11} color="#9CA3AF" />
                        <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>Editor:</span>
                        <span style={{ fontSize: '11.5px', color: '#374151', fontWeight: 500 }}>{j.editor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', minWidth: '150px' }}>
                    <button onClick={() => setSelectedJournal(j)}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px 14px', borderRadius: '9px', border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #DC2626, #B91C1C)', color: '#fff', fontSize: '12.5px', fontWeight: 600 }}>
                      <FiEye size={13} /> View Full Details
                    </button>
                    {j.canResubmit && (
                      <button onClick={() => { setSelectedJournal(j); setActiveModalTab('resubmit'); }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px 14px', borderRadius: '9px', border: '1.5px solid #2563EB', background: '#EFF6FF', color: '#2563EB', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
                        <FiRefreshCw size={13} /> Resubmit Article
                      </button>
                    )}
                    <button onClick={() => handleDownload('Rejection_Letter.pdf')}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px 14px', borderRadius: '9px', border: '1.5px solid #E5E7EB', background: '#fff', color: '#374151', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
                      <FiDownload size={13} /> Download Letter
                    </button>
                    <button onClick={() => toast.info(`Emailing ${j.editorEmail}...`)}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px 14px', borderRadius: '9px', border: '1.5px solid #E5E7EB', background: '#fff', color: '#374151', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
                      <FiMail size={13} /> Contact Editor
                    </button>
                  </div>
                </div>

                {/* Rejection Reasons Preview */}
                <div style={{ borderTop: '1px solid #FEE2E2', background: '#FFF5F5', padding: '14px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => setExpandedId(isExpanded ? null : j.id)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiAlertCircle size={15} color="#DC2626" />
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#991B1B' }}>
                        {j.rejectionReasons.length} Rejection Reason{j.rejectionReasons.length > 1 ? 's' : ''} — Click to {isExpanded ? 'collapse' : 'expand'}
                      </span>
                    </div>
                    {isExpanded ? <FiChevronUp size={16} color="#DC2626" /> : <FiChevronDown size={16} color="#DC2626" />}
                  </div>

                  {isExpanded && (
                    <div style={{ marginTop: '12px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                        {j.rejectionReasons.map((r, i) => (
                          <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#fff', border: '1px solid #FECACA', borderRadius: '8px', padding: '10px 14px' }}>
                            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <span style={{ fontSize: '11px', fontWeight: 700, color: '#DC2626' }}>{i + 1}</span>
                            </div>
                            <p style={{ fontSize: '13px', color: '#374151', margin: 0, lineHeight: 1.5 }}>{r}</p>
                          </div>
                        ))}
                      </div>

                      {/* Keywords */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>Keywords:</span>
                        {j.keywords.map(kw => (
                          <span key={kw} style={{ background: '#EFF6FF', color: '#2563EB', fontSize: '11.5px', fontWeight: 500, padding: '3px 10px', borderRadius: '20px' }}>{kw}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── LIST VIEW ─── */}
      {viewMode === 'list' && (
        <div style={{ ...card, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#FEF2F2', borderBottom: '1px solid #FECACA' }}>
                {['ID', 'Title & Journal', 'Rejected On', 'Stage', 'Resubmit?', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#6B7280', fontSize: '12px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(j => (
                <tr key={j.id} style={{ borderBottom: '1px solid #F3F4F6', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#FFF5F5'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ background: '#FEE2E2', color: '#991B1B', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '6px' }}>{j.id}</span>
                  </td>
                  <td style={{ padding: '14px 16px', maxWidth: '260px' }}>
                    <p style={{ fontWeight: 600, color: '#111827', margin: '0 0 2px', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{j.title}</p>
                    <p style={{ fontSize: '11.5px', color: '#6B7280', margin: 0 }}>{j.journal}</p>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#DC2626', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap' }}>{j.rejectedDate}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ background: STAGE_LABELS[j.stage]?.bg, color: STAGE_LABELS[j.stage]?.color, fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px' }}>{j.stage}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    {j.canResubmit
                      ? <span style={{ background: '#ECFDF5', color: '#059669', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px' }}>✓ Yes</span>
                      : <span style={{ background: '#F3F4F6', color: '#9CA3AF', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px' }}>No</span>}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => setSelectedJournal(j)} style={{ background: '#FEE2E2', border: 'none', borderRadius: '7px', padding: '6px', cursor: 'pointer', color: '#DC2626', display: 'flex' }} title="View"><FiEye size={14} /></button>
                      {j.canResubmit && <button onClick={() => { setSelectedJournal(j); setActiveModalTab('resubmit'); }} style={{ background: '#EFF6FF', border: 'none', borderRadius: '7px', padding: '6px', cursor: 'pointer', color: '#2563EB', display: 'flex' }} title="Resubmit"><FiRefreshCw size={14} /></button>}
                      <button onClick={() => handleDownload('Rejection_Letter.pdf')} style={{ background: '#F5F3FF', border: 'none', borderRadius: '7px', padding: '6px', cursor: 'pointer', color: '#7C3AED', display: 'flex' }} title="Download"><FiDownload size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF', fontSize: '13px' }}>No rejected articles found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── DETAIL MODAL ─── */}
      {selectedJournal && (
        <div onClick={() => { setSelectedJournal(null); setShowResubmit(false); }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: '#fff', borderRadius: '18px', width: '100%', maxWidth: '740px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>

            {/* Modal top bar */}
            <div style={{ height: '5px', background: `linear-gradient(90deg, ${selectedJournal.color}, ${selectedJournal.color}55)`, borderRadius: '18px 18px 0 0' }} />

            {/* Modal Header */}
            <div style={{ padding: '22px 26px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ background: '#FEE2E2', color: '#991B1B', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px' }}>✗ Rejected</span>
                  <span style={{ background: STAGE_LABELS[selectedJournal.stage]?.bg, color: STAGE_LABELS[selectedJournal.stage]?.color, fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px' }}>Stage: {selectedJournal.stage}</span>
                  {selectedJournal.canResubmit && <span style={{ background: '#ECFDF5', color: '#059669', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px' }}>✓ Eligible for Resubmission</span>}
                </div>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: 0, fontFamily: 'Poppins, sans-serif', lineHeight: 1.4 }}>
                  {selectedJournal.title}
                </h2>
                <p style={{ fontSize: '12.5px', color: '#2563EB', margin: '5px 0 0', fontWeight: 500 }}>{selectedJournal.journal}</p>
              </div>
              <button onClick={() => { setSelectedJournal(null); setShowResubmit(false); }}
                style={{ border: 'none', background: '#F3F4F6', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#6B7280', display: 'flex', flexShrink: 0 }}>
                <FiX size={18} />
              </button>
            </div>

            {/* Modal Tab Nav */}
            <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', padding: '0 26px' }}>
              {[
                { key: 'reasons', label: '✗ Rejection Reasons', icon: FiAlertCircle },
                { key: 'reviews', label: '💬 Reviewer Comments', icon: FiMessageSquare },
                { key: 'suggestions', label: '💡 Suggestions', icon: FiCheckCircle },
                { key: 'resubmit', label: '🔄 Resubmit', icon: FiRefreshCw },
              ].map(({ key, label }) => (
                <button key={key} onClick={() => setActiveModalTab(key)}
                  style={{ padding: '12px 14px', fontSize: '12.5px', fontWeight: activeModalTab === key ? 700 : 500, color: activeModalTab === key ? '#DC2626' : '#6B7280', borderBottom: `2.5px solid ${activeModalTab === key ? '#DC2626' : 'transparent'}`, border: 'none', background: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  {label}
                </button>
              ))}
            </div>

            <div style={{ padding: '22px 26px' }}>

              {/* TAB: Reasons */}
              {activeModalTab === 'reasons' && (
                <div>
                  <p style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Rejection Reasons ({selectedJournal.rejectionReasons.length})
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
                    {selectedJournal.rejectionReasons.map((r, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: '#FFF5F5', border: '1px solid #FECACA', borderRadius: '10px', padding: '14px 16px' }}>
                        <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#FEE2E2', border: '2px solid #FECACA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: '12px', fontWeight: 800, color: '#DC2626' }}>{i + 1}</span>
                        </div>
                        <p style={{ fontSize: '13.5px', color: '#374151', margin: 0, lineHeight: 1.6 }}>{r}</p>
                      </div>
                    ))}
                  </div>

                  {/* Abstract */}
                  <p style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Abstract</p>
                  <p style={{ fontSize: '13.5px', color: '#374151', lineHeight: 1.7, background: '#F9FAFB', padding: '14px', borderRadius: '10px', margin: '0 0 14px', border: '1px solid #F3F4F6' }}>{selectedJournal.abstract}</p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>Keywords:</span>
                    {selectedJournal.keywords.map(kw => (
                      <span key={kw} style={{ background: '#EFF6FF', color: '#2563EB', fontSize: '11.5px', padding: '3px 10px', borderRadius: '20px' }}>{kw}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: Reviewer Comments */}
              {activeModalTab === 'reviews' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {selectedJournal.reviewerComments.map((rc, i) => (
                    <div key={i} style={{ background: '#F9FAFB', borderRadius: '12px', padding: '16px', border: '1px solid #E5E7EB' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC2626, #B91C1C)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '13px' }}>
                            {rc.reviewer === 'Editor' ? 'Ed' : `R${i + 1}`}
                          </div>
                          <div>
                            <p style={{ fontWeight: 700, color: '#111827', margin: 0, fontSize: '13.5px' }}>{rc.reviewer}</p>
                            <p style={{ fontSize: '11px', color: '#9CA3AF', margin: 0 }}>Anonymous Review</p>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          {renderStars(rc.rating)}
                          <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>{rc.rating}/5 score</p>
                        </div>
                      </div>
                      <p style={{ fontSize: '13.5px', color: '#374151', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
                        "{rc.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: Suggestions */}
              {activeModalTab === 'suggestions' && (
                <div>
                  <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '10px', padding: '14px 16px', marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <FiInfo size={16} color="#059669" style={{ flexShrink: 0, marginTop: '1px' }} />
                    <p style={{ fontSize: '13px', color: '#065F46', margin: 0, lineHeight: 1.5 }}>
                      Follow these suggestions to significantly improve your chances of acceptance upon resubmission.
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {selectedJournal.suggestions.map((s, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '10px', padding: '12px 16px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: '11px', fontWeight: 800, color: '#fff' }}>{i + 1}</span>
                        </div>
                        <p style={{ fontSize: '13.5px', color: '#374151', margin: 0, lineHeight: 1.6 }}>{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: Resubmit */}
              {activeModalTab === 'resubmit' && (
                <div>
                  {selectedJournal.canResubmit ? (
                    <div>
                      <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '10px', padding: '14px 16px', marginBottom: '18px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <FiInfo size={16} color="#2563EB" style={{ flexShrink: 0, marginTop: '1px' }} />
                        <p style={{ fontSize: '13px', color: '#1E40AF', margin: 0, lineHeight: 1.5 }}>
                          This article is eligible for resubmission. Please address all rejection reasons and reviewer comments before resubmitting. Attach your revised manuscript and a response letter.
                        </p>
                      </div>

                      {/* Resubmit form */}
                      <div style={{ marginBottom: '14px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                          Response to Reviewers / Cover Note
                        </label>
                        <textarea
                          value={resubmitText}
                          onChange={e => setResubmitText(e.target.value)}
                          placeholder="Describe the changes you made in response to the reviewer comments..."
                          rows={5}
                          style={{ width: '100%', border: '1.5px solid #E5E7EB', borderRadius: '10px', padding: '12px 14px', fontSize: '13.5px', color: '#374151', outline: 'none', resize: 'vertical', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }}
                        />
                      </div>

                      {/* File upload area */}
                      <div style={{ border: '2px dashed #BFDBFE', borderRadius: '10px', padding: '20px', textAlign: 'center', background: '#F8FAFF', marginBottom: '16px', cursor: 'pointer' }}
                        onClick={() => toast.info('File picker would open here')}>
                        <FiPaperclip size={22} color="#2563EB" style={{ marginBottom: '8px' }} />
                        <p style={{ fontSize: '13.5px', fontWeight: 600, color: '#1D4ED8', margin: '0 0 4px' }}>Attach Revised Manuscript</p>
                        <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>PDF, DOCX up to 20MB — Click to browse or drag & drop</p>
                      </div>

                      <button
                        onClick={() => handleResubmit(selectedJournal)}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', borderRadius: '10px', border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#fff', fontSize: '14px', fontWeight: 700 }}>
                        <FiSend size={15} /> Submit Revised Manuscript
                      </button>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '30px 20px' }}>
                      <FiXCircle size={44} color="#D1D5DB" style={{ marginBottom: '12px' }} />
                      <p style={{ fontSize: '15px', fontWeight: 600, color: '#374151', margin: '0 0 6px' }}>Resubmission Not Available</p>
                      <p style={{ fontSize: '13px', color: '#9CA3AF', margin: '0 0 18px', lineHeight: 1.6 }}>
                        This article is not eligible for resubmission to this journal.<br />
                        Consider submitting to a different journal.
                      </p>
                      <Link to="/dashboard/upload-journal"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '10px', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '13px' }}>
                        <FiUploadCloud size={14} /> Submit to New Journal
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Modal Bottom actions */}
              {activeModalTab !== 'resubmit' && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                  <button onClick={() => handleDownload('Rejection_Letter.pdf')}
                    style={{ flex: 1, minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '11px', borderRadius: '10px', border: '1.5px solid #E5E7EB', background: '#fff', fontWeight: 600, fontSize: '13px', cursor: 'pointer', color: '#374151' }}>
                    <FiDownload size={14} /> Download Letter
                  </button>
                  <button onClick={() => toast.info(`Emailing ${selectedJournal.editorEmail}...`)}
                    style={{ flex: 1, minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '11px', borderRadius: '10px', border: '1.5px solid #E5E7EB', background: '#fff', fontWeight: 600, fontSize: '13px', cursor: 'pointer', color: '#374151' }}>
                    <FiMail size={14} /> Contact Editor
                  </button>
                  {selectedJournal.canResubmit && (
                    <button onClick={() => setActiveModalTab('resubmit')}
                      style={{ flex: 1, minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '11px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                      <FiRefreshCw size={14} /> Resubmit Article
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RejectedJournals;
