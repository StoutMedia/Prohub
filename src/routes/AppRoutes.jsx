import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/marketing/Home.jsx';
import Pricing from '../pages/marketing/Pricing.jsx';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import ForgotPassword from '../pages/auth/ForgotPassword.jsx';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import { Dashboard, IDPs, InviteUser, PlayerProfile, Players, PricingSelection, ReportsCalendarMessages, Sessions, Settings, Teams, WorkspaceSetup } from '../pages/prohub/MVPPages.jsx';

export default function AppRoutes() {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/app" element={<DashboardLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="teams" element={<Teams />} />
      <Route path="players" element={<Players />} />
      <Route path="players/:id" element={<PlayerProfile />} />
      <Route path="sessions" element={<Sessions />} />
      <Route path="idps" element={<IDPs />} />
      <Route path="reports" element={<ReportsCalendarMessages type="Reports" />} />
      <Route path="calendar" element={<ReportsCalendarMessages type="Calendar" />} />
      <Route path="messages" element={<ReportsCalendarMessages type="Messages" />} />
      <Route path="settings" element={<Settings />} />
      <Route path="onboarding" element={<WorkspaceSetup />} />
      <Route path="pricing" element={<PricingSelection />} />
      <Route path="invite" element={<InviteUser />} />
      <Route path="player" element={<Navigate to="../dashboard" replace />} />
      <Route path="parent" element={<Navigate to="../dashboard" replace />} />
      <Route path="coach" element={<Navigate to="../dashboard" replace />} />
      <Route path="admin" element={<Navigate to="../dashboard" replace />} />
      <Route path="training" element={<Navigate to="../sessions" replace />} />
      <Route path="development-plan" element={<Navigate to="../idps" replace />} />
      <Route path="profile" element={<Navigate to="../players/1" replace />} />
      <Route path="recruiting" element={<Navigate to="../reports" replace />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
