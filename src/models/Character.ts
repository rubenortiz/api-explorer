import { Model, ModelName, RelationType, PropertyType } from 'models';

export const Character: Model = {
  name: ModelName.Character,
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
      name: 'status',
      type: PropertyType.String,
    },
    {
      name: 'species',
      type: PropertyType.String,
    },
    {
      name: 'type',
      type: PropertyType.String,
    },
    {
      name: 'gender',
      type: PropertyType.String,
    },
    {
      name: 'origin',
      type: PropertyType.Model,
      relation: {
        model: ModelName.Location,
        type: RelationType.hasOne,
      },
    },
    {
      name: 'location',
      type: PropertyType.Model,
      relation: {
        model: ModelName.Location,
        type: RelationType.hasOne,
      },
    },
    {
      name: 'image',
      type: PropertyType.String,
    },
    {
      name: 'episode',
      type: PropertyType.Model,
      relation: {
        model: ModelName.Episode,
        type: RelationType.hasMany,
      },
    },
    {
      name: 'created',
      type: PropertyType.String,
    },
  ],
};
