export enum PropertyType {
  'ID',
  'String',
  'Model',
}

export enum ModelName {
  'Character' = 'Character',
  'Location' = 'Location',
  'Episode' = 'Episode',
}

export enum RelationType {
  'hasOne',
  'hasMany',
}

export interface Model {
  name: ModelName;
  properties: Array<{
    name: string;
    type: PropertyType;
    relation?: {
      model: ModelName;
      type: RelationType;
    };
  }>;
}
