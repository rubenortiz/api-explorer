import { Model, PropertyType } from 'models/types';
import { ucfirst } from 'utils/helpers';
import { Button } from 'components/Button';

export const Table = ({
  model,
  rows,
  maxCols = 5,
}: {
  model: Model;
  rows: Array<{ [index: string]: undefined | string }>;
  maxCols?: number;
}) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {model.properties.map(
            (() => {
              let counter = 0;
              return ({ type, name }: { type: PropertyType; name: string }) => {
                counter += 1;
                return (
                  type === PropertyType.String &&
                  counter <= maxCols && (
                    <th
                      key={counter}
                      scope="col"
                      className="px-6 py-3 text-left text-gray-700 font-bold"
                    >
                      {ucfirst(name)}
                    </th>
                  )
                );
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
        {rows.map((row, rowKey) => (
          <tr key={rowKey}>
            {model.properties.map(
              (() => {
                let counter = 0;
                return ({
                  type,
                  name,
                }: {
                  type: PropertyType;
                  name: string;
                }) => {
                  counter += 1;
                  return (
                    type === PropertyType.String &&
                    counter <= maxCols && (
                      <td className="px-6 py-4 whitespace-nowrap" key={counter}>
                        <div className="flex items-center">
                          {row[name] || '-'}
                        </div>
                      </td>
                    )
                  );
                };
              })(),
            )}
            <td className="px-6 py-4">
              <Button>View</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
