---
title: "I Built a Social Network Using Claude. Here's What Actually Happened."
description: "How a non-developer product marketer used Claude to architect Fintech Circle, a verified professional network for India's BFSI ecosystem. Covers the Bluesky codebase research, why Strapi over Supabase, why Postgres over wrappers, why Expo over bare React Native, and why vibe coding tools like Lovable fail for SEO-critical products."
pubDate: "2026-04-05T10:00:00"
categories: ["Fintech"]
tags: ["claude", "social-network", "strapi", "react-native", "expo", "postgres", "fintech", "bfsi", "ai"]
draft: false
---

I didn't set out to build a social network. I set out to fix a WhatsApp group.

For two years, I ran WTFraud, a community of 350+ fraud and risk practitioners across India's BFSI ecosystem. Lending heads, KYC product managers, compliance officers, fintech founders. The conversations were gold. The medium was garbage.

Someone asks a nuanced question about CKYC mismatch rates across vendors. Three practitioners reply with real implementation data. Forty-eight hours later, the entire thread is buried under memes, forwards, and "congratulations on the new role" messages. Gone. No search. No attribution. No way to find it again.

That gap became Fintech Circle. Claude is the reason it got built.

I should say this upfront: I'm not a developer. I'm a product marketer who's spent a decade in fintech. I can't write a React component from scratch. I've never deployed a server. Two years ago, the idea that I could ship a social network would have been absurd.

This is what actually happened.

---

## The real problem with professional communities in India

Three platforms dominate professional networking in India. All three fail for the same reason.

**WhatsApp groups** have the practitioners but no structure. You don't own the channel. You can't segment. You can't search. A question asked on Monday is invisible by Wednesday.

**LinkedIn** has the profiles but not the trust. It's bloated with employees, recruiters, and motivational posts from people who've never built anything. No founder verification. No way to know if the person giving you lending advice has actually closed a co-lending deal.

**Medial** has the product instinct but not the moat. Good UX, good streaks, good feed mechanics. But anyone can claim to be a founder. The trust layer is missing.

**Peerlist** comes closest to what I want. Proof-of-work profiles. Builder credibility. Professional reputation earned through contributions, not job titles. But it's horizontal. It serves all builders equally, which means it serves no vertical deeply. A fintech compliance officer and a frontend developer are treated identically. The domain context that makes BFSI recommendations trustworthy doesn't exist.

I'll be direct about this: Fintech Circle draws heavy inspiration from both Peerlist and Medial. Peerlist's proof-of-work profiles, contribution graphs, and builder-first identity model are genuinely good product decisions. Medial's streaks, clean feed, and mobile-first approach proved that Indian builders will adopt a new social platform if it solves a real problem. I studied both products deeply before designing Fintech Circle.

What I'm building isn't a competitor to either. It's the version that only works if you restrict it to one industry and add a verification layer that neither of them has. Peerlist for BFSI builders, with Medial's engagement mechanics, locked behind a verified identity that proves you actually work in this industry.

The insight that changed everything: the problem isn't features. It's trust. If every single member is a verified practitioner with a real identity, real role, and real company, the quality problem solves itself. You don't need aggressive moderation when everyone's reputation is on the line.

---

## The night I spent inside Bluesky's codebase

Before writing a single line of product spec, I wanted to understand how a modern social network actually works under the hood. Not from blog posts. From source code.

Bluesky is open source. I cloned the repo on a Friday evening and spent the weekend reading through it with Claude. Not to understand every line of TypeScript, but to understand the shape of the thing. What's big? What's small? Where does the complexity actually live?

The repo is 93.8% TypeScript, 1% Kotlin, 0.9% Swift. That ratio matters. A social network with millions of users runs on React Native with almost no native code. Bluesky uses Expo Modules API for exactly four native bridges: a custom UITextView for text selection, a translation module, a forked bottom sheet, a paste input for clipboard images. Everything else is TypeScript.

The thing that killed the "just fork Bluesky" idea: roughly 93% of their codebase is AT Protocol integration. DID resolution. Personal Data Servers. Relay infrastructure. Lexicons. Feed Generators. Labelers. A complete decentralized identity layer that took ex-Twitter engineers years to build.

I don't need decentralized identity. I need BPAN verification. I don't need a Relay. I need a Postgres database.

