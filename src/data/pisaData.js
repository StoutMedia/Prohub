export const roles = [
  { id: 'player', label: 'Player', path: '/app/player', description: 'Own your profile, IDP, training, recruiting, and reflections.' },
  { id: 'parent', label: 'Parent', path: '/app/parent', description: 'Track progress, reports, subscription status, and next family actions.' },
  { id: 'coach', label: 'Coach', path: '/app/coach', description: 'Manage players, IDPs, training plans, notes, reports, and recruiting progress.' },
  { id: 'admin', label: 'Admin', path: '/app/admin', description: 'Manage users, subscriptions, templates, reports, and revenue.' },
];

export const dataModel = {
  users: ['id', 'name', 'email', 'role_id', 'subscription_id', 'created_at'],
  roles: ['id', 'name', 'permissions'],
  players: ['id', 'user_id', 'parent_user_id', 'coach_user_id', 'club_id', 'team_id'],
  player_profiles: ['id', 'player_id', 'age', 'graduation_year', 'position', 'secondary_position', 'dominant_foot', 'height', 'weight', 'school', 'gpa', 'target_college_level', 'strengths', 'development_needs', 'goals', 'highlight_video_link'],
  development_plans: ['id', 'player_id', 'coach_id', 'overview', 'technical_focus', 'tactical_focus', 'physical_focus', 'mental_focus', 'weekly_objectives', 'kpis', 'training_actions', 'reflection_questions'],
  training_plans: ['id', 'player_id', 'coach_id', 'week', 'theme', 'objective', 'session_type', 'warm_up', 'technical_activity', 'tactical_activity', 'physical_component', 'cooldown', 'homework', 'reflection_question', 'completion_status'],
  recruiting_contacts: ['id', 'player_id', 'college_name', 'division', 'location', 'coach_name', 'coach_email', 'interest_level', 'email_sent_date', 'follow_up_date', 'response_status', 'notes', 'highlight_video_link', 'next_action'],
  reports: ['id', 'player_id', 'report_type', 'summary', 'progress_made', 'areas_to_improve', 'next_steps', 'coach_recommendation'],
  subscriptions: ['id', 'user_id', 'stripe_customer_id', 'stripe_price_id', 'plan_name', 'status', 'billing_interval'],
  coach_notes: ['id', 'coach_id', 'player_id', 'category', 'note', 'created_at'],
};

export const playerProfile = {
  id: 'profile_001',
  name: 'Jordan Rivera',
  age: 17,
  graduationYear: 2027,
  position: 'Central Midfielder',
  secondaryPosition: 'Defensive Midfielder',
  dominantFoot: 'Right',
  height: '5\'10"',
  weight: '155 lb',
  club: 'PISA Elite',
  team: 'U19 MLS Next',
  school: 'North Valley Prep',
  gpa: '3.7',
  targetCollegeLevel: 'NCAA Division I / II',
  strengths: 'Scanning before receiving, progressive passing, counterpressing reaction',
  developmentNeeds: 'Preparation touch away from pressure, late box arrival timing, left-foot switches',
  shortTermGoals: 'Win starting role at next showcase and improve two-touch speed under pressure.',
  longTermGoals: 'Earn a college roster spot in a possession-based program.',
  highlightVideoLink: 'https://video.example.com/jordan-rivera-highlights',
};

