/**
 * Lecture 11 — Book Reading List Application
 * Author: Rohit Ahir
 * Features:
 * - Add new book with title, author, and reading status
 * - Toggle reading status (Completed / Reading / Want to Read)
 * - Delete book with confirmation/cleanup
 * - Live dynamic search by title or author
 * - Tab-based status filtering (All, Want to Read, Reading, Completed)
 * - Real-time statistics counters
 * - Browser LocalStorage persistence
 */

const STORAGE_KEY = "lecture11_books_ayan";

const DEFAULT_BOOKS = [
    {
        id: "book-1",
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        status: "Completed",
        createdAt: 1729000000000
    },
    {
        id: "book-2",
        title: "Automate the Boring Stuff with Python",
        author: "Al Sweigart",
        status: "Completed",
        createdAt: 1729100000000
    },
    {
        id: "book-3",
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        status: "Currently Reading",
        createdAt: 1729200000000
    },
    {
        id: "book-4",
        title: "Introduction to Algorithms (CLRS)",
        author: "Thomas H. Cormen",
        status: "Want to Read",
        createdAt: 1729300000000
    }
];

// App State
let books = [];
let currentFilter = "all";
let currentSearch = "";

// DOM Elements
const bookForm = document.getElementById("book-form");
const titleInput = document.getElementById("book-title");
const authorInput = document.getElementById("book-author");
const statusInput = document.getElementById("book-status");
const searchInput = document.getElementById("search-input");
const filterTabs = document.querySelectorAll(".tab-btn");
const booksContainer = document.getElementById("books-container");
const emptyState = document.getElementById("empty-state");
const shownCount = document.getElementById("shown-count");

// Stats Elements
const statTotal = document.getElementById("stat-total");
const statCompleted = document.getElementById("stat-completed");
const statReading = document.getElementById("stat-reading");
const statWishlist = document.getElementById("stat-wishlist");

function loadBooks() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            books = JSON.parse(stored);
        } else {
            books = [...DEFAULT_BOOKS];
            saveBooks();
        }
    } catch (e) {
        console.error("Failed to load books from localStorage:", e);
        books = [...DEFAULT_BOOKS];
    }
}

function saveBooks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch (e) {
        console.error("Failed to save books to localStorage:", e);
    }
    updateStats();
}

function updateStats() {
    const total = books.length;
    const completed = books.filter(b => b.status === "Completed").length;
    const reading = books.filter(b => b.status === "Currently Reading").length;
    const wishlist = books.filter(b => b.status === "Want to Read").length;

    if (statTotal) statTotal.textContent = total;
    if (statCompleted) statCompleted.textContent = completed;
    if (statReading) statReading.textContent = reading;
    if (statWishlist) statWishlist.textContent = wishlist;
}

function getBadgeClass(status) {
    if (status === "Completed") return "badge-completed";
    if (status === "Currently Reading") return "badge-reading";
    return "badge-wishlist";
}

function renderBooks() {
    const query = currentSearch.trim().toLowerCase();
    
    const filtered = books.filter(book => {
        const matchesFilter = currentFilter === "all" || book.status === currentFilter;
        const matchesQuery = !query || 
            book.title.toLowerCase().includes(query) || 
            book.author.toLowerCase().includes(query);
        return matchesFilter && matchesQuery;
    });

    booksContainer.innerHTML = "";

    if (shownCount) {
        shownCount.textContent = `Showing ${filtered.length} of ${books.length} books`;
    }

    if (filtered.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
        filtered.forEach(book => {
            const card = document.createElement("article");
            card.className = `book-card ${book.status === "Completed" ? "is-completed" : ""}`;
            card.dataset.id = book.id;

            const nextStatus = book.status === "Completed" ? "Want to Read" : "Completed";
            const toggleIcon = book.status === "Completed" ? "&#8635; Mark Unread" : "&#10003; Mark Completed";

            card.innerHTML = `
                <div class="book-info">
                    <h3 class="book-title">${escapeHTML(book.title)}</h3>
                    <p class="book-author">
                        by <span>${escapeHTML(book.author)}</span>
                        <span class="status-badge ${getBadgeClass(book.status)}">${book.status}</span>
                    </p>
                </div>
                <div class="book-actions">
                    <button type="button" class="btn-icon btn-toggle-read" title="Change status to ${nextStatus}">
                        ${toggleIcon}
                    </button>
                    <button type="button" class="btn-icon btn-delete" title="Delete book">
                        &#128465; Delete
                    </button>
                </div>
            `;

            // Event listeners
            const toggleBtn = card.querySelector(".btn-toggle-read");
            toggleBtn.addEventListener("click", () => toggleBookStatus(book.id));

            const deleteBtn = card.querySelector(".btn-delete");
            deleteBtn.addEventListener("click", () => deleteBook(book.id));

            booksContainer.appendChild(card);
        });
    }
}

function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function addBook(title, author, status) {
    const newBook = {
        id: "book-" + Date.now(),
        title: title.trim(),
        author: author.trim(),
        status: status,
        createdAt: Date.now()
    };
    books.unshift(newBook);
    saveBooks();
    renderBooks();
}

function toggleBookStatus(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;
    
    if (book.status === "Completed") {
        book.status = "Want to Read";
    } else {
        book.status = "Completed";
    }
    
    saveBooks();
    renderBooks();
}

function deleteBook(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;
    
    if (confirm(`Remove "${book.title}" from your reading list?`)) {
        books = books.filter(b => b.id !== id);
        saveBooks();
        renderBooks();
    }
}

// Event Listeners
bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const status = statusInput.value;

    if (!title || !author) return;

    addBook(title, author, status);
    bookForm.reset();
    statusInput.value = "Want to Read";
    titleInput.focus();
});

searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderBooks();
});

filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        filterTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        currentFilter = tab.dataset.filter;
        renderBooks();
    });
});

// Initialization
loadBooks();
updateStats();
renderBooks();
