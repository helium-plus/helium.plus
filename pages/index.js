import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>helium.plus</title>
        <link rel="icon" href="/favicon.ico" />
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
        <img src="/h+.png" style={{ height: "75px", width: "auto" }} />
        <p
          className="description"
          style={{ color: "white", fontFamily: "Arial" }}
        >
          Coming soon!
        </p>
      </main>

      <style jsx global>{`
        body {
          background-color: #1e1e1e;
        }
      `}</style>
    </div>
  );
}
