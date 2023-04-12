import prisma from "../../lib/prisma";

const Page = async () => {
  const transactions = await prisma.transactions.findMany();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 text-lg">
      {transactions.map((transaction) => (
        <div key={transaction.id}>
          <p>{transaction.name}</p>
          <p>{transaction.amount}</p>
          <p>{transaction.createdAt?.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;