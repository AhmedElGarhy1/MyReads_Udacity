import React, { useState, useEffect } from "react";
import PorpTypes from "prop-types";
import Shelf from "../components/Shelf";
import { Link } from "react-router-dom";

const Home = ({ books, changeBook }) => {
  const [reading, setReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);

  //put the books in the right shelf
  useEffect(() => {
    setReading(books.filter((book) => book.shelf === "currentlyReading"));
    setWantToRead(books.filter((book) => book.shelf === "wantToRead"));
    setRead(books.filter((book) => book.shelf === "read"));
  }, [books, setReading, setWantToRead, setRead]);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <Shelf
        books={reading}
        changeBook={changeBook}
        shelfName="Currently Reading"
      />
      <Shelf
        books={wantToRead}
        changeBook={changeBook}
        shelfName="Want to Read Books"
      />
      <Shelf books={read} changeBook={changeBook} shelfName="Read" />
      <div className="open-search">
        <Link to="/search">Add a Book</Link>
      </div>
    </div>
  );
};

Home.propTypes = {
  books: PorpTypes.array.isRequired,
  changeBook: PorpTypes.func.isRequired,
};

export default Home;
