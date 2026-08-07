import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UploadJournal from './pages/UploadJournal';
import JournalStatus from './pages/JournalStatus';
import JournalHistory from './pages/JournalHistory';
import ApprovedJournals from './pages/ApprovedJournals';
import RejectedJournals from './pages/RejectedJournals';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import JournalDetails from './pages/JournalDetails';
import TrackStatus from './pages/TrackStatus';
import JournalFiles from './pages/JournalFiles';

import { JournalProvider } from './context/JournalContext';

function App() {
  return (
    <JournalProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Dashboard Routes with Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="upload-journal" element={<UploadJournal />} />
          <Route path="journal-status" element={<JournalStatus />} />
          <Route path="journal-details" element={<JournalDetails />} />
          <Route path="journal-details/:id" element={<JournalDetails />} />
          <Route path="track-status" element={<TrackStatus />} />
          <Route path="track-status/:id" element={<TrackStatus />} />
          <Route path="journal-files" element={<JournalFiles />} />
          <Route path="journal-files/:id" element={<JournalFiles />} />
          <Route path="history" element={<JournalHistory />} />
          <Route path="history/:id" element={<JournalHistory />} />
          <Route path="approved" element={<ApprovedJournals />} />
          <Route path="rejected" element={<RejectedJournals />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </JournalProvider>
  );
}

export default App;
