import Head from "next/head";
import Link from "next/link";
import NavBar from "../components/NavBar";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export default function About() {
  return (
    <>
      <NavBar />
      <div
        css={css`
          margin: 2rem auto;
        `}
      >
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
          <img
            src="/h+2.png"
            style={{ height: "400px", width: "auto", paddingBottom: "24px" }}
          />
          <p
            className="description"
            style={{
              color: "#888",
              fontSize: "18px",
              fontFamily: "Sora",
              fontWeight: "200",
              margin: "0px",
              maxWidth: "836px",
              padding: "20px",
            }}
          >
            Thanks for stopping by! I'm working on this website as a passion
            project because I've recently become obsessed with Helium. I like to
            believe that this page will eventually have more information than
            this, but there's no way to know for sure.
          </p>
          <a
            href="https://twitter.com/helium_plus"
            target="_blank"
            style={{
              color: "#888",
              fontSize: "18px",
              fontFamily: "Sora",
              fontWeight: "200",
              margin: "0px",
              maxWidth: "836px",
              padding: "20px",
            }}
          >
            Follow helium+ on Twitter!
          </a>
        </main>

        <style jsx global>{`
          body {
            background-image: linear-gradient(#070e15, #1e2b37);
            height: 100%;
            margin: 0;
            background-repeat: no-repeat;
            background-attachment: fixed;
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
