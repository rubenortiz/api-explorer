import Head from 'next/head';
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
      </Layout>
    </div>
  );
}
