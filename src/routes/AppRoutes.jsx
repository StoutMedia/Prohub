import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/marketing/Home.jsx';
import Pricing from '../pages/marketing/Pricing.jsx';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import ForgotPassword from '../pages/auth/ForgotPassword.jsx';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import PlayerDashboard from '../pages/dashboards/PlayerDashboard.jsx';
import ParentDashboard from '../pages/dashboards/ParentDashboard.jsx';
import CoachDashboard from '../pages/dashboards/CoachDashboard.jsx';
import AdminDashboard from '../pages/dashboards/AdminDashboard.jsx';
import DevelopmentPlan from '../pages/player/DevelopmentPlan.jsx';
import TrainingPlan from '../pages/player/TrainingPlan.jsx';
import Recruiting from '../pages/player/Recruiting.jsx';
import Profile from '../pages/player/Profile.jsx';
import Reports from '../pages/player/Reports.jsx';
import Settings from '../pages/player/Settings.jsx';

export default function AppRoutes() {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/app" element={<DashboardLayout />}>
      <Route index element={<Navigate to="player" replace />} />
      <Route path="player" element={<PlayerDashboard />} />
      <Route path="parent" element={<ParentDashboard />} />
      <Route path="coach" element={<CoachDashboard />} />
      <Route path="admin" element={<AdminDashboard />} />
      <Route path="director" element={<Navigate to="../admin" replace />} />
      <Route path="recruiter" element={<Navigate to="../admin" replace />} />
      <Route path="development-plan" element={<DevelopmentPlan />} />
      <Route path="training" element={<TrainingPlan />} />
      <Route path="recruiting" element={<Recruiting />} />
      <Route path="reports" element={<Reports />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
