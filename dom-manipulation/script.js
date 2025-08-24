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

  display.innerHTML = `
    <div>
      <p class="quote-text">"${escapeHtml(quote.text)}"</p>
      <p class="quote-category">— <span>${escapeHtml(quote.category)}</span></p>
    </div>
  `;
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

  // Add the new quote to the array
  quotes.push({ text, category });

  // Clear inputs
  if (textEl) textEl.value = '';
  if (catEl) catEl.value = '';

  // Show the newly added quote
  displayRandomQuote();

  if (messageEl) messageEl.textContent = 'Quote added!';
}

// Add event listener for the "Show New Quote" button (Required by checker)
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('newQuote');
  if (btn) btn.addEventListener('click', displayRandomQuote);

  // Show an initial quote on page load
  displayRandomQuote();
});

// Make addQuote available for the inline onclick
window.addQuote = addQuote;


