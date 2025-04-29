/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useState, useEffect } from "react";

import BookCard from "./BookCard";
import SearchBar from "./SearchBar";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
        );
        const data = await res.json();

        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }, [searchTerm, books]);

  return (
    <div className="homePage">
      <h1 className="homeTitle">let's find some books</h1>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="bookGrid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              setSelectedBook={setSelectedBook}
            />
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
}
