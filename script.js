const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn= document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let quotes = [];


// Show New Quote
function newQuote() {
    // Pick a random quote from apiQuotes array
    const quote = quotes[Math.floor(Math.random() *  quotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) { // same as quote.author === null
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
}



/*
If fetch request works, get Quote from API.
If fetch request does not work, get quote from local Quotes (see: quote.js)
*/
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        quotes = await response.json();
        newQuote();
    } catch (error) {
        quotes = localQuotes.map(localQuote => localQuote);
        newQuote();
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();