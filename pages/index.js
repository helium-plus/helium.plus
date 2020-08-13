import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>helium.plus</title>
      </Head>

      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "64px",
        }}
      >
        {/* <h1 className="title">helium.plus</h1> */}
        <img
          src="/h+2.png"
          style={{ height: "150px", width: "auto", paddingBottom: "24px" }}
        />
        <h1
          style={{
            fontSize: "24px",
            color: "white",
            fontFamily: "Sora",
            fontWeight: "400",
            margin: "0px",
          }}
        >
          helium.plus
        </h1>
        <p
          className="description"
          style={{
            color: "#888",
            fontSize: "18px",
            fontFamily: "Sora",
            fontWeight: "200",
            margin: "0px",
          }}
        >
          Coming soon!
        </p>

        <p
          className="description"
          style={{
            color: "#888",
            fontSize: "18px",
            fontFamily: "Sora",
            fontWeight: "200",
            margin: "60px 0 0 0",
            maxWidth: "400px",
            // padding: "10px",
          }}
        >
          But in the meantime, check out:
        </p>

        <Link href="/earnings-calculator">
          <a
            className="link"
            style={{
              color: "#eee",
              fontSize: "18px",
              fontFamily: "Sora",
              fontWeight: "200",
              margin: "10px 0 0 0",
            }}
          >
            HNT Earnings Calculator
          </a>
        </Link>
        <Link href="/hnt-current-price">
          <a
            className="link"
            style={{
              color: "#eee",
              fontSize: "18px",
              fontFamily: "Sora",
              fontWeight: "200",
              margin: "10px 0 0 0",
            }}
          >
            HNT Current Price
          </a>
        </Link>
      </main>

      <style jsx global>{`
        body {
          background-color: #1e1e1e;
        }
        ::-moz-selection {
          /* Code for Firefox */
          color: black;
          background: #42de9f;
        }

        ::selection {
          color: black;
          background: #42de9f;
        }
      `}</style>
    </div>
  );
}
