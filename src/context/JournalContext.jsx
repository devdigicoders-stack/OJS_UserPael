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
  const [journals, setJournals] = useState(() => {
    const saved = localStorage.getItem('ojs_journals');
    return saved ? JSON.parse(saved) : initialJournals;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('ojs_activities');
    return saved ? JSON.parse(saved) : initialActivities;
  });

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('ojs_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('ojs_journals', JSON.stringify(journals));
  }, [journals]);

  useEffect(() => {
    localStorage.setItem('ojs_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('ojs_profile', JSON.stringify(profile));
  }, [profile]);

  // Actions
  const addJournal = (journalData) => {
    const newJournal = {
      id: `JNL-${1000 + journals.length + 1}`,
      title: journalData.title || 'Untitled Journal',
      dept: journalData.department || 'General',
      category: journalData.category || 'General',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Processing',
      ...journalData
    };
    setJournals([newJournal, ...journals]);
    addActivity(`You submitted a new journal: "${newJournal.title}"`, 'success');
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
      addJournal,
      updateJournalStatus,
      addActivity,
      updateProfile
    }}>
      {children}
    </JournalContext.Provider>
  );
};
