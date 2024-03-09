import { Helmet } from 'react-helmet-async';
export function About() {
  return (
    <>
      <Helmet>
        <title>About</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      This is about
    </>
  );
}
