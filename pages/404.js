import Link from "next/link";
import Head from "next/head";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export default function NotFoundPage() {
  return (
    <div className="flex align-center justify-center">
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
        className="prose"
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
          404 — Page not found
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
          Maybe try one of these pages?
        </p>
        <div css={css``} className="flex align-center justify-center">
          <ul>
            <li>
              <Link href="/earnings-calculator">
                <a
                  css={css`
                    color: white !important;
                    font-family: "Sora";

                    &:hover {
                      text-decoration: none !important;
                      cursor: pointer;
                      color: #42de9f !important;
                    }
                  `}
                >
                  Helium Hotspot Earnings Calculator
                </a>
              </Link>
            </li>
            <li>
              <Link href="/hnt-current-price">
                <a
                  css={css`
                    color: white !important;
                    font-family: "Sora";

                    &:hover {
                      text-decoration: none !important;
                      cursor: pointer;
                      color: #42de9f !important;
                    }
                  `}
                >
                  HNT current price
                </a>
              </Link>
            </li>
          </ul>
        </div>
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
