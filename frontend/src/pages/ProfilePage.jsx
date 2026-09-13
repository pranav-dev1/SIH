import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Building, Edit3, Save, Award, BookOpen, CheckCircle2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [institution, setInstitution] = useState(user?.institution || '');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [stats, setStats] = useState({ enrolled: 0, completed: 0, certs: 0 });

  useEffect(() => {
    if (user?.role === 'trainee') {
      API.get('/dashboard/trainee').then((res) => {
        if (res.data.success) {
          setStats({
            enrolled: res.data.stats.enrolledCourses,
            completed: res.data.stats.completedCourses,
            certs: res.data.stats.certificatesEarned
          });
        }
      });
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');

    try {
      const res = await API.put('/auth/profile', { name, institution });
      if (res.data.success) {
        updateUserProfile({ name, institution });
        setMsg('Profile updated successfully!');
      }
    } catch (err) {
      setMsg('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-8 space-y-6 max-w-4xl">
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-600 flex items-center justify-center text-white font-extrabold text-2xl uppercase shadow-lg">
            {user?.name ? user.name.charAt(0) : 'U'}
          </div>
          <div>
            <span className="text-xs font-bold bg-brand-600 px-2.5 py-0.5 rounded uppercase tracking-wider">
              {user?.role} Account
            </span>
            <h1 className="text-2xl font-extrabold text-white mt-1">{user?.name}</h1>
            <p className="text-xs text-slate-300">{user?.email}</p>
          </div>
        </div>

        {/* Edit Profile Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="font-extrabold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Edit3 className="w-5 h-5 text-brand-600" />
            <span>Edit Profile Information</span>
          </h2>

          {msg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium">
              {msg}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (Immutable)</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-200 bg-slate-100 text-slate-500 rounded-xl cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Account Role</label>
              <div className="relative">
                <Shield className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={user?.role || ''}
                  disabled
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-200 bg-slate-100 text-slate-500 capitalize rounded-xl cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Institution / Organization</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
