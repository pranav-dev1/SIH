import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BarChart, BookOpen, Award, ArrowRight, User } from 'lucide-react';

const CourseCard = ({ course, onEnroll }) => {
  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  const courseId = course._id || course.id;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Banner Top */}
        <div className="h-3 bg-gradient-to-r from-brand-600 to-indigo-600"></div>

        <div className="p-5">
          {/* Category & Difficulty */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
              {course.category}
            </span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getDifficultyBadge(course.difficulty)}`}>
              {course.difficulty}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition line-clamp-2 mb-2">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
            {course.description}
          </p>

          {/* Trainer Info & Meta */}
          <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Trainer: <strong className="text-slate-700">{course.trainerName || 'Dr. Ananya Sharma'}</strong></span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{course.duration || '3 Weeks'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span>{course.modules ? course.modules.length : 4} Modules</span>
              </div>
            </div>
          </div>

          {/* Enrollment Progress bar if enrolled */}
          {course.isEnrolled && (
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Progress</span>
                <span className="text-brand-600 font-bold">{course.progressPercentage || 0}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-brand-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${course.progressPercentage || 0}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
        <Link
          to={`/courses/${courseId}`}
          className="flex-1 text-center py-2 px-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-white text-xs font-semibold transition"
        >
          View Details
        </Link>
        {course.isEnrolled ? (
          <Link
            to={`/courses/${courseId}/learn`}
            className="flex-1 text-center py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition flex items-center justify-center gap-1"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <button
            onClick={() => onEnroll && onEnroll(courseId)}
            className="flex-1 text-center py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition"
          >
            Enroll Now
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
