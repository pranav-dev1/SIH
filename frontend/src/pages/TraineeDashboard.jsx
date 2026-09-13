import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  BarChart3,
  Award,
  ArrowRight,
  Clock,
  Sparkles,
  Calendar,
  Zap,
  Compass
} from 'lucide-react';
import StatsCard from '../components/StatsCard';
import CourseCard from '../components/CourseCard';
import Sidebar from '../components/Sidebar';
import AiAssistantModal from '../components/AiAssistantModal';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const TraineeDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await API.get('/dashboard/trainee');
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
    fetchDashboard();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await API.post('/enrollments', { courseId });
      fetchDashboard();
    } catch (err) {
      console.error('Enroll error');
    }
  };

  if (loading) {
    return (
      <div className="flex bg-slate-50 min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8 text-center text-slate-500 text-sm">
          Loading Trainee Dashboard...
        </div>
      </div>
    );
  }

  const stats = data?.stats || {
    enrolledCourses: 0,
    completedCourses: 0,
    learningProgress: 0,
    certificatesEarned: 0
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-8 space-y-8 max-w-7xl">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-brand-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold bg-brand-600/60 text-brand-200 px-3 py-1 rounded-full border border-brand-400/30">
              Trainee Capacity Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Trainee'} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Track your capacity building progress, complete assigned modules, take certifications, and view AI course recommendations.
            </p>
          </div>
          <Link
            to="/courses"
            className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-md text-xs flex items-center gap-2 shrink-0 transition"
          >
            <Compass className="w-4 h-4" />
            <span>Browse New Courses</span>
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Enrolled Courses"
            value={stats.enrolledCourses}
            icon={BookOpen}
            color="brand"
            subtext="Active learning modules"
          />
          <StatsCard
            title="Courses Completed"
            value={stats.completedCourses}
            icon={CheckCircle2}
            color="emerald"
            subtext="Fully certified"
          />
          <StatsCard
            title="Learning Progress"
            value={`${stats.learningProgress}%`}
            icon={BarChart3}
            color="purple"
            subtext="Average completion"
          />
          <StatsCard
            title="Certificates Earned"
            value={stats.certificatesEarned}
            icon={Award}
            color="amber"
            subtext="Digital credentials"
          />
        </div>

        {/* Continue Learning Section */}
        <section id="my-courses" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-brand-600" />
              <span>Continue Learning</span>
            </h2>
            <Link to="/courses" className="text-xs font-semibold text-brand-600 hover:underline">
              View All
            </Link>
          </div>

          {data?.continueLearning?.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No active course enrollments</p>
              <p className="text-xs text-slate-500 mt-1">Browse our course catalog and enroll to begin learning.</p>
              <Link
                to="/courses"
                className="mt-4 inline-block bg-brand-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Explore Catalog
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data?.continueLearning?.map((item) => (
                <div
                  key={item.enrollmentId}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-slate-500 font-medium">
                        {item.completedModuleIds?.length || 0} / {item.totalModules} Modules
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 mb-2">{item.title}</h3>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-600 font-semibold">
                        <span>Progress</span>
                        <span className="text-brand-600">{item.progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-brand-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${item.progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Status: {item.progressPercentage >= 100 ? 'Assessment Ready' : 'In Progress'}
                    </span>
                    <Link
                      to={`/courses/${item.courseId}/learn`}
                      className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 shadow-sm transition"
                    >
                      <span>Resume Course</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recommended Courses & Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recommended Courses (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>AI Recommended Courses</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data?.recommendedCourses?.map((course) => (
                <CourseCard key={course._id || course.id} course={course} onEnroll={handleEnroll} />
              ))}
            </div>
          </div>

          {/* Right Column: Activity & Upcoming Assessments */}
          <div className="space-y-6">
            {/* Upcoming Assessments */}
            <div id="assessments" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-600" />
                <span>Upcoming Assessments</span>
              </h3>

              <div className="space-y-3">
                {data?.upcomingAssessments?.map((ass) => (
                  <div key={ass.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-xs font-bold text-slate-900">{ass.title}</div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                      <span>Passing Score: {ass.passingScore}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {ass.duration}
                      </span>
                    </div>
                    <Link
                      to={`/courses/${ass.courseId}/assessment`}
                      className="mt-2 text-[11px] font-bold text-brand-600 hover:text-brand-700 block text-right"
                    >
                      Take Quiz →
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
              <div className="space-y-3">
                {data?.recentActivity?.map((act) => (
                  <div key={act.id} className="text-xs border-l-2 border-brand-500 pl-3 py-1 space-y-0.5">
                    <div className="font-semibold text-slate-800">{act.message}</div>
                    <div className="text-[10px] text-slate-400">{act.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Assistant Floating Widget */}
      <AiAssistantModal />
    </div>
  );
};

export default TraineeDashboard;
