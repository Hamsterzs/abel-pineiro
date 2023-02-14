import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-gray-200">
      <Head>
        <title>Abel Pineiro</title>
        {/* <meta
          name="description"
          content="Welcome to my personal website, Click through to learn about me."
        /> */}
      </Head>
      <div className="flex w-full flex-col items-center">
        <div className="flex flex-col items-center gap-1 rounded-lg bg-white py-28 px-2 text-center shadow-2xl 4xl:gap-2 4xl:py-48 4xl:px-12">
          <div className="relative flex aspect-square w-[15%] min-w-[200px] items-center justify-center overflow-hidden rounded-full">
            <Image src="/me.jpg" fill alt="abel pineiro" />
          </div>
          <h1 className="font-prompt text-4xl 4xl:text-5xl">Abel Pineiro</h1>
          <p className="w-10/12 font-abel text-2xl 4xl:text-3xl">
            Navigate to some of my interests by selecting a planet.
          </p>
        </div>
      </div>

      <div className="absolute aspect-square h-[90%] animate-orbit-slow rounded-[100%] border-2 border-dashed border-slate-500 bg-transparent ">
        <div className="relative h-full w-full">
          <div className="absolute left-1/2 top-0 flex aspect-square h-[15%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue-300">
            <div className="h-full w-full animate-orbit-slow-reverse">
              <button className="absolute top-full left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg bg-slate-700 py-1 px-4 text-2xl text-white">
                Code
              </button>
              <Image
                src="/jupiter.png"
                fill
                alt="abel pineiro"
                className="-z-10"
              />
            </div>
          </div>

          <div className="absolute left-0 bottom-0 flex aspect-square h-[15%] translate-x-full items-center justify-center rounded-full bg-blue-300">
            <div className="h-full w-full animate-orbit-slow-reverse">
              <button className="absolute top-full left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg bg-slate-700 py-1 px-4 text-2xl text-white">
                Work
              </button>
              <Image
                src="/neptune.png"
                fill
                alt="abel pineiro"
                className="-z-10"
              />
            </div>
          </div>

          <div className="absolute right-0 top-1/2 flex aspect-square h-[15%] translate-x-1/2 items-center justify-center rounded-full">
            <div className="h-full w-full animate-orbit-slow-reverse">
              <button className="absolute top-full left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg bg-slate-700 py-1 px-4 text-2xl text-white">
                Music
              </button>
              <Image
                src="/coldPlanet.png"
                fill
                alt="abel pineiro"
                className="-z-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute aspect-square h-[65%] animate-orbit rounded-[100%] border-2 border-dashed border-slate-500 bg-transparent">
        <div className="relative h-full w-full">
          <div className="absolute bottom-0 left-1/2 flex aspect-square h-[20%] -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-blue-300">
            <div className="h-full w-full animate-orbit-reverse">
              <button className="absolute top-full left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg bg-slate-700 py-1 px-4 text-2xl text-white">
                Music
              </button>
              <Image
                src="/venus.png"
                fill
                alt="abel pineiro"
                className="-z-10"
              />
            </div>
          </div>

          <div className="absolute top-0 right-0 flex aspect-square h-[20%] -translate-x-1/2 items-center justify-center rounded-full">
            <div className="h-full w-full animate-orbit-reverse">
              <button className="absolute top-full left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg bg-slate-700 py-1 px-4 text-2xl text-white">
                Music
              </button>
              <Image
                src="/starwarsPlanet.png"
                fill
                alt="abel pineiro"
                className="-z-10"
              />
            </div>
          </div>

          <div className="absolute top-1/2 left-0 flex aspect-square h-[20%] -translate-x-1/2 items-center justify-center rounded-full">
            <div className="h-full w-full animate-orbit-reverse">
              <button className="absolute top-full left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg bg-slate-700 py-1 px-4 text-2xl text-white">
                Music
              </button>
              <Image
                src="/purplePlanet.png"
                fill
                alt="abel pineiro"
                className="-z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
