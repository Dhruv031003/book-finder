import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Book({ favorites, toggleFavorite }) {

  // extract id of book from paramater 
  const { id } = useParams(); // just the work id e.g. "OL12345W"
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // find book details from api
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://openlibrary.org/works/${id}.json`);
        setBook(res.data);
        document.title=res.data.title
      } catch (error) {
        console.error("Error fetching book details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!book) return <p className="text-center">Book not found.</p>;

 const isFav = favorites.some((b) => b.key === `/works/${id}`);

  const coverUrl = book.covers
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : "https://images.unsplash.com/photo-1529590003495-b2646e2718bf?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="bg-white p-6 rounded-lg">
      <Link to="/" className="text-blue-600 underline">
        ← Back to search
      </Link>

      <div className="flex flex-col md:flex-row gap-6 mt-4">
        <img src={coverUrl} alt={book.title} className="w-64 h-72 object-fit" />

        <div>
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p className="text-gray-600 mt-2">
            {book.description?.value || book.description || "No description available."}
          </p>
          <p className="mt-3">
            <strong>First Published:</strong> {book.first_publish_date || "N/A"}
          </p>
          {book.subjects && (
            <p className="mt-2">
              <strong>Subjects:</strong> {book.subjects.slice(0, 5).join(", ")}
            </p>
          )}
          <button
            onClick={() =>
              toggleFavorite({
                key: `/works/${id}`,
                title: book.title,
                author_name: book.authors?.map((a) => a.name),
                cover_i: book.covers ? book.covers[0] : null,
                first_publish_year: book.first_publish_date,
              })
            }
            className={`mt-6 px-4 py-2 rounded-lg font-medium ${
              isFav ? "bg-red-500 text-white" : "bg-blue-500 text-white"
            }`}
          >
            {isFav ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}
