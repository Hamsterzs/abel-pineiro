"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { trpc } from "../../../utils/trpc";

const Page = () => {
  const seed = trpc.prima.create.useMutation({
    onSuccess: () => {
      alert("seeded");
    },
  });

  const transactions = trpc.prima.get.useQuery();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1>Prisma</h1>

      {transactions.data?.map((transaction) => (
        <div key={transaction.id}>
          <p>{transaction.name}</p>
          <p>{transaction.amount}</p>
          <p>{transaction.createdAt}</p>
        </div>
      ))}

      <button
        className="border-2 border-blue-300 px-8 py-2"
        onClick={() => seed.mutate()}
      >
        Seed
      </button>
      <ReactQueryDevtools />
    </div>
  );
};

export default trpc.withTRPC(Page) as () => JSX.Element;
