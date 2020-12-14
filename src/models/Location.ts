import { Model, ModelName, RelationType, PropertyType } from 'models/types';
import pluralize from 'pluralize';

export const Location: Model = {
  name: ModelName.Location,
  slug: pluralize(ModelName.Location).toLowerCase(),
  properties: [
    {
      name: 'id',
      type: PropertyType.ID,
    },
    {
      name: 'name',
      type: PropertyType.String,
    },
    {
      name: 'type',
      type: PropertyType.String,
    },
    {
      name: 'dimension',
      type: PropertyType.String,
    },
    {
      name: 'residents',
      type: PropertyType.Model,
      relation: {
        model: ModelName.Character,
        type: RelationType.hasMany,
      },
    },
    {
      name: 'created',
      type: PropertyType.String,
    },
  ],
};
