import models from 'models';
import { Model, ModelName } from 'models/types';
import { gql, useQuery } from '@apollo/client';
import { Layout } from 'components/Layout';
import { Info } from 'components/Info';
import pluralize from 'pluralize';

type CtxType = { params: { slug: string; id: number } };

export const getStaticProps = async (ctx: CtxType) => {
  const { slug, id } = ctx.params;
  const model = models.find((model) => model.slug === slug);
  return {
    props: { model, id },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

const Details: React.FC<{ model: Model; id: number }> = ({ model, id }) => {
  if (!model) {
    return <p>Loading...</p>;
  }

  let GET_ONE_QUERY;

  const characterBaseProps = `
    id
    name
    status
    species
    type
    gender
    image
    created
  `;

  const episodeBaseProps = `
    id
    name
    air_date
    episode
    created
  `;

  const locationBaseProps = `
    id
    name
    type
    dimension
    created
  `;

  switch (model.name) {
    case ModelName.Character:
      GET_ONE_QUERY = gql`
        query GetCharacter($id: ID!) {
          result: character(id: $id) {
            ${characterBaseProps}
            origin {
              ${locationBaseProps}
            }
            location {
              ${locationBaseProps}
            }
            image
            episode {
              ${episodeBaseProps}
            }
            created
          }
        }
      `;
      break;
    case ModelName.Location:
      GET_ONE_QUERY = gql`
        query GetLocation($id: ID!) {
          result: location(id: $id) {
            ${locationBaseProps}
            residents {
              ${characterBaseProps}
            }
          }
        }
      `;
      break;
    case ModelName.Episode:
      GET_ONE_QUERY = gql`
        query GetEpisode($id: ID!) {
          result: episode(id: $id) {
            ${episodeBaseProps}
            characters {
              ${characterBaseProps}
            }
          }
        }
      `;
      break;
  }

  const { data: { result } = {} } = useQuery(GET_ONE_QUERY, {
    variables: { id },
  });

  return (
    <Layout currentModel={model.name}>
      {result && (
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {pluralize(result.name)}
        </h1>
      )}
      <Info model={model} data={result} />
    </Layout>
  );
};

export default Details;
