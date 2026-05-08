import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/marketing/Home.jsx';
import Programs from '../pages/marketing/Programs.jsx';
import SummerTraining from '../pages/marketing/SummerTraining.jsx';
import Pricing from '../pages/marketing/Pricing.jsx';
import About from '../pages/marketing/About.jsx';
import Contact from '../pages/marketing/Contact.jsx';
import PlayerDevelopment from '../pages/marketing/PlayerDevelopment.jsx';
import Coaches from '../pages/marketing/Coaches.jsx';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import ForgotPassword from '../pages/auth/ForgotPassword.jsx';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import PlayerDashboard from '../pages/dashboards/PlayerDashboard.jsx';
import ParentDashboard from '../pages/dashboards/ParentDashboard.jsx';
import CoachDashboard from '../pages/dashboards/CoachDashboard.jsx';
import DirectorDashboard from '../pages/dashboards/DirectorDashboard.jsx';
import RecruiterDashboard from '../pages/dashboards/RecruiterDashboard.jsx';
import DevelopmentPlan from '../pages/player/DevelopmentPlan.jsx';
import TrainingPlan from '../pages/player/TrainingPlan.jsx';
import Journal from '../pages/player/Journal.jsx';
import CollegeRecruiting from '../pages/marketing/CollegeRecruiting.jsx';
import Recruiting from '../pages/player/Recruiting.jsx';
import VideoReview from '../pages/player/VideoReview.jsx';
import Profile from '../pages/player/Profile.jsx';
import SessionPlanner from '../pages/coach/SessionPlanner.jsx';
import TeamOverview from '../pages/coach/TeamOverview.jsx';
import PlayerReports from '../pages/coach/PlayerReports.jsx';
import GameModel from '../pages/coach/GameModel.jsx';
import ClubOverview from '../pages/director/ClubOverview.jsx';
import StaffManagement from '../pages/director/StaffManagement.jsx';
import PlayerPathway from '../pages/director/PlayerPathway.jsx';
import Reports from '../pages/director/Reports.jsx';

export default function AppRoutes() {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/programs" element={<Programs />} />
    <Route path="/summer-training" element={<SummerTraining />} />
    <Route path="/recruiting" element={<CollegeRecruiting />} />
    <Route path="/player-development" element={<PlayerDevelopment />} />
    <Route path="/coaches" element={<Coaches />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/app" element={<DashboardLayout />}>
      <Route index element={<Navigate to="player" replace />} />
      <Route path="player" element={<PlayerDashboard />} />
      <Route path="parent" element={<ParentDashboard />} />
      <Route path="coach" element={<CoachDashboard />} />
      <Route path="director" element={<DirectorDashboard />} />
      <Route path="recruiter" element={<RecruiterDashboard />} />
      <Route path="development-plan" element={<DevelopmentPlan />} />
      <Route path="training" element={<TrainingPlan />} />
      <Route path="journal" element={<Journal />} />
      <Route path="recruiting" element={<Recruiting />} />
      <Route path="video-review" element={<VideoReview />} />
      <Route path="reports" element={<Reports />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Profile />} />
      <Route path="team-overview" element={<TeamOverview />} />
      <Route path="session-planner" element={<SessionPlanner />} />
      <Route path="player-reports" element={<PlayerReports />} />
      <Route path="game-model" element={<GameModel />} />
      <Route path="club-overview" element={<ClubOverview />} />
      <Route path="staff-management" element={<StaffManagement />} />
      <Route path="player-pathway" element={<PlayerPathway />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
