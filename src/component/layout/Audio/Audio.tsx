import React from "react";
import styled from "styled-components";

import AudioPlayer from "react-h5-audio-player";
import "./audio.scss";

interface Props {
  musicSrc: string;
  trackId: string;
  playTrack: (id: string) => void;
  pauseTrack: (id: string) => void;
}

export const Audio: React.FC<Props> = ({
  musicSrc,
  trackId,
  playTrack,
  pauseTrack
}) => {
  const onPlay = (id: string) => {
    playTrack(id);
  };

  const onPause = (id: string) => {
    pauseTrack(id);
  };

  return (
    <AudioPlayerWrapper>
      <AudioPlayer
        src={musicSrc}
        autoPlayAfterSrcChange={true}
        showLoopControl={false}
        onPlay={() => onPlay(trackId)}
        onPause={() => onPause("")}
      />
    </AudioPlayerWrapper>
  );
};

const AudioPlayerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #212121;
`;