export const players = [
  { id: 'pl_001', ...playerProfile, avatar: 'JR', status: 'On track', idpProgress: 76, recruitingProgress: 58, attendance: 92, wellness: 8.4, latestNote: 'Scanning timing improved in midfield rondo and 7v7 build-out.' },
  { id: 'pl_002', name: 'Maya Thompson', age: 16, graduationYear: 2028, position: 'Winger', secondaryPosition: 'Forward', dominantFoot: 'Left', height: '5\'6"', weight: '130 lb', club: 'PISA Elite', team: 'U17 Academy', school: 'Central Prep', gpa: '3.9', targetCollegeLevel: 'NCAA Division I', strengths: 'Acceleration, 1v1 creation, driven cross', developmentNeeds: 'Weak-side defending, final action selection', shortTermGoals: 'Create three high-quality chances per match.', longTermGoals: 'Compete in a top-50 college program.', highlightVideoLink: 'https://video.example.com/maya', avatar: 'MT', status: 'Review due', idpProgress: 68, recruitingProgress: 35, attendance: 88, wellness: 7.9, latestNote: 'Needs new highlight clips from spring showcase.' },
  { id: 'pl_003', name: 'Alex Chen', age: 18, graduationYear: 2026, position: 'Center Back', secondaryPosition: 'Right Back', dominantFoot: 'Right', height: '6\'1"', weight: '175 lb', club: 'PISA Elite', team: 'U19 MLS Next', school: 'West Ridge', gpa: '3.5', targetCollegeLevel: 'NCAA Division II / III', strengths: 'Aerial duels, diagonal switches, cover speed', developmentNeeds: 'First touch into passing lane, rest-defense communication', shortTermGoals: 'Complete 8+ line-breaking passes per game.', longTermGoals: 'Commit before senior fall season.', highlightVideoLink: 'https://video.example.com/alex', avatar: 'AC', status: 'Needs video', idpProgress: 82, recruitingProgress: 71, attendance: 95, wellness: 8.8, latestNote: 'Recruiting follow-ups due this week.' },
];

export const developmentPlan = {
  playerOverview: 'Jordan is a high-IQ central midfielder who can control tempo and connect lines when his body shape is prepared early.',
  technicalFocus: 'Receive side-on, scan twice before contact, play the preparation touch into the next passing lane, and add left-foot switches.',
  tacticalFocus: 'Identify third-player combinations, arrive in the box after wide entries, and counterpress within five seconds after loss.',
  physicalFocus: 'Repeat acceleration after receiving, improve hip mobility, and build high-speed repeatability for transition moments.',
  mentalFocus: 'Use a reset cue after mistakes, demand the ball under pressure, and lead communication in central channels.',
  weeklyObjectives: ['Complete 150 wall-pass repetitions with two-scan rule.', 'Clip three match moments showing line-breaking decisions.', 'Log two reflections after high-intensity sessions.'],
  kpis: ['Scanning actions before reception: 80%+', 'Progressive passes completed: 7 per match', 'Counterpress regains: 3 per match', 'Reflection completion: 2 per week'],
  recommendedTrainingActions: ['Tight-space rondos with directional exits', 'Midfield receiving circuit', 'Third-player pattern play', 'Small-sided transition games'],
  coachNotes: 'Connect technical detail to tactical advantage. The next growth jump is playing forward earlier when pressure arrives.',
  reflectionQuestions: ['What did I scan before receiving?', 'When did I break pressure with my first touch?', 'How did I respond after a turnover?'],
};

export const trainingPlans = [
  { id: 'tp_001', week: 'May 18-24', theme: 'Receive to break pressure', objective: 'Improve first-touch direction and line-breaking decisions.', sessionType: 'Technical + tactical', warmUp: 'Dynamic mobility and ball mastery scans', technicalActivity: 'Two-touch receiving gates', tacticalActivity: '6v4 midfield build-out to target zones', physicalComponent: '5-second counterpress repeats', cooldown: 'Mobility and breathing reset', homework: '150 wall passes with pre-scan cue', reflectionQuestion: 'Which touch helped me play forward fastest?', completionStatus: 'In progress' },
  { id: 'tp_002', week: 'May 25-31', theme: 'Final third arrival', objective: 'Time late runs and deliver quality final pass.', sessionType: 'Position-specific', warmUp: 'Movement prep and finishing patterns', technicalActivity: 'Cutback and driven-pass repetition', tacticalActivity: 'Wide entry to late midfielder arrival', physicalComponent: 'Repeat box-to-box accelerations', cooldown: 'Stretch and hydration checklist', homework: 'Analyze two college midfielders making late runs', reflectionQuestion: 'When did I arrive too early or too late?', completionStatus: 'Planned' },
];

