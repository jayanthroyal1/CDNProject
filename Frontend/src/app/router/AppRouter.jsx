import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../../shared/components/ProtectedRoute';
import RoleRoute from './RoleRoute';
import Header from '../../shared/components/Header';
import Footer from '../../shared/components/Footer';
import { useAuth } from '../../shared/hooks/useAuth';

// Lazy-loaded page components
const LoginPage = lazy(() => import('../../pages/LoginPage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage'));
const FilesPage = lazy(() => import('../../pages/FilesPage'));
const ProfilePage = lazy(() => import('../../pages/ProfilePage'));
const ContactPage = lazy(() => import('../../pages/ContactPage'));
const ReportPage = lazy(() => import('../../pages/ReportPage'));
const AdminDashboard = lazy(() => import('../../pages/AdminDashboard'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage'));

const AppRouter = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="loading" style={{textAlign: "center", padding: "2rem"}}>Loading…</div>;

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Suspense fallback={<div className="loading" style={{textAlign: "center", padding: "2rem"}}>Loading…</div>}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/files" element={<FilesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/reports" element={<ReportPage />} />

              {/* Admin protected area */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <RoleRoute role="admin">
                      <AdminDashboard />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        {user && <Footer />}
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
