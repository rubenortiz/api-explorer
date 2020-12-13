import { useState } from 'react';
import models from 'models';
import { Model, ModelName } from 'models/types';
import { gql, useQuery } from '@apollo/client';
import { Layout } from 'components/Layout';
import { Table } from 'components/Table';
import { Pagination } from 'components/Pagination';

type CtxType = { params: { slug: string } };

export const getStaticProps = async (ctx: CtxType) => {
  const { slug } = ctx.params;
  const model = models.find(
    (model) => model.name === `${slug.charAt(0).toUpperCase()}${slug.slice(1)}`,
  );
  return {
    props: { model },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => ({
  paths: models.map((model) => ({
    params: { slug: model.name.toLowerCase() },
  })),
  fallback: false,
});

const List: React.FC<{ model: Model }> = ({ model }) => {
  let GET_ALL_QUERY;

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
      GET_ALL_QUERY = gql`
        query GetAllCharacters {
          results: characters {
            info {
              count
              pages
              next
              prev
            }
            results {
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
        }
      `;
      break;
    case ModelName.Location:
      GET_ALL_QUERY = gql`
        query GetAllCharacters {
          results: locations {
            info {
              count
              pages
              next
              prev
            }
            results {
              ${locationBaseProps}
              residents {
                ${characterBaseProps}
              }
            }
          }
        }
      `;
      break;
    case ModelName.Episode:
      GET_ALL_QUERY = gql`
        query GetAllEpisodes {
          results: episodes {
            info {
              count
              pages
              next
              prev
            }
            results {
              ${episodeBaseProps}
              characters {
                ${characterBaseProps}
              }
            }
          }
        }
      `;
      break;
  }

  const {
    loading,
    error,
    data: { results: { results = null, info = null } = {} } = {},
  } = useQuery(GET_ALL_QUERY);

  return (
    <Layout>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table model={model} rows={results} />
          <Pagination
            itemsPerPage={results.length}
            count={info.count}
            next={info.next}
            prev={info.prev}
          />
        </>
      )}
    </Layout>
  );
};

export default List;
