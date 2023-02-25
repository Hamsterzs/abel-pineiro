import React, { useEffect, useRef, useState } from "react";

const SONGS = [
  {
    title: "Welcome to the black parade",
    artist: "My Chemical Romance",
    album: "The Black Parade",
    image: "/black-parade.jpg",
    id: 1,
  },
  {
    title: "Golden Slumbers",
    artist: "The Beatles",
    album: "Abbey Road",
    image: "/beatles.jpeg",
    id: 2,
  },
  {
    title: "Thank you next",
    artist: "Ariana Grande",
    album: "Thank you next",
    image: "/thank-you-next.jpg",
    id: 3,
  },
  {
    title: "Candy Paint",
    artist: "Post Malone",
    album: "Beerbongs & Bentleys",
    image: "/beer-bongs.jpg",
    id: 4,
  },
  {
    title: "Summertime",
    artist: "My Chemical Romance",
    album: "Danger Days: The True Lives of the Fabulous Killjoys",
    image: "/danger-days.jpeg",
    id: 5,
  },
  {
    title: "You Never Give Me Your Money",
    artist: "The Beatles",
    album: "Abbey Road",
    image: "/beatles.jpeg",
    id: 6,
  },
  {
    title: "NASA",
    artist: "Ariana Grande",
    album: "Thank you next",
    image: "/thank-you-next.jpg",
    id: 7,
  },
  {
    title: "Na Na Na",
    artist: "My Chemical Romance",
    album: "Danger Days: The True Lives of the Fabulous Killjoys",
    image: "/danger-days.jpeg",
    id: 8,
  },
  {
    title: "The long and winding road",
    artist: "The Beatles",
    album: "Let It Be",
    image: "/LetItBe.jpg",
    id: 9,
  },
  {
    title: "92 Explorer",
    artist: "Post Malone",
    album: "Beerbongs & Bentleys",
    image: "/beer-bongs.jpg",
    id: 10,
  },
];

const Car = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ScrollCar />
    </div>
  );
};

const ScrollCar = () => {
  const [current, setCurrent] = useState({ from: 0, to: 0 });
  const [indexInput, setIndexInput] = useState(1);

  const car = useRef<HTMLDivElement>(null);

  const scrollHere = (index: number) => {
    if (!car.current) return;

    const child = car.current.children[index] as HTMLDivElement;

    car.current.scrollLeft = child.offsetLeft;
  };

  //   useEffect(() => {
  //     if (!car.current) throw "Must Render the car";

  //     const SIZE = 160;

  //     if (!document) return;
  //     const third: HTMLDivElement = car.current.children[2] as HTMLDivElement;

  //     console.log("third offset left", third.offsetLeft);
  //     console.log("third scroll left", car.current.scrollLeft);
  //     console.log("third", car.current.scrollLeft - third.offsetLeft);

  //     // console.log("Car", car.current.offsetLeft);

  //     car.current.scrollLeft += SIZE * (current.to - current.from);
  //   }, [current]);

  //   useEffect(() => {
  //     if (!car.current) throw "render the car";

  //     const carousell = car.current;

  //     const setCurrentOnScroll = () => {
  //         carousell.children[0].cl
  //     };

  //     carousell.addEventListener("scroll", () => {});

  //     return () => {
  //       carousell.removeEventListener("scroll");
  //     };
  //   });

  const scrollTo = (index: number) => {
    if (index < 0 || index > SONGS.length - 1) return;

    // setCurrent({ from: current.to, to: index });
    scrollHere(index);
  };

  return (
    <>
      <div className="absolute top-0 left-0 flex gap-11">
        <button onClick={() => scrollTo(current.to - 1)}>Dec</button>
        <button onClick={() => scrollTo(current.to + 1)}>INC</button>

        <input
          type="number"
          max={SONGS.length - 1}
          min={0}
          value={indexInput}
          onChange={(e) => setIndexInput(parseInt(e.target.value))}
        />
        <button onClick={() => scrollTo(indexInput)}>Scroll</button>
      </div>
      <div
        ref={car}
        className="mx-auto flex h-72 w-[90%] snap-x items-center gap-2 overflow-auto scroll-smooth bg-blue-300 px-4"
      >
        {SONGS.map((song) => (
          <div
            key={song.id}
            className="h-40 w-40 flex-shrink-0 snap-start bg-red-300"
            id={"" + song.id}
          >
            {song.id}
          </div>
        ))}
      </div>
    </>
  );
};

export default Car;
