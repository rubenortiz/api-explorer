import { Character } from './Character';
import { Episode } from './Episode';
import { Location } from './Location';
import { Model, ModelName, PropertyType } from 'models/types';
import { gql } from '@apollo/client';
import pluralize from 'pluralize';

const models: Array<Model> = [Character, Episode, Location];

const buildResultsQuery = (model: Model) =>
  model.properties.reduce((accumulator, property) => {
    switch (property.type) {
      case PropertyType.String:
      case PropertyType.ID:
      case PropertyType.Image:
        return `${accumulator} ${property.name}`;
      case PropertyType.Model:
        return `${accumulator} ${property.name} {id name}`;
      default:
        return accumulator;
    }
  }, '');

export const GET_ALL_QUERY = (model: Model) => gql`
  query GetAll${pluralize(model.name)}($page: Int) {
    results: ${pluralize(model.name.toLowerCase())}(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        ${buildResultsQuery(model)}
      }
    }
  }
`;

export const GET_ONE_QUERY = (model: Model) => gql`
  query Get${model.name}($id: ID!) {
    result: ${model.name.toLowerCase()}(id: $id) {
      ${buildResultsQuery(model)}
    }
  }
`;

export default models;
