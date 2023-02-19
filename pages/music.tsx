import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { BiSkipNext } from "react-icons/bi";
import { useSpringCarousel } from "react-spring-carousel";
import { ReactSpringCarouselItem } from "react-spring-carousel/dist/types/types";

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

const Music = () => {
  return (
    <div className="h-screen w-screen overflow-auto bg-gray-200 pt-16">
      <div className="mx-auto flex h-20 w-9/12 items-center rounded-xl bg-white/70 shadow-lg backdrop-blur-lg">
        <div className="ml-6 mr-auto text-2xl">
          <div className="text-2xl font-bold">{SONGS[0].title}</div>
          <div className="text-xl">{SONGS[0].artist}</div>
        </div>

        <div className="flex">
          <BiSkipNext className="h-[60px] w-[60px] rotate-180 text-slate-500" />
          <FaPlayCircle className="h-[60px] w-[60px] text-slate-500" />
          <BiSkipNext className="mr-auto h-[60px] w-[60px] text-slate-500" />
        </div>

        <div className="mr-4 ml-auto rounded-full bg-blue-500 px-6 py-2 text-lg font-bold text-white shadow-md">
          My last song
        </div>
      </div>

      <div className="mx-auto mt-16 w-9/12">
        <h1 className="text-4xl">Songs</h1>
        <Carousel Songs={SONGS} />
      </div>
    </div>
  );
};

const Vinyl = ({ song }: { song: (typeof SONGS)[number] }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div>
      <div
        className="relative mr-[100px] flex h-96 w-96 flex-shrink-0 flex-col items-center justify-center rounded-md bg-slate-800 text-2xl text-white shadow-md"
        key={song.id}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={song.image}
          alt="Album cover"
          fill
          className="z-10 my-auto mx-auto rounded-md"
          draggable={false}
        />
        <Image
          src="/vinyl.png"
          alt="vinyl"
          className={`absolute left-full top-5 transition-transform duration-500  ${
            isHovered ? "-translate-x-1/2" : "-translate-x-[80%]"
          } 
          ${isHovered ? "rotate-90" : "rotate-0"}
          `}
          width={350}
          height={350}
          draggable={false}
        />
      </div>
      <div className="mt-4 text-2xl">{song.title}</div>
      <div className="text-xl">{song.artist}</div>
      {song.id}
    </div>
  );
};

const Carousel = ({ Songs }: { Songs: typeof SONGS }) => {
  const [progress, setProgress] = React.useState(0);

  const {
    carouselFragment,
    getCurrentActiveItem,
    slideToItem,
    useListenToCustomEvent,
  } = useSpringCarousel({
    items: Songs.map((song) => ({
      id: song.id.toString(),
      renderItem: <Vinyl song={song} key={song.id} />,
    })),
    itemsPerSlide: 3,
    springConfig: { mass: 2, tension: 300, friction: 80 },
    shouldResizeOnWindowResize: true,
  });

  const currentBatchContainsLast = (currentActiveItem: number) =>
    currentActiveItem + 3 - 1 >= Songs.length - 1;

  const currentBatchContainsFirst = (currentActiveItem: number) =>
    currentActiveItem <= 0;

  const showIndex = () => {
    const currentActiveItem = getCurrentActiveItem();

    if (currentBatchContainsLast(currentActiveItem.index)) return Songs.length;

    if (currentBatchContainsFirst(currentActiveItem.index)) return 1;

    return currentActiveItem.index + 1;
  };

  useListenToCustomEvent((event) => {
    if (event.eventName === "onSlideStartChange") {
      if (currentBatchContainsLast(event.nextItem.index))
        return setProgress(100);

      setProgress(((event.nextItem.index + 1) / Songs.length) * 100);
    }
  });

  const getNextBatch = () => {
    if (currentBatchContainsLast(getCurrentActiveItem().index)) return;

    const currentActiveItem = getCurrentActiveItem();

    const nextBatch = Math.ceil(currentActiveItem.index / 3) + 1;

    const nextTarget = nextBatch * 3;

    slideToItem(nextTarget >= Songs.length - 1 ? Songs.length - 1 : nextTarget);
  };

  const getPrevBatch = () => {
    const currentActiveItem = getCurrentActiveItem();

    const prevBatch = Math.ceil(currentActiveItem.index / 3) - 1;

    const prevTarget = prevBatch * 3;

    slideToItem(prevTarget < 0 ? 0 : prevTarget);
  };

  return (
    <div className="relative">
      <button
        onClick={getPrevBatch}
        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-[140%]"
      >
        <BiSkipNext className="h-20 w-20 rotate-180 text-slate-500" />
      </button>
      <div className="relative flex w-full gap-20 overflow-hidden py-4">
        <div className="flex w-full gap-20 overflow-hidden scroll-smooth py-4">
          {carouselFragment}
        </div>
      </div>
      <button
        onClick={getNextBatch}
        className="absolute top-1/2 left-full -translate-y-1/2 translate-x-[140%]"
      >
        <BiSkipNext className="h-20 w-20 text-slate-500" />
      </button>

      <div className="h-4 rounded-full bg-gray-500/30 shadow-2xl ">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        ></div>
        {showIndex()}:00 / {Songs.length}:00
      </div>
    </div>
  );
};

export default Music;