Forking Bluesky would mean ripping out the engine to keep the dashboard. Building fresh is faster.

**What I took was the library stack.** Not because these libraries are trendy. Because they're proven at scale by millions of daily users. Stability is a feature when you're building alone.

**FlashList** by Shopify: 10x faster list rendering than FlatList, component recycling, battle-tested across Shopify's own apps and Bluesky. **Reanimated 3**: gestures and animations on the native thread, not the JS bridge. **React Navigation** with react-native-screens: native transitions. **Expo Image** for fast caching.

These aren't exciting choices. They're boring choices that won't break at 3 AM when I have zero engineers on call.

That weekend taught me two things: what libraries to use, and what problems not to solve. Both saved months.

![Tech Stack Architecture](/mothi-blog/images/blog/fintech-circle-tech-stack.svg)

---

## The infrastructure philosophy: build for the stage you're at

Every builder blog talks about what they chose. Nobody talks about why they chose the smallest, cheapest, most boring version of it.

One principle governs every infrastructure decision I made: **don't build for the company you want to be. Build for the company you are today.**

Zero users. Zero revenue. Six weeks to get something live. Every rupee spent on infrastructure is a rupee not spent on the 239 seed questions, the 15 WTFraud moderators, or the verification API that makes this product different from every other social network.

The startup graveyard is full of products that scaled beautifully and launched never. I'd rather ship something ugly on a cheap stack this month than architect a perfect system I can't afford to finish.

That doesn't mean bad decisions. It means stage-appropriate decisions. The right answer for 500 users is different from the right answer for 50,000. And if I never reach 500, the 50,000 answer is irrelevant.

---

## Why Postgres, not Supabase

This will confuse people who follow the indie hacker playbook. Supabase is the default recommendation for solo founders. Built-in auth, realtime subscriptions, storage, edge functions, row-level security. All in one platform. I evaluated it seriously. I chose plain Postgres.

### What Supabase actually is

Supabase is Postgres with a managed layer on top: auth, realtime, storage, serverless functions. It's genuinely good. For a CRUD app or a dashboard, probably the fastest path to production.

But I'm already using Strapi. Strapi runs on Postgres. It manages the schema, the migrations, the API layer, the admin panel. Adding Supabase means two systems managing the same database. Two auth layers. Two API surfaces. Two sets of permissions. Two things that can break.

That's not simplicity. That's a coordination problem disguised as convenience.

### The frugality argument

Strapi on Railway with managed Postgres: $7/month to start. Scales to $20-30 as the database grows. I control the database. I can run queries, add indexes, optimize directly.

Supabase free tier is genuinely free but limited: 500MB storage, 2GB bandwidth, 1-week auto-pause for inactivity. The moment you need reliability (no auto-pause, daily backups, more storage), you're on Pro at $25/month. If I'm already running Strapi, that $25 pays for features I already have.

Every dollar saved on infrastructure is a dollar spent on the 1,000 PAN verifications at ₹5 each that actually make this product work.

### The lock-in argument

Supabase Edge Functions are Deno. Supabase Realtime is a proprietary WebSocket layer. Supabase Auth has its own session management. None of these are Postgres. They're Supabase-specific features that work beautifully inside Supabase and create migration pain if I ever need to leave.

Plain Postgres is Postgres everywhere. Railway, Render, Fly.io, Neon, a $5 VPS, or AWS RDS if I ever get to that scale. The data model moves with me. The application logic lives in Strapi and my frontend, not in a vendor's edge function runtime.

At my stage, this matters more than features. I can't afford to discover at Month 8 that my architecture is locked into a platform whose pricing doesn't work for my unit economics.

### What I actually use instead of Supabase's extras

| Supabase feature | What I use instead | Why |
|---|---|---|
| Auth | Strapi Auth plugin + Next-Auth | LinkedIn OAuth, phone OTP. Strapi handles user records. |
| Realtime | Socket.io or Ably (thin layer) | Only the feed and notification badge need real-time. That's 5% of the product. |
| Storage | Strapi Media Library + Cloudinary free tier | Image uploads, avatars. CDN-backed. |
| Edge Functions | Strapi custom routes + controllers | Verification logic, notification dispatch. Runs inside Strapi, not a separate runtime. |
| Row-Level Security | Strapi roles & permissions | Content-level access control through the admin panel. No SQL policies to debug. |

