import { ReactNode } from 'react';
import cn from 'classnames';
import { Button } from 'components/Button';

type Pagination = React.FC<{
  itemsPerPage: number;
  count: number;
  next: number | null;
  prev: number | null;
  currentPage: number;
  totalPages: number;
  setCurrentPage: Function;
}>;

export const Pagination: Pagination = ({
  itemsPerPage,
  currentPage,
  totalPages,
  count,
  next,
  prev,
  setCurrentPage,
}) => (
  <nav className="flex justify-between items-center" aria-label="Pagination">
    <p>
      {`Showing page ${currentPage} of ${totalPages} pages (${itemsPerPage} of ${count} entries)`}
    </p>
    {prev && <Button onClick={() => setCurrentPage(prev)}>Previous</Button>}
    {next && <Button onClick={() => setCurrentPage(next)}>Next</Button>}
  </nav>
);
