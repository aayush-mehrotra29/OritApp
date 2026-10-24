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

test('the enabled purchase UI maps each package to its verified price and checkout', () => {
  // Verify the currently shipped configuration, not only an isolated enabled branch.
  const html = render(config.RESEARCH_SALES_ENABLED);
  assert.doesNotMatch(html, /disabled=""/);
  assert.match(html, /Availability is confirmed at checkout/);
  const cards = html.match(/<article\b[\s\S]*?<\/article>/g);
  assert.equal(cards.length, 3);
  assert.match(cards[0], /Light Simulation/);
  assert.match(cards[0], /\$59 /);
  assert.match(cards[0], /href="https:\/\/whop\.com\/checkout\/ch_VgIXcLhwgDWm5rx\/"/);
  assert.match(cards[0], />Choose Light Simulation<\/a>/);
  assert.match(cards[1], /In Depth Simulation/);
  assert.match(cards[1], /research-package--featured/);
  assert.match(cards[1], /\$99 /);
  assert.match(cards[1], /href="https:\/\/whop\.com\/checkout\/ch_HuQ9mIkimvjUFqV\/"/);
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
