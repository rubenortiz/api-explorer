import { Model, ModelName, RelationType, PropertyType } from 'models';

export const Episode: Model = {
  name: ModelName.Episode,
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
      name: 'air_date',
      type: PropertyType.String,
    },
    {
      name: 'episode',
      type: PropertyType.String,
    },
    {
      name: 'characters',
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
