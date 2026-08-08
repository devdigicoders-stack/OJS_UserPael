import React, { useState, useEffect } from 'react';
import { 
  MdLibraryBooks, 
  MdSync, 
  MdFactCheck, 
  MdSend
} from 'react-icons/md';
import { toast } from 'react-toastify';
import { 
  LineChart, Line, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import './ReviewerDashboard.css';

const ReviewerDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    processing: 0,
    underReview: 0,
    published: 0,
    rejected: 0,
    monthlyStats: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) return;

      const headers = {
        'Authorization': `Bearer ${token}`
      };

      // We can use the existing my-stats endpoint for the reviewer
      const statsRes = await fetch(`${import.meta.env.VITE_API_URL}/journals/my-stats`, { headers });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error fetching reviewer dashboard data:', error);
      toast.error('Failed to load dashboard data');
    }
  };

  const total = stats.total || 0;
  const underReview = stats.underReview || 0;
  const completed = (stats.published || 0) + (stats.rejected || 0);
  const pending = total - underReview - completed;

  const getPerc = (val) => total > 0 ? Math.round((val / total) * 100) : 0;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Reviewer Dashboard</h1>
      </div>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-info">
            <h3>My Assignments</h3>
            <p className="stat-value">{total}</p>
            <p className="stat-trend">100%</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>Pending Reviews</h3>
            <p className="stat-value">{pending}</p>
            <p className="stat-trend" style={{color: '#10b981'}}>{getPerc(pending)}%</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>In Review</h3>
            <p className="stat-value">{underReview}</p>
            <p className="stat-trend">{getPerc(underReview)}%</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>Completed Reviews</h3>
            <p className="stat-value">{completed}</p>
            <p className="stat-trend">{getPerc(completed)}%</p>
          </div>
        </div>
      </div>

      <div className="charts-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
        <div className="chart-card">
          <h3 className="chart-title">Monthly Submissions Overview</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={stats.monthlyStats && stats.monthlyStats.length > 0 ? stats.monthlyStats : [
                  { name: 'JAN', count: 0 }, { name: 'FEB', count: 0 }, { name: 'MAR', count: 0 },
                  { name: 'APR', count: 0 }, { name: 'MAY', count: 0 }, { name: 'JUN', count: 0 },
                  { name: 'JUL', count: 0 }, { name: 'AUG', count: 0 }, { name: 'SEP', count: 0 },
                  { name: 'OCT', count: 0 }, { name: 'NOV', count: 0 }, { name: 'DEC', count: 0 }
                ]}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981'}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Distribution of Assignments</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Pending', count: pending },
                  { name: 'In Review', count: underReview },
                  { name: 'Completed', count: completed }
                ]}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                barSize={30}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="count" fill="#10b981" radius={[0, 0, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewerDashboard;
