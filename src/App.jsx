import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { PreferencesProvider } from "./context/PreferencesContext";
import PageTransition from "./components/PageTransition";
import BottomNav from "./components/BottomNav";
import ErrorBoundary from "./components/ErrorBoundary";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

// Public Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Protected Pages (User)
import UserDashboard from "./pages/UserDashboard";
import Resources from "./pages/Resources";
import UploadResource from "./pages/UploadResource";
import MyBookmarks from "./pages/MyBookmarks";
import MyUploads from "./pages/MyUploads";
import TopDownloads from "./pages/TopDownloads";
import TopRatedResources from "./pages/TopRatedResources";
import EditResource from "./pages/EditResource";
import Profile from "./pages/Profile";

// Protected Pages (Admin Only)
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";

// Route Guards
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function AppContent() {
  const location = useLocation();

  useKeyboardShortcuts({
    'ctrl+k': {
      key: 'k',
      ctrl: true,
      action: (e) => {
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
    },
    'escape': {
      key: 'escape',
      ctrl: false,
      action: () => {
        const modals = document.querySelectorAll('.modal-overlay, .preferences-modal-overlay');
        modals.forEach(modal => {
          if (modal.style.display !== 'none') {
            modal.click();
          }
        });
      }
    }
  });

  // Check if current route is landing page or auth pages
  const isAuthPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';
  const isLandingPage = location.pathname === '/';

  return (
    <>
      <PageTransition location={location}>
        <Routes>
          {/* ===== PUBLIC ROUTES - No Navbar ===== */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ===== PROTECTED ROUTES - With Navbar ===== */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/resources" element={
            <ProtectedRoute>
              <Resources />
            </ProtectedRoute>
          } />
          <Route path="/upload" element={
            <ProtectedRoute>
              <UploadResource />
            </ProtectedRoute>
          } />
          <Route path="/bookmarks" element={
            <ProtectedRoute>
              <MyBookmarks />
            </ProtectedRoute>
          } />
          <Route path="/my-uploads" element={
            <ProtectedRoute>
              <MyUploads />
            </ProtectedRoute>
          } />
          <Route path="/top-downloads" element={
            <ProtectedRoute>
              <TopDownloads />
            </ProtectedRoute>
          } />
          <Route path="/top-rated" element={
            <ProtectedRoute>
              <TopRatedResources />
            </ProtectedRoute>
          } />
          <Route path="/edit-resource/:id" element={
            <ProtectedRoute>
              <EditResource />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          {/* ===== ADMIN ROUTES ===== */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </ProtectedRoute>
          } />
          <Route path="/manage-users" element={
            <ProtectedRoute>
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            </ProtectedRoute>
          } />
        </Routes>
      </PageTransition>
      
      {/* Show BottomNav only on protected routes */}
      {!isAuthPage && !isLandingPage && <BottomNav />}
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <PreferencesProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </PreferencesProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;