import Image from "next/image";
import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import { BiSkipNext } from "react-icons/bi";

const SONGS = [
  {
    title: "Golden Slumbers",
    artist: "The Beatles",
    album: "Abbey Road",
    id: 1,
  },
  {
    title: "Rocket man",
    artist: "Elton John",
    album: "Space Oddity",
    id: 2,
  },
  {
    title: "Let it be",
    artist: "The Beatles",
    album: "Let it be",
    id: 3,
  },
  {
    title: "Welcome to the black parade",
    artist: "My Chemical Romance",
    album: "The Black Parade",
    id: 4,
  },
  {
    title: "The Scientist",
    artist: "Coldplay",
    album: "A Rush of Blood to the Head",
    id: 5,
  },
];

const Music = () => {
  return (
    <div className="h-screen w-screen bg-gray-200 pt-16">
      <div className="mx-auto flex h-20 w-3/5 items-center rounded-xl bg-white/70 shadow-lg backdrop-blur-lg">
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

      <div className="mx-auto mt-10 w-9/12">
        <h1 className="text-4xl">Songs</h1>
        <div className="flex w-full gap-20 overflow-hidden py-4 px-4">
          {SONGS.map((song) => (
            <Vinyl song={song} key={song.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Vinyl = ({
  song,
}: {
  song: { id: number; title: string; artist: string };
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="">
      <div
        className="relative mr-[100px] flex h-96 w-96 flex-shrink-0 flex-col items-center justify-center rounded-md bg-slate-800 text-2xl text-white shadow-md"
        key={song.id}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src="/beatles.jpeg"
          alt="Album cover"
          fill
          className="z-10 my-auto mx-auto rounded-md"
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
        />
      </div>
      <div className="mt-4 text-2xl">{song.title}</div>
      <div className="text-xl">{song.artist}</div>
    </div>
  );
};

export default Music;
