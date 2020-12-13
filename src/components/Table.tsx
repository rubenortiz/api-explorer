import { ReactNode } from 'react';
import { Model } from 'models/types';
import cn from 'classnames';

export const Table = ({
  model,
  rows,
}: {
  model: Model;
  rows: Array<Object>;
}) => {
  console.log(rows);
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {rows.map((row) => (
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                {row.image && (
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={row.image}
                      alt=""
                    />
                  </div>
                )}

                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {row.name}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
