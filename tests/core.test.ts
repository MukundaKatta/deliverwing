import { describe, it, expect } from "vitest";
import { Deliverwing } from "../src/core.js";
describe("Deliverwing", () => {
  it("init", () => { expect(new Deliverwing().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Deliverwing(); await c.process(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Deliverwing(); await c.process(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
