import { Character } from './Character';
import { Episode } from './Episode';
import { Location } from './Location';

export enum PropertyType {
  'ID',
  'String',
  'Model',
}

export enum ModelName {
  'Character',
  'Location',
  'Episode',
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

const models: Array<Model> = [Character, Episode, Location];

export default models;
