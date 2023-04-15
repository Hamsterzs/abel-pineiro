export const runtime = "experimental-edge";
export const revalidate = 0;

const randomNum = () => Math.floor(Math.random() * 1000);

const Page = () => {
  return (
    <div className="flex h-screen items-center justify-center text-3xl">
      From the edge {randomNum()}
    </div>
  );
};

export default Page;
