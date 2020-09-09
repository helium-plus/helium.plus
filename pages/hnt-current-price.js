import Head from "next/head";

import NavBar from "../components/core/NavBar";
import { formatNumber } from "../lib/NumberFormatting";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const HNTCurrentPrice = ({ priceData }) => {
  let hntUsdExchangeRate = 1;

  if (priceData.data[0].price !== undefined) {
    hntUsdExchangeRate = priceData.data[0].price / 100000000;
  }

  return (
    <>
      <Head>
        <title>Helium Hotspot Earnings Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="flex items-center justify-center flex-col pt-4 lg:pt-20">
        <section className="p-4 flex items-start lg:items-start justify-start flex-col lg:flex-col w-full max-w-xl lg:max-w-4xl pb-12 lg:pb-40">
          <div className="max-w-2xl w-full flex items-start justify-start flex-col">
            <h1 className="text-5xl max-w-2xl text-white font-display pt-6 lg:pt-12 leading-tight lg:text-6xl text-left font-bold pr-2">
              HNT/USD Current Price
            </h1>
            <p className="font-display mt-5 lg:mt-10 font-bold text-left text-6xl lg:text-25xl text-hpgreen-100 px-5 lg:px-10 py-2 rounded-xl bg-black">
              {formatNumber(hntUsdExchangeRate, "USD", 2)}
            </p>
          </div>
          <p className="pt-10 pb-2 font-display text-gray-300">
            Below are the previous prices:
          </p>
          <p className="pb-5 font-display text-gray-600">
            (These values will eventually be shown as a chart)
          </p>
          <ul className={`pb-8`}>
            {priceData.data.map((data) => {
              return (
                <li
                  className="font-body pb-1"
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
        </section>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch(`https://api.helium.io/v1/oracle/prices`);
  const priceData = await res.json();

  return {
    props: { priceData },
  };
}

export default HNTCurrentPrice;
