import React from "react";
import { useParams } from "react-router-dom";
import ReviewSystem from "./ReviewSystem";

const books = [
  // Fantasy
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    summary:
      "Bilbo Baggins, a respectable, well-to-do hobbit, lives a comfortable life with no ambitions. But his contentment is disturbed when the wizard Gandalf and a company of thirteen dwarves arrive on his doorstep one day to whisk him away on an unexpected adventure. They have a plan to raid the treasure hoard of Smaug the Magnificent, a large and very dangerous dragon. Bilbo reluctantly joins them and is soon caught up in a quest to the Lonely Mountain, a quest that will change his life and that of all Middle-earth forever."
  },
  {
    title: "A Wizard of Earthsea",
    author: "Ursula K. Le Guin",
    year: 1968,
    summary:
      "The island of Gont is a land of wizards. A boy, Sparrowhawk, is born with a great gift of magic. He is arrogant and wants to be the greatest wizard of all time. But he is still a boy, and in his youthful pride, he casts a spell that accidentally summons a terrible shadow-creature from the world of the dead. Now, to save his people, he must go on a perilous quest to find the creature and defeat it, a quest that will take him across the world."
  },
  {
    title: "Good Omens",
    author: "Terry Pratchett and Neil Gaiman",
    year: 1990,
    summary:
      "According to the Nice and Accurate Prophecies of Agnes Nutter, Witch, the world is going to end next Saturday, just after tea. So a fussy angel and a loose-living demon, who have come to rather like Earth, form an unlikely alliance to prevent the apocalypse. But they’ve misplaced the Antichrist—an 11-year-old boy named Adam Young—and must find him before it’s too late."
  },
  {
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    year: 1996,
    summary:
      "In a land where summers can last for decades and winters a lifetime, trouble is brewing. The cold is returning, and in the frozen wastes to the north of Winterfell, sinister and supernatural forces are massing beyond the Wall. At the center of the conflict lie the Starks of Winterfell, a family as harsh and unyielding as the land itself."
  },

  // Science Fiction

    {
    title: "Dune",
    author: "Frank Herbert",
    year: 1965,
    summary:
      "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family given control of the planet. As Paul and his family are betrayed, they must flee into the desert and find refuge among the Fremen, Arrakis' native inhabitants. Paul will learn to harness his unique gifts to rise up and challenge the galactic empire, all while dealing with the political and religious machinations surrounding 'the spice,' the most valuable substance in the universe."
  },
  {
    title: "Nineteen Eighty-Four",
    author: "George Orwell",
    year: 1949,
    summary:
      "The year is 1984. The world is divided into three totalitarian superstates, Oceania, Eurasia, and Eastasia. Winston Smith, a low-ranking member of the ruling Party in London, lives a miserable existence, constantly watched by the telescreens and the Thought Police. He harbors a secret hatred for the Party and dreams of rebellion, a dream that leads him down a dangerous path that may cost him everything."
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    year: 1979,
    summary:
      "Arthur Dent's day goes from bad to worse when his home is demolished to make way for a new bypass. Seconds later, Earth is demolished to make way for a new hyperspace bypass. Arthur is saved by his friend Ford Prefect, a researcher for the titular guide, and the two embark on a surreal and hilarious journey through space, encountering a variety of bizarre aliens and existential questions."
  },
  {
    title: "Do Androids Dream of Electric Sheep?",
    author: "Philip K. Dick",
    year: 1968,
    summary:
      "In a post-apocalyptic San Francisco, bounty hunter Rick Deckard is tasked with 'retiring' rogue androids who have escaped from Mars. But as he hunts down a group of advanced androids, he begins to question what it means to be human and what separates man from machine."
  }

];

const BookDetail = () => {
  const { id } = useParams();
  const book = books[id];

  if (!book) return <div className="text-white p-8">Book not found.</div>;

  return (
    <div className="bg-black text-white min-h-screen p-8 flex gap-8">
      {/* Left Side - Book Info */}
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
        <p className="mb-2"><strong>Author:</strong> {book.author}</p>
        <p className="mb-2"><strong>Publishing Year:</strong> {book.year}</p>
        <p className="mt-4">{book.summary}</p>
      </div>

      {/* Right Side - Reviews */}
      <div className="w-1/2">
        <ReviewSystem bookTitle={book.title} />
      </div>
  </div>
  );
};

export default BookDetail;
