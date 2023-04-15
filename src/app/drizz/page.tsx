import { allTransactions } from "../../drizzle/db";
import randomNum from "../../utils/randomNum";

export const revalidate = 0;

const Page = async () => {
  const transactions = await allTransactions();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 text-lg">
      {randomNum()}
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
