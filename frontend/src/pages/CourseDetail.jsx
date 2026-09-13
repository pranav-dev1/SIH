import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  PlayCircle,
  User,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchCourse = async () => {
    try {
      const res = await API.get(`/courses/${id}`);
      if (res.data.success) {
        setCourse(res.data.course);
        setEnrollment(res.data.enrollment);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const res = await API.post('/enrollments', { courseId: id });
      if (res.data.success) {
        setEnrollment(res.data.enrollment);
        navigate(`/courses/${id}/learn`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-500 text-sm">Loading course details...</div>;
  }

  if (!course) {
    return <div className="py-20 text-center text-slate-500 text-sm">Course not found.</div>;
  }

  const isEnrolled = !!enrollment;
  const progressPercentage = enrollment ? enrollment.progressPercentage : 0;
  const completedModuleIds = enrollment ? enrollment.completedModuleIds || [] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/courses" className="hover:text-slate-900">Courses</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-slate-800 truncate">{course.title}</span>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-brand-950 text-white p-8 rounded-3xl shadow-xl space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold bg-brand-600 px-3 py-1 rounded-full uppercase tracking-wider">
            {course.category}
          </span>
          <span className="text-xs font-semibold bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            {course.difficulty} Difficulty
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
          {course.title}
        </h1>

        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          {course.description}
        </p>

        {/* Course Meta Info */}
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-700/80 text-xs font-medium text-slate-300">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-brand-400" />
            <span>Instructor: <strong className="text-white">{course.trainerName || 'Dr. Ananya Sharma'}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-400" />
            <span>Duration: <strong className="text-white">{course.duration}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-brand-400" />
            <span>Curriculum: <strong className="text-white">{course.modules ? course.modules.length : 4} Modules</strong></span>
          </div>
        </div>

        {/* Enrollment Progress if enrolled */}
        {isEnrolled && (
          <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-200">
              <span>Your Learning Progress</span>
              <span className="text-brand-400">{progressPercentage}% Completed</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-brand-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div>
          {isEnrolled ? (
            <Link
              to={`/courses/${id}/learn`}
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition text-xs"
            >
              <PlayCircle className="w-5 h-5" />
              <span>Resume Learning Material</span>
            </Link>
          ) : (
            <button
              onClick={handleEnroll}
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition text-xs"
            >
              <span>Enroll in Course</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Learning Objectives & Modules */}
        <div className="lg:col-span-2 space-y-8">
          {/* Objectives */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>What You Will Learn</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(course.learningObjectives || [
                'Understand natural hazard classification and risk maps',
                'Master rapid emergency evacuation planning & response',
                'Deploy community early warning notifications effectively',
                'Evaluate post-disaster rehabilitation requirements'
              ]).map((obj, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Modules */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-600" />
              <span>Course Curriculum</span>
            </h3>

            <div className="space-y-4 divide-y divide-slate-100">
              {course.modules?.map((mod, idx) => {
                const isCompleted = completedModuleIds.includes(mod.id);
                return (
                  <div key={mod.id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{mod.title}</h4>
                          <p className="text-xs text-slate-500">{mod.description}</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-medium text-slate-400">
                        {mod.lessons?.length || 1} Lessons
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Course Overview Summary Box */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
              Course Details Summary
            </h4>
            <div className="space-y-3 text-xs text-slate-600 font-medium">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Total Duration:</span>
                <span className="font-bold text-slate-800">{course.duration}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Level:</span>
                <span className="font-bold text-slate-800">{course.difficulty}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Certificate:</span>
                <span className="font-bold text-emerald-600">Digital Printable Certificate</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Assessment:</span>
                <span className="font-bold text-slate-800">5 Question Quiz (70% Pass)</span>
              </div>
            </div>

            {isEnrolled ? (
              <Link
                to={`/courses/${id}/learn`}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-xl shadow-sm transition text-xs block text-center mt-4"
              >
                Go to Learning Player
              </Link>
            ) : (
              <button
                onClick={handleEnroll}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-xl shadow-sm transition text-xs block text-center mt-4"
              >
                Enroll Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
