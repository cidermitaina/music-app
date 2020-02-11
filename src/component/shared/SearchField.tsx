import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Props {
  searchArtist: (value: string) => void;
  setSearchValue: (value: string) => void;
}

export const SearchField: React.FC<Props> = ({
  searchArtist,
  setSearchValue
}) => {
  let history = useHistory();

  const hundleSearch = (value: string) => {
    setSearchValue(value);
    if (value === "") {
      return false;
    } else {
      searchArtist(value);
    }
  };

  return (
    <>
      <SearchBox>
        <Input
          type="text"
          placeholder="Search artist..."
          onChange={e => {
            hundleSearch(e.currentTarget.value);
            history.push(`/search/${e.currentTarget.value}`);
          }}
        />
        <SearchIcon>
          <FontAwesomeIcon icon={faSearch} size="1x" />
        </SearchIcon>
      </SearchBox>
    </>
  );
};

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
