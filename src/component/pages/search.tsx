import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { SearchTop } from "./searchTop";
import { SearchResult } from "../layout/SearchResult";
import { Audio } from "../layout/Audio/Audio";
import { SearchField } from "../shared/SearchField";

import {
  getPlayList,
  searchArtist,
  playTrack,
  pauseTrack
} from "../../actions";

interface Props {
  data: any;
  playlist: any;
  artists: any;
  albums: any;
  tracks: any;
  getPlayList: () => void;
  searchArtist: (value: string) => void;
  playTrack: (id: string) => void;
  pauseTrack: (id: string) => void;
}

export interface State {
  musicSrc: string;
  isPlaying: string;
}

const Search: React.FC<Props> = ({
  data,
  playlist,
  artists,
  albums,
  tracks,
  getPlayList,
  searchArtist,
  playTrack,
  pauseTrack
}) => {
  useEffect(() => {
    getPlayList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [musicSrc, setMusicSrc] = useState(
    "https://p.scdn.co/mp3-preview/0fa4dbb8b2547fd7f9b7e54dd42e37b78af1edd4?cid=649a33a55d14495c9f20aab46e21d2f0"
  );
  const [trackId, setTrackId] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const playMusic = (src: string, id: string) => {
    if (src === musicSrc) {
      const audio = document.querySelector(
        ".rhap_play-pause-button"
      ) as HTMLElement;
      audio.click();
    } else {
      setMusicSrc(src);
      setTrackId(id);
    }
  };

  return (
    <>
      <Wrapper>
        <SearchField
          searchArtist={searchArtist}
          setSearchValue={setSearchValue}
        />
        {searchValue === "" ? (
          <SearchTop playMusic={playMusic} data={data} playlist={playlist} />
        ) : (
          <SearchResult
            playMusic={playMusic}
            data={data}
            artists={artists}
            albums={albums}
            tracks={tracks}
          />
        )}
      </Wrapper>
      <Audio
        musicSrc={musicSrc}
        trackId={trackId}
        playTrack={playTrack}
        pauseTrack={pauseTrack}
      />
    </>
  );
};

const mapStateToProps = (state: any) => {
  console.log(state);

  return {
    data: state.music,
    playlist: state.music.playlist,
    artists: state.music.artists,
    albums: state.music.albums,
    tracks: state.music.tracks
  };
};

const mapDispatchToProps = { getPlayList, searchArtist, playTrack, pauseTrack };

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  padding-bottom: 130px;
  text-align: center;
`;
