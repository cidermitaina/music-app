import {
  GET_PLAYLIST,
  SEARCH_ITEM,
  SEARCH_TRACK,
  PLAY_MUSIC,
  PAUSE_TRACK
} from "../actions";

export default (data = [], action: any) => {
  switch (action.type) {
    case GET_PLAYLIST:
      return {
        ...data,
        playlist: action.response.data.tracks.items
      };
    case SEARCH_ITEM:
    case SEARCH_TRACK:
      return {
        ...data,
        artists: action.response.data.artists.items.slice(0, 8),
        albums: action.response.data.albums.items.slice(0, 8),
        tracks: action.response.data.tracks.items.slice(0, 8)
      };
    case PLAY_MUSIC:
      return {
        ...data,
        isPlaying: action.data
      };
    case PAUSE_TRACK:
      return {
        ...data,
        isPlaying: action.data
      };
    default:
      return data;
  }
};
