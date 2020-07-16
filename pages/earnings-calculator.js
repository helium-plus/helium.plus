import { useState } from "react";

import Head from "next/head";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import CurrencyFormat from "react-currency-format";

function EarningsCalculator({ priceData }) {
  const hpGreen = `#42DE9F`;
  const hpBlue = `#42D1E4`;
  const hpLightGrey = `#CCC`;
  const hpWhite = `#FFF`;

  const [earningsPerDay, setEarningsPerDay] = useState(5);
  const [earningsPerDayInputIsEmpty, setEarningsPerDayInputIsEmpty] = useState(
    true
  );

  const [numberOfHotspots, setNumberOfHotspots] = useState(1);
  const [
    numberOfHotspotsInputIsEmpty,
    setNumberOfHotspotsInputIsEmpty,
  ] = useState(true);

  const handleNumberOfHotspotsChange = (event) => {
    const prevNumberOfHotspots = numberOfHotspots;

    if (event.target.value !== undefined && event.target.value !== "") {
      if (event.target.value % 1 === 0) {
        setNumberOfHotspots(+event.target.value);
        setNumberOfHotspotsInputIsEmpty(false);
      } else {
        setNumberOfHotspots(+prevNumberOfHotspots);
        setNumberOfHotspotsInputIsEmpty(false);
      }
    } else {
      setNumberOfHotspots(1);
      setNumberOfHotspotsInputIsEmpty(true);
    }
  };
  const handleEarningsPerDayChange = (event) => {
    const prevEarningsPerDay = earningsPerDay;

    if (event.target.value !== undefined && event.target.value !== "") {
      setEarningsPerDay(+event.target.value);
      setEarningsPerDayInputIsEmpty(false);
    } else {
      setEarningsPerDay(5);
      setEarningsPerDayInputIsEmpty(true);
    }
  };

  let hntUsdExchangeRate = 0.4;

  if (priceData.data.price !== undefined) {
    hntUsdExchangeRate = priceData.data.price / 100000000;
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
            font-family: Sora;
            font-weight: 600 !important;
            color: ${hpWhite} !important;
          `}
          className="pt-20"
        >
          Helium Hotspot Earnings Calculator
        </h1>
        <input
          type="number"
          min="0"
          pattern="[0-9]"
          step="1"
          id="number-of-hotspots-input"
          placeholder={1}
          autoFocus
          onChange={handleNumberOfHotspotsChange}
          value={numberOfHotspotsInputIsEmpty ? "" : numberOfHotspots}
          className={`mr-4`}
          css={css`
            border-radius: 8px;
            max-width: 250px;
            width: auto;
            border: 2px solid transparent;
            height: 45px;
            padding: 1rem;
            font-family: Sora;
            outline: none;

            &:focus {
              border: 2px solid ${hpGreen};
            }
          `}
        />
        <input
          type="number"
          id="earnings-per-day-input"
          placeholder={5}
          value={earningsPerDayInputIsEmpty ? "" : earningsPerDay}
          onChange={handleEarningsPerDayChange}
          step="1"
          css={css`
            border-radius: 8px;
            max-width: 250px;
            width: auto;
            border: 2px solid transparent;
            height: 45px;
            padding: 1rem;
            font-family: Sora;
            outline: none;

            &:focus {
              border: 2px solid ${hpGreen};
            }
          `}
        />

        <p
          css={css`
            max-width: 400px;
            font-family: Open Sans;
            font-weight: 400;
            color: ${hpLightGrey};
          `}
        >
          With {numberOfHotspots} hotspot
          {numberOfHotspots === 1 ? "" : "s"}
          {numberOfHotspots === 1 ? "" : ", each one"} earning roughly{" "}
          {earningsPerDay}
          {" HNT "}
          per day, you'll make{" "}
          <CurrencyFormat
            value={totalEstimate}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={0}
            renderText={(value) => (
              <span
                css={css`
                  color: ${hpBlue};
                  font-family: Sora;
                  font-weight: 400;
                  background-color: #000;
                  margin: 2px;
                  padding: 2px 5px;
                  border-radius: 5px;
                `}
              >
                {value}
              </span>
            )}
          />{" "}
          HNT per year.{" "}
        </p>
        <p
          css={css`
            max-width: 400px;
            font-family: Open Sans;
            font-weight: 400;
            color: ${hpLightGrey};
          `}
        >
          That's{" "}
          <CurrencyFormat
            value={totalEstimateInUsd}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={"$"}
            renderText={(value) => (
              <span
                css={css`
                  color: ${hpGreen};
                  font-family: Sora;
                  font-weight: 400;
                  background-color: #000;
                  margin: 2px;
                  padding: 2px 5px;
                  border-radius: 5px;
                `}
              >
                {value}
              </span>
            )}
          />{" "}
          USD per year at an exchange rate of {hntUsdExchangeRate} USD per HNT
          token.
        </p>
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

export async function getServerSideProps() {
  const res = await fetch(`https://api.helium.io/v1/oracle/prices/current`);
  const priceData = await res.json();

  return {
    props: { priceData },
  };
}

export default EarningsCalculator;
