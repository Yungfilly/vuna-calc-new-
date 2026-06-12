// ===============================
// VUNA Calculator — UI Layer
// Babatunde Philip Olutayo
// ===============================

/* global calculateExpression, convertExponent, appendValue,
          backspaceValue, clearExpression, computeSinh */

var currentExpression = "";

// ── Input handlers ──────────────────────────────────────────────────────────
function appendToResult(value) {
  currentExpression = appendValue(currentExpression, value);
  updateDisplay();
}

function operatorToResult(value) {
  var op = (value === "^") ? "**" : value;
  currentExpression = appendValue(currentExpression, op);
  updateDisplay();
}

function insertSinh() {
  currentExpression = appendValue(currentExpression, "Math.sinh(");
  updateDisplay();
}

function insertCloseBracket() {
  currentExpression = appendValue(currentExpression, ")");
  updateDisplay();
}

function backspace() {
  currentExpression = backspaceValue(currentExpression);
  updateDisplay();
}

function clearResult() {
  currentExpression = clearExpression();
  updateDisplay();
}

// ── Evaluate ─────────────────────────────────────────────────────────────────
function calculateResult() {
  if (!currentExpression) return;
  var result = calculateExpression(currentExpression);
  currentExpression = String(result);
  updateDisplay();
}

// ── Display ──────────────────────────────────────────────────────────────────
function updateDisplay() {
  var display = document.getElementById("result");
  if (display) display.value = currentExpression || "0";
}

// ── Theme ─────────────────────────────────────────────────────────────────────
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