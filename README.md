# PISA ProHub React SaaS Prototype

PISA ProHub is a responsive front-end SaaS prototype for Protouch International Soccer Academy. It connects players, parents, coaches, directors, and recruiters into one soccer development ecosystem.

## What changed

The original static HTML/CSS/JS prototype has been migrated into a routed React application using a Vite-style project structure. The React app preserves the dark premium sports-tech direction, PISA orange (`#E47410`) accent system, rounded glass cards, dashboard side navigation, mobile navigation, responsive tables, tabs, mock login role routing, and soccer-specific content from the existing pages.

## Current structure

```text
src/
  components/
    layout/          Shared Header, Sidebar, DashboardLayout, Footer
    ui/              Button, Card, Badge, StatCard, ProgressBar, Modal, Tabs
    dashboard/       Player snapshot, training, IDP, recruiting, journal, review widgets
    navigation/      RoleSwitcher and MobileNav
  pages/
    marketing/       Home, Programs, SummerTraining, Pricing, About, Contact, recruiting, player development, coaches
    auth/            Login, Register, ForgotPassword
    dashboards/      Player, Parent, Coach, Director, Recruiter/Admin dashboards
    player/          DevelopmentPlan, TrainingPlan, Journal, Recruiting, VideoReview, Profile
    coach/           TeamOverview, SessionPlanner, PlayerReports, GameModel
    director/        ClubOverview, StaffManagement, PlayerPathway, Reports
  data/              Mock users, players, training, recruiting, reports
  routes/            AppRoutes
  styles/            Global responsive styles
```

## Running locally

Install dependencies and start Vite:

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite, usually `http://localhost:5173`.

> Note: this environment blocked registry access while attempting `npm install`, so dependencies may need to be installed in a normal local development environment.

## Key routes

- `/` — SaaS marketing homepage
- `/programs`, `/summer-training`, `/recruiting`, `/player-development`, `/coaches`, `/pricing`, `/about`, `/contact`
- `/login` — mock role-based login
- `/app/player`, `/app/parent`, `/app/coach`, `/app/director`, `/app/recruiter`
- `/app/development-plan`, `/app/training`, `/app/journal`, `/app/recruiting`, `/app/video-review`, `/app/reports`, `/app/profile`
- `/app/session-planner`, `/app/game-model`, `/app/staff-management`, `/app/player-pathway`

## Assumptions

- No backend is connected yet; all data lives in `src/data` mock modules.
- Role login is a client-side redirect only.
- Payment, authentication, permissions, video storage, and recruiting CRM records are placeholders for future services.
- The app uses custom CSS to preserve the existing design direction; Tailwind can be added later when package installation is available.

## Recommended next steps

1. Add production authentication with role/permission claims.
2. Model database tables for players, teams, IDPs, journals, sessions, videos, reports, recruiting schools, and communications.
3. Connect payments/subscriptions with Stripe or a comparable provider.
4. Add cloud video storage and clip tagging.
5. Add API-backed coach feedback, player reports, and director oversight dashboards.
6. Add automated tests, accessibility checks, and visual regression coverage.
