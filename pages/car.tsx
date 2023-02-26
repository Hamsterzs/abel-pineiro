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
      {/* <TransformCar /> */}
      <ScrollCar />
    </div>
  );
};

const ScrollCar = () => {
  const [current, setCurrent] = useState(0);
  const [indexInput, setIndexInput] = useState(1);

  const car = useRef<HTMLDivElement>(null);

  const scrollHere = (index: number) => {
    if (!car.current) return;

    const child = car.current.children[index] as HTMLDivElement;

    const scrollWidth = car.current.scrollWidth;
    const scrollLeft = car.current.scrollLeft;
    const clientWidth = car.current.clientWidth;

    if (
      Math.abs(scrollWidth - scrollLeft - clientWidth) < 10 &&
      index > current
    )
      return console.log("End");

    car.current.scrollLeft = child.offsetLeft;
    setCurrent(index);
  };

  const scrollTo = (index: number) => {
    const validIndex = index;
    if (index < 0) index = 0;

    if (index > SONGS.length - 1) index = SONGS.length - 1;

    scrollHere(index);
  };

  useEffect(() => {
    if (!car.current) return;

    const carousel = car.current;

    const handleScroll = () => {
      const children = Array.from(carousel.children) as HTMLDivElement[];
      const child = children.reduce(
        (acc, child, index) => {
          const offset = carousel.scrollLeft - child.offsetLeft;
          if (Math.abs(offset) < acc.diff) return { diff: offset, index };

          return acc;
        },
        { diff: Infinity, index: null } as {
          diff: number;
          index: number | null;
        }
      );

      if (child.index === null) return;
      setCurrent(child.index);
    };

    carousel.addEventListener("scroll", handleScroll);

    return () => {
      carousel.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 flex gap-11">
        <button onClick={() => scrollTo(current - 3)}>Dec</button>
        <button onClick={() => scrollTo(current + 3)}>INC</button>
        <div>Actual current {current}</div>
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
        className="mx-auto flex h-72 w-[90%]  snap-x items-center gap-2 overflow-auto scroll-smooth bg-blue-300"
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

const TransformCar = () => {
  const [current, setCurrent] = useState(0);
  const car = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);
  const [indexInput, setIndexInput] = useState(0);

  const scrollTo = (index: number) => {
    if (index < 0 || index > SONGS.length - 1) return;

    if (!car.current) return;

    const child = car.current.children[index] as HTMLDivElement;
    setLeft(child.offsetLeft);
    setCurrent(index);
  };

  return (
    <>
      <div className="absolute top-0 left-0 flex gap-11">
        <button onClick={() => scrollTo(current - 1)}>Dec</button>
        <button onClick={() => scrollTo(current + 1)}>INC</button>

        <input
          type="number"
          max={SONGS.length - 1}
          min={0}
          value={indexInput}
          onChange={(e) => setIndexInput(parseInt(e.target.value))}
        />
        <button onClick={() => scrollTo(indexInput)}>Scroll</button>
      </div>
      <div className="relative mx-auto flex h-72 w-[90%] items-center gap-4 overflow-hidden bg-blue-300">
        <div
          className="absolute flex items-center gap-4 overflow-visible transition-all duration-500"
          style={{ left: left * -1 }}
          ref={car}
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
      </div>
    </>
  );
};

export default Car;
