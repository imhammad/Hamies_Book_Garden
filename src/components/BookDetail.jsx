import React from "react";
import { useParams } from "react-router-dom";

const books = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    summary:
      "Bilbo Baggins, a respectable, well-to-do hobbit, lives a comfortable life with no ambitions..."
  },
  {
    title: "A Wizard of Earthsea",
    author: "Ursula K. Le Guin",
    year: 1968,
    summary:
      "The island of Gont is a land of wizards. A boy, Sparrowhawk, is born with a great gift of magic..."
  },
  {
    title: "Good Omens",
    author: "Terry Pratchett and Neil Gaiman",
    year: 1990,
    summary:
      "According to the Nice and Accurate Prophecies of Agnes Nutter, Witch, the world is going to end..."
  },
  {
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    year: 1996,
    summary:
      "In a land where summers can last for decades and winters a lifetime, trouble is brewing..."
  }
];

const BookDetail = () => {
  const { id } = useParams();
  const book = books[id];

  if (!book) return <div className="text-white p-8">Book not found.</div>;

  return (
    <div className="text-white p-8 bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p className="mb-2"><strong>Author:</strong> {book.author}</p>
      <p className="mb-2"><strong>Publishing Year:</strong> {book.year}</p>
      <p className="mt-4">{book.summary}</p>
    </div>
  );
};

export default BookDetail;
