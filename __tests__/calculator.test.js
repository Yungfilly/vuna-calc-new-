// ===============================
// VUNA Calculator — Jest Unit Tests
// Babatunde Philip Olutayo
// ===============================

const {
  calculateExpression,
  convertExponent,
  appendValue,
  backspaceValue,
  clearExpression,
  computeSinh,
} = require("../assets/js/calculator.js");

// ──────────────────────────────────────────────
// 1. BASIC ARITHMETIC
// ──────────────────────────────────────────────
describe("Basic Arithmetic", () => {
  test("adds 2 + 3 to equal 5", () => {
    expect(calculateExpression("2+3")).toBe(5);
  });

  test("subtracts 10 - 4 to equal 6", () => {
    expect(calculateExpression("10-4")).toBe(6);
  });

  test("multiplies 6 * 7 to equal 42", () => {
    expect(calculateExpression("6*7")).toBe(42);
  });

  test("divides 20 / 4 to equal 5", () => {
    expect(calculateExpression("20/4")).toBe(5);
  });

  test("returns Error for division by zero", () => {
    expect(calculateExpression("1/0")).toBe("Error");
  });

  test("returns Error for empty expression", () => {
    expect(calculateExpression("")).toBe("Error");
  });

  test("returns Error for invalid expression", () => {
    expect(calculateExpression("abc")).toBe("Error");
  });

  test("handles decimal addition: 0.1 + 0.2", () => {
    expect(calculateExpression("0.1+0.2")).toBeCloseTo(0.3, 5);
  });

  test("handles negative numbers: -5 + 3", () => {
    expect(calculateExpression("-5+3")).toBe(-2);
  });

  test("handles chained operations: 2 + 3 * 4", () => {
    // Follows operator precedence: 3*4=12, 12+2=14
    expect(calculateExpression("2+3*4")).toBe(14);
  });
});

// ──────────────────────────────────────────────
// 2. EXPONENT (UNIQUE FEATURE 1)
// ──────────────────────────────────────────────
describe("Exponent Feature (x^y)", () => {
  test("converts ^ to ** correctly", () => {
    expect(convertExponent("2^3")).toBe("2**3");
  });

  test("converts multiple ^ in one expression", () => {
    expect(convertExponent("2^3^2")).toBe("2**3**2");
  });

  test("leaves expression unchanged when no ^ present", () => {
    expect(convertExponent("2+3")).toBe("2+3");
  });

  test("2 ** 3 evaluates to 8", () => {
    expect(calculateExpression("2**3")).toBe(8);
  });

  test("3 ** 4 evaluates to 81", () => {
    expect(calculateExpression("3**4")).toBe(81);
  });

  test("10 ** 0 evaluates to 1", () => {
    expect(calculateExpression("10**0")).toBe(1);
  });

  test("2 ** -1 evaluates to 0.5", () => {
    expect(calculateExpression("2**-1")).toBe(0.5);
  });

  test("4 ** 0.5 evaluates to 2 (square root)", () => {
    expect(calculateExpression("4**0.5")).toBe(2);
  });
});

// ──────────────────────────────────────────────
// 3. HYPERBOLIC SINE (UNIQUE FEATURE 2)
// ──────────────────────────────────────────────
describe("Hyperbolic Sine Feature (sinh)", () => {
  test("sinh(0) equals 0", () => {
    expect(computeSinh(0)).toBe(0);
  });

  test("sinh(1) is approximately 1.1752011936", () => {
    expect(computeSinh(1)).toBeCloseTo(1.1752011936, 5);
  });

  test("sinh(-1) is approximately -1.1752011936", () => {
    expect(computeSinh(-1)).toBeCloseTo(-1.1752011936, 5);
  });

  test("sinh(2) is approximately 3.6268604078", () => {
    expect(computeSinh(2)).toBeCloseTo(3.6268604078, 5);
  });

  test("calculateExpression handles Math.sinh(1)", () => {
    expect(calculateExpression("Math.sinh(1)")).toBeCloseTo(1.1752011936, 5);
  });

  test("calculateExpression handles Math.sinh(0)", () => {
    expect(calculateExpression("Math.sinh(0)")).toBe(0);
  });
});

// ──────────────────────────────────────────────
// 4. EXPRESSION HELPERS
// ──────────────────────────────────────────────
describe("Expression Helpers", () => {
  test("appendValue adds a number to expression", () => {
    expect(appendValue("2+", 3)).toBe("2+3");
  });

  test("appendValue adds an operator to expression", () => {
    expect(appendValue("5", "+")).toBe("5+");
  });

  test("appendValue works on empty string", () => {
    expect(appendValue("", 7)).toBe("7");
  });

  test("backspaceValue removes last character", () => {
    expect(backspaceValue("123")).toBe("12");
  });

  test("backspaceValue on single char returns empty string", () => {
    expect(backspaceValue("5")).toBe("");
  });

  test("backspaceValue on empty string returns empty string", () => {
    expect(backspaceValue("")).toBe("");
  });

  test("clearExpression returns empty string", () => {
    expect(clearExpression()).toBe("");
  });
});