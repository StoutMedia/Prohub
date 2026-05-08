import { NavLink } from 'react-router-dom';
const links = [
  ['/app/player', '⌂', 'Dashboard'], ['/app/development-plan', '▣', 'Development Plan'], ['/app/training', '▦', 'Training Calendar'], ['/app/journal', '✎', 'Journal'], ['/app/recruiting', '◈', 'Recruiting'], ['/app/video-review', '▶', 'Video Review'], ['/app/reports', '◷', 'Reports'], ['/app/profile', '◎', 'Profile'], ['/app/settings', '⚙', 'Settings'],
];
export default function Sidebar() {
  return <aside className="sidebar"><div className="sidebar-brand"><span className="brand-mark">P</span><div><strong>PISA ProHub</strong><small>Development OS</small></div></div><nav>{links.map(([to, icon, label]) => <NavLink key={to} to={to}><span>{icon}</span>{label}</NavLink>)}</nav><div className="sidebar-foot"><span>Coach-first</span><span>Team: U19</span></div></aside>;
}
