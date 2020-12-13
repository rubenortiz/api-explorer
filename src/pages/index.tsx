import Head from 'next/head';
import Link from 'next/link';
import models from 'models';
import { Layout } from 'components/Layout';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Test Rick & Morty API Explorer</title>
      </Head>
      <Layout>
        <h1 className="mb-5 text-3xl font-extrabold text-gray-900">
          Rick & Morty
        </h1>
        {models.map((model, key) => (
          <h2
            key={key}
            className="text-lg mb-3 leading-6 font-medium text-gray-900"
          >
            <Link href="/[model]" as={`/${model.name.toLowerCase()}`}>
              <a>{model.name}</a>
            </Link>
          </h2>
        ))}
      </Layout>
    </div>
  );
}
