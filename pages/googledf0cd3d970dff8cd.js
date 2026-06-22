export default function GSCVerification() {
  return <p>google-site-verification: xD-MIsy__wA8eoQYHgCK35xdAk0LjbPAxl2sDxAQifg</p>
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/html')
  return { props: {} }
}
