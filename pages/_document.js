import Document, { Html, Head, Main, NextScript } from 'next/document'

export default function SiteDocument({ language }) {
    const analyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

    return (
      <Html lang={language}>
        <Head>
          {analyticsId && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${analyticsId}', {
                        page_path: window.location.pathname
                    });
                    `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
}

SiteDocument.getInitialProps = async (context) => {
  const initialProps = await Document.getInitialProps(context);
  const language = context.pathname === "/en" || context.pathname.startsWith("/en/") ? "en" : "es";

  return { ...initialProps, language };
};
