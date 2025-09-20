import { Link } from "react-router-dom";

export default function BookCard({ book, toggleFavorite, favorites }) {

  // fallback default url for missing book cover image 
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://images.unsplash.com/photo-1529590003495-b2646e2718bf?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  // find if the book is in favorites
  const isFav = favorites.some((b) => b.key === book.key);

  // extract id of the book from object 
  const workId = book.key.replace("/works/", "");

  return (
    <Link to={`/book/${workId}`}>
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full scale-100 hover:scale-105">
      <img src={coverUrl} alt={book.title} className="h-64 object-fit w-full" />
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-bold text-lg">{book.title}</h3>
        <p className="text-sm text-gray-600">
          {book.author_name?.join(", ") || "Unknown Author"}
        </p>
        <p className="text-xs text-gray-500 mt-auto">
          Year: {book.first_publish_year || "N/A"}
        </p>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(book)
          }}
          className={`mt-3 px-3 py-1 rounded-lg text-sm scale-100 hover:scale-105 ${
            isFav ? "bg-red-500 text-white" : "bg-blue-500 text-white"
          }`}
        >
          {isFav ? "Remove" : "Add to Favorites"}
        </button>
      </div>
    </div>
    </Link>   
  );
}
