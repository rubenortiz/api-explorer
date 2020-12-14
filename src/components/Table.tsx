import Link from 'next/link';
import { Model, PropertyType } from 'models/types';
import { ucfirst } from 'utils/helpers';
import { Button } from 'components/Button';
import ContentLoader from 'react-content-loader';

export const Table = ({
  model,
  rows,
  maxCols = 5,
}: {
  model: Model;
  rows: Array<{ [index: string]: undefined | string }> | null;
  maxCols?: number;
}) => {
  let columns = 0;
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {model.properties.map(
            (() => {
              let counter = 1;
              return ({ type, name }: { type: PropertyType; name: string }) => {
                if (type === PropertyType.String && counter <= maxCols) {
                  counter += 1;
                  columns += 1;
                  return (
                    <th
                      key={counter}
                      scope="col"
                      className="px-6 py-3 text-left text-gray-700 font-bold"
                    >
                      {ucfirst(name)}
                    </th>
                  );
                }
                return null;
              };
            })(),
          )}
          <th
            scope="col"
            className="px-6 py-3 text-left text-gray-700 font-bold"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {rows
          ? rows.map((row, rowKey) => (
              <tr key={rowKey}>
                {model.properties.map(
                  (() => {
                    let counter = 1;
                    return ({
                      type,
                      name,
                    }: {
                      type: PropertyType;
                      name: string;
                    }) => {
                      if (type === PropertyType.String && counter <= maxCols) {
                        counter += 1;
                        return (
                          <td
                            className="px-6 py-4 whitespace-nowrap"
                            key={counter}
                          >
                            <div className="flex items-center">
                              {row[name] || '-'}
                            </div>
                          </td>
                        );
                      }
                      return null;
                    };
                  })(),
                )}

                <td className="px-6 py-4">
                  <Button>
                    <Link href="/[slug]/[id]" as={`/${model.slug}/${row.id}`}>
                      <a>View</a>
                    </Link>
                  </Button>
                </td>
              </tr>
            ))
          : Array.from(Array(5), (v, i) => i + 1).map((rowKey) => (
              <tr key={`loading_row_${rowKey}`}>
                {Array.from(Array(columns + 1), (v, i) => i + 1).map(
                  (colKey) => (
                    <td
                      key={`loading_col_${rowKey}_${colKey}`}
                      className="px-6 py-6 whitespace-nowrap"
                    >
                      <ContentLoader height={25} width="100%">
                        <rect y="0" width="100%" height="25" rx="5" ry="5" />
                      </ContentLoader>
                    </td>
                  ),
                )}
              </tr>
            ))}
      </tbody>
    </table>
  );
};