Is this more pieces? Yes. Is each piece the right tool for its specific job, at the right price for my stage? Also yes.

---

## Why Expo, not bare React Native

React Native has two modes: bare workflow and managed workflow (Expo). Most experienced developers use bare workflow for full control. I went with Expo.

### What bare React Native actually means

Bare React Native means managing Xcode, Android Studio, Gradle configurations, CocoaPods, code signing certificates, provisioning profiles, and native build toolchains for two platforms. For a developer who lives in this world, fine. For a product marketer who's never opened Xcode, it's a wall.

I don't need to climb that wall. I need to ship.

### What Expo gives me

Expo handles everything I don't want to think about:

**EAS Build**: App Store and Play Store builds from the command line. I never open Xcode. I never touch Android Studio. I run one command and get a signed binary ready for submission. For a solo non-developer, this is the difference between shipping this month and shipping never.

**OTA Updates**: Push code updates to live users without going through App Store review. Found a bug in the feed ranking? Fix it, push the update, users get it in minutes. No 24-hour App Store review cycle. At my stage, iteration speed is survival.

**Expo Push Notifications**: Unified API for both APNs (iOS) and FCM (Android). One API call sends to both platforms. No separate Firebase configuration. No certificate management. The notification system is the product's distribution engine. It needs to work reliably from Day 1.

**Expo SDK 55+**: Built on React Native's New Architecture (Fabric + JSI + TurboModules). Hermes engine for fast startup and low memory usage. 60fps performance. This isn't the old Expo that developers complained about. This is the same stack Bluesky runs on.

### What I give up (and why it doesn't matter yet)

Bare React Native gives you custom Swift components, custom Kotlin views, fine-grained control over the native build pipeline.

I need zero custom native modules for V1. Feed, profiles, search, streaks, notifications: all well-served by existing libraries. If V2 needs a native module, Expo Modules API lets me write Swift/Kotlin bridges without ejecting.

Don't solve problems you don't have yet. Expo handles 100% of V1. The moment it doesn't, I eject. But I'm betting that moment is six months away. By then I'll either have revenue to hire a developer or I'll know the product doesn't work.

---

## Why Strapi (and why the "headless CMS" label is misleading)

Strapi is a headless CMS. Everyone knows it's for blogs and marketing pages. Not social networks. Not real-time feeds. Not anything that looks like Bluesky.

I chose it anyway. The reason is operations, not engineering.

### The content problem nobody talks about

A social network is, at its core, a content management system with a social layer on top. Posts are content. Profiles are content. Answers, badges, notifications: all structured content with types, fields, relationships, and permissions.

Strapi lets me define posts, profiles, answers, and circles as structured content types with custom fields, relations, and validation. No SQL migrations. No ORM configuration. Define the shape of the data in the admin panel, Strapi generates the API. REST and GraphQL, both out of the box.

For a non-developer, this is the difference between "write database migrations" and "define what a post looks like." One of those I can do in an afternoon.

### The admin panel is the product (for operations)

Nobody tells you this about running a community platform: 60% of the work is moderation, content review, user verification, and operational tasks. Not engineering.

Strapi ships with an admin panel. Review flagged posts, ban users, approve verifications, edit Circle metadata, publish announcements. No code. Every CMS builder knows this. Social network builders somehow forget it and spend months building custom admin dashboards from scratch.

I don't have an engineering team. I have me, a laptop, and Claude. The admin panel isn't a nice-to-have. It's what lets me operate a community platform alone.

### Handling the real-time gap

When I told Claude I was considering Strapi, the first pushback was "no built-in realtime." Fair. But I asked a different question: "What percentage of my V1 features actually need real-time updates?"

The answer was one. The live feed. Everything else (profiles, search, notifications list, Circle pages, settings) is standard request-response. Optimistic UI on the client handles the perceived speed. A thin WebSocket layer (Socket.io, Ably free tier) alongside Strapi handles the 5% of the product that actually needs server-push.

At my stage, adding a $0/month Socket.io layer is a better decision than rebuilding my entire backend around a real-time-first platform for one feature.

### The SEO argument (this is the real killer)

This is where Strapi stops being "acceptable" and becomes "obviously right."

