UNZA Legacy Basketball Tournament 2025 — Full Design Brief
Project Overview
A single-page sports event website for the UNZA Legacy Basketball Tournament — a university-level basketball competition held in Lusaka, Zambia, 5–16 July 2025. The site handles event information, team registration, and brand presence. No backend — all data stored in localStorage.

Design Language
Aesthetic: Dark premium sports — think NBA Finals broadcast graphics. Cinematic, editorial, high-contrast. Not glossy or playful. Serious, confident, professional.

Color Palette:

Token	Value	Usage
Background	#080808	Page base
Surface	#0f0f0f	Slightly lighter sections
Card	#161616	Cards, form background
Dark input	#1e1e1e	Form fields
Gold primary	#f59e0b	All accents, CTAs, highlights
Gold light	#fbbf24	Hover states, number text
Gold dim	rgba(245,158,11,0.12)	Borders, dividers
White	#ffffff	Headings
Muted text	rgba(255,255,255,0.38)	Body copy, labels
Typography:

Font	Weight	Usage
Bebas Neue	400	All section headings, stat numbers, countdown digits, nav brand
Barlow Condensed	400 / 600 / 700	Nav links, card tags, table headers, labels, footer headings
Inter	300 / 400 / 500	Body text, form inputs, quotes, paragraphs
Border radius: 14px cards, 22px larger panels, 4px buttons (sharp, sporty — not bubbly)

Buttons:

