import { MusicPageProps } from "../../../../components/MusicPage";
import { db } from "../../../../../db/db";
import { eq } from "drizzle-orm";
import { song } from "../../../../../db/schema";
import Song from "../../../../components/Song";

type PageProps = {
  params: { id: string };
};

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  return db.select({ id: song.id }).from(song);
}

const getMusic = async (id: string) => {
  console.log("Getting music ID from DB");
  return await db.query.song.findFirst({
    where: eq(song.id, id),
    columns: {
      id: true,
      title: true,
      rating: true,
    },
    with: {
      album: {
        columns: {
          title: true,
        },
        with: {
          image: {
            columns: {
              url: true,
            },
          },
        },
      },
    },
  });
};

const Page = async ({ params }: PageProps) => {
  const { id } = params;

  const music = await getMusic(id);

  const musicData: MusicPageProps["music"][number] = {
    id: music!.id,
    title: music!.title,
    subTitle: music!.album.title,
    image: music!.album.image?.url as string,
    rating: music!.rating,
  };

  return <Song musicData={musicData} />;
};

export default Page;
