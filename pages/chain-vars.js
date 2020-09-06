// import { useState, useEffect } from "react";

import NavBar from "../components/NavBar";
import Head from "next/head";
// import Link from "next/link";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// import CurrencyFormat from "react-currency-format";

// import HotspotCalculatorRow from "../components/HotspotCalculatorRow";

const hpGreen = `#42DE9F`;
const hpBlue = `#42D1E4`;
const hpLightGrey = `#CCC`;
const hpWhite = `#FFF`;

const Prose = styled.p`
  font-family: Open Sans;
  font-weight: 400;
  color: ${(props) => (props.primary ? hpGreen : hpLightGrey)};
  font-size: 1em;
  line-height: 1.75em;
  hyphens: auto;
  overflow-wrap: break-word;
`;

const ChainVars = ({ chainVars, stats }) => {
  return (
    <>
      <NavBar />
      <Head>
        <title>Helium Blockchain Current Chain Variables</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="flex align-center justify-center"
        css={css`
          width: auto;
          margin: 2rem auto;
          padding: 2rem;
          max-width: 900px;

          @media screen and (max-width: 500px) {
            margin: 1rem auto;
            max-width: 400px;
          }
        `}
      >
        <div
          css={css`
            max-width: 900px;
            margin: 2rem auto;
            padding: 2rem;

            @media screen and (max-width: 500px) {
              margin: 1rem auto;
              max-width: 400px;
            }
          `}
        >
          {console.log(Object.keys(chainVars.data))}
          {console.log(chainVars.data)}
          {console.log(stats.data)}
          {Object.keys(chainVars.data).map((key, index) => {
            return (
              <>
                <Prose primary>{key}</Prose>
                <Prose className="pb-10">{chainVars.data[key]}</Prose>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const chainVarsRes = await fetch(`https://api.helium.io/v1/vars`);
  const chainVars = await chainVarsRes.json();
  const statsRes = await fetch(`https://api.helium.io/v1/stats`);
  const stats = await statsRes.json();

  return {
    props: { chainVars, stats },
  };
}

export default ChainVars;
