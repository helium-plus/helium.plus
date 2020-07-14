import { useState } from "react";

import Head from "next/head";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

function EarningsCalculator({ data }) {
  const [earningsPerDay, setEarningsPerDay] = useState(7);
  const [numberOfHotspots, setNumberOfHotspots] = useState(1);

  const handleChange = (event) => {
    if (event.target.id === "earnings-per-day-input") {
      if (event.target.value !== undefined && event.target.value !== "")
        setEarningsPerDay(+event.target.value);
      else setEarningsPerDay(7);
    } else if (event.target.id === "number-of-hotspots-input") {
      if (event.target.value !== undefined && event.target.value !== "")
        setNumberOfHotspots(+event.target.value);
      else setNumberOfHotspots(1);
    }
    return;
  };

  let hntUsdExchangeRate = 0.4;

  if (data.data[0].price !== undefined) {
    hntUsdExchangeRate = data.data[0].price / 100000000;
  }

  const totalEstimate = earningsPerDay * numberOfHotspots * 365;
  const totalEstimateInUsd = totalEstimate * hntUsdExchangeRate;

  return (
    <div
      className="m-4 flex align-center justify-center"
      css={css`
        width: auto;
      `}
    >
      <Head>
        <title>Helium Hotspot Earnings Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="prose">
        <h1
          css={css`
            max-width: 400px;
            font-family: Soleil;
          `}
          className="pt-20"
        >
          Helium Hotspot Earnings Calculator
        </h1>
        <input
          type="number"
          id="number-of-hotspots-input"
          placeholder={1}
          onChange={handleChange}
          className={``}
          css={css`
            max-width: 250px;
            width: auto;
            border: 1px solid #ccc;
            height: 45px;
            padding: 1rem;
            /* margin: 1rem; */
            font-family: Sen;
          `}
        />
        <input
          type="number"
          id="earnings-per-day-input"
          placeholder={7}
          onChange={handleChange}
          css={css`
            max-width: 250px;
            width: auto;
            border: 1px solid #ccc;
            height: 45px;
            padding: 1rem;
            font-family: Sen;
            /* margin: 1rem; */
          `}
        />

        <p
          css={css`
            max-width: 400px;
            font-family: Soleil;
          `}
        >
          With {numberOfHotspots} hotspot{numberOfHotspots === 1 ? "" : "s"}
          {numberOfHotspots === 1 ? "" : ", each one"} earning roughly{" "}
          {earningsPerDay}
          {" HNT "}
          per day, you'll make {totalEstimate} HNT per year.{" "}
        </p>
        <p
          css={css`
            max-width: 400px;
            font-family: Soleil;
          `}
        >
          That's {totalEstimateInUsd} USD per year at an exchange rate of{" "}
          {hntUsdExchangeRate} USD per HNT token.
        </p>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://api.helium.io/v1/oracle/prices`);
  const data = await res.json();

  return {
    props: { data },
  };
}

export default EarningsCalculator;
