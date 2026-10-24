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
});

test('the enabled purchase UI maps each package to its verified price and checkout', () => {
  // Verify the currently shipped configuration, not only an isolated enabled branch.
  const html = render(config.RESEARCH_SALES_ENABLED);
  assert.doesNotMatch(html, /disabled=""/);
  assert.match(html, /Availability is confirmed at checkout/);
  const cards = html.match(/<article\b[\s\S]*?<\/article>/g);
  assert.equal(cards.length, 2);
  assert.match(cards[0], /\$59 /);
  assert.match(cards[0], /href="https:\/\/whop\.com\/checkout\/ch_VgIXcLhwgDWm5rx\/"/);
  assert.match(cards[0], />Get Concept Check<\/a>/);
  assert.match(cards[1], /\$99 /);
  assert.match(cards[1], /href="https:\/\/whop\.com\/checkout\/ch_HuQ9mIkimvjUFqV\/"/);
  assert.match(cards[1], />Get Launch Research<\/a>/);
  for (const card of cards) {
    assert.match(card, /USD · one-time purchase/);
    assert.match(card, /new human responses/);
  }
});
