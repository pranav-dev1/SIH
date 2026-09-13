import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Users,
  BarChart3,
  Star,
  PlusCircle,
  Trash2,
  Edit,
  CheckCircle2,
  MessageSquare,
  X
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const TrainerDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New course form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Disaster Management');
  const [newDifficulty, setNewDifficulty] = useState('Intermediate');
  const [newDuration, setNewDuration] = useState('3 Weeks');
  const [newDescription, setNewDescription] = useState('');

  const fetchTrainerData = async () => {
    try {
      const res = await API.get('/dashboard/trainer');
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
    fetchTrainerData();
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDescription) return;

    try {
      const res = await API.post('/courses', {
        title: newTitle,
        category: newCategory,
        difficulty: newDifficulty,
        duration: newDuration,
        description: newDescription,
        modules: [
          {
            id: 'm1',
            title: 'Module 1: Foundations & Core Concepts',
            description: 'Introduction to foundational knowledge and standards.',
            lessons: [{ id: 'l1', title: '1.1 Principles', content: newDescription }]
          },
          {
            id: 'm2',
            title: 'Module 2: Practical Field Application',
            description: 'Hands-on operational protocols and team execution.',
            lessons: [{ id: 'l2', title: '2.1 Implementation Guide', content: 'Operational deployment guidelines.' }]
          }
        ]
      });

      if (res.data.success) {
        setShowCreateModal(false);
        setNewTitle('');
        setNewDescription('');
        fetchTrainerData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await API.delete(`/courses/${courseId}`);
      fetchTrainerData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex bg-slate-50 min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8 text-center text-slate-500 text-sm">
          Loading Trainer Portal...
        </div>
      </div>
    );
  }

  const stats = data?.stats || {
    totalCourses: 0,
    totalTrainees: 0,
    avgCompletionRate: 0,
    avgRating: 0
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-8 space-y-8 max-w-7xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold bg-blue-600/80 text-blue-200 px-3 py-1 rounded-full border border-blue-400/30 uppercase tracking-wider">
              Trainer & Instructor Management
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
              Trainer Portal - {user?.name || 'Dr. Ananya'}
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Manage course curriculum, monitor trainee completion rates, analyze ratings, and publish modules.
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-md text-xs flex items-center gap-2 shrink-0 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Course</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Courses" value={stats.totalCourses} icon={BookOpen} color="brand" />
          <StatsCard title="Total Trainees" value={stats.totalTrainees} icon={Users} color="purple" />
          <StatsCard title="Avg Completion" value={`${stats.avgCompletionRate}%`} icon={BarChart3} color="emerald" />
          <StatsCard title="Average Rating" value={`★ ${stats.avgRating}`} icon={Star} color="amber" />
        </div>

        {/* Recharts Analytics Section */}
        <div id="analytics" className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand-600" />
            <span>Trainee Enrollment vs Completion Analytics</span>
          </h2>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.chartData || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="enrolled" fill="#0c94eb" name="Enrolled Trainees" radius={[6, 6, 0, 0]} />
                <Bar dataKey="completed" fill="#10b981" name="Completed Trainees" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Courses Management Table */}
        <div id="courses" className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Your Published Courses</h2>
            <span className="text-xs text-slate-500 font-medium">{data?.courses?.length || 0} Courses</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="p-3 font-bold">Course Title</th>
                  <th className="p-3 font-bold">Category</th>
                  <th className="p-3 font-bold">Difficulty</th>
                  <th className="p-3 font-bold">Duration</th>
                  <th className="p-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data?.courses?.map((c) => {
                  const cId = c._id || c.id;
                  return (
                    <tr key={cId} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">{c.title}</td>
                      <td className="p-3 text-slate-600">{c.category}</td>
                      <td className="p-3 font-medium text-brand-700">{c.difficulty}</td>
                      <td className="p-3 text-slate-500">{c.duration}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteCourse(cId)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete Course"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enrolled Trainees List */}
        <div id="trainees" className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            <span>Recent Enrolled Trainees</span>
          </h2>
          <div className="divide-y divide-slate-100">
            {data?.enrolledTrainees?.map((t) => (
              <div key={t._id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{t.name}</div>
                  <div className="text-[11px] text-slate-500">{t.email} • {t.institution}</div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  Active Trainee
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Create Capacity Course</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Course Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Advanced Urban Flood Management"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white font-medium"
                  >
                    <option value="Disaster Management">Disaster Management</option>
                    <option value="Environmental Science">Environmental Science</option>
                    <option value="Digital Skills">Digital Skills</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white font-medium"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  placeholder="e.g. 3 Weeks (10 Hours)"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe course objectives and learning outcome..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  required
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-sm"
                >
                  Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerDashboard;
