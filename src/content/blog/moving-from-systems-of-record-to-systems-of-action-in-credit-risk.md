---
title: "Moving from Systems of Record to Systems of Action in Credit Risk [Part 2]"
description: "In Part 1, we walked through the \"Nagpur File\"—a story of how a perfectly good borrower was rejected by a Maker-Checker process that took 48 hours to decide what an algorithm knew in 48 milliseconds. "
pubDate: "2025-12-21T17:28:22"
categories: ["Indian Fintech"]
tags: []
heroImage: ""
draft: false
---

_In[Part 1](<https://mothi.work/why-maker-checker-underwriting-fails-in-digital-lending/>), we walked through the "Nagpur File"—a story of how a perfectly good borrower was rejected by a Maker-Checker process that took 48 hours to decide what an algorithm knew in 48 milliseconds. We called this the "Conviction Gap."_

_Today, in Part 2, we tear down the architecture that causes this gap: the invisible war between Systems of Record and Systems of Action._

**It is 8:02 AM in a back-office in Bangalore.**

Karthik, a Senior Underwriter, sips his lukewarm tea and opens Excel. He is about to start a daily ritual that explains why India’s ₹45 Lakh Crore MSME credit gap isn't closing.

In his inbox sits a loan application from an auto-parts dealer in Nagpur. The application arrived digitally. The KYC is digital. The bank statement is a PDF. To the outside world, this is "Fintech."

But to Karthik, this is a crime scene of disconnected data.

He opens the Core Banking System (CBS) to check payment history. He opens a separate portal for the Bureau report. He opens a third window for the GST portal. He opens a PDF viewer for the bank statement.

**He is acting as a human router.** He is manually stitching together data from systems that were designed to _store_ truth, not _act_ on it.

He approves the file at 8:15 AM.  
The Checker pauses it at 8:30 AM because of a "suspicious" rent payment gap.  
The Auditor rejects it at 8:45 AM because the PDF metadata looks "off."

**Total time: 45 minutes. Cost: ₹75. Outcome: Rejected.**

This is not a failure of personnel. It is a failure of architecture. We are trying to fight 2026 fraud velocities with 2015 "Systems of Record."

## The Theology of "Systems of Record"

To understand the crack in the foundation, we have to look at what we built in the last decade.

Banks and NBFCs are built on **Systems of Record (SoR)**.  
The Core Banking System. The Loan Origination System (LOS). The Credit Bureau (CRIF/Experian).

These systems have one job: **Immutable Memory.**

  * They remember that you defaulted in 2021.
  * They remember that you paid your EMI yesterday.
  * They remember that your Maker approved the file.



They are **Passive Archives**. They wait for an event to finish, and then they write it down in stone. They are perfect for the Branch Banking era, where a Loan Officer had 7 days to read a file, drink tea with the customer, and make a judgment call.

But here is the problem: **Fraud doesn 't happen in the past. It happens in the gap.**

* * *

## The "Action Gap" Where Money Dies

Fintech demands "Day 0" decisions. But Systems of Record only offer "Day -1" data.

When that Nagpur dealer applied at 8:02 AM, three things were happening that Karthik’s Excel sheet couldn't see:

  1. **The SIM Swap:** 60 seconds before applying, the dealer swapped his SIM from a Nagpur tower to a device in Delhi (a classic mule account takeover).
  2. **The PDF Surgery:** The bank statement he uploaded was real, but Page 4 was surgically altered. A ₹50,000 circular loan inflow was renamed "Counter Sales."
  3. **The Velocity Spike:** He had hit the "Apply" button on 4 other lending apps in the last 10 minutes.



**The Systems of Record missed all of this.**

  * **CRIF** said: "Score 720" (based on last month's data).
  * **The LOS** said: "Documents Uploaded" (it checks existence, not authenticity).
  * **The Core Banking** said: "N/A" (customer doesn't exist yet).



Because the systems were blind, Karthik had to be the detective. And because Karthik is human, he was slow. By the time the "Checker" flagged the file, the fraudster had moved on.

**This is the structural flaw.** We are using a rearview mirror (Records) to drive a Formula 1 car (Digital Lending).

* * *

## Enter the "System of Action"

To fix this, we don't need faster underwriters. We need a new layer in the stack.

A **System of Action (SoA)** sits _above_ the Systems of Record. It doesn't just "store" data; it **orchestrates judgment** in real-time.

Imagine a nervous system connecting the eyes (Data) to the muscle (Decision), bypassing the slow conscious brain (Manual Review).

If Karthik had a System of Action, the 8:02 AM workflow would have looked like this:

### The Orchestration Layer (200 Milliseconds)

**Signal 1 (Telco):** The system pings the Telco API. " SIM Swap T-60s? Yes." -> _Risk Score +40._  
**Signal 2 (Forensics):** The system tears apart the PDF hex code. "Font mismatch on Page 4? Yes." -> _Risk Score +50._  
**Signal 3 (Bureau):** The system pulls the CIBIL report. "Score 720?" -> _Risk Score -10._

**The Verdict:**
    
    
    {

      "decision": "BLOCK",

      "reason": "HIGH_FRAUD_PROBABILITY",

      "signals": [

        {"type": "SIM_SWAP", "velocity": "Critical"},

        {"type": "DOC_TAMPERING", "page": 4, "evidence": "font_mismatch"}

      ],

      "human_intervention": "False"

    }

    

**Result:** The application is blocked at 8:02:05 AM. Karthik never sees it. He spends his morning approving the good customers that the system green-lit.

* * *

## The "Hard-Coded" Policy Trap

There is a second, quieter reason why Systems of Record fail: **Rigidity.**

Let’s say the Risk Head realizes that "Nagpur Auto Dealers" are a high-risk segment. She wants to change the credit policy _today_.

In a System of Record (Legacy LOS), she has to write a spec document. She sends it to IT. The IT team puts it in a sprint. They code it in Java/Python. They test it. They deploy it.

**Time to Live: 4 to 6 Weeks.**

In a System of Action, the policy is not code—it is **Configuration**. Or better yet, it is **Neural**.

She types: _" Block all auto dealers from Nagpur with circular banking flows > 20% of turnover."_  
The System of Action converts this natural language into a rule. It runs a simulation on last month's data ("What if we had this rule yesterday?"). It shows the impact. She clicks "Deploy."

**Time to Live: 4 Minutes.**

* * *

## The Economic Reality: 15 vs. 1,500

This isn't just about technology. It's about Unit Economics.

**The Maker-Checker Model (System of Record):**

  * Capacity: 15 Files / Day / Human.
  * Cost: ₹75 - ₹200 per file (Salary + Ops).
  * Scale: Linear (To double loans, double headcount).



**The Orchestration Model (System of Action):**

  * Capacity: 1,500 Files / Day / Instance.
  * Cost: ₹5 - ₹15 per file (Compute + API).
  * Scale: Exponential (Zero headcount addition).



By 2026, the "System of Record" will be a commodity. Everyone will have the same Core Banking. Everyone will have the same CIBIL access.

The **Moat** will be the **System of Action** —the invisible layer that sits on top, ingesting PDFs, pinging APIs, and making the decision before the fraudster can even finish typing the OTP.

_In[**Part 3**](<https://mothi.work/beyond-the-bureau-how-real-time-signals-fix-credit-risk-part-3/>), we will open the hood of this machine. We will look at exactly how to build this orchestration layer—the intelligence that turns 48-hour queues into instant, explainable verdicts._
