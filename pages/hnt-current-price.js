import { useState } from "react";

import Head from "next/head";
import Link from "next/link";

import NavBar from "../components/NavBar";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import CurrencyFormat from "react-currency-format";

function HNTCurrentPrice({ priceData }) {
  const hpGreen = `#42DE9F`;
  const hpBlue = `#42D1E4`;
  const hpLightGrey = `#CCC`;
  const hpWhite = `#FFF`;

  let hntUsdExchangeRate = 0.4;
  // let currentHntPrice = 0.4;

  if (priceData.data[0].price !== undefined) {
    hntUsdExchangeRate = priceData.data[0].price / 100000000;
  }

  // const totalEstimate = earningsPerDay * numberOfHotspots * 365;
  // const totalEstimateInUsd = totalEstimate * hntUsdExchangeRate;

  return (
    <>
      <NavBar />
      <div
        className="flex align-center justify-center"
        css={css`
          width: auto;
          margin: 2rem;

          @media screen and (max-width: 500px) {
            margin: 1rem;
          }
        `}
      >
        <Head>
          <title>Helium Hotspot Earnings Calculator</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main
          className="prose"
          css={css`
            max-width: 25vw;
            width: 100%;

            @media screen and (max-width: 1280px) {
              max-width: 50vw;
            }
            @media screen and (max-width: 800px) {
              max-width: 75vw;
            }
          `}
        >
          <h1
            css={css`
              max-width: 400px;
              font-family: Sora;
              font-weight: 600 !important;
              color: ${hpWhite} !important;
              font-stretch: 50% !important;

              padding-top: 8rem;

              @media screen and (max-width: 500px) {
                padding-top: 2rem;
              }
            `}
            className=""
          >
            HNT Current Price
          </h1>
          <div css={css``} className={`pb-10`}>
            <p
              css={css`
                max-width: 400px;
                font-family: Open Sans;
                font-weight: 400;
                color: ${hpLightGrey};
              `}
            >
              <CurrencyFormat
                value={hntUsdExchangeRate}
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={"$"}
                renderText={(value) => (
                  <span
                    css={css`
                      max-width: 100%;
                      color: ${hpGreen};
                      font-family: Sora;
                      font-size: 7vw;
                      /* line-height: 10rem; */
                      line-height: 9vw;
                      font-weight: 400;
                      background-color: #000;
                      margin: 2px;
                      padding: 8px 15px;
                      border-radius: 10px;

                      /* @media screen and (max-width: 700px) {
                      font-size: 12vw;
                      line-height: 14vw;
                    }
                    @media screen and (max-width: 500px) {
                      font-size: 25vw;
                      /* line-height: 10rem; */
                      /* line-height: 30vw;
                    } */

                      @media screen and (max-width: 1280px) {
                        font-size: 12vw;
                        line-height: 14vw;
                      }
                      @media screen and (max-width: 800px) {
                        font-size: 25vw;
                        line-height: 30vw;
                      }
                    `}
                  >
                    {value}
                  </span>
                )}
              />{" "}
            </p>
            <p
              css={css`
                max-width: 400px;
                font-family: Open Sans;
                font-weight: 400;
                color: ${hpLightGrey};
              `}
            >
              The above number is the most recent exchange rate of USD per HNT,
              as reported by{" "}
              <a
                href="https://developer.helium.com/blockchain/hnt-price-oracles"
                target="_blank"
                css={css`
                  color: #00bba0 !important;
                  text-decoration: none !important;

                  &:hover {
                    text-decoration: underline !important;
                  }
                `}
              >
                HNT Price Oracles
              </a>
              .
            </p>
          </div>
          <p>Below are the previous prices:</p>
          <ul className={`pb-8`}>
            {priceData.data.map((data) => {
              return (
                <li
                  css={css`
                    color: lightslategrey;
                  `}
                >
                  <p>
                    Block {data.block} —{" "}
                    <span css={css``}>{data.price / 100000000}</span>
                  </p>
                </li>
              );
            })}
          </ul>
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

export async function getServerSideProps() {
  const res = await fetch(`https://api.helium.io/v1/oracle/prices`);
  const priceData = await res.json();

  return {
    props: { priceData },
  };
}

export default HNTCurrentPrice;
