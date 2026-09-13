import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  FileCheck2,
  Award,
  MessageSquarePlus,
  User,
  LogOut,
  ShieldAlert,
  Users,
  PlusCircle,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const traineeLinks = [
    { label: 'Dashboard', path: '/trainee/dashboard', icon: LayoutDashboard },
    { label: 'My Courses', path: '/trainee/dashboard', hash: '#my-courses', icon: BookOpen },
    { label: 'Browse Courses', path: '/courses', icon: Compass },
    { label: 'Assessments', path: '/trainee/dashboard', hash: '#assessments', icon: FileCheck2 },
    { label: 'Certificates', path: '/trainee/certificates', icon: Award },
    { label: 'Feedback', path: '/trainee/feedback', icon: MessageSquarePlus },
    { label: 'Profile', path: '/profile', icon: User }
  ];

  const trainerLinks = [
    { label: 'Dashboard', path: '/trainer/dashboard', icon: LayoutDashboard },
    { label: 'Manage Courses', path: '/trainer/dashboard', hash: '#courses', icon: BookOpen },
    { label: 'Create Course', path: '/trainer/dashboard', hash: '#create', icon: PlusCircle },
    { label: 'Enrolled Trainees', path: '/trainer/dashboard', hash: '#trainees', icon: Users },
    { label: 'Feedback Reviews', path: '/trainer/dashboard', hash: '#feedback', icon: MessageSquarePlus },
    { label: 'Profile', path: '/profile', icon: User }
  ];

  const adminLinks = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Manage Users', path: '/admin/dashboard', hash: '#users', icon: Users },
    { label: 'Manage Courses', path: '/admin/dashboard', hash: '#courses', icon: BookOpen },
    { label: 'Platform Analytics', path: '/admin/dashboard', hash: '#analytics', icon: BarChart3 },
    { label: 'Profile', path: '/profile', icon: User }
  ];

  const links =
    user.role === 'trainer'
      ? trainerLinks
      : user.role === 'admin'
      ? adminLinks
      : traineeLinks;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between shrink-0 hidden md:flex">
      <div className="space-y-6">
        {/* User Role Badge Header */}
        <div className="p-3.5 bg-slate-900 text-white rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center font-bold text-white uppercase text-sm">
            {user.name ? user.name.charAt(0) : 'U'}
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold truncate">{user.name}</div>
            <div className="text-[10px] text-brand-300 font-semibold uppercase tracking-wider">
              {user.role} Portal
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Navigation
          </div>
          {links.map((link, idx) => {
            const Icon = link.icon;
            const isActive =
              location.pathname === link.path && (!link.hash || location.hash === link.hash);

            return (
              <Link
                key={idx}
                to={link.hash ? `${link.path}${link.hash}` : link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 border border-brand-200/60 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-500'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Logout Action */}
      <div className="pt-4 border-t border-slate-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
