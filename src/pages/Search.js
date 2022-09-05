import React, { useState, useRef } from "react";
import PorpTypes from "prop-types";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import Book from "../components/Book";
import { search } from "../utils/BooksAPI";

const Search = ({ changeBook, homeBooks }) => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  // debounce to send the query after some seconds
  const debouncedSearch = useRef(
    debounce(
      (value, homeBooks) =>
        search(value.trim(), 10).then((searchBooks) => {
          if (searchBooks.error) {
            setBooks([]);
            return setError(true);
          }
          searchBooks = searchBooks.map((book) => {
            return (
              homeBooks.find((homeBook) => homeBook.id === book.id) || book
            );
          });
          setBooks(searchBooks);
        }),
      400
    )
  ).current;
  const filter = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (!value) return setBooks([]);
    setError(false);
    debouncedSearch(value, homeBooks);
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>

        <div className="search-books-input-wrapper">
          <input
            value={query}
            onChange={filter}
            type="text"
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {error && <div>Can't Find any Book</div>}
          {!error &&
            books &&
            books.map((book) => (
              <li key={book.id}>
                <Book book={book} changeBook={changeBook} />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

Search.porpTypes = {
  changeBook: PorpTypes.func.isRequired,
  homeBooks: PorpTypes.array.isRequired,
};

export default Search;
