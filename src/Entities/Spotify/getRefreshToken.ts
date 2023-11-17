import spotifyCredentails from "./spotifyCredentials";
import SpotifyWebApi from "spotify-web-api-node";
import dbSpotify from ".";
import { db } from "../../../db/db";
import { spotify } from "../../../db/schema";

const getRefreshToken = async () => {
  const spotifyApi = new SpotifyWebApi({
    clientId: spotifyCredentails.client_id,
    clientSecret: spotifyCredentails.client_secret,
    redirectUri: spotifyCredentails.redirect_uri,
  });

  const tokens = await db.select().from(spotify).limit(1);
  const [token] = tokens;

  if (!token) throw new Error("Spotify tokens don't exist");

  spotifyApi.setRefreshToken(token.refreshToken);

  // Move to api so it this function can work on the edge.
  const response = await spotifyApi.refreshAccessToken();

  const newTokens = {
    accessToken: response.body.access_token,
    refreshToken: response.body.refresh_token,
  };

  await dbSpotify.setNewTokens(newTokens);

  return newTokens;
};

export default getRefreshToken;
