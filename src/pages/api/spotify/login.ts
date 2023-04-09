import { NextApiRequest, NextApiResponse } from "next";
import spotifyCredentails from "../../../utils/spotifyCredentials";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(404);

  const scopes = "user-read-recently-played";

  const url = `https://accounts.spotify.com/authorize?&client_id=${
    spotifyCredentails.client_id
  }&redirect_uri=${encodeURI(
    spotifyCredentails.redirect_uri as string
  )}&response_type=code&scope=${scopes}`;
  return res.redirect(url);
}
