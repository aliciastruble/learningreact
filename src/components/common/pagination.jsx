import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Paginator = props => {
  const { itemsCount, pageSize, curPage, changePage } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation links">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === curPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => changePage(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Paginator.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  curPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired
};

export default Paginator;
