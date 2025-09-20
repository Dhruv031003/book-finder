import BookCard from "./BookCard";

export default function BookList({ books, toggleFavorite, favorites }) {
  if (!books || books.length === 0) return null;

  return (
    // mapping the books 
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.key}
          book={book}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
        />
      ))}
    </div>
  );
}
