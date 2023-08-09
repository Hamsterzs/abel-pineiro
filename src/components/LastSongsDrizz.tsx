"use client";

import React, { use } from "react";
import { BiLoader, BiSkipNext } from "react-icons/bi";
import { FaPlayCircle } from "react-icons/fa";

// =================== Layout components ===================
type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="container mx-auto 3xl:max-w-[1750px] 4xl:max-w-[2100px]">
      <div className="mx-auto flex h-16 w-11/12 items-center rounded-xl bg-white/70 shadow-lg backdrop-blur-lg md:h-20 md:w-[70%] lg:w-[65%] xl:w-[77%] 2xl:w-[78%] 3xl:w-[84%] 4xl:w-[85%]">
        {children}
      </div>
    </div>
  );
};

const TitleContainer = ({ children }: LayoutProps) => (
  <div className="ml-4 mr-auto w-3/5 text-2xl sm:ml-6 sm:w-1/2 lg:w-auto">
    {children}
  </div>
);

const Title = ({ children }: LayoutProps) => (
  <div className="w-full truncate font-fjalla text-sm font-bold md:text-lg lg:text-2xl">
    {children}
  </div>
);

const SubTitle = ({ children }: LayoutProps) => (
  <div className="w-full truncate text-xs md:text-base lg:text-xl">
    {children}
  </div>
);

const ActionsContainer = ({ children }: LayoutProps) => (
  <div className="ml-4 mr-auto w-3/5 text-2xl sm:ml-6 sm:w-1/2 lg:w-auto">
    {children}
  </div>
);

const Label = ({ children }: LayoutProps) => (
  <button className="absolute top-0 left-0 mr-4 ml-auto -translate-y-1/2 rounded-full bg-blue-500 px-6 py-1 text-xs font-bold text-white shadow-md lg:relative lg:translate-y-0 lg:py-2 lg:text-lg">
    {children}
  </button>
);

// =================== Exported components ===================
type LastSongsProps = {
  myLastSongs: { song: string; artist: string }[];
};

const LastSongsClient = ({ myLastSongs }: LastSongsProps) => {
  const [lastSongIndex, setLastSongIndex] = React.useState(0);

  const handleLastSongIndexChange = (index: number) => {
    if (index < 0 || index >= (myLastSongs?.length || 0)) return;

    setLastSongIndex(index);
  };

  return (
    <Layout>
      <TitleContainer>
        <Title>{myLastSongs[lastSongIndex]?.song}</Title>
        <SubTitle>{myLastSongs[lastSongIndex]?.artist}</SubTitle>
      </TitleContainer>
      <ActionsContainer>
        <button onClick={() => handleLastSongIndexChange(lastSongIndex + 1)}>
          <BiSkipNext className="h-8 w-8 rotate-180 text-slate-500 sm:h-10 sm:w-10 lg:h-[50px] lg:w-[50px] xl:h-[60px] xl:w-[60px]" />
        </button>
        <button disabled>
          <FaPlayCircle className="h-8 w-8 text-slate-500 sm:h-10 sm:w-10 lg:h-[50px] lg:w-[50px] xl:h-[60px] xl:w-[60px]" />
        </button>
        <button onClick={() => handleLastSongIndexChange(lastSongIndex - 1)}>
          <BiSkipNext className="mr-auto h-8 w-8 text-slate-500 sm:h-10 sm:w-10 lg:h-[50px] lg:w-[50px] xl:h-[60px] xl:w-[60px]" />
        </button>
      </ActionsContainer>

      <Label>My last songs</Label>
    </Layout>
  );
};

export const LastSongsLoader = () => (
  <Layout>
    <TitleContainer>
      <Title>Loading my last songs.</Title>
      <SubTitle>
        <BiLoader className="mr-2 inline-block animate-spin" />
      </SubTitle>
    </TitleContainer>
    <ActionsContainer>
      <button disabled>
        <BiSkipNext className="h-8 w-8 rotate-180 text-slate-500 sm:h-10 sm:w-10 lg:h-[50px] lg:w-[50px] xl:h-[60px] xl:w-[60px]" />
      </button>

      <button disabled>
        <FaPlayCircle className="h-8 w-8 text-slate-500 sm:h-10 sm:w-10 lg:h-[50px] lg:w-[50px] xl:h-[60px] xl:w-[60px]" />
      </button>

      <button disabled>
        <BiSkipNext className="mr-auto h-8 w-8 text-slate-500 sm:h-10 sm:w-10 lg:h-[50px] lg:w-[50px] xl:h-[60px] xl:w-[60px]" />
      </button>
    </ActionsContainer>

    <Label>My last songs</Label>
  </Layout>
);

export default LastSongsClient;
