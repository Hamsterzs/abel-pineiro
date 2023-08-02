"use client";

import React, { useEffect } from "react";

const people = [
  {
    name: "Xanthus Rogers",
    email: "facilisis.magna.tellus@aol.com",
    phone: "(240) 287-4526",
  },
  {
    name: "Andrew Kline",
    email: "mattis@google.couk",
    phone: "(483) 220-9684",
  },
  {
    name: "Eagan Ballard",
    email: "non@google.edu",
    phone: "1-815-140-4435",
  },
  {
    name: "Walker Fowler",
    email: "lectus.ante.dictum@outlook.org",
    phone: "(811) 567-4248",
  },
  {
    name: "Fritz Burke",
    email: "malesuada.fames@protonmail.net",
    phone: "(717) 648-8147",
  },
  {
    name: "Tallulah Wynn",
    email: "sem.egestas@outlook.couk",
    phone: "(852) 836-0047",
  },
  {
    name: "Sybil Green",
    email: "risus.varius@google.org",
    phone: "(637) 617-7481",
  },
  {
    name: "Skyler Eaton",
    email: "vulputate.dui.nec@google.net",
    phone: "1-298-665-1778",
  },
  {
    name: "Kathleen Mcfarland",
    email: "tempus@protonmail.org",
    phone: "(870) 525-1210",
  },
  {
    name: "Clarke Farmer",
    email: "vulputate.lacus.cras@aol.edu",
    phone: "(266) 660-6166",
  },
  {
    name: "Keane Phillips",
    email: "eget.ipsum@yahoo.org",
    phone: "(611) 423-6763",
  },
  {
    name: "Kane Sherman",
    email: "dui@hotmail.ca",
    phone: "1-255-447-9491",
  },
  {
    name: "Lois Nieves",
    email: "vel@aol.net",
    phone: "1-666-623-6800",
  },
  {
    name: "Valentine Palmer",
    email: "venenatis@aol.org",
    phone: "1-186-301-5576",
  },
  {
    name: "Cruz Decker",
    email: "ut.nulla@outlook.edu",
    phone: "(744) 189-2562",
  },
  {
    name: "Dante Morse",
    email: "ac.turpis@yahoo.edu",
    phone: "(201) 239-1274",
  },
  {
    name: "Abraham Kidd",
    email: "non@aol.org",
    phone: "(725) 352-6089",
  },
  {
    name: "Tasha Evans",
    email: "non.lacinia@aol.couk",
    phone: "(539) 811-2687",
  },
  {
    name: "Nell Cannon",
    email: "libero.dui@yahoo.org",
    phone: "1-519-947-5178",
  },
  {
    name: "Charles Brown",
    email: "mattis@outlook.org",
    phone: "(869) 764-9757",
  },
];

const Contacts = ({ loadTime }: { loadTime: number }) => {
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
    }, loadTime);
  }, [loadTime]);

  if (loading)
    return (
      <div className="my-auto flex flex-col">
        {loadTime > 5000 && (
          <video
            className="mt-16 w-full scale-[2.2] 2xl:w-full 2xl:scale-100"
            loop
            ref={videoRef}
            src="/npc.mp4"
            autoPlay
            muted
          />
        )}
        <h1 className="mx-auto mt-auto text-4xl">Loading...</h1>
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
