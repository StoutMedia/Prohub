import { NavLink } from 'react-router-dom';
const links = [
  ['/app/player', '⌂', 'Player'],
  ['/app/parent', '◉', 'Parent'],
  ['/app/coach', '◎', 'Coach'],
  ['/app/admin', '◆', 'Admin'],
  ['/app/profile', '◌', 'Profile'],
  ['/app/development-plan', '▣', 'Development Plan'],
  ['/app/training', '▦', 'Training Plan'],
  ['/app/recruiting', '◈', 'Recruiting'],
  ['/app/reports', '◷', 'Reports'],
  ['/app/settings', '⚙', 'Settings'],
];
export default function Sidebar() {
  return <aside className="sidebar"><div className="sidebar-brand"><span className="brand-mark">P</span><div><strong>PISA OS</strong><small>Soccer Development AI</small></div></div><nav>{links.map(([to, icon, label]) => <NavLink key={to} to={to}><span>{icon}</span>{label}</NavLink>)}</nav><div className="sidebar-foot"><span>Premium SaaS</span><span>v1 MVP</span></div></aside>;
}
