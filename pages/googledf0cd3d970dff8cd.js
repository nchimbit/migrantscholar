export default function GSCVerification() {
  return null;
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/html');
  res.write(`<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Google Search Console</title></head><body>google-site-verification: xD-MIsy__wA8eoQYHgCK35xdAk0LjbPAxl2sDxAQifg</body></html>`);
  res.end();
  return { props: {} };
}
