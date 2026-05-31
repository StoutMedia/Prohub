import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card.jsx';
import StatCard from '../../components/ui/StatCard.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { coachOrgPlans, idps, parentPlayerPlans, players, reports, roles, sessions, tasks, teams } from '../../data/prohubData.js';

const ageGroups = [...Array.from({ length: 15 }, (_, index) => `Boys U${index + 5}`), ...Array.from({ length: 15 }, (_, index) => `Girls U${index + 5}`)];

function PageHeader({ eyebrow, title, children, action }) {
  return <div className="dashboard-title prohub-page-header"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children && <p>{children}</p>}</div>{action}</div>;
}

function Progress({ value }) {
  return <div className="prohub-progress" aria-label={`${value}% complete`}><span style={{ width: `${value}%` }} /></div>;
}

function MiniTable({ rows }) {
  return <div className="prohub-table">{rows.map((row) => <div className="prohub-table-row" key={row.join('-')}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}</div>;
}

export function Dashboard() {
  return <div className="page-stack">
    <PageHeader eyebrow="ProHub command center" title="Welcome back, Coach Jordan.">Your PISA / Protouch workspace is ready for teams, players, session plans, IDPs, reports, messages, and family communication.</PageHeader>
    <div className="card-grid four-grid"><StatCard label="Active teams" value={teams.length} /><StatCard label="Upcoming sessions" value="8" tone="blue" /><StatCard label="Development alerts" value="5" tone="red" /><StatCard label="Reports ready" value="12" tone="green" /></div>
    <div className="dashboard-grid">
      <Card><h2>Quick actions</h2><div className="quick-actions"><Link className="btn btn-primary" to="/app/teams">Create team</Link><Link className="btn btn-primary" to="/app/sessions">Create session</Link><Link className="btn btn-primary" to="/app/idps">Create IDP</Link><Link className="btn btn-secondary" to="/app/invite">Invite user</Link></div></Card>
      <Card><h2>Upcoming sessions</h2>{sessions.map((session) => <div className="list-row" key={session.title}><div><strong>{session.title}</strong><p>{session.date} • {session.team}</p></div><Badge tone="blue">{session.theme}</Badge></div>)}</Card>
      <Card><h2>Player development alerts</h2>{players.filter((player) => player.kpi < 80).map((player) => <div className="list-row" key={player.id}><div><strong>{player.name}</strong><p>{player.areas}</p></div><Badge tone="red">{player.status}</Badge></div>)}</Card>
      <Card><h2>Recent reports</h2>{reports.map((report) => <div className="list-row" key={report}><strong>{report}</strong><Badge tone="green">Ready</Badge></div>)}</Card>
      <Card className="wide-card"><h2>Tasks</h2><div className="task-grid">{tasks.map((task) => <label key={task} className="task-item"><input type="checkbox" /> <span>{task}</span></label>)}</div></Card>
    </div>
  </div>;
}

export function Teams() {
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState('PISA Futures 2015');
  return <div className="page-stack">
    <PageHeader eyebrow="Team management" title="Build teams, add staff, and invite families." action={<button className="btn btn-primary" onClick={() => setOpen(true)}>Create team</button>}>Manage age groups from Boys U5-U19 and Girls U5-U19 with connected player and staff invites.</PageHeader>
    <div className="card-grid three-grid">{teams.map((team) => <Card key={team.id}><div className="card-top"><h2>{team.name}</h2><Badge>{team.status}</Badge></div><p>{team.ageGroup}</p><MiniTable rows={[[`${team.players} players`, `${team.staff} staff`, team.nextSession], ['Players', 'Staff', 'Invites']]} /><div className="quick-actions"><button className="btn btn-primary">Add players</button><button className="btn btn-secondary">Add staff</button><Link className="btn btn-secondary" to="/app/invite">Invite users</Link></div></Card>)}</div>
    {open && <div className="prohub-modal" role="dialog" aria-modal="true"><Card className="prohub-modal-card"><button className="modal-close" onClick={() => setOpen(false)}>×</button><h2>Create team</h2><label>Team name<input value={teamName} onChange={(event) => setTeamName(event.target.value)} /></label><label>Age group selector<select>{ageGroups.map((group) => <option key={group}>{group}</option>)}</select></label><div className="two-grid"><label>Add players<textarea placeholder="Paste player emails or names" /></label><label>Add staff<textarea placeholder="Coach and staff emails" /></label></div><button className="btn btn-primary full" onClick={() => setOpen(false)}>Save team and continue invites</button></Card></div>}
  </div>;
}

export function Players() {
  const [query, setQuery] = useState('');
  const filtered = players.filter((player) => player.name.toLowerCase().includes(query.toLowerCase()) || player.team.toLowerCase().includes(query.toLowerCase()));
  return <div className="page-stack"><PageHeader eyebrow="Player profiles" title="Track every player pathway.">Player cards include age, position, team, KPI progress, parent contact, and profile access.</PageHeader><Card><label>Search players<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or team" /></label></Card><div className="card-grid four-grid">{filtered.map((player) => <Card key={player.id} className="player-card"><div className="card-top"><span className="avatar large">{player.name.split(' ').map((part) => part[0]).join('')}</span><Badge tone={player.kpi > 85 ? 'green' : player.kpi < 70 ? 'red' : 'orange'}>{player.status}</Badge></div><h2>{player.name}</h2><p>{player.age} years old • {player.position} • {player.team}</p><Progress value={player.kpi} /><p><strong>KPI progress:</strong> {player.kpi}%</p><p><strong>Parent contact:</strong> {player.parent}</p><Link className="btn btn-primary full" to={`/app/players/${player.id}`}>View profile</Link></Card>)}</div></div>;
}

export function PlayerProfile() {
  const player = players[0];
  return <div className="page-stack"><PageHeader eyebrow="Player profile" title={player.name}>Personal info, goals, KPIs, notes, reports, and visibility controls in one connected profile.</PageHeader><div className="dashboard-grid"><Card><h2>Personal info</h2><MiniTable rows={[[`Age ${player.age}`, player.position, player.team], ['Parent contact', player.parent, 'Active']]} /><h3>Goals</h3><p>{player.goals}</p><h3>Strengths</h3><p>{player.strengths}</p><h3>Development areas</h3><p>{player.areas}</p></Card><Card><h2>KPIs</h2>{['Technical', 'Tactical', 'Physical', 'Psychological'].map((label, index) => <div key={label} className="kpi-line"><span>{label}</span><Progress value={player.kpi - index * 5} /></div>)}</Card><Card><h2>Session notes</h2><textarea defaultValue="Excellent receiving angles in rondo. Add pressure from blind side next session." /></Card><Card><h2>Match notes + reports</h2><p>Strong first half ball progression. Report draft saved for parent/player review.</p><Badge tone="green">Report visible</Badge></Card><Card className="wide-card"><h2>Parent/player visibility settings</h2><label className="task-item"><input type="checkbox" defaultChecked /> <span>{player.visibility}</span></label><label className="task-item"><input type="checkbox" /> <span>Require director approval before external sharing</span></label></Card></div></div>;
}

export function Sessions() {
  const fields = [['Objectives', 'objectives'], ['Warm-up', 'warmup'], ['Main activity', 'main'], ['Game-related activity', 'game'], ['Cool down', 'cooldown'], ['Coaching points', 'points']];
  return <div className="page-stack"><PageHeader eyebrow="Session planning" title="Create high-detail soccer sessions." action={<button className="btn btn-primary">Save as template</button>}>Plan warm-up, main activity, game-related activity, cool down, and coaching points.</PageHeader><div className="dashboard-grid"><Card><h2>Create session</h2><div className="two-grid"><label>Session title<input defaultValue="Breaking pressure through midfield" /></label><label>Date<input type="date" defaultValue="2026-06-03" /></label><label>Team<select>{teams.map((team) => <option key={team.id}>{team.name}</option>)}</select></label><label>Theme<input defaultValue="Build out + third-player runs" /></label></div>{fields.map(([label, key]) => <label key={label}>{label}<textarea defaultValue={sessions[0][key]} /></label>)}<button className="btn btn-primary full">Create session</button></Card><Card><h2>Session library</h2>{sessions.map((session) => <div className="list-row" key={session.title}><div><strong>{session.title}</strong><p>{session.objectives}</p></div><Badge>{session.team}</Badge></div>)}</Card></div></div>;
}

export function IDPs() {
  return <div className="page-stack"><PageHeader eyebrow="Individual Development Plans" title="Build measurable development plans.">Create goals, KPI categories, weekly notes, monthly reviews, and progress statuses.</PageHeader><div className="dashboard-grid"><Card><h2>Create Individual Development Plan</h2><label>Player goals<textarea defaultValue="Improve receiving profile and decision speed under pressure." /></label>{['Technical KPIs', 'Tactical KPIs', 'Physical KPIs', 'Psychological KPIs', 'Weekly notes', 'Monthly review'].map((field) => <label key={field}>{field}<textarea placeholder={field} /></label>)}<label>Progress status<select><option>Green</option><option>Amber</option><option>Red</option></select></label><button className="btn btn-primary full">Save IDP</button></Card><Card><h2>Active IDPs</h2>{idps.map((idp) => <div className="list-row" key={idp.player}><div><strong>{idp.player}</strong><p>{idp.technical} • {idp.tactical}</p></div><Badge tone={idp.monthly === 'Green' ? 'green' : 'orange'}>{idp.monthly}</Badge></div>)}</Card></div></div>;
}

export function InviteUser() {
  const [role, setRole] = useState('Coach');
  return <div className="page-stack"><PageHeader eyebrow="Invite-user flow" title="Invite coaches, players, parents, directors, and staff.">Organization invites skip pricing and route new users directly into the workspace setup flow.</PageHeader><Card><div className="two-grid"><label>Email<input placeholder="new.user@club.com" /></label><label>Role<select value={role} onChange={(event) => setRole(event.target.value)}>{roles.map((item) => <option key={item}>{item}</option>)}</select></label><label>Team<select>{teams.map((team) => <option key={team.id}>{team.name}</option>)}</select></label><label>Workspace<input defaultValue="PISA / Protouch International Soccer Academy" /></label></div><label>Invite message<textarea value={`You have been invited as a ${role}. Pricing will be skipped because this is an organization invite.`} readOnly /></label><button className="btn btn-primary">Send invite</button></Card></div>;
}

export function WorkspaceSetup() {
  const [role, setRole] = useState('Coach');
  const [workspace, setWorkspace] = useState('Organization');
  const plans = role === 'Parent' || role === 'Player' ? parentPlayerPlans : coachOrgPlans;
  return <div className="page-stack"><PageHeader eyebrow="Onboarding" title="Role-based workspace setup.">Choose role, organization or individual workspace, then select pricing unless you joined through an organization invite.</PageHeader><div className="dashboard-grid"><Card><h2>1. Select role</h2><div className="segmented-list">{roles.map((item) => <button className={role === item ? 'active' : ''} onClick={() => setRole(item)} key={item}>{item}</button>)}</div><h2>2. Workspace</h2><div className="segmented-list"><button className={workspace === 'Organization' ? 'active' : ''} onClick={() => setWorkspace('Organization')}>Organization</button><button className={workspace === 'Individual' ? 'active' : ''} onClick={() => setWorkspace('Individual')}>Individual</button></div><label className="task-item"><input type="checkbox" /> <span>Player is under 18 — require parent account control</span></label></Card><Card><h2>3. Pricing selection</h2><div className="pricing-mini-grid">{plans.map((plan) => <button key={plan.name}><strong>{plan.name}</strong><span>{plan.price}/mo</span><small>{plan.note}</small></button>)}</div><p className="invite-note">Joining through an organization invite? ProHub skips pricing and connects you directly to the invited workspace.</p></Card></div></div>;
}

export function PricingSelection() {
  return <div className="page-stack"><PageHeader eyebrow="Pricing" title="Choose the right ProHub plan.">Separate pricing is shown for parent/player users and coach/director/staff organization users.</PageHeader><div className="dashboard-grid"><Card><h2>Parent / Player pricing</h2>{parentPlayerPlans.map((plan) => <div className="list-row" key={plan.name}><div><strong>{plan.name}</strong><p>{plan.note}</p></div><Badge>{plan.price}/mo</Badge></div>)}</Card><Card><h2>Coach / Organization pricing</h2>{coachOrgPlans.map((plan) => <div className="list-row" key={plan.name}><div><strong>{plan.name}</strong><p>{plan.note}</p></div><Badge>{plan.price}/mo</Badge></div>)}</Card></div></div>;
}

export function ReportsCalendarMessages({ type }) {
  const copy = { Reports: 'Publish player, team, parent, and director reports with KPI context.', Calendar: 'Coordinate sessions, matches, reviews, and family events.', Messages: 'Keep coaches, players, parents, and staff aligned with safe communication.' }[type];
  return <div className="page-stack"><PageHeader eyebrow={type} title={`${type} workspace`}>{copy}</PageHeader><Card><h2>{type} activity</h2>{[1, 2, 3].map((item) => <div className="list-row" key={item}><div><strong>{type} item {item}</strong><p>Placeholder data ready for backend integration.</p></div><Badge tone="blue">Connected</Badge></div>)}</Card></div>;
}

export function Settings() {
  return <div className="page-stack"><PageHeader eyebrow="Settings" title="Manage organization, billing, security, and visibility.">Production-ready settings placeholders for account controls, workspace branding, and notification preferences.</PageHeader><div className="dashboard-grid"><Card><h2>Brand</h2><label>Workspace name<input defaultValue="ProHub / PISA Academy" /></label><label>Primary color<input defaultValue="#0B2751" /></label><label>CTA color<input defaultValue="#E47410" /></label></Card><Card><h2>Security</h2><label className="task-item"><input type="checkbox" defaultChecked /> <span>Email verification required</span></label><label className="task-item"><input type="checkbox" defaultChecked /> <span>Parent account control for under-18 players</span></label><label className="task-item"><input type="checkbox" /> <span>Require two-factor authentication</span></label></Card></div></div>;
}
