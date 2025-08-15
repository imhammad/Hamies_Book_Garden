import React from "react";
import { Link } from "react-router-dom";
import BookDetail from "./BookDetail";
import GradientButton from "./GradientButton";


const books = [
  // Fantasy

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
  },
  
  // Science Fiction

  {
    title: "Dune",
    author: "Frank Herbert",
    year: 1965,
    image: "/images/dune.png",
    summary:
      "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family given control of the planet. As Paul and his family are betrayed, they must flee into the desert and find refuge among the Fremen, Arrakis' native inhabitants. Paul will learn to harness his unique gifts to rise up and challenge the galactic empire, all while dealing with the political and religious machinations surrounding 'the spice,' the most valuable substance in the universe."
  },
  {
    title: "Nineteen Eighty-Four",
    author: "George Orwell",
    year: 1949,
    image: "/images/1984.png",
    summary:
      "The year is 1984. The world is divided into three totalitarian superstates, Oceania, Eurasia, and Eastasia. Winston Smith, a low-ranking member of the ruling Party in London, lives a miserable existence, constantly watched by the telescreens and the Thought Police. He harbors a secret hatred for the Party and dreams of rebellion, a dream that leads him down a dangerous path that may cost him everything."
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    year: 1979,
    image: "/images/hitchhiker.jpg",
    summary:
      "Arthur Dent's day goes from bad to worse when his home is demolished to make way for a new bypass. Seconds later, Earth is demolished to make way for a new hyperspace bypass. Arthur is saved by his friend Ford Prefect, a researcher for the titular guide, and the two embark on a surreal and hilarious journey through space, encountering a variety of bizarre aliens and existential questions."
  },
  {
    title: "Do Androids Dream of Electric Sheep?",
    author: "Philip K. Dick",
    year: 1968,
    image: "/images/android.jpg",
    summary:
      "In a post-apocalyptic San Francisco, bounty hunter Rick Deckard is tasked with 'retiring' rogue androids who have escaped from Mars. But as he hunts down a group of advanced androids, he begins to question what it means to be human and what separates man from machine."
  },

  //  Romance Category

    {
    title: "It Ends With Us",
    author: "Colleen Hoover",
    year: 2016,
    image: "/images/EndsWithUs.png",
    summary:
      "Lily Bloom has always admired her parents' enduring love, despite growing up in a home filled with domestic violence. After moving to Boston and starting her own business, she meets a charming neurosurgeon named Ryle Kincaid. Their connection is instant and intense, but his aversion to relationships and her own painful past make things complicated. When her first love, Atlas Corrigan, unexpectedly re-enters her life, Lily is forced to confront the difficult truths of her past and present and make an impossible choice about her future."
  },
  
];

      

const BookGrid = () => {
  return (
    <>
    <GradientButton />
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
  </>
  );
};

export default BookGrid;
