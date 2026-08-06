import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiChevronRight, FiArrowLeft, FiCopy, FiCalendar, FiBookOpen,
  FiFileText, FiCheck, FiMail, FiBook, FiExternalLink, FiUploadCloud,
  FiEye, FiDownload, FiMoreVertical, FiCheckCircle, FiInfo
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const FILES_GUIDELINES = [
  'Accepted formats: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, ZIP',
  'Maximum file size: 20 MB per file',
  'Ensure files are virus-free',
  'File names should be descriptive',
  'All text should be readable and clear'
];

const INITIAL_FILES = [
  {
    id: 1,
    name: 'Main_Manuscript.pdf',
    purpose: 'Main Document',
    tag: 'Final',
    type: 'PDF',
    date: '12 May 2024 \n 10:30 AM',
    size: '1.24 MB',
    uploadedBy: 'Dr. Rahul Sharma',
    iconColor: '#FEE2E2',
    textColor: '#DC2626'
  },
  {
    id: 2,
    name: 'Cover_Letter.docx',
    purpose: 'Cover Letter',
    tag: '',
    type: 'DOCX',
    date: '12 May 2024 \n 10:32 AM',
    size: '78 KB',
    uploadedBy: 'Dr. Rahul Sharma',
    iconColor: '#DBEAFE',
    textColor: '#2563EB'
  },
  {
    id: 3,
    name: 'Research_Data.xlsx',
    purpose: 'Research Data',
    tag: '',
    type: 'XLSX',
    date: '12 May 2024 \n 10:40 AM',
    size: '342 KB',
    uploadedBy: 'Dr. Rahul Sharma',
    iconColor: '#D1FAE5',
    textColor: '#059669'
  },
  {
    id: 4,
    name: 'Figures_and_Charts.pptx',
    purpose: 'Figures / Charts',
    tag: '',
    type: 'PPTX',
    date: '12 May 2024 \n 10:45 AM',
    size: '2.15 MB',
    uploadedBy: 'Dr. Rahul Sharma',
    iconColor: '#FFEDD5',
    textColor: '#D97706'
  }
];

import { useJournalContext } from '../context/JournalContext';

