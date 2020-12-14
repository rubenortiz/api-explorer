import { Button } from 'components/Button';
import pages from 'utils/pagination';

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
}) => {
  console.log(pages(currentPage, totalPages));
  return (
    <nav className="flex justify-between" aria-label="Pagination">
      <p>
        {`Showing page ${currentPage} of ${totalPages} pages (${itemsPerPage} of ${count} entries)`}
      </p>
      <div className="flex gap-4">
        {prev && <Button onClick={() => setCurrentPage(prev)}>Previous</Button>}
        {pages(currentPage, totalPages).map((page) =>
          page === '...' ? (
            '...'
          ) : (
            <Button
              onClick={() => setCurrentPage(page)}
              active={page === currentPage}
            >
              {page}
            </Button>
          ),
        )}
        {next && <Button onClick={() => setCurrentPage(next)}>Next</Button>}
      </div>
    </nav>
  );
};
