import React, { useState, useRef } from "react";
import PorpTypes from "prop-types";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import Book from "../components/Book";
import { search } from "../utils/BooksAPI";

const Search = ({ changeBook }) => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  // debounce to send the query after some seconds
  const debouncedSearch = useRef(
    debounce(
      (value) =>
        search(value.trim(), 10).then((books) => {
          if (books.error) {
            setBooks([]);
            return setError(true);
          }
          setBooks(books);
        }),
      400
    )
  ).current;
  const filter = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (!value) return setBooks([]);
    setError(false);
    debouncedSearch(value);
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
          {books &&
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
};

export default Search;