export const recruitingContacts = [
  { id: 'rc_001', collegeName: 'State University', division: 'NCAA D1', location: 'Raleigh, NC', coachName: 'Coach Martin', coachEmail: 'martin@state.example', interestLevel: 'High', emailSentDate: '2026-05-02', followUpDate: '2026-05-16', responseStatus: 'Opened - no reply', notes: 'Likes 2027 central midfielders with strong academics.', highlightVideoLink: playerProfile.highlightVideoLink, nextAction: 'Send tournament schedule email' },
  { id: 'rc_002', collegeName: 'Lakeside College', division: 'NCAA D2', location: 'Erie, PA', coachName: 'Coach Silva', coachEmail: 'silva@lakeside.example', interestLevel: 'Medium', emailSentDate: '2026-04-25', followUpDate: '2026-05-14', responseStatus: 'Replied', notes: 'Requested updated transcript and June showcase schedule.', highlightVideoLink: playerProfile.highlightVideoLink, nextAction: 'Send thank-you and transcript update' },
];

export const reports = [
  { id: 'rep_001', type: 'Monthly player development report', summary: 'Jordan improved receiving habits and transition reactions.', progressMade: 'More forward-facing first touches and higher training completion.', areasToImprove: 'Left-foot switch consistency and late box timing.', nextSteps: 'Add two positional sessions and one film reflection per week.', coachRecommendation: 'Ready for advanced midfield group if consistency holds.' },
  { id: 'rep_002', type: 'Parent progress report', summary: 'Development plan is on track with clear home actions.', progressMade: 'Attendance and reflections remain strong.', areasToImprove: 'Recovery routine and sleep consistency after matches.', nextSteps: 'Family should update highlight video and GPA documentation.', coachRecommendation: 'Keep communication cadence monthly.' },
  { id: 'rep_003', type: 'Recruiting progress report', summary: 'Two active schools and three warm outreach targets.', progressMade: 'Initial emails sent with updated profile.', areasToImprove: 'Follow-up discipline and tournament schedule clarity.', nextSteps: 'Send tournament schedule email to high-interest schools.', coachRecommendation: 'Target D1/D2 possession programs plus academic D3 options.' },
  { id: 'rep_004', type: 'Coach evaluation report', summary: 'Strong tactical understanding with leadership upside.', progressMade: 'Improved ball demands and central communication.', areasToImprove: 'Earlier shoulder checks under tight pressure.', nextSteps: 'Review three film clips with coach before next match.', coachRecommendation: 'Use as a central connector in showcase matches.' },
];

export const pricingPlans = [
  { id: 'starter', name: 'Starter', price: '$19', cadence: '/month', stripePriceId: 'price_starter_monthly_placeholder', audience: 'Player profile + basic development', features: ['Player profile builder', 'Training plan workspace', 'Monthly report template', 'Stripe subscription placeholder'] },
  { id: 'pro', name: 'Pro', price: '$49', cadence: '/month', stripePriceId: 'price_pro_monthly_placeholder', audience: 'Player + recruiting CRM', features: ['Everything in Starter', 'AI IDP generator', 'Recruiting tracker', 'AI recruiting emails'] },
  { id: 'elite', name: 'Elite', price: '$99', cadence: '/month', stripePriceId: 'price_elite_monthly_placeholder', audience: 'Coach-supported pathway', features: ['Everything in Pro', 'Coach notes and reports', 'Parent progress reports', 'Priority templates'] },
  { id: 'accelerator', name: 'Accelerator', price: '$1,500', cadence: 'one-time', stripePriceId: 'price_accelerator_onetime_placeholder', audience: 'High-touch recruiting sprint', features: ['Profile buildout', 'Recruiting strategy', 'Email campaign setup', 'One-time Stripe checkout placeholder'] },
];

export const adminMetrics = {
  users: 428,
  subscriptions: 196,
  monthlyRevenue: '$18.6k',
  acceleratorRevenue: '$24k',
  openReports: 31,
};
