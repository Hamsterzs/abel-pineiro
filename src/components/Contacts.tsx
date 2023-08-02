"use client";

import React, { useEffect } from "react";

const Contacts = ({
  people,
}: {
  people: { name: string; email: string; phone: string }[];
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const unMuteOnClick = () => {
      const video = videoRef.current;

      if (!video) return;

      video.muted = false;
    };

    document.querySelector("body")?.addEventListener("click", unMuteOnClick);

    return () => {
      document
        .querySelector("body")
        ?.removeEventListener("click", unMuteOnClick);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

  if (loading)
    return (
      <div className="my-auto flex flex-col">
        <video
          className="mt-16 w-full scale-[2.2] 2xl:w-full 2xl:scale-100"
          loop
          ref={videoRef}
          src="/npc.mp4"
          autoPlay
          muted
        ></video>
        <h1 className="mx-auto mt-auto text-4xl">Loading</h1>
      </div>
    );

  return (
    <>
      <h1 className="mt-16 text-5xl font-bold">Contacts</h1>
      <ul>
        {people.map((person) => (
          <li key={person.name} className="my-6">
            <div>
              <h2>{person.name}</h2>
              <p>{person.email}</p>
              <p>{person.phone}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Contacts;
