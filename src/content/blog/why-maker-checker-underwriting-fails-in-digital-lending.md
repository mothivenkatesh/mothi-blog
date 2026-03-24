---
title: "Why Maker-Checker Underwriting Fails in Digital Lending (And How to Fix It)"
description: "It was the week before Diwali in Nagpur. The auto parts shop in Sitabuldi market was chaotic. Mechanics were shouting orders, inventory was flying off the shelves, and the owner knew one thing: if he "
pubDate: "2025-12-21T17:23:53"
categories: ["Indian Fintech"]
tags: []
heroImage: ""
draft: false
---

**It was the week before Diwali in Nagpur.**

The auto parts shop in Sitabuldi market was chaotic. Mechanics were shouting orders, inventory was flying off the shelves, and the owner knew one thing: if he didn’t restock by Friday, he would miss the biggest festive surge of the year.

He didn’t have time to visit a bank branch. He didn’t have time to print 6 months of bank statements. He pulled out his phone, opened a lending app, and applied for ₹5 Lakhs.

**On the surface, everything looked perfect.**  
His CIBIL score was 720. His PAN and Aadhaar matched instantly via NSDL and UIDAI. His GST returns showed a healthy turnover.

The system gave him an **in-principle approval in 90 seconds.** The screen flashed green: _" Congratulations! Your loan is approved."_

But inside the lender’s office in Bangalore, the loan didn't move. It hit the "Manual Review Queue."

Seven days later, the money finally hit his account. But by then, the owner had already sourced cash from a local moneylender at 3% monthly interest because he couldn't wait. He took the fintech loan anyway, siphoned it to pay off the moneylender, and then ghosted the fintech.

**He defaulted on the very first EMI.**

The fintech’s Risk PM looked at the post-mortem report. The Maker had approved it. The Checker had paused it. The Auditor had rejected it. Three people spent 45 minutes debating a file that the algorithm said was fine.

**This is the Conviction Gap.** And it is quietly killing the unit economics of India’s digital lending boom.

* * *

## The Daily Hell of a Tier-2 Underwriter

To understand why this happens, you have to stop looking at API documentation and start looking at the Operations floor.

I recently spoke to an underwriter in Dindigul who works for a mid-sized NBFC. Let’s call him Karthik. Karthik’s job is to protect the company’s balance sheet. But his reality is very different.

**8:00 AM:** Karthik logs in. His dashboard shows 50 new files from the overnight queue. These are "Digital MSME" loans.

**8:15 AM:** He opens the first file. It’s a "System Approved" case. But company policy says any loan above ₹2 Lakhs needs a "Maker-Checker" sign-off.

  * **The Maker (Karthik)** looks at the bureau report. "CIBIL 720. Looks good." He hits Approve.
  * **The Checker (His Manager)** gets the file 2 hours later. He sees a slight dip in the bank balance in September. "Why is this low? Call the customer." He hits Pause.
  * **The Field Team** gets a ticket. They call the customer. The customer is busy in his shop and doesn't pick up.
  * **The Auditor** reviews the file the next day. "No verification call log? Rejected."



**The Math of Manual Failure**

Karthik can realistically process about **15 files a day** if he does his job properly. But the marketing team just launched a "Diwali Bonanza" campaign, and 500 files are hitting the system daily.

The backlog explodes. The Turnaround Time (TAT) stretches from "Instant" to 48 hours. The customers who actually need the money (and can pay it back) delete the app. The fraudsters, who are patient, wait for the money and then vanish.

Karthik isn't bad at his job. The system is set up to fail him.

* * *

## How "90s Speed" Broke a 1990s Model

We are trying to secure a Formula 1 track with a parking lot guard.

The **Maker-Checker model** was invented for the branch banking era. In 2015, a loan officer would sit across the table from the borrower. They would drink tea. They would look at original documents. The "Checker" was the Branch Manager who trusted the officer’s judgment.

That process took 7 days. And it worked, because the volume was low and the human context was high.

**Fintech flipped the script.**

We solved **Access**. We built APIs that can onboard a customer in 2 minutes. We use OTPs for consent, Account Aggregators for bank statements, and UPI for repayment mandates.

