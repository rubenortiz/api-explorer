import Head from 'next/head';
import { useQuery, gql } from '@apollo/client';

const CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(CHARACTERS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <div>
      <Head>
        <title>Test Rick & Morty API</title>
      </Head>
      <h1>Characters</h1>
      {data?.characters?.results.map(({ id, name }) => (
        <h3 key={id}>{name}</h3>
      ))}
    </div>
  );
}
