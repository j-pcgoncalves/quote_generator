const quoteContainer = document.getElementById("quote_container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new_quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if author field is blank and replace it with "Unknown"
    authorText.textContent = !quote.author ? "Unknown" : quote.author;

    // Check Quote length to determine styling
    if (quote.text.length > 50) {
        quoteText.classList.add("long_quote");
    } else {
        quoteText.classList.remove("long_quote");
    }

    quoteText.textContent = quote.text;

    // Hide Loader
    complete();
};

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (err) {
        // Catch Error Here
    }
};

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();