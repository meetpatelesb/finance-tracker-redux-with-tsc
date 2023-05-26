import React from "react";
import { paginationType } from "../interface/app_interface";

const Pagination: React.FC<paginationType> = (props) => {
  const currentPage = props.currentPage;
  const pages = props.pages;
  const nThPage = props.nThPage;
  const setCurrentPage = props.setCurrentPage;

  return (
    <div>
      <div className="pagination">
        <button
          className="page"
          onClick={() => {
            if (currentPage !== 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          Prev
        </button>
        {pages.map((page, index) => {
          return (
            <button
              key={index}
              className={page === currentPage ? "active" : "page"}
              onClick={() => {
                setCurrentPage(page);
              }}
            >
              {page}
            </button>
          );
        })}

        <button
          className="page"
          onClick={() => {
            if (currentPage !== nThPage) {
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          Next
        </button>
      </div>
      ;
    </div>
  );
};

export default Pagination;
