# PISA Prohub Static Prototype

PISA Prohub is a responsive static web app prototype for a premium soccer development platform serving players, parents, coaches, and directors/admins.

## What is included

- `index.html` — homepage with platform positioning, feature pillars, role selector, and roadmap modal.
- `pages/features/platform.html` — platform and IDP workflow overview.
- `pages/features/recruiting.html` — recruiting support and sample recruiting board.
- `pages/features/video-analytics.html` — video/analytics library concept page.
- `pages/dashboards/player.html` — player dashboard with IDP, journal, and film tabs.
- `pages/dashboards/coach.html` — coach dashboard with roster, feedback, and session tabs.
- `pages/dashboards/parent.html` — parent dashboard entry point.
- `pages/dashboards/admin.html` — director/admin dashboard entry point.
- `assets/css/styles.css` — global responsive styles, brand colors, cards, navigation, tabs, tables, and modal styling.
- `assets/js/app.js` — global interactions for the mobile menu, dashboard dropdown, login role selector, tabs, and modals.

## Brand direction

The prototype uses a dark premium sports look with PISA orange (`#E47410`) as the primary accent. Supporting colors include white, black, blue, green, red, and purple for status, feature grouping, and dashboard emphasis.

## Running locally

Open `index.html` directly in a browser, or serve the folder with a simple static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Future backend integration points

HTML and JavaScript comments mark areas intended for future production wiring, including:

- Authenticated role-based routing after login.
- IDP records, progress history, and evaluation data.
- Player training journal persistence.
- Coach feedback submissions and notifications.
- Recruiting CRM records and college outreach data.
- Cloud video storage, clip tagging, and analytics events.
- Admin user management and permission APIs.

## WordPress/Elementor or React migration notes

The app is intentionally organized around reusable sections and components:

- Header/navigation
- Hero blocks
- Feature cards
- Metric cards
- Timeline cards
- Dashboard tabs
- Responsive tables
- Modals

For WordPress/Elementor, each section can be rebuilt as a reusable template or global widget. For React, the repeated markup can become components such as `Header`, `Card`, `DashboardTabs`, `RoleSelector`, `Modal`, and `MetricCard`.

## Recommended next steps

1. Replace repeated static headers with a server-side include, Elementor global header, or React component.
2. Add real authentication and role permissions.
3. Define the data model for players, teams, IDPs, journals, recruiting profiles, clips, and feedback.
4. Connect dashboards to APIs and CMS-managed content.
5. Add automated HTML validation, accessibility checks, and visual regression tests.
6. Add real PISA brand assets, photography, and approved copy.
