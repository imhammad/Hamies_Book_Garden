import React from "react";
import { Link } from "react-router-dom";

const books = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    image: "/images/hobbit.jpg",
    summary:
      "Bilbo Baggins, a respectable, well-to-do hobbit, lives a comfortable life..."
  },
  {
    title: "A Wizard of Earthsea",
    author: "Ursula K. Le Guin",
    year: 1968,
    image: "/images/earthsea.webp",
    summary:
      "The island of Gont is a land of wizards. A boy, Sparrowhawk, is born..."
  },
  {
    title: "Good Omens",
    author: "Terry Pratchett and Neil Gaiman",
    year: 1990,
    image: "/images/omens.jpg",
    summary:
      "According to the Nice and Accurate Prophecies of Agnes Nutter..."
  },
  {
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    year: 1996,
    image: "/images/thrones.jpg",
    summary:
      "In a land where summers can last for decades and winters a lifetime..."
  }
];

const BookGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 p-8 bg-black text-white">
      {books.map((book, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-2xl shadow-lg group bg-gray-900 w-full max-w-[240px] mx-auto"
        >
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-[360px] object-cover group-hover:brightness-75 transition duration-300"
          />
          <div className="p-4 text-center font-semibold text-lg">
            {book.title}
          </div>
          <div className="absolute bottom-[-50px] left-0 w-full flex justify-center transition-all duration-300 group-hover:bottom-4">
            <Link
              to={`/book/${index}`}
              className="bg-white text-black font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-200"
            >
              Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookGrid;
