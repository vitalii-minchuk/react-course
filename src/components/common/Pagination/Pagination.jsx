import React from "react";
import s from "./Pagination.module.css";

const Pagination = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];
  for (let i = 1; i < pagesCount; i++) {
    pages.push(i);
  }

  let portionSize = 10;
  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = React.useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;


  return (
    <div className={s.pagination}>
      {portionNumber > 1 &&
        <button className={s.btn} onClick={() => {setPortionNumber(portionNumber - 1)}}
        >{"<"}</button>
      }
      {
        pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
          .map(page => {
            return (
              <span
                key={page}
                className={props.currentPage === page ? s.selectedPage : undefined}
                onClick={() => { props.onPageChanged(page) }}
              >
                {page}
              </span>
            )
          }
        )
      }
      {portionCount > portionNumber &&
        <button className={s.btn} onClick={() => {setPortionNumber(portionNumber + 1)}}
        >{'>'}</button>
      }
    </div>
  )
}








export default Pagination;
