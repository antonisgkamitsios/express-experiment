import { Helmet } from 'react-helmet-async';
export function Profile() {
  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      This is profile
    </>
  );
}
