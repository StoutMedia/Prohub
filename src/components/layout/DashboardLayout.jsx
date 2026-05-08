import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import RoleSwitcher from '../navigation/RoleSwitcher.jsx';
import MobileNav from '../navigation/MobileNav.jsx';
export default function DashboardLayout() {
  return <div className="app-shell"><Sidebar /><main className="app-main"><div className="app-topbar"><div><strong>ProHub</strong><span>Search sessions, players, reports…</span></div><input aria-label="Search" placeholder="Search sessions, drills, players…" /><RoleSwitcher /><span className="avatar">RS</span></div><Outlet /></main><MobileNav /></div>;
}
