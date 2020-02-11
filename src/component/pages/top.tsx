import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import mv from "../../DancingDoodle.svg";

export const Top: React.FC<{}> = () => {
  return (
    <div className="App">
      <Wrapper className="App-header">
        <Mv>
          <img src={mv} alt="logo" />
        </Mv>
        <Link to="/search">
          <Text>Let's search music!</Text>
        </Link>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Mv = styled.div`
  width: 450px;
`;

const Text = styled.p`
  margin: 0;
  font-weight: 900;
  letter-spacing: 0.7px;
  font-size: 25px;
  margin-top: 42px;
`;