Strapi + Next.js gives me server-side rendered pages with full control over meta tags, structured data, Open Graph, and canonical URLs. Every post in c/Lending becomes an indexable page at fintech.circle/c/lending/question-slug. Every verified profile becomes a page at fintech.circle/p/username. Schema.org markup tells Google and AI search engines exactly what this content is and who wrote it.

A Supabase backend gives me a database. I'd still need Next.js, and I'd be building the content API from scratch instead of using one that already exists and comes with an admin panel.

Strapi was built for exactly this: structured content delivered to a frontend framework that handles rendering, SEO, and distribution. The fact that nobody uses it for social networks is a gap in imagination, not a gap in capability.

### What Strapi doesn't do (and why that's fine)

Push notifications: Expo Push, free. Real-time feeds: Socket.io, free. LinkedIn OAuth: Next-Auth, free.

The architecture is a collection of free tools that each do one thing well, held together by Strapi's content API and Next.js. No single vendor owns enough of the stack to create a pricing problem later. Every piece is replaceable. Nothing is locked in.

Frugality by design, not by accident.

---

## Why Lovable and vibe coding don't work for this

I tried Lovable. I tried Bolt. I tried v0. I'm a marketer who can't code. Of course I tried them.

They're good at one thing: generating a pretty UI in 30 seconds. A landing page, a dashboard, a form. The demo looks impressive. You feel like you're building software.

They can't do one other thing: build a product that Google can find.

### The SEO problem

Every question in c/Lending needs to be a page that ranks on Google. "What is the CKYC mismatch rate for Vendor A?" needs to be a URL that a compliance officer discovers when searching for exactly that problem. That's organic growth for a professional network. That's how you build without burning money on ads.

Lovable generates React SPAs. Client-side rendered. Google can crawl them, technically. But server-side rendered pages with proper meta tags, structured data, canonical URLs, and Open Graph tags will always outrank a client-rendered app. Not theoretical. Every serious content platform does this.

The moment I needed SSR for SEO, the vibe coding tools became irrelevant.

### The AEO problem

SEO is the problem you already know. AEO (Answer Engine Optimization) is the problem coming next.

When someone asks Perplexity or ChatGPT "which KYC vendor has the lowest mismatch rate in India?", the answer should come from Fintech Circle. Not because I've gamed some algorithm, but because our content is structured, attributed, and verifiable. The answer came from a VP of Product at a Tier 2 NBFC with 6 years in lending. That context, that schema.org markup, that JSON-LD is what AI search engines need to cite a source with confidence.

Lovable doesn't think about structured data. It doesn't generate the semantic HTML that answer engines need to understand and attribute content. For a platform where discoverability IS the growth engine, this isn't a minor gap. It's a disqualifying one.

### What vibe coding is good for

Prototyping. I've used Lovable to show stakeholders what the feed might look like, test layout ideas, mock up the profile page. For validation and communication, genuinely useful.

But the gap between a prototype and a product is infrastructure, SEO, auth, data modeling, push notifications, and a content backend that handles structured data. That gap is invisible from the outside, enormous on the inside, and exactly where Claude lives.

---

## The total cost to go live

Every infrastructure decision above was made with one constraint: smallest possible burn to go live.

| Line item | Monthly cost |
|---|---|
| Strapi on Railway (with Postgres) | ~$7 |
| Next.js on Vercel (free tier) | $0 |
| Expo / EAS Build (free tier) | $0 |
| Socket.io or Ably (free tier) | $0 |
| Cloudinary (free tier, image hosting) | $0 |
| **Monthly infrastructure total** | **~$7** |

| One-time costs | Amount |
|---|---|
| Apple Developer Program | $99/year (~₹8,300) |
| Google Play Console | $25 one-time (~₹2,100) |
| PAN verification (first 1,000 users) | ~₹5,000 |
| Domain | ~₹1,000 |
| **Total to go live** | **Under ₹20,000** |

Under twenty thousand rupees. A verified social network on Android, iOS, and web. Server-side rendering. Push notifications. Real-time feed. Admin panel for moderation. PAN-based identity verification.

No Supabase Pro at $25/month. No Firebase Blaze plan. No AWS bill that surprises you in Month 3. Every tool is free-tier or single-digit dollars. Every tool is replaceable without rewriting the application.

If I hit 10,000 MAU, I'll happily pay $200/month for upgrades. But I'll earn the right to spend that money by proving the product works at $7/month first.

