import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  FiChevronRight, FiArrowLeft, FiActivity, FiCopy, FiCalendar, FiBookOpen,
  FiFileText, FiLayers, FiClock, FiCheck, FiDownload, FiExternalLink,
  FiEye, FiShare2, FiPrinter, FiCheckCircle, FiInfo, FiUser, FiUsers, FiEdit3, FiSend,
  FiPlus, FiMoreVertical, FiMessageSquare, FiPaperclip, FiSmile, FiMail, FiHelpCircle,
  FiLink, FiArrowRight, FiBook, FiUploadCloud, FiEdit, FiAward, FiStar, FiUpload, FiMessageCircle,
  FiGlobe, FiLock, FiTwitter, FiLinkedin, FiFacebook, FiXCircle
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useJournalContext } from '../context/JournalContext';

const JournalDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { journals } = useJournalContext();
  const currentJournal = journals.find(j => j.id === id) || journals[0] || {
    id: 'PRAXIS-2024-0512', title: 'A Novel Approach to AI in Healthcare',
    dept: 'Computer Science', primaryAuthor: 'Dr. Rahul Sharma',
    status: 'Published', date: '12 May 2024'
  };

  const [activeTab, setActiveTab] = useState('Summary');
  const [activeSubTab, setActiveSubTab] = useState('Publication Details');
  const [activeMessage, setActiveMessage] = useState(1);
  const [showArticleModal, setShowArticleModal] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied: ${text}`);
  };

  const forceDownload = async (fileUrl, fileName) => {
    try {
      window.open(fileUrl, '_blank');
    } catch (err) {
      toast.error('Failed to download file');
    }
  };

  const handleDownload = (type) => {
    if (type === 'pdf') {
      if (currentJournal.mainFilePath) {
        const fileUrl = `${import.meta.env.VITE_API_URL.replace('/api', '')}/${currentJournal.mainFilePath.replace(/\\/g, '/')}`;
        const fileName = currentJournal.mainFilePath.split('/').pop().split('\\').pop() || 'Article_Manuscript.pdf';
        forceDownload(fileUrl, fileName);
      } else {
        toast.info('Downloading PDF mockup...', { icon: <FiCheckCircle style={{color:'#10B981'}}/> });
      }
    } else if (type === 'cert') {
      toast.info('Downloading Certificate mockup...', { icon: <FiCheckCircle style={{color:'#10B981'}}/> });
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentJournal.title,
          text: `Check out this article: ${currentJournal.title}`,
          url: url
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const handlePrintArticle = () => {
    if (currentJournal.mainFilePath) {
      const fileUrl = `${import.meta.env.VITE_API_URL.replace('/api', '')}/${currentJournal.mainFilePath.replace(/\\/g, '/')}`;
      window.open(fileUrl, '_blank');
      return;
    } else {
      toast.error('No uploaded file found to print.');
    }
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
  const getDynamicMessages = () => {
    const msgs = [];
    
    msgs.push({
      sender: 'Editorial Team',
      initials: 'EA',
      avatarBg: '#3B82F6',
      date: currentJournal.date || '12 May',
      preview: 'Thank you for your submission.',
      title: 'Submission Received',
      body: `Dear ${currentJournal.primaryAuthorName || currentJournal.primaryAuthor || 'Author'},\n\nThank you for submitting your manuscript "${currentJournal.title || 'Untitled'}" to ${currentJournal.category || currentJournal.journalName || 'our journal'}. We have received it and it will undergo initial screening shortly.\n\nBest regards,\nEditorial Team`,
      time: '09:00 AM'
    });

    if (['Under Review', 'Reviewed', 'Approved', 'Rejected', 'Published'].includes(currentJournal.status)) {
      msgs.push({
        sender: 'Editorial Team',
        initials: 'EA',
        avatarBg: '#3B82F6',
        date: currentJournal.date || '14 May',
        preview: 'Your manuscript is under review.',
        title: 'Status Update: Under Review',
        body: `Dear ${currentJournal.primaryAuthorName || currentJournal.primaryAuthor || 'Author'},\n\nYour manuscript "${currentJournal.title || 'Untitled'}" has passed the initial screening and is now under peer review. We will notify you once the reviews are completed.\n\nBest regards,\nEditorial Team`,
        time: '11:30 AM'
      });
    }

    if (['Reviewed', 'Approved', 'Rejected', 'Published'].includes(currentJournal.status)) {
      msgs.push({
        sender: 'Dr. Priya Verma',
        initials: 'PV',
        avatarBg: '#F59E0B',
        date: currentJournal.date || '16 May',
        preview: 'Some minor revisions suggested.',
        title: 'Reviewer Feedback (R1)',
        body: `Dear Author,\n\nI have reviewed your manuscript. The work is interesting, but I suggest some minor revisions to improve clarity in the methodology section.\n\nRegards,\nDr. Priya Verma`,
        time: '02:15 PM'
      });
      msgs.push({
        sender: 'Dr. Amit Kumar',
        initials: 'AK',
        avatarBg: '#10B981',
        date: currentJournal.date || '18 May',
        preview: 'Review completed and recommendation shared.',
        title: 'Reviewer Feedback (R2)',
        body: `Dear Author,\n\nThe paper presents a solid contribution. The results are well-supported. I recommend it for acceptance.\n\nRegards,\nDr. Amit Kumar`,
        time: '04:45 PM'
      });
    }

    if (currentJournal.status === 'Published') {
      msgs.push({
        sender: 'Editorial Team',
        initials: 'EA',
        avatarBg: '#3B82F6',
        date: currentJournal.date || '20 May',
        preview: 'Your article has been published successfully.',
        title: 'Congratulations: Article Published',
        body: `Dear ${currentJournal.primaryAuthorName || currentJournal.primaryAuthor || 'Author'},\n\nWe are pleased to inform you that your article "${currentJournal.title || 'Untitled'}" has been published successfully in Volume ${currentJournal.volume || 15}, Issue ${currentJournal.issue || 2} of ${currentJournal.category || currentJournal.journalName || 'Praxis Journal'}.\n\nThank you for your valuable contribution.\n\nBest regards,\nEditorial Team`,
        time: '11:20 AM'
      });
    } else if (currentJournal.status === 'Approved') {
      msgs.push({
        sender: 'Editorial Team',
        initials: 'EA',
        avatarBg: '#3B82F6',
        date: currentJournal.date || '20 May',
        preview: 'Your article has been accepted for publication.',
        title: 'Decision: Accepted',
        body: `Dear ${currentJournal.primaryAuthorName || currentJournal.primaryAuthor || 'Author'},\n\nWe are pleased to inform you that your article "${currentJournal.title || 'Untitled'}" has been accepted for publication. It will be published shortly.\n\nBest regards,\nEditorial Team`,
        time: '10:00 AM'
      });
    } else if (currentJournal.status === 'Rejected') {
      msgs.push({
        sender: 'Editorial Team',
        initials: 'EA',
        avatarBg: '#3B82F6',
        date: currentJournal.date || '20 May',
        preview: 'Decision on your manuscript.',
        title: 'Decision: Rejected',
        body: `Dear ${currentJournal.primaryAuthorName || currentJournal.primaryAuthor || 'Author'},\n\nWe regret to inform you that your article "${currentJournal.title || 'Untitled'}" has not been accepted for publication at this time. We encourage you to submit your future work to us.\n\nBest regards,\nEditorial Team`,
        time: '10:00 AM'
      });
    }

    return msgs.reverse().map((m, index) => ({ ...m, id: index + 1 }));
  };

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
              src={currentJournal.coverImage || currentJournal.image || `https://picsum.photos/seed/${currentJournal.id}/160/140`}
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
                  <span><span style={{ fontWeight: 600, color: '#374151' }}>Journal:</span> {currentJournal.category || currentJournal.journalName || 'International Journal of Computer Science (IJCS)'}</span>
                  <span><span style={{ fontWeight: 600, color: '#374151' }}>DOI:</span> {currentJournal.doi || '10.1234/' + currentJournal.id?.toLowerCase()} <FiCopy size={12} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => { copyToClipboard(currentJournal.doi || '10.1234/' + currentJournal.id?.toLowerCase()); toast.success('DOI copied!'); }} /></span>
                </div>
              )}
              {activeTab !== 'Publication' && (
                <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid #F3F4F6', paddingTop: '10px', marginTop: '4px' }}>
                  <div>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 2px' }}>Submission ID</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', fontWeight: 700, color: '#4B5563' }}>
                      {currentJournal.id}
                      <FiCopy size={13} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => { copyToClipboard(currentJournal.id); toast.success('ID copied!'); }} />
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
              {activeSubTab === 'Publication Details' ? (
                <>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>
                      <FiCalendar size={13} /> Published On
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>{currentJournal.status === 'Published' ? currentJournal.date : 'TBD'}</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>{currentJournal.status === 'Published' ? 'Official' : 'Pending'}</p>
                  </div>
                  <div style={{ width: '1px', background: '#E5E7EB' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>
                      <FiBook size={13} /> Volume / Issue
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>{currentJournal.volume || 'Volume 1, Issue 1'}</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>Current</p>
                  </div>
                  <div style={{ width: '1px', background: '#E5E7EB' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>
                      <FiFileText size={13} /> Pages
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>{currentJournal.pages || 'TBD'}</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>Assigned</p>
                  </div>
                  <div style={{ width: '1px', background: '#E5E7EB' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>
                      <FiActivity size={13} /> Article Status
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: currentJournal.status === 'Published' ? '#10B981' : '#2563EB', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: currentJournal.status === 'Published' ? '#10B981' : '#2563EB' }} /> {currentJournal.status}
                    </p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>{currentJournal.status === 'Published' ? 'Online & Active' : 'Processing'}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>
                      <FiCalendar size={13} /> Published On
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>{currentJournal.status === 'Published' ? currentJournal.date : 'TBD'}</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>{currentJournal.status === 'Published' ? 'Official' : 'Pending'}</p>
                  </div>
                  <div style={{ width: '1px', background: '#E5E7EB' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>
                      <FiBook size={13} /> Volume / Issue
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>{currentJournal.volume || 'Volume 1, Issue 1'}</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>Current</p>
                  </div>
                  <div style={{ width: '1px', background: '#E5E7EB' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>
                      <FiFileText size={13} /> Pages
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>{currentJournal.pages || 'TBD'}</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0' }}>Assigned</p>
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
                <div style={{ background: currentJournal.status === 'Pending Review' ? '#2563EB' : '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                  {currentJournal.status === 'Pending Review' ? <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} /> : <FiCheck size={11} color="#fff" />}
                </div>
                <span style={{ fontSize: '12.5px', fontWeight: currentJournal.status === 'Pending Review' ? 700 : 600, color: currentJournal.status === 'Pending Review' ? '#2563EB' : '#374151', flex: 1 }}>Submitted</span>
                <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{currentJournal.date}</span>
              </div>

              {['Under Review', 'Reviewed', 'Approved', 'Rejected', 'Published'].includes(currentJournal.status) && (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                  <div style={{ background: currentJournal.status === 'Under Review' ? '#2563EB' : '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                    {currentJournal.status === 'Under Review' ? <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} /> : <FiCheck size={11} color="#fff" />}
                  </div>
                  <span style={{ fontSize: '12.5px', fontWeight: currentJournal.status === 'Under Review' ? 700 : 600, color: currentJournal.status === 'Under Review' ? '#2563EB' : '#374151', flex: 1 }}>Under Review</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{currentJournal.status === 'Under Review' ? currentJournal.date : ''}</span>
                </div>
              )}

              {['Reviewed', 'Approved', 'Rejected', 'Published'].includes(currentJournal.status) && (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                  <div style={{ background: currentJournal.status === 'Reviewed' ? '#2563EB' : '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                    {currentJournal.status === 'Reviewed' ? <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} /> : <FiCheck size={11} color="#fff" />}
                  </div>
                  <span style={{ fontSize: '12.5px', fontWeight: currentJournal.status === 'Reviewed' ? 700 : 600, color: currentJournal.status === 'Reviewed' ? '#2563EB' : '#374151', flex: 1 }}>Review Completed</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{currentJournal.status === 'Reviewed' ? currentJournal.date : ''}</span>
                </div>
              )}

              {['Approved', 'Rejected'].includes(currentJournal.status) && (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                  <div style={{ background: currentJournal.status === 'Rejected' ? '#EF4444' : '#2563EB', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
                  </div>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: currentJournal.status === 'Rejected' ? '#EF4444' : '#2563EB', flex: 1 }}>Decision: {currentJournal.status}</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{currentJournal.date}</span>
                </div>
              )}

              {currentJournal.status === 'Published' && (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                  <div style={{ background: '#2563EB', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
                  </div>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#2563EB', flex: 1 }}>Published</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{currentJournal.date}</span>
                </div>
              )}
            </div>
            
            {currentJournal.status === 'Published' ? (
              <div style={{ borderRadius: '8px', border: '1px solid #BBF7D0', background: '#F0FDF4', padding: '8px 12px', marginTop: '6px' }}>
                <p style={{ fontSize: '11.5px', color: '#166534', margin: 0, lineHeight: 1.5 }}>
                  Your journal has been published successfully. <br/>You can view or download your published article.
                </p>
              </div>
            ) : (
              <div style={{ borderRadius: '8px', border: '1px solid #BFDBFE', background: '#EFF6FF', padding: '8px 12px', marginTop: '6px' }}>
                <p style={{ fontSize: '11.5px', color: '#1E40AF', margin: 0, lineHeight: 1.5 }}>
                  Current Status: {currentJournal.status}. <br/>We will notify you once there's an update.
                </p>
              </div>
            )}
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
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#374151', margin: 0 }}>{currentJournal.category || 'N/A'}</p>
            </div>
          </div>
          <div style={{ ...cardStyle, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#DCFCE7', borderRadius: '8px', padding: '8px', display: 'flex' }}>
              <FiFileText size={16} color="#16A34A" />
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 2px' }}>Files Submitted</p>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#374151', margin: 0 }}>{currentJournal.files ? currentJournal.files.length + ' Files' : '1 File'}</p>
            </div>
          </div>
          <div style={{ ...cardStyle, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#FEF3C7', borderRadius: '8px', padding: '8px', display: 'flex' }}>
              <FiBookOpen size={16} color="#D97706" />
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 2px' }}>Total Pages</p>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#374151', margin: 0 }}>{currentJournal.pages ? `${currentJournal.pages} Pages` : 'N/A'}</p>
            </div>
          </div>
          <div style={{ ...cardStyle, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#F3E8FF', borderRadius: '8px', padding: '8px', display: 'flex' }}>
              <FiClock size={16} color="#9333EA" />
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 2px' }}>Last Updated</p>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#374151', margin: 0 }}>{currentJournal.date}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Tabs Bar ── */}
      <div style={{ borderBottom: '1px solid #E5E7EB', display: 'flex', gap: '16px', paddingLeft: '4px' }}>
        <span onClick={() => setActiveTab('Summary')} style={tabItemStyle('Summary')}>Summary</span>
        <span onClick={() => navigate(`/dashboard/journal-files/${currentJournal.id}`)} style={tabItemStyle('Files')}>Files</span>
        <span onClick={() => setActiveTab('Review History')} style={tabItemStyle('Review History')}>Review History</span>
        {/* <span onClick={() => setActiveTab('Decision')} style={tabItemStyle('Decision')}>Decision Letter</span> */}
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
              {currentJournal.abstract || 'No abstract available for this journal.'}
            </p>
            <div style={{ marginTop: '8px' }}>
              <h5 style={{ fontSize: '12.5px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>Keywords</h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {(currentJournal.keywords && currentJournal.keywords.length > 0 ? currentJournal.keywords : ['Research', 'Journal']).map(kw => (
                  <span key={kw} style={{ background: '#EFF6FF', color: '#2563EB', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 }}>{kw}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
              <button onClick={() => handleDownload('pdf')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1.5px solid #E5E7EB', color: '#4B5563', padding: '9px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                <FiDownload size={14} /> Download Published Article (PDF)
              </button>
              <button onClick={() => {
                if (currentJournal.mainFilePath) {
                  window.open(`${import.meta.env.VITE_API_URL.replace('/api', '')}/${currentJournal.mainFilePath.replace(/\\/g, '/')}`, '_blank');
                } else {
                  toast.error('Article file not found');
                }
              }} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#2563EB', border: 'none', color: '#fff', padding: '9px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                View Published Article <FiExternalLink size={14} />
              </button>
            </div>
          </div>

          {/* Details Box */}
          <div style={{ ...cardStyle, padding: '24px' }}>
            <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827', margin: '0 0 16px', fontFamily: 'Poppins, sans-serif' }}>Details</h4>
            <div>
              <p style={detailLabelStyle}>Journal Title</p>
              <p style={detailValStyle}>{currentJournal.title || 'Untitled'}</p>
              
              <p style={detailLabelStyle}>Corresponding Author</p>
              <p style={detailValStyle}>{currentJournal.primaryAuthorName || currentJournal.primaryAuthorId?.name || currentJournal.primaryAuthor || 'Unknown Author'}</p>

              <p style={detailLabelStyle}>Co-authors</p>
              <p style={detailValStyle}>{currentJournal.coAuthors?.length > 0 ? currentJournal.coAuthors.join(', ') : 'None'}</p>

              <p style={detailLabelStyle}>Journal/Conference</p>
              <p style={detailValStyle}>{currentJournal.category || currentJournal.journalName || 'Praxis Journal'}</p>

              <p style={detailLabelStyle}>DOI</p>
              <p style={{ ...detailValStyle, display: 'flex', alignItems: 'center', gap: '6px' }}>
                {currentJournal.doi || `10.1234/${currentJournal.id?.toLowerCase()}`}
                <FiCopy size={12} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => copyToClipboard(currentJournal.doi || `10.1234/${currentJournal.id?.toLowerCase()}`)} />
              </p>

              <p style={detailLabelStyle}>Publisher</p>
              <p style={{ ...detailValStyle, marginBottom: 0 }}>{currentJournal.publisher || 'Praxis Publications'}</p>
            </div>
          </div>

          {/* Actions Box */}
          <div style={{ ...cardStyle, padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: '0 0 6px', fontFamily: 'Poppins, sans-serif' }}>Actions</h4>
            <button onClick={() => setShowArticleModal(true)} style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
              <FiEye size={14} color="#2563EB" /> View Full Article
            </button>
            <button onClick={() => handleDownload('pdf')} style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
              <FiDownload size={14} color="#2563EB" /> Download Article
            </button>
            <button onClick={() => handleDownload('cert')} style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
              <FiAward size={14} color="#2563EB" /> Download Certificate
            </button>
            <button onClick={handleShare} style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
              <FiShare2 size={14} color="#2563EB" /> Share Article
            </button>
            <button onClick={handlePrintArticle} style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
              <FiPrinter size={14} color="#2563EB" /> Print Article
            </button>
          </div>

          {/* Additional Files Box */}
          {currentJournal.additionalFilePaths && currentJournal.additionalFilePaths.length > 0 && (
            <div style={{ ...cardStyle, padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: '0 0 6px', fontFamily: 'Poppins, sans-serif' }}>Additional Files</h4>
              {currentJournal.additionalFilePaths.map((path, idx) => {
                const fileName = path.split('\\').pop().split('/').pop();
                return (
                  <button key={idx} onClick={() => window.open(`${import.meta.env.VITE_API_URL.replace('/api', '')}/${path.replace(/\\/g, '/')}`, '_blank')} style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                    <FiPaperclip size={14} color="#2563EB" /> {fileName.length > 20 ? fileName.substring(0, 20) + '...' : fileName}
                  </button>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* REVIEW HISTORY TAB */}
      {activeTab === 'Review History' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px', alignItems: 'start' }}>
          
          {/* Left Column (Timeline) */}
          <div style={{ ...cardStyle, padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '17px', top: '24px', bottom: '24px', width: '2px', background: '#E5E7EB', zIndex: 0 }} />

              {/* Submitted Step - Always Visible */}
              <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                <div style={timelineIconStyle(currentJournal.status === 'Pending Review' ? '#2563EB' : '#22C55E', currentJournal.status === 'Pending Review' ? '#EFF6FF' : '#DCFCE7')}>
                  {currentJournal.status === 'Pending Review' ? <FiSend size={16} /> : <FiCheck size={14} />}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: 0 }}>Submitted to Journal</h4>
                    <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>{currentJournal.date}</span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>Your manuscript has been successfully submitted to the journal.</p>
                  <span style={{ fontSize: '11.5px', color: '#9CA3AF', fontWeight: 500 }}>by Author</span>
                </div>
              </div>

              {/* Under Review Step */}
              {['Under Review', 'Reviewed', 'Approved', 'Rejected', 'Published'].includes(currentJournal.status) && (
                <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                  <div style={timelineIconStyle(currentJournal.status === 'Under Review' ? '#D97706' : '#22C55E', currentJournal.status === 'Under Review' ? '#FEF3C7' : '#DCFCE7')}>
                    {currentJournal.status === 'Under Review' ? <FiUser size={15} /> : <FiCheck size={14} />}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: 0 }}>Under Review</h4>
                      <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>{currentJournal.status === 'Under Review' ? currentJournal.date : ''}</span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>The manuscript has been assigned to reviewers.</p>
                    <span style={{ fontSize: '11.5px', color: '#9CA3AF', fontWeight: 500 }}>by Editorial Team</span>
                  </div>
                </div>
              )}

              {/* Review Completed Step */}
              {['Reviewed', 'Approved', 'Rejected', 'Published'].includes(currentJournal.status) && (
                <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                  <div style={timelineIconStyle(currentJournal.status === 'Reviewed' ? '#9333EA' : '#22C55E', currentJournal.status === 'Reviewed' ? '#F3E8FF' : '#DCFCE7')}>
                    {currentJournal.status === 'Reviewed' ? <FiUsers size={14} /> : <FiCheck size={14} />}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: 0 }}>Review Completed</h4>
                      <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>{currentJournal.status === 'Reviewed' ? currentJournal.date : ''}</span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>Both reviewers have submitted their reviews.</p>
                    <span style={{ fontSize: '11.5px', color: '#9CA3AF', fontWeight: 500 }}>by Reviewers</span>
                  </div>
                </div>
              )}

              {/* Editor Decision Step */}
              {['Approved', 'Rejected', 'Published'].includes(currentJournal.status) && (
                <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                  <div style={timelineIconStyle(['Approved', 'Rejected'].includes(currentJournal.status) ? (currentJournal.status === 'Rejected' ? '#EF4444' : '#0284C7') : '#22C55E', ['Approved', 'Rejected'].includes(currentJournal.status) ? (currentJournal.status === 'Rejected' ? '#FEE2E2' : '#E0F2FE') : '#DCFCE7')}>
                    {['Approved', 'Rejected'].includes(currentJournal.status) ? <FiFileText size={15} /> : <FiCheck size={14} />}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: 0 }}>Editor Decision: {currentJournal.status}</h4>
                      <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>{['Approved', 'Rejected'].includes(currentJournal.status) ? currentJournal.date : ''}</span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>The editor has made a decision based on reviewer comments.</p>
                    <span style={{ fontSize: '11.5px', color: '#9CA3AF', fontWeight: 500 }}>by Handling Editor</span>
                  </div>
                </div>
              )}

              {/* Published Step */}
              {currentJournal.status === 'Published' && (
                <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                  <div style={timelineIconStyle('#16A34A', '#DCFCE7')}>
                    <FiBookOpen size={14} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#16A34A', margin: 0 }}>Published</h4>
                      <span style={{ fontSize: '11.5px', color: '#9CA3AF' }}>{currentJournal.date}</span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>Your article has been published successfully.</p>
                    <span style={{ fontSize: '11.5px', color: '#9CA3AF', fontWeight: 500 }}>by Editorial Team</span>
                  </div>
                </div>
              )}

            </div>

            {/* Success green alert at bottom of timeline */}
            {currentJournal.status === 'Published' && (
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
                <button onClick={() => window.open(`https://doi.org/${currentJournal.doi || '10.1234/' + currentJournal.id?.toLowerCase()}`, '_blank')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1px solid #86EFAC', color: '#166534', padding: '8px 16px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
                  View Published Article <FiExternalLink size={13} />
                </button>
              </div>
            )}
          </div>

          {/* Right Column (Reviewers & Details) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Reviewers */}
            <div style={{ ...cardStyle, padding: '20px 22px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '0 0 16px' }}>Reviewers</h3>
              {['Published', 'Reviewed', 'Approved'].includes(currentJournal.status) ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ background: '#E0F2FE', color: '#0369A1', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>R1</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Reviewer 1</span>
                      <span style={{ fontSize: '11px', color: '#6B7280' }}>Blind Peer Review</span>
                    </div>
                    <span style={{ background: '#DCFCE7', color: '#15803D', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>Completed</span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ background: '#F3E8FF', color: '#7E22CE', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>R2</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Reviewer 2</span>
                      <span style={{ fontSize: '11px', color: '#6B7280' }}>Blind Peer Review</span>
                    </div>
                    <span style={{ background: '#DCFCE7', color: '#15803D', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>Completed</span>
                  </div>
                </div>
              ) : (
                <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0 }}>Reviewers will be assigned once the journal enters the review phase.</p>
              )}
            </div>

            {/* Review Details */}
            <div style={{ ...cardStyle, padding: '20px 22px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '0 0 16px' }}>Review Details</h3>
              {['Published', 'Reviewed', 'Approved'].includes(currentJournal.status) ? (
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
              ) : (
                <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0 }}>Review process is pending or ongoing.</p>
              )}
            </div>

            {/* Actions */}
            <div style={{ ...cardStyle, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', margin: '0 0 6px', fontFamily: 'Poppins, sans-serif' }}>Actions</h4>
              
              {(() => {
                const hasReviews = ['Published', 'Reviewed', 'Approved', 'Rejected'].includes(currentJournal.status);
                const hasDecision = ['Published', 'Approved', 'Rejected'].includes(currentJournal.status);
                
                return (
                  <>
                    <button 
                      onClick={() => hasReviews ? toast.success('Opening Review Reports...') : toast.info('No reviews available yet.')} 
                      style={{ ...actionBtnStyle, opacity: hasReviews ? 1 : 0.6, cursor: hasReviews ? 'pointer' : 'not-allowed', background: hasReviews ? '#fff' : '#F9FAFB' }}
                      onMouseEnter={e => hasReviews && (e.currentTarget.style.borderColor = '#2563EB')} 
                      onMouseLeave={e => hasReviews && (e.currentTarget.style.borderColor = '#E5E7EB')}
                    >
                      <FiEye size={14} color={hasReviews ? "#2563EB" : "#9CA3AF"} /> 
                      <span style={{ color: hasReviews ? '#374151' : '#9CA3AF' }}>View All Reviews</span>
                    </button>
                    <button 
                      onClick={() => hasReviews ? toast.success('Downloading Reviews PDF...') : toast.error('Cannot download reviews yet.')} 
                      style={{ ...actionBtnStyle, opacity: hasReviews ? 1 : 0.6, cursor: hasReviews ? 'pointer' : 'not-allowed', background: hasReviews ? '#fff' : '#F9FAFB' }}
                      onMouseEnter={e => hasReviews && (e.currentTarget.style.borderColor = '#2563EB')} 
                      onMouseLeave={e => hasReviews && (e.currentTarget.style.borderColor = '#E5E7EB')}
                    >
                      <FiDownload size={14} color={hasReviews ? "#2563EB" : "#9CA3AF"} /> 
                      <span style={{ color: hasReviews ? '#374151' : '#9CA3AF' }}>Download Reviews</span>
                    </button>
                    <button 
                      onClick={() => hasDecision ? toast.success('Opening Official Decision Letter...') : toast.info('Decision letter not generated yet.')} 
                      style={{ ...actionBtnStyle, opacity: hasDecision ? 1 : 0.6, cursor: hasDecision ? 'pointer' : 'not-allowed', background: hasDecision ? '#fff' : '#F9FAFB' }}
                      onMouseEnter={e => hasDecision && (e.currentTarget.style.borderColor = '#2563EB')} 
                      onMouseLeave={e => hasDecision && (e.currentTarget.style.borderColor = '#E5E7EB')}
                    >
                      <FiFileText size={14} color={hasDecision ? "#2563EB" : "#9CA3AF"} /> 
                      <span style={{ color: hasDecision ? '#374151' : '#9CA3AF' }}>View Decision Letter</span>
                    </button>
                  </>
                );
              })()}
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
                  <p style={{ fontWeight: 'bold' }}>Dear {currentJournal.primaryAuthorName || currentJournal.primaryAuthor || 'Author'},</p>
                  <p>
                    We are pleased to inform you that your manuscript entitled <span style={{ fontWeight: 'bold' }}>"{currentJournal.title || 'Untitled'}"</span> has been accepted for publication in <span style={{ fontStyle: 'italic' }}>{currentJournal.category || currentJournal.journalName || 'Praxis Journal'}</span>, Volume {currentJournal.volume || 15}, Issue {currentJournal.issue || 2}.
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
                      <span style={{ color: '#111827', fontWeight: 600, flex: 1 }}>{currentJournal.title || 'Untitled'}</span>
                    </div>

                    <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><FiBookOpen size={13} /> Journal Name</span>
                      <span style={{ color: '#111827', fontWeight: 600, flex: 1 }}>{currentJournal.category || currentJournal.journalName || 'Praxis Journal'}</span>
                    </div>

                    <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><FiLink size={13} /> DOI</span>
                      <span style={{ color: '#2563EB', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => copyToClipboard(currentJournal.doi || '10.1234/' + currentJournal.id?.toLowerCase())}>
                        {currentJournal.doi || '10.1234/' + currentJournal.id?.toLowerCase()} <FiCopy size={12} color="#9CA3AF" />
                      </span>
                    </div>

                    <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><FiCalendar size={13} /> Published On</span>
                      <span style={{ color: '#111827', fontWeight: 600, flex: 1 }}>{currentJournal.status === 'Published' ? currentJournal.date : 'TBD'}</span>
                    </div>

                    <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><FiBook size={13} /> Volume / Issue</span>
                      <span style={{ color: '#111827', fontWeight: 600, flex: 1 }}>{currentJournal.volume || 'Volume 1, Issue 1'}</span>
                    </div>

                    <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><FiFileText size={13} /> Pages</span>
                      <span style={{ color: '#111827', fontWeight: 600, flex: 1 }}>{currentJournal.pages || 'TBD'}</span>
                    </div>

                    <div style={{ display: 'flex', paddingBottom: '4px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><FiLink size={13} /> Article URL</span>
                      <span style={{ color: '#2563EB', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => { copyToClipboard(`https://doi.org/${currentJournal.doi || '10.1234/' + currentJournal.id?.toLowerCase()}`); toast.success('URL copied!'); }}>
                        https://doi.org/{currentJournal.doi || '10.1234/' + currentJournal.id?.toLowerCase()} <FiExternalLink size={12} color="#9CA3AF" />
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
                      <div style={{ background: currentJournal.status === 'Pending Review' ? '#2563EB' : '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                        {currentJournal.status === 'Pending Review' ? <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} /> : <FiCheck size={11} color="#fff" />}
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: currentJournal.status === 'Pending Review' ? 700 : 600, color: currentJournal.status === 'Pending Review' ? '#2563EB' : '#374151', flex: 1 }}>Submitted</span>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{currentJournal.date}</span>
                    </div>

                    {['Under Review', 'Reviewed', 'Approved', 'Rejected', 'Published'].includes(currentJournal.status) && (
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                        <div style={{ background: currentJournal.status === 'Under Review' ? '#2563EB' : '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                          {currentJournal.status === 'Under Review' ? <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} /> : <FiCheck size={11} color="#fff" />}
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: currentJournal.status === 'Under Review' ? 700 : 600, color: currentJournal.status === 'Under Review' ? '#2563EB' : '#374151', flex: 1 }}>Under Review</span>
                        <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{currentJournal.date}</span>
                      </div>
                    )}

                    {['Reviewed', 'Approved', 'Rejected', 'Published'].includes(currentJournal.status) && (
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                        <div style={{ background: currentJournal.status === 'Reviewed' ? '#2563EB' : '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                          {currentJournal.status === 'Reviewed' ? <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} /> : <FiCheck size={11} color="#fff" />}
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: currentJournal.status === 'Reviewed' ? 700 : 600, color: currentJournal.status === 'Reviewed' ? '#2563EB' : '#374151', flex: 1 }}>Review Completed</span>
                        <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{currentJournal.date}</span>
                      </div>
                    )}

                    {['Approved', 'Rejected'].includes(currentJournal.status) && (
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                        <div style={{ background: currentJournal.status === 'Rejected' ? '#EF4444' : '#2563EB', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: currentJournal.status === 'Rejected' ? '#EF4444' : '#2563EB', flex: 1 }}>Decision: {currentJournal.status}</span>
                        <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{currentJournal.date}</span>
                      </div>
                    )}

                    {currentJournal.status === 'Published' && (
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                        <div style={{ background: '#2563EB', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB', flex: 1 }}>Published</span>
                        <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{currentJournal.date}</span>
                      </div>
                    )}
                  </div>

                  {/* Timeline Success notice banner */}
                  {currentJournal.status === 'Published' && (
                    <div style={{ background: '#F0FDF4', border: '1px solid #DCFCE7', borderRadius: '8px', padding: '12px', marginTop: '16px', fontSize: '12px', color: '#15803D', lineHeight: 1.5 }}>
                      Your article is now live and accessible to readers worldwide. Thank you for contributing to the research community!
                    </div>
                  )}
                </div>

                {/* Share & Promote */}
                <div style={{ ...cardStyle, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>Share & Promote</h3>
                  <span style={{ fontSize: '11.5px', color: '#6B7280' }}>Share your published work and increase its visibility.</span>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px' }}>
                    <button onClick={() => window.open(`https://twitter.org/share?url=${encodeURIComponent('https://doi.org/' + (currentJournal.doi || '10.1234/' + currentJournal.id?.toLowerCase()))}`)} style={{ ...actionBtnStyle, padding: '8px 10px', fontSize: '11.5px' }}><FiTwitter size={13} color="#1DA1F2" /> Share on Twitter</button>
                    <button onClick={() => window.open(`https://linkedin.com/shareArticle?url=${encodeURIComponent('https://doi.org/' + (currentJournal.doi || '10.1234/' + currentJournal.id?.toLowerCase()))}`)} style={{ ...actionBtnStyle, padding: '8px 10px', fontSize: '11.5px' }}><FiLinkedin size={13} color="#0A66C2" /> Share on LinkedIn</button>
                    <button onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://doi.org/' + (currentJournal.doi || '10.1234/' + currentJournal.id?.toLowerCase()))}`)} style={{ ...actionBtnStyle, padding: '8px 10px', fontSize: '11.5px' }}><FiFacebook size={13} color="#1877F2" /> Share on Facebook</button>
                    <button style={{ ...actionBtnStyle, padding: '8px 10px', fontSize: '11.5px' }} onClick={() => { copyToClipboard('https://doi.org/' + (currentJournal.doi || '10.1234/' + currentJournal.id?.toLowerCase())); toast.success('Link copied!'); }}><FiLink size={13} color="#2563EB" /> Copy Article Link</button>
                    <button onClick={() => window.open(`mailto:?subject=${encodeURIComponent(currentJournal.title || 'Journal Article')}&body=${encodeURIComponent('Check out this article: https://doi.org/' + (currentJournal.doi || '10.1234/' + currentJournal.id?.toLowerCase()))}`)} style={{ ...actionBtnStyle, padding: '8px 10px', fontSize: '11.5px' }}><FiMail size={13} color="#2563EB" /> Email to Colleagues</button>
                    <button onClick={() => toast.info('Loading Altmetric details...')} style={{ ...actionBtnStyle, padding: '8px 10px', fontSize: '11.5px' }}><FiActivity size={13} color="#EF4444" /> View Altmetric</button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {activeSubTab === 'Article Information' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.1fr', gap: '16px', alignItems: 'start' }}>
              
              {/* Article Information Box */}
              <div style={{ ...cardStyle, padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>Article Information</h3>
                  {/* <button onClick={() => toast.info('Edit mode enabled for Article Information')} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#fff', border: '1px solid #D1D5DB', color: '#374151', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                    <FiEdit size={12} /> Edit
                  </button> */}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12.5px' }}>
                  <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px' }}>
                    <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0 }}>Article Title</span>
                    <span style={{ color: '#111827', fontWeight: 600 }}>{currentJournal.title || 'Untitled'}</span>
                  </div>

                  <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px' }}>
                    <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0 }}>Journal</span>
                    <span style={{ color: '#111827', fontWeight: 600 }}>{currentJournal.category || currentJournal.journalName || 'Praxis Journal'}</span>
                  </div>

                  <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px' }}>
                    <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0 }}>Article Type</span>
                    <span style={{ color: '#111827', fontWeight: 600 }}>Research Article</span>
                  </div>

                  <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px' }}>
                    <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0 }}>Subject Area</span>
                    <span style={{ color: '#111827', fontWeight: 600 }}>{currentJournal.dept || 'General'}</span>
                  </div>

                  <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px', alignItems: 'center' }}>
                    <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0 }}>Keywords</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {(currentJournal.keywords && currentJournal.keywords.length > 0 ? currentJournal.keywords : ['Research', 'Journal']).map(tag => (
                        <span key={tag} style={{ background: '#EFF6FF', color: '#2563EB', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px' }}>
                    <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0 }}>Abstract</span>
                    <span style={{ color: '#4B5563', lineHeight: 1.6, flex: 1 }}>
                      {currentJournal.abstract || 'No abstract available.'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px', alignItems: 'center' }}>
                    <span style={{ color: '#6B7280', width: '120px', fontWeight: 500, flexShrink: 0 }}>DOI</span>
                    <span style={{ color: '#2563EB', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => copyToClipboard(currentJournal.doi || '10.1234/' + currentJournal.id?.toLowerCase())}>
                      {currentJournal.doi || '10.1234/' + currentJournal.id?.toLowerCase()} <FiCopy size={12} color="#9CA3AF" />
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
                      <div style={{ background: '#E0F2FE', color: '#0369A1', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px' }}>
                        {(currentJournal.primaryAuthorName || currentJournal.primaryAuthor || 'A').substring(0, 2).toUpperCase()}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>{currentJournal.primaryAuthorName || currentJournal.primaryAuthorId?.name || currentJournal.primaryAuthor || 'Unknown Author'}</span>
                        <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 500 }}>Corresponding Author</span>
                        <span style={{ fontSize: '10.5px', color: '#9CA3AF' }}>{currentJournal.email || currentJournal.primaryAuthorId?.email || 'author@univ.edu'}</span>
                      </div>
                    </div>

                    {(currentJournal.coAuthors || []).map((coAuthor, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ background: '#F3E8FF', color: '#7E22CE', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px' }}>
                          {coAuthor.substring(0, 2).toUpperCase()}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                          <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>{coAuthor}</span>
                          <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 500 }}>Co-author</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ ...cardStyle, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', margin: '0 0 6px', fontFamily: 'Poppins, sans-serif' }}>Actions</h4>
                  <button onClick={() => setShowArticleModal(true)} style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                    <FiEye size={14} color="#2563EB" /> View Full Article
                  </button>
                  <button onClick={() => handleDownload('pdf')} style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                    <FiDownload size={14} color="#2563EB" /> Download Article (PDF)
                  </button>
                  <button onClick={() => handleDownload('cert')} style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                    <FiFileText size={14} color="#2563EB" /> Download Certificate
                  </button>
                  <button onClick={handleShare} style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                    <FiShare2 size={14} color="#2563EB" /> Share Article
                  </button>
                  <button onClick={handlePrintArticle} style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
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
                  {['Published', 'Reviewed', 'Approved'].includes(currentJournal.status) ? (
                    <>
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
                              <FiCalendar size={12} /> Reviewed recently
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
                              <FiCalendar size={12} /> Reviewed recently
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
                    </>
                  ) : (
                    <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0 }}>Peer review reports will be available here once completed.</p>
                  )}
                </div>

                {/* Editorial Decision Box */}
                <div style={{ ...cardStyle, padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>Editorial Decision</h3>
                  {['Published', 'Approved'].includes(currentJournal.status) ? (
                    <>
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
                            Decided by: <span style={{ fontWeight: 600, color: '#4B5563' }}>Editorial Team</span>
                          </p>
                        </div>
                      </div>

                      {/* Editor's Comments */}
                      <div style={{ borderLeft: '4px solid #10B981', background: '#F0FDF4', padding: '16px', borderRadius: '0 8px 8px 0', marginTop: '6px' }}>
                        <div style={{ fontSize: '13px', color: '#166534', fontStyle: 'italic', lineHeight: 1.6 }}>
                          "We are pleased to accept your manuscript for publication in our journal. Please address any minor comments and complete the publication process."
                        </div>
                        <span style={{ fontSize: '11.5px', color: '#15803D', fontWeight: 700, marginTop: '8px', display: 'block' }}>— Editor's Comments</span>
                      </div>
                    </>
                  ) : currentJournal.status === 'Rejected' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: '#FEE2E2', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FiXCircle size={16} color="#B91C1C" />
                        </div>
                        <div>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Decision</span>
                            <span style={{ background: '#FEE2E2', color: '#B91C1C', padding: '2px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 700 }}>Reject</span>
                          </div>
                          <p style={{ fontSize: '11.5px', color: '#6B7280', margin: '4px 0 0' }}>
                            The editorial team has rejected your manuscript.
                          </p>
                        </div>
                      </div>
                  ) : (
                    <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0 }}>Editorial decision is pending.</p>
                  )}
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
                      <div style={{ background: currentJournal.status === 'Pending Review' ? '#2563EB' : '#22C55E', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                        {currentJournal.status === 'Pending Review' ? <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} /> : <FiCheck size={11} color="#fff" />}
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: currentJournal.status === 'Pending Review' ? 700 : 600, color: currentJournal.status === 'Pending Review' ? '#2563EB' : '#374151', flex: 1 }}>Submitted</span>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{currentJournal.date}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                      <div style={{ background: ['Pending Review'].includes(currentJournal.status) ? '#fff' : (currentJournal.status === 'Under Review' ? '#2563EB' : '#22C55E'), border: ['Pending Review'].includes(currentJournal.status) ? '2px solid #9CA3AF' : 'none', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                        {!['Pending Review'].includes(currentJournal.status) && (currentJournal.status === 'Under Review' ? <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} /> : <FiCheck size={11} color="#fff" />)}
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: currentJournal.status === 'Under Review' ? 700 : 600, color: ['Pending Review'].includes(currentJournal.status) ? '#6B7280' : (currentJournal.status === 'Under Review' ? '#2563EB' : '#374151'), flex: 1 }}>Under Review</span>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{!['Pending Review'].includes(currentJournal.status) ? currentJournal.date : ''}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                      <div style={{ background: ['Pending Review', 'Under Review'].includes(currentJournal.status) ? '#fff' : (currentJournal.status === 'Reviewed' ? '#2563EB' : '#22C55E'), border: ['Pending Review', 'Under Review'].includes(currentJournal.status) ? '2px solid #9CA3AF' : 'none', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                        {!['Pending Review', 'Under Review'].includes(currentJournal.status) && (currentJournal.status === 'Reviewed' ? <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} /> : <FiCheck size={11} color="#fff" />)}
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: currentJournal.status === 'Reviewed' ? 700 : 600, color: ['Pending Review', 'Under Review'].includes(currentJournal.status) ? '#6B7280' : (currentJournal.status === 'Reviewed' ? '#2563EB' : '#374151'), flex: 1 }}>Review Completed</span>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{!['Pending Review', 'Under Review'].includes(currentJournal.status) ? currentJournal.date : ''}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                      <div style={{ background: ['Pending Review', 'Under Review', 'Reviewed'].includes(currentJournal.status) ? '#fff' : (['Approved', 'Rejected'].includes(currentJournal.status) ? '#2563EB' : '#22C55E'), border: ['Pending Review', 'Under Review', 'Reviewed'].includes(currentJournal.status) ? '2px solid #9CA3AF' : 'none', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                        {!['Pending Review', 'Under Review', 'Reviewed'].includes(currentJournal.status) && (['Approved', 'Rejected'].includes(currentJournal.status) ? <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} /> : <FiCheck size={11} color="#fff" />)}
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: ['Approved', 'Rejected'].includes(currentJournal.status) ? 700 : 600, color: ['Pending Review', 'Under Review', 'Reviewed'].includes(currentJournal.status) ? '#6B7280' : (['Approved', 'Rejected'].includes(currentJournal.status) ? '#2563EB' : '#374151'), flex: 1 }}>Decision Made</span>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{!['Pending Review', 'Under Review', 'Reviewed'].includes(currentJournal.status) ? currentJournal.date : ''}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
                      <div style={{ background: currentJournal.status === 'Published' ? '#2563EB' : '#fff', border: currentJournal.status === 'Published' ? 'none' : '2px solid #9CA3AF', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                        {currentJournal.status === 'Published' && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />}
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: currentJournal.status === 'Published' ? 700 : 600, color: currentJournal.status === 'Published' ? '#2563EB' : '#6B7280', flex: 1 }}>Published</span>
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{currentJournal.status === 'Published' ? currentJournal.date : ''}</span>
                    </div>
                  </div>
                </div>

                {/* Review Summary */}
                <div style={{ ...cardStyle, padding: '20px 22px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '0 0 16px' }}>Review Summary</h3>
                  {['Pending Review', 'Under Review'].includes(currentJournal.status) ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 500 }}>Total Reviewers</span>
                        <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>{currentJournal.status === 'Under Review' ? 2 : 0}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 500 }}>Completed Reviews</span>
                        <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>0</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 500 }}>Pending Reviews</span>
                        <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>{currentJournal.status === 'Under Review' ? 2 : 0}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: 500 }}>Average Recommendation</span>
                        <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#9CA3AF' }}>Pending</span>
                      </div>
                    </div>
                  ) : (
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
                        <span style={{ fontSize: '12.5px', fontWeight: 700, color: currentJournal.status === 'Rejected' ? '#EF4444' : '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {currentJournal.status === 'Rejected' ? '★☆☆☆☆ (1.5)' : '★★★★★ (5.0)'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ ...cardStyle, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', margin: '0 0 6px', fontFamily: 'Poppins, sans-serif' }}>Actions</h4>
                  <button onClick={() => toast.success('Opening Review Reports...')} style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                    <FiEye size={14} color="#2563EB" /> View All Reviews
                  </button>
                  <button onClick={() => handleDownload('pdf')} style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                    <FiDownload size={14} color="#2563EB" /> Download All Reviews (PDF)
                  </button>
                  <button onClick={() => handleDownload('pdf')} style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                    <FiFileText size={14} color="#2563EB" /> Download Decision Letter
                  </button>
                  <button onClick={() => toast.info('Initiating Appeal Process...')} style={actionBtnStyle} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
                    <FiAward size={14} color="#2563EB" /> Appeal Decision
                  </button>
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
                  {currentJournal.primaryAuthor} (2024). {currentJournal.title}. International Journal of {currentJournal.dept}, 15(2), 123-138. https://doi.org/10.1234/{currentJournal.id.toLowerCase()}
                </p>
                <button onClick={() => copyToClipboard(`${currentJournal.primaryAuthor} (2024). ${currentJournal.title}. International Journal of ${currentJournal.dept}, 15(2), 123-138. https://doi.org/10.1234/${currentJournal.id.toLowerCase()}`)} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#fff', border: '1px solid #E5E7EB', color: '#2563EB', padding: '6px 12px', borderRadius: '8px', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }}>
                  <FiCopy size={12} /> Copy Citation
                </button>
              </div>

              {/* Citations & Metrics */}
              <div style={{ ...cardStyle, padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', margin: 0, fontFamily: 'Poppins, sans-serif' }}>Citations & Metrics</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '10px', padding: '10px 14px', textAlign: 'center' }}>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 4px' }}>Citations</p>
                    <p style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 2px' }}>{currentJournal.metrics?.citations || 12}</p>
                    <span style={{ fontSize: '10px', color: '#9CA3AF' }}>Total Citations</span>
                  </div>
                  <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '10px', padding: '10px 14px', textAlign: 'center' }}>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 4px' }}>Views</p>
                    <p style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 2px' }}>{currentJournal.metrics?.views || 245}</p>
                    <span style={{ fontSize: '10px', color: '#9CA3AF' }}>Total Views</span>
                  </div>
                  <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '10px', padding: '10px 14px', textAlign: 'center' }}>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 4px' }}>Downloads</p>
                    <p style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 2px' }}>{currentJournal.metrics?.downloads || 156}</p>
                    <span style={{ fontSize: '10px', color: '#9CA3AF' }}>Total Downloads</span>
                  </div>
                  <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '10px', padding: '10px 14px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 4px' }}>Altmetric</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'conic-gradient(#34D399 25%, #60A5FA 0 50%, #F59E0B 0 75%, #EF4444 0)' }} />
                      <p style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: 0 }}>{currentJournal.metrics?.altmetric || 35}</p>
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
                <button onClick={() => setActiveSubTab('Publication Details')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1.5px solid #2563EB', color: '#2563EB', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 6px rgba(37,99,235,0.1)' }}>
                  Next: Publication Details <FiArrowRight size={14} />
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

          {activeSubTab !== 'Publication Details' && activeSubTab !== 'Article Information' && activeSubTab !== 'Review & Decision' && activeSubTab !== 'Citations & Metrics' && activeSubTab !== 'Download & Share' && (
            <div style={{ ...cardStyle, padding: '36px', textAlign: 'center', color: '#9CA3AF' }}>
              <FiLayers size={36} style={{ marginBottom: '10px' }} />
              <p style={{ margin: 0, fontSize: '14px' }}>{activeSubTab} content is loading...</p>
            </div>
          )}

        </div>
      )}

      {/* Non-summary Tab Placeholders */}
      {activeTab !== 'Summary' && activeTab !== 'Review History' && activeTab !== 'Decision' && activeTab !== 'Publication' && (
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

      {/* ARTICLE PREVIEW MODAL */}
      {showArticleModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(17, 24, 39, 0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowArticleModal(false)}>
          <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', position: 'relative', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }} onClick={e => e.stopPropagation()}>
            
            <button onClick={() => setShowArticleModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: '#F3F4F6', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4B5563', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'} onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}>
              <FiXCircle size={18} />
            </button>
            
            <div style={{ textAlign: 'center', borderBottom: '2px solid #F3F4F6', paddingBottom: '24px', marginBottom: '24px' }}>
              <span style={{ background: '#EFF6FF', color: '#2563EB', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, display: 'inline-block', marginBottom: '12px' }}>{currentJournal.category || 'Research Article'}</span>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '0 0 12px', lineHeight: 1.4 }}>{currentJournal.title || 'Untitled Journal Article'}</h2>
              <div style={{ fontSize: '15px', color: '#4B5563', fontWeight: 600, margin: '0 0 16px' }}>
                {currentJournal.primaryAuthorName || currentJournal.primaryAuthor || 'Unknown Author'}
                {currentJournal.coAuthors?.length > 0 && `, ${currentJournal.coAuthors.join(', ')}`}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '13px', color: '#6B7280' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiCalendar size={14} /> Submitted: {currentJournal.date}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiBookOpen size={14} /> {currentJournal.dept || 'General'}</span>
                {currentJournal.doi && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiLink size={14} /> DOI: {currentJournal.doi}</span>}
              </div>
            </div>

            <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', margin: '0 0 12px', fontFamily: 'Poppins, sans-serif' }}>Abstract</h3>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, margin: 0 }}>
                {currentJournal.abstract || 'No abstract is provided for this submission.'}
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', margin: '0 0 12px', fontFamily: 'Poppins, sans-serif' }}>Keywords</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(currentJournal.keywords && currentJournal.keywords.length > 0 ? currentJournal.keywords : ['Research', 'Journal']).map(kw => (
                  <span key={kw} style={{ background: '#F1F5F9', color: '#475569', padding: '6px 14px', borderRadius: '6px', fontSize: '12.5px', fontWeight: 600, border: '1px solid #E2E8F0' }}>{kw}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '32px' }}>
              <button onClick={() => {
                if (currentJournal.mainFilePath) {
                  window.open(`${import.meta.env.VITE_API_URL.replace('/api', '')}/${currentJournal.mainFilePath.replace(/\\/g, '/')}`, '_blank');
                } else {
                  toast.error('File not found');
                }
              }} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#2563EB', border: 'none', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(37,99,235,0.2)' }}>
                <FiDownload size={16} /> Download Original File
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default JournalDetails;
