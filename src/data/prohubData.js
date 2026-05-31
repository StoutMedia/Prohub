export const roles = ['Coach', 'Player', 'Parent', 'Director', 'Staff'];

export const parentPlayerPlans = [
  { name: 'Starter', price: '$9', note: 'Profile, shared calendar, parent visibility, and weekly nudges.' },
  { name: 'Player', price: '$29', note: 'KPI tracking, session history, reports, and IDP access.' },
  { name: 'Family', price: '$59', note: 'Multi-player household, parent controls, and private messaging.' },
  { name: 'Family Plus', price: '$89', note: 'Expanded support, priority reviews, and academy-ready reporting.' },
];

export const coachOrgPlans = [
  { name: 'Starter', price: '$29', note: 'Individual coach workspace with rosters and session plans.' },
  { name: 'Team', price: '$79', note: 'One team, staff invites, reports, and parent/player portals.' },
  { name: 'Academy', price: '$199', note: 'Multi-team pathway, directors dashboard, and shared templates.' },
  { name: 'Organization', price: '$499', note: 'Club-wide operations, invite controls, analytics, and support.' },
];

export const teams = [
  { id: 1, name: 'PISA Elite 2011', ageGroup: 'Boys U15', players: 18, staff: 4, nextSession: 'Tue 6:00 PM', status: 'In season' },
  { id: 2, name: 'Protouch Select 2013', ageGroup: 'Girls U13', players: 16, staff: 3, nextSession: 'Wed 5:30 PM', status: 'Preseason' },
  { id: 3, name: 'North Campus Prep', ageGroup: 'Boys U17', players: 21, staff: 5, nextSession: 'Thu 7:00 PM', status: 'Tournament block' },
];

export const players = [
  { id: 1, name: 'Jordan Reyes', age: 15, position: 'CM', team: 'PISA Elite 2011', status: 'On track', kpi: 82, parent: 'Maria Reyes · maria@family.com', goals: 'Improve scanning before receiving and leadership in transition.', strengths: 'Tempo control, first touch, vertical passing.', areas: 'Defensive duels, weak-foot switches.', visibility: 'Parent + player can view weekly notes.' },
  { id: 2, name: 'Ava Thompson', age: 13, position: 'LW', team: 'Protouch Select 2013', status: 'Needs review', kpi: 67, parent: 'Chris Thompson · chris@family.com', goals: 'Create more 1v1 end product and improve final pass.', strengths: 'Acceleration, ball carrying, pressing effort.', areas: 'Crossing consistency, recovery runs.', visibility: 'Player sees goals; parent sees reports and billing.' },
  { id: 3, name: 'Malik Carter', age: 17, position: 'CB', team: 'North Campus Prep', status: 'College ready', kpi: 91, parent: 'Dana Carter · dana@family.com', goals: 'Prepare showcase film and expand leadership role.', strengths: 'Aerial duels, communication, long distribution.', areas: 'Hip mobility, recovery sprint angles.', visibility: 'Director, coach, parent, and player visibility enabled.' },
  { id: 4, name: 'Sofia Nguyen', age: 14, position: 'GK', team: 'Protouch Select 2013', status: 'Accelerating', kpi: 76, parent: 'Linh Nguyen · linh@family.com', goals: 'Increase command of box and restart speed.', strengths: 'Shot stopping, bravery, distribution.', areas: 'High claim timing, communication volume.', visibility: 'Parent approval required for external sharing.' },
];

export const sessions = [
  { title: 'Breaking pressure through midfield', date: 'June 3, 2026', team: 'PISA Elite 2011', theme: 'Build out + third-player runs', objectives: 'Create passing angles, scan early, break lines safely.', warmup: 'Rondo with gates and shoulder-check trigger.', main: '6v4 build-out waves from GK into midfield.', game: '8v8 to mini-goals with counterpress bonus.', cooldown: 'Mobility and player reflection.', points: 'Open body shape, support below ball, pass timing.' },
  { title: 'Wide overloads and cutbacks', date: 'June 5, 2026', team: 'Protouch Select 2013', theme: 'Final third creation', objectives: 'Use width, underlap, and cutback decisions.', warmup: 'Dynamic dribble lanes.', main: '3v2 wide channel overloads.', game: '7v7 with wide-zone scoring.', cooldown: 'Partner stretch.', points: 'Arrive late, scan box, disguise final ball.' },
];

export const idps = [
  { player: 'Jordan Reyes', technical: 'Receive under pressure', tactical: 'Scan before line-breaking pass', physical: 'Repeat sprint recovery', psychological: 'Own halftime communication', weekly: 'Two elite clips added; needs duel focus.', monthly: 'Green' },
  { player: 'Ava Thompson', technical: 'Cross after explosive touch', tactical: 'Recognize isolation moments', physical: 'First-five-yard power', psychological: 'Reset after turnovers', weekly: 'Finishing work trending up.', monthly: 'Amber' },
];

export const reports = ['Jordan KPI review published', 'Ava parent summary drafted', 'Malik showcase readiness updated'];
export const tasks = ['Invite two assistant coaches', 'Approve Sofia parent visibility', 'Finalize Friday session template', 'Review IDPs due this week'];
