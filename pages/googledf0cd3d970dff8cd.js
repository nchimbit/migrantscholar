export default function GSCVerification() {
  return null;
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/html');
  res.write('google-site-verification: xD-MIsy__wA8eoQYHgCK35xdAk0LjbPAxl2sDxAQifg');
  res.end();
  return { props: {} };
}
