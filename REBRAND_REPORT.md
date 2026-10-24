# Orit release handoff

Updated October 24, 2026. Repository: `/Users/anayshekhar/Documents/OritApp`.

## Current release

The public website is rebranded around AI-powered market research grounded in real people. The abstract and other copy are shorter and easier to read. The old phone demonstration is replaced by an illustrative animated particle field, clusters, and graphs. Typography, colors, backgrounds, page layout, and existing global styles are preserved. Animation supports pause, reduced motion, mobile sizing, and offscreen suspension; it is explicitly labeled as illustrative rather than study data.

The user subsequently authorized deployment and payment activation, reported estimated recruitment cost of $10–20 per completed response and $100 in free credits, and asked to prioritize working Whop payments. This supersedes the earlier sales hold. Both offers are visible with **one sale per package**, enforced by Whop stock. Actual recruitment and fulfillment costs must be reviewed before replenishing stock; credits are a one-time subsidy, not evidence of ongoing profitability. No participant-count or delivery-time guarantee is published.

## Whop configuration

Business: Orit, `biz_MexO0HEQnzwpZI`, https://orit.dev. This is the production account.

| Field | Concept Check | Launch Research |
|---|---|---|
| Product | `prod_ndQbpKRvLZmZo` | `prod_hhi9xTjUQpmGD` |
| Variant | `plan_EuakJxGnPAziQ` | `plan_egia8RPEVQxvz` |
| Checkout | https://whop.com/checkout/ch_VgIXcLhwgDWm5rx/ | https://whop.com/checkout/ch_HuQ9mIkimvjUFqV/ |
| Base charge | $59 USD, one-time | $99 USD, one-time |
| Completion URL | https://orit.dev/start?package=concept-check | https://orit.dev/start?package=launch-research |
| Product / variant visibility | visible | visible |
| Initial stock / unlimited stock | 1 / false | 1 / false |

Card-only checkouts; no subscription, trial, or installments. Any applicable tax is shown by Whop before payment. The website uses the real checkout configuration URLs and `RESEARCH_SALES_ENABLED = true`. Whop is authoritative for remaining availability and payment status. The disabled-sales UI remains available if a hold is needed later.

Both public checkouts were inspected after activation: matching product, $59/$99, “One-time payment,” card information fields, billing details, and Pay button were present. No real or sandbox charge was made. A successful transaction and post-payment redirect have not been exercised end to end.

## Merchant actions still needed

Whop reports card-payment acceptance active. Payouts and outgoing transfers remain inactive pending identity verification and required team 2FA. These are owner actions, not website implementation tasks; they were not completed or bypassed.

- Identity verification: https://whop.com/dashboard/biz_MexO0HEQnzwpZI/balance/?verify=true
- Team security / 2FA: https://whop.com/dashboard/biz_MexO0HEQnzwpZI/team/

Native customer emails are enabled. Whop remains the source for order amount, payment status, customer information, references, and receipts. No private Whop credentials are included in the website.

## Customer flow

1. Get Started leads to pricing. Each package button opens its own Whop checkout.
2. Whop collects payment and confirms its status. The configured return URL leads to package-specific instructions at `/start`.
3. The buyer uses the existing contact form, https://tally.so/r/Ek202N, to share their checkout email, Whop reference, business details, intended audience, and research question.
4. Orit verifies payment in Whop and agrees on materials, scope, and timing before research starts.

The intake page never treats a URL visit as proof of payment. The contact form was inspected without submitting a message; recipient delivery was not tested. No automatic fulfillment, webhook, internal dashboard, or recruitment integration was added.

## Fulfillment assumptions

Both packages include fresh screened human feedback alongside AI and source-backed market research. Internal planning targets are 3 eligible responses for Concept Check and 5 for Launch Research. At the user-estimated $10–20 each, the two initial projects together imply $80–160 recruitment costs before credits. The availability and exact fees for each screened audience remain unconfirmed. Check each brief before commissioning research. Never substitute AI-generated answers for participant responses.

The $100 reported credits do not establish sustainable recurring economics. Actual provider fees, screening, AI usage, staff/support effort, refunds, and Whop fees should be reviewed before opening additional stock. No recruitment was launched or credits spent during this work.

## Validation and deployment

- Production build, type checking, and lint passed; four retained image/font warnings remain.
- All seven tests passed, including actual public checkout-to-package mapping and disabled-sales behavior.
- Desktop/mobile visualization checks passed, with no runtime errors or horizontal overflow in the tested views. Pause and reduced-motion handling are implemented.
- The existing GitHub main branch deploys to Vercel at https://orit.dev. Rebrand and shortened copy were already live; visualization commit `4f6bde1` was pushed and confirmed live. Payment activation is the next release in the same workflow.
- Global design styles were not modified for payment activation; the new visualization uses its own scoped CSS module.
- No successful charge, payout verification, or delivery of contact messages is claimed.
