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
  background: rgba(26, 26, 26, 0.75);
  z-index: 10;
  backdrop-filter: saturate(380%) blur(20px);
`;

const NavBar = () => {
  return (
    <NavBarWrapperDiv className="-mt-12 flex h-12 w-full fixed">
      <div className="flex flex-row items-between justify-start w-full	">
        <div className="flex mx-auto w-full max-w-xl lg:max-w-4xl p-4 ">
          <div className="flex items-center justify-between w-full">
            <Link href="/">
              <a className="">
                <img src="/lockup.png" className="flex w-auto h-6" />
              </a>
            </Link>

            <div>
              <Link href="/earnings-calculator">
                <NavBarLink href="earnings-calculator">Calculator</NavBarLink>
              </Link>
              <Link href="/about">
                <NavBarLink href="about">About</NavBarLink>
              </Link>

              {/* <NavBarLink
                cta
                target="_blank"
                href="http://fbuy.me/v/danielcolinjames"
              >
                Buy Hotspot
              </NavBarLink> */}
            </div>
          </div>
        </div>
      </div>
    </NavBarWrapperDiv>
  );
};

export default NavBar;
