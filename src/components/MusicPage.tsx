"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";
import React, { ElementType, useEffect } from "react";
import { FaCompactDisc, FaSortUp, FaUser } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";
import { BsCalendar3 } from "react-icons/bs";
import Link from "next/link";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  AnimatePresence,
  motion,
  useAnimate,
} from "framer-motion";
import useScrollPercentage from "../hooks/useScrollPercentage";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MUSIC_TYPES = [
  {
    value: "songs",
    icon: SiApplemusic,
    label: "Songs",
  },
  {
    value: "albums",
    icon: FaCompactDisc,
    label: "Albums",
  },
  {
    value: "artists",
    icon: FaUser,
    label: "Artists",
  },
];

const SORT_BY = [
  {
    value: "createdAt",
    label: "Date",
    icon: BsCalendar3,
  },
  {
    value: "rating",
    label: "Rating",
    icon: AiFillStar,
  },
];

type Music = {
  id: string;
  title: string;
  subTitle: string;
  image: string;
  rating: number;
};

export type MusicPageProps = {
  music: Music[];
};

const MusicPage = ({ music }: MusicPageProps) => {
  const { scrollPercentage, scrollRef } = useScrollPercentage();
  const a = usePathname()
  const pathName = a.split("/").slice(0, 3).join("/")

  if (!music) return null;

  return (
    <>
      {/* Main Body */}
      <div className="container h-[calc(100%-5rem)] xl:h-[calc(100%-9rem)] 3xl:max-w-[1750px] 4xl:max-w-[2100px] ">
        <div className="container mx-auto flex h-28 w-11/12 flex-col items-center justify-center gap-2 overflow-visible py-1 md:w-[70%] md:py-4 lg:h-36 lg:w-[65%] xl:w-[77%] 2xl:w-[78%] 3xl:w-[84%] 4xl:w-[85%]">
          <div className="flex w-full items-center justify-between overflow-auto md:mb-2 md:overflow-hidden">
            <div className="mr-10 flex gap-2">
              {/* Entity Selector dropdown */}
              {MUSIC_TYPES.map(({ value, label, icon }) => (
                <Link
                  href={{
                    pathname: pathName,
                    query: { type: value },
                  }}
                  key={value}
                  shallow
                >
                  <div className="flex h-14 w-14 flex-col items-center justify-center">
                    <Icon active={"songs" === value} Icon={icon} />
                    {label}
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex gap-2">
              {/* Sort by selector */}
              {SORT_BY.map((sortBy) => (
                <Link
                  href={{
                    pathname: pathName,
                    query: {
                      sortBy: sortBy.value,
                    },
                  }}
                  key={sortBy.value}
                  shallow
                >
                  <div className="flex h-14 w-14 flex-col items-center justify-center">
                    <Icon
                      active={"createdAt" === sortBy.value}
                      Icon={sortBy.icon}
                    />
                    {sortBy.label}
                  </div>
                </Link>
              ))}

              {/* Order selector */}
              <div className="flex items-center justify-center">
                <Link
                  href={{
                    pathname: pathName,
                  }}
                  shallow
                >
                  <div className="flex justify-center rounded-full">
                    <div className="h-5 w-5 rounded-full bg-slate-300 lg:h-8 lg:w-8 ">
                      <FaSortUp
                        className={`h-5 w-5 cursor-pointer text-center text-blue-500 transition-transform duration-300 lg:h-8 lg:w-8 ${"asc" === "asc"
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
        <div className="h-[calc(100%-1rem)]">
          <div
            ref={scrollRef}
            className="scrollbar-hide grid h-full grid-cols-2 gap-y-2 overflow-x-hidden overflow-y-scroll pb-24 pt-2 md:px-20 xl:grid-cols-3 3xl:grid-cols-4"
          >
            {music.map((musicData) => (
              <motion.div
                layoutId={musicData.id}
                className="rounded-2xl transition-colors duration-500 hover:bg-white"
                key={musicData.id}
              >
                <Link
                  href={{
                    pathname: `${pathName}/${musicData.id}`,
                  }}
                  prefetch={true}
                >
                  <Vinyl
                    music={{
                      id: musicData.id,
                      title: musicData.title,
                      subTitle: musicData.subTitle,
                      image: musicData.image,
                      rating: musicData.rating,
                    }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

type IconProps = {
  Icon: ElementType;
  active: boolean;
};

const Icon = ({ Icon, active }: IconProps) => {
  return (
    <Icon
      className={`h-5 w-5 cursor-pointer lg:h-8 lg:w-8 ${active ? "text-blue-500" : "text-slate-500"
        }`}
    />
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

export const Vinyl = ({
  music,
  active = false,
}: {
  music: Music;
  active?: boolean;
}) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!active) return;

    async function handleAnimation() {
      await animate(
        scope.current,
        { translateX: "1%" },
        { delay: 0.2, duration: 0.5 }
      );

      // spin
      animate(
        scope.current,
        {
          rotate: 360,
        },
        { duration: 1.7, repeat: Infinity, ease: "linear" }
      );
    }

    handleAnimation();
  }, [active, animate, scope]);

  return (
    <div
      className="flex flex-col items-center justify-center"
    >
      <motion.div
        className="relative flex w-4/5 flex-shrink-0 flex-col items-center justify-center text-2xl text-white shadow-xl sm:h-40 sm:w-40 md:h-60 md:w-60 2xl:h-72 2xl:w-72 4xl:h-[19rem] 4xl:w-[19rem]"
        key={music.id}
      >
        <Image
          src={music.image as string}
          alt="Album cover"
          width={350}
          height={350}
          className="z-10 rounded-md"
          draggable={false}
        />

        <motion.div
          className={twMerge("absolute left-full top-5 aspect-square w-[90%]")}
          initial={{ translateX: "-80%" }}
          ref={scope}
        >
          <Image
            src="/vinyl.png"
            alt="vinyl"
            className="hidden md:block"
            draggable={false}
            width={350}
            height={350}
          />
        </motion.div>
      </motion.div>

      <motion.div className="mb-4 w-4/5 truncate text-ellipsis text-center md:w-full">
        <div className="mx-auto mt-4 font-bold md:text-lg lg:text-2xl">
          {music.title}
        </div>
        <div className="text-sm md:text-base lg:text-xl">{music.subTitle}</div>
        <div className="my-2">
          <StarRating rating={music.rating} size={30} color="black" />
        </div>
      </motion.div>

    </div>
  );
};

export default MusicPage;
