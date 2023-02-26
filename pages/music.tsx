import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { BiSkipNext } from "react-icons/bi";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

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
  const router = useRouter();

  const { id } = router.query;

  const dispayedSong = id && SONGS.find((song) => song.id === Number(id));

  return (
    <div className="h-screen w-screen overflow-auto bg-gray-200 pt-16">
      <div className="mx-auto flex h-20 w-11/12 items-center rounded-xl bg-white/70 shadow-lg backdrop-blur-lg lg:w-9/12">
        <div className="ml-6 mr-auto w-1/2 text-2xl lg:w-auto">
          <div className="w-full truncate text-lg font-bold lg:text-2xl">
            {SONGS[0].title}
          </div>
          <div className="w-full truncate text-base lg:text-xl">
            {SONGS[0].artist}
          </div>
        </div>

        <div className="flex items-center">
          <BiSkipNext className="h-10 w-10 rotate-180 text-slate-500 lg:h-[60px] lg:w-[60px]" />
          <FaPlayCircle className="h-10 w-10 text-slate-500 lg:h-[60px] lg:w-[60px]" />
          <BiSkipNext className="mr-auto h-10 w-10 text-slate-500 lg:h-[60px] lg:w-[60px]" />
        </div>

        <div className="absolute top-0 left-0 mr-4 ml-auto -translate-y-1/2 rounded-full bg-blue-500 px-6 py-1 text-sm font-bold text-white shadow-md lg:relative lg:translate-y-0 lg:py-2 lg:text-lg">
          My last song
        </div>
      </div>

      <div className="container mx-auto mt-16">
        <div className="my-8 flex gap-12">
          <h1 className="ml-auto text-4xl">Songs</h1>
          <h1 className="mr-auto text-4xl">Filter</h1>
        </div>
        <div className="bg mb-20 grid grid-cols-2 place-content-center items-center gap-2 px-4 xl:grid-cols-3 3xl:grid-cols-4">
          {SONGS.map((song) => (
            <Vinyl song={song} key={song.id} />
          ))}
        </div>
      </div>

      {id && dispayedSong && (
        <div className="absolute top-1/2 left-1/2 z-50 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-black/70 shadow-lg">
          <div className="relative h-[95%] w-1/2 rounded-lg bg-white text-center shadow-lg">
            <Link href="/music">
              <div className="absolute right-0">Exit</div>
            </Link>
            <div className="flex h-full w-full flex-col items-center justify-center">
              <Image
                src={dispayedSong.image}
                alt="Album cover"
                width={300}
                height={300}
                draggable={false}
                className="rounded-sm"
              />

              <div>
                <div className="text-4xl font-bold">{dispayedSong.title}</div>
                <div className="my-2 text-3xl">-{dispayedSong.artist}</div>
              </div>
              <div className="text-3xl">Album: {dispayedSong.album}</div>

              <div className="mt-4 flex">
                <div className="relative inline-flex">
                  <StarRating rating={2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StarRating = ({ rating }: { rating: number }) => {
  type Star = "full" | "half" | "empty";

  let stars: Star[] = Array(Math.floor(rating / 2)).fill("full");

  if (rating % 2 !== 0) stars.push("half");

  if (stars.length < 5)
    stars = stars.concat(Array(5 - stars.length).fill("empty"));

  const width: Record<Star, string> = {
    full: "w-full",
    half: "w-1/2",
    empty: "w-0",
  };

  return (
    <>
      {stars.map((star, index) => (
        <div className="relative inline-flex" key={index}>
          <div
            className={`${width[star]} absolute inline-flex h-11 overflow-hidden`}
          >
            <AiFillStar className={`h-10 w-10 flex-shrink-0 fill-blue-500`} />
          </div>
          <div className="relative inline-flex">
            <AiOutlineStar className={`h-10 w-10`} />
          </div>
        </div>
      ))}
    </>
  );
};

const Vinyl = ({ song }: { song: (typeof SONGS)[number] }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link
      href={`/music?id=${song.id}`}
      className="flex flex-col items-center justify-center"
    >
      <div
        className="relative flex h-40 w-40 flex-shrink-0 flex-col items-center justify-center rounded-md bg-slate-800 text-2xl text-white shadow-md md:h-60 md:w-60 2xl:h-72 2xl:w-72 4xl:h-80 4xl:w-80"
        key={song.id}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={song.image}
          alt="Album cover"
          fill
          className="z-10 rounded-md"
          draggable={false}
        />

        <div
          className={`absolute left-full top-5 aspect-square w-[90%] transition-transform duration-500  ${
            isHovered ? "-translate-x-1/2" : "-translate-x-[80%]"
          } 
          ${isHovered ? "rotate-90" : "rotate-0"}
          `}
        >
          <Image
            src="/vinyl.png"
            alt="vinyl"
            className="hidden md:block"
            draggable={false}
            fill
          />
        </div>
      </div>

      <div className="w-full truncate text-ellipsis text-center">
        <div className="mx-auto mt-4 text-lg font-bold lg:text-2xl">
          {song.title}
        </div>
        <div className="lg:text-xl">{song.artist}</div>
        {song.id}
      </div>
    </Link>
  );
};

export default Music;
