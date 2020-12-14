import { Model, PropertyType } from 'models/types';
import { ucfirst } from 'utils/helpers';
import { Button } from 'components/Button';

export const Table = ({
  model,
  rows,
}: {
  model: Model;
  rows: Array<{ [index: string]: undefined | string }>;
}) => {
  const MAX_AMOUNT_OF_PROPS = 5;
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {model.properties.map(
            (property, key) =>
              property.type === PropertyType.String &&
              key <= MAX_AMOUNT_OF_PROPS && (
                <th
                  key={key}
                  scope="col"
                  className="px-6 py-3 text-left text-gray-700 font-bold"
                >
                  {ucfirst(property.name)}
                </th>
              ),
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
              (property, key) =>
                property.type === PropertyType.String &&
                key <= MAX_AMOUNT_OF_PROPS && (
                  <td className="px-6 py-4 whitespace-nowrap" key={key}>
                    <div className="flex items-center">
                      {row[property.name] || '-'}
                    </div>
                  </td>
                ),
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
