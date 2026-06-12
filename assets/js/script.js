// ===============================
// VUNA CALCULATOR — Babatunde Philip Olutayo
// Unique features: Exponent (^) and Hyperbolic Sine (sinh)
// ===============================

var currentExpression = "";
var LAST_RESULT = 0;

// ── Trig helpers (degrees) ──────────────────────────────────────────────────
function sinDeg(x)  { return Math.sin(x * Math.PI / 180); }
function cosDeg(x)  { return Math.cos(x * Math.PI / 180); }
function tanDeg(x)  { return Math.tan(x * Math.PI / 180); }
function asinDeg(x) { return Math.asin(x) * 180 / Math.PI; }
function acosDeg(x) { return Math.acos(x) * 180 / Math.PI; }
function atanDeg(x) { return Math.atan(x) * 180 / Math.PI; }

// ── Input handlers ──────────────────────────────────────────────────────────
function appendToResult(value) {
  currentExpression += value.toString();
  updateDisplay();
}

function operatorToResult(value) {
  // ^ becomes ** for eval
  currentExpression += (value === "^") ? "**" : value;
  updateDisplay();
}

function insertSinh() {
  currentExpression += "Math.sinh(";
  updateDisplay();
}

function insertCloseBracket() {
  currentExpression += ")";
  updateDisplay();
}

function backspace() {
  currentExpression = currentExpression.slice(0, -1);
  updateDisplay();
}

function clearResult() {
  currentExpression = "";
  updateDisplay();
}

// ── Evaluate ────────────────────────────────────────────────────────────────
function calculateResult() {
  if (!currentExpression) return;
  var result = calculateExpression(currentExpression);
  LAST_RESULT = result;
  currentExpression = String(result);
  updateDisplay();
}

function calculateExpression(expression) {
  try {
    var result = eval(expression);          // safe: user-typed math only
    if (!isFinite(result) || isNaN(result)) throw new Error();
    // Round floating point noise
    result = Math.round(result * 1e10) / 1e10;
    return result;
  } catch (e) {
    return "Error";
  }
}

function insertEE() {
  currentExpression += "e";
  updateDisplay();
}

// ── Display ─────────────────────────────────────────────────────────────────
function updateDisplay() {
  var display = document.getElementById("result");
  if (display) display.value = currentExpression || "0";
}

// ── Theme ────────────────────────────────────────────────────────────────────
function toggleTheme() {
  var body = document.body;
  var btn  = document.getElementById("theme-toggle");
  body.classList.toggle("dark-mode");
  var dark = body.classList.contains("dark-mode");
  if (btn) btn.innerHTML = dark ? "☀️" : "🌙";
  localStorage.setItem("theme", dark ? "dark" : "light");
}

window.addEventListener("DOMContentLoaded", function () {
  var theme = localStorage.getItem("theme");
  var body  = document.body;
  var btn   = document.getElementById("theme-toggle");
  if (theme === "dark") {
    body.classList.add("dark-mode");
    if (btn) btn.innerHTML = "☀️";
  }
});