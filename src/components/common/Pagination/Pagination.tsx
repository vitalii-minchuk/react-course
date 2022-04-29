import React from "react";
import s from "./Pagination.module.css";

type PropsType = {
  totalUsersCount: number
  pageSize: number
  onPageChanged: (pageNumber: number) => void 
  currentPage: number
}

const Pagination: React.FC<PropsType> = ( {totalUsersCount, pageSize, onPageChanged, currentPage } ) => {
  let pagesCount: number = Math.ceil(totalUsersCount / pageSize);

  let pages: Array<number> = [];
  for (let i = 1; i < pagesCount; i++) {
    pages.push(i);
  }

  let portionSize: number = 10
  let portionCount: number = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = React.useState(1);
  let leftPortionPageNumber: number = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber: number = portionNumber * portionSize;


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
                className={currentPage === page ? s.selectedPage : undefined}
                onClick={() => { onPageChanged(page) }}
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

export default Pagination
