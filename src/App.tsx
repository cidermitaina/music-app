import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AudioPlayer from "react-h5-audio-player";
import "./audio.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faSearch,
  faHeadphones
} from "@fortawesome/free-solid-svg-icons";

import mv from "./DancingDoodle.svg";
import "./App.css";
import { searchArtist, playTrack, pauseTrack } from "./actions";

interface Props {
  data: any;
  artists: any;
  albums: any;
  tracks: any;
  searchArtist: (value: string) => void;
  playTrack: (id: string) => void;
  pauseTrack: (id: string) => void;
}

export interface State {
  musicSrc: string;
  isPlaying: string;
}

const App: React.FC<Props> = ({
  data,
  artists,
  albums,
  tracks,
  searchArtist,
  playTrack,
  pauseTrack
}) => {
  const [musicSrc, setMusicSrc] = useState(
    "https://p.scdn.co/mp3-preview/0fa4dbb8b2547fd7f9b7e54dd42e37b78af1edd4?cid=649a33a55d14495c9f20aab46e21d2f0"
  );
  const [trackId, setTrackId] = useState("");

  const onClickPlay = (src: string, id: string) => {
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

  const onPlay = (id: string) => {
    playTrack(id);
  };

  const onPause = (id: string) => {
    pauseTrack(id);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!artists && (
          <Mv>
            <img src={mv} alt="logo" />
          </Mv>
        )}
        <SearchBox>
          <Input
            type="text"
            placeholder="Search artist..."
            onChange={e => {
              searchArtist(e.currentTarget.value);
            }}
          />
          <SearchIcon>
            <FontAwesomeIcon icon={faSearch} size="1x" />
          </SearchIcon>
        </SearchBox>
        {artists && (
          <ArtistText>
            <Text>Artist</Text>
          </ArtistText>
        )}
        <ArtistArea>
          {artists &&
            artists.map((artist: any) => (
              <Artist key={artist.id}>
                <ArtistImg>
                  {artist.images[0] && (
                    <img src={artist.images[0].url} alt={artist.name} />
                  )}
                </ArtistImg>
                <ArtistName>{artist.name}</ArtistName>
              </Artist>
            ))}
        </ArtistArea>
        {albums && (
          <ArtistText>
            <Text>Album</Text>
          </ArtistText>
        )}
        <ArtistArea>
          {albums &&
            albums.map((album: any) => (
              <Artist key={album.id}>
                <ArtistImg>
                  {album.images[0] && (
                    <img src={album.images[0].url} alt={album.artists.name} />
                  )}
                </ArtistImg>
                <ArtistName>{album.name}</ArtistName>
                <ArtistName2>{album.artists[0].name}</ArtistName2>
              </Artist>
            ))}
        </ArtistArea>
        {tracks && (
          <ArtistText>
            <Text>Tracks</Text>
          </ArtistText>
        )}
        <ArtistArea>
          {tracks &&
            tracks.map((track: any) => (
              <Artist key={track.id}>
                <ArtistImg>
                  {track.album.images[0] && (
                    <img
                      src={track.album.images[0].url}
                      alt={track.artists.name}
                    />
                  )}
                </ArtistImg>
                <ArtistName>{track.name}</ArtistName>
                <ArtistName2>{track.artists[0].name}</ArtistName2>
                {track.preview_url && (
                  <Icon
                    onClick={() => onClickPlay(track.preview_url, track.id)}
                  >
                    {data.isPlaying === track.id ? (
                      <FontAwesomeIcon icon={faHeadphones} size="lg" />
                    ) : (
                      <FontAwesomeIcon icon={faPlayCircle} size="lg" />
                    )}
                  </Icon>
                )}
              </Artist>
            ))}
        </ArtistArea>
        {!artists && <Text>Let's search music!</Text>}
      </header>
      {tracks && (
        <AudioPlayerWrapper>
          <AudioPlayer
            src={musicSrc}
            autoPlayAfterSrcChange={true}
            showLoopControl={false}
            onPlay={() => onPlay(trackId)}
            onPause={() => onPause("")}
          />
        </AudioPlayerWrapper>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  console.log(state);

  return {
    data: state.music,
    artists: state.music.artists,
    albums: state.music.albums,
    tracks: state.music.tracks
  };
};

const mapDispatchToProps = { searchArtist, playTrack, pauseTrack };

export default connect(mapStateToProps, mapDispatchToProps)(App);

const Mv = styled.div`
  width: 450px;
`;

const SearchBox = styled.div`
  position: relative;
`;

const Input = styled.input`
  margin-top: 36px;
  padding: 0.75em 1.5em;
  background-color: #f1f3f5;
  appearance: none;
  border-radius: 9999px;
  border: none;
  outline: none;
  width: 320px;
  font-size: 16px;
  font-weight: 900;
  color: #495057;
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 17px;
  bottom: 7px;

  & > svg {
    color: cadetblue;
  }
`;

const ArtistText = styled.div`
  text-align: left;
  width: 90%;
`;

const Text = styled.p`
  margin: 0;
  font-weight: 900;
  letter-spacing: 0.7px;
  font-size: 25px;
  margin-top: 42px;
`;

const ArtistArea = styled.div`
  width: 90%;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const Artist = styled.div`
  margin-top: 32px;
  padding: 20px 1.5% 43px;
  background: cadetblue;
  border-radius: 8px;
  position: relative;
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
    background: #568e8f;
    transition: 0.4s all;
  }

  &:hover svg {
    transition: 0.4s all;
    opacity: 1;
  }
`;

const ArtistName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  margin-top: 16px;
`;

const ArtistName2 = styled.p`
  font-size: 15px;
  font-weight: bold;
  margin: 0;
  margin-top: 8px;
`;

const ArtistImg = styled.div`
  & > img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Icon = styled.div`
  position: absolute;
  bottom: 16px;
  right: 12px;
  & > svg {
    transition: 0.2s all;
    opacity: 1;
  }

  &:hover > svg {
    transform: scale(1.2);
  }
`;

const AudioPlayerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #212121;
`;
