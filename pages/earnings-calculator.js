import { useState, useEffect } from "react";

import NavBar from "../components/NavBar";
import Head from "next/head";
import Link from "next/link";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import { formatNumber } from "../lib/NumberFormatting";

import HotspotCalculatorRow from "../components/HotspotCalculatorRow";
import HotspotInfoSection from "../components/HotspotInfoSection";
import Button from "../components/core/Button";

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
  const [warningMessage, setWarningMessage] = useState("");

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
    let noDensitySelected = false;

    hotspots.map((hotspot, index) => {
      if (hotspot.hotspotDensitySelection === 0) noDensitySelected = true;
    });

    if (!noDensitySelected) {
      setEditingValues(!editingValues);
      setWarningMessage("");
    } else {
      setWarningMessage(
        "Please make sure you've answered every question for each hotspot."
      );
    }
  };

  const restartEditing = () => {
    let resetHotspotsArray = [
      {
        number: 1,
        name: `Hotspot 1`,
        hotspotDensityManual: false,
        hotspotDensityManualArray: [
          { name: `Nearby hotspot 1`, metersAway: 500 },
        ],
        hotspotDensitySelection: 0,
      },
    ];

    setHotspots(resetHotspotsArray);

    setEditingValues(true);
  };

  const monthlyRewards = chainVars.data.monthly_reward;
  const monthlyRewardsInHnt = monthlyRewards / 100000000;
  const dcPercent = chainVars.data.dc_percent;
  const witnessPercent = chainVars.data.poc_witnesses_percent;
  const challengerPercent = chainVars.data.poc_challengers_percent;
  const challengeePercent = chainVars.data.poc_challengees_percent;
  const consensusPercent = chainVars.data.consensus_percent;

  const initialChallengerParticipationPercent = 99;
  const [
    challengerParticipationPercent,
    setChallengerParticipationPercent,
  ] = useState(initialChallengerParticipationPercent);
  const [
    challengerParticipationInputEmpty,
    setChallengerParticipationInputEmpty,
  ] = useState(false);

  const initialChallengeeParticipationPercent = 75;
  const [
    challengeeParticipationPercent,
    setChallengeeParticipationPercent,
  ] = useState(initialChallengeeParticipationPercent);
  const [
    challengeeParticipationInputEmpty,
    setChallengeeParticipationInputEmpty,
  ] = useState(false);

  const initialWitnessParticipationPercent = 75;
  const [
    witnessParticipationPercent,
    setWitnessParticipationPercent,
  ] = useState(initialWitnessParticipationPercent);
  const [
    witnessParticipationInputEmpty,
    setWitnessParticipationInputEmpty,
  ] = useState(false);

  const initialConsensusParticipationPercent = 80;
  const [
    consensusParticipationPercent,
    setConsensusParticipationPercent,
  ] = useState(initialConsensusParticipationPercent);
  const [
    consensusParticipationInputEmpty,
    setConsensusParticipationInputEmpty,
  ] = useState(false);

  const initialDcParticipationPercent = 40;
  const [dcParticipationPercent, setDcParticipationPercent] = useState(
    initialDcParticipationPercent
  );
  const [dcParticipationInputEmpty, setDcParticipationInputEmpty] = useState(
    false
  );

  const numberOfActiveHotspots = stats.data.counts.hotspots;

  const monthlyDataSpendInDataCredits =
    stats.data.state_channel_counts.last_month.num_dcs;
  const monthlyDataSpendInUsd = monthlyDataSpendInDataCredits * 0.00001;
  console.log(`Spend per month in USD: $${monthlyDataSpendInUsd}`);
  const monthlyDataSpendInHnt =
    monthlyDataSpendInUsd / (priceData.data.price / 100000000);

  console.log(`Spend per month in HNT: ${monthlyDataSpendInHnt} HNT`);

  // the amount (in HNT) that will be redistributed if not utilized
  // from HIP10
  const monthlyDataUsagePercent =
    monthlyDataSpendInHnt / (dcPercent * monthlyRewardsInHnt);

  const monthlyUnusedDataRewardsSurplusInHnt =
    dcPercent * monthlyRewardsInHnt * (1 - monthlyDataUsagePercent);

  console.log(`Used: ${monthlyDataUsagePercent * 100}%`);
  console.log(`Surplus: ${monthlyUnusedDataRewardsSurplusInHnt} HNT`);

  const surplusRewardTypesCombinedPercentages =
    challengerPercent + challengeePercent + witnessPercent;

  const challengerSurplusInHnt =
    monthlyUnusedDataRewardsSurplusInHnt *
    (challengerPercent / surplusRewardTypesCombinedPercentages);

  const challengeeSurplusInHnt =
    monthlyUnusedDataRewardsSurplusInHnt *
    (challengeePercent / surplusRewardTypesCombinedPercentages);

  const witnessSurplusInHnt =
    monthlyUnusedDataRewardsSurplusInHnt *
    (witnessPercent / surplusRewardTypesCombinedPercentages);

  let totalEarnings = 0;

  const participationChangeHandler = (e) => {
    if (e.target.id === "challenger-input") {
      if (
        e.target.value !== undefined &&
        e.target.value !== "" &&
        e.target.value > 0 &&
        e.target.value <= 100
      ) {
        setChallengerParticipationPercent(e.target.value);
        setChallengerParticipationInputEmpty(false);
      } else {
        setChallengerParticipationInputEmpty(true);
        setChallengerParticipationPercent(
          initialChallengerParticipationPercent
        );
      }
    } else if (e.target.id === "challengee-input") {
      if (
        e.target.value !== undefined &&
        e.target.value !== "" &&
        e.target.value > 0 &&
        e.target.value <= 100
      ) {
        setChallengeeParticipationPercent(e.target.value);
        setChallengeeParticipationInputEmpty(false);
      } else {
        setChallengeeParticipationInputEmpty(true);
        setChallengeeParticipationPercent(
          initialChallengeeParticipationPercent
        );
      }
    } else if (e.target.id === "witness-input") {
      if (
        e.target.value !== undefined &&
        e.target.value !== "" &&
        e.target.value > 0 &&
        e.target.value <= 100
      ) {
        setWitnessParticipationPercent(e.target.value);
        setWitnessParticipationInputEmpty(false);
      } else {
        setWitnessParticipationInputEmpty(true);
        setWitnessParticipationPercent(initialWitnessParticipationPercent);
      }
    } else if (e.target.id === "consensus-input") {
      if (
        e.target.value !== undefined &&
        e.target.value !== "" &&
        e.target.value > 0 &&
        e.target.value <= 100
      ) {
        setConsensusParticipationPercent(e.target.value);
        setConsensusParticipationInputEmpty(false);
      } else {
        setConsensusParticipationInputEmpty(true);
        setConsensusParticipationPercent(initialConsensusParticipationPercent);
      }
    } else if (e.target.id === "data transfer-input") {
      if (
        e.target.value !== undefined &&
        e.target.value !== "" &&
        e.target.value > 0 &&
        e.target.value <= 100
      ) {
        setDcParticipationPercent(e.target.value);
        setDcParticipationInputEmpty(false);
      } else {
        setDcParticipationInputEmpty(true);
        setDcParticipationPercent(initialDcParticipationPercent);
      }
    }
  };

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
                <a className="text-hpgreen-100 focus:outline-none focus:border-none">
                  here.
                </a>
              </Link>
            </p>
          </div>
        </section>
        <section className="bg-gray-400 w-full flex items-center lg:items-start justify-end flex-col pb-64">
          <div className="max-w-xl w-full lg:max-w-5xl mx-auto px-px lg:px-12 lg:-mt-24 mt-6">
            {editingValues ? (
              <div className="bg-hpblue-800 w-full rounded-xl">
                {hotspots.map((hotspot) => {
                  return (
                    <HotspotCalculatorRow
                      name={hotspot.name}
                      // addRowHandler={addRow}
                      removeRowHandler={() => removeRow(hotspot.number)}
                      firstRow={hotspot.number === 1}
                      // lastRow={hotspot.number === hotspots.length}
                      density1Handler={() => setDensity(1, hotspot.number)}
                      density2Handler={() => setDensity(2, hotspot.number)}
                      density3Handler={() => setDensity(3, hotspot.number)}
                      selectedDensity={hotspot.hotspotDensitySelection}
                      // calculateFunction={flipBetweenEditingAndCalculating}
                      // warningMessage={warningMessage}
                    />
                  );
                })}
                <div className="px-4 lg:px-8 py-5 bg-hpblue-1000 rounded-b-xl">
                  {warningMessage !== "" && (
                    <p className="text-hpgreen-100 font-body font-bold pb-4">
                      {warningMessage}
                    </p>
                  )}
                  <div className="flex flex-row">
                    <Button
                      buttonForegroundColor="black"
                      buttonBackgroundColor="hpgreen-100"
                      onClick={flipBetweenEditingAndCalculating}
                      buttonText="See results"
                    />
                    <Button
                      buttonForegroundColor="gray-600"
                      buttonBackgroundColor="hpblue-800"
                      onClick={addRow}
                      buttonText="Add hotspot"
                      buttonIcon="plus"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-hpblue-800 w-full rounded-xl">
                {hotspots.map((hotspot, index) => {
                  let hotspotEarnings = 0;

                  let loneWolfness = hotspot.hotspotDensitySelection;

                  let challengerRewards =
                    (monthlyRewardsInHnt * challengerPercent) /
                    (numberOfActiveHotspots *
                      (challengerParticipationPercent / 100));

                  let challengeeRewards =
                    loneWolfness === 1
                      ? 0
                      : (monthlyRewardsInHnt * challengeePercent) /
                        (numberOfActiveHotspots *
                          (challengeeParticipationPercent / 100));

                  let witnessRewards =
                    loneWolfness === 1
                      ? 0
                      : (monthlyRewardsInHnt * witnessPercent) /
                        (numberOfActiveHotspots *
                          (witnessParticipationPercent / 100));

                  let consensusRewards =
                    loneWolfness < 3
                      ? 0
                      : monthlyRewardsInHnt *
                        consensusPercent *
                        (1 /
                          (numberOfActiveHotspots *
                            (consensusParticipationPercent / 100)));

                  let dataRewards =
                    (monthlyRewardsInHnt * dcPercent -
                      monthlyUnusedDataRewardsSurplusInHnt) /
                    (numberOfActiveHotspots * (dcParticipationPercent / 100));

                  hotspotEarnings += challengerRewards;
                  hotspotEarnings += challengeeRewards;
                  hotspotEarnings += witnessRewards;
                  hotspotEarnings += consensusRewards;
                  hotspotEarnings += dataRewards;

                  totalEarnings += hotspotEarnings;

                  return (
                    <>
                      <div>
                        <div className="flex flex-row">
                          <div className="bg-black p-3 rounded-b-lg ml-4 lg:ml-6 flex flex-row items-center">
                            <p className="font-display text-hpgreen-100">
                              Hotspot {hotspot.number}
                            </p>
                          </div>
                        </div>

                        {/* Challenger rewards */}
                        <div className="px-4 lg:px-8 pt-10 flex flex-row justify-between">
                          <div className="flex-shrink w-full">
                            <p className="text-white text-xl font-display leading-tight pb-4 max-w-sm">
                              Challenger rewards
                            </p>
                            <p className="text-gray-600 text-md font-body">
                              {formatNumber(challengerPercent, "%")} of the{" "}
                              {formatNumber(monthlyRewardsInHnt, "HNT", 0)}{" "}
                              minted every month, divided between{" "}
                              {formatNumber(
                                numberOfActiveHotspots *
                                  (challengerParticipationPercent / 100),
                                "int",
                                0
                              )}{" "}
                              hotspots.
                            </p>
                          </div>
                          <p className="text-gray-500 font-display text-3xl leading-tight flex-grow w-full text-right">
                            {formatNumber(challengerRewards, "HNT", 2)}
                          </p>
                        </div>

                        {/* Challengee rewards */}
                        <div className="px-4 lg:px-8 pt-10 flex flex-row justify-between">
                          <div className="flex-shrink w-full">
                            <p className="text-white text-xl font-display leading-tight pb-4 max-w-sm">
                              Challengee rewards
                            </p>
                            <p className="text-gray-600 text-md font-body">
                              {loneWolfness === 1 ? (
                                <>
                                  Since your hotspot won't have any others
                                  nearby, it likely isn't elligible for this
                                  reward type.
                                </>
                              ) : (
                                <>
                                  {formatNumber(challengeePercent, "%")} of the{" "}
                                  {formatNumber(monthlyRewardsInHnt, "HNT", 0)}{" "}
                                  minted every month, divided between{" "}
                                  {formatNumber(
                                    numberOfActiveHotspots *
                                      (challengeeParticipationPercent / 100),
                                    "int",
                                    0
                                  )}{" "}
                                  hotspots, plus a bonus from redistributed HNT
                                  from data rewards.
                                </>
                              )}
                            </p>
                          </div>
                          <p className="text-gray-500 font-display text-3xl leading-tight flex-grow w-full text-right">
                            {formatNumber(challengeeRewards, "HNT", 2)}
                          </p>
                        </div>

                        {/* Witness rewards */}
                        <div className="px-4 lg:px-8 pt-10 flex flex-row justify-between">
                          <div className="flex-shrink w-full">
                            <p className="text-white text-xl font-display leading-tight pb-4 max-w-sm">
                              Witness rewards
                            </p>
                            <p className="text-gray-600 text-md font-body">
                              {loneWolfness === 1 ? (
                                <>
                                  Since your hotspot won't have any others
                                  nearby, it likely isn't elligible for this
                                  reward type.
                                </>
                              ) : (
                                <>
                                  {formatNumber(witnessPercent, "%")} of the{" "}
                                  {formatNumber(monthlyRewardsInHnt, "HNT", 0)}{" "}
                                  minted every month, divided between{" "}
                                  {formatNumber(
                                    numberOfActiveHotspots *
                                      (witnessParticipationPercent / 100),
                                    "int",
                                    0
                                  )}{" "}
                                  hotspots, plus a bonus from redistributed HNT
                                  from data rewards.
                                </>
                              )}
                            </p>
                          </div>
                          <p className="text-gray-500 font-display text-3xl leading-tight flex-grow w-full text-right">
                            {formatNumber(witnessRewards, "HNT", 2)}
                          </p>
                        </div>

                        {/* Consensus rewards */}
                        <div className="px-4 lg:px-8 pt-10 flex flex-row justify-between">
                          <div className="flex-shrink w-full">
                            <p className="text-white text-xl font-display leading-tight pb-4 max-w-sm">
                              Consensus rewards
                            </p>
                            <p className="text-gray-600 text-md font-body">
                              {loneWolfness < 3 ? (
                                <>
                                  Your hotspot likely won't have enough nearby
                                  hotspots in order to get elected to consensus
                                  groups.
                                </>
                              ) : (
                                <>
                                  {formatNumber(consensusPercent, "%")} of the{" "}
                                  {formatNumber(monthlyRewardsInHnt, "HNT", 0)}{" "}
                                  minted every month, assuming your hotspot has
                                  an equal chance of being elected as the other{" "}
                                  {formatNumber(
                                    numberOfActiveHotspots *
                                      (consensusParticipationPercent / 100) -
                                      1,
                                    "int",
                                    0
                                  )}{" "}
                                  hotspots.
                                </>
                              )}
                            </p>
                          </div>
                          <p className="text-gray-500 font-display text-3xl leading-tight flex-grow w-full text-right">
                            {formatNumber(consensusRewards, "HNT", 2)}
                          </p>
                        </div>

                        {/* Data transfer rewards */}
                        <div className="px-4 pb-5 lg:px-8 pt-10 flex flex-row justify-between">
                          <div className="flex-shrink w-full">
                            <p className="text-white text-xl font-display leading-tight pb-4 max-w-sm">
                              Data transfer rewards
                            </p>
                            <p className="text-gray-600 text-md font-body">
                              {formatNumber(dcPercent, "%")} of the{" "}
                              {formatNumber(monthlyRewardsInHnt, "HNT", 0)}{" "}
                              minted every month, minus the HNT equivalent of
                              any Data Credit purchases required to meet the{" "}
                              {formatNumber(dcPercent, "%")} allocation, and
                              divided between{" "}
                              {formatNumber(
                                numberOfActiveHotspots *
                                  (dcParticipationPercent / 100),
                                "int",
                                0
                              )}{" "}
                              hotspots.
                            </p>
                          </div>
                          <p className="text-gray-500 font-display text-3xl leading-tight flex-grow w-full text-right">
                            {formatNumber(dataRewards, "HNT", 2)}
                          </p>
                        </div>

                        {/*  */}
                      </div>
                      {hotspots.length > 1 && (
                        <div className="flex justify-end align-center bg-hpblue-900 mb-10">
                          <p className="text-right font-display text-gray-200 text-4xl p-5">
                            {formatNumber(hotspotEarnings, "HNT", 2)}
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
                <div className="px-2 lg:px-4">
                  <div className="bg-hpblue-600 h-px w-full" />
                </div>
                <div className="flex flex-col lg:flex-col justify-end align-end bg-hpgreen-100 p-5">
                  <p className="text-gray-900 font-display text-xl text-right lg:pr-0">
                    {hotspots.length > 1 ? "These hotspots" : "This hotspot"}{" "}
                    will likely earn around
                  </p>
                  <div className="flex flex-col justify-end align-end">
                    <p className="text-black leading-tight font-bold font-display text-4xl text-right">
                      {formatNumber(totalEarnings, "HNT", 2)}
                    </p>
                    <p className="font-display text-xl text-gray-900 text-right">
                      in total per month.
                    </p>
                    <p className="pt-5 font-display text-xl text-gray-900 text-right">
                      That's
                    </p>
                    <p className="text-black leading-tight font-bold font-display text-4xl text-right">
                      {formatNumber(
                        totalEarnings * hntUsdExchangeRate,
                        "USD",
                        2
                      )}
                    </p>
                    <p className="font-display text-xl text-gray-900 text-right">
                      at the current HNT/USD exchange rate.
                    </p>
                  </div>
                </div>

                <div className="bg-hpblue-700 px-4 lg:px-8 py-8">
                  <div className="pb-6">
                    <p className="text-xl pb-5 font-display text-gray-300">
                      Calculator inputs:
                    </p>
                    <p className="text-md pb-4 font-display text-gray-500">
                      HNT minted per month:{" "}
                      <span className="text-gray-200">
                        {formatNumber(monthlyRewardsInHnt)}
                      </span>
                    </p>
                    <p className="text-md pb-4 font-display text-gray-500">
                      Data Credits spend (last 30 days):{" "}
                      <span className="text-gray-200">
                        {formatNumber(monthlyDataSpendInDataCredits)}
                      </span>
                    </p>
                    <p className="text-md pb-4 font-display text-gray-500">
                      Active hotspots:{" "}
                      <span className="text-gray-200">
                        {formatNumber(numberOfActiveHotspots)}
                      </span>
                    </p>
                    <p className="text-md pb-4 font-display text-gray-500">
                      Current USD price of HNT:{" "}
                      <span className="text-gray-200">
                        {formatNumber(hntUsdExchangeRate, "USD", 2)}
                      </span>
                    </p>
                  </div>
                  <div className="pb-6">
                    <p className="text-xl pb-1 font-display text-gray-300">
                      Current HNT rewards distribution:
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
                    <HotspotInfoSection
                      rewardName="Challenger"
                      rewardPercent={challengerPercent}
                      participationValue={challengerParticipationPercent}
                      participationInputEmptyBoolean={
                        challengerParticipationInputEmpty
                      }
                      surplus={challengerSurplusInHnt}
                      rewardTotal={monthlyRewardsInHnt}
                      participationChangeHandler={participationChangeHandler}
                    />
                    <HotspotInfoSection
                      rewardName="Challengee"
                      rewardPercent={challengeePercent}
                      participationValue={challengeeParticipationPercent}
                      participationInputEmptyBoolean={
                        challengeeParticipationInputEmpty
                      }
                      surplus={challengeeSurplusInHnt}
                      rewardTotal={monthlyRewardsInHnt}
                      participationChangeHandler={participationChangeHandler}
                    />
                    <HotspotInfoSection
                      rewardName="Witness"
                      rewardPercent={witnessPercent}
                      participationValue={witnessParticipationPercent}
                      participationInputEmptyBoolean={
                        witnessParticipationInputEmpty
                      }
                      surplus={witnessSurplusInHnt}
                      rewardTotal={monthlyRewardsInHnt}
                      participationChangeHandler={participationChangeHandler}
                    />
                    <HotspotInfoSection
                      rewardName="Consensus"
                      rewardPercent={consensusPercent}
                      participationValue={consensusParticipationPercent}
                      participationInputEmptyBoolean={
                        consensusParticipationInputEmpty
                      }
                      rewardTotal={monthlyRewardsInHnt}
                      participationChangeHandler={participationChangeHandler}
                    />
                    <HotspotInfoSection
                      rewardName="Data Transfer"
                      rewardPercent={dcPercent}
                      participationValue={dcParticipationPercent}
                      participationInputEmptyBoolean={dcParticipationInputEmpty}
                      rewardTotal={monthlyRewardsInHnt}
                      dcUsage={monthlyUnusedDataRewardsSurplusInHnt}
                      participationChangeHandler={participationChangeHandler}
                    />
                  </div>
                </div>

                <div className="px-4 lg:px-8 py-5 bg-hpblue-1000 rounded-b-xl">
                  {warningMessage !== "" && (
                    <p className="text-hpgreen-100 font-body font-bold pb-4">
                      {warningMessage}
                    </p>
                  )}
                  <div className="flex flex-row">
                    <Button
                      buttonForegroundColor="black"
                      buttonBackgroundColor="hpgreen-100"
                      onClick={flipBetweenEditingAndCalculating}
                      buttonText="Edit hotspots"
                      buttonIcon="back"
                    />
                    <Button
                      buttonForegroundColor="gray-600"
                      buttonBackgroundColor="hpblue-800"
                      onClick={restartEditing}
                      buttonText="Restart"
                      buttonIcon="refresh"
                    />
                  </div>
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
