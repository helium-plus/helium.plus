import { useState } from "react";

import Head from "next/head";
import styled from "@emotion/styled";

import Link from "next/link";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import CurrencyFormat from "react-currency-format";

const NavBarWrapperDiv = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  background-color: #111;
`;

const NavBar = ({ priceData }) => {
  const hpGreen = `#42DE9F`;
  const hpBlue = `#42D1E4`;
  const hpLightGrey = `#CCC`;
  const hpWhite = `#FFF`;

  // let hntUsdExchangeRate = 0.4;
  // let currentHntPrice = 0.4;

  // if (priceData.data[0].price !== undefined) {
  //   hntUsdExchangeRate = priceData.data[0].price / 100000000;
  // }

  // const totalEstimate = earningsPerDay * numberOfHotspots * 365;
  // const totalEstimateInUsd = totalEstimate * hntUsdExchangeRate;

  return (
    <NavBarWrapperDiv>
      <div className="flex flex-row items-between justify-start w-full	">
        <div
          className="flex"
          css={css`
            max-width: 1200px;
            width: 100%;
            margin-left: auto;
            margin-right: auto;
          `}
        >
          <Head>
            <title>Helium Hotspot Earnings Calculator</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="flex content-between items-center justify-start">
            <img
              src="/h+2.png"
              className="flex"
              style={{ height: "32px", width: "auto", paddingBottom: "0" }}
            />
            <p>Helium Plus</p>
          </div>
          <Link href="/about">
            <a>About</a>
          </Link>
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
      </div>
    </NavBarWrapperDiv>
  );
};

// export async function getServerSideProps() {
//   const res = await fetch(`https://api.helium.io/v1/oracle/prices`);
//   const priceData = await res.json();

//   return {
//     props: { priceData },
//   };
// }

export default NavBar;
