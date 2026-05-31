import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import RoleSwitcher from '../navigation/RoleSwitcher.jsx';
import MobileNav from '../navigation/MobileNav.jsx';
export default function DashboardLayout() {
  return <div className="app-shell"><Sidebar /><main className="app-main"><div className="app-topbar"><div><strong>ProHub</strong><span>PISA / Protouch International Soccer Academy workspace</span></div><input aria-label="Search" placeholder="Search teams, players, sessions, IDPs…" /><RoleSwitcher /><span className="avatar">PH</span></div><Outlet /></main><MobileNav /></div>;
}
