import React, { useState, useEffect } from 'react';
import { Award, Printer, Download, Eye, BookOpen } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import CertificateModal from '../components/CertificateModal';
import API from '../services/api';

const CertificatePage = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/certificates')
      .then((res) => {
        if (res.data.success) {
          setCertificates(res.data.certificates);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-8 space-y-6 max-w-7xl">
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold bg-amber-500 text-slate-950 px-3 py-1 rounded-full uppercase tracking-wider">
              Earned Credentials
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
              My Digital Certificates
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Official verifiable certificates generated upon successful course completion.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-500 text-sm">Loading certificates...</div>
        ) : certificates.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
            <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No certificates earned yet</h3>
            <p className="text-xs text-slate-500 mt-1">
              Complete your enrolled course modules and pass the assessment to unlock digital certificates.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert._id || cert.certificateId}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl border border-amber-200">
                      <Award className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">
                      {cert.certificateId}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900">{cert.courseName}</h3>
                  <p className="text-xs text-slate-500">
                    Awarded to <strong className="text-slate-800">{cert.traineeName}</strong> on{' '}
                    {new Date(cert.issueDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex-1 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View & Print</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {selectedCert && (
        <CertificateModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </div>
  );
};

export default CertificatePage;