const JournalFiles = () => {
  const navigate = useNavigate();
  const { journals } = useJournalContext();
  const currentJournal = journals[0] || {
    id: 'OJS-2024-0512', title: 'A Novel Approach to AI in Healthcare',
    dept: 'Computer Science', primaryAuthor: 'Dr. Rahul Sharma',
    status: 'Published', date: '12 May 2024'
  };
  const [activeTab, setActiveTab] = useState('All Files');

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
    padding: '10px 16px', fontSize: '13px', fontWeight: activeTab === name ? 700 : 500,
    color: activeTab === name ? '#2563EB' : '#6B7280', borderBottom: `2.5px solid ${activeTab === name ? '#2563EB' : 'transparent'}`,
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
    transition: 'all 0.2s'
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
            <span style={{ color: '#2563EB', fontWeight: 600 }}>Files</span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '6px 0 2px' }}>Files Submitted</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>View and manage all files submitted with your journal.</p>
        </div>
        <button
          onClick={() => navigate('/dashboard/journal-details')}
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
      </div>

      {/* ── Upper Section (Journal Info Card) ── */}
      <div style={{ ...cardStyle, padding: '24px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <img
          src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=160&auto=format&fit=crop&q=80"
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
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>12 May 2024</p>
            <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>10:30 AM</p>
          </div>
          <div style={{ width: '1px', background: '#E5E7EB' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#6B7280', marginBottom: '4px' }}>
              <FiCalendar size={13} /> Last Updated
            </div>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>20 May 2024</p>
            <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>11:20 AM</p>
          </div>
          <div style={{ width: '1px', background: '#E5E7EB' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#6B7280', marginBottom: '4px' }}>
              <FiInfo size={13} /> Current Status
            </div>
            <span style={{ ...badgeStyle, padding: '3px 8px', fontSize: '11px' }}><div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#137333' }} /> Published</span>
            <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '4px 0 0' }}>20 May 2024, 11:20 AM</p>
          </div>
        </div>
      </div>

      {/* ── Lower Section ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px', alignItems: 'start' }}>

        {/* Left Column: Files Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Tabs */}
          <div style={{ borderBottom: '1px solid #E5E7EB', display: 'flex', gap: '16px' }}>
            <span onClick={() => setActiveTab('All Files')} style={tabItemStyle('All Files')}>All Files (4)</span>
            <span onClick={() => setActiveTab('Supplementary Files')} style={tabItemStyle('Supplementary Files')}>Supplementary Files (0)</span>
          </div>

          {activeTab === 'All Files' ? (
            <div style={{ ...cardStyle, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E5E7EB' }}>
                    <th style={{ padding: '12px 16px', fontSize: '11.5px', fontWeight: 600, color: '#4B5563' }}>#</th>
                    <th style={{ padding: '12px 16px', fontSize: '11.5px', fontWeight: 600, color: '#4B5563' }}>File Name</th>
                    <th style={{ padding: '12px 16px', fontSize: '11.5px', fontWeight: 600, color: '#4B5563' }}>File Type</th>
                    <th style={{ padding: '12px 16px', fontSize: '11.5px', fontWeight: 600, color: '#4B5563' }}>Uploaded On</th>
                    <th style={{ padding: '12px 16px', fontSize: '11.5px', fontWeight: 600, color: '#4B5563' }}>Size</th>
                    <th style={{ padding: '12px 16px', fontSize: '11.5px', fontWeight: 600, color: '#4B5563' }}>Uploaded By</th>
                    <th style={{ padding: '12px 16px', fontSize: '11.5px', fontWeight: 600, color: '#4B5563', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '12.5px', color: '#374151' }}>
                  {INITIAL_FILES.map((f, idx) => (
                    <tr key={f.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 600, color: '#6B7280' }}>{idx + 1}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <div style={{ background: f.iconColor, color: f.textColor, padding: '6px', borderRadius: '6px', fontWeight: 700, fontSize: '10px' }}>
                            {f.type}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 700, color: '#111827', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                              {f.name}
                              {f.tag && <span style={{ background: '#DCFCE7', color: '#15803D', fontSize: '9.5px', padding: '1px 6px', borderRadius: '4px' }}>{f.tag}</span>}
                            </span>
                            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{f.purpose}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ background: '#EFF6FF', color: '#2563EB', padding: '2px 8px', borderRadius: '6px', fontSize: '10.5px', fontWeight: 600 }}>{f.type}</span>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#4B5563', lineHeight: 1.4 }}>
                        {f.date.split('\n')[0]}<br/>
                        <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{f.date.split('\n')[1]}</span>
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 600, color: '#4B5563' }}>{f.size}</td>
                      <td style={{ padding: '14px 16px', color: '#6B7280' }}>{f.uploadedBy}</td>
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                          <button style={{ background: '#EFF6FF', border: 'none', color: '#2563EB', padding: '5px', borderRadius: '6px', cursor: 'pointer', display: 'flex' }}>
                            <FiEye size={13} />
                          </button>
                          <button style={{ background: '#EFF6FF', border: 'none', color: '#2563EB', padding: '5px', borderRadius: '6px', cursor: 'pointer', display: 'flex' }}>
                            <FiDownload size={13} />
                          </button>
                          <button style={{ background: 'none', border: 'none', color: '#9CA3AF', padding: '5px', cursor: 'pointer', display: 'flex' }}>
                            <FiMoreVertical size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ padding: '12px 16px', borderTop: '1px solid #E5E7EB', fontSize: '12px', color: '#6B7280' }}>
                Showing 1 to 4 of 4 files
              </div>
            </div>
          ) : (
            <div style={{ ...cardStyle, padding: '36px', textAlign: 'center', color: '#9CA3AF' }}>
              <FiFileText size={32} style={{ marginBottom: '10px' }} />
              <p style={{ margin: 0, fontSize: '13px' }}>No supplementary files uploaded.</p>
            </div>
          )}

        </div>

        {/* Right Column: Guidelines & Storage */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Guidelines */}
          <div style={{ ...cardStyle, padding: '18px 20px' }}>
            <h4 style={{ fontWeight: 700, fontSize: '13.5px', color: '#111827', margin: '0 0 14px' }}>File Guidelines</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {FILES_GUIDELINES.map((g, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <FiCheckCircle size={14} color="#22C55E" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.5 }}>{g}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Storage Used */}
          <div style={{ ...cardStyle, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontWeight: 700, fontSize: '13.5px', color: '#111827', margin: 0 }}>Storage Used</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Progress Circle (3.79%) */}
              <div style={{ position: 'relative', width: '70px', height: '70px', borderRadius: '50%', background: `conic-gradient(#2563EB 3.79%, #E5E7EB 0)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
              </div>
              <div>
                <p style={{ fontSize: '16px', fontWeight: 800, color: '#111827', margin: '0 0 2px' }}>3.79 MB <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 400 }}>Used</span></p>
                <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 4px' }}>of 100 MB</p>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB' }}>3.79% <span style={{ fontWeight: 500, color: '#9CA3AF' }}>of storage used</span></span>
              </div>
            </div>
            <a href="#" style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', borderTop: '1px solid #F3F4F6', paddingTop: '10px' }}>
              View Storage Details →
            </a>
          </div>

        </div>

      </div>

      {/* Bottom Action Alert Banner */}
      <div style={{ ...cardStyle, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FiInfo size={16} color="#2563EB" />
          <p style={{ fontSize: '12.5px', color: '#4B5563', margin: 0 }}>
            <span style={{ fontWeight: 600, color: '#2563EB' }}>Need to replace a file?</span> You can upload the new file and the editorial team will be notified.
          </p>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1px solid #E5E7EB', color: '#4B5563', padding: '8px 16px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
          <FiUploadCloud size={14} /> Upload New File
        </button>
      </div>

    </div>
  );
};

export default JournalFiles;
