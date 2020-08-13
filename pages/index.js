import Head from "next/head";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <>
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
    </>
  );
}
