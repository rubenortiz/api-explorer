import { useEffect, useState } from 'react';
import models, { GET_ALL_QUERY } from 'models';
import { Model } from 'models/types';
import { useQuery } from '@apollo/client';
import { Layout } from 'components/Layout';
import { Table } from 'components/Table';
import { Pagination } from 'components/Pagination';
import pluralize from 'pluralize';

type CtxType = { params: { slug: string } };

export const getStaticProps = async (ctx: CtxType) => {
  const { slug } = ctx.params;
  const model = models.find((model) => model.slug === slug);
  return {
    props: { model },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => ({
  paths: models.map(({ slug }) => ({
    params: { slug },
  })),
  fallback: false,
});

const List: React.FC<{ model: Model }> = ({ model }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [model]);

  const {
    data: { results: { results = null, info = null } = {} } = {},
  } = useQuery(GET_ALL_QUERY(model), {
    variables: { page: currentPage },
  });

  return (
    <Layout currentModel={model.name}>
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        {pluralize(model.name)}
      </h1>
      <Table model={model} rows={results} />
      {results && (
        <div className="my-8">
          <Pagination
            itemsPerPage={results.length}
            count={info.count}
            next={info.next}
            prev={info.prev}
            totalPages={info.pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </Layout>
  );
};

export default List;
