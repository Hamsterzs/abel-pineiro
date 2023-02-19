import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  const TITLE = "Abel Pineiro";
  const DESCRIPTION =
    "Welcome to my personal website, Navigate to some of my interests by selecting a planet.";

  return (
    <div className="h-screen w-screen overflow-auto bg-gray-200 lg:overflow-hidden">
      <Head>
        <title>Abel Pineiro</title>
        <meta
          name="description"
          content="Welcome to my personal website, Click through to learn about me."
        />
      </Head>

      <div className="flex flex-col gap-4 px-2 py-10 lg:hidden tall:flex">
        <div className="flex h-1/2 w-full flex-col items-center">
          <div className="container flex flex-col items-center gap-1 rounded-lg bg-white py-28 px-2 text-center shadow-2xl md:w-[35rem]">
            <div className="relative flex aspect-square w-[15%] min-w-[200px] items-center justify-center overflow-hidden rounded-full">
              <Image src="/me.jpg" fill alt="abel pineiro" />
            </div>
            <h1 className="font-prompt text-4xl 4xl:text-5xl">{TITLE}</h1>
            <p className="w-10/12 font-abel text-2xl 4xl:text-3xl">
              {DESCRIPTION}
            </p>
          </div>
        </div>

        <div className="container mx-auto flex h-1/2 flex-col items-center md:w-[35rem]">
          <div className="flex w-full flex-col items-center gap-1 rounded-lg bg-white py-12 px-4 text-center shadow-2xl md:gap-2 md:px-8">
            <PlanetSlider
              title="Work"
              planetImage="/jupiter.png"
              animation="animate-back-and-forth-1"
              links="/music"
            />

            <PlanetSlider
              title="Music"
              planetImage="/neptune.png"
              animation="animate-back-and-forth-2"
              links="/music"
            />
            <PlanetSlider
              title="Movies & TV"
              planetImage="/coldPlanet.png"
              animation="animate-back-and-forth-3"
              links="/music"
            />
            <PlanetSlider
              title="Anime"
              planetImage="/venus.png"
              animation="animate-back-and-forth-4"
              links="/music"
            />
            <PlanetSlider
              title="Code"
              planetImage="/starwarsPlanet.png"
              animation="animate-back-and-forth-5"
              links="/music"
            />
            <PlanetSlider
              title="Games"
              planetImage="/purplePlanet.png"
              animation="animate-back-and-forth-6"
              links="/music"
            />
          </div>
        </div>
      </div>

      <div className="relative hidden h-screen w-screen items-center justify-center overflow-hidden lg:flex tall:hidden">
        <div className="flex w-full flex-col items-center">
          <div className="flex w-[35%] min-w-[500px] max-w-[550px] flex-col items-center gap-1 rounded-lg bg-white py-28 px-0  text-center shadow-2xl 4xl:max-w-[650px] 4xl:gap-4 4xl:py-48 4xl:px-2">
            <div className="relative flex aspect-square w-[15%] min-w-[200px] items-center justify-center overflow-hidden rounded-full">
              <Image src="/me.jpg" fill alt="abel pineiro" />
            </div>
            <h1 className="font-prompt text-4xl 4xl:text-5xl">{TITLE}</h1>
            <p className="w-3/4 font-abel text-2xl 4xl:text-3xl">
              {DESCRIPTION}
            </p>
          </div>
        </div>

        <div className="absolute aspect-square h-[85%] animate-orbit-slow rounded-[100%] border-2 border-dashed border-slate-500 bg-transparent">
          <div className="relative h-full w-full">
            <OrbitingOuterPlanet
              className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
              title="Work"
              image="/jupiter.png"
            />

            <Link href="/music">
              <OrbitingOuterPlanet
                className="left-0 bottom-0 translate-x-full"
                title="Music"
                image="/neptune.png"
              />
            </Link>

            <OrbitingOuterPlanet
              className="right-0 top-1/2 translate-x-1/2"
              image="/coldPlanet.png"
              title="Entertainment"
            />
          </div>
        </div>

        <div className="absolute aspect-square h-[62%] animate-orbit rounded-[100%] border-2 border-dashed border-slate-500 bg-transparent">
          <div className="relative h-full w-full">
            <OrbitingInnerPlanet
              image="/venus.png"
              title="Anime"
              className="bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
            />

            <OrbitingInnerPlanet
              image="/starwarsPlanet.png"
              title="Code"
              className="top-0 right-0 -translate-x-1/2"
            />

            <OrbitingInnerPlanet
              image="/purplePlanet.png"
              title="Games"
              className="top-1/2 left-0 -translate-x-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const OrbitingInnerPlanet = ({
  className,
  title,
  image,
}: {
  className: string;

  title: string;
  image: string;
}) => {
  return (
    <div
      className={`rounded-ful absolute flex aspect-square h-[20%] items-center justify-center ${className}`}
    >
      <div className="h-full w-full animate-orbit-reverse">
        <div className="absolute top-full left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg bg-slate-700 py-1 px-4 text-2xl text-white">
          {title}
        </div>
        <Image
          src={image}
          height={200}
          width={200}
          alt="planet"
          className="-z-10"
        />
      </div>
    </div>
  );
};

const OrbitingOuterPlanet = ({
  className,
  title,
  image,
}: {
  className: string;
  title: string;
  image: string;
}) => {
  return (
    <div
      className={`absolute flex aspect-square h-[15%] items-center justify-center rounded-full ${className}`}
    >
      <div className="h-full w-full animate-orbit-slow-reverse">
        <div className="absolute top-full left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg bg-slate-700 py-1 px-4 text-2xl text-white">
          {title}
        </div>
        <Image
          src={image}
          height={200}
          width={200}
          alt="planet"
          className="-z-10"
        />
      </div>
    </div>
  );
};

const PlanetSlider = ({
  title,
  planetImage,
  animation,
  links,
}: {
  title: string;
  planetImage: string;
  animation: string;
  links: string;
}) => {
  return (
    <Link
      href={links}
      className="relative h-20 w-full max-w-sm rounded-full border-4 border-slate-500 shadow-md"
    >
      <span className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 font-prompt text-4xl font-bold tracking-[2px] text-slate-500">
        {title}
      </span>
      <Image
        src={planetImage}
        height={80}
        width={80}
        alt="planet"
        className={`absolute top-1/2 left-0 -translate-y-1/2 translate-x-[10%] ${animation}`}
      />
    </Link>
  );
};

export default Home;
