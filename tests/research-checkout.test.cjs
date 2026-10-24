const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

function load(relativePath, dependencies = {}) {
  const filename = path.join(__dirname, '..', relativePath);
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(source, {
    module, exports: module.exports,
    require: (name) => dependencies[name] ?? require(name),
  }, { filename });
  return module.exports;
}
const config = load('lib/research.ts');
function render(enabled) {
  const { PricingSection } = load('components/PricingSection.tsx', {
    '@/lib/research': { ...config, RESEARCH_SALES_ENABLED: enabled },
  });
  return renderToStaticMarkup(React.createElement(PricingSection));
}

test('a sales hold hides checkout links and disables purchase actions', () => {
  const html = render(false);
  assert.equal((html.match(/disabled=""/g) || []).length, 2);
  assert.doesNotMatch(html, /href="https:\/\/whop\.com/);
  assert.match(html, /Purchases are not open yet/);
  assert.match(html, /https:\/\/tally\.so\/r\/Ek202N/);
  assert.match(html, /href="tel:\+15714644236"/);
  assert.match(html, /href="mailto:oritsoftware@gmail\.com\?subject=Custom%20product%20research"/);
  assert.match(html, /Custom <span>quote<\/span>/);
});

test('the enabled purchase UI sends each package to its own email-first flow', () => {
  // Verify the currently shipped configuration, not only an isolated enabled branch.
  const html = render(config.RESEARCH_SALES_ENABLED);
  assert.doesNotMatch(html, /disabled=""/);
  assert.match(html, /Availability is confirmed at checkout/);
  const cards = html.match(/<article\b[\s\S]*?<\/article>/g);
  assert.equal(cards.length, 3);
  assert.match(cards[0], /Light Simulation/);
  assert.match(cards[0], /\$59 /);
  assert.match(cards[0], /href="\/order\?package=concept-check"/);
  assert.match(cards[0], />Choose Light Simulation<\/a>/);
  assert.match(cards[1], /In Depth Simulation/);
  assert.match(cards[1], /research-package--featured/);
  assert.match(cards[1], /\$99 /);
  assert.match(cards[1], /href="\/order\?package=launch-research"/);
  assert.match(cards[1], />Choose In Depth Simulation<\/a>/);
  for (const card of cards.slice(0, 2)) {
    assert.match(card, /USD · one-time purchase/);
    assert.match(card, /new human responses/);
  }
  assert.match(cards[2], /Custom Simulation/);
  assert.match(cards[2], /Custom <span>quote<\/span>/);
  assert.match(cards[2], /href="tel:\+15714644236">Call us<\/a>/);
  assert.match(cards[2], /href="mailto:oritsoftware@gmail\.com\?subject=Custom%20product%20research">Email us<\/a>/);
  assert.doesNotMatch(cards[2], /Call 571-464-4236/);
  assert.doesNotMatch(cards[2], /whop\.com|one-time purchase/);
});


test('email drafts identify the selected package and request the product brief', () => {
  for (const pkg of config.researchPackages) {
    const url = new URL(config.researchEmailUrl(pkg));
    assert.equal(url.protocol, 'mailto:');
    assert.equal(url.pathname, 'oritsoftware@gmail.com');
    assert.equal(url.searchParams.get('subject'), `Product details — ${pkg.name}`);
    const body = url.searchParams.get('body');
    assert.ok(body.includes(`$${pkg.price} USD, one-time`));
    for (const field of ['Business / product name:', 'Product description', 'Target customers:', 'What I want to learn or decide:', 'Email I will use at Whop checkout:']) {
      assert.ok(body.includes(field));
    }
  }
});

test('payment is unavailable until the customer confirms sending their email', () => {
  const { ResearchCheckout } = load('components/ResearchCheckout.tsx', {
    '@/lib/research': config,
  });
  for (const pkg of config.researchPackages) {
    const html = renderToStaticMarkup(React.createElement(ResearchCheckout, { pkg }));
    assert.match(html, /type="checkbox"/);
    assert.match(html, /<button[^>]*disabled=""/);
    assert.doesNotMatch(html, /href="https:\/\/whop\.com/);
    assert.match(html, /Open prefilled email/);
  }
});

test('invalid packages and a sales hold never expose checkout', () => {
  const dependencies = {
    '@/components/SiteHeader': { SiteHeader: () => null },
    '@/components/SiteFooter': { SiteFooter: () => null },
    '@/components/AudiencePixelScene': { AudiencePixelScene: () => null },
    '@/components/ResearchCheckout': { ResearchCheckout: () => React.createElement('div', {}, 'CHECKOUT_FLOW') },
  };
  for (const enabled of [false, true]) {
    const { default: Page } = load('app/order/page.tsx', {
      ...dependencies, '@/lib/research': { ...config, RESEARCH_SALES_ENABLED: enabled },
    });
    for (const slug of [undefined, 'unknown', 'https://example.com', ['concept-check'], 'concept-check']) {
      const html = renderToStaticMarkup(React.createElement(Page, { searchParams: { package: slug } }));
      assert.equal(html.includes('CHECKOUT_FLOW'), enabled && slug === 'concept-check');
      assert.match(html, /Back to packages/);
    }
  }
});
