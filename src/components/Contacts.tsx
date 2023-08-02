"use client";

import React, { use } from "react";

const Contacts = ({
  people,
}: {
  people: { name: string; email: string; phone: string }[];
}) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
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
          autoPlay
        >
          <source src="/npc.mp4" type="video/mp4" />
        </video>
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
