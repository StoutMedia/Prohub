import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import RoleSwitcher from '../navigation/RoleSwitcher.jsx';
import MobileNav from '../navigation/MobileNav.jsx';
export default function DashboardLayout() {
  return <div className="app-shell"><Sidebar /><main className="app-main"><div className="app-topbar"><div><strong>PISA OS</strong><span>AI player development + recruiting command center</span></div><input aria-label="Search" placeholder="Search players, plans, colleges, reports…" /><RoleSwitcher /><span className="avatar">JR</span></div><Outlet /></main><MobileNav /></div>;
}