---

## Overcoming the coding dependency

The fear before starting: complete dependence on a developer. Write a spec, hand it off, wait weeks, realize it's wrong, repeat. The classic non-technical founder trap.

Claude changed the equation. Not by replacing a developer, but by making me a competent technical decision-maker.

### What that looks like in practice

I can't write a Strapi controller. But I can tell Claude: "I need a verification flow that takes a Business PAN, hits the Surepass API, cross-references against MCA21 director records, returns verified or unverified. Never store raw PAN. Hash for dedup only." Claude writes the function. I read it. I understand the logic even if I can't write the syntax. I catch edge cases because I know the domain.

I can't configure database permissions. But I can say: "Users see only their own notifications. Posts visible to everyone. Follow relationships editable only by the follower." Claude translates that into Strapi's role-based permissions. The logic is mine. The implementation is Claude's.

The skill that matters isn't coding. It's knowing what to ask for, knowing when the output is wrong, and knowing the domain well enough to catch mistakes a generic developer wouldn't.

### The real dependency shift

Old model: non-technical founder depends on developer. Communication overhead. Misalignment. Slow iteration.

New model: founder describes the system in plain English with domain expertise. Claude translates to architecture, schema, code. Founder reviews, pushes back, iterates. Feedback loop measured in minutes, not weeks.

I'm still going to hire developers. Claude doesn't replace an engineering team for production. But it replaced the three months of back-and-forth with a freelancer to get the spec right. By the time a developer touches this project, the architecture is locked, the schema is designed, the edge cases are documented, and every module has a reference doc explaining exactly what it does and why.

Claude doesn't make you a developer. It makes you a founder who speaks engineering fluently enough to build the right thing on the cheapest possible stack.

---

## V1 spec: the most painful decisions I've made

The full vision had 12 interconnected modules. Trust graphs, reputation algorithms, marketplace commission flows, deal intelligence matching, collaborative articles, six different streak types.

Claude helped me build all of it out in detail. 1,700 lines of product design architecture. 1,100 lines of developer reference. Revenue models, notification cascades, badge systems.

Then I had to throw 80% of it away for V1.

The governing principle came from a line I kept coming back to in the Chamath and Andrew Chen frameworks: "The vision is correct. The sequence is the product."

The same philosophy that drove the infrastructure decisions drove the feature decisions. Don't build for 50,000 users when you have zero. Build the minimum that creates the magic moment for the first 500.

### What made it into V1

Four features. Not twelve. Not six. Four.

**1. Circle Q&A (c/Lending only)**

One Circle. Not eight. One. The first Circle is c/Lending because WTFraud has 350+ fraud and KYC practitioners who are adjacent to lending. They are the seed community for answers. They are the hard side.

Andrew Chen's density rule: a thin network across 6 Circles is 6 dead products. A dense network in 1 Circle is 1 living product. c/KYC opens only after c/Lending crosses 200 active members AND 300 posts.

Infrastructure note: one Strapi content type for posts, one for answers, one relation. The content model for a single Circle is trivially simple. The complexity of multi-Circle routing, moderation workflows, and cross-Circle discovery stays in the spec doc until I've earned the right to build it.

**2. Verified Identity Profile**

LinkedIn OAuth + phone OTP. Every post, every answer, every upvote is identity-linked from Day 1. The profile page at fintech.circle/p/username goes live immediately. Server-side rendered by Next.js. Indexable. Shareable. Open Graph image auto-generated.

The SEO play: founders share their verified profile link on LinkedIn, email signatures, pitch decks. Every shared profile is a free install campaign. That only works if the page renders on the server with proper meta tags. A client-side SPA can't do this. SSR isn't a nice-to-have. It's the organic acquisition engine.

**3. Responder Streak (only)**

One streak type. Not six. The Responder Streak: answer at least one question per calendar day. This is the only streak that directly drives the North Star metric (helpful marks).

Implementation: one integer field on the user profile. One cron job checking last activity date. One push notification. The streak is a product feature that costs effectively nothing to build and maintain. That's the kind of feature a $7/month infrastructure can support forever.

**4. Day-2 Notification**

The named-person notification that creates the return visit. "Anand Krishnan (Risk Practitioner, HDFC) read your answer and viewed your profile." Tap opens their profile.

