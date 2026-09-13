import React from 'react';
import { Award, Printer, Download, X, ShieldCheck } from 'lucide-react';

const CertificateModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 my-8">
        {/* Header Actions bar */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">Official Digital Certificate</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Certificate</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div className="p-8 sm:p-12 bg-white" id="printable-certificate">
          <div className="border-8 double border-brand-800 p-8 sm:p-10 rounded-2xl text-center space-y-6 bg-gradient-to-b from-brand-50/30 via-white to-amber-50/20 relative overflow-hidden">
            {/* Background Seal Emblem */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
              <Award className="w-96 h-96 text-brand-900" />
            </div>

            {/* Brand Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-700 text-white font-extrabold mb-2 shadow-md">
                <Award className="w-7 h-7" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-widest uppercase">
                CAPACITY CONNECT
              </h1>
              <p className="text-xs font-bold text-brand-700 uppercase tracking-widest">
                Digital Learning & Capacity Building Portal
              </p>
            </div>

            <div className="h-0.5 bg-gradient-to-r from-transparent via-brand-600 to-transparent my-4"></div>

            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-serif text-slate-600 italic">
                Certificate of Completion
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                This official digital certificate is proud awarded to
              </p>
            </div>

            {/* Trainee Name */}
            <div className="py-2">
              <span className="text-2xl sm:text-4xl font-extrabold text-slate-900 border-b-2 border-slate-900 px-6 py-1 inline-block tracking-tight">
                {certificate.traineeName || 'Rahul Kumar'}
              </span>
            </div>

            <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
              For successfully completing the prescribed capacity-building course modules and passing the final assessment evaluation for
            </p>

            {/* Course Title */}
            <div className="py-2">
              <h3 className="text-lg sm:text-2xl font-bold text-brand-800 px-4">
                {certificate.courseName || 'Disaster Preparedness & Emergency Response'}
              </h3>
            </div>

            {/* Certificate Details Footer */}
            <div className="pt-8 grid grid-cols-2 gap-4 text-xs border-t border-slate-200/80 items-end">
              <div className="text-left space-y-1">
                <div className="text-slate-400 font-medium">Issue Date:</div>
                <div className="font-bold text-slate-800">
                  {new Date(certificate.issueDate || Date.now()).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">
                  ID: {certificate.certificateId || 'CAP-2026-88491'}
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 text-[10px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Credential</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">
                  Code: {certificate.verificationCode || 'VER-8819'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={handlePrint}
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
