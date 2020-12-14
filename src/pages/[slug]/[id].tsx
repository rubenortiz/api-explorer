import models, { GET_ONE_QUERY } from 'models';
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

  const { data: { result } = {} } = useQuery(GET_ONE_QUERY(model), {
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
