import React from "react";

const peopleJson = [
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

const Page = async () => {
  const loadData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    return peopleJson;
  };

  const people = await loadData();

  return (
    <>
      <h1 className="mt-16 text-5xl font-bold">Contacts</h1>
      <video className="mt-16" autoPlay loop>
        <source src="/npc.mp4" type="video/mp4" />
      </video>
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

export default Page;
