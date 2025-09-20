import { useState } from "react";
import BookSearch from "./components/BookSearch";
import Favorites from "./components/Favorites";

export default function App({ favorites, toggleFavorite }) {
  
  return (
    <div className="text-gray-900">
      <header className="bg-black text-white py-4 text-center font-bold text-2xl shadow-md">
        Book Finder
      </header>
      <main className="py-8 px-[12.5%] mx-auto">
        <BookSearch toggleFavorite={toggleFavorite} favorites={favorites} />
      </main>
    </div>
  );
}
