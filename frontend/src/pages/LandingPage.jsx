import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Award,
  BarChart3,
  Users,
  Shield,
  ArrowRight,
  Sparkles,
  Layers,
  FileCheck,
  Brain,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import DemoCredentialsBanner from '../components/DemoCredentialsBanner';
import CourseCard from '../components/CourseCard';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const [courses, setCourses] = useState([]);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/courses')
      .then((res) => {
        if (res.data.success) {
          setCourses(res.data.courses.slice(0, 3));
        }
      })
      .catch(() => {});
  }, []);

  const handleDemoSelect = async (email, password) => {
    const res = await login(email, password);
    if (res.success) {
      if (res.user.role === 'trainer') navigate('/trainer/dashboard');
      else if (res.user.role === 'admin') navigate('/admin/dashboard');
      else navigate('/trainee/dashboard');
    }
  };

  const featureCards = [
    {
      icon: Layers,
      title: 'Structured Learning',
      description: 'Step-by-step modular lessons with clear learning objectives and practical resources.',
      color: 'bg-blue-50 text-blue-700'
    },
    {
      icon: FileCheck,
      title: 'Online Assessments',
      description: 'Interactive multiple-choice quizzes with instant automated scoring and question breakdowns.',
      color: 'bg-purple-50 text-purple-700'
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Real-time progress bars, completion statistics, and individual learning milestones.',
      color: 'bg-emerald-50 text-emerald-700'
    },
    {
      icon: Award,
      title: 'Digital Certificates',
      description: 'Verifiable, browser-printable digital certificates awarded automatically upon course completion.',
      color: 'bg-amber-50 text-amber-700'
    },
    {
      icon: Users,
      title: 'Trainer Support',
      description: 'Direct course management and feedback review tools for domain expert trainers.',
      color: 'bg-indigo-50 text-indigo-700'
    },
    {
      icon: MessageSquare,
      title: 'Feedback & Analytics',
      description: 'Structured 5-star course quality feedback and platform-wide analytics for continuous improvement.',
      color: 'bg-rose-50 text-rose-700'
    }
  ];

  const steps = [
    { step: '01', title: 'Register Account', desc: 'Create your trainee or trainer account in under 30 seconds.' },
    { step: '02', title: 'Enroll in Course', desc: 'Browse domain courses in weather, disaster response, data, & tech.' },
    { step: '03', title: 'Learn Modules', desc: 'Study interactive module lessons and resource guides.' },
    { step: '04', title: 'Take Assessment', desc: 'Pass the 5-question evaluation with 70%+ score.' },
    { step: '05', title: 'Earn Certificate', desc: 'Download and print your official Digital Certificate of Completion.' }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Demo Credentials Quick Banner */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <DemoCredentialsBanner onSelect={handleDemoSelect} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-brand-600 animate-pulse" />
            <span>Digital Capacity Building & Learning Portal</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Learn. Build Capacity. <span className="text-brand-600 bg-clip-text">Grow.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed font-normal">
            A digital platform for accessible, structured and measurable capacity building. Empowering trainees, trainers, and public administrators nationwide.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/courses"
              className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-brand-600/30 hover:shadow-brand-600/40 transition flex items-center justify-center gap-2 text-sm"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold px-8 py-3.5 rounded-xl shadow-sm transition text-sm text-center"
            >
              Get Started
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-2xl font-extrabold text-brand-600">5+</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Specialized Courses</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-2xl font-extrabold text-emerald-600">100%</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Verifiable Certificates</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-2xl font-extrabold text-purple-600">AI Powered</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Learning Assistant</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-2xl font-extrabold text-amber-600">SIH MVP</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Hackathon Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Key Capacity-Building Features
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Designed to support end-to-end learning workflows from registration to digital certification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{feat.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
              Simple 5-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              How Capacity Connect Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 relative">
                <span className="text-2xl font-extrabold text-brand-400 block mb-2 font-mono">
                  {s.step}
                </span>
                <h4 className="font-bold text-sm text-white mb-1">{s.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Capacity Courses</h2>
            <p className="text-xs text-slate-500 mt-1">Start learning immediately with our top modules.</p>
          </div>
          <Link
            to="/courses"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View All Courses</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((c) => (
            <CourseCard key={c._id || c.id} course={c} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
