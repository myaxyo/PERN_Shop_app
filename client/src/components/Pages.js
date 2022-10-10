import React from "react";
import { PageItem, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setPages } from "../features/device/deviceSlice";
const Pages = () => {
  const { device, totalCount, limit, pagesCount } = useSelector(
    (state) => state.device
  );
  const dispatch = useDispatch();
  const pageCount = Math.ceil(totalCount / limit);
  const pages = [];
  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }
  return (
    <Pagination className="mt-5">
      {pages.map((page) => (
        <PageItem
          activeLabel=""
          active={pagesCount === page}
          key={page}
          onClick={() => dispatch(setPages(page))}
        >
          {page}
        </PageItem>
      ))}
    </Pagination>
  );
};

export default Pages;
