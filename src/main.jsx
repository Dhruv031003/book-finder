import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Book from "./components/Book";
import "./index.css";
import { useState } from "react";

const Root=() => {

  //favorite books 
  const [favorites, setFavorites] = useState([]);
  
  //function to toggle(add/remove) a book from favorites list 
  const toggleFavorite = (book) => {
    setFavorites((prev) => {
      const exists = prev.some((b) => b.key === book.key);
      return exists ? prev.filter((b) => b.key !== book.key) : [...prev, book];
    });
  };

  //paths
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App favorites={favorites} toggleFavorite={toggleFavorite}/>,
    },
    {
      path: "/book/:id",
      element: <Book favorites={favorites} toggleFavorite={toggleFavorite}/>,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root></Root>);
