---
title: How to Split Utility Bills Between Tenants Without the Busywork
slug: split-utility-bills-tenants
description: How an 800-unit property management company turned shared-meter utility bills from a 7-step manual job into two taps, with AI doing the split, the ledger entries and the emails.
summary: To split a shared utility bill between tenants, you read the bill, match it to the property, apply each unit's percentage, post the charges to each tenant's ledger and send everyone their share. At our 800-unit company, AI now does all of that from one command, and a person only approves the split. Each bill went from 5 to 10 minutes to about 10 seconds.
video_id: HvtlV3udw34
video_title: Owners Ask Me to Split Their Tenants Utility Bills. I Use Claude Instead
video_upload_date: 2026-08-18
cluster: Property Management Operations
status: approved
publish_on: 2026-12-02
date: 2026-11-13
cta_headline: Want utility bills off your desk?
cta_text: Acel Cortex reads the bill, applies the split and posts the charges in the property management software you already use. Your team approves each split before anything is posted.
---

## Why shared utility bills are such a pain

Some owners have one meter for several units and ask us to split the bill and charge it back to the tenants. It sounds simple. In practice, we get about **18 to 20 of these requests every month** across our 800 units, and each one used to take seven steps:

1. The owner's bill arrives in our inbox.
2. We cover the owner's home address on the bill so tenants do not see where the owner lives.
3. We separate the bill by property.
4. We calculate each unit's share by hand, often checking the lease or notes for the split.
5. We open each tenant's ledger in the property management software, enter the amount and a clear memo.
6. We email each tenant their share with the bill attached.
7. We tell the owner it is done and start collecting.

At 5 to 10 minutes per bill, 20 times a month, that is a lot of unpaid admin work.

## The new way: one command, two approvals

We started processing these bills with AI last year. Now an operator sends the bill to our AI assistant with a single command, from a phone. The AI:

- Reads the bill: utility type, provider, total, service address, billing period and account number.
- Matches the service address to one property in our property management software.
- Looks up each unit's split and does the math.
- Shows the split for approval.

After the operator approves, the AI posts each charge to the tenant's ledger with the billing period in the memo, so tenants know what they are paying for. A second tap emails the tenants their share and tells the owner it is done.

From 5 to 10 minutes per bill down to two taps and about 10 seconds.

## The rules that prevent costly mistakes

Accounting errors in someone else's ledger are painful to fix, so the AI follows strict rules:

- **One property or stop.** If the service address does not match exactly one property, it lists the possible matches and asks. If nothing matches, it stops instead of guessing, because that usually means the wrong bill was sent.
- **Splits must add up to 100 percent.** Notes sometimes say 90 or 95 percent by mistake. The AI checks before calculating.
- **Never post an unconfirmed split.** The first time a property comes up, a person confirms the split. After that it is remembered, so a 40/60 split only has to be entered once.
- **No penny rounding headaches.** With three units, each tenant gets 33.33 percent and the property absorbs the leftover cent.
- **Hide the owner's address, then check it.** The AI covers the owner's mailing address on the bill, then verifies it is actually hidden before anything is sent.

## Charge for it, or automate it

When we looked at this honestly, it was work we did for free. My rule now: if something has to be handled and I do not want to do it, either I automate it or I charge for it. Automating turned unproductive hours into something that barely costs us time.

## What you need to set this up

- **API access to your property management software with write permissions.** On Buildium that meant upgrading to the highest plan. Do not cheap out here. It is the only way AI can post to ledgers for you.
- **A chat app the operator can use from a phone.** We use Telegram.
- **A source of truth** with each property's split, just like you would give a new employee.

Getting the matching, checks and ledger posting reliable is where most of the build time went. It is one of the workflows Acel Cortex sets up for property management companies.

## FAQ

### Should property managers charge owners for splitting utility bills?

It is worth considering. It is real admin work, often 5 to 10 minutes per bill by hand. If you do not automate it, charging a small fee turns it from free work into revenue.

### How do I split a utility bill between units with different sizes?

Agree on a fixed percentage per unit with the owner, write it in the lease or property notes, and make sure the percentages add up to 100. Apply the same split every month so tenants are not surprised.

### Is it okay to send tenants the owner's utility bill?

Tenants should see the bill they are paying a share of, but cover the owner's personal mailing address first. We do it on every bill.
