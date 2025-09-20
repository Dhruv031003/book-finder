import { useState,useEffect } from "react";
import axios from "axios";
import BookList from "./BookList";
import Favorites from "./Favorites";

export default function BookSearch({ toggleFavorite, favorites }) {

  //search input
  const [query, setQuery] = useState("");
  
  //list of searched books from api
  const [books, setBooks] = useState([]);
  //page of the api
  const [page, setPage] = useState(1);

  //rerender page when page value changes
useEffect(() => {
  searchBooks(false);
}, [page]);

//load more books
const loadMore = () => {
  setPage((prev) => prev + 1);
};


  const [loading, setLoading] = useState(false);

  //func to hit api endpoint using book name, author name or ISBN code
  const searchBooks = async (reset = true) => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}`
      );
      if (reset) {
        setBooks(res.data.docs);
      } else {
        setBooks((prev) => [...prev, ...res.data.docs]);
      }
    } catch (error) {
      console.error("Error fetching books", error);
    } finally {
      setLoading(false);
    }
  };

  //handle form input
  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    //to reset the search result to empty and load new results
    searchBooks(true);
  };


  return (
    <div>
      {/* Input box */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 mb-6"
      >
        <input
          type="text"
          placeholder="Search by title, author, ISBN..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>
{/* Favorite books */}
      <Favorites favorites={favorites} toggleFavorite={toggleFavorite} />

      {loading && <p className="text-center pt-8">Loading...</p>}
            
      {!loading && books.length===0 && <h2 className="text-xl text-center py-6">No Search Results</h2>}
      
      {/* Search results of query */}
      {books.length!==0 && <h2 className="text-xl font-bold py-6">Search Results</h2>}
      <BookList books={books} toggleFavorite={toggleFavorite} favorites={favorites} />

      {/* load more button */}
      {books.length > 0 && !loading && (
        <div className="text-center mt-4">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700 scale-100 hover:scale-105"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
