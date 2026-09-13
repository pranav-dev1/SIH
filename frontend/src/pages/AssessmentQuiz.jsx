import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  Award,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react';
import API from '../services/api';
import CertificateModal from '../components/CertificateModal';

const AssessmentQuiz = () => {
  const { id } = useParams();
  const [assessment, setAssessment] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);

  const fetchAssessment = async () => {
    try {
      const res = await API.get(`/assessments/${id}`);
      if (res.data.success) {
        setAssessment(res.data.assessment);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessment();
  }, [id]);

  if (loading) {
    return <div className="py-20 text-center text-slate-500 text-sm">Loading quiz assessment...</div>;
  }

  if (!assessment || !assessment.questions || assessment.questions.length === 0) {
    return <div className="py-20 text-center text-slate-500 text-sm">No assessment available for this course.</div>;
  }

  const questions = assessment.questions;
  const currentQ = questions[currentQIndex];
  const isLastQuestion = currentQIndex === questions.length - 1;

  const handleSelectOption = (optIdx) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optIdx
    }));
  };

  const handleSubmitQuiz = async () => {
    setSubmitting(true);
    try {
      const res = await API.post(`/assessments/${id}/submit`, { answers });
      if (res.data.success) {
        setResult(res.data.result);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <Link
            to={`/courses/${id}/learn`}
            className="text-xs font-bold text-slate-500 hover:text-brand-600 flex items-center gap-1 mb-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Learning Material
          </Link>
          <h1 className="text-xl font-extrabold text-slate-900">{assessment.title}</h1>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-500 block">Passing Score</span>
          <span className="text-sm font-extrabold text-brand-600">{assessment.passingScorePercentage || 70}%</span>
        </div>
      </div>

      {/* RESULT VIEW */}
      {result ? (
        <div className="space-y-6 animate-in fade-in zoom-in-95">
          {/* Summary Card */}
          <div
            className={`p-8 rounded-3xl border shadow-xl text-center space-y-4 ${
              result.passed
                ? 'bg-gradient-to-b from-emerald-900 to-slate-900 text-white border-emerald-500/40'
                : 'bg-gradient-to-b from-rose-900 to-slate-900 text-white border-rose-500/40'
            }`}
          >
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-white/10 backdrop-blur">
              {result.passed ? (
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              ) : (
                <XCircle className="w-10 h-10 text-rose-400" />
              )}
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                {result.passed ? 'Assessment Passed' : 'Assessment Not Passed'}
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                Score: {result.scorePercentage}%
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                You answered {result.correctCount} out of {result.totalQuestions} questions correctly.
              </p>
            </div>

            {/* If Passed Notification */}
            {result.passed && (
              <div className="p-4 bg-emerald-500/20 rounded-2xl border border-emerald-400/40 text-xs font-bold text-emerald-200 max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Congratulations! You are eligible for your certificate.</span>
                </div>
                <button
                  onClick={() => setShowCertModal(true)}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold px-4 py-2 rounded-xl text-xs shadow transition shrink-0"
                >
                  View Digital Certificate
                </button>
              </div>
            )}

            {!result.passed && (
              <button
                onClick={() => {
                  setResult(null);
                  setCurrentQIndex(0);
                  setAnswers({});
                }}
                className="bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Assessment</span>
              </button>
            )}
          </div>

          {/* Detailed Question Review */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Detailed Question Review & Explanations
            </h3>

            <div className="space-y-4">
              {result.questionResults?.map((qr, idx) => (
                <div
                  key={qr.id}
                  className={`p-4 rounded-xl border ${
                    qr.isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-slate-800">
                      Q{idx + 1}. {qr.question}
                    </span>
                    <span className="shrink-0">
                      {qr.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )}
                    </span>
                  </div>

                  <div className="mt-2 text-xs space-y-1 text-slate-600">
                    <div>
                      Your answer:{' '}
                      <strong className={qr.isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                        {qr.selectedOption !== undefined ? qr.options[qr.selectedOption] : 'No answer'}
                      </strong>
                    </div>
                    {!qr.isCorrect && (
                      <div>
                        Correct answer: <strong className="text-emerald-700">{qr.options[qr.correctAnswer]}</strong>
                      </div>
                    )}
                    {qr.explanation && (
                      <p className="text-[11px] text-slate-500 italic mt-1 bg-white p-2 rounded border border-slate-200">
                        Explanation: {qr.explanation}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ACTIVE QUIZ QUESTION VIEW */
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>Question {currentQIndex + 1} of {questions.length}</span>
              <span className="text-brand-600 font-mono">
                {Math.round(((currentQIndex + 1) / questions.length) * 100)}% Completed
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-brand-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Title */}
          <div className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQIndex + 1}. {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options?.map((optText, optIdx) => {
              const isSelected = answers[currentQ.id] === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 text-left rounded-xl border text-xs sm:text-sm font-semibold transition flex items-center justify-between ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50 text-brand-900 shadow-sm ring-1 ring-brand-600'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="leading-relaxed">{optText}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quiz Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {isLastQuestion ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={submitting}
                className="bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 disabled:opacity-50"
              >
                <span>{submitting ? 'Evaluating Answers...' : 'Submit Assessment'}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentQIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Certificate Display Modal */}
      {showCertModal && (
        <CertificateModal
          certificate={result?.certificate}
          onClose={() => setShowCertModal(false)}
        />
      )}
    </div>
  );
};

export default AssessmentQuiz;
