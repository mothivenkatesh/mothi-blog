---
title: "What India’s Bank-tech Stack Want in 2026"
description: "The Anxiety of the OTP I was at a chai shop in Bangalore yesterday. A student from christ bought a cigarette, scanned the QR code, and then—for 5 agonizing seconds—stared at his phone. In those 5 seco"
pubDate: "2025-12-27T23:06:31"
categories: ["Indian Fintech"]
tags: []
heroImage: ""
draft: false
---

**The Anxiety of the OTP**

I was at a chai shop in Bangalore yesterday. A student from christ bought a cigarette, scanned the QR code, and then—for 5 agonizing seconds—stared at his phone.

In those 5 seconds, nobody breathed. We were all waiting for the blue tick.

That anxiety? That is the **Trust Deficit** of a billion people.

We built the world’s fastest payment highway (UPI), but we drive on it fearing the engine might explode.

**The Friday Night Nightmare**  
It gets worse. At 11 PM on a Friday, while that student sleeps, a fraud ring in Jamtara activates 200 "**sleeper** " accounts. They move ₹50,000 every 3 seconds.

By the time the bank’s Risk Head opens his Dashboard on Monday morning, the money is gone.

This is the paradox of 2024: **We have a Ferrari frontend running on a Bullock Cart backend.**

Here is my **7-Layer Thesis** they are desperate to buy.

## 1\. The "Lego" Core: Solving the Docking Problem

For decades, the Core Banking System (CBS) was like an old ancestral home. Solid, reliable, but if you wanted to move a window, you had to break down the entire wall. If a bank wanted to launch a "**Student Lifestyle Account** " with Netflix bundled in, it took 6 months… to add a single subscription button.

In 2026, banks are done with concrete. They want **Legos**.

**The "Docking Station" Mental Model**  
Munish Mittal frames this perfectly: _"**It 's like a space station. You launch a rocket (your fintech product), but it has to go dock somewhere.**"_

Most startups pitch the rocket—the shiny feature—without bringing the docking blueprint. They don't know the latitude (Tech Stack) or longitude (Compliance) of the bank's station. In 2026, if you don't bring the blueprint, you don't land.

The future isn't "replacing" Finacle. It is **" hollowing it out."** Banks will keep the legacy ledger for stability but surround it with **Microservices**. They want to swap out a "**Lending Module** " without touching the "**Deposit Module**." Remember, even HDFC didn't start with a giant Oracle suite; they started with a startup called CITIL. The cycle is repeating. Banks are peeling off the monolith "component by component."

## 2\. The "Vendor Detox": The Two-Boat Strategy

The era of _"**There 's an API for that**"_ has collapsed into _"**Please, no more APIs.** "_

![Vendor Consolidation in Tier-1 Indian Banks \(2024-2026\)](/images/blog/Vendor-Consolidation-in-Tier-1-Indian-Banks-2024-2026-scaled.png)

A typical Tier-1 bank today runs 20-30 different vendors for KYC, AML, and fraud. It is a middleware spaghetti that breaks every Diwali sale.

An industry veteran told me, _"**Decisions stall at CTO gates unless connectors are pre-certified.** "_ Every new vendor brings a 6-month InfoSec audit. The cost of "**trying** " a new product has become too high.

Banks are moving to a **" Two-Boat Strategy"**:

  1. **The Aircraft Carrier (Big Tech):** They will use AWS/Azure/Google for the heavy lifting. This includes LLM compute, massive data lakes, and core infrastructure reliability. No bank wants to build its own data center anymore; they want the "Aircraft Carrier" reliability of Big Tech.
  2. **The Speed Boat (bundles that actually ship):** They will pick 5-7 strategic partners for speed. They won't buy an OCR tool from Vendor A and a Face Match tool from Vendor B. They want an **Onboarding OS** that handles the entire stack. They need a "Speed Boat" that is agile enough to build the latest features (like Video KYC) but robust enough to dock into the Aircraft Carrier. If you are selling a point solution, you are just noise. In India, Cashfree is the closest to this "switch‑in‑a‑box" reality today — one rail handling UPI switching, cards tokenization, netbanking, wallets, challans, payouts, and cross-border collections. It's not 10 vendors. It's one scalable dock.



![Cashfree for Indian Banks](/images/blog/Casshfree-for-Indian-Banks-scaled.png)

## 3\. The "Unified Cart": The Amazon-ification of Liabilities

Last month a branch manager in Bengaluru told me a story. A salaried customer walked in for a simple salary account. By the time the forms were done, the manager knew he could easily sell a credit card too. But the moment he mentioned "second KYC" the customer flinched. "Can we do that some other time?" he asked. He never came back.

Why is opening a savings account and getting a credit card still treated like 2 different administrative lifetimes?

Right now, "Onboarding" is a commodity. Every bank has it. But almost no bank has a **Unified Journey**. A customer opens a savings account (Journey A). Then they want a credit card (Journey B). They have to do KYC twice because the systems don't talk. **40% of customers drop off** here.

**Multi-Product Onboarding** is the new quiet distribution superpower. The 2026 stack solves this with an **" Add-to-Cart"** model. A user selects "**Savings + Credit Card + Forex,** " and the system runs a single, unified KYC flow. This isn't just UX; it is how the Branch Manager hits his cross-sell targets. The distribution team controls the budget, and they don't care about "**Digital Transformation** "—they care about selling more products per customer.

