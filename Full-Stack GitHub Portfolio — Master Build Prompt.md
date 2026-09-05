# Build a Personal Portfolio for Ketan Katore

Redesign and rebuild my personal portfolio website from scratch.

The site will be hosted on GitHub Pages and should be production-quality.

This is the portfolio of a **Full-Stack Engineer specializing in real-time systems, WebRTC, and modern AI experiments**.

The most important goal is to communicate:

> **I am a senior full-stack engineer who can design, build, debug, and scale real-time products end-to-end.**

This must NOT look like a generic developer portfolio or an AI-generated/vibe-coded website.

---

# 1. CORE POSITIONING

Primary identity:

**Full-Stack Engineer**

Specialization:

**Real-Time Systems · WebRTC · Web · Backend · AI**

Core technologies should be represented naturally:

**TypeScript · JavaScript · React · Node.js · WebRTC · WebSockets · APIs · Databases · AI/LLMs**

I have 5+ years of professional engineering experience.

WebRTC and real-time communication are major areas of expertise.

AI is an important area of experimentation and current exploration.

Do NOT position me primarily as:

- Frontend Developer
- React Developer
- AI Engineer

The positioning should be:

**Full-Stack Engineer with deep real-time systems expertise.**

---

# 2. DESIGN DIRECTION

The visual language should feel like:

**Linear × GitHub × Raycast × engineering notebook**

Think:

- sophisticated
- technical
- minimal
- dark
- editorial
- precise
- calm
- highly intentional

Avoid the typical "developer portfolio" aesthetic.

Absolutely avoid:

- giant gradient blobs
- excessive glassmorphism
- floating 3D objects
- animated backgrounds
- particle effects
- excessive neon
- giant glowing text
- generic AI imagery
- skill percentage circles
- "10x developer" language
- fake statistics
- endless rounded cards
- unnecessary parallax
- excessive scroll animations
- random terminal animations
- stock illustrations

The site should feel **engineered**, not decorated.

---

# 3. VISUAL SYSTEM

Use a dark-first design.

Background:

Near-black, slightly warm/cool rather than absolute #000.

Typography:

Use a high-quality modern sans-serif for normal content.

Use a monospace font for:

- technical labels
- metadata
- architecture
- code
- system status
- small annotations

Use restrained borders and separators.

Cards should be rare and purposeful.

Prefer:

- horizontal rules
- editorial layouts
- grids
- columns
- asymmetric layouts
- inline panels

over a collection of identical cards.

Use one subtle accent color.

Avoid rainbow gradients.

---

# 4. NAVIGATION

Minimal sticky navigation.

Left:

**Ketan Katore**

Right:

- Work
- Systems
- AI Lab
- Writing
- About

Small status indicator:

**OPEN TO REMOTE OPPORTUNITIES**

Navigation should not dominate the page.

Mobile navigation should be simple and usable.

---

# 5. HERO

The hero should be extremely clear.

Use:

```text
KETAN KATORE

FULL-STACK ENGINEER

I build real-time products
and the systems behind them.

Web · Backend · WebRTC · Real-time · AI

[GitHub] [LinkedIn] [Email]
```

Do not use generic statements like:

"Passionate developer creating innovative solutions."

The copy should feel confident and technical.

---

# 6. HERO INTERACTIVE SYSTEM DEMO

Immediately underneath the hero, include a small interactive visualization showing an end-to-end system.

Example:

```text
┌──────────────┐
│   Browser    │
└──────┬───────┘
       │
       │ HTTPS / WebSocket
       ▼
┌──────────────┐
│   API /      │
│ Realtime     │
└──────┬───────┘
       │
   ┌───┴────┐
   ▼        ▼
 Redis      DB
```

For a WebRTC path:

```text
Browser
   │
   ├── Signaling
   │
   ├── STUN / TURN
   │
   ▼
WebRTC
   │
   ▼
Media / SFU
```

The diagram should be interactive.

Clicking a component should reveal a tiny explanation.

Example:

**Redis**

"Fast ephemeral state, presence and coordination."

**WebSocket**

