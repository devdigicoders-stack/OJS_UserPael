import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome, FiUploadCloud, FiClipboard, FiCheckCircle,
  FiXCircle, FiBook, FiUser, FiLock,
  FiLogOut, FiMenu, FiX, FiBell, FiMoon, FiSearch
} from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useJournalContext } from '../context/JournalContext';

const menuItems = [
  { path: '/dashboard', name: 'Dashboard', icon: FiHome },
  { path: '/dashboard/upload-journal', name: 'Upload Journal', icon: FiUploadCloud },
  { path: '/dashboard/journal-status', name: 'My Journals', icon: FiBook },
  { path: '/dashboard/history', name: 'Submission History', icon: FiClipboard },
  { path: '/dashboard/approved', name: 'Approved Journals', icon: FiCheckCircle },
  { path: '/dashboard/rejected', name: 'Rejected Journals', icon: FiXCircle },
];

const bottomItems = [
  { path: '/dashboard/profile', name: 'My Profile', icon: FiUser },
  { path: '/dashboard/change-password', name: 'Change Password', icon: FiLock },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    path === '/dashboard'
      ? location.pathname === '/dashboard'
      : location.pathname.startsWith(path);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your session.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1E3A8A',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
    }).then((result) => {
      if (result.isConfirmed) navigate('/login');
    });
  };

  const currentPage = [...menuItems, ...bottomItems].find(m => isActive(m.path))?.name || 'Dashboard';

  const { profile } = useJournalContext();
  const userName = profile?.name || 'Author';
  const userInitials = profile?.avatar || userName.substring(0, 2).toUpperCase() || 'US';
  const userInstitution = profile?.institution || 'OJS Portal';
  const userDesignation = profile?.designation || 'Author';

  return (
    <div className="dashboard-layout" style={{ display: 'flex', height: '100vh', background: '#F1F5F9', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 20 }}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className="dashboard-sidebar" style={{
        width: '220px', flexShrink: 0,
        background: 'linear-gradient(180deg, #0f2460 0%, #1a3a8f 60%, #0d5c52 100%)',
        display: 'flex', flexDirection: 'column',
        position: sidebarOpen ? 'fixed' : 'relative',
        inset: sidebarOpen ? '0 auto 0 0' : 'auto',
        zIndex: sidebarOpen ? 30 : 'auto',
        transform: sidebarOpen || window.innerWidth >= 1024 ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s',
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '8px', display: 'flex' }}>
            <FiBook size={18} color="#fff" />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: '15px', color: '#fff', fontFamily: 'Poppins, sans-serif', lineHeight: 1.2 }}>OJS Portal</p>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>Open Journal System</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: window.innerWidth < 1024 ? 'flex' : 'none' }}>
            <FiX size={20} />
          </button>
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '16px 12px' }}>
          {menuItems.map(({ path, name, icon: Icon }) => {
            const active = isActive(path);
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '11px',
                  padding: '12px 14px', borderRadius: '10px', marginBottom: '8px',
                  textDecoration: 'none', fontWeight: active ? 600 : 500,
                  fontSize: '14px', transition: 'all 0.15s',
                  background: active ? 'rgba(255,255,255,0.18)' : 'transparent',
                  color: active ? '#fff' : 'rgba(255,255,255,0.65)',
                  borderLeft: active ? '3px solid #60b4ff' : '3px solid transparent',
                }}
              >
                <Icon size={16} />
                {name}
              </Link>
            );
          })}

          {/* Divider */}
          <div style={{ margin: '16px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }} />

          {bottomItems.map(({ path, name, icon: Icon }) => {
            const active = isActive(path);
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '11px',
                  padding: '12px 14px', borderRadius: '10px', marginBottom: '8px',
                  textDecoration: 'none', fontWeight: active ? 600 : 500,
                  fontSize: '14px', transition: 'all 0.15s',
                  background: active ? 'rgba(255,255,255,0.18)' : 'transparent',
                  color: active ? '#fff' : 'rgba(255,255,255,0.65)',
                  borderLeft: active ? '3px solid #60b4ff' : '3px solid transparent',
                }}
              >
                <Icon size={16} />
                {name}
              </Link>
            );
          })}

          <div style={{ margin: '16px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }} />
          
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '11px',
              padding: '12px 14px', borderRadius: '10px', width: '100%',
              background: 'rgba(239,68,68,0.15)', border: 'none',
              color: '#FCA5A5', fontWeight: 600, fontSize: '14px',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            <FiLogOut size={16} /> Logout
          </button>
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <div className="dashboard-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* ── Top Header ── */}
        <header className="dashboard-header" style={{
          background: '#fff', borderBottom: '1px solid #E5E7EB',
          height: '64px', display: 'flex', alignItems: 'center',
          padding: '0 24px', gap: '16px', flexShrink: 0,
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
          {/* Hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', display: 'none' }}
            className="lg-hide-hamburger"
          >
            <FiMenu size={22} />
          </button>

          {/* Welcome text */}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Welcome Back,</p>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>
              {userName} 👋
            </h2>
            <p style={{ fontSize: '11px', color: '#9CA3AF', margin: 0 }}>{userInstitution} | {userDesignation}</p>
          </div>

          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#F9FAFB', border: '1px solid #E5E7EB',
            borderRadius: '10px', padding: '8px 14px', minWidth: '220px',
          }}>
            <FiSearch size={15} color="#9CA3AF" />
            <input
              type="text" placeholder="Search anything..."
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', color: '#374151', flex: 1 }}
            />
            <span style={{ fontSize: '11px', color: '#D1D5DB', fontWeight: 500, whiteSpace: 'nowrap' }}>Ctrl + K</span>
          </div>

          {/* Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={() => toast.info('You have 2 pending tasks to review.')}
              style={{ position: 'relative', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '8px', cursor: 'pointer', display: 'flex' }}
            >
              <FiBell size={18} color="#6B7280" />
              <span style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', background: '#EF4444', borderRadius: '50%', border: '2px solid #fff' }} />
            </button>

            {/* Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 12px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', cursor: 'pointer' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #1E3A8A, #2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '13px' }}>
                {userInitials}
              </div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#111827', margin: 0, lineHeight: 1.3 }}>{userName}</p>
                <p style={{ fontSize: '10px', color: '#9CA3AF', margin: 0 }}>Author</p>
              </div>
            </div>
          </div>
        </header>

        {/* ── Page Content ── */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <Outlet />
          </div>
        </main>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .lg-hide-hamburger { display: flex !important; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
