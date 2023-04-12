import { allTransactions } from "../../../drizzle/db";

export const runtime = "experimental-edge";

const Page = async () => {
  const transactions = await allTransactions();

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
