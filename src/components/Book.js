import React, { useState } from "react";
import PorpTypes from "prop-types";
const Book = ({ book, changeBook }) => {
  const [localShelf, setLocalShelf] = useState(book.shelf);
  const handleChange = (event) => {
    const shelf = event.target.value;
    setLocalShelf(shelf);
    changeBook(book, shelf);
  };
  const shelves = [
    { name: "Currently Reading", value: "currentlyReading" },
    { name: "Want to Read", value: "wantToRead" },
    { name: "Read", value: "read" },
    { name: "None", value: "none" },
  ];
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            background: `url("${
              book.imageLinks && book.imageLinks.thumbnail
            }")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select value={localShelf || "none"} onChange={handleChange}>
            <option disabled>Move to...</option>
            {shelves.map((shelve, i) => (
              <option key={i} value={shelve.value}>
                {shelve.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors && book.authors.join(" | ")}
      </div>
    </div>
  );
};

Book.porpTypes = {
  book: PorpTypes.object.isRequired,
  changeBook: PorpTypes.func.isRequired,
};

export default Book;