Primary: Gold fill #f59e0b, black text, 4px radius, Bebas Neue, letter-spacing 2px, click ripple effect
Outline: Transparent with gold border, gold text, same shape
Both lift translateY(-3px) on hover
Page Structure (top to bottom)
1. Navigation Bar
Fixed, full-width
Background: rgba(8,8,8,0.7) with backdrop-filter: blur(28px) — darkens to 0.95 on scroll
Bottom border: 1px gold dim line
Left: Circular logo (44×44, gold ring border) + "UNZA Legacy" in Bebas Neue
Center: Nav links — Home, About, Gallery, Schedule, Register, Sponsors — Barlow Condensed, uppercase, gold on hover
Right: Gold filled "Register Now" button
Mobile: Hamburger → full-width dropdown overlay
2. Hero Section
Full viewport height (100vh)
Background: Near-black with two subtle gold radial gradients (top-left and bottom-right), very faint
Floating 3D particle field behind everything — ~1,400 gold/amber particles in a sphere, connected by sparse lines, slow rotation, mouse parallax
Center content (max-width 820px):
Circular tournament logo (150×150), gold ring, animated drop-shadow pulse
Location line: pin icon + "Lusaka, Zambia" — Barlow Condensed, 4px letter-spacing, very muted
Main heading: "UNZA Legacy / Basketball Tournament" — Bebas Neue, clamp(2.8rem → 5rem), gold gradient text
Dates: "5th July — 16th July 2025" — Barlow Condensed, gold color
Subtext: one-liner — Inter light, muted
Two buttons: Gold "Register Your Team" + outline "Learn More"
3. Countdown Timer
Padded section between hero and about (60px top / 100px bottom)
Single dark card (#161616), gold top-border gradient line, 22px radius
Label: "Tournament Starts In" — Barlow Condensed, uppercase, very muted
4 units: Days / Hours / Mins / Secs — each in its own dark tile (#1e1e1e), gold-bordered
Digit: Bebas Neue clamp(2.6rem → 3.6rem), gold-light color
Label: Barlow Condensed, 3px letter-spacing, very muted
Separator : between units in gold
State: Shows "Tournament In Progress!" in large gold Bebas Neue when date has passed
4. About the Tournament
Dark background, 100px vertical padding
Section title pattern (used site-wide): Bebas Neue uppercase, gold gradient text, underlined by a short animated gold line
Intro paragraph: Centered, Inter light, muted, max-width 620px
Stat bar: Full-width dark card, 4 stats in a row divided by 1px gold hairlines
Stats: 18 Teams / 12 Days / 2 Divisions / 1 Champion
Number: Bebas Neue clamp(3.2rem → 4.8rem), gold
Label: Barlow Condensed, 3.5px letter-spacing, very muted
4 info cards in a flush grid (no gaps — separated by 1px gold lines, single rounded container)
Each card: small gold tag pill (e.g. "Men's Division"), large white heading, muted body text
Cards: Men's 10 Teams / Women's 8 Teams / Location Lusaka / Awards & Trophies
Hover: card background lightens slightly
5. Gallery — Basketball Spirit
Section title + subtitle "The court is where legends are made." in Barlow Condensed uppercase, very muted
Full-bleed slideshow — 78vh height, straight edges (no border radius), flush to viewport
6 slides, each:
Full-cover basketball action photo
Ken Burns effect — image starts at scale(1.08) and slowly pulls to scale(1) when active
Cinematic gradient — image is clear in the top 65%, fades to near-black at the bottom
Quote overlaid at bottom of the image:
Blockquote: Inter light italic, white 0.9 opacity, text-shadow for legibility
Author: Barlow Condensed uppercase, gold, 4px letter-spacing
Controls:
Left/right arrow buttons — circular, frosted glass, white → gold on hover
Pill dots at bottom — short rectangles, active dot is wider and gold
Auto-advances every 5 seconds, pauses on hover, swipe on mobile
Quotes used:
"Hard work beats talent when talent doesn't work hard." — Tim Notke
"You can't win unless you learn how to lose." — Kareem Abdul-Jabbar
"I've missed more than 9,000 shots in my career. That's why I succeed." — Michael Jordan
"The strength of the team is each individual member." — Phil Jackson
"Excellence is not a singular act, but a habit." — Shaquille O'Neal
"The game is my wife. It demands loyalty and gives back beautifully." — Michael Jordan
6. Team Slots Tracker
Two dark cards side by side (Men's / Women's)
Gold top accent line on each card
Progress bar: thin 6px track, gold gradient fill, animated width
Labels: "X / 10 Teams Registered" and remaining slots count
Reads from localStorage and updates live after registrations
7. Tournament Schedule
Dark bordered table inside a 22px radius container
Header row: gold text on dark gold-tinted background
Columns: Phase / Dates / Details
Date column styled in gold, Barlow Condensed
Rows: subtle gold highlight on hover
6 phases: Registration → Draw → Group Stage → QF → SF → Finals
8. Team Registration Form
Dark card with gold top-line gradient
Fields (in a 2-column grid):
Division (radio — Men's / Women's)
Team Name
Team Abbreviation (max 5 chars)
Team Captain Name
Coach / Manager Name
Coach Phone
Number of Players (5–15)
Team Logo upload (drag & drop with preview)
Additional Notes (optional)
Terms agreement (checkbox)
Inputs: dark bg #1e1e1e, subtle border, gold focus ring
All labels: Barlow Condensed uppercase, muted
Submit: full-width gold button
On success: confirmation card with gold checkmark icon, dismissible
9. Sponsors
3 placeholder cards (Platinum / Gold / Silver) in a flex row
Dashed gold border placeholders for logos
Cards lift on hover
10. Footer
3-column grid: Brand / Quick Links / Contact
Top gold gradient line
Logo repeated (small, circular)
Gold dates, muted paragraph text
Nav links in muted text → gold on hover
Contact email in gold
Social buttons (Facebook / Instagram / Twitter X) — dark pill buttons, gold on hover
Copyright bar at very bottom
Interaction & Animation Summary
Effect	Description
3D particle field	Three.js — 1,400 gold particles, constellation lines, mouse parallax, breathing opacity
Ken Burns	Slide images zoom out slowly when active (6–7s transition)
Button ripple	Click origin radial pulse on all gold buttons
Scroll reveal	Cards and panels fade+slide up via IntersectionObserver
Card tilt	Slot cards follow cursor with perspective 3D tilt
Logo pulse	drop-shadow glow breathes in/out every 5s
Countdown tick	Seconds digit scales up briefly on each change
Navbar scroll	Background opacity increases past 40px scroll
Slideshow	Auto 5s, swipe mobile, keyboard arrows, pause on hover, pill dot nav