import { ReactNode } from 'react';
import cn from 'classnames';

type Pagination = React.FC<{
  itemsPerPage: number;
  count: number;
  next: number;
  prev: number;
}>;

export const Pagination: Pagination = ({ itemsPerPage, count, next, prev }) => (
  <nav
    className="relative z-0 inline-flex shadow-sm -space-x-px"
    aria-label="Pagination"
  >
    <p>
      Showing {itemsPerPage} of {count} entries
    </p>
    <br></br>
    <a
      href="#"
      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      Previous
    </a>
    <a
      href="#"
      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      Next
    </a>
  </nav>
);
