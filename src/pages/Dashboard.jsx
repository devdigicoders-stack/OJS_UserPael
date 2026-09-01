import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiFileText, FiSend, FiEye, FiSettings,
  FiCheckCircle, FiXCircle, FiDownload, FiTrendingUp, FiTrendingDown,
  FiInfo
} from 'react-icons/fi';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';
import { useJournalContext } from '../context/JournalContext';
import CustomActionTooltip from '../components/Tooltip';

const DEPT_COLORS = ['#3B82F6', '#8B5CF6', '#F59E0B', '#14B8A6', '#EF4444', '#EC4899', '#06B6D4'];

const getStatusColor = (status) => {
  switch (status) {
    case 'Published': return { color: '#16A34A', bg: '#F0FDF4' };
    case 'Under Review': return { color: '#3B82F6', bg: '#EFF6FF' };
    case 'Processing': return { color: '#F59E0B', bg: '#FFFBEB' };
    case 'Rejected': return { color: '#EF4444', bg: '#FEF2F2' };
    default: return { color: '#8B5CF6', bg: '#F5F3FF' };
  }
};

const getIconByType = (type) => {
  switch (type) {
    case 'success': return { icon: FiCheckCircle, bg: '#F0FDF4', color: '#22C55E' };
    case 'warning': return { icon: FiFileText, bg: '#FFFBEB', color: '#F59E0B' };
    case 'error': return { icon: FiXCircle, bg: '#FEF2F2', color: '#EF4444' };
    default: return { icon: FiEye, bg: '#EFF6FF', color: '#3B82F6' };
  }
};

const StatCard = ({ label, value, Icon, iconBg, iconColor, badge, badgeUp, trend }) => (
  <div style={{
    background: '#fff', borderRadius: '12px', padding: '14px 16px',
    border: '1px solid #F3F4F6', boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
    display: 'flex', flexDirection: 'column', gap: '2px',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
      <div style={{ background: iconBg, borderRadius: '8px', padding: '7px', display: 'flex' }}>
        <Icon size={16} color={iconColor} />
      </div>
      <p style={{ fontSize: '11.5px', color: '#6B7280', fontWeight: 500 }}>{label}</p>
    </div>
    <p style={{ fontSize: '24px', fontWeight: 800, color: '#111827', fontFamily: 'Poppins, sans-serif', lineHeight: 1 }}>{value}</p>
    {trend && (
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '5px' }}>
        {badgeUp ? <FiTrendingUp size={11} color="#22C55E" /> : <FiTrendingDown size={11} color="#EF4444" />}
        <span style={{ fontSize: '11px', color: badgeUp ? '#16A34A' : '#DC2626', fontWeight: 600 }}>{badge}</span>
        <svg width="50" height="18" style={{ marginLeft: 'auto' }} viewBox="0 0 60 24">
          <polyline points={trend} fill="none" stroke={badgeUp ? '#22C55E' : '#EF4444'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '8px 12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}>
        <p style={{ fontWeight: 600, color: '#374151', marginBottom: '4px' }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></p>
        ))}
      </div>
    );
  }
  return null;
};

