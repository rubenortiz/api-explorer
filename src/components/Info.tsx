import Link from 'next/link';
import { Model, Property, PropertyType, RelationType } from 'models/types';
import { ucfirst } from 'utils/helpers';
import ContentLoader from 'react-content-loader';
import models from 'models';

export const Info = ({
  model,
  data,
}: {
  model: Model;
  data: { [index: string]: undefined | string } | undefined;
}) => {
  const renderPropertyValue = (
    property: Property,
    data: {
      [index: string]:
        | undefined
        | string
        | Array<{ id: string; name: string }>
        | { id: string; name: string };
    },
  ) => {
    console.log(data);
    const value = data[property.name] ?? null;

    if (!value) return '-';

    if (typeof value === 'string') {
      switch (property.type) {
        case PropertyType.String:
        case PropertyType.ID:
          return value || '-';
        case PropertyType.Image:
          return <img src={value} className="my-6" />;
        default:
          return null;
      }
    }

    switch (property.type) {
      case PropertyType.Model:
        const relationModel = models.find(
          ({ name }) => name === property.relation?.model,
        );
        if (!relationModel) return null;
        if (Array.isArray(value)) {
          if (property.relation?.type === RelationType.hasMany) {
            return value.map((item) => (
              <Link
                key={`/${relationModel.slug}/${item.id}`}
                href="/[slug]/[id]"
                as={`/${relationModel.slug}/${item.id}`}
              >
                <a className="inline-flex bg-blue-500 text-white rounded-full h-6 px-3 justify-center items-center">
                  {item.name}
                </a>
              </Link>
            ));
          }
        } else {
          if (property.relation?.type === RelationType.hasOne) {
            return value.id ? (
              <Link
                href="/[slug]/[id]"
                as={`/${relationModel.slug}/${value.id}`}
              >
                <a className="inline-flex bg-blue-500 text-white rounded-full h-6 px-3 justify-center items-center">
                  {value.name}
                </a>
              </Link>
            ) : (
              value.name
            );
          }
        }
      default:
        return '-';
    }
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
            <td className="px-6 py-3 text-left text-gray-700 flex flex-wrap gap-3">
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
