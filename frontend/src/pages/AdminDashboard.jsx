import React, { useState, useEffect } from 'react';
import {
  Users,
  UserCheck,
  Award,
  BookOpen,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import API from '../services/api';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      const res = await API.get('/dashboard/admin');
      if (res.data.success) {
        setData(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="flex bg-slate-50 min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8 text-center text-slate-500 text-sm">
          Loading Admin Control Console...
        </div>
      </div>
    );
  }

  const stats = data?.stats || {
    totalUsers: 0,
    totalTrainees: 0,
    totalTrainers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    completionRate: 0
  };

  const COLORS = ['#0c94eb', '#10b981', '#8b5cf6', '#f59e0b'];

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-8 space-y-8 max-w-7xl">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold bg-purple-600 text-white px-3 py-1 rounded-full uppercase tracking-wider">
              System Administration
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
              Platform-Wide Analytics & Governance
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              National Capacity Building Commission Overseer Dashboard
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatsCard title="Total Users" value={stats.totalUsers} icon={Users} color="brand" />
          <StatsCard title="Trainees" value={stats.totalTrainees} icon={UserCheck} color="emerald" />
          <StatsCard title="Trainers" value={stats.totalTrainers} icon={Award} color="purple" />
          <StatsCard title="Courses" value={stats.totalCourses} icon={BookOpen} color="amber" />
          <StatsCard title="Enrollments" value={stats.totalEnrollments} icon={TrendingUp} color="indigo" />
          <StatsCard title="Completion" value={`${stats.completionRate}%`} icon={CheckCircle2} color="brand" />
        </div>

        {/* Charts Grid */}
        <div id="analytics" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Growth Area Chart (2 cols) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-600" />
              <span>Monthly Enrollment & Completion Trajectory</span>
            </h2>
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.monthlyEnrollments || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="enrollments" stroke="#0c94eb" fill="#e0effe" name="Enrollments" />
                  <Area type="monotone" dataKey="completions" stroke="#10b981" fill="#d1fae5" name="Completions" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distribution Pie Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900">Category Distribution</h2>
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.categoryDistribution || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {(data?.categoryDistribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* User Management Table */}
        <div id="users" className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            <span>Registered Users & Roles</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="p-3 font-bold">User Name</th>
                  <th className="p-3 font-bold">Email</th>
                  <th className="p-3 font-bold">Role</th>
                  <th className="p-3 font-bold">Institution</th>
                  <th className="p-3 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data?.users?.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{u.name}</td>
                    <td className="p-3 text-slate-600 font-mono">{u.email}</td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          u.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : u.role === 'trainer'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500">{u.institution || 'General'}</td>
                    <td className="p-3 text-right">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
