// Array of quotes
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do not take life too seriously. You will never get out of it alive.", category: "Humor" }
];

// Function to display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  const quoteDiv = document.getElementById("quoteDisplay");
  quoteDiv.textContent = `"${quote.text}" - Category: ${quote.category}`;
}

// Add event listener for "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// Function to dynamically create the Add Quote form
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const inputText = document.createElement("input");
  inputText.setAttribute("id", "newQuoteText");
  inputText.setAttribute("type", "text");
  inputText.setAttribute("placeholder", "Enter a new quote");

  const inputCategory = document.createElement("input");
  inputCategory.setAttribute("id", "newQuoteCategory");
  inputCategory.setAttribute("type", "text");
  inputCategory.setAttribute("placeholder", "Enter quote category");

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  formContainer.appendChild(inputText);
  formContainer.appendChild(inputCategory);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

// Function to add a new quote
function addQuote() {
  const newText = document.getElementById("newQuoteText").value;
  const newCategory = document.getElementById("newQuoteCategory").value;

  if (newText === "" || newCategory === "") {
    alert("Please enter both quote text and category.");
    return;
  }

  // Add to quotes array
  quotes.push({ text: newText, category: newCategory });

  // Clear inputs
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  // Update displayed quote
  displayRandomQuote();
}

// Call this function to dynamically add the form
createAddQuoteForm();

