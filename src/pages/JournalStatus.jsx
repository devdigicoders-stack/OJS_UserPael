import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiChevronRight, FiUploadCloud, FiEye, FiDownload,
  FiMoreVertical, FiSearch, FiFileText, FiClock,
  FiCheckCircle, FiXCircle, FiRefreshCw, FiCopy, FiFilter
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useJournalContext } from '../context/JournalContext';

const JournalStatus = () => {
  const navigate = useNavigate();
  const { journals } = useJournalContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied: ${text}`);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Published': return { background: '#DCFCE7', color: '#16A34A' };
      case 'Under Review': return { background: '#FEF3C7', color: '#D97706' };
      case 'Processing': return { background: '#EFF6FF', color: '#2563EB' };
      case 'Rejected': return { background: '#FEE2E2', color: '#DC2626' };
      default: return { background: '#F3F4F6', color: '#4B5563' };
    }
  };

  const cardStyle = {
    background: '#fff', borderRadius: '14px',
    border: '1px solid #E9ECF0', boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
  };

  const selectStyle = {
    padding: '8px 12px', borderRadius: '8px', border: '1px solid #E5E7EB',
    fontSize: '13px', color: '#4B5563', outline: 'none', background: '#fff',
    cursor: 'pointer'
  };

  const inputStyle = {
    width: '100%', padding: '8px 12px', borderRadius: '8px',
    border: '1px solid #E5E7EB', fontSize: '13px', color: '#111827',
    outline: 'none', transition: 'border 0.2s',
  };

  // Filter Journals
  const filteredJournals = journals.filter(j => {
    const matchSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase()) || j.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || j.status === statusFilter;
    const matchYear = yearFilter === 'All' || j.date.includes(yearFilter);
    return matchSearch && matchStatus && matchYear;
  });

  const STATS = [
    { label: 'Total Submissions', count: journals.length, color: '#EFF6FF', textColor: '#2563EB', icon: FiFileText },
    { label: 'Under Review', count: journals.filter(j => j.status === 'Under Review').length, color: '#FEF3C7', textColor: '#D97706', icon: FiClock },
    { label: 'Processing', count: journals.filter(j => j.status === 'Processing').length, color: '#EFF6FF', textColor: '#3B82F6', icon: FiRefreshCw },
    { label: 'Published', count: journals.filter(j => j.status === 'Published').length, color: '#DCFCE7', textColor: '#16A34A', icon: FiCheckCircle },
    { label: 'Rejected', count: journals.filter(j => j.status === 'Rejected').length, color: '#FEE2E2', textColor: '#DC2626', icon: FiXCircle },
  ];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* ── Breadcrumb & Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#9CA3AF' }}>
            <Link to="/dashboard" style={{ color: '#6B7280', textDecoration: 'none', fontWeight: 500 }}>Dashboard</Link>
            <FiChevronRight size={13} />
            <span style={{ color: '#2563EB', fontWeight: 600 }}>My Journals</span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '6px 0 2px' }}>My Journals</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>View and manage all the journals you have submitted.</p>
        </div>
        <button
          onClick={() => navigate('/dashboard/upload-journal')}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#2563EB', color: '#fff', border: 'none',
            borderRadius: '10px', padding: '10px 18px',
            fontWeight: 600, fontSize: '13.5px', cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#1D4ED8'}
          onMouseLeave={e => e.currentTarget.style.background = '#2563EB'}
        >
          <FiUploadCloud size={16} /> Upload New Journal
        </button>
      </div>

      {/* ── Stats Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
        {STATS.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} style={{ ...cardStyle, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ background: s.color, borderRadius: '8px', padding: '8px', display: 'flex' }}>
                  <Icon size={16} color={s.textColor} />
                </div>
                <span style={{ fontSize: '12.5px', color: '#9CA3AF', fontWeight: 500 }}>{s.label}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '4px' }}>
                <span style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>{s.count}</span>
                <span style={{ fontSize: '11px', color: s.textColor, fontWeight: 600, cursor: 'pointer' }}>View all →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Filter & Search Controls ── */}
      <div style={{ ...cardStyle, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '320px' }}>
            <FiSearch size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by title, ID or keyword..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ ...inputStyle, paddingLeft: '36px', height: '36px' }}
            />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={selectStyle}>
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Under Review">Under Review</option>
            <option value="Processing">Processing</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select value={yearFilter} onChange={e => setYearFilter(e.target.value)} style={selectStyle}>
            <option value="All">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <button style={{ ...selectStyle, display: 'flex', alignItems: 'center', gap: '6px', background: '#F8FAFC' }}>
            <FiFilter size={14} /> Filter
          </button>
        </div>
      </div>

      {/* ── Table Container ── */}
      <div style={{ ...cardStyle, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E5E7EB' }}>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>#</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>Journal Details</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>Submission ID</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>Status</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>Submitted On</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#4B5563', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '13px', color: '#374151' }}>
              {filteredJournals.length > 0 ? filteredJournals.map((j, idx) => (
                <tr key={j.id} style={{ borderBottom: '1px solid #F3F4F6', background: idx % 2 === 0 ? '#fff' : '#FAFBFC' }}>
                  <td style={{ padding: '16px', fontWeight: 600, color: '#6B7280' }}>{idx + 1}</td>
                  <td style={{ padding: '16px', maxWidth: '340px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <span style={{ fontWeight: 700, color: '#111827', lineHeight: 1.4 }}>{j.title}</span>
                      <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 500 }}>Department of {j.dept}</span>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>Category: {j.category}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#4B5563' }}>
                      {j.id}
                      <FiCopy size={13} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => copyToClipboard(j.id)} />
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600,
                      ...getStatusStyle(j.status)
                    }}>
                      {j.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px', color: '#4B5563', lineHeight: 1.4 }}>
                    {j.date}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                      <button onClick={() => navigate('/dashboard/history')} style={{ background: '#EFF6FF', border: 'none', color: '#2563EB', padding: '6px', borderRadius: '6px', cursor: 'pointer', display: 'flex' }} title="View Timeline">
                        <FiClock size={14} />
                      </button>
                      <button onClick={() => navigate('/dashboard/journal-details')} style={{ background: '#EFF6FF', border: 'none', color: '#2563EB', padding: '6px', borderRadius: '6px', cursor: 'pointer', display: 'flex' }} title="View Details">
                        <FiEye size={14} />
                      </button>
                      <button style={{ background: '#EFF6FF', border: 'none', color: '#2563EB', padding: '6px', borderRadius: '6px', cursor: 'pointer', display: 'flex' }}>
                        <FiDownload size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
                    No journals found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JournalStatus;
