"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { FaCompactDisc, FaPlayCircle, FaSortUp, FaUser } from "react-icons/fa";
import { BiSkipNext } from "react-icons/bi";
import { SiApplemusic } from "react-icons/si";
import { BsCalendar3 } from "react-icons/bs";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, Menu } from "@headlessui/react";
import Head from "next/head";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { fjalla } from "../pages/_app";
import dbSongs from "../db/songs";
import { SongQueryIn } from "../server/Music/schemas/songs/getSongs";
import { trpc } from "../utils/trpc";
import {
  getValidator,
  GetValidator,
  GetValidatorIn,
} from "../server/Music/schemas/music/getMusic";
import dbAlbums from "../db/albums";
import { MusicData } from "../server/Music/types/MusicData";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const iconStyle = (active: boolean) =>
  `h-5 w-5 lg:h-8 lg:w-8 cursor-pointer ${
    active ? "text-blue-500" : "text-slate-500"
  } `;

const Types = [
  {
    value: "songs",
    icon: (active: boolean) => <SiApplemusic className={iconStyle(active)} />,
  },
  {
    value: "albums",
    icon: (active: boolean) => <FaCompactDisc className={iconStyle(active)} />,
  },
  {
    value: "artists",
    icon: (active: boolean) => <FaUser className={iconStyle(active)} />,
  },
];

const SortBy = [
  {
    value: "createdAt",
    icon: (active: boolean) => <BsCalendar3 className={iconStyle(active)} />,
    label: "Date",
  },
  {
    value: "rating",
    icon: (active: boolean) => <AiFillStar className={iconStyle(active)} />,
    label: "Rating",
  },
];

