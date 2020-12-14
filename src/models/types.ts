export enum PropertyType {
  'ID',
  'String',
  'Image',
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

export interface Property {
  name: string;
  type: PropertyType;
  relation?: {
    model: ModelName;
    type: RelationType;
  };
}

export interface Model {
  name: ModelName;
  properties: Array<Property>;
}
