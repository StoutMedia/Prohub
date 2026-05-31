import { NavLink } from 'react-router-dom';
const links = [
  ['/app/dashboard', '⌂', 'Dashboard'],
  ['/app/teams', '▦', 'Teams'],
  ['/app/players', '◉', 'Players'],
  ['/app/sessions', '◎', 'Sessions'],
  ['/app/idps', '▣', 'IDPs'],
  ['/app/reports', '◷', 'Reports'],
  ['/app/calendar', '◌', 'Calendar'],
  ['/app/messages', '✉', 'Messages'],
  ['/app/invite', '+', 'Invite'],
  ['/app/settings', '⚙', 'Settings'],
];
export default function Sidebar() {
  return <aside className="sidebar"><div className="sidebar-brand"><span className="brand-mark">P</span><div><strong>ProHub</strong><small>by Stout Media Group</small></div></div><nav>{links.map(([to, icon, label]) => <NavLink key={to} to={to}><span>{icon}</span>{label}</NavLink>)}</nav><div className="sidebar-foot"><span>PISA connected</span><span>v1 MVP</span></div></aside>;
}
