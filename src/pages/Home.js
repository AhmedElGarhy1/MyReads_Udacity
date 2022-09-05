import React, { useState, useEffect } from "react";
import PorpTypes from "prop-types";
import Shelf from "../components/Shelf";
import { Link } from "react-router-dom";

const Home = ({ read, reading, wantToRead, changeBook }) => {
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
  changeBook: PorpTypes.func.isRequired,
  read: PorpTypes.array.isRequired,
  reading: PorpTypes.array.isRequired,
  wantToRead: PorpTypes.array.isRequired,
};

export default Home;
