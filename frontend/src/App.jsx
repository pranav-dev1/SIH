import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TraineeDashboard from './pages/TraineeDashboard';
import CourseCatalog from './pages/CourseCatalog';
import CourseDetail from './pages/CourseDetail';
import LearningPlayer from './pages/LearningPlayer';
import AssessmentQuiz from './pages/AssessmentQuiz';
import CertificatePage from './pages/CertificatePage';
import FeedbackPage from './pages/FeedbackPage';
import TrainerDashboard from './pages/TrainerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProfilePage from './pages/ProfilePage';

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'trainer') return <Navigate to="/trainer/dashboard" replace />;
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/trainee/dashboard" replace />;
  }
  return children;
};

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <Navbar />
      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/courses" element={<CourseCatalog />} />
          <Route path="/courses/:id" element={<CourseDetail />} />

          {/* Trainee Protected Routes */}
          <Route
            path="/trainee/dashboard"
            element={
              <ProtectedRoute allowedRoles={['trainee', 'admin']}>
                <TraineeDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:id/learn"
            element={
              <ProtectedRoute allowedRoles={['trainee', 'trainer', 'admin']}>
                <LearningPlayer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:id/assessment"
            element={
              <ProtectedRoute allowedRoles={['trainee', 'trainer', 'admin']}>
                <AssessmentQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trainee/certificates"
            element={
              <ProtectedRoute allowedRoles={['trainee', 'admin']}>
                <CertificatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trainee/feedback"
            element={
              <ProtectedRoute allowedRoles={['trainee', 'admin']}>
                <FeedbackPage />
              </ProtectedRoute>
            }
          />

          {/* Trainer Protected Routes */}
          <Route
            path="/trainer/dashboard"
            element={
              <ProtectedRoute allowedRoles={['trainer', 'admin']}>
                <TrainerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Profile Route */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
