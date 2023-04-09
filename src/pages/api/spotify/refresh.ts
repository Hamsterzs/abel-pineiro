import { NextApiRequest, NextApiResponse } from "next";
import spotifyCredentails from "../../../utils/spotifyCredentials";
import getRefreshToken from "../../../server/Spotify/getRefreshToken";
import dbSpotify from "../../../db/spotify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(404);

  const refreshToken = await getRefreshToken();

  console.log("Refresh token", refreshToken);

  res.status(200).json({ refreshToken });
}