"Persistent bidirectional channel for realtime events."

**TURN**

"Relays traffic when direct peer connectivity fails."

The demo can use simulated data.

Clearly label simulated values as:

**SIMULATED**

---

# 7. SELECTED WORK

Create a major section:

**Selected Work**

Only show the strongest 3–5 projects.

Do not automatically dump every GitHub repository.

Each project should communicate:

1. What it is
2. What problem it solves
3. What I built
4. Technical architecture
5. Interesting engineering decisions
6. Challenges
7. Result / impact if known
8. GitHub/demo

Example:

```text
01

REAL-TIME COMMUNICATION

A browser-based communication system
built around WebRTC and realtime events.

React · TypeScript · WebRTC · Node.js · WebSockets

[Explore project]
```

When expanded:

```text
PROBLEM

...

ARCHITECTURE

...

ENGINEERING

...

CHALLENGES

...

WHAT I LEARNED

...
```

Never invent project metrics.

---

# 8. FULL-STACK ENGINEERING DEMOS

The portfolio must contain several **small inline interactive engineering demonstrations**.

These are not toys.

They exist to demonstrate technical thinking.

Every demo should take roughly 5–15 seconds to understand.

---

## DEMO A — Request lifecycle

Show:

```text
Client
  ↓
HTTP Request
  ↓
API
  ↓
Validation
  ↓
Service
  ↓
Cache
  ↓
Database
  ↓
Response
```

Allow the user to click through the pipeline.

Show a small panel explaining each stage.

Example:

```text
VALIDATION

Reject invalid input before
expensive downstream work.
```

---

## DEMO B — Realtime architecture

Show:

```text
Client A
   │
   │ WebSocket
   ▼
Realtime Server
   │
   ├── Redis
   │
   ├── Event Bus
   │
   ▼
Client B
```

Simulate events:

```text
12:41:03 user.joined
12:41:04 message.sent
12:41:05 typing.started
12:41:07 message.sent
```

Include:

**Pause / Resume**

and an event-rate control.

---

## DEMO C — WebRTC

Create an interactive WebRTC architecture visualization.

```text
Peer A
  │
  ├── ICE
  ├── STUN
  ├── TURN
  │
  ▼
Connection
  │
  ▼
Peer B
```

Allow toggling:

- Direct
- STUN
- TURN

Show simulated:

```text
Connection
Latency
Packet loss
Bitrate
```

Clearly label simulated values.

Clicking ICE/STUN/TURN should explain them briefly.

---

## DEMO D — Caching

Show:

```text
Client
  ↓
API
  ↓
┌────────────┐
│ Cache HIT? │
└─────┬──────┘
      │
  Yes │ No
      │
      ▼
   Database
```

Allow the user to trigger requests.

Show:

```text
Request #1
CACHE MISS
DB → 42ms

Request #2
CACHE HIT
Redis → 3ms
```

These values are simulated.

Clearly mark them as such.

The point is to demonstrate the concept, not claim benchmark results.

---

## DEMO E — AI streaming

Show an end-to-end AI request:

```text
Browser
   ↓
Backend
   ↓
LLM
   ↓
Streaming response
   ↓
Browser
```

Display text arriving progressively.

Show:

```text
TIME TO FIRST TOKEN
TOKENS RECEIVED
STREAM STATUS
```

Use mock responses unless an API is explicitly configured.

Do not expose API keys.

Structure the implementation so a real provider can be connected later.

---

## DEMO F — Failure & resilience

Create a tiny system reliability demo.

Controls:

```text
NETWORK

Excellent
Good
Poor
Offline
```

Changing the network condition should change:

- latency
- request status
- realtime connection
- retry behavior
- UI state

Demonstrate:

```text
Connected
    ↓
Network degraded
    ↓
Reconnecting...
    ↓
Recovered
```

This should emphasize that real-world engineering includes failure states.

---

# 9. SYSTEMS SECTION

Create a section:

# How I Think About Systems

Do not turn this into a list of buzzwords.

Show 4–6 engineering principles.

Examples:

### Design for failure

