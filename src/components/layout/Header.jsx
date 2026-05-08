import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../ui/Button.jsx';

const links = [
  ['/', 'Home'], ['/programs', 'Programs'], ['/summer-training', 'Summer Training'], ['/recruiting', 'College Recruiting'], ['/player-development', 'Player Development'], ['/coaches', 'For Coaches'], ['/pricing', 'Pricing'], ['/about', 'About'], ['/contact', 'Contact'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="PISA ProHub homepage"><span className="brand-mark">P</span><span><strong>PISA</strong> ProHub</span></NavLink>
      <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)} aria-label="Toggle navigation"><span /><span /><span /></button>
      <nav id="primary-navigation" className={`primary-nav ${open ? 'open' : ''}`}>
        {links.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}
        <Button to="/login" variant="primary">Login</Button>
      </nav>
    </header>
  );
}
