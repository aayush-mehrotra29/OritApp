# Orit rebrand implementation handoff

Verified October 24, 2026. Repository: `/Users/anayshekhar/Documents/OritApp`.

## Current state

The local public website is rebranded around AI-powered market research grounded in real people. Both real Whop products, one-time USD variants, and hosted checkout configurations exist. **Sales are intentionally disabled. Nothing was deployed, committed, pushed, charged, or recruited.** The existing production domain still serves the previous site.

The supplied brief explicitly requires confirmed recruitment feasibility and fully loaded costs before activating sales or deployment. The only additional operating information supplied was an estimate of at most one hour per response. That is not a recruitment quote, screened-audience availability check, or fulfillment budget, and is not published as a turnaround guarantee.

## Website implementation

- Rewrote the hero, intro animation tagline, animated research narrative, services, real-human differentiator, research process, deliverable explanation, About positioning, navigation, footer, and 404 links.
- Added exactly two one-time packages, both including new project-specific screened human feedback. No numerical participant promise is published pending feasibility confirmation.
- Added purchase FAQs and `/start`, an informational intake page that does not claim payment success from a redirect. Unknown package query values do not confirm an order or expose arbitrary content.
- Updated title, description, keywords, Open Graph and Twitter metadata; preserved logo and favicon.
- Replaced obsolete public waitlist actions with pricing navigation. The existing waitlist backend and its tests remain intact; it is no longer promoted on public pages. Unmounted legacy components are not rendered or advertised.
- No internal dashboard, research orchestration, Terac integration, new customer database, payment form, or fulfillment backend was built.

### Design preservation

Every original rule in `app/globals.css` remains intact; new styles are appended and scoped to purchasing/intake and the hero description. The original city backgrounds, particle canvases, scroll reveals, text animation, typography, colors, header styling, phone artwork, and footer reveal remain. The original two phone illustration's title and “Agent” badges were changed to illustrative research wording and “AI”; all its other data and all other public assets are unchanged. These screens are explicitly described accessibly as illustrations, not research results.

Existing components had no pricing or FAQ section. The minimal new pricing area uses the existing type, colors, button classes, and editorial treatment. The new intake page reuses the About layout and participant background. Existing waitlist form space now contains primary/secondary navigation actions.

Computed style checks match the original desktop and 390px mobile captures for hero, headline, header, story grid, phone stage, and footer artwork. Asset/source comparisons verified all original CSS rules and core visual/animation components were retained. Screenshot captures and browser verification details are under ignored `work/verification/`.

### Files changed or added

- `app/page.tsx`, `app/layout.tsx`, `app/about/page.tsx`, `app/not-found.tsx`, `app/globals.css`
- `app/start/page.tsx` (new)
- `components/Hero.tsx`, `components/IntroVeil.tsx`, `components/AbstractJourney.tsx`, `components/StorySection.tsx`, `components/SiteHeaderContent.tsx`, `components/SiteFooter.tsx`
- `components/PricingSection.tsx`, `components/ResearchActions.tsx` (new)
- `lib/research.ts` (new centralized public checkout IDs, package content, FAQs and explicit sales-readiness gate)
- `public/assets/orit-two-phones-v10.svg` (wording only)
- `.eslintrc.json` (new), `package.json`, `package-lock.json` (matching Next.js lint tooling)
- `components/HandoffSection.tsx` (escaped one existing apostrophe to resolve a pre-existing lint error; no rendered change)
- `tests/research-checkout.test.cjs` (new), `.gitignore`, `REBRAND_REPORT.md`

### Validation