Networks fail. Services fail. Users refresh pages.

Systems should recover gracefully.

### Keep state intentional

Not every piece of state belongs in a database.

Not every state belongs in the client.

### Observe what matters

Latency, errors, throughput and connection health should be measurable.

### Complexity has a cost

Introduce infrastructure because the problem requires it, not because the architecture diagram looks impressive.

### Realtime changes the rules

Latency and connectivity become product concerns.

Each principle can have a small diagram or interactive example.

---

# 10. REAL-TIME / WEBRTC SECTION

Give this a prominent section.

Title:

**Real-Time Systems**

Subtitle:

**Where networking becomes part of the product.**

Show an interactive architecture:

```text
                    Signaling
                       │
                       ▼
Browser A ───────── WebRTC ───────── Browser B
     │                                   │
     │                                   │
     └────────────── SFU ────────────────┘
                       │
                    Media
```

Clickable components:

- Signaling
- ICE
- STUN
- TURN
- RTP
- RTCP
- SFU
- Simulcast
- SVC

Each click should open a concise technical explanation.

Do not create a textbook.

Make it feel like an engineer's interactive notebook.

---

# 11. AI LAB

Keep the AI Lab but reposition it.

Title:

**AI Lab**

Subtitle:

**Experiments at the intersection of AI, realtime systems and developer tooling.**

Categories:

### LLM

- local models
- structured output
- tool calling
- RAG
- evaluation

### Realtime AI

- streaming
- voice
- WebRTC
- agents
- multimodal interfaces

### Developer Tools

- coding tools
- automation
- local AI
- agent experiments

Each experiment should have:

```text
EXPERIMENTAL

TITLE

What I was trying to solve

Technologies

What happened

What I learned

[Demo] [Code]
```

Do not fabricate results.

If something is an unfinished experiment, say so.

That is okay.

---

# 12. AI LAB FEATURE DEMO

Make one AI experiment visually prominent.

Example:

```text
REALTIME AI

You:
Explain ICE in WebRTC.

AI:
ICE is a framework that helps two peers
discover a viable network path...

──────────────

TTFT        182ms
TOKENS      74
STREAM      ACTIVE
```

Below it:

```text
Input
 ↓
Backend
 ↓
LLM
 ↓
Streaming
 ↓
UI
```

The point is to demonstrate the engineering pipeline around AI, not merely make another chatbot.

---

# 13. BACKEND / SYSTEM DESIGN

Include a section demonstrating backend thinking.

Possible mini diagrams:

### Authentication

```text
Client
 ↓
Auth
 ↓
Token
 ↓
API
 ↓
Authorization
```

### Event-driven architecture

```text
API
 ↓
Event
 ↓
Queue
 ↓
Worker
 ↓
Database
```

### Observability

```text
Application
   ├── Logs
   ├── Metrics
   └── Traces
          ↓
     Monitoring
```

These should be concise.

Only include concepts I actually understand or have experience with.

---

# 14. EXPERIENCE

Create a clean experience section.

For each role:

```text
COMPANY
ROLE
DATES
```

Then 2–4 strong engineering bullets.

Prioritize:

- ownership
- architecture
- production systems
- scale
- reliability
- performance
- difficult technical problems
- collaboration

Avoid copying job descriptions.

Use real achievements only.

---

# 15. TECHNICAL STACK

Do NOT use a giant wall of logos.

Instead organize technologies:

```text
LANGUAGES
TypeScript · JavaScript

FRONTEND
React · ...

BACKEND
Node.js · ...

REALTIME
WebRTC · WebSockets · ...

DATA
...

AI
LLMs · ...

INFRASTRUCTURE
...
```

Only include technologies that are actually relevant.

No fake proficiency levels.

---

# 16. WRITING / ENGINEERING NOTES

Create a lightweight technical notes section.

Topics can include:

- WebRTC
- realtime systems
- frontend architecture
- backend architecture
- performance
- AI experiments
- debugging production issues
- lessons learned

Each entry:

```text
TITLE
DATE · READ TIME

Short description
```

Do not create fake articles.

Use real content where available.

