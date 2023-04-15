import { allTransactions } from "../../drizzle/db";
import randomNum from "../../utils/randomNum";

export const revalidate = 0;

const Page = async () => {
  const transactions1 = await allTransactions();
  const transactions2 = await allTransactions();
  const transactions3 = await allTransactions();

  const transactions = [...transactions1, ...transactions2, ...transactions3];

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 text-lg">
      {randomNum()}
      {transactions.map((transaction) => (
        <div key={transaction.id}>
          <p>{transaction.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
