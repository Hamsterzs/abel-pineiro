"use client";
import React from "react";
import { trpc } from "../../../utils/trpc";

const Page = () => {
  //   const people = await allPeople();
  const transaction = trpc.drizz.get.useQuery();

  const seedTransactions = trpc.drizz.seed.useMutation({
    onSuccess: () => {
      transaction.refetch();
    },
  });

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3 text-3xl">
      <button onClick={() => seedTransactions.mutate()}>Create</button>
      {transaction.data?.map((tran) => (
        <div key={tran.id}>
          <p>{tran.name}</p>
          <p>{tran.amount}</p>
          <p>{tran.createdAt}</p>
        </div>
      ))}
    </div>
  );
};

export default trpc.withTRPC(Page);