- Production build: passed (`npm run build`).
- TypeScript: passed (`npx tsc --noEmit`).
- Lint: passed with zero errors; five warnings concern the retained image/font implementation. The original lint command had no configuration or installed ESLint and prompted for setup; standard Next.js tooling is now configured.
- Tests: 7/7 passed (`node --test tests/*.test.cjs`). Includes existing waitlist tests plus a disabled-sales test and a rendered future-enabled CTA mapping test. The latter does not modify the saved readiness flag or Whop settings.
- Browser checks: 1440×1000, 390×844, and 320×740; no runtime errors, failing local asset requests, or horizontal overflow on tested home/About/intake routes. Checked prices, two packages, human-feedback scope, anchors, keyboard FAQ interaction, unknown intake query, payment disclaimer, and reduced-motion behavior.
- Original desktop/mobile computed styles compared successfully. The 320px viewport was checked for responsive behavior; no original 320px capture was taken.
- `git diff --check`: passed.
- Existing configured private environment values were checked against generated public JavaScript; no matches found. No Whop private credentials were written into the project.

## Whop configuration

Authenticated business: **Orit**, `biz_MexO0HEQnzwpZI`, website `https://orit.dev`. The authenticated CLI is using the production account, not a sandbox.

| Field | Concept Check | Launch Research |
|---|---|---|
| Product | `prod_ndQbpKRvLZmZo` | `prod_hhi9xTjUQpmGD` |
| Variant / plan | `plan_EuakJxGnPAziQ` | `plan_egia8RPEVQxvz` |
| Checkout configuration | `ch_VgIXcLhwgDWm5rx` | `ch_HuQ9mIkimvjUFqV` |
| Base charge | $59 USD, one-time | $99 USD, one-time |
| Hosted URL | https://whop.com/checkout/ch_VgIXcLhwgDWm5rx/ | https://whop.com/checkout/ch_HuQ9mIkimvjUFqV/ |
| Completion URL | https://orit.dev/start?package=concept-check | https://orit.dev/start?package=launch-research |
| Product and variant visibility | hidden | hidden |
| Stock / unlimited stock | 0 / false | 0 / false |

Both variants were read back from Whop. Billing period, trial period, and installment count are null; renewal price is zero; adaptive pricing is disabled. Payment methods are card-only, excluding installment/BNPL methods. Both products and checkout descriptions include real participant feedback and accurate scope.

Both hosted URLs returned HTTP 200 and visibly displayed the matching product, USD amount, “One-time payment,” and **Out of stock**. Their configuration returns the correct completion URL and package metadata. The product-update CLI does not support setting the product-level redirect; the supported checkout-configuration redirect is configured for each website checkout URL. Use those configuration URLs, not the bare variant links.

The website uses `RESEARCH_SALES_ENABLED = false`. Purchase labels appear as disabled buttons with a visible availability notice and working contact link. When the gate is deliberately enabled after readiness review, those same labels render anchors to their own verified configuration URL. The source contains genuine URLs, no invented or placeholder payment destinations.

### Merchant readiness

Whop reports the account active, with card and bank payment acceptance active. Standard/instant/crypto payouts and transfers are inactive. Required account actions include identity verification and team 2FA for payouts/outgoing transfers. Individual/business verification fields are null. This is **not** a fully verified payout-ready merchant.

Native customer emails are enabled. The authenticated payment-list endpoint is accessible and returned no purchase records. Whop will remain the source of customer, package, amount, status, date, payment reference, and receipt information. No successful, failed, or pending transaction was created to test that behavior. No sandbox transaction or live card payment was performed.

## Customer flow

1. Generic Get Started links lead to homepage pricing; How It Works leads to the existing story/process section.
2. Currently both purchases are unavailable and customers can contact Orit about scope.
3. Once readiness is confirmed and sales opened, the selected package leads to its own Whop hosted checkout.
4. Whop records the transaction and handles payment confirmation/receipts. Only the merchant's verified payment record authorizes fulfillment.
5. The configured return destination is `/start?package=...`. It asks customers to use the existing contact form with their checkout email, order reference, business name/site, intended audience, and research question. Public concept links can be included; confidential files require an appropriate agreed transfer method.
6. Orit confirms payment, materials, scope, and timing before research starts. Merely visiting `/start` never confirms payment or starts work.

Existing contact destination: https://tally.so/r/Ek202N. The live form loads and exposes required Name, Email, and Message fields plus Send message. It was inspected without submitting a test message; actual delivery to the recipient was not tested. No phone number or public business email was invented.

