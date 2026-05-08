import { NavLink } from 'react-router-dom';
const items = [['/app/player', '⌂', 'Home'], ['/app/training', '▦', 'Training'], ['/app/journal', '✎', 'Journal'], ['/app/recruiting', '◈', 'Recruiting']];
export default function MobileNav() {
  return <nav className="mobile-nav" aria-label="Mobile app navigation">{items.map(([to, icon, label]) => <NavLink key={to} to={to}><span>{icon}</span>{label}</NavLink>)}</nav>;
}
