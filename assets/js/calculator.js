// ===============================
// VUNA Calculator — Pure Logic
// Babatunde Philip Olutayo
// Testable by Jest (no browser APIs)
// ===============================

/**
 * Evaluates a math expression string and returns the result.
 * Supports standard operators and Math.sinh() for hyperbolic sine.
 * Supports ** for exponentiation (from ^ conversion).
 * @param {string} expression
 * @returns {number|string} result or "Error"
 */
function calculateExpression(expression) {
  try {
    if (!expression || expression.trim() === "") return "Error";
    var result = eval(expression);
    if (!isFinite(result) || isNaN(result)) throw new Error();
    result = Math.round(result * 1e10) / 1e10;
    return result;
  } catch (e) {
    return "Error";
  }
}

/**
 * Converts ^ to ** so eval can handle exponentiation.
 * @param {string} expression
 * @returns {string}
 */
function convertExponent(expression) {
  return expression.replace(/\^/g, "**");
}

/**
 * Appends a value to the current expression string.
 * @param {string} current
 * @param {string|number} value
 * @returns {string}
 */
function appendValue(current, value) {
  return current + value.toString();
}

/**
 * Removes the last character from the expression string.
 * @param {string} current
 * @returns {string}
 */
function backspaceValue(current) {
  return current.slice(0, -1);
}

/**
 * Clears the expression.
 * @returns {string}
 */
function clearExpression() {
  return "";
}

/**
 * Computes Math.sinh of a number (hyperbolic sine).
 * @param {number} x
 * @returns {number}
 */
function computeSinh(x) {
  return Math.round(Math.sinh(x) * 1e10) / 1e10;
}

// Export for Jest
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    calculateExpression,
    convertExponent,
    appendValue,
    backspaceValue,
    clearExpression,
    computeSinh,
  };
}