import { useState, useEffect } from "react";

import NavBar from "../components/NavBar";
import Head from "next/head";
import Link from "next/link";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import CurrencyFormat from "react-currency-format";

import HotspotCalculatorRow from "../components/HotspotCalculatorRow";

const hpGreen = `#42DE9F`;
const hpBlue = `#42D1E4`;
const hpLightGrey = `#CCC`;
const hpWhite = `#FFF`;

const Prose = styled.p`
  font-family: Open Sans;
  font-weight: 400;
  color: ${hpLightGrey};
  margin: 1.25em 0;
  font-size: 1em;
  line-height: 1.75em;
`;

const EarningsCalculator = ({ chainVars, priceData, stats }) => {
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

  const [numberOfHotspotRows, setNumberOfHotspotRows] = useState(1);

  const [hotspots, setHotspots] = useState([
    {
      number: 1,
      name: `Hotspot 1`,
      hotspotDensityManual: false,
      hotspotDensityManualArray: [
        { name: `Nearby hotspot 1`, metersAway: 500 },
      ],
      hotspotDensitySelection: 0,
    },
  ]);

  const addRow = () => {
    // setNumberOfHotspotRows(numberOfHotspotRows + 1);

    let hotspotsArray = [...hotspots];

    hotspotsArray.push({
      number: hotspotsArray.length + 1,
      name: `Hotspot ${hotspotsArray.length + 1}`,
      hotspotDensityManual: false,
      hotspotDensityManualArray: [
        { name: `Nearby hotspot 1`, metersAway: 500 },
      ],
      hotspotDensitySelection: 0,
    });

    setHotspots(hotspotsArray);
  };

  // console.log(hotspots);

  const removeRow = (number) => {
    let hotspotsArray = [...hotspots];

    hotspotsArray.splice(number - 1, 1);

    hotspotsArray.map((hotspot, index) => {
      hotspot.number = index + 1;
      hotspot.name = `Hotspot ${index + 1}`;
    });

    setHotspots(hotspotsArray);

    // if (numberOfHotspotRows !== 1)
    //   setNumberOfHotspotRows(numberOfHotspotRows - 1);
  };

  const setDensity = (hotspotDensity, hotspotIndex) => {
    let hotspotsArray = [...hotspots];

    hotspotsArray.map((hotspot, index) => {
      if (index + 1 === hotspotIndex)
        hotspot.hotspotDensitySelection = hotspotDensity;
    });

    setHotspots(hotspotsArray);
  };

  const [editingValues, setEditingValues] = useState(true);

  const flipBetweenEditingAndCalculating = () => {
    setEditingValues(!editingValues);
  };

  const EditButton = styled.button`
    height: 40px;
    background-color: #42de9f;
    border-radius: 5px;
    margin: 5px;
    padding: 5px;
    min-width: 150px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    font-family: Open Sans;
    font-weight: 400;
    font-size: 1em;
    line-height: 1.75em;
    color: #000;
  `;

  const SecondaryButton = styled.button`
    height: 40px;
    background-color: #1e2b37;
    color: white;
    border-radius: 5px;
    margin: 5px;
    padding: 5px 15px;
    font-family: Open Sans;
    font-weight: 400;
    font-size: 1em;
    line-height: 1.75em;
    color: #969696;
  `;

  const ShowMathButton = styled.button`
    color: #ccc;
    background-color: #1a2733;
    border-radius: 3px;
  `;

  const monthlyRewards = chainVars.data.monthly_reward;
  const dcPercent = chainVars.data.dc_percent;
  const witnessPercent = chainVars.data.poc_witnesses_percent;
  const challengerPercent = chainVars.data.poc_challengers_percent;
  const challengeePercent = chainVars.data.poc_challengees_percent;
  const consensusPercent = chainVars.data.consensus_percent;

  const monthlyRewardsInRealNumbers = monthlyRewards / 100000000;

  const numberOfActiveHotspots = stats.data.counts.hotspots;
  console.log(stats.data.counts);
  // const dcTransferredLastMonth = stats.data.counts.hotspots;

  let totalEarnings = 0;

  const [rewardsShowingState, setRewardsShowingState] = useState({
    challenger: {
      totalAvailable: false,
      likelyPerEpoch: false,
    },
    challengee: {
      totalAvailable: false,
      likelyPerEpoch: false,
    },
    witness: {
      totalAvailable: false,
      likelyPerEpoch: false,
    },
    consensus: {
      totalAvailable: false,
      likelyPerEpoch: false,
    },
    data: {
      totalAvailable: false,
      likelyPerEpoch: false,
    },
  });

  const updateRewardsMathShowingState = (input) => {
    let tempStateObject = rewardsShowingState;

    console.log(!tempStateObject.challenger.totalAvailable);

    switch (input) {
      case "challenger-1":
        tempStateObject.challenger.totalAvailable = true;
        break;
      case "challenger-2":
        tempStateObject.challenger.likelyPerEpoch = true;
        break;
      case "challengee-1":
        tempStateObject.challengee.likelyPerEpoch = true;
        break;
      case "challenger-2":
        tempStateObject.challengee.likelyPerEpoch = true;
        break;
      case "witness-1":
        tempStateObject.witness.likelyPerEpoch = true;
        break;
      case "witness-2":
        tempStateObject.witness.likelyPerEpoch = true;
        break;
      case "consensus-1":
        tempStateObject.consensus.likelyPerEpoch = true;
        break;
      case "consensus-2":
        tempStateObject.consensus.likelyPerEpoch = true;
        break;
      case "data-1":
        tempStateObject.data.likelyPerEpoch = true;
        break;
      case "data-2":
        tempStateObject.data.likelyPerEpoch = true;
        break;
    }
    setRewardsShowingState(tempStateObject);
  };
  useEffect(() => {}, [rewardsShowingState]);

  return (
    <>
      <NavBar />
      <Head>
        <title>Helium Hotspot Earnings Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center justify-center flex-col pt-4 lg:pt-20">
        <section className="p-4 flex items-start lg:items-start justify-start flex-col lg:flex-row w-full max-w-xl lg:max-w-4xl pb-12 lg:pb-40">
          <div className="max-w-2xl w-full flex items-start justify-start flex-col">
            <h1 className="text-5xl max-w-2xl text-white font-display pt-6 lg:pt-12 leading-tight lg:text-6xl text-left font-bold pr-2">
              Helium Hotspot Earnings Calculator
            </h1>
            <p className="max-w-2xl text-lg font-body pt-4 text-gray-500 text-left">
              This tool can be used to give a rough estimate of how much HNT
              your hotspot might earn, based on its situation and the current
              state of the Helium network and the current HNT reward
              distrubtion.
            </p>
            <p className="max-w-2xl text-lg font-body pt-4 text-gray-500 text-left">
              A much simpler version of this tool can be found{" "}
              <Link href="/simple-earnings-calculator">
                <a className="text-hpgreen-100">here.</a>
              </Link>
            </p>
          </div>
        </section>
        <section className="bg-gray-200 w-full flex items-center lg:items-start justify-end flex-col pb-64">
          <div className="max-w-xl w-full lg:max-w-5xl mx-auto px-4 lg:px-12 lg:-mt-24 mt-10">
            {editingValues ? (
              <div className="bg-hpblue-800 w-full rounded-xl">
                {hotspots.map((hotspot) => {
                  return (
                    <HotspotCalculatorRow
                      name={hotspot.name}
                      addRowHandler={addRow}
                      removeRowHandler={() => removeRow(hotspot.number)}
                      firstRow={hotspot.number === 1}
                      lastRow={hotspot.number === hotspots.length}
                      density1Handler={() => setDensity(1, hotspot.number)}
                      density2Handler={() => setDensity(2, hotspot.number)}
                      density3Handler={() => setDensity(3, hotspot.number)}
                      selectedDensity={hotspot.hotspotDensitySelection}
                      calculateFunction={flipBetweenEditingAndCalculating}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="bg-hpblue-800 w-full rounded-xl">
                {hotspots.map((hotspot, index) => {
                  let hotspotEarnings = 0;

                  let loneWolfness = hotspot.hotspotDensitySelection;

                  let challengerRewards =
                    (monthlyRewardsInRealNumbers * challengerPercent) /
                    numberOfActiveHotspots;

                  hotspotEarnings += challengerRewards;

                  let challengeeRewards =
                    (monthlyRewardsInRealNumbers * challengeePercent) /
                    (numberOfActiveHotspots * 0.65);

                  let witnessRewards =
                    (monthlyRewardsInRealNumbers * witnessPercent) /
                    (numberOfActiveHotspots * 0.65);

                  let consensusRewards =
                    monthlyRewardsInRealNumbers *
                    consensusPercent *
                    (1 / numberOfActiveHotspots);

                  let dataRewards =
                    (monthlyRewardsInRealNumbers * dcPercent) /
                    (numberOfActiveHotspots * 0.4);

                  if (loneWolfness > 1) {
                    hotspotEarnings += challengeeRewards;
                    hotspotEarnings += witnessRewards;

                    if (loneWolfness > 2) {
                      hotspotEarnings += consensusRewards;
                      hotspotEarnings += dataRewards;
                    }
                  }

                  totalEarnings += hotspotEarnings;

                  return (
                    <>
                      <div
                        css={css`
                          margin-bottom: 20px;
                          color: #777;
                        `}
                      >
                        <p className="p-5 text-black">
                          Hotspot {hotspot.number}
                        </p>
                        <table
                          css={css`
                            width: 100%;
                          `}
                        >
                          <tbody>
                            <tr>
                              <td className="p-5">
                                Reward type:
                                <p
                                  css={css`
                                    font-size: 20px;
                                    color: white;
                                  `}
                                >
                                  Challenger ({challengerPercent * 100}%)
                                </p>
                              </td>
                              <td className="p-5">
                                Total available per month:
                                <p
                                  css={css`
                                    font-size: 20px;
                                    color: white;
                                  `}
                                >
                                  {monthlyRewardsInRealNumbers *
                                    challengerPercent}
                                </p>
                                <ShowMathButton
                                  onClick={() =>
                                    updateRewardsMathShowingState(
                                      "challenger-1"
                                    )
                                  }
                                >
                                  Show math
                                </ShowMathButton>
                                {console.log(rewardsShowingState)}
                                {rewardsShowingState.challenger
                                  .totalAvailable && (
                                  <p>Math: blah blah blah</p>
                                )}
                              </td>
                              <td className="p-5">
                                Likely earnings per month:
                                <p
                                  css={css`
                                    font-size: 20px;
                                    color: white;
                                  `}
                                >
                                  {challengerRewards.toFixed(2)} HNT
                                </p>
                              </td>
                              <td
                                css={css`
                                  font-size: 24px;
                                  color: #aaa;
                                  text-align: right;
                                `}
                                className="p-5"
                              >
                                {challengerRewards.toFixed(2)} HNT
                              </td>
                            </tr>
                            {loneWolfness > 1 && (
                              <>
                                <tr>
                                  <td className="p-5">
                                    Reward type:
                                    <p
                                      css={css`
                                        font-size: 20px;
                                        color: white;
                                      `}
                                    >
                                      Challengee ({challengeePercent * 100}%)
                                    </p>
                                  </td>
                                  <td className="p-5">
                                    Total available per month:
                                    <p
                                      css={css`
                                        font-size: 20px;
                                        color: white;
                                      `}
                                    >
                                      {monthlyRewardsInRealNumbers *
                                        challengeePercent}
                                    </p>
                                  </td>
                                  <td className="p-5">
                                    Likely earnings per month:
                                    <p
                                      css={css`
                                        font-size: 20px;
                                        color: white;
                                      `}
                                    >
                                      {challengeeRewards.toFixed(2)} HNT
                                    </p>
                                  </td>
                                  <td
                                    css={css`
                                      font-size: 24px;
                                      color: #aaa;
                                      text-align: right;
                                    `}
                                    className="p-5"
                                  >
                                    {challengeeRewards.toFixed(2)} HNT
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-5">
                                    Reward type:
                                    <p
                                      css={css`
                                        font-size: 20px;
                                        color: white;
                                      `}
                                    >
                                      Witness ({witnessPercent * 100}%)
                                    </p>
                                  </td>
                                  <td className="p-5">
                                    Total available per month:
                                    <p
                                      css={css`
                                        font-size: 20px;
                                        color: white;
                                      `}
                                    >
                                      {monthlyRewardsInRealNumbers *
                                        witnessPercent}
                                    </p>
                                  </td>
                                  <td className="p-5">
                                    Likely earnings per month:
                                    <p
                                      css={css`
                                        font-size: 20px;
                                        color: white;
                                      `}
                                    >
                                      {witnessRewards.toFixed(2)} HNT
                                    </p>
                                  </td>
                                  <td
                                    css={css`
                                      font-size: 24px;
                                      color: #aaa;
                                      text-align: right;
                                    `}
                                    className="p-5"
                                  >
                                    {witnessRewards.toFixed(2)} HNT
                                  </td>
                                </tr>
                              </>
                            )}
                            {loneWolfness > 2 && (
                              <>
                                <tr>
                                  <td className="p-5">
                                    Reward type:
                                    <p
                                      css={css`
                                        font-size: 20px;
                                        color: white;
                                      `}
                                    >
                                      Consensus ({consensusPercent * 100}%)
                                    </p>
                                  </td>
                                  <td className="p-5">
                                    Total available per month:
                                    <p
                                      css={css`
                                        font-size: 20px;
                                        color: white;
                                      `}
                                    >
                                      {monthlyRewardsInRealNumbers *
                                        consensusPercent}
                                    </p>
                                  </td>
                                  <td className="p-5">
                                    Likely earnings per month:
                                    <p
                                      css={css`
                                        font-size: 20px;
                                        color: white;
                                      `}
                                    >
                                      {consensusRewards.toFixed(2)} HNT
                                    </p>
                                  </td>
                                  <td
                                    css={css`
                                      font-size: 24px;
                                      color: #aaa;
                                      text-align: right;
                                    `}
                                    className="p-5"
                                  >
                                    {consensusRewards.toFixed(2)} HNT
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-5">
                                    Reward type:
                                    <p
                                      css={css`
                                        font-size: 20px;
                                        color: white;
                                      `}
                                    >
                                      Data Transfer ({dcPercent * 100}%)
                                    </p>
                                  </td>
                                  <td className="p-5">
                                    Total available per month:
                                    <p
                                      css={css`
                                        font-size: 20px;
                                        color: white;
                                      `}
                                    >
                                      {monthlyRewardsInRealNumbers * dcPercent}
                                    </p>
                                  </td>
                                  <td className="p-5">
                                    Likely earnings per month:
                                    <p
                                      css={css`
                                        font-size: 20px;
                                        color: white;
                                      `}
                                    >
                                      {dataRewards.toFixed(2)} HNT
                                    </p>
                                  </td>
                                  <td
                                    css={css`
                                      font-size: 24px;
                                      color: #aaa;
                                      text-align: right;
                                    `}
                                    className="p-5"
                                  >
                                    {dataRewards.toFixed(2)} HNT
                                  </td>
                                </tr>
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                      {hotspots.length > 1 && (
                        <div className="flex justify-end align-center">
                          <p
                            css={css`
                              color: ${hpLightGrey};
                              font-size: 36px;
                              text-align: right;
                            `}
                            className="p-5"
                          >
                            {hotspotEarnings.toFixed(2)} HNT
                          </p>
                        </div>
                      )}

                      {index + 1 !== hotspots.length && (
                        <div
                          css={css`
                            background-color: #070e15;
                            height: 1px;
                            width: 100%;
                          `}
                        />
                      )}
                    </>
                  );
                })}
                <div
                  css={css`
                    background-color: #334a60;
                    height: 1px;
                    width: 30%;
                    margin-left: auto;
                    margin-right: 15px;
                  `}
                />
                <div className="flex flex-col justify-end align-center">
                  <p
                    css={css`
                      color: ${hpGreen};
                      font-size: 36px;
                      text-align: right;
                    `}
                    className="pr-5 pt-5 pl-5"
                  >
                    {totalEarnings.toFixed(2)} HNT
                  </p>
                  <p
                    css={css`
                      color: #777;
                      font-size: 12px;
                      text-align: right;
                    `}
                    className="pr-5 pb-5"
                  >
                    per month
                  </p>
                </div>
                <div
                  css={css`
                    background-color: #070e15;
                    border-radius: 0 0 15px 15px;
                    padding: 20px;
                    display: flex;
                    flex-direction: row;
                  `}
                >
                  <EditButton onClick={flipBetweenEditingAndCalculating}>
                    Edit values
                  </EditButton>
                  <SecondaryButton onClick={flipBetweenEditingAndCalculating}>
                    Restart
                  </SecondaryButton>
                  <SecondaryButton onClick={flipBetweenEditingAndCalculating}>
                    Share results
                  </SecondaryButton>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const chainVarsRes = await fetch(`https://api.helium.io/v1/vars`);
  const chainVars = await chainVarsRes.json();

  const priceDataRes = await fetch(
    `https://api.helium.io/v1/oracle/prices/current`
  );
  const priceData = await priceDataRes.json();

  const statsRes = await fetch(`https://api.helium.io/v1/stats`);
  const stats = await statsRes.json();

  return {
    props: { chainVars, priceData, stats },
  };
}

export default EarningsCalculator;
