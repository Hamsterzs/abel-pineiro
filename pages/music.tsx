import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { BiSkipNext } from "react-icons/bi";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import Head from "next/head";
import { InferGetStaticPropsType } from "next";
import { fjalla } from "./_app";
import prisma from "../lib/prisma";

export const getStaticProps = async () => {
  const allSongs = await prisma.song.findMany({
    include: {
      artist: {
        select: {
          name: true,
        },
      },
      album: {
        include: {
          image: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  });

  return {
    props: {
      songs: allSongs,
    },
  };
};

const Music = ({ songs }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const { id } = router.query;

  const dispayedSong = id && songs.find((song) => song.id === id);

  const [scrollPercentage, setScrollPercentage] = React.useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (!scrollContainer) return;

    const scrollListener = () => {
      if (!scrollRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

      if (scrollHeight === clientHeight) return setScrollPercentage(100);

      const scrollPosition = (scrollTop / (scrollHeight - clientHeight)) * 100;

      setScrollPercentage(Math.ceil(scrollPosition));
    };

    scrollListener();

    scrollContainer.addEventListener("scroll", scrollListener);

    return () => {
      scrollContainer.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className={`h-screen w-screen overflow-hidden bg-gray-200 pt-6`}>
      <Head>
        <title>Music</title>
        <meta
          name="description"
          content="Abel Pineiro's favorite Songs, Artists and Albums."
        />
      </Head>
      <div className="container mx-auto">
        <div className="mx-auto flex h-16 w-11/12 items-center rounded-xl bg-white/70 shadow-lg backdrop-blur-lg md:h-20 md:w-[70%] lg:w-[65%] xl:w-[77%] 2xl:w-[78%] 3xl:w-[84%] 4xl:w-[85%]">
          <div className="ml-4 mr-auto w-3/5 text-2xl sm:ml-6 sm:w-1/2 lg:w-auto">
            <div className="w-full truncate font-fjalla text-sm font-bold md:text-lg lg:text-2xl">
              {songs[0].title}
            </div>
            <div className="w-full truncate text-xs md:text-base lg:text-xl">
              {songs[0].artist.name}
            </div>
          </div>

          <div className="flex items-center">
            <BiSkipNext className="h-8 w-8 rotate-180 text-slate-500 sm:h-10 sm:w-10 lg:h-[50px] lg:w-[50px] xl:h-[60px] xl:w-[60px]" />
            <FaPlayCircle className="h-8 w-8 text-slate-500 sm:h-10 sm:w-10 lg:h-[50px] lg:w-[50px] xl:h-[60px] xl:w-[60px]" />
            <BiSkipNext className="mr-auto h-8 w-8 text-slate-500 sm:h-10 sm:w-10 lg:h-[50px] lg:w-[50px] xl:h-[60px] xl:w-[60px]" />
          </div>

          <div className="absolute top-0 left-0 mr-4 ml-auto -translate-y-1/2 rounded-full bg-blue-500 px-6 py-1 text-xs font-bold text-white shadow-md lg:relative lg:translate-y-0 lg:py-2 lg:text-lg">
            My last song
          </div>
        </div>
      </div>

      <div className="container h-[calc(100%-5rem)] xl:h-[calc(100%-9rem)]">
        <div className="container mx-auto flex w-11/12 flex-col items-center justify-center gap-2 overflow-hidden py-2 md:w-[70%] md:py-4 lg:w-[65%] xl:w-[77%] 2xl:w-[78%] 3xl:w-[84%] 4xl:w-[85%]">
          <div className="flex w-full justify-between md:mb-2">
            <h1 className="text-lg lg:text-4xl">Songs</h1>
            <h1 className="text-lg lg:text-4xl">Filter</h1>
          </div>
          <div className="flex w-full flex-col justify-center">
            <div className="h-3 overflow-hidden rounded-full bg-gray-500/30">
              <motion.div
                animate={{
                  width: `${scrollPercentage}%`,
                  opacity: scrollPercentage < 3 ? 0 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  mass: 0.2,
                  damping: 7,
                }}
                className="h-full w-32 overflow-hidden rounded-full bg-blue-500"
              ></motion.div>
            </div>
            {Math.ceil((scrollPercentage * songs.length) / 100)}:00/
            {songs.length}:00
          </div>
        </div>

        <div
          ref={scrollRef}
          className="scrollbar-hide grid h-[calc(100%-3rem)] grid-cols-2 gap-y-2 overflow-x-hidden overflow-y-scroll pb-24 pt-2 md:px-20 xl:grid-cols-3 3xl:grid-cols-4"
        >
          {songs.map((song) => (
            <Vinyl
              song={{
                id: song.id,
                artist: song.artist.name,
                image: song.album.image.url,
                title: song.title,
              }}
              key={song.id}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {!!id && !!dispayedSong && (
          <Dialog
            open={!!id && !!dispayedSong}
            onClose={() => router.push("/music")}
            unmount
          >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/75"
              aria-hidden="true"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
            />

            <Dialog.Panel className="relative">
              <motion.div
                initial={{ top: "150%" }}
                animate={{ top: "50%" }}
                exit={{ top: "150%" }}
                className="xl:1/2 scrollbar-hide fixed top-1/2 left-1/2 z-50 h-[95%] w-[98%] -translate-y-1/2 -translate-x-1/2 overflow-y-auto rounded-lg bg-gray-300 text-center shadow-lg lg:w-3/4 xl:max-w-[1200px]"
              >
                <Link href="/music">
                  <div className="absolute right-0">Exit</div>
                </Link>
                <div className="flex h-full w-full flex-col items-center">
                  <div className="my-auto flex h-[90%] w-[90%] flex-col rounded-md border-2 border-white text-white">
                    <Image
                      src="/black-texture.jpg"
                      fill
                      alt="Vinyl"
                      className="-z-30"
                    />
                    <div
                      className={`${fjalla.variable} mt-auto px-4 font-fjalla`}
                    >
                      <div className="text-6xl">{dispayedSong.title}</div>
                      <div className="my-8 text-4xl">
                        {dispayedSong.album.title}
                      </div>
                    </div>
                    <div className="mb-auto">
                      <StarRating rating={9} />
                    </div>
                    <div className="mx-auto w-3/4">
                      <iframe
                        style={{ borderRadius: "12px" }}
                        src="https://open.spotify.com/embed/track/65FftemJ1DbbZ45DUfHJXE?utm_source=generator"
                        width="100%"
                        height="320"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      ></iframe>
                    </div>
                    <div className="mt-auto mb-20 text-2xl">
                      <div>Album: {dispayedSong.album.title}</div>
                      <div>Artist: {dispayedSong.artist.name}</div>
                      <div>released: 01/02/1999</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Panel>
          </Dialog>
        )}
      </AnimatePresence>
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
            <AiFillStar className={`h-10 w-10 flex-shrink-0 fill-white`} />
          </div>
          <div className="relative inline-flex">
            <AiOutlineStar className={`h-10 w-10`} />
          </div>
        </div>
      ))}
    </>
  );
};

const Vinyl = ({
  song,
}: {
  song: {
    id: string;
    image: string;
    title: string;
    artist: string;
  };
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link
      href={`/music?id=${song.id}`}
      className="flex flex-col items-center justify-center"
    >
      <div
        className="relative flex w-4/5 flex-shrink-0 flex-col items-center justify-center rounded-md text-2xl text-white shadow-md sm:h-40 sm:w-40 md:h-60 md:w-60 2xl:h-72 2xl:w-72 4xl:h-[19rem] 4xl:w-[19rem]"
        key={song.id}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={song.image}
          alt="Album cover"
          width={350}
          height={350}
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
            width={350}
            height={350}
          />
        </div>
      </div>

      <div className="w-4/5 truncate text-ellipsis text-center md:w-full">
        <div className="mx-auto mt-4 font-bold md:text-lg lg:text-2xl">
          {song.title}
        </div>
        <div className="text-sm md:text-base lg:text-xl">{song.artist}</div>
        {song.id}
      </div>
    </Link>
  );
};

export default Music;
