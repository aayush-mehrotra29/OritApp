const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const typescript = require("typescript");

const root = path.join(__dirname, "..");

function loadEmailValidator() {
  const source = fs.readFileSync(path.join(root, "lib/waitlist-email.ts"), "utf8");
  const code = typescript.transpileModule(source, {
    compilerOptions: { module: typescript.ModuleKind.CommonJS },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports });
  return exports.normalizeWaitlistEmail;
}

function createSheetHarness(initialRows = []) {
  const rows = initialRows.slice();
  let flushes = 0;
  let locks = 0;
  let unlocks = 0;
  const sheet = {
    getLastRow: () => rows.length,
    getRange: (_row, column, count) => ({
      getDisplayValues: () => rows.slice(0, count).map((row) => [String(row[column - 1] ?? "")]),
    }),
    appendRow: (row) => rows.push(row),
  };
  const context = {
    console: { error() {} },
    SpreadsheetApp: {
      getActiveSpreadsheet: () => ({
        getSheetByName: () => sheet,
        getActiveSheet: () => sheet,
      }),
      flush: () => { flushes++; },
    },
    LockService: {
      getScriptLock: () => ({
        waitLock: () => { locks++; },
        releaseLock: () => { unlocks++; },
      }),
    },
    ContentService: {
      MimeType: { JSON: "JSON" },
      createTextOutput: (text) => ({
        setMimeType() { return this; },
        getContent() { return text; },
      }),
    },
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, "scripts/google-apps-script-waitlist.gs"), "utf8"), context);
  const submit = (email) => JSON.parse(context.doPost({
    postData: { contents: JSON.stringify({ secret: context.SECRET, email }) },
  }).getContent());
  return { rows, submit, counts: () => ({ flushes, locks, unlocks }) };
}

test("normalizes ordinary addresses and rejects malformed ones", () => {
  const normalize = loadEmailValidator();
  assert.equal(normalize("  Person+Test@Example.COM  "), "person+test@example.com");
  for (const email of ["a..b@example.com", "x@-example.com", "x@example..com", "=SUM(1)@example.com", "x@example", "not an email"]) {
    assert.equal(normalize(email), null, email);
  }
});

test("stores only signup time and normalized email", () => {
  const harness = createSheetHarness();
  assert.deepEqual(harness.submit(" Person+Test@Example.COM "), { ok: true, alreadyJoined: false });
  assert.equal(harness.rows.length, 1);
  assert.equal(harness.rows[0].length, 2);
  assert.equal(Object.prototype.toString.call(harness.rows[0][0]), "[object Date]");
  assert.equal(harness.rows[0][1], "person+test@example.com");
  assert.deepEqual(harness.counts(), { flushes: 1, locks: 1, unlocks: 1 });
});

test("does not append an email already present, even in old rows", () => {
  const harness = createSheetHarness([[new Date(), " Person@Example.com ", "hero", "old browser"]]);
  assert.deepEqual(harness.submit("person@example.COM"), { ok: true, alreadyJoined: true });
  assert.equal(harness.rows.length, 1);
  assert.deepEqual(harness.counts(), { flushes: 0, locks: 1, unlocks: 1 });
});

test("submitting the same address twice keeps the original signup time", () => {
  const harness = createSheetHarness();
  assert.deepEqual(harness.submit("first@example.com"), { ok: true, alreadyJoined: false });
  const firstSignupTime = harness.rows[0][0];
  assert.deepEqual(harness.submit("FIRST@EXAMPLE.COM"), { ok: true, alreadyJoined: true });
  assert.equal(harness.rows.length, 1);
  assert.equal(harness.rows[0][0], firstSignupTime);
});

test("rejects invalid addresses before touching storage", () => {
  const harness = createSheetHarness();
  assert.deepEqual(harness.submit("a..b@example.com"), { ok: false, error: "invalid_email" });
  assert.equal(harness.rows.length, 0);
  assert.deepEqual(harness.counts(), { flushes: 0, locks: 0, unlocks: 0 });
});
