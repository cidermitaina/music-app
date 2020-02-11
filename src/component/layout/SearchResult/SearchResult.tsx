import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faHeadphones } from "@fortawesome/free-solid-svg-icons";

interface Props {
  data: any;
  artists: any;
  albums: any;
  tracks: any;
  playMusic: (src: string, id: string) => void;
}

export const SearchResult: React.FC<Props> = ({
  data,
  artists,
  albums,
  tracks,
  playMusic
}) => {
  const onClickPlay = (src: string, id: string) => {
    playMusic(src, id);
  };

  return (
    <Wrapper>
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
                <Icon onClick={() => onClickPlay(track.preview_url, track.id)}>
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
