import React from "react";
import Book from "./Book";
import PorpTypes from "prop-types";

const Shelf = ({ books, shelfName, changeBook }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books"></div>
      <ol className="books-grid">
        {books.length > 0 &&
          books.map((book) => (
            <li key={book.id}>
              <Book book={book} changeBook={changeBook} />
            </li>
          ))}
      </ol>
    </div>
  );
};
Shelf.porpTypes = {
  books: PorpTypes.array.isRequired,
  shelfName: PorpTypes.string.isRequired,
  changeBook: PorpTypes.func.isRequired,
};
export default Shelf;
