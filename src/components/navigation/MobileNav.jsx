import { NavLink } from 'react-router-dom';
const items = [['/app/dashboard', '⌂', 'Home'], ['/app/teams', '▦', 'Teams'], ['/app/players', '◉', 'Players'], ['/app/sessions', '◎', 'Sessions'], ['/app/settings', '⚙', 'Settings']];
export default function MobileNav() {
  return <nav className="mobile-nav" aria-label="Mobile app navigation">{items.map(([to, icon, label]) => <NavLink key={to} to={to}><span>{icon}</span>{label}</NavLink>)}</nav>;
}
