import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="google-adsense-account" content="ca-pub-5850603943461862" />
        <meta name="author" content="MigrantScholar" />
        <meta name="publisher" content="MigrantScholar" />
        <meta name="copyright" content="MigrantScholar 2026" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta property="og:site_name" content="MigrantScholar" />
        <meta property="og:locale" content="en_GB" />
        <meta name="theme-color" content="#0D6E6E" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
          "@context":"https://schema.org",
          "@type":"Organization",
          "name":"MigrantScholar",
          "url":"https://migrantscholar.com",
          "logo":"https://migrantscholar.com/og-image.png",
          "description":"Free verified scholarships for migrants, refugees, asylum seekers and international students. Updated daily.",
          "sameAs":[
            "https://migrantscholar.com"
          ],
          "contactPoint":{
            "@type":"ContactPoint",
            "contactType":"customer support",
            "url":"https://migrantscholar.com/about"
          }
        })}} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <style>{`
          html, body { overflow-x: hidden; width: 100%; max-width: 100vw; }
          * { box-sizing: border-box; }
        `}</style>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-0HNFZG2T3C"></script>
        <script dangerouslySetInnerHTML={{__html:`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0HNFZG2T3C');
        `}} />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5850603943461862" crossOrigin="anonymous"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
