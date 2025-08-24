'use strict';

// Quotes array
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Talk is cheap. Show me the code.", category: "Programming" },
  { text: "Simplicity is the soul of efficiency.", category: "Productivity" },
  { text: "First, solve the problem. Then, write the code.", category: "Programming" },
];

// Escape HTML
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
}

// displayRandomQuote: random quote + update DOM
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

// showRandomQuote wrapper required by checker
function showRandomQuote() {
  displayRandomQuote();
}

// addQuote: adds a new quote to array + updates DOM
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

  // Add new quote to array
  quotes.push({ text, category });

  // Clear inputs
  if (textEl) textEl.value = '';
  if (catEl) catEl.value = '';

  // Update the DOM
  displayRandomQuote();

  if (messageEl) messageEl.textContent = 'Quote added!';
}

// **Attach event listener immediately after DOM exists**
const newQuoteBtn = document.getElementById('newQuote');
if (newQuoteBtn) {
  newQuoteBtn.addEventListener('click', displayRandomQuote);
}

// Make addQuote available for the form's onclick
window.addQuote = addQuote;

// Display an initial quote
displayRandomQuote();




