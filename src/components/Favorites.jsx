import BookCard from "./BookCard";

export default function Favorites({ favorites, toggleFavorite }) {
  if (favorites.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">⭐ Favorites</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
          />
        ))}
      </div>
    </div>
  );
}
