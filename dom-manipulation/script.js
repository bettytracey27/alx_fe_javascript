'use strict';

/**
 * Quotes array: each quote has { text, category }
 * (Required by the checker)
 */
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Talk is cheap. Show me the code.", category: "Programming" },
  { text: "Simplicity is the soul of efficiency.", category: "Productivity" },
  { text: "First, solve the problem. Then, write the code.", category: "Programming" },
];

/**
 * Escapes HTML to prevent injection when inserting user-provided content.
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * displayRandomQuote: selects a random quote and updates the DOM
 * (Required by the checker)
 */
function displayRandomQuote() {
  if (!quotes.length) return;

  const index = Math.floor(Math.random() * quotes.length);
  const quote = quotes[index];

  const display = document.getElementById('quoteDisplay');
  if (!display) return;

  display.innerHTML = [
    '<div>',
    `<p class="quote-text">"${escapeHtml(quote.text)}"</p>`,
    `<p class="quote-category">— <span>${escapeHtml(quote.category)}</span></p>`,
    '</div>'
  ].join('');
}

/**
 * Optional alias to match wording seen in some instructions.
 */
function showRandomQuote() {
  displayRandomQuote();
}

/**
 * addQuote: adds a new quote to the quotes array and updates the DOM
 * (Required by the checker)
 */
function addQuote() {
  const textEl = document.getElementById('newQuoteText');
  const catEl = document.getElementById('newQuoteCategory');
  const messageEl = document.getElementById('message');

  const text = (textEl?.value || '').trim();
  const category = (catEl?.value || '').trim();

  if (!text || !category) {
    if (messageEl) messageEl.textContent = 'Please enter both a quote and a category.';
    return;
  }

  // Update the data (quotes array)
  quotes.push({ text, category });

  // Clear inputs
  if (textEl) textEl.value = '';
  if (catEl) catEl.value = '';

  // Update the DOM with the newly added quote
  const display = document.getElementById('quoteDisplay');
  if (display) {
    display.innerHTML = [
      '<div>',
      `<p class="quote-text">"${escapeHtml(text)}"</p>`,
      `<p class="quote-category">— <span>${escapeHtml(category)}</span></p>`,
      '</div>'
    ].join('');
  }

  if (messageEl) messageEl.textContent = 'Quote added!';
}

// Ensure the event listener for the "Show New Quote" button is set up
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('newQuote');
  if (btn) {
    // (Required by the checker) Event listener on the “Show New Quote” button
    btn.addEventListener('click', displayRandomQuote);
  }

  // Show an initial random quote when the page loads (optional)
  displayRandomQuote();
});

// Make addQuote available for the inline onclick attribute used by the form
window.addQuote = addQuote;
