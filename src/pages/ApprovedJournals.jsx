import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiChevronRight, FiSearch, FiFilter, FiDownload, FiEye,
  FiExternalLink, FiShare2, FiCopy, FiCheck, FiBookOpen,
  FiCalendar, FiUsers, FiAward, FiTrendingUp, FiGlobe,
  FiStar, FiBarChart2, FiArrowRight, FiX, FiPrinter,
  FiMail, FiBook, FiGrid, FiList, FiRefreshCw, FiInfo,
  FiLink, FiTwitter, FiLinkedin, FiUploadCloud
} from 'react-icons/fi';
import { toast } from 'react-toastify';

import { useJournalContext } from '../context/JournalContext';

const FILTERS = ['All', 'Published', 'Online First'];
const SORT_OPTIONS = ['Newest First', 'Oldest First', 'Most Cited', 'Most Viewed'];

const ApprovedJournals = () => {
  const { journals } = useJournalContext();
  
  const journalsData = journals.filter(j => j.status === 'Published').map(j => ({
    id: j.id,
    title: j.title,
    journal: j.category || 'General',
    dept: `Department of ${j.dept}`,
    authors: [j.primaryAuthor || 'Unknown Author'],
    doi: `10.1234/${j.id.toLowerCase()}`,
    submittedDate: j.date,
    approvedDate: j.date,
    publishedDate: j.date,
    volume: 'Volume 1, Issue 1',
    pages: `${j.pages || '10'} pages`,
    status: j.status,
    category: j.category,
    type: 'Research Article',
    openAccess: true,
    views: Math.floor(Math.random() * 1000),
    downloads: Math.floor(Math.random() * 500),
    citations: Math.floor(Math.random() * 50),
    impactFactor: 4.5,
    abstract: j.abstract || 'Abstract not available.',
    keywords: j.keywords || ['Research', j.category],
    color: '#2563EB',
    abbr: j.category ? j.category.substring(0,3).toUpperCase() : 'JNL',
  }));

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest First');
  const [viewMode, setViewMode] = useState('card'); // 'card' | 'list'
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [copied, setCopied] = useState({});

  const copyDOI = (doi, id) => {
    navigator.clipboard.writeText(doi);
    setCopied(prev => ({ ...prev, [id]: true }));
    toast.success('DOI copied to clipboard!');
    setTimeout(() => setCopied(prev => ({ ...prev, [id]: false })), 2000);
  };

  const handleShare = (journal) => {
    navigator.clipboard.writeText(`https://doi.org/${journal.doi}`);
    toast.success('Article link copied for sharing!');
  };

  const filtered = journalsData
    .filter(j => {
      const q = search.toLowerCase();
      return (
        (statusFilter === 'All' || j.status === statusFilter) &&
        (j.title.toLowerCase().includes(q) ||
          j.journal.toLowerCase().includes(q) ||
          j.keywords.some(k => k.toLowerCase().includes(q)))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'Most Cited') return b.citations - a.citations;
      if (sortBy === 'Most Viewed') return b.views - a.views;
      if (sortBy === 'Oldest First') return new Date(a.publishedDate) - new Date(b.publishedDate);
      return new Date(b.publishedDate) - new Date(a.publishedDate);
    });

  const totalViews = journalsData.reduce((s, j) => s + j.views, 0);
  const totalDownloads = journalsData.reduce((s, j) => s + j.downloads, 0);
  const totalCitations = journalsData.reduce((s, j) => s + j.citations, 0);

  const card = {
    background: '#fff',
    borderRadius: '14px',
    border: '1px solid #E9ECF0',
    boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>
        <Link to="/dashboard" style={{ color: '#6B7280', textDecoration: 'none' }}>Dashboard</Link>
        <FiChevronRight size={14} />
        <span style={{ color: '#111827', fontWeight: 500 }}>Approved Journals</span>
      </div>

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>
            Approved Journals
          </h1>
          <p style={{ fontSize: '13.5px', color: '#6B7280', marginTop: '4px', margin: '4px 0 0' }}>
            Your approved and published research articles — track citations, views & downloads.
          </p>
        </div>
        <Link
          to="/dashboard/upload-journal"
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
            color: '#fff', fontWeight: 600, fontSize: '13px',
            borderRadius: '10px', padding: '10px 18px', textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(37,99,235,0.35)', flexShrink: 0,
          }}
        >
          <FiUploadCloud size={15} /> Submit New Article
        </Link>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', marginBottom: '22px' }}>
        {[
          { label: 'Total Approved', val: journalsData.length, icon: FiAward, color: '#2563EB', bg: '#EFF6FF' },
          { label: 'Total Views', val: totalViews.toLocaleString(), icon: FiEye, color: '#059669', bg: '#ECFDF5' },
          { label: 'Total Downloads', val: totalDownloads.toLocaleString(), icon: FiDownload, color: '#7C3AED', bg: '#F5F3FF' },
          { label: 'Total Citations', val: totalCitations, icon: FiTrendingUp, color: '#D97706', bg: '#FFFBEB' },
          { label: 'Open Access', val: journalsData.filter(j => j.openAccess).length, icon: FiGlobe, color: '#0891B2', bg: '#ECFEFF' },
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

      {/* Filter & Controls Bar */}
      <div style={{ ...card, padding: '14px 18px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '8px 14px', flex: 1, minWidth: '200px' }}>
          <FiSearch size={14} color="#9CA3AF" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, journal, keyword..."
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', color: '#374151', flex: 1 }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 0, display: 'flex' }}>
              <FiX size={14} />
            </button>
          )}
        </div>

        {/* Status filter pills */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              style={{
                padding: '7px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600,
                border: `1.5px solid ${statusFilter === f ? '#2563EB' : '#E5E7EB'}`,
                background: statusFilter === f ? '#EFF6FF' : '#fff',
                color: statusFilter === f ? '#2563EB' : '#6B7280',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{ border: '1px solid #E5E7EB', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#374151', background: '#fff', outline: 'none', cursor: 'pointer' }}
        >
          {SORT_OPTIONS.map(s => <option key={s}>{s}</option>)}
        </select>

        {/* View mode toggle */}
        <div style={{ display: 'flex', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
          {[{ mode: 'card', Icon: FiGrid }, { mode: 'list', Icon: FiList }].map(({ mode, Icon }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                padding: '8px 12px', border: 'none', cursor: 'pointer',
                background: viewMode === mode ? '#2563EB' : '#fff',
                color: viewMode === mode ? '#fff' : '#6B7280',
                display: 'flex', alignItems: 'center', transition: 'all 0.15s',
              }}
            >
              <Icon size={15} />
            </button>
          ))}
        </div>

        <span style={{ fontSize: '12px', color: '#9CA3AF', marginLeft: 'auto' }}>
          {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {/* ─── CARD VIEW ─── */}
      {viewMode === 'card' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.length === 0 && (
            <div style={{ ...card, padding: '48px', textAlign: 'center' }}>
              <FiBookOpen size={40} color="#D1D5DB" style={{ marginBottom: '12px' }} />
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#374151', margin: 0 }}>No articles found</p>
              <p style={{ fontSize: '13px', color: '#9CA3AF', margin: '6px 0 0' }}>Try adjusting your search or filters</p>
            </div>
          )}
          {filtered.map(j => (
            <div key={j.id} style={{ ...card, overflow: 'hidden', transition: 'box-shadow 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.05)'}
            >
              {/* Top bar */}
              <div style={{ height: '4px', background: `linear-gradient(90deg, ${j.color}, ${j.color}88)` }} />

              <div style={{ padding: '20px 24px', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                {/* Cover */}
                <div style={{
                  width: '80px', height: '96px', borderRadius: '10px', flexShrink: 0,
                  background: `linear-gradient(135deg, ${j.color}dd, ${j.color}88)`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', color: '#fff',
                }}>
                  <p style={{ fontWeight: 800, fontSize: '14px', margin: 0, letterSpacing: '1px' }}>{j.abbr}</p>
                  <FiBook size={22} style={{ marginTop: '8px', opacity: 0.7 }} />
                </div>

                {/* Main Content */}
                <div style={{ flex: 1, minWidth: '260px' }}>
                  {/* Badges row */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                    <span style={{ background: '#E6F4EA', color: '#137333', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FiCheck size={10} /> {j.status}
                    </span>
                    {j.openAccess && (
                      <span style={{ background: '#ECFEFF', color: '#0891B2', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FiGlobe size={10} /> Open Access
                      </span>
                    )}
                    <span style={{ background: '#F5F3FF', color: '#7C3AED', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px' }}>
                      {j.type}
                    </span>
                    <span style={{ background: '#F9FAFB', color: '#6B7280', fontSize: '11px', padding: '3px 10px', borderRadius: '20px' }}>
                      {j.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '15.5px', fontWeight: 700, color: '#111827', margin: '0 0 6px', fontFamily: 'Poppins, sans-serif', lineHeight: 1.4 }}>
                    {j.title}
                  </h3>

                  {/* Journal */}
                  <p style={{ fontSize: '12.5px', color: '#2563EB', fontWeight: 500, margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FiBookOpen size={12} /> {j.journal}
                  </p>

                  {/* Authors */}
                  <p style={{ fontSize: '12.5px', color: '#6B7280', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FiUsers size={12} /> {j.authors.join(', ')}
                  </p>

                  {/* DOI Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '12px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FiLink size={11} /> DOI:
                    </span>
                    <span style={{ fontSize: '12px', color: '#2563EB', fontWeight: 500 }}>{j.doi}</span>
                    <button
                      onClick={() => copyDOI(j.doi, j.id)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 0, display: 'flex', alignItems: 'center' }}
                    >
                      {copied[j.id] ? <FiCheck size={13} color="#059669" /> : <FiCopy size={13} />}
                    </button>
                    <span style={{ fontSize: '11.5px', color: '#6B7280' }}>| {j.volume} | {j.pages}</span>
                  </div>

                  {/* Publication dates */}
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    {[
                      { label: 'Submitted', val: j.submittedDate },
                      { label: 'Approved', val: j.approvedDate },
                      { label: 'Published', val: j.publishedDate },
                    ].map(d => (
                      <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FiCalendar size={11} color="#9CA3AF" />
                        <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>{d.label}:</span>
                        <span style={{ fontSize: '11.5px', color: '#374151', fontWeight: 500 }}>{d.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Metrics + Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '160px' }}>
                  {/* Metrics */}
                  <div style={{ background: '#F9FAFB', borderRadius: '10px', padding: '12px 14px', border: '1px solid #F3F4F6' }}>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Article Metrics</p>
                    {[
                      { icon: FiEye, label: 'Views', val: j.views.toLocaleString(), color: '#2563EB' },
                      { icon: FiDownload, label: 'Downloads', val: j.downloads.toLocaleString(), color: '#7C3AED' },
                      { icon: FiTrendingUp, label: 'Citations', val: j.citations, color: '#059669' },
                      { icon: FiStar, label: 'Impact Factor', val: j.impactFactor, color: '#D97706' },
                    ].map(({ icon: Icon, label, val, color }) => (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Icon size={11} color={color} />
                          <span style={{ fontSize: '11.5px', color: '#6B7280' }}>{label}</span>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>{val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <button
                      onClick={() => setSelectedJournal(j)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        padding: '8px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                        background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                        color: '#fff', fontSize: '12.5px', fontWeight: 600, transition: 'all 0.15s',
                      }}
                    >
                      <FiEye size={13} /> View Details
                    </button>
                    <a
                      href={`https://doi.org/${j.doi}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        padding: '8px 12px', borderRadius: '8px',
                        border: '1.5px solid #E5E7EB', background: '#fff',
                        color: '#374151', fontSize: '12.5px', fontWeight: 600,
                        textDecoration: 'none', transition: 'all 0.15s',
                      }}
                    >
                      <FiExternalLink size={13} /> Open Article
                    </a>
                    <button
                      onClick={() => handleShare(j)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        padding: '8px 12px', borderRadius: '8px',
                        border: '1.5px solid #E5E7EB', background: '#fff',
                        color: '#374151', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer',
                      }}
                    >
                      <FiShare2 size={13} /> Share
                    </button>
                    <button
                      onClick={() => toast.info(`Downloading ${j.abbr} PDF...`)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        padding: '8px 12px', borderRadius: '8px',
                        border: '1.5px solid #E5E7EB', background: '#fff',
                        color: '#374151', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer',
                      }}
                    >
                      <FiDownload size={13} /> Download PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* Keywords row */}
              <div style={{ padding: '10px 24px 16px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid #F3F4F6' }}>
                <span style={{ fontSize: '11.5px', color: '#9CA3AF', fontWeight: 500 }}>Keywords:</span>
                {j.keywords.map(kw => (
                  <span key={kw} style={{ background: '#EFF6FF', color: '#2563EB', fontSize: '11.5px', fontWeight: 500, padding: '3px 10px', borderRadius: '20px' }}>
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── LIST VIEW ─── */}
      {viewMode === 'list' && (
        <div style={{ ...card, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                {['ID', 'Title & Journal', 'Status', 'Published Date', 'Citations', 'Views', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#6B7280', fontSize: '12px', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(j => (
                <tr key={j.id} style={{ borderBottom: '1px solid #F3F4F6', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ background: '#F3F4F6', color: '#374151', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '6px' }}>{j.id}</span>
                  </td>
                  <td style={{ padding: '14px 16px', maxWidth: '280px' }}>
                    <p style={{ fontWeight: 600, color: '#111827', margin: '0 0 2px', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{j.title}</p>
                    <p style={{ fontSize: '11.5px', color: '#6B7280', margin: 0 }}>{j.journal}</p>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ background: '#E6F4EA', color: '#137333', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}>
                      <FiCheck size={10} /> {j.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#374151', whiteSpace: 'nowrap', fontSize: '12.5px' }}>{j.publishedDate}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#059669', fontSize: '13px' }}>{j.citations}</td>
                  <td style={{ padding: '14px 16px', color: '#374151', fontSize: '12.5px' }}>{j.views.toLocaleString()}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => setSelectedJournal(j)} style={{ background: '#EFF6FF', border: 'none', borderRadius: '7px', padding: '6px', cursor: 'pointer', color: '#2563EB', display: 'flex' }} title="View Details"><FiEye size={14} /></button>
                      <button onClick={() => copyDOI(j.doi, j.id)} style={{ background: '#F5F3FF', border: 'none', borderRadius: '7px', padding: '6px', cursor: 'pointer', color: '#7C3AED', display: 'flex' }} title="Copy DOI"><FiCopy size={14} /></button>
                      <button onClick={() => handleShare(j)} style={{ background: '#ECFDF5', border: 'none', borderRadius: '7px', padding: '6px', cursor: 'pointer', color: '#059669', display: 'flex' }} title="Share"><FiShare2 size={14} /></button>
                      <button onClick={() => toast.info('Downloading PDF...')} style={{ background: '#FEF3C7', border: 'none', borderRadius: '7px', padding: '6px', cursor: 'pointer', color: '#D97706', display: 'flex' }} title="Download PDF"><FiDownload size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF', fontSize: '13px' }}>No articles match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── DETAIL MODAL ─── */}
      {selectedJournal && (
        <div
          onClick={() => setSelectedJournal(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: '18px', width: '100%', maxWidth: '720px',
              maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            }}
          >
            {/* Modal Header */}
            <div style={{ height: '5px', background: `linear-gradient(90deg, ${selectedJournal.color}, ${selectedJournal.color}66)`, borderRadius: '18px 18px 0 0' }} />
            <div style={{ padding: '24px 28px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                  <span style={{ background: '#E6F4EA', color: '#137333', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px' }}>
                    ✓ {selectedJournal.status}
                  </span>
                  {selectedJournal.openAccess && (
                    <span style={{ background: '#ECFEFF', color: '#0891B2', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px' }}>🌐 Open Access</span>
                  )}
                </div>
                <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#111827', margin: 0, fontFamily: 'Poppins, sans-serif', lineHeight: 1.4, maxWidth: '560px' }}>
                  {selectedJournal.title}
                </h2>
              </div>
              <button onClick={() => setSelectedJournal(null)} style={{ border: 'none', background: '#F3F4F6', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#6B7280', display: 'flex', flexShrink: 0 }}>
                <FiX size={18} />
              </button>
            </div>

            <div style={{ padding: '24px 28px' }}>
              {/* Journal info */}
              <div style={{ background: '#F9FAFB', borderRadius: '10px', padding: '14px 16px', marginBottom: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[
                    { label: 'Journal', val: selectedJournal.journal },
                    { label: 'Department', val: selectedJournal.dept },
                    { label: 'Volume & Issue', val: `${selectedJournal.volume} | ${selectedJournal.pages}` },
                    { label: 'Published', val: selectedJournal.publishedDate },
                    { label: 'Article Type', val: selectedJournal.type },
                    { label: 'Impact Factor', val: selectedJournal.impactFactor },
                  ].map(({ label, val }) => (
                    <div key={label}>
                      <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 2px', fontWeight: 500 }}>{label}</p>
                      <p style={{ fontSize: '13px', color: '#111827', margin: 0, fontWeight: 500 }}>{val}</p>
                    </div>
                  ))}
                </div>
                {/* DOI */}
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiLink size={13} color="#9CA3AF" />
                  <span style={{ fontSize: '12px', color: '#9CA3AF' }}>DOI:</span>
                  <span style={{ fontSize: '13px', color: '#2563EB', fontWeight: 600 }}>{selectedJournal.doi}</span>
                  <button onClick={() => copyDOI(selectedJournal.doi, selectedJournal.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 0, display: 'flex' }}>
                    {copied[selectedJournal.id] ? <FiCheck size={13} color="#059669" /> : <FiCopy size={13} />}
                  </button>
                </div>
              </div>

              {/* Authors */}
              <div style={{ marginBottom: '18px' }}>
                <p style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Authors</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedJournal.authors.map(a => (
                    <span key={a} style={{ background: '#EFF6FF', color: '#2563EB', fontSize: '12px', fontWeight: 500, padding: '4px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <FiUsers size={11} /> {a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Abstract */}
              <div style={{ marginBottom: '18px' }}>
                <p style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Abstract</p>
                <p style={{ fontSize: '13.5px', color: '#374151', lineHeight: 1.7, margin: 0, background: '#F9FAFB', padding: '14px', borderRadius: '10px', border: '1px solid #F3F4F6' }}>
                  {selectedJournal.abstract}
                </p>
              </div>

              {/* Keywords */}
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Keywords</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                  {selectedJournal.keywords.map(kw => (
                    <span key={kw} style={{ background: '#EFF6FF', color: '#2563EB', fontSize: '12px', fontWeight: 500, padding: '4px 12px', borderRadius: '20px' }}>{kw}</span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '22px' }}>
                {[
                  { label: 'Views', val: selectedJournal.views.toLocaleString(), icon: FiEye, color: '#2563EB', bg: '#EFF6FF' },
                  { label: 'Downloads', val: selectedJournal.downloads.toLocaleString(), icon: FiDownload, color: '#7C3AED', bg: '#F5F3FF' },
                  { label: 'Citations', val: selectedJournal.citations, icon: FiTrendingUp, color: '#059669', bg: '#ECFDF5' },
                  { label: 'Impact Factor', val: selectedJournal.impactFactor, icon: FiStar, color: '#D97706', bg: '#FFFBEB' },
                ].map(({ label, val, icon: Icon, color, bg }) => (
                  <div key={label} style={{ background: bg, borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                    <Icon size={18} color={color} style={{ marginBottom: '6px' }} />
                    <p style={{ fontSize: '18px', fontWeight: 800, color: '#111827', margin: '0 0 2px', fontFamily: 'Poppins, sans-serif' }}>{val}</p>
                    <p style={{ fontSize: '11px', color: '#6B7280', margin: 0 }}>{label}</p>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a href={`https://doi.org/${selectedJournal.doi}`} target="_blank" rel="noreferrer"
                  style={{ flex: 1, minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '11px', borderRadius: '10px', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#fff', fontWeight: 600, fontSize: '13px', textDecoration: 'none' }}>
                  <FiExternalLink size={14} /> View Published Article
                </a>
                <button onClick={() => toast.info('Downloading PDF...')} style={{ flex: 1, minWidth: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '11px', borderRadius: '10px', border: '1.5px solid #E5E7EB', background: '#fff', fontWeight: 600, fontSize: '13px', cursor: 'pointer', color: '#374151' }}>
                  <FiDownload size={14} /> Download PDF
                </button>
                <button onClick={() => handleShare(selectedJournal)} style={{ flex: 1, minWidth: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '11px', borderRadius: '10px', border: '1.5px solid #E5E7EB', background: '#fff', fontWeight: 600, fontSize: '13px', cursor: 'pointer', color: '#374151' }}>
                  <FiShare2 size={14} /> Share Article
                </button>
                <button onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #E5E7EB', background: '#fff', fontWeight: 600, fontSize: '13px', cursor: 'pointer', color: '#374151' }}>
                  <FiPrinter size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedJournals;