---

# 17. GITHUB

Make GitHub an important destination.

Section:

**Code & Experiments**

Show selected repositories.

For each:

```text
Repository
Short description
Language
Status

[View code]
```

Prefer hand-selected projects.

Do not automatically display every repository.

---

# 18. ABOUT

Keep it concise.

Example structure:

```text
I'm a full-stack engineer focused on building
real-time products and the systems behind them.

I've spent 5+ years building production software,
with deep experience in WebRTC, browser systems,
realtime communication and modern web applications.

Currently exploring:

AI
Realtime AI
Developer tooling
Local models
```

Only use facts that are true.

---

# 19. CONTACT

Very simple.

```text
Have an interesting systems problem?

Let's talk.

[Email]
[LinkedIn]
[GitHub]
```

Do not create a contact form unless there is an actual backend.

---

# 20. MICRO-INTERACTIONS

The site should feel alive through technical interactions.

Examples:

- realtime event streams
- connection state transitions
- architecture nodes
- streaming text
- expandable system diagrams
- small charts
- terminal-like metadata
- subtle status indicators

Avoid decorative animation.

The rule:

> **If an animation doesn't communicate information, remove it.**

---

# 21. RESPONSIVENESS

Desktop should be excellent.

Mobile must also be excellent.

Complex diagrams should adapt instead of simply shrinking.

For mobile:

- stack architecture
- simplify diagrams
- preserve interaction
- avoid horizontal overflow
- maintain readable typography

---

# 22. ACCESSIBILITY

Support:

- semantic HTML
- keyboard navigation
- visible focus states
- accessible controls
- screen reader labels
- reduced motion
- sufficient contrast

Respect:

`prefers-reduced-motion`

---

# 23. PERFORMANCE

The portfolio itself should demonstrate good engineering.

Goals:

- fast first load
- minimal JavaScript
- lazy-load heavy interactive demos
- optimize assets
- avoid unnecessary dependencies
- avoid large animation frameworks unless justified
- avoid unnecessary client-side rendering

Interactive demos should be isolated so they don't make the entire website heavy.

---

# 24. SEO

Include:

- meaningful title
- description
- Open Graph metadata
- Twitter/X metadata
- canonical URL
- structured metadata where appropriate

Use semantic headings.

---

# 25. CODE QUALITY

The codebase should be something I would be comfortable showing during an interview.

Requirements:

- TypeScript
- clean component boundaries
- reusable components
- understandable folder structure
- no giant components
- no unnecessary abstractions
- no duplicated logic
- no magic numbers scattered throughout the code
- sensible naming
- comments only where they provide real value

Do not over-engineer a portfolio.

---

# 26. DATA / CONTENT ARCHITECTURE

Keep portfolio content separate from UI components where practical.

For example:

```text
content/
  projects
  experience
  writing
  ai-lab
```

This should allow me to update content without rewriting components.

---

# 27. HONESTY RULE

This is extremely important.

NEVER invent:

- companies
- projects
- clients
- users
- revenue
- performance metrics
- awards
- technologies
- job titles
- achievements
- benchmarks
- production scale

If information is missing:

```text
[CONTENT TO ADD]
```

is preferable to fabricated information.

For interactive demos, simulated values must be explicitly identified as:

**SIMULATED**

---

# 28. OVERALL USER EXPERIENCE

The recruiter journey should be:

### 0–5 seconds

"He's a full-stack engineer."

### 5–15 seconds

"Interesting — he specializes in realtime/WebRTC."

### 15–30 seconds

"He understands backend and system architecture too."

### 30–60 seconds

"These interactive demos actually demonstrate what he knows."

### 1–2 minutes

"He has serious production experience."

### Final impression

**"This is someone I'd interview."**

That is the goal.

---

# FINAL DESIGN PRINCIPLE

Do not try to impress the visitor with how much technology was used to build the portfolio.

Instead:

> **Use the portfolio to demonstrate how I think about engineering.**

The website itself should be the first example of my engineering taste:

**simple architecture, thoughtful interactions, good performance, clear communication, and technical depth.**