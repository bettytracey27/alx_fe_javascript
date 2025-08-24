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

// Display a random quote (filtered if applicable)
function displayRandomQuote() {
  let filtered = getFilteredQuotes();
  if (!filtered.length) return;

  const index = Math.floor(Math.random() * filtered.length);
  const quote = filtered[index];

  const display = document.getElementById('quoteDisplay');
  if (!display) return;

  display.innerHTML = `
    <div>
      <p class="quote-text">"${escapeHtml(quote.text)}"</p>
      <p class="quote-category">— <span>${escapeHtml(quote.category)}</span></p>
    </div>
  `;

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
  saveQuotes();
  populateCategories();
  filterQuotes();

  if (textEl) textEl.value = '';
  if (catEl) catEl.value = '';

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
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        quotes.push(...imported);
        saveQuotes();
        populateCategories();
        filterQuotes();
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

// Get quotes filtered by category
function getFilteredQuotes() {
  const filterEl = document.getElementById('categoryFilter');
  const selected = filterEl?.value || 'all';
  return selected === 'all' ? quotes : quotes.filter(q => q.category === selected);
}

// Filter quotes and save selected category
function filterQuotes() {
  const filtered = getFilteredQuotes();
  const display = document.getElementById('quoteDisplay');

  if (!display) return;

  if (!filtered.length) {
    display.innerHTML = `<p>No quotes found for this category.</p>`;
    return;
  }

  const index = Math.floor(Math.random() * filtered.length);
  const quote = filtered[index];

  display.innerHTML = `
    <div>
      <p class="quote-text">"${escapeHtml(quote.text)}"</p>
      <p class="quote-category">— <span>${escapeHtml(quote.category)}</span></p>
    </div>
  `;

  const filterEl = document.getElementById('categoryFilter');
  if (filterEl) localStorage.setItem('lastCategory', filterEl.value);
}

// Populate category dropdown
function populateCategories() {
  const filterEl = document.getElementById('categoryFilter');
  if (!filterEl) return;

  const lastSelected = localStorage.getItem('lastCategory') || 'all';
  const uniqueCats = [...new Set(quotes.map(q => q.category))];

  filterEl.innerHTML = '<option value="all">All Categories</option>';
  uniqueCats.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    filterEl.appendChild(option);
  });

  filterEl.value = lastSelected;
}

// Event listeners
document.getElementById('newQuote')?.addEventListener('click', displayRandomQuote);
document.getElementById('exportQuotes')?.addEventListener('click', exportToJsonFile);
window.addQuote = addQuote;

// Initialize
populateCategories();
filterQuotes();







