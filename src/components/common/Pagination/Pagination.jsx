import React from "react";
import s from "./Pagination.module.css";

const Pagination = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];
  for (let i = 1; i < pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={s.pagination}>
      {
        pages.map(page => {
          return (
            <span
              key={page}
              className={props.currentPage === page ? s.selectedPage : undefined}
              onClick={() => { props.onPageChanged(page) }}
            >
              {page}
            </span>
          )
        })
      }
    </div>
  )
}

export default Pagination;
