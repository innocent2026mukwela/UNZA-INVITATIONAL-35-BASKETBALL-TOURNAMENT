# UNZA Invitational 35+ Basketball Tournament 2026

Official website for the **UNZA Invitational 35+ Basketball Tournament**, a two-day competitive basketball event held on **4–5 July 2026** at **UNZA Sports Hall & NASDEC, Lusaka, Zambia**. All proceeds go directly to the UNZA Basketball programme.

---

## Live Site

Deployed on Vercel — connected to this GitHub repository. Every push to `main` triggers an automatic deployment.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS + custom CSS animations |
| Fonts | Bebas Neue, Barlow Condensed, Inter (Google Fonts) |
| Email | EmailJS |
| Storage | Browser `localStorage` (registrations, sponsors) |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── App.tsx                    # Root layout — assembles all sections
│   ├── components/
│   │   ├── Navbar.tsx             # Sticky top nav with mobile drawer
│   │   ├── Hero.tsx               # Full-screen hero section
│   │   ├── CountdownTimer.tsx     # Live countdown to tournament day
│   │   ├── StatsBar.tsx           # Key stats (teams, date, category, fee)
│   │   ├── AboutSection.tsx       # Tournament info cards
│   │   ├── PhotoSlideshow.tsx     # Reusable fade/slide photo gallery
│   │   ├── ParticipatingTeams.tsx # Team logos by division (auto-updates on registration)
│   │   ├── TeamSlots.tsx          # Live slot availability tracker
│   │   ├── Schedule.tsx           # Key dates & tournament schedule
│   │   ├── Registration.tsx       # Team registration form with validation
│   │   ├── Sponsors.tsx           # Sponsor display (reads from localStorage)
│   │   └── Footer.tsx             # Footer with links and contact
│   └── pages/
│       └── Admin.tsx              # Password-protected admin dashboard
├── styles/
│   ├── index.css                  # Global styles & Tailwind directives
│   └── animations.css             # Custom animation classes
public/
├── gallery/                       # All background & gallery images
├── teams/                         # Participating team logos (smb.png, net-rippers.png, unza-legacy.png)
└── gallery/logo.jpeg              # Tournament logo
vercel.json                        # SPA routing rewrites (incl. /admin)
```

---

## Key Features

### Public Site
- **Hero** — animated background with parallax logo effect
- **Countdown** — live timer counting down to 4 July 2026
- **About** — tournament info, venue, divisions, and cause
- **Participating Teams** — auto-populated grid of team logos split by Men's / Women's division
- **Team Slots** — real-time slot tracker (12 male · 8 female)
- **Schedule** — key dates from briefing through to finals
- **Registration** — full team registration form (division, team info, roster, logo upload, email)
- **Sponsors** — dynamically managed sponsor logos by tier
- **Gallery** — two photo slideshows

### Admin Dashboard (`/admin`)
- Password-protected login (default: `UNZA2025`)
- **Registrations tab** — view, search, filter, and delete team registrations; expand rows to see player rosters; export to CSV
- **Sponsors tab** — upload sponsor logos, assign Platinum/Gold/Silver tier, remove sponsors
- All changes reflect live on the public site via `localStorage`

---

## Adding the 3 Starter Team Logos

Save the following image files to the `public/teams/` folder with these exact names:

| Team | Filename |
|---|---|
| SMB Basketball Team | `smb.png` |
| Net Rippers Fiwame Fibipe | `net-rippers.png` |
| UNZA Legacy | `unza-legacy.png` |

Then deploy:
```bash
git add public/teams/
git commit -m "Add team logos"
git push
```

---

## Registration Flow

1. Team fills out the form (division, name, captain, coach, phone, email, roster, logo)
2. Data saved to `localStorage` under key `unzaRegistrations`
3. Email sent via EmailJS to the tournament organiser
4. Team's logo automatically appears in the **Participating Teams** section
5. Slot count updates in real time across **Team Slots** and **Stats Bar**

---

## Environment & EmailJS

EmailJS is configured directly in `Registration.tsx`. The service ID, template ID, and public key are already set. To update them, edit these values:

```ts
emailjs.send(
  'service_ir7xqxn',   // Service ID
  'template_4wc4ks9',  // Template ID
  { ... },
  'DWnEfFJ8wuI30d48Q'  // Public Key
)
```

---

## Tournament Details

| | |
|---|---|
| **Event** | UNZA Invitational 35+ Basketball Tournament 2026 |
| **Dates** | 4–5 July 2026 |
| **Venue** | UNZA Sports Hall & NASDEC, Lusaka, Zambia |
| **Divisions** | Men's (12 teams) · Women's (8 teams) |
| **Eligibility** | Players aged 35 and above |
| **Entry Fee** | K5,000 per team |
| **Cause** | All proceeds support the UNZA Basketball programme |
| **Briefing** | 27 May 2026 |
| **The Draw** | 20 June 2026 |
| **Registration Deadline** | 15 June 2026 |

---

## Deployment

The site is deployed via **Vercel** with the following rewrite rules in `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/admin",      "destination": "/index.html" },
    { "source": "/admin/(.*)", "destination": "/index.html" },
    { "source": "/(.*)",       "destination": "/index.html" }
  ]
}
```

This ensures the `/admin` route and all SPA routes are handled correctly.

---

## Contact

**Email:** events@unzabasketballalumini.org  
**Facebook:** [UNZA Alumni Basketball](https://www.facebook.com/profile.php?id=61589247851887)
