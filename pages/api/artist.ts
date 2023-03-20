// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const artists = await prisma.artist.findMany();

    res.status(200).json(artists);
  }

  if (req.method === "POST") {
    const { name } = req.body;
    console.log(req.body);
    if (!name || typeof name !== "string") return;

    const data = await prisma.artist.create({
      data: {
        name,
      },
    });
    res.status(200).json(data);
  }
}
