import React from 'react';
import { KeyRound, UserCheck, ShieldCheck, Award } from 'lucide-react';

const DemoCredentialsBanner = ({ onSelect }) => {
  const accounts = [
    {
      role: 'Trainee',
      email: 'trainee@capacityconnect.demo',
      pass: 'Demo@123',
      icon: UserCheck,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100',
      badge: 'bg-emerald-600 text-white'
    },
    {
      role: 'Trainer',
      email: 'trainer@capacityconnect.demo',
      pass: 'Demo@123',
      icon: Award,
      color: 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100',
      badge: 'bg-blue-600 text-white'
    },
    {
      role: 'Admin',
      email: 'admin@capacityconnect.demo',
      pass: 'Demo@123',
      icon: ShieldCheck,
      color: 'bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100',
      badge: 'bg-purple-600 text-white'
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 sm:p-4 text-white shadow-xl mb-6">
      <div className="flex items-start gap-2 mb-3">
        <KeyRound className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
        <span className="min-w-0 font-semibold text-sm tracking-wide text-amber-400 uppercase break-words">
          SIH Hackathon Quick Demo Credentials (Click to Auto-Fill)
        </span>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
        {accounts.map((acc) => {
          const Icon = acc.icon;
          return (
            <button
              key={acc.role}
              type="button"
              onClick={() => onSelect && onSelect(acc.email, acc.pass)}
              className={`relative w-full min-w-0 overflow-hidden whitespace-normal p-3 pr-10 rounded-lg border text-left transition ${acc.color}`}
            >
              <div className="w-full min-w-0">
                <div className="flex min-w-0 items-center gap-2 mb-1 overflow-hidden">
                  <span className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded ${acc.badge}`}>
                    {acc.role}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs text-slate-500 font-mono">Demo@123</span>
                </div>
                <div className="block w-full min-w-0 whitespace-normal break-all text-xs leading-4 font-medium font-mono text-slate-700">
                  {acc.email}
                </div>
              </div>
              <Icon className="absolute right-3 top-1/2 w-5 h-5 -translate-y-1/2 opacity-75" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DemoCredentialsBanner;
