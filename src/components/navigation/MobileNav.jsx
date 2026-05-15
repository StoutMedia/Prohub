import { NavLink } from 'react-router-dom';
const items = [['/app/player', '⌂', 'Player'], ['/app/training', '▦', 'Training'], ['/app/recruiting', '◈', 'Recruiting'], ['/app/coach', '◎', 'Coach'], ['/app/admin', '◆', 'Admin']];
export default function MobileNav() {
  return <nav className="mobile-nav" aria-label="Mobile app navigation">{items.map(([to, icon, label]) => <NavLink key={to} to={to}><span>{icon}</span>{label}</NavLink>)}</nav>;
}