But we didn't change the **Decision Architecture**.

We built a Ferrari engine (User Acquisition) and attached it to a bullock cart (Underwriting). When you push 10,000 leads through a manual Maker-Checker funnel, two things happen:

  1. **The False Positives:** You reject good customers because the underwriter didn't have time to understand their cash flow volatility.
  2. **The False Negatives:** You approve fraudsters because they know exactly how to "groom" their profile to look perfect on paper (Clean CIBIL, Clean Bank Statement, Fake Identity).



The "Nagpur File" didn't fail because of a lack of data. It failed because the decision was made on **static, historical data** (Bureau) instead of **live, behavioral signals**.

* * *

## The Unit Economics of Trust

Let’s look at the P&L impact of the Conviction Gap. This is the math that keeps Lending Heads awake at night.

Every time a file hits the manual queue, you incur a **Verification Burn**.

  * **Bureau Pull:** ₹25
  * **Bank Statement Parsing:** ₹15
  * **Field Verification Visit:** ₹75 - ₹150
  * **Underwriter Salary (Time/File):** ₹50



**Total Cost per Decision: ~₹200+**

If you are lending ₹50 Lakhs, spending ₹200 to verify it is a rounding error. But if you are lending ₹50,000 (the sweet spot for sachetized MSME credit), that ₹200 is eating into your margin before the loan is even disbursed.

And if that loan defaults on Day 7? You haven't just lost the Principal. You’ve lost the **CAC** (Customer Acquisition Cost), the **Ops Cost** , and the **Opportunity Cost** of lending to a good user.

**Desperate Band-Aids**

Most Risk PMs try to solve this by adding _more_ checks.

  * "Let's add a second checker for New-to-Credit (NTC) files." (Increases TAT).
  * "Let's buy alternate data from Telcos." (Increases Cost).
  * "Let's stricter the CIBIL cut-off." (Reduces TAM).



These are band-aids on a broken bone. You cannot scale manual conviction.

* * *

## The Bureau + Manual = The Credit Gap

Here is the uncomfortable truth: **CRIF is perfect for telling you what happened 90 days ago.**

If a borrower stops paying their EMI today, it won't show up on their Bureau report as a "Default" for another 3 months (90 DPD). By the time the Bureau warns you, the borrower has already busted out.

In the Nagpur case, the borrower was gaming the system **on Day 0**.

  * He had stopped paying his suppliers on UPI three days before applying.
  * He had swapped his SIM card to a new device.
  * He was pinging 10 other lending apps simultaneously (Velocity risk).



**The Bureau saw none of this.** The Maker-Checker team saw none of this, because they were looking at PDFs, not live signals.

This "blindness" is why the **MSME Credit Gap stands at ₹45 Lakh Crore**. Lenders are terrified of what they can't see, so they retreat to safe, slow, manual underwriting.

* * *

## The Fix: From "Policy Loggers" to "Signal Orchestrators"

So, how do we close the Conviction Gap? How do we scale trust without hiring an army of underwriters in Dindigul?

We need to stop thinking in terms of **Gates** (Maker -> Checker -> Auditor) and start thinking in terms of **Swarms**.

In 2015, trust was "Checked" once. In 2026, trust must be "Orchestrated" continuously.

**The Conviction Gap** is simply the time between a risk signal appearing (e.g., a SIM swap) and the decision being made.

  * In a Manual system, that gap is 48 hours.
  * In an Automated Swarm, that gap is 200 milliseconds.



We don't need better underwriters. We need a better architecture. We need to move from **Systems of Record** (which store truth) to **Systems of Action** (which execute judgment).

In [**Part 2**](<https://mothi.work/moving-from-systems-of-record-to-systems-of-action-in-credit-risk/>), I will tear down the technical architecture of this new stack. We will look at why "Records" crack under pressure, and how to build a "System of Action" that scales to 1,500 files a day without breaking a sweat.

_(Continue reading[Part 2: From Systems of Record to Systems of Action…](<https://mothi.work/moving-from-systems-of-record-to-systems-of-action-in-credit-risk/>))_
