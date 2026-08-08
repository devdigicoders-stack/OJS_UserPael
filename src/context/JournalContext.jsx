import React, { createContext, useContext, useState, useEffect } from 'react';
import { FiCheckCircle, FiEye, FiFileText, FiXCircle, FiSettings } from 'react-icons/fi';

const JournalContext = createContext();

export const useJournalContext = () => useContext(JournalContext);

// Initial Mock Data
const initialJournals = [
  { id: 'JNL-1001', title: 'A Novel Approach to AI in Healthcare', dept: 'Computer Science', category: 'Artificial Intelligence', date: '12 May 2024', status: 'Under Review' },
  { id: 'JNL-1002', title: 'Blockchain Technology: A Systematic Review', dept: 'Engineering', category: 'Cybersecurity', date: '10 May 2024', status: 'Processing' },
  { id: 'JNL-1003', title: 'Impact of Social Media on Youth', dept: 'Management', category: 'Social Sciences', date: '08 May 2024', status: 'Under Review' },
  { id: 'JNL-1004', title: 'Sustainable Energy and Future', dept: 'Engineering', category: 'Renewable Energy', date: '05 May 2024', status: 'Published' },
  { id: 'JNL-1005', title: 'Deep Learning Applications', dept: 'Computer Science', category: 'Deep Learning', date: '01 May 2024', status: 'Rejected' },
];

const initialActivities = [
  { text: 'Your journal "A Novel Approach to AI in Healthcare" is under review.', date: '15 May 2024', time: '10:30 AM', type: 'info' },
  { text: 'Reviewer assigned for "Blockchain Technology: A Systematic Review".', date: '14 May 2024', time: '02:15 PM', type: 'info' },
  { text: 'Revision requested for "Impact of Social Media on Youth".', date: '13 May 2024', time: '11:20 AM', type: 'warning' },
  { text: 'Your journal "Sustainable Energy and Future" has been published.', date: '10 May 2024', time: '09:45 AM', type: 'success' },
  { text: 'Your journal "Deep Learning Applications" has been rejected.', date: '08 May 2024', time: '03:40 PM', type: 'error' },
];

const initialProfile = {
  name: 'Dr. Rahul Sharma',
  email: 'rahul.sharma@university.ac.in',
  avatar: 'RS',
  designation: 'Associate Professor',
  institution: 'ABC University, New Delhi',
};

export const JournalProvider = ({ children }) => {
  const [journals, setJournals] = useState([]);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    avatar: '',
    designation: '',
    institution: '',
  });
  const [userStats, setUserStats] = useState(null);

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('ojs_activities');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Filter out dummy initial activities
      const realActivities = parsed.filter(a => !a.text.includes("A Novel Approach to AI in Healthcare") && !a.text.includes("Blockchain Technology") && !a.text.includes("Impact of Social Media") && !a.text.includes("Sustainable Energy") && !a.text.includes("Deep Learning Applications"));
      return realActivities;
    }
    return [];
  });

  const refreshData = async () => {
    await Promise.all([
      fetchProfile(),
      fetchMyJournals(),
      fetchUserStats()
    ]);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) return;
      
      const res = await fetch(`${import.meta.env.VITE_API_URL}/journals/my-stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUserStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch user stats', error);
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) return;
      
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProfile({
          name: data.name || '',
          email: data.email || '',
          avatar: data.initials || data.name?.substring(0, 2).toUpperCase() || 'US',
          designation: data.designation || '',
          institution: data.institution || '',
        });
      }
    } catch (error) {
      console.error('Failed to fetch profile', error);
    }
  };

  const fetchMyJournals = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) return;

      const res = await fetch(`${import.meta.env.VITE_API_URL}/journals/my-submissions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // Format to match UI
        const formatted = data.map(j => ({
          id: j.journalId || j._id?.toString() || 'N/A',
          title: j.title || 'Untitled',
          dept: j.department || 'General',
          category: j.keywords?.[0] || 'General',
          date: new Date(j.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          status: j.status || 'Pending Review',
          abstract: j.abstract,
          primaryAuthor: j.primaryAuthorName,
          keywords: j.keywords || [],
          pages: j.pages,
          doi: j.doi,
          volume: j.volume,
          issue: j.issue,
          views: j.views || 0,
          downloads: j.downloads || 0,
          citations: j.citations || 0,
          impactFactor: j.impactFactor || 0,
          mainFilePath: j.mainFilePath,
          image: j.image,
          additionalFilePaths: j.additionalFilePaths || [],
          publishDate: j.publishDate ? new Date(j.publishDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : null
        }));
        setJournals(formatted);
      }
    } catch (error) {
      console.error('Failed to fetch journals', error);
    }
  };

  useEffect(() => {
    localStorage.setItem('ojs_activities', JSON.stringify(activities));
  }, [activities]);

  const addJournal = async (journalData, mainFile, imageFile, additionalFiles = []) => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('Not authenticated');
      }

      const formData = new FormData();
      formData.append('title', journalData.title);
      formData.append('abstract', journalData.abstract);
      formData.append('department', journalData.department);
      formData.append('researchArea', journalData.researchArea);
      formData.append('keywords', JSON.stringify(journalData.keywords || []));
      formData.append('pages', journalData.pages);
      formData.append('primaryAuthorName', journalData.primaryAuthor);
      formData.append('email', journalData.email);
      formData.append('phone', journalData.phone);
      formData.append('phoneCode', journalData.phoneCode);
      formData.append('coAuthors', journalData.coAuthors);
      formData.append('isSameAuthor', journalData.isSameAuthor);
      
      if (mainFile) {
        formData.append('mainFile', mainFile);
      }
      if (imageFile) {
        formData.append('image', imageFile);
      }
      if (additionalFiles && additionalFiles.length > 0) {
        additionalFiles.forEach(file => {
          formData.append('additionalFiles', file);
        });
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/journals/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to upload journal');
      }

      const newJournal = await res.json();
      
      addActivity(`You submitted a new journal: "${newJournal.title}"`, 'success');
      
      // Refresh the list from backend
      fetchMyJournals();
      
      return true; // Indicate success to the caller
    } catch (error) {
      console.error('Error adding journal:', error);
      throw error;
    }
  };

  const updateJournalStatus = (id, newStatus) => {
    setJournals(prev => prev.map(j => j.id === id ? { ...j, status: newStatus } : j));
    addActivity(`Journal ${id} status updated to ${newStatus}`, 'info');
  };

  const addActivity = (text, type = 'info') => {
    const newAct = {
      text,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      type,
    };
    setActivities([newAct, ...activities]);
  };

  const updateProfile = (newData) => {
    setProfile(prev => ({ ...prev, ...newData }));
    addActivity('You updated your profile information.', 'success');
  };

  return (
    <JournalContext.Provider value={{
      journals,
      activities,
      profile,
      userStats,
      refreshData,
      addJournal,
      updateJournalStatus,
      addActivity,
      updateProfile
    }}>
      {children}
    </JournalContext.Provider>
  );
};
