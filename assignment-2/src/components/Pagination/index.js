import React from "react";
import styled from "styled-components";

import { usePagination, DOTS } from "../../hooks/usePagination";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <Wrapper>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <DisplayDots>&#8230;</DisplayDots>;
        }

        return (
          <ButtonPage
            onClick={() => onPageChange(pageNumber)}
            isActive={currentPage === pageNumber ? true : false}
          >
            {pageNumber}
          </ButtonPage>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

const ButtonPage = styled.button`
  width: 24px;
  height: 24px;
  border: 2px solid #bac9d4;
  margin-right: 8px;
  background-color: ${(props) => (props.isActive ? "#DEE4E9" : "#ffffff")};
`;

const DisplayDots = styled.span`
  margin-right: 8px;
`;

export default Pagination;