The stack that enables this "**Unified Cart** " wins the budget. And it’s not just domestic liabilities. When an SME opens a Current Account, they want to sell globally on Day 1. A "Unified Cart" also means **global by default**. The bank doesn’t build a new FX desk; they just flip a "Global" toggle to let an IPG partner handle cross‑border collection, FX rules, and FIRC paperwork in the background.

## 4\. The "Anti-Mule" Layer: From Identity to Intent

Here lies the biggest failure of the modern stack. As I argued in [_Why Indian Banks are Losing the War Against Money Mules_](<https://mothi.work/why-indian-banks-are-losing-the-war-against-money-mules/>), we are fighting network crimes with individual KYC checks.

![Money Mules in Indian Banking-tech](/images/blog/Money-Mules-in-Indian-Banking-tech-scaled.png)

An IT head put it bluntly: _"**Nobody believes in photos. Everyone believes in Data.** "_

**Identity is Solved; Intent is the Problem.** The 2026 stack moves from [Grid-based checks](<https://mothi.work/graph-vs-grid-designing-a-real-time-mule-defense/>) (Is this ID valid?) to [Graph-based defense](<https://mothi.work/graph-vs-grid-designing-a-real-time-mule-defense/>).

  * "Is this device linked to 50 other accounts?"
  * "Did the money move in a circular flow?"
  * "Is this 'Student' suddenly transacting like a High Net Worth Individual?"



Banks need an **always-on engine** watching the graph through the "Weekend Gap" while the humans are sleeping. The fraud doesn't stop on Friday night; neither should the shield. This graph defense extends to government payments too. When a user pays a **Challan** or tax, the system should instantly check if the source account is flagged in a shared **" blacklist registry"** that sits across acquirers, not buried inside one gateway’s logs.

## 5\. The "Card" Factory: Outsourcing the Plumbing

_The unsexy plumbing of high-margin products._

Banks love Credit Cards (high margin), but they hate the operational hell of PCI-DSS compliance, plastic dispatch, and PIN management. It is heavy lifting with zero strategic differentiation.

**Card-Stack-as-a-Service.** Banks will own the **Customer Relationship** and the **Credit Risk** , but they will outsource the "**Plumbing** " to TSPs. The winner will be the one who makes card issuance as API-driven as sending an email. The bank doesn't want to be a logistics company delivering plastic; they want to be a financial institution managing credit. The bank owns the credit risk; the partner owns the rails. This includes the unsexy but critical layer of **Device Tokenization** and **3DS redundancy**.

Instead of the bank building direct pipes to Visa/Mastercard for every token request, they use a partner (like Cashfree’s Token Vault) to handle the **cryptogram generation and lifecycle management** invisibly. It boosts success rates by 5% without the bank writing a single line of crypto code.

## 6\. The "Agentic" Brain: Beyond the Bureau

To win "**Credit on UPI,** " you cannot have human underwriters. The [Maker-Checker model](<https://mothi.work/why-maker-checker-underwriting-fails-in-digital-lending/>) is fundamentally broken for high-velocity lending. It was designed for a world of paper files, not QR codes.

**Forensic AI & The Digital RM. **We are moving from [Systems of Record to Systems of Action](<https://mothi.work/moving-from-systems-of-record-to-systems-of-action-in-credit-risk/>). The 2026 stack needs an engine that ingests Bank Statements + GST + Bureau data and outputs a **Decision** in <2 minutes. It must go [Beyond the Bureau](<https://mothi.work/beyond-the-bureau-how-real-time-signals-fix-credit-risk/>), using real-time cash flow signals instead of 30-day-old CIBIL scores. Furthermore, as Munish Mittal predicts, the **" Digital RM"** will replace the call center. Current "**Virtual RMs** " are just call center agents reading scripts.

The 2026 want is an autonomous AI agent that **knows your credit history, predicts your next need, and closes the sale without a human loop**. It is the fusion of "**Service** " and "**Sales** " into a single, intelligent layer.

## 7\. The "Consent" Vault: The Privacy Firewall

_The headache nobody wants to talk about._

With the DPDP Act, handling user consent (RTIs, data deletion requests) has become a legal minefield. Banks are facing **500+ daily RTIs** per API. The legal risk of mishandling a single "**Delete My Data** " request is massive.

![DPDP Consent Vault for Indian Banking-tech](/images/blog/DPDP-Consent-Vault-for-Indian-Banks-scaled.png)

**The Consent Orchestration Layer.** Banks need a "Privacy Firewall" that automatically handles consent logging, data purging, and retrieval requests. If a customer revokes consent, this layer ensures the data is wiped across _all_ internal systems (**Core, CRM, Marketing**). Right now, this is a manual, risky mess; in 2026, it will be automated infrastructure. It is the boring, unsexy layer that keeps the CEO out of jail.

### **The Final Observation**

In India, a bank isn’t just a place to park money, it’s where the state, the employer, and the family all meet. We often forget that a bank account in India isn't just a financial product. It is a certificate of existence. It is how you receive your subsidy, how you pay your rent, how you prove you are a citizen.

In 2020, the goal was **" Digital Banking"**—putting the branch on the phone.  
In 2026, the goal is **" Invisible Banking"**—making the bank disappear into the workflow.

The CIOs I speak to aren't looking for more features. They are looking for peace of mind. They want to dock the rocket, secure the perimeter, and finally, _finally_ sleep through Friday night.

> P.S. If you are a CIO staring at a monolithic core, or a founder building a speed boat, drop me a DM. I’m collecting more "War Stories" from the basement for Part 2.
