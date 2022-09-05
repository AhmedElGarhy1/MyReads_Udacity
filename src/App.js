import "./css/App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getAll, update } from "./utils/BooksAPI";

import Home from "./pages/Home";
import Search from "./pages/Search";
function App() {
  const [books, setBooks] = useState([]);
  // get the books from server(backend)
  useEffect(() => {
    getAll().then((books) => setBooks(books));
  }, [setBooks]);

  const changeBook = (book, newShelf) => {
    setBooks((prev) => makeValidMoves(prev, book, newShelf));
  };
  const makeValidMoves = (prev, book, newShelf) => {
    const exist = books.find((b) => b.id === book.id);
    if (book.shelf === newShelf) return prev;
    else if (!exist || exist === "none") {
      book.shelf = newShelf;
      update(book, newShelf);
      return [...prev, book];
    }
    {
      return prev.map((b) => {
        if (b.id === book.id) {
          b.shelf = newShelf;
          update(book, newShelf);
          return b;
        }
        return b;
      });
    }
  };
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<Home changeBook={changeBook} books={books} />}
        />
        <Route path="/search" element={<Search changeBook={changeBook} />} />
      </Routes>
    </div>
  );
}

export default App;
