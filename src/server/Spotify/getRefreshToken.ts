import { request } from "http";
import spotifyCredentails from "../../utils/spotifyCredentials";
import FormData from "form-data";
import SpotifyWebApi from "spotify-web-api-node";
import dbSpotify from "../../db/spotify";
import prisma from "../../lib/prisma";

const getRefreshToken = async () => {
  const spotifyApi = new SpotifyWebApi({
    clientId: spotifyCredentails.client_id,
    clientSecret: spotifyCredentails.client_secret,
    redirectUri: spotifyCredentails.redirect_uri,
  });

  const tokens = await prisma.spotify.findFirst();

  if (!tokens) throw new Error("Spotify tokens don't exist");

  spotifyApi.setRefreshToken(tokens.refreshToken);

  const response = await spotifyApi.refreshAccessToken();

  const newTokens = {
    accessToken: response.body.access_token,
    refreshToken: response.body.refresh_token,
  };

  await dbSpotify.setNewTokens(newTokens);

  return newTokens;
};

export default getRefreshToken;
