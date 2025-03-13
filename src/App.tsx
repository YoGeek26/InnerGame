import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { AdminProvider } from './context/AdminContext';
import Layout from './components/common/Layout';
import AdminLayout from './components/admin/AdminLayout';
import HomePage from './pages/HomePage';
import InnerGamePage from './pages/InnerGamePage';
import PlayPage from './pages/PlayPage';
import ChallengesPage from './pages/ChallengesPage';
import AiCoachPage from './pages/AiCoachPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import OnboardingQuestionnaire from './components/onboarding/OnboardingQuestionnaire';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminContent from './pages/admin/AdminContent';
import AdminChallenges from './pages/admin/AdminChallenges';
import AdminStatistics from './pages/admin/AdminStatistics';
import AdminLogin from './pages/admin/AdminLogin';

function App() {
  const [showInitialOnboarding, setShowInitialOnboarding] = useState(true);
  
  const handleCompleteOnboarding = () => {
    setShowInitialOnboarding(false);
  };

  return (
    <AdminProvider>
      <UserProvider>
        <Router>
          {showInitialOnboarding ? (
            <OnboardingQuestionnaire onComplete={handleCompleteOnboarding} />
          ) : (
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="content" element={<AdminContent />} />
                <Route path="challenges" element={<AdminChallenges />} />
                <Route path="statistics" element={<AdminStatistics />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Route>
              
              {/* App Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="inner-game" element={<InnerGamePage />} />
                <Route path="play" element={<PlayPage />} />
                <Route path="challenges" element={<ChallengesPage />} />
                <Route path="ai-coach" element={<AiCoachPage />} />
                <Route path="community" element={<CommunityPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          )}
        </Router>
      </UserProvider>
    </AdminProvider>
  );
}

export default App;
