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

  {
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    year: 2017,
    image: "/images/SevenHusbands.jpg",
    summary:
      "Reclusive Hollywood icon Evelyn Hugo, now in her late seventies, is finally ready to tell the story of her glamorous and scandalous life. She chooses an unknown magazine reporter, Monique Grant, to write her biography. As Evelyn reveals her journey from aspiring actress to celebrated star, she recounts her rise to fame and the seven husbands she had along the way. Monique listens with rapt attention, realizing that their lives are more intertwined than she could have ever imagined."
  },
  {
    title: "Me Before You",
    author: "Jojo Moyes",
    year: 2012,
    image: "/images/MeBeforeYou.jpg",
    summary:
      "Louisa Clark, an ordinary girl from a small town, is hired to care for Will Traynor, a wealthy young man who was paralyzed in a tragic accident. Will is cynical and has given up on life, but Lou is determined to show him that life is still worth living. As she tries to bring joy back into his world, she finds her own world expanding in ways she never expected, and the two of them form an unbreakable bond. This book is a poignant love story that explores difficult themes of love, loss, and living life to the fullest."
  },
  {
    title: "The Fault in Our Stars",
    author: "John Green",
    year: 2012,
    image: "/images/FaultInStars.jpg",
    summary:
      "Hazel Grace Lancaster, a teenager with thyroid cancer that has spread to her lungs, is forced by her parents to attend a cancer support group. There, she meets and falls in love with Augustus 'Gus' Waters, a charismatic and witty boy who is in remission from osteosarcoma. Together, they embark on a journey that takes them from their local support group to Amsterdam to meet their favorite reclusive author, exploring themes of life, love, and what it means to truly live despite a terminal illness."
  },

    //  Crime Category

    {
    title: "The Thursday Murder Club",
    author: "Richard Osman",
    year: 2020,
    image: "/images/ThursdayMurder.jpg",
    summary:
      "In a peaceful retirement community, four friends—Elizabeth, Joyce, Ibrahim, and Ron—meet weekly to discuss unsolved cold cases. When a real murder occurs on their doorstep, the group of amateur sleuths find themselves in the middle of a live investigation. Using their unique skills and connections, they outwit the police and interview suspects, proving that age is just a number when it comes to solving a mystery. This book is a witty and charming take on the classic whodunit, filled with lovable characters and clever twists."

  },

  {
    title: "The Silence of the Lambs",
    author: "Thomas Harris",
    year: 1988,
    image: "/images/SilenceLambs.png",
    summary:
      "FBI trainee Clarice Starling is tasked with seeking the help of imprisoned cannibalistic serial killer Dr. Hannibal Lecter to catch another active serial killer, 'Buffalo Bill.' The psychological game between Starling and Lecter forms the core of the story, as Lecter manipulates and torments Starling while providing cryptic clues about Buffalo Bill. The book masterfully blends psychological horror with procedural crime, creating two of the most memorable characters in modern fiction."

  },
  {
    title: "The Maltese Falcon",
    author: "Dashiell Hammett",
    year: 1930,
    image: "/images/MalteseFalcon.webp",
    summary:
      "This hard-boiled classic introduces the cynical private detective Sam Spade. He's hired by a woman to find her sister, a case that quickly spirals into a hunt for a priceless, jewel-encrusted statuette of a falcon. As Spade navigates a web of deceit, double-crosses, and murder, he must contend with a cast of eccentric and dangerous characters, all willing to kill to get their hands on the enigmatic bird. Hammett's lean prose and gritty realism helped define the detective genre for generations to come."
  },
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    year: 2012,
    image: "/images/GoneGirl.jpg",
    summary:
      "On their fifth wedding anniversary, Nick Dunne's wife, Amy, disappears. The police and media quickly become suspicious of Nick, whose behavior seems less than genuine. The narrative is told in alternating perspectives between Nick and Amy's diary entries, revealing the complex, toxic nature of their relationship and the lies they've told each other. The book is a dark, suspenseful tale about marriage, media scrutiny, and the terrifying secrets people keep from those closest to them."
  }
  
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