Without this, Month 1 retention is organic only. With this, every profile view becomes a re-engagement trigger. Expo Push sends it for free. Strapi's webhook fires on profile view insert. The entire pipeline costs nothing.

### What did NOT make V1

This list was harder to write than the features list:

- No Launchpad (needs 200 active members first)
- No groups or subreddits beyond c/Lending
- No DMs or inbox (founders have WhatsApp for 1:1)
- No events or RSVP
- No marketplace booking widget
- No deal intelligence
- No articles or long-form
- No post streak, launch streak, or build-in-public streak

Every time I wanted to add something, two filters applied. First, Claude's product filter: "Does this feature create the magic moment for any user type in Month 1?" Second, my infrastructure filter: "Does this require upgrading anything beyond the $7/month stack?"

If either answer was no, it stayed on the v2 list.

![V1 Scope Decision](/mothi-blog/images/blog/fintech-circle-v1-scope.svg)

---

## The LLM survival test (the question that changed everything)

V1 of the vision was a six-pillar platform: Reddit-style Circles, ProductHunt-style Launchpad, Peerlist-style profiles, G2-style marketplace, jobs board, and deal intelligence. Ambitious. Comprehensive. Also, mostly commoditizable by any well-prompted LLM.

I was deep in a Claude conversation about the product architecture when it asked me something that stopped me cold: "How does this survive when ChatGPT can answer any BFSI question for free?"

I didn't have an answer.

ChatGPT can answer "What is CKYC?" Perplexity can summarize RBI circulars. Gemini can explain co-lending structures. If I build a platform that stores public information and surfaces it on request, I'm building a product with a 24-month shelf life.

That conversation ran ninety minutes. I kept pushing: "What breaks this in 3 years?" It produced the constraint that now governs every product decision: **every page and every interaction must either monetize or build a proprietary data moat that LLMs cannot replicate.**

What LLMs cannot do:
- Verify that the person answering your CKYC question actually closed 12 co-lending deals
- Tell you which compliance consultant in Mumbai cleared 3 RBI audits this year and has capacity next month
- Show you 47 verified reviews from real founders about their actual settlement times with a payment gateway
- Surface the anonymous benchmark from 8 verified lending PMs showing actual CKYC mismatch rates by vendor

The moat is verified identity + peer-attested reputation + closed-loop transaction data. None of this exists in public training data. All of it compounds with every interaction on the platform.

And the beautiful thing: this moat runs on a $7/month Postgres database. The data that makes LLMs irrelevant doesn't require expensive infrastructure. It requires the right product decisions.

![Data Moat Architecture](/mothi-blog/images/blog/fintech-circle-data-moat.svg)

---

## The WTFraud advantage (why this isn't a cold start)

Most social networks die in the first 60 days. The cold start problem: you need content to attract users, you need users to create content. Standard playbook: seed content, fake activity, hope for organic traction.

I don't have that problem.

WTFraud has 350+ practitioners already talking to each other every day. Already asking questions, sharing implementation details, debating vendor tradeoffs. The content exists. The community exists. The medium is the bottleneck, not the demand.

I went through five WhatsApp group transcripts (WTFraud, IFF, IITians in Fintech, FinPro, Digital Fifth) and mapped 239 real questions practitioners had actually asked. Not synthetic content. Real questions from real people with real problems. Pre-sorted by category. Ready to seed c/Lending on Day 1.

The seeding play: 15-20 verified practitioners from WTFraud who've agreed to actively mark answers as "Helpful." Their job in Month 1 isn't asking questions. It's validating good answers. This single manual action creates the magic moment for every new practitioner who joins and answers something.

Two years of running a WhatsApp group taught me who the credible people are, what motivates them, what they need to feel valued. No AI tool gives you that. Earned context. Cost nothing except time and attention.

![The Flywheel](/mothi-blog/images/blog/fintech-circle-flywheel.svg)

---

## What Claude actually did

"I built it with AI" has become meaningless. Let me be specific.

**Product vision**: I wrote messy notes. Claude stress-tested them, asked hard questions, structured the output. Three major versions. The V3 "monetize or moat" framework came from a conversation where I couldn't explain why Perplexity wouldn't kill my product.

