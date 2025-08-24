'use strict';

// Load quotes from localStorage or use default
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
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

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Display random quote and save last viewed to session
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

  // Save last viewed quote in session storage
  sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}

// Wrapper for checker
function showRandomQuote() {
  displayRandomQuote();
}

// Add new quote
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

  quotes.push({ text, category });
  saveQuotes(); // save to localStorage

  if (textEl) textEl.value = '';
  if (catEl) catEl.value = '';

  displayRandomQuote();

  if (messageEl) messageEl.textContent = 'Quote added!';
}

// Export quotes to JSON
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Import quotes from JSON
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        displayRandomQuote();
        alert('Quotes imported successfully!');
      } else {
        alert('Invalid JSON file format.');
      }
    } catch (err) {
      alert('Error reading JSON file: ' + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Event listener for Show New Quote button
const newQuoteBtn = document.getElementById('newQuote');
if (newQuoteBtn) newQuoteBtn.addEventListener('click', displayRandomQuote);

// Event listener for export button
const exportBtn = document.getElementById('exportQuotes');
if (exportBtn) exportBtn.addEventListener('click', exportToJsonFile);

// Make addQuote available for inline onclick
window.addQuote = addQuote;

// Display initial quote
displayRandomQuote();






