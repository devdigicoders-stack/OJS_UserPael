import React, { useState, useEffect } from 'react';
import { MdCampaign, MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Basic placeholder for notifications until a real notification model is requested
    setNotifications([
      { id: 1, title: 'Welcome to the Praxis Portal', message: 'You have successfully logged in as a Reviewer.', date: new Date().toISOString(), read: false },
    ]);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    toast.success('Notification marked as read');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Notifications</h1>
      </div>

      <div className="card-panel">
        {notifications.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {notifications.map(notif => (
              <div 
                key={notif.id} 
                style={{ 
                  padding: '20px 24px', 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0', 
                  borderLeft: notif.read ? '1px solid #e2e8f0' : '4px solid #ef4444',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ 
                    background: notif.read ? '#f8fafc' : '#fee2e2', 
                    color: notif.read ? '#64748b' : '#ef4444', 
                    width: '46px', 
                    height: '46px', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MdCampaign size={24} />
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#1e293b', fontWeight: 600 }}>{notif.title}</h3>
                    <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#475569' }}>{notif.message}</p>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{new Date(notif.date).toLocaleString()}</span>
                  </div>
                </div>
                {!notif.read && (
                  <button 
                    onClick={() => markAsRead(notif.id)}
                    style={{
                      background: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600,
                      padding: '8px 14px', transition: 'all 0.2s', textTransform: 'uppercase'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f5f9'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
                  >
                    <MdCheckCircle size={16} /> Mark Read
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            No new notifications.
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