const MusicPage = ({
  music,
  myLastSongs,
}: {
  music: MusicData[];
  myLastSongs: any[];
}) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [scrollPercentage, setScrollPercentage] = React.useState(0);
  const [showComments, setShowComments] = React.useState(false);

  const musicQuery: GetValidator = (() => {
    const order = searchParams.get("order");
    const sortBy = searchParams.get("sortBy");
    const type = searchParams.get("type");

    const validatedQuery = getValidator.parse({
      type,
      query: { order, sortBy },
    });

    return validatedQuery;
  })();

  //   const myLastSongs = trpc.music.myLastSongs.useQuery();

  const [lastSongIndex, setLastSongIndex] = React.useState(0);

  const handleLastSongIndexChange = (index: number) => {
    if (index < 0 || index >= (myLastSongs?.length || 0)) return;

    setLastSongIndex(index);
  };

  const dispayedSong = id && music?.find((song) => song.id === id);

  if (!music) return null;

  return (
    <div className={`h-screen w-screen overflow-hidden bg-gray-200 pt-6`}>
      <ReactQueryDevtools />
      <Head>
        <title>Music</title>
        <meta
          name="description"
          content="Abel Pineiro's favorite Songs, Artists and Albums."
        />
      </Head>
      {/* Latest Song i listened to */}
      <div className="container mx-auto 3xl:max-w-[1750px] 4xl:max-w-[2100px]">
        <div className="mx-auto flex h-16 w-11/12 items-center rounded-xl bg-white/70 shadow-lg backdrop-blur-lg md:h-20 md:w-[70%] lg:w-[65%] xl:w-[77%] 2xl:w-[78%] 3xl:w-[84%] 4xl:w-[85%]">
          <div className="ml-4 mr-auto w-3/5 text-2xl sm:ml-6 sm:w-1/2 lg:w-auto">
            <div className="w-full truncate font-fjalla text-sm font-bold md:text-lg lg:text-2xl">
              {myLastSongs ? myLastSongs[lastSongIndex].song : "Loading..."}
            </div>
            <div className="w-full truncate text-xs md:text-base lg:text-xl">
              {myLastSongs ? myLastSongs[lastSongIndex].artist : "Loading..."}
            </div>
          </div>

          <div className="flex items-center">
            <BiSkipNext
              className="h-8 w-8 rotate-180 text-slate-500 sm:h-10 sm:w-10 lg:h-[50px] lg:w-[50px] xl:h-[60px] xl:w-[60px]"
              onClick={() => handleLastSongIndexChange(lastSongIndex + 1)}
            />
            <FaPlayCircle className="h-8 w-8 text-slate-500 sm:h-10 sm:w-10 lg:h-[50px] lg:w-[50px] xl:h-[60px] xl:w-[60px]" />
            <BiSkipNext
              className="mr-auto h-8 w-8 text-slate-500 sm:h-10 sm:w-10 lg:h-[50px] lg:w-[50px] xl:h-[60px] xl:w-[60px]"
              onClick={() => handleLastSongIndexChange(lastSongIndex - 1)}
            />
          </div>

          <button className="absolute top-0 left-0 mr-4 ml-auto -translate-y-1/2 rounded-full bg-blue-500 px-6 py-1 text-xs font-bold text-white shadow-md lg:relative lg:translate-y-0 lg:py-2 lg:text-lg">
            My last song
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="container h-[calc(100%-5rem)] xl:h-[calc(100%-9rem)] 3xl:max-w-[1750px] 4xl:max-w-[2100px] ">
        <div className="container mx-auto flex h-28 w-11/12 flex-col items-center justify-center gap-2 overflow-visible py-1 md:w-[70%] md:py-4 lg:h-36 lg:w-[65%] xl:w-[77%] 2xl:w-[78%] 3xl:w-[84%] 4xl:w-[85%]">
          <div className="flex w-full items-center justify-between overflow-auto md:mb-2 md:overflow-hidden">
            <div className="mr-10 flex gap-2">
              {/* Entity Selector dropdown */}
              {Types.map((type) => (
                <Link
                  href={{
                    pathname: "/music",
                    query: { ...musicQuery.query, type: type.value },
                  }}
                  key={type.value}
                  shallow
                >
                  <div className="flex h-14 w-14 flex-col items-center justify-center">
                    {type.icon(musicQuery.type === type.value)}
                    {type.value}
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex gap-2">
              {/* Sort by selector */}
              {SortBy.map((sortBy) => (
                <Link
                  href={{
                    pathname: "/music",
                    query: {
                      ...musicQuery.query,
                      sortBy: sortBy.value,
                      type: musicQuery.type,
                    },
                  }}
                  key={sortBy.value}
                  shallow
                >
                  <div className="flex h-14 w-14 flex-col items-center justify-center">
                    {sortBy.icon(musicQuery.query.sortBy === sortBy.value)}
                    {sortBy.label}
                  </div>
                </Link>
              ))}

              {/* Order selector */}
              <div className="flex items-center justify-center">
                <Link
                  href={{
                    pathname: "/music",
                    query: {
                      ...musicQuery.query,
                      order: musicQuery.query.order === "asc" ? "desc" : "asc",
                      type: musicQuery.type,
                    },
                  }}
                  shallow
                >
                  <div className="flex justify-center rounded-full">
                    <div className="h-5 w-5 rounded-full bg-slate-300 lg:h-8 lg:w-8 ">
                      <FaSortUp
                        className={`h-5 w-5 cursor-pointer text-center text-blue-500 transition-transform duration-300 lg:h-8 lg:w-8 ${
                          musicQuery.query.order === "asc"
                            ? "rotate-0 lg:translate-y-[6px]"
                            : "rotate-180 lg:-translate-y-[6px]"
                        } `}
                      />
                    </div>
                  </div>
                  Order
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll position indicator */}
          <div className="flex w-full flex-col justify-center px-1">
            <div className="h-1 overflow-hidden rounded-full bg-gray-500/30 lg:h-2">
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
            <div className="lg: text-xs lg:text-base">
              {Math.ceil((scrollPercentage * music.length) / 100)}:00/
              {music.length}:00
            </div>
          </div>
        </div>

        {/* Vinyls Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={JSON.stringify(musicQuery)}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="h-[calc(100%-1rem)]"
          >
            <VinylsContainer setScrollPercentage={setScrollPercentage}>
              {music.map((song) => (
                <Vinyl
                  song={{
                    id: song.id,
                    title: song.title,
                    subTitle: song.subTitle,
                    image: song.image,
                    rating: song.rating,
                  }}
                  key={song.id}
                />
              ))}
            </VinylsContainer>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal with selected data */}
      <AnimatePresence>
        {!!id && !!dispayedSong && (
          <Dialog
            open={!!id && !!dispayedSong}
            onClose={() => {
              const newQuery = { ...searchParams, id: undefined };
              delete newQuery.id;

              router.push(
                "/music" +
                  "?" +
                  (() => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete("id");
                    return newParams.toString();
                  })()
              );
            }}
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
                <Link
                  href={{
                    pathname:
                      "/music" +
                      "?" +
                      (() => {
                        const newParams = new URLSearchParams(searchParams);
                        newParams.delete("id");
                        return newParams.toString();
                      })(),
                  }}
                  shallow
                >
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
                        {dispayedSong.subTitle}
                      </div>
                    </div>

                    <div className="mb-auto">
                      <StarRating rating={9} />
                    </div>

                    <div className="mx-auto h-[400px] w-3/4">
                      {!showComments ? (
                        <div key={"showComments" + showComments}>
                          <iframe
                            style={{ borderRadius: "12px" }}
                            src="https://open.spotify.com/embed/track/65FftemJ1DbbZ45DUfHJXE?utm_source=generator"
                            width="100%"
                            height="200"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          ></iframe>
                          <div className="flex gap-3 py-8">
                            <button className="rounded-lg bg-blue-500 px-4 py-2 text-white">
                              Like
                            </button>
                            <button
                              className="rounded-lg bg-blue-500 px-4 py-2 text-white"
                              onClick={() => setShowComments(true)}
                            >
                              Comments
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <button
                            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
                            onClick={() => setShowComments(false)}
                          >
                            Listen to Song
                          </button>
                          <div className="scrollbar-hide h-80 overflow-y-auto">
                            {[
                              "this is really good stuff",
                              "Look at this",
                              "This is a comment",
                              "Look at this",
                            ].map((comment) => (
                              <div
                                className="mb-2 rounded-lg bg-white py-4 pl-8 text-left text-black"
                                key={comment}
                              >
                                <h3>John Doe</h3>
                                <p>{comment}</p>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="mt-auto mb-20 text-2xl">
                      <div>Album: {dispayedSong.title}</div>
                      <div>Artist: {dispayedSong.subTitle}</div>
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

// Because the container would unmount, The event listner would break becuse the component was no longer there.
// So we moved the container to a seperate component so that the useEffect would handle adding and removing the event listener
const VinylsContainer = ({
  children,
  setScrollPercentage,
}: {
  children: React.ReactNode;
  setScrollPercentage: (n: number) => void;
}) => {
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
  }, [setScrollPercentage]);

  return (
    <div
      ref={scrollRef}
      className="scrollbar-hide grid h-full grid-cols-2 gap-y-2 overflow-x-hidden overflow-y-scroll pb-24 pt-2 md:px-20 xl:grid-cols-3 3xl:grid-cols-4"
    >
      {children}
    </div>
  );
};

const StarRating = ({
  rating,
  size = 40,
  color = "white",
}: {
  rating: number;
  color?: string;
  size?: number;
}) => {
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
            <AiFillStar
              className={`flex-shrink-0`}
              style={{ width: size, height: size, fill: color }}
            />
          </div>
          <div className="relative inline-flex">
            <AiOutlineStar style={{ width: size, height: size, fill: color }} />
          </div>
        </div>
      ))}
    </>
  );
};

const Vinyl = ({ song }: { song: MusicData }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const searchParams = useSearchParams();
  const order = searchParams.get("order");
  const sortBy = searchParams.get("sortBy");
  const type = searchParams.get("type");

  return (
    <Link
      href={{
        pathname: "/music",
        query: { ...{ order, sortBy, type }, id: song.id },
      }}
      className="flex flex-col items-center justify-center"
      shallow
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

      <div className="mb-4 w-4/5 truncate text-ellipsis text-center md:w-full">
        <div className="mx-auto mt-4 font-bold md:text-lg lg:text-2xl">
          {song.title}
        </div>
        <div className="text-sm md:text-base lg:text-xl">{song.subTitle}</div>
        <div className="my-2">
          <StarRating
            rating={song.rating}
            size={
              typeof window !== "undefined" && window.innerWidth > 500 ? 30 : 20
            }
            color="black"
          />
        </div>
      </div>
    </Link>
  );
};

export default trpc.withTRPC(MusicPage);
