import axios from "axios";

import { accessToken } from "../gateways/httpRequest";

export const GET_PLAYLIST = "GET_PLAYLIST";
export const SEARCH_ITEM = "SEARCH_ITEM";
export const SEARCH_TRACK = "SEARCH_TRACK";
export const PLAY_MUSIC = "PLAY_MUSIC";
export const PAUSE_TRACK = "PAUSE_TRACK";

const ROOT_URL = "https://api.spotify.com/v1";

export const getPlayList = () => async (dispatch: any) => {
  const response = await axios.get(
    `${ROOT_URL}/playlists/1nOdAN3Q38LxoVzLYs6dx9`,
    {
      headers: { Authorization: "Bearer " + (await accessToken()) }
    }
  );

  dispatch({ type: GET_PLAYLIST, response });
};

export const searchArtist = (value: string) => async (dispatch: any) => {
  if (value === "") {
    console.log("error");
  }
  const response = await axios.get(
    `${ROOT_URL}/search?q=${value}&type=artist,album,track`,
    {
      headers: { Authorization: "Bearer " + (await accessToken()) }
    }
  );

  console.log(response);

  dispatch({ type: SEARCH_ITEM, response });
};

export const searchTrack = (value: string) => async (dispatch: any) => {
  const response = await axios.get(
    `${ROOT_URL}/search?q=${value}&type=artist,album,track`,
    {
      headers: { Authorization: "Bearer " + (await accessToken()) }
    }
  );

  dispatch({ type: SEARCH_ITEM, response });
};

export const playTrack = (id: string) => (dispatch: any) => {
  dispatch({ type: PLAY_MUSIC, data: id });
};

export const pauseTrack = (id: string) => (dispatch: any) => {
  dispatch({ type: PAUSE_TRACK, data: id });
};
