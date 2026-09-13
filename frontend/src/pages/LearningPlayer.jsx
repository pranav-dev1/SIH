import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Video,
  Download,
  Award,
  Sparkles,
  Play
} from 'lucide-react';
import API from '../services/api';
import AiAssistantModal from '../components/AiAssistantModal';

const LearningPlayer = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
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
    fetchData();
  }, [id]);

  if (loading) {
    return <div className="py-20 text-center text-slate-500 text-sm">Loading learning player...</div>;
  }

  if (!course) {
    return <div className="py-20 text-center text-slate-500 text-sm">Course content not found.</div>;
  }

  const modules = course.modules || [];
  const currentModule = modules[activeModuleIdx] || modules[0] || {};
  const lessons = currentModule.lessons || [];
  const currentLesson = lessons[activeLessonIdx] || lessons[0] || {};

  const completedModuleIds = enrollment ? enrollment.completedModuleIds || [] : [];
  const isCurrentModuleCompleted = completedModuleIds.includes(currentModule.id);

  const handleMarkCompleted = async () => {
    try {
      const res = await API.put('/enrollments/progress', {
        courseId: id,
        moduleId: currentModule.id
      });
      if (res.data.success) {
        setEnrollment(res.data.enrollment);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const isLastModule = activeModuleIdx === modules.length - 1;

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Left Sidebar: Modules & Lessons Navigator */}
      <div className="w-full md:w-80 bg-white border-r border-slate-200 p-4 space-y-4 shrink-0">
        <div className="pb-3 border-b border-slate-100">
          <Link
            to={`/courses/${id}`}
            className="text-xs font-bold text-slate-500 hover:text-brand-600 flex items-center gap-1 mb-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Course Details
          </Link>
          <h2 className="font-extrabold text-sm text-slate-900 line-clamp-2">{course.title}</h2>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Overall Progress</span>
            <span className="text-brand-600 font-bold">{enrollment?.progressPercentage || 0}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
            <div
              className="bg-brand-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${enrollment?.progressPercentage || 0}%` }}
            ></div>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-3 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
          {modules.map((mod, mIdx) => {
            const isCompleted = completedModuleIds.includes(mod.id);
            const isActive = activeModuleIdx === mIdx;

            return (
              <div
                key={mod.id}
                className={`rounded-xl border transition ${
                  isActive
                    ? 'border-brand-500 bg-brand-50/40 shadow-sm'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <button
                  onClick={() => {
                    setActiveModuleIdx(mIdx);
                    setActiveLessonIdx(0);
                  }}
                  className="w-full p-3 text-left flex items-start justify-between gap-2"
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : mIdx + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 leading-snug">{mod.title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {mod.lessons?.length || 1} Topics
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Viewer */}
      <div className="flex-1 p-4 sm:p-8 space-y-6 max-w-5xl mx-auto overflow-y-auto">
        {/* Module Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
              Module {activeModuleIdx + 1} of {modules.length}
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 mt-2">{currentModule.title}</h1>
            <p className="text-xs text-slate-500 mt-1">{currentModule.description}</p>
          </div>

          <button
            onClick={handleMarkCompleted}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              isCurrentModuleCompleted
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCurrentModuleCompleted ? 'Completed' : 'Mark as Completed'}</span>
          </button>
        </div>

        {/* Video / Resource Placeholder */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-brand-600/80 flex items-center justify-center text-white shadow-xl cursor-pointer hover:scale-110 transition">
            <Play className="w-8 h-8 fill-current ml-1" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Interactive Video Lesson Placeholder</h3>
            <p className="text-xs text-slate-400 max-w-md mt-1">
              "Capacity Building & Incident Field Operation Demonstration Video"
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-brand-300 font-mono pt-2">
            <Video className="w-4 h-4" />
            <span>HD Video Stream Ready (1080p)</span>
          </div>
        </div>

        {/* Lesson Body Content */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-600" />
            <span>{currentLesson.title || 'Lesson Overview'}</span>
          </h3>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
            <p>
              {currentLesson.content ||
                'Disasters occur when hazards interact with vulnerable human populations and insufficient coping capacities. Disaster risk management aims to reduce hazard exposure, lessen vulnerability, and enhance community resilience.'}
            </p>
            <p>
              Capacity building relies on standard operating procedures, timely warning dissemination, multi-agency coordination, and empowering community emergency first responders.
            </p>
          </div>

          {/* Downloadable PDF / Resource Links */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Downloadable Field Resources
            </h4>
            <div className="flex flex-wrap gap-2">
              <a
                href="#download"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl transition"
              >
                <Download className="w-4 h-4 text-brand-600" />
                <span>Field Standard Operating Procedure Manual (.PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Navigation & Final Assessment CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              disabled={activeModuleIdx === 0}
              onClick={() => {
                setActiveModuleIdx((prev) => Math.max(0, prev - 1));
                setActiveLessonIdx(0);
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-white disabled:opacity-40 flex items-center justify-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Module</span>
            </button>

            <button
              disabled={isLastModule}
              onClick={() => {
                setActiveModuleIdx((prev) => Math.min(modules.length - 1, prev + 1));
                setActiveLessonIdx(0);
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-white disabled:opacity-40 flex items-center justify-center gap-1"
            >
              <span>Next Module</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Prompt at end: Take Assessment */}
          <Link
            to={`/courses/${id}/assessment`}
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>Take Final Assessment Quiz</span>
          </Link>
        </div>
      </div>

      <AiAssistantModal currentCourseId={id} />
    </div>
  );
};

export default LearningPlayer;
