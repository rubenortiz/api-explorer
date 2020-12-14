import { ReactNode } from 'react';
import cn from 'classnames';
import { Button } from 'components/Button';

type Pagination = React.FC<{
  itemsPerPage: number;
  count: number;
  next: number | null;
  prev: number | null;
}>;

export const Pagination: Pagination = ({ itemsPerPage, count, next, prev }) => (
  <nav className="flex justify-between items-center" aria-label="Pagination">
    <p>
      Showing {itemsPerPage} of {count} entries
    </p>
    {prev && <Button>Previous</Button>}
    {next && <Button>Next</Button>}
  </nav>
);
