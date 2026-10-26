# Book Reading List Application

A responsive, client-side Book Reading List web application developed for **Lecture 11** coursework at JECRC University by **Rohit Ahir**.

## Live Application
- **Live Deployment**: [tps://ayankhanbebea-lgtm.github.io/book-reading-list-application/](https://ayahtnkhanbebea-lgtm.github.io/book-reading-list-application/)

---

## Project Overview
This application helps students and developers curate, organize, and monitor their reading journeys. It features a complete CRUD workflow (Create, Read, Update, Delete), real-time search, multi-status filtering, live statistical indicators, and automatic client-side persistence through the browser's `localStorage` API.

### Key Features
1. **Add Books**: Form inputs for Book Title, Author, and Initial Reading Status.
2. **Reading Status Lifecycle**:
   - `Want to Read`
   - `Currently Reading`
   - `Completed`
3. **Toggle Status**: Quick action button to cycle or mark books as completed/unread.
4. **Delete Books**: Clean removal of books with user verification.
5. **Real-Time Dynamic Search**: Instant client-side filtering matching keywords across titles or authors.
6. **Multi-Status Filter Tabs**: Tabbed navigation isolating all books, completed books, currently reading books, or wishlisted books.
7. **Reading Progress Counters**: Aggregate statistics card displaying total books, completed items, active reads, and wishlisted titles.
8. **Client-Side Persistence**: Synchronizes changes with the browser's `localStorage` so data remains saved across browser refreshes.
9. **Responsive & Accessible UI**: Clean academic layout optimized for mobile screens, tablets, and desktops.

---

## Technologies Used
- **HTML5**: Semantic elements (`<header>`, `<main>`, `<section>`, `<article>`, `<form>`).
- **CSS3**: CSS Custom Properties (variables), CSS Grid, Flexbox, responsive typography, and state styling.
- **JavaScript (ES6+)**: Event listeners, array operations (`filter`, `map`, `unshift`), DOM manipulation, and Web Storage API (`localStorage`).

---

## Local Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/ayankhanbebea-lgtm/book-reading-list-application.git
   ```
2. Navigate into the project directory:
   ```bash
   cd book-reading-list-application
   ```
3. Open `index.html` in your web browser:
   ```bash
   # On Windows:
   start index.html
   ```

---

## Author
- **Rohit Ahir**
- Department of Computer Science & Engineering, JECRC University
- GitHub: [@rpahir2503-star ](https://github.com/rpahir2503-star)
