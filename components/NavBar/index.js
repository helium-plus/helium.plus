import { useState } from "react";

import Head from "next/head";
import styled from "@emotion/styled";

import Link from "next/link";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import CurrencyFormat from "react-currency-format";
const hpGreen = `#42DE9F`;
const hpBlue = `#42D1E4`;
const hpLightGrey = `#CCC`;
const hpWhite = `#FFF`;

const NavBarLink = styled.a`
  font-size: 12px;
  font-weight: ${(props) => (props.cta ? "bold" : "normal")};
  background-color: ${(props) => (props.cta ? hpGreen : "transparent")};
  color: ${(props) => (props.cta ? "black" : "white")};
  padding: 10px 16px;
  height: 40px;
  border-radius: 10px;
  margin-right: ${(props) => (!props.cta ? "40px" : "0")};
`;

const NavBarWrapperDiv = styled.nav`
  display: flex;
  height: 60px;
  width: 100%;

  margin-top: -2rem;

  position: fixed;
  background: rgba(26, 26, 26, 0.75);

  backdrop-filter: saturate(380%) blur(20px);
`;

const NavBar = () => {
  return (
    <NavBarWrapperDiv>
      <div className="flex flex-row items-between justify-start w-full	">
        <div
          className="flex"
          css={css`
            max-width: 836px;
            width: 100%;
            margin-left: auto;
            margin-right: auto;
          `}
        >
          <Head>
            <title>Helium Hotspot Earnings Calculator</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="flex items-center justify-between w-full">
            <Link href="/">
              <a className="">
                <img
                  src="/h+wordmark.png"
                  className="flex"
                  style={{
                    height: "32px",
                    width: "auto",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                />
              </a>
            </Link>

            <div>
              <Link href="/earnings-calculator">
                <NavBarLink href="earnings-calculator">Calculator</NavBarLink>
              </Link>
              <Link href="/about">
                <NavBarLink href="about">About</NavBarLink>
              </Link>

              <NavBarLink
                cta
                target="_blank"
                href="http://fbuy.me/v/danielcolinjames"
              >
                Buy Hotspot
              </NavBarLink>
            </div>
          </div>
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
