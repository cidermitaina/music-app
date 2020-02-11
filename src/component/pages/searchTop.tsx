import React from "react";
import styled from "styled-components";

import "../../audio.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faHeadphones } from "@fortawesome/free-solid-svg-icons";

interface Props {
  data: any;
  playlist: any;
  playMusic: (src: string, id: string) => void;
}

export interface State {
  musicSrc: string;
  isPlaying: string;
}

export const SearchTop: React.FC<Props> = ({ data, playlist, playMusic }) => {
  const onClickPlay = (src: string, id: string) => {
    playMusic(src, id);
  };

  return (
    <Wrapper className="App-header">
      {playlist && (
        <ArtistText>
          <Text>Recommend</Text>
        </ArtistText>
      )}
      <ArtistArea>
        {playlist &&
          playlist.map((playlist: any) => (
            <Artist key={playlist.track.id}>
              <ArtistImg>
                {playlist.track.album.images[0] && (
                  <img
                    src={playlist.track.album.images[0].url}
                    alt={playlist.track.artists[0].name}
                  />
                )}
              </ArtistImg>
              <ArtistName>{playlist.track.name}</ArtistName>
              <ArtistName2>{playlist.track.artists[0].name}</ArtistName2>
              {playlist.track.preview_url && (
                <Icon
                  onClick={() =>
                    onClickPlay(playlist.track.preview_url, playlist.track.id)
                  }
                >
                  {data.isPlaying === playlist.track.id ? (
                    <FontAwesomeIcon icon={faHeadphones} size="lg" />
                  ) : (
                    <FontAwesomeIcon icon={faPlayCircle} size="lg" />
                  )}
                </Icon>
              )}
            </Artist>
          ))}
      </ArtistArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
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
