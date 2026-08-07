import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FiSearch, FiCalendar, FiRefreshCw, FiChevronRight,
  FiFileText, FiEye, FiDownload, FiMail, FiCopy,
  FiCheck, FiClock, FiAlertCircle, FiXCircle,
  FiCheckCircle, FiInfo, FiFilter, FiBarChart2,
  FiArrowRight, FiBook, FiUploadCloud
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useJournalContext } from '../context/JournalContext';
import Tooltip from '../components/Tooltip';

const JournalHistory = () => {
  const { id } = useParams();
  const { journals } = useJournalContext();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const currentJournal = journals.find(j => j.id === id) || journals[0]; // Fetch correct journal

  const copyDOI = () => {
    if(!currentJournal) return;
    navigator.clipboard.writeText(currentJournal.id);
    toast.success('ID copied!');
  };

  const getStagesForStatus = (status) => {
    const defaultStages = [
      { stage: 'Submission', icon: FiUploadCloud, desc: 'Article submitted successfully' },
      { stage: 'Editorial Screening', icon: FiSearch, desc: 'Initial screening by editorial team' },
      { stage: 'Peer Review', icon: FiEye, desc: 'Under peer review process' },
      { stage: 'Review Completed', icon: FiCheckCircle, desc: 'Reviews submitted by reviewers' },
      { stage: 'Review & Decision', icon: FiAlertCircle, desc: 'Editorial decision in progress' },
      { stage: 'Publication', icon: FiBook, desc: 'Article published online' }
    ];

    let currentStepIndex = 0;
    
    switch(status) {
      case 'Pending Review':
        currentStepIndex = 1;
        break;
      case 'Under Review':
        currentStepIndex = 2;
        break;
      case 'Reviewed':
        currentStepIndex = 3;
        break;
      case 'Processed':
      case 'Approved':
      case 'Rejected':
        currentStepIndex = 4;
        break;
      case 'Published':
        currentStepIndex = 5;
        break;
      default:
        currentStepIndex = 0;
    }

    return defaultStages.map((s, idx) => {
      let stageStatus = 'Upcoming';
      if (idx < currentStepIndex) stageStatus = 'Completed';
      if (idx === currentStepIndex) {
        if (status === 'Rejected') stageStatus = 'Rejected';
        else if (status === 'Published') stageStatus = 'Completed';
        else stageStatus = 'Under Review'; // In progress
      }
      if (status === 'Published') stageStatus = 'Completed';

      return {
        id: idx + 1,
        stage: s.stage,
        icon: s.icon,
        desc: s.desc,
        status: stageStatus,
        datetime: stageStatus !== 'Upcoming' ? currentJournal?.date : '-',
        duration: '-',
        remarks: stageStatus,
        link: null,
      };
    });
  };

  const stages = currentJournal ? getStagesForStatus(currentJournal.status) : [];

  const filtered = stages.filter(s => {
    const matchSearch = s.stage.toLowerCase().includes(search.toLowerCase()) ||
      s.remarks.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All Status' || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: stages.length,
    inReview: stages.filter(s => s.status === 'Under Review').length,
    underRevision: 0,
    accepted: stages.filter(s => s.status === 'Completed').length,
    published: currentJournal?.status === 'Published' ? 1 : 0,
    rejected: currentJournal?.status === 'Rejected' ? 1 : 0,
  };

  const card = {
    background: '#fff', borderRadius: '14px', border: '1px solid #E9ECF0', boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
  };

  const statusColors = {
    Completed: { bg: '#E6F4EA', color: '#137333' },
    'Under Review': { bg: '#FEF3C7', color: '#92400E' },
    Published: { bg: '#DBEAFE', color: '#1D4ED8' },
    Rejected: { bg: '#FEE2E2', color: '#991B1B' },
    Upcoming: { bg: '#F3F4F6', color: '#6B7280' },
  };

  const badge = (status) => ({
    display: 'inline-flex', alignItems: 'center', gap: '4px',
    padding: '4px 10px', borderRadius: '20px', fontSize: '11.5px', fontWeight: 600,
    background: statusColors[status]?.bg || '#F3F4F6',
    color: statusColors[status]?.color || '#374151',
  });

  if (!currentJournal) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
        <FiFileText size={40} style={{ opacity: 0.5, marginBottom: '16px' }} />
        <h2>No Journal History Found</h2>
        <p>You haven't submitted any journals yet.</p>
        <Link to="/dashboard/upload-journal" style={{ display: 'inline-block', marginTop: '20px', background: '#2563EB', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none' }}>
          Upload Journal
        </Link>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>
        <Link to="/dashboard" style={{ color: '#6B7280', textDecoration: 'none' }}>Dashboard</Link>
        <FiChevronRight size={14} />
        <Link to="/dashboard/journal-status" style={{ color: '#6B7280', textDecoration: 'none' }}>My Journals</Link>
        <FiChevronRight size={14} />
        <span style={{ color: '#111827', fontWeight: 500 }}>Submission History</span>
      </div>

      <div style={{ marginBottom: '22px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>Submission History</h1>
        <p style={{ fontSize: '13.5px', color: '#6B7280', marginTop: '4px' }}>View the status and history of your recent article.</p>
      </div>

      {/* Article Header Card */}
      <div style={{ ...card, padding: '20px 24px', marginBottom: '20px', display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{
          width: '90px', height: '110px', borderRadius: '10px', flexShrink: 0,
          background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 60%, #0F766E 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          color: '#fff', border: '1px solid rgba(255,255,255,0.15)',
        }}>
          <p style={{ fontWeight: 800, fontSize: '16px', margin: 0, letterSpacing: '1px' }}>OJS</p>
          <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.7)', textAlign: 'center', margin: '4px 0', lineHeight: 1.4 }}>Open Journal Systems</p>
        </div>

        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={badge(currentJournal.status)}>
              ● {currentJournal.status}
            </span>
          </div>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#111827', margin: '0 0 6px', fontFamily: 'Poppins, sans-serif' }}>
            {currentJournal.title}
          </h2>
          <p style={{ fontSize: '12.5px', color: '#6B7280', margin: '0 0 4px' }}>🏛 Department: {currentJournal.dept}</p>
          <p style={{ fontSize: '12.5px', color: '#6B7280', margin: '0 0 4px' }}>Category: {currentJournal.category}</p>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', minWidth: '110px' }}>
            <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 500, margin: '0 0 4px' }}>First Submitted</p>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: '0 0 2px', fontFamily: 'Poppins, sans-serif' }}>{currentJournal.date}</p>
          </div>
          <div style={{ textAlign: 'center', minWidth: '130px' }}>
            <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 500, margin: '0 0 4px' }}>🔗 Article ID</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#2563EB', margin: 0 }}>{currentJournal.id}</p>
              <Tooltip text="Copy ID">
                <button onClick={copyDOI} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6B7280', padding: 0, display: 'flex' }}>
                  <FiCopy size={12} />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '500px' }}>
          <div style={{ ...card, padding: '14px 18px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '7px 12px', flex: 1, minWidth: '160px' }}>
              <FiSearch size={14} color="#9CA3AF" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search stages..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', color: '#374151', flex: 1 }} />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ border: '1px solid #E5E7EB', borderRadius: '8px', padding: '7px 12px', fontSize: '13px', color: '#374151', background: '#fff', outline: 'none', cursor: 'pointer' }}>
              <option>All Status</option><option>Completed</option><option>Under Review</option><option>Upcoming</option>
            </select>
          </div>

          <div style={{ ...card, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                    {['#', 'Stage', 'Status', 'Date & Time', 'Action / Remarks'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#6B7280', fontSize: '12px', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => {
                    const Icon = row.icon;
                    return (
                      <tr key={row.id} style={{ borderBottom: '1px solid #F3F4F6', transition: 'background 0.15s' }}>
                        <td style={{ padding: '14px 16px', color: '#374151', fontWeight: 600 }}>{row.id}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Icon size={15} color="#2563EB" />
                            </div>
                            <div>
                              <p style={{ fontWeight: 600, color: '#111827', margin: 0, fontSize: '13px' }}>{row.stage}</p>
                              <p style={{ fontSize: '11.5px', color: '#9CA3AF', margin: 0 }}>{row.desc}</p>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={badge(row.status)}>{row.status}</span>
                        </td>
                        <td style={{ padding: '14px 16px', color: '#374151', whiteSpace: 'nowrap', fontSize: '12.5px' }}>{row.datetime}</td>
                        <td style={{ padding: '14px 16px', color: '#374151', fontSize: '12.5px' }}>{row.remarks}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalHistory;
