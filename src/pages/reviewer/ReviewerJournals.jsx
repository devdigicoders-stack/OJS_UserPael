import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MdLibraryBooks, 
  MdSearch, 
  MdOutlineRemoveRedEye,
  MdArrowUpward,
  MdArrowDownward,
  MdPendingActions,
  MdClose
} from 'react-icons/md';
import { toast } from 'react-toastify';
import './ReviewerJournals.css'; 

const ReviewerJournals = ({ title, statusFilter }) => {
  const navigate = useNavigate();
  const [journals, setJournals] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewerFeedback, setReviewerFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic filter options
  const departments = useMemo(() => {
    return [...new Set(journals.map(j => j.department).filter(Boolean))];
  }, [journals]);

  const statuses = useMemo(() => {
    return [...new Set(journals.map(j => j.status).filter(Boolean))];
  }, [journals]);

  // Filtering Logic
  const filteredJournals = useMemo(() => {
    return journals.filter(journal => {
      const matchesSearch = (journal.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (journal.primaryAuthorName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (journal.journalId || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesTab = true;
      if (statusFilter === 'pending') {
        matchesTab = journal.status === 'Pending Review' || journal.status === 'Assigned';
      } else if (statusFilter === 'in-review') {
        matchesTab = journal.status === 'Under Review';
      } else if (statusFilter === 'completed') {
        matchesTab = ['Reviewed', 'Processed', 'Approved', 'Rejected', 'Published'].includes(journal.status);
      }

      const matchesDept = selectedDepartment ? journal.department === selectedDepartment : true;
      const matchesDropdownStatus = selectedStatus ? journal.status === selectedStatus : true;

      return matchesSearch && matchesTab && matchesDept && matchesDropdownStatus;
    });
  }, [journals, searchTerm, statusFilter, selectedDepartment, selectedStatus]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredJournals.length / entriesPerPage);
  const currentJournals = filteredJournals.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  useEffect(() => {
    fetchMyAssignments();
  }, []);

  const fetchMyAssignments = async () => {
    try {
      const token = localStorage.getItem('userToken');
      // Reviewers use the my-submissions endpoint to get their assignments
      const response = await fetch(`${import.meta.env.VITE_API_URL}/journals/my-submissions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setJournals(data);
      } else {
        toast.error('Failed to fetch assignments');
      }
    } catch (error) {
      toast.error('Error fetching assignments');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending Review': return <span className="badge-status pending">Pending</span>;
      case 'Under Review': return <span className="badge-status review">In Review</span>;
      case 'Reviewed': return <span className="badge-status reviewed">Reviewed</span>;
      case 'Published': return <span className="badge-status published">Published</span>;
      case 'Rejected': return <span className="badge-status rejected">Rejected</span>;
      default: return <span className="badge-status default">{status}</span>;
    }
  };

  const handleSubmitReview = async (status) => {
    if (!reviewerFeedback.trim()) {
      toast.error('Please provide some feedback before submitting.');
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('userToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/journals/${selectedJournal._id}/review`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, reviewerFeedback }),
      });
      
      const data = await response.json();
      if (response.ok) {
        toast.success(`Journal successfully ${status.toLowerCase()}!`);
        setSelectedJournal(null);
        setReviewerFeedback('');
        fetchMyAssignments();
      } else {
        toast.error(data.message || 'Error submitting review');
      }
    } catch (error) {
      toast.error('Error submitting review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="entries-wrap">
            <span>Show</span>
            <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>

            <div className="filter-group" style={{ display: 'flex', gap: '12px' }}>
              <select 
                value={selectedDepartment} 
                onChange={(e) => setSelectedDepartment(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', color: '#475569', fontSize: '13px' }}
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>

              {statusFilter === 'all' && (
                <select 
                  value={selectedStatus} 
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', color: '#475569', fontSize: '13px' }}
                >
                  <option value="">All Statuses</option>
                  {statuses.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="search-wrap">
              <MdSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search by ID, Title, Author..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ minWidth: '250px' }}
              />
            </div>
          </div>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th><div className="th-content">Journal ID <MdArrowDownward className="sort-icon" /></div></th>
                <th><div className="th-content">Title <MdArrowDownward className="sort-icon" /></div></th>
                <th><div className="th-content">Department</div></th>
                <th><div className="th-content">Research Area</div></th>
                <th><div className="th-content">Author</div></th>
                <th><div className="th-content">Date <MdArrowDownward className="sort-icon" /></div></th>
                <th><div className="th-content">Status</div></th>
                <th><div className="th-content">Action</div></th>
              </tr>
            </thead>
            <tbody>
              {currentJournals.map((journal) => (
                <tr key={journal._id}>
                  <td><strong>{journal.journalId}</strong></td>
                  <td>
                    <div 
                      title={journal.title}
                      style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}
                    >
                      {journal.title}
                    </div>
                  </td>
                  <td>{journal.department || 'N/A'}</td>
                  <td>{journal.researchArea || 'N/A'}</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span>{journal.primaryAuthorName}</span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>{journal.email}</span>
                    </div>
                  </td>
                  <td>{new Date(journal.createdAt).toLocaleDateString()}</td>
                  <td>{getStatusBadge(journal.status)}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-action view custom-tooltip-btn"
                        data-tooltip="View Details"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedJournal(journal);
                        }}
                      >
                        <MdOutlineRemoveRedEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentJournals.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
                    No journals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Previous
            </button>
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i + 1}
                  className={currentPage === i + 1 ? 'active' : ''}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Journal Details Modal */}
      {selectedJournal && (
        <div className="modal-overlay" onClick={() => setSelectedJournal(null)} style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)'
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{
            background: '#fff', width: '90%', maxWidth: '700px', maxHeight: '90vh',
            borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '20px', color: '#0f172a' }}>{selectedJournal.journalId}</h2>
                <span style={{ fontSize: '13px', color: '#64748b' }}>{new Date(selectedJournal.createdAt).toLocaleString()}</span>
              </div>
              <button onClick={() => { setSelectedJournal(null); setReviewerFeedback(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <MdClose size={24} />
              </button>
            </div>
            
            <div style={{ padding: '24px', overflowY: 'auto' }}>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '8px' }}>{selectedJournal.title}</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {getStatusBadge(selectedJournal.status)}
                  <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 500 }}>
                    {selectedJournal.department}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '14px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Abstract</h4>
                <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6' }}>{selectedJournal.abstract}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px', padding: '20px', background: '#f8fafc', borderRadius: '12px' }}>
                <div>
                  <h4 style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Primary Author</h4>
                  <p style={{ margin: 0, color: '#1e293b', fontWeight: 500 }}>{selectedJournal.primaryAuthorName}</p>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>{selectedJournal.email}</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Keywords</h4>
                  <p style={{ margin: 0, color: '#1e293b', fontWeight: 500 }}>
                    {selectedJournal.keywords && Array.isArray(selectedJournal.keywords) ? selectedJournal.keywords.join(', ') : 'N/A'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                <button 
                  onClick={() => {
                    if (selectedJournal.mainFilePath) {
                      const fileUrl = `${import.meta.env.VITE_API_URL.replace('/api', '')}/${selectedJournal.mainFilePath.replace(/\\/g, '/')}`;
                      window.open(fileUrl, '_blank');
                    } else {
                      toast.error('No file available to view');
                    }
                  }}
                  style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', color: '#334155', fontWeight: 600, cursor: 'pointer' }}
                >
                  View PDF
                </button>
                <button 
                  onClick={() => {
                    if (selectedJournal.mainFilePath) {
                      const fileUrl = `${import.meta.env.VITE_API_URL.replace('/api', '')}/${selectedJournal.mainFilePath.replace(/\\/g, '/')}`;
                      const fileName = selectedJournal.mainFilePath.split('/').pop().split('\\').pop() || 'Manuscript.pdf';
                      
                      const link = document.createElement('a');
                      link.href = fileUrl;
                      link.setAttribute('download', fileName);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      toast.success('Downloading started...');
                    } else {
                      toast.error('No file available to download');
                    }
                  }}
                  style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  Download Main File
                </button>
              </div>

              {/* Review Action Form for 'Under Review' Status */}
              {selectedJournal.status === 'Under Review' && (
                <div style={{ marginTop: '24px', padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '15px', color: '#1e293b', marginBottom: '12px', fontWeight: 600 }}>Reviewer Decision</h4>
                  <textarea 
                    value={reviewerFeedback}
                    onChange={(e) => setReviewerFeedback(e.target.value)}
                    placeholder="Enter your detailed feedback and remarks here..."
                    style={{ width: '100%', minHeight: '100px', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', marginBottom: '16px', resize: 'vertical' }}
                  ></textarea>
                  
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                      onClick={() => handleSubmitReview('Reviewed')}
                      disabled={isSubmitting}
                      style={{ flex: 1, padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#10b981', color: '#fff', fontWeight: 600, cursor: 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
                    >
                      {isSubmitting ? 'Submitting...' : 'Mark as Completed (Approve)'}
                    </button>
                    <button 
                      onClick={() => handleSubmitReview('Rejected')}
                      disabled={isSubmitting}
                      style={{ flex: 1, padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#ef4444', color: '#fff', fontWeight: 600, cursor: 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
                    >
                      {isSubmitting ? 'Submitting...' : 'Reject Journal'}
                    </button>
                  </div>
                </div>
              )}

              {/* Display Feedback if already reviewed or rejected */}
              {(selectedJournal.status === 'Reviewed' || selectedJournal.status === 'Rejected' || selectedJournal.status === 'Published') && selectedJournal.reviewerFeedback && (
                <div style={{ marginTop: '24px', padding: '20px', background: selectedJournal.status === 'Rejected' ? '#fef2f2' : '#ecfdf5', borderRadius: '12px', border: `1px solid ${selectedJournal.status === 'Rejected' ? '#fecaca' : '#a7f3d0'}` }}>
                  <h4 style={{ fontSize: '15px', color: selectedJournal.status === 'Rejected' ? '#991b1b' : '#065f46', marginBottom: '8px', fontWeight: 600 }}>Your Feedback</h4>
                  <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6', margin: 0 }}>
                    {selectedJournal.reviewerFeedback}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewerJournals;
