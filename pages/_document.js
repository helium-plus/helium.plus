import Document, { Head, Main, NextScript } from "next/document";
// import NavBar from "../components/NavBar";
import { extractCritical } from "emotion-server";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = extractCritical(initialProps.html);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join(" ")}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    };
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@200;400;600;800&family=Sora:wght@200;400;600;800&display=swap"
            rel="stylesheet"
          />

          <meta property="og:image" content="https://helium.plus/og2.png" />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-73259800-4"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'UA-73259800-4');
            `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
