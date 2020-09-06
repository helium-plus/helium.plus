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

const populateDescription = (key) => {
  // Default description
  let description = "[Default description]";

  switch (key) {
    case "min_score":
      description =
        "The minimum score for a hotspot to be elligible to get elected to a consensus group.";
      break;
  }

  return description;
};

const ChainVars = ({ chainVars, stats }) => {
  const copyText = (key) => {
    const el = document.createElement("textarea");
    el.value = chainVars.data[key];
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const sortVars = (varsObject) => {
    // TODO: convert object into an array so it can more easily be manipulated on the client side (give user sorting options, etc.)
    let chainVarsArray = [];
    Object.keys(chainVars.data).map((key, index) => {});
    return chainVarsArray;
  };

  return (
    <>
      <NavBar />
      <Head>
        <title>Helium Chain Variables</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center justify-center flex-col pt-4 lg:pt-20">
        <section className="p-4 flex items-start lg:items-start justify-start flex-col lg:flex-row w-full max-w-xl lg:max-w-4xl pb-12 lg:pb-20">
          <div className="max-w-xl w-full flex items-start justify-start flex-col">
            <h1 className="text-5xl max-w-xl text-white font-display pt-6 lg:pt-12 leading-tight lg:text-6xl text-left font-bold pr-2">
              Helium Chain Variables
            </h1>
            <p className="max-w-md text-lg font-body pt-4 text-gray-500 text-left">
              These are all of the current chain variables and the current
              values as returned by the API.
            </p>
          </div>
        </section>
        <section className="bg-gray-200 w-full flex items-center lg:items-start justify-end flex-col pb-64">
          <div className="max-w-xl w-full lg:max-w-4xl mx-auto p-4">
            <h2 className="font-display text-black text-3xl font-bold pt-6 pb-6">
              Chain Variables
            </h2>
            <div className="pb-10">
              <input
                className="p-2 w-1/4"
                placeholder="Filter (not functional yet)"
              />
            </div>
            <div className="grid grid-cols-2 gap-10z lg:grid-cols-4 lg:p-1 lg:bg-gray-300 lg:rounded-lg">
              {Object.keys(chainVars.data).map((key, index) => {
                return (
                  <>
                    <div
                      className={`${
                        index % 2 === 0 ? "lg:bg-gray-100" : ""
                      } col-span-4 lg:col-span-2 bg-white border px-4 py-2 text-hpgreen-100 font-display font-md break-normal`}
                    >
                      <p>{key}</p>

                      <p
                        className={`${
                          index % 2 === 0 ? "lg:bg-gray-100" : ""
                        } text-gray-500 font-body font-sm pb-12z pr-4 break-normal`}
                      >
                        {populateDescription(key)}
                      </p>
                    </div>
                    <div className="mb-10 lg:mb-0 col-span-4 lg:col-span-2 flex flex-row justify-between bg-hpblue-900 border border-gray-900 px-4 py-2">
                      <p
                        id={key}
                        className={`pr-4 pt-2 text-hpblue-100 font-body font-md break-normal w-full`}
                      >
                        {Array.isArray(chainVars.data[key])
                          ? "[Need to find a better way to display arrays]"
                          : chainVars.data[key]}
                      </p>
                      <div className="p-1">
                        <button
                          className="px-2 py-0 bg-gray-800 hover:bg-gray-700 h-10 rounded-md font-xs text-gray-200"
                          onClick={() => copyText(key)}
                        >
                          <svg
                            className="w-5 stroke-text text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </section>
      </main>
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