No webhook is needed for this public landing-page flow because it does not automatically fulfill or unlock anything. Internal fulfillment remains separate.

## Human research readiness and economics

Concept Check includes one decision, one audience, one concept, 2–3 competitors, a small new screened-human study, AI/human comparison, and a concise source-backed brief with improvements. Launch Research includes up to two concepts, 3–5 competitors, deeper positioning and preference comparison, a larger new screened-human study, a complete brief, next experiment, and one clarification round.

The proposed internal targets remain at least 3 and 5 eligible completed responses. **Neither target is financially or operationally verified.** No study was launched, participant recruited, credits spent, or paid quote requested.

Terac's [pricing documentation](https://terac.com/docs/researchers/finance/pricing) states costs comprise participant payouts plus the platform fee; a combined CPI quote includes both. It provides no fixed public CPI that establishes these packages' economics. Its [developer guide](https://terac.com/docs/developers/guides) describes screened recruitment. No Terac account quote or credentials were supplied/discovered in this project.

Whop account-specific fee inspection returned US card processing at 2.7% + $0.30, orchestration 0.8%, billing 0.5%, tax calculation 0.5%, tax service 2%, fraud screening $0.07, and 3DS $0.03; cross-border 1.5% and FX 1% can also apply. Applicability varies by transaction/service. These are not a claim that every fee always applies. Basic card-only fee arithmetic is $1.89 on $59 and $2.97 on $99, before other charges.

An illustrative conservative planning reserve of **9.5% + $0.40** for transaction-related fees, plus **$5 AI/API + $15 fulfillment/support + $5 overhead/rework/payout allocation**, gives:

| Package | Price | Fee reserve | Assumed non-recruitment costs | Remaining for recruitment | Break-even fully loaded CPI at target |
|---|---:|---:|---:|---:|---:|
| Concept Check | $59 | $6.01 | $25 | $27.99 | about $9.33 for 3 responses |
| Launch Research | $99 | $9.81 | $25 | $64.19 | about $12.84 for 5 responses |

These are **planning assumptions, not provider quotes, actual operating costs, or profitability confirmation**. No profit margin remains at those CPI ceilings beyond the assumed $5 buffer. Replace them with real recruitment estimates, task duration and screening constraints, actual API usage, staff/support effort, rework, refund risk, and payout allocations before release. Longer or specialist research may not fit the standard prices.

The qualitative methodology and inclusion of real feedback are drafted as the intended service. They can be promoted as available only when fulfillment is supported. No representative-demand, guaranteed accuracy/sales, expert-review, invented results, or numerical sample-size claims have been added.

## Deployment and release blockers

Production `https://orit.dev` returned 200 with Vercel headers and the old iOS-testing copy. Git remote is the existing OritApp repository on branch `main`. No committed deployment workflow or local Vercel project binding was found. The CLI launcher could not resolve its package under the restricted network; no deployment was attempted, since business readiness already blocks release. Hosting, DNS, and infrastructure were not changed.

Before accepting purchases or deploying the new claims:

1. Obtain a non-charging Terac/recruitment quote and confirm screened-audience availability, study length, and at least 3/5 eligible completions at sustainable total costs. Confirm actual fulfillment and support capacity. Do not replace the human study with synthetic responses.
2. Complete Whop identity verification and required 2FA/payout setup. Recheck merchant capabilities.
3. Confirm scope, sample commitments, timing, and appropriate customer/material handling. Update site and checkout copy consistently, removing availability holds only when true.
4. Set approved Whop stock and visibility. Enable the site's centralized sales gate only after rechecking both hosted checkout amounts and destinations. Do not run real charges without separate authorization.
5. Deploy through the existing Vercel project or established Git integration, confirming the production project before any release. Verify `/start` is live before selling via its redirect. Recheck `orit.dev`, contact, and checkout navigation after deployment.

No deployment success or live transaction success is claimed.
