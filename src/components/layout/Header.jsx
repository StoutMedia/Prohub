import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../ui/Button.jsx';

const links = [
  ['/', 'Platform'],
  ['/pricing', 'Pricing'],
  ['/login', 'Login'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="PISA OS homepage"><span className="brand-mark">P</span><span><strong>PISA</strong> OS</span></NavLink>
      <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)} aria-label="Toggle navigation"><span /><span /><span /></button>
      <nav id="primary-navigation" className={`primary-nav ${open ? 'open' : ''}`}>
        {links.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}
        <Button to="/register" variant="primary">Start free demo</Button>
      </nav>
    </header>
  );
}
