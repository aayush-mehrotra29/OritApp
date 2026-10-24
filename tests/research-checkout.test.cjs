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

test('the enabled purchase UI sends each package to its own payment-first flow', () => {
  // Verify the released payment-first path independently of the deployment hold.
  const html = render(true);
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


test('purchase page uses native Whop checkout before the private email invitation', () => {
  const { ResearchCheckout } = load('components/ResearchCheckout.tsx', { '@/lib/research': config });
  for (const pkg of config.researchPackages) {
    const html = renderToStaticMarkup(React.createElement(ResearchCheckout, { pkg }));
    assert.ok(html.includes(`href="${pkg.checkoutUrl}"`));
    assert.doesNotMatch(html, /mailto:|type="checkbox"/);
    assert.match(html, /After Whop confirms payment/);
    assert.match(html, /private token/);
  }
});
