import { NextApiRequest, NextApiResponse } from "next";
import spotifyCredentails from "../../../utils/spotifyCredentials";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(404);

  const { code } = req.query;

  if (code) {
    const url = "https://accounts.spotify.com/api/token";

    const data = {
      grant_type: "authorization_code",
      code,
      redirect_uri: spotifyCredentails.redirect_uri,
      client_id: spotifyCredentails.client_id,
      client_secret: spotifyCredentails.client_secret,
    };

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const searchParams = new URLSearchParams();

    const dataKeys = Object.keys(data);

    Object.keys(data).forEach((prop) => {
      searchParams.set(prop, data[prop]);
    });

    fetch(url, {
      method: "POST",
      headers,
      body: searchParams,
    })
      .then((res) => res.json())
      .then((credentials) => {
        console.log(credentials);
        return res.status(200).json(credentials);
      });
  }
}
