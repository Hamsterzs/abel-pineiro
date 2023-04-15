import randomNum from "../../utils/randomNum";

export const runtime = "experimental-edge";
export const revalidate = 0;

const Page = () => {
  return (
    <div className="flex h-screen items-center justify-center text-3xl">
      From the edge {randomNum()}
    </div>
  );
};

export default Page;
