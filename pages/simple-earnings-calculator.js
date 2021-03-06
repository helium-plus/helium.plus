import { useState } from "react";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import CurrencyFormat from "react-currency-format";
import NavBar from "../components/core/NavBar";
import MetaTags from "../components/core/MetaTags";

const hpGreen = `#42DE9F`;
const hpBlue = `#42D1E4`;
const hpLightGrey = `#CCC`;
const hpWhite = `#FFF`;

const Prose = styled.p`
  color: ${hpLightGrey};
  margin: 1.25em 0;
`;

const EarningsCalculator = ({ priceData }) => {
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
    <>
      <NavBar />
      <MetaTags title={"Simple Helium Earnings Calculator — Helium Plus"} />
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
        <main
          css={css`
            max-width: 400px;
          `}
        >
          <h1
            css={css`
              font-size: 2.25em;
              margin-bottom: 0.8888889em;
              line-height: 1.1111111;
              font-weight: 600 !important;
              color: ${hpWhite} !important;

              padding-top: 8rem;

              @media screen and (max-width: 500px) {
                padding-top: 2rem;
              }
            `}
            className="font-display"
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
            className={`mr-4 font-body`}
            css={css`
              border-radius: 8px;
              max-width: 250px;
              width: calc(50% - 2rem);
              border: 2px solid transparent;
              height: 45px;
              padding: 1rem;
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
            className="font-body"
            css={css`
              border-radius: 8px;
              max-width: 250px;
              width: auto;
              width: calc(50% - 2rem);
              border: 2px solid transparent;
              height: 45px;
              padding: 1rem;
              outline: none;

              &:focus {
                border: 2px solid ${hpGreen};
              }
            `}
          />

          <Prose className="font-display">
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
                  className="font-display"
                  css={css`
                    color: ${hpBlue};
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
          </Prose>
          <Prose className="font-display">
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
                  className="font-display"
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
          </Prose>
        </main>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch(`https://api.helium.io/v1/oracle/prices/current`);
  const priceData = await res.json();

  return {
    revalidate: 60,
    props: { priceData },
  };
}

export default EarningsCalculator;
