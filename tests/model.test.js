import test from "node:test";
import assert from "node:assert/strict";
import { estimate, projectProgress } from "../src/model.js";
test("quote separates base, eco and taxes", () => {
  const q = estimate({
    service: "residencial",
    area: 100,
    finish: "confort",
    sustainable: true,
  });
  assert.equal(q.base, 1437500);
  assert.equal(q.eco, 115000);
  assert.equal(q.total, q.base + q.eco + q.tax);
  assert.equal(q.tax, 248400);
});
test("invalid values cannot create quotations", () => {
  for (const area of [0, 19, 5001, NaN])
    assert.throws(() =>
      estimate({ service: "comercial", area, finish: "esencial" }),
    );
  assert.throws(() =>
    estimate({ service: "other", area: 100, finish: "premium" }),
  );
});
test("project stage progress is bounded", () => {
  assert.equal(projectProgress(0), 0);
  assert.equal(projectProgress(5), 100);
  assert.throws(() => projectProgress(6));
});