const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return percent > 0.05 ? (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

const Dashboard = () => {
  const { journals, activities } = useJournalContext();
  const [trendFilter, setTrendFilter] = useState('This Year');
  const [deptFilter, setDeptFilter] = useState('This Year');
  const [bankDetails, setBankDetails] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/settings/public`)
      .then(res => res.json())
      .then(data => setBankDetails(data))
      .catch(() => {});
  }, []);

  // Dynamic Data Calculations
  const stats = {
    total: journals.length,
    processing: journals.filter(j => j.status === 'Processing').length,
    underReview: journals.filter(j => j.status === 'Under Review').length,
    published: journals.filter(j => j.status === 'Published').length,
    rejected: journals.filter(j => j.status === 'Rejected').length,
  };

  // Pie Chart Data
  const pieData = [
    { name: 'Published', value: stats.published, color: '#22C55E' },
    { name: 'Under Review', value: stats.underReview, color: '#3B82F6' },
    { name: 'Processing', value: stats.processing, color: '#F59E0B' },
    { name: 'Rejected', value: stats.rejected, color: '#EF4444' },
  ].filter(d => d.value > 0);

  // Dept Chart Data
  const deptCounts = journals.reduce((acc, j) => {
    acc[j.dept] = (acc[j.dept] || 0) + 1;
    return acc;
  }, {});
  const deptData = Object.keys(deptCounts).map(k => ({ name: k.replace(' ', '\n'), value: deptCounts[k] }));

  // Dynamic Trend Data
  const currentYear = new Date().getFullYear();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const monthlyCounts = Array(12).fill(0);
  journals.forEach(j => {
    const d = new Date(j.date);
    if (!isNaN(d) && d.getFullYear() === currentYear) {
      monthlyCounts[d.getMonth()]++;
    }
  });

  const submissionTrend = months.map((month, index) => ({
    month,
    value: monthlyCounts[index]
  })).slice(0, new Date().getMonth() + 1); // Show up to current month

  // Dynamic Recent Activities based on journals
  const generatedActivities = journals.slice(0, 5).map(j => {
    let type = 'info';
    let text = `Your journal "${j.title}" is ${j.status.toLowerCase()}.`;
    
    if (j.status === 'Published') {
      type = 'success';
      text = `Your journal "${j.title}" has been published.`;
    } else if (j.status === 'Rejected') {
      type = 'error';
      text = `Your journal "${j.title}" has been rejected.`;
    } else if (j.status === 'Processing') {
      type = 'info';
      text = `You submitted a new journal: "${j.title}".`;
    }

    return {
      text,
      date: j.date,
      time: '12:00 PM', // Fallback since we don't have exact time in formatted date
      type
    };
  });

  const recentJournals = journals.slice(0, 5);
  
  // Merge context activities (like profile updates) with generated journal activities
  const allActivities = [...activities, ...generatedActivities];
  // Simple deduplication based on text just in case
  const uniqueActivities = Array.from(new Map(allActivities.map(a => [a.text, a])).values());
  const recentActivities = uniqueActivities.slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* ── Stat Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' }}>
        <StatCard label="Total Journals" value={stats.total} Icon={FiFileText} iconBg="#EFF6FF" iconColor="#2563EB" badge="12% this month" badgeUp trend="0,20 10,14 20,16 30,10 40,12 50,8 60,6" />
        <StatCard label="Processing" value={stats.processing} Icon={FiSettings} iconBg="#F0FDFA" iconColor="#0D9488" badge="1% this month" badgeUp={false} trend="0,6 10,8 20,10 30,12 40,10 50,12 60,14" />
        <StatCard label="Under Review" value={stats.underReview} Icon={FiEye} iconBg="#FFFBEB" iconColor="#D97706" badge="3% this month" badgeUp trend="0,18 10,14 20,16 30,12 40,10 50,12 60,8" />
        <StatCard label="Published" value={stats.published} Icon={FiCheckCircle} iconBg="#F0FDF4" iconColor="#16A34A" badge="15% this month" badgeUp trend="0,20 10,16 20,14 30,10 40,8 50,6 60,4" />
        <StatCard label="Rejected" value={stats.rejected} Icon={FiXCircle} iconBg="#FEF2F2" iconColor="#DC2626" badge="2% this month" badgeUp={false} trend="0,4 10,6 20,8 30,6 40,4 50,8 60,10" />
      </div>

      {/* ── Charts Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        
        {/* Submission Trend */}
        <div style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #F3F4F6', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>Submission Trend</h3>
            <select value={trendFilter} onChange={e => setTrendFilter(e.target.value)} style={{ fontSize: '12px', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '4px 10px', color: '#6B7280', outline: 'none', cursor: 'pointer' }}>
              <option>This Year</option><option>Last Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={submissionTrend} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} domain={[0, 'dataMax + 5']} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="value" name="Submissions" stroke="#2563EB" strokeWidth={2.5} dot={{ fill: '#2563EB', r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Journal Status Overview (Donut) */}
        <div style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #F3F4F6', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '0 0 16px' }}>Journal Status Overview</h3>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" labelLine={false} label={renderPieLabel}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <text x="50%" y="48%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '20px', fontWeight: 800, fill: '#111827', fontFamily: 'Poppins' }}>{stats.total}</text>
                <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '10px', fill: '#9CA3AF' }}>Total</text>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {pieData.map(({ name, value, color }) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                    <span style={{ fontSize: '11.5px', color: '#6B7280' }}>{name}</span>
                  </div>
                  <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#374151' }}>{value} ({Math.round((value / stats.total) * 100)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department Wise Submissions */}
        <div style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #F3F4F6', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>Dept. Wise Submissions</h3>
            <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} style={{ fontSize: '12px', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '4px 10px', color: '#6B7280', outline: 'none', cursor: 'pointer' }}>
              <option>This Year</option><option>Last Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={deptData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} domain={[0, 'dataMax + 2']} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Submissions" radius={[5, 5, 0, 0]} maxBarSize={32}>
                {deptData.map((_, i) => <Cell key={i} fill={DEPT_COLORS[i % DEPT_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Bottom Row: Table + Activities ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '16px' }}>
        
        {/* Recent Submitted Journals Table */}
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #F3F4F6', boxShadow: '0 1px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px 14px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>Recent Journals</h3>
            <Link to="/dashboard/history" style={{ fontSize: '12.5px', color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>View All</Link>
          </div>
          {recentJournals.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#F9FAFB', borderTop: '1px solid #F3F4F6', borderBottom: '1px solid #F3F4F6' }}>
                    {['ID', 'Title', 'Submitted On', 'Status', 'Action'].map(h => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: '#6B7280', fontSize: '12px', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentJournals.map((j, i) => {
                    const st = getStatusColor(j.status);
                    return (
                      <tr key={i} style={{ borderBottom: '1px solid #F9FAFB', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={{ padding: '12px 16px', color: '#374151', fontWeight: 600 }}>{j.id}</td>
                        <td style={{ padding: '12px 16px', color: '#111827', fontWeight: 500, maxWidth: '200px' }}>
                          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j.title}</div>
                        </td>
                        <td style={{ padding: '12px 16px', color: '#6B7280', whiteSpace: 'nowrap' }}>{j.date}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ background: st.bg, color: st.color, fontSize: '11.5px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px' }}>
                            {j.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <CustomActionTooltip text="View Details">
                            <Link to={`/dashboard/journal-details/${j.id}`} style={{ color: '#2563EB', display: 'flex' }}><FiEye size={16} /></Link>
                          </CustomActionTooltip>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#9CA3AF' }}>
              <FiFileText size={32} style={{ opacity: 0.5, marginBottom: '10px' }} />
              <p>No journals submitted yet.</p>
            </div>
          )}
        </div>

        {/* Recent Activities */}
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #F3F4F6', boxShadow: '0 1px 6px rgba(0,0,0,0.05)', padding: '18px 20px', overflowY: 'auto', maxHeight: '350px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>Recent Activities</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentActivities.map((a, i) => {
              const iconData = getIconByType(a.type);
              const Icon = iconData.icon;
              return (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ background: iconData.bg, borderRadius: '10px', padding: '8px', display: 'flex', flexShrink: 0 }}>
                    <Icon size={15} color={iconData.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '12.5px', color: '#374151', margin: '0 0 2px', lineHeight: 1.5 }}>{a.text}</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: 0 }}>{a.date} &bull; {a.time}</p>
                  </div>
                </div>
              );
            })}
            {recentActivities.length === 0 && (
              <p style={{ color: '#9CA3AF', textAlign: 'center', marginTop: '20px', fontSize: '13px' }}>No activities yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Bank Details Card ── */}
      {bankDetails && (bankDetails.bankName || bankDetails.accountNumber) && (
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #F3F4F6', boxShadow: '0 1px 6px rgba(0,0,0,0.05)', padding: '20px 24px' }}>
          <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#111827', fontFamily: 'Poppins, sans-serif', margin: '0 0 16px' }}>Payment / Bank Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
            {bankDetails.bankName && (
              <div>
                <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '2px' }}>Bank Name</p>
                <p style={{ fontSize: '13.5px', fontWeight: 600, color: '#111827' }}>{bankDetails.bankName}</p>
              </div>
            )}
            {bankDetails.accountName && (
              <div>
                <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '2px' }}>Account Holder</p>
                <p style={{ fontSize: '13.5px', fontWeight: 600, color: '#111827' }}>{bankDetails.accountName}</p>
              </div>
            )}
            {bankDetails.accountNumber && (
              <div>
                <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '2px' }}>Account Number</p>
                <p style={{ fontSize: '13.5px', fontWeight: 600, color: '#111827' }}>{bankDetails.accountNumber}</p>
              </div>
            )}
            {bankDetails.ifscCode && (
              <div>
                <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '2px' }}>IFSC Code</p>
                <p style={{ fontSize: '13.5px', fontWeight: 600, color: '#111827' }}>{bankDetails.ifscCode}</p>
              </div>
            )}
            {bankDetails.upiId && (
              <div>
                <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '2px' }}>UPI ID</p>
                <p style={{ fontSize: '13.5px', fontWeight: 600, color: '#111827' }}>{bankDetails.upiId}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
