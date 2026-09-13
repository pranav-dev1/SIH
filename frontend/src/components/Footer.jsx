import React from 'react';
import { BookOpen, ShieldCheck, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                CAPACITY<span className="text-brand-400">CONNECT</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A modern digital capacity-building & learning management portal for structured public skills development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/courses" className="hover:text-white transition">Course Catalog</a></li>
              <li><a href="/#features" className="hover:text-white transition">Features</a></li>
              <li><a href="/#how-it-works" className="hover:text-white transition">How It Works</a></li>
              <li><a href="/login" className="hover:text-white transition">Trainee Portal</a></li>
            </ul>
          </div>

          {/* Role Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Roles</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/login" className="hover:text-white transition">Trainee Login</a></li>
              <li><a href="/login" className="hover:text-white transition">Trainer Dashboard</a></li>
              <li><a href="/login" className="hover:text-white transition">Admin Management</a></li>
            </ul>
          </div>

          {/* Hackathon Specs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">SIH Hackathon Edition</h4>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Smart India Hackathon MVP</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Built with React, Vite, Node.js, Express, MongoDB, JWT & Tailwind CSS.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CAPACITY CONNECT. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for Smart India Hackathon Demonstration
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
