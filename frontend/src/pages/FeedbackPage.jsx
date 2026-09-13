import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, BookOpen } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import API from '../services/api';

const FeedbackPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [rating, setRating] = useState(5);
  const [courseQuality, setCourseQuality] = useState(5);
  const [trainerQuality, setTrainerQuality] = useState(5);
  const [difficultyRating, setDifficultyRating] = useState(3);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get('/courses').then((res) => {
      if (res.data.success) {
        setCourses(res.data.courses);
        if (res.data.courses.length > 0) {
          setSelectedCourseId(res.data.courses[0]._id || res.data.courses[0].id);
        }
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post('/feedback', {
        courseId: selectedCourseId,
        rating,
        courseQuality,
        trainerQuality,
        difficultyRating,
        comments
      });

      if (res.data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (currentVal, setter) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setter(star)}
            className="p-1 focus:outline-none transition transform hover:scale-110"
          >
            <Star
              className={`w-6 h-6 ${
                star <= currentVal ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-8 space-y-6 max-w-4xl">
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl">
          <span className="text-xs font-bold bg-rose-500 text-white px-3 py-1 rounded-full uppercase tracking-wider">
            Quality Assurance
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
            Course & Trainer Feedback
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Your evaluation directly improves capacity building course standards and trainer methodology.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">Thank you for helping us improve.</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Your feedback has been logged into the Capacity Connect analytics dashboard for trainer review.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setComments('');
              }}
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow transition"
            >
              Submit Another Review
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            {/* Course Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Course</label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white font-semibold text-slate-800"
              >
                {courses.map((c) => (
                  <option key={c._id || c.id} value={c._id || c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Overall Rating */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Overall Rating (1 to 5 Stars)</label>
              {renderStars(rating, setRating)}
            </div>

            {/* Quality Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Course Content Quality</label>
                {renderStars(courseQuality, setCourseQuality)}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Trainer Effectiveness</label>
                {renderStars(trainerQuality, setTrainerQuality)}
              </div>
            </div>

            {/* Difficulty Scale */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Perceived Difficulty (1 = Very Easy, 5 = Very Challenging)
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={difficultyRating}
                onChange={(e) => setDifficultyRating(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-bold mt-1">
                <span>1 - Beginner Friendly</span>
                <span className="text-brand-600">Selected: {difficultyRating}</span>
                <span>5 - Advanced</span>
              </div>
            </div>

            {/* Comments */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Comments & Suggestions</label>
              <textarea
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share your thoughts on the course structure, module clarity, and field applicability..."
                className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl shadow-md transition text-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>{loading ? 'Submitting...' : 'Submit Feedback'}</span>
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default FeedbackPage;