**Infrastructure decisions**: Claude's default answer was Supabase. I pushed back: "I'm already using Strapi. Why add a second backend?" Three conversations later, I had the Postgres-direct architecture. Claude doesn't always give you the right answer first. It gives you the right answer when you argue with it.

**The Bluesky deep-dive**: I pasted directory listings, package.json files, specific components. Claude explained what each piece did, why AT Protocol was irrelevant, which libraries were stable enough to adopt.

**Content modeling**: Strapi content types designed by Claude. Started with 5, expanded to 25+ for the full v2 vision. Role-based permissions, webhook configurations, real-time layer architecture.

**12-module architecture**: 1,100 lines of developer reference, built in conversation. Specific data models, edge cases, interaction patterns. This document lets me hand the project to a developer and say "build this" without months of alignment.

**Testing**: The Salaar testing agent. 258 API tests. I described behavior. Claude wrote tests.

What Claude did not do: talk to WTFraud members. Validate the market. Build the relationships that make the seed launch possible. Make the strategic bet that BFSI verification is the moat worth building. Those required two years of running a community and noticing what people actually struggled with.

The tool is the accelerant. The insight comes from the practitioner.

---

## Three metrics that matter in Month 1

Measure only these three. Any other metric is noise.

**1. North Star: % of new users who receive a Helpful mark within 48 hours**

Target: 20%+. This measures whether the hard side (answerers) is dense enough to create value for the easy side (askers). Under 15% means the seed community is too thin. Over 30% means it was seeded correctly.

**2. Day-7 retention by activation state**

Track two cohorts: users who answered at least 1 question in Session 1 vs those who didn't. Target: activated cohort retention = 2x non-activated cohort. This validates the magic moment hypothesis.

**3. Hard side density: answers per question per 24 hours**

For c/Lending: target 2.5 answers per question within 24 hours. Under 1 means the hard side is too thin. Over 4 means quality may be diluting.

All three metrics run on queries against the same Postgres database. No analytics platform needed for Month 1. No Mixpanel. No Amplitude. A SQL query run manually every Monday tells me everything I need to know.

Frugality applies to measurement too.

---

## What I'd tell someone building a social network today

**Start with the community you already have.** Two years inside WTFraud before writing a single product spec. The community taught me what to build. The product is the container, not the content.

**Vibe coding tools are prototyping tools.** Lovable generates a beautiful feed UI in 30 seconds. It cannot generate the SSR layer, structured data, auth flow, or SEO architecture that makes that feed discoverable. A demo is not a product.

**$7/month infrastructure is a discipline, not a compromise.** Every dollar not spent on infra is a dollar spent on the community operations that determine whether your product survives.

**Use Claude for the thinking, not the typing.** The most valuable conversations were the ones where Claude told me my idea was incomplete. Push for honesty over validation.

**You don't need to code. You need to think in systems.** I can describe a notification cascade that triggers 3 downstream events from a single action. Claude translates that. The domain expertise is the hard part. Syntax is the easy part.

**Choose Postgres.** Not Supabase. Not Firebase. Not MongoDB. Postgres. Free, everywhere, runs everything, and it'll still be the right answer when everything else on this list has been deprecated. Strapi, Supabase, Hasura, Directus: they all run on Postgres underneath. Skip the wrapper. Own the data.

**Build what LLMs can't replicate.** The moat runs on a $7/month database. Data that makes LLMs irrelevant doesn't require expensive infrastructure. It requires the right product decisions.

---

## Where this goes from here

Month 1 success criteria: c/Lending has 200 active members, 300+ posts, 40%+ Day-7 retention, and 20%+ of new users receive a Helpful mark within 48 hours. If yes, open c/KYC and build Launchpad. If no, debug the activation path. Don't open new Circles into a vacuum.

The hardest metric to fake is the North Star. If 20% of new users aren't getting a Helpful mark in 48 hours, nothing else matters.

The product is the sequence. The vision is the destination. Claude helped me see the difference. And Postgres, the 28-year-old database that everyone takes for granted, is the foundation that made it possible for a marketer to build what usually takes an engineering team.

Total cost: ₹20,000 and a lot of Claude conversations.

---

*Fintech Circle is in pre-build. If you're a BFSI practitioner, founder, or service provider interested in early access, reach out on [LinkedIn](https://linkedin.com/in/mothivenkatesh) or [mothi.work](https://mothi.work).*
