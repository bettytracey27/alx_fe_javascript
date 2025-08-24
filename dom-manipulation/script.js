'use strict';

let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Talk is cheap. Show me the code.", category: "Programming" },
  { text: "Simplicity is the soul of efficiency.", category: "Productivity" },
  { text: "First, solve the problem. Then, write the code.", category: "Programming" },
];

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
}

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Display a random quote
function displayRandomQuote() {
  const filtered = getFilteredQuotes();
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

function showRandomQuote() {
  displayRandomQuote();
}

// Add quote
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

  textEl.value = '';
  catEl.value = '';

  if (messageEl) messageEl.textContent = 'Quote added!';
}

// Export
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

// Import
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

// Filter helpers
function getFilteredQuotes() {
  const filterEl = document.getElementById('categoryFilter');
  const selected = filterEl?.value || 'all';
  return selected === 'all' ? quotes : quotes.filter(q => q.category === selected);
}

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

// --- Task 3: Server Sync Simulation ---

async function fetchQuotesFromServer() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const data = await response.json();

    // Convert to quote format
    const serverQuotes = data.map(item => ({
      text: item.title,
      category: "Server"
    }));

    return serverQuotes;
  } catch (err) {
    console.error("Error fetching server data:", err);
    return [];
  }
}

async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  let newQuotesAdded = false;

  serverQuotes.forEach(sq => {
    // Conflict resolution: skip if text already exists
    if (!quotes.some(lq => lq.text === sq.text)) {
      quotes.push(sq);
      newQuotesAdded = true;
    }
  });

  if (newQuotesAdded) {
    saveQuotes();
    populateCategories();
    filterQuotes();

    const serverMsg = document.getElementById('serverMessage');
    if (serverMsg) serverMsg.textContent = "New quotes synced from server!";
    setTimeout(() => { if (serverMsg) serverMsg.textContent = ""; }, 5000);
  }
}

// Periodic sync every 30 seconds
setInterval(syncQuotes, 30000);

// --- Event listeners ---
document.getElementById('newQuote')?.addEventListener('click', displayRandomQuote);
document.getElementById('exportQuotes')?.addEventListener('click', exportToJsonFile);
window.addQuote = addQuote;

// Initialize
populateCategories();
filterQuotes();
syncQuotes(); // initial sync








