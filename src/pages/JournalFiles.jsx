import React, { useState, useEffect } from 'react';
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

import { useJournalContext } from '../context/JournalContext';
import { useParams } from 'react-router-dom';

const JournalFiles = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { journals } = useJournalContext();
  const currentJournal = journals.find(j => j.id === id) || journals[0] || {
    id: 'N/A', title: 'Untitled',
    dept: 'General', primaryAuthor: 'Unknown',
    status: 'Pending Review', date: new Date().toLocaleDateString('en-GB')
  };

  const authorName = currentJournal.primaryAuthorName || currentJournal.primaryAuthorId?.name || currentJournal.primaryAuthor || 'Author';

  const forceDownload = async (fileUrl, fileName) => {
    try {
      window.open(fileUrl, '_blank');
    } catch (err) {
      toast.error('Failed to download file');
    }
  };

  let journalFiles = [];
  if (currentJournal.mainFilePath) {
    const rawFileName = currentJournal.mainFilePath.split('/').pop().split('\\').pop() || 'Article_Manuscript.pdf';
    const ext = rawFileName.split('.').pop().toUpperCase();
    
    // Use originalFileName if backend provides it, otherwise make it look clean (e.g., Main_Manuscript.pdf)
    const displayName = currentJournal.originalFileName || `Main_Manuscript.${ext.toLowerCase()}`;
    
    journalFiles.push({
      id: 1,
      name: displayName,
      purpose: 'Main Document',
      tag: 'Final',
      type: ext,
      date: `${currentJournal.date || 'Unknown'} \n 10:30 AM`,
      size: 'Unknown',
      uploadedBy: authorName,
      iconColor: ext === 'PDF' ? '#FEE2E2' : '#DBEAFE',
      textColor: ext === 'PDF' ? '#DC2626' : '#2563EB',
      fileUrl: `${import.meta.env.VITE_API_URL.replace('/api', '')}/${currentJournal.mainFilePath.replace(/\\/g, '/')}`
    });
  }

  let suppFiles = [];
  if (currentJournal.additionalFilePaths && currentJournal.additionalFilePaths.length > 0) {
    currentJournal.additionalFilePaths.forEach((path, idx) => {
      const rawFileName = path.split('/').pop().split('\\').pop() || `Supplementary_File_${idx+1}`;
      const ext = rawFileName.split('.').pop().toUpperCase();
      suppFiles.push({
        id: `supp-${idx}`,
        name: rawFileName,
        purpose: 'Supplementary',
        tag: '',
        type: ext,
        date: `${currentJournal.date || 'Unknown'} \n 10:30 AM`,
        size: 'Unknown',
        uploadedBy: authorName,
        iconColor: '#F3F4F6',
        textColor: '#4B5563',
        fileUrl: `${import.meta.env.VITE_API_URL.replace('/api', '')}/${path.replace(/\\/g, '/')}`
      });
    });
  }
  const allFiles = [...journalFiles, ...suppFiles];

  const [activeTab, setActiveTab] = useState('All Files');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [fileSizes, setFileSizes] = useState({});

  useEffect(() => {
    const fetchSizes = async () => {
      const sizes = {};
      for (const f of allFiles) {
        try {
          // Send a HEAD request to get headers without downloading the whole file
          const res = await fetch(f.fileUrl, { method: 'HEAD' });
          const contentLength = res.headers.get('content-length');
          if (contentLength) {
            sizes[f.id] = (parseInt(contentLength) / (1024 * 1024)).toFixed(2) + ' MB';
          }
        } catch (err) {
          console.error('Failed to get size for', f.name, err);
        }
      }
      setFileSizes(sizes);
    };

    if (allFiles.length > 0) {
      fetchSizes();
    }
  }, [currentJournal.id]);

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
            <Link to={`/dashboard/journal-details/${currentJournal.id}`} style={{ color: '#6B7280', textDecoration: 'none', fontWeight: 500 }}>Journal Details</Link>
            <FiChevronRight size={13} />
            <span style={{ color: '#2563EB', fontWeight: 600 }}>Files</span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '6px 0 2px' }}>Files Submitted</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>View and manage all files submitted with your journal.</p>
        </div>
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
      </div>

      {/* ── Upper Section (Journal Info Card) ── */}
      <div style={{ ...cardStyle, padding: '24px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <img
          src={currentJournal.image ? `${import.meta.env.VITE_API_URL.replace('/api', '')}/${currentJournal.image.replace(/\\/g, '/')}` : "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=160&auto=format&fit=crop&q=80"}
          alt="journal-pic"
          style={{ width: '90px', height: '110px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #E5E7EB', flexShrink: 0 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <span style={badgeStyle}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#137333' }} /> {currentJournal.status || 'Pending'}</span>
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '2px 0', lineHeight: 1.4 }}>
            {currentJournal.title || 'Untitled Journal'}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#4B5563' }}>
            <FiBookOpen size={14} color="#6B7280" /> Department of {currentJournal.dept || currentJournal.category || 'General'}
          </div>
          <div style={{ fontSize: '12px', color: '#6B7280' }}>
            <span style={{ fontWeight: 600, color: '#374151' }}>Authors:</span> {authorName}
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
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>{currentJournal.date || 'N/A'}</p>
            <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>10:30 AM</p>
          </div>
          <div style={{ width: '1px', background: '#E5E7EB' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#6B7280', marginBottom: '4px' }}>
              <FiInfo size={13} /> Current Status
            </div>
            <span style={{ ...badgeStyle, padding: '3px 8px', fontSize: '11px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#137333' }} /> {currentJournal.status || 'Pending'}
            </span>
          </div>
        </div>
      </div>

      {/* ── Lower Section ── */}
      <div style={{ display: 'block', width: '100%' }}>

        {/* Files Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Tabs */}
          <div style={{ borderBottom: '1px solid #E5E7EB', display: 'flex', gap: '16px' }}>
            <span onClick={() => setActiveTab('All Files')} style={tabItemStyle('All Files')}>All Files ({allFiles.length})</span>
            <span onClick={() => setActiveTab('Supplementary Files')} style={tabItemStyle('Supplementary Files')}>Supplementary Files ({suppFiles.length})</span>
          </div>

          {(() => {
            const displayFiles = activeTab === 'All Files' ? allFiles : suppFiles;
            return displayFiles.length > 0 ? (
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
                    {displayFiles.map((f, idx) => (
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
                          <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{f.date.split('\n')[1] || '10:30 AM'}</span>
                        </td>
                        <td style={{ padding: '14px 16px', fontWeight: 600, color: '#4B5563' }}>{fileSizes[f.id] || f.size}</td>
                        <td style={{ padding: '14px 16px', color: '#6B7280' }}>{f.uploadedBy}</td>
                        <td style={{ padding: '14px 16px', textAlign: 'center', position: 'relative' }}>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                            <button onClick={() => {
                              if (f.fileUrl) {
                                forceDownload(f.fileUrl, f.name);
                              } else {
                                toast.error('Article file not found');
                              }
                            }} style={{ background: '#EFF6FF', border: 'none', color: '#2563EB', padding: '5px', borderRadius: '6px', cursor: 'pointer', display: 'flex' }}>
                              <FiDownload size={13} />
                            </button>
                            <button onClick={() => setOpenDropdownId(openDropdownId === f.id ? null : f.id)} style={{ background: openDropdownId === f.id ? '#F3F4F6' : 'none', border: 'none', color: '#9CA3AF', padding: '5px', borderRadius: '6px', cursor: 'pointer', display: 'flex' }}>
                              <FiMoreVertical size={14} />
                            </button>
                          </div>
                          
                          {/* Dropdown Menu */}
                          {openDropdownId === f.id && (
                            <div style={{ position: 'absolute', right: '16px', top: '40px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, width: '140px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                              <button onClick={() => {
                                 copyToClipboard(f.fileUrl);
                                 setOpenDropdownId(null);
                              }} style={{ background: 'none', border: 'none', borderBottom: '1px solid #F3F4F6', padding: '10px 14px', textAlign: 'left', fontSize: '12px', color: '#4B5563', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'} onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                                <FiCopy size={12} /> Copy Link
                              </button>
                              <button onClick={() => {
                                 toast.info(`Size: ${fileSizes[f.id] || f.size} | Uploaded by: ${f.uploadedBy}`);
                                 setOpenDropdownId(null);
                              }} style={{ background: 'none', border: 'none', padding: '10px 14px', textAlign: 'left', fontSize: '12px', color: '#4B5563', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'} onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                                <FiInfo size={12} /> Properties
                              </button>
                            </div>
                          )}
                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ padding: '12px 16px', borderTop: '1px solid #E5E7EB', fontSize: '12px', color: '#6B7280' }}>
                  Showing 1 to {displayFiles.length} of {displayFiles.length} files
                </div>
              </div>
            ) : (
              <div style={{ ...cardStyle, padding: '36px', textAlign: 'center', color: '#9CA3AF' }}>
                <FiFileText size={32} style={{ marginBottom: '10px' }} />
                <p style={{ margin: 0, fontSize: '13px' }}>No supplementary files found.</p>
              </div>
            );
          })()}

        </div>

      </div>

      {/* Bottom Action Alert Banner */}
      <div style={{ ...cardStyle, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FiInfo size={16} color="#2563EB" />
          <p style={{ fontSize: '12.5px', color: '#4B5563', margin: 0 }}>
            <span style={{ fontWeight: 600, color: '#2563EB' }}>Need to replace a file?</span> You can upload the new file and the Editorial Board will be notified.
          </p>
        </div>
        <button onClick={() => toast.info('Opening upload dialog...')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1px solid #E5E7EB', color: '#4B5563', padding: '8px 16px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
          <FiUploadCloud size={14} /> Upload New File
        </button>
      </div>

    </div>
  );
};

export default JournalFiles;
