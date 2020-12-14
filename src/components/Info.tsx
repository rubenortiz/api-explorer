import { Model, Property, PropertyType, RelationType } from 'models/types';
import { ucfirst } from 'utils/helpers';
import ContentLoader from 'react-content-loader';
import Link from 'next/link';
import pluralize from 'pluralize';

export const Info = ({
  model,
  data,
}: {
  model: Model;
  data: { [index: string]: undefined | string } | undefined;
}) => {
  const renderPropertyValue = (
    property: Property,
    data: { [index: string]: undefined | string },
  ) => {
    if (!data) return null;

    switch (property.type) {
      case PropertyType.String:
      case PropertyType.ID:
        return data[property.name] || '-';
      case PropertyType.Image:
        return <img src={data[property.name]} className="my-6" />;
      case PropertyType.Model:
        return 'TO-DO';
        break;
    }

    return null;
  };
  return (
    <table className="w-1/2 divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-gray-700 font-bold"
          >
            Property
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-gray-700 font-bold"
          >
            Value
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {model.properties.map((property) => (
          <tr key={property.name}>
            <td className="px-6 py-3 text-left text-gray-700 font-bold">
              {ucfirst(property.name)}
            </td>
            <td className="px-6 py-3 text-left text-gray-700">
              {data ? (
                renderPropertyValue(property, data)
              ) : (
                <ContentLoader height={25} width="100%">
                  <rect y="0" width="100%" height="25" rx="5" ry="5" />
                </ContentLoader>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
