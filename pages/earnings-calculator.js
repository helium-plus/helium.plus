import { useState } from "react";

import NavBar from "../components/core/NavBar";
import Head from "next/head";
import Link from "next/link";

import { formatNumber } from "../lib/NumberFormatting";
import NumberFormat from "react-number-format";

import HotspotCalculatorRow from "../components/HotspotCalculatorRow";
import HotspotInfoSection from "../components/HotspotInfoSection";
import Button from "../components/core/Button";

const EarningsCalculator = ({ chainVars, priceData, stats }) => {
  let hntUsdExchangeRate = 0.0;

  if (priceData.data.price !== undefined) {
    hntUsdExchangeRate = priceData.data.price / 100000000;
  }

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

  const removeRow = (number) => {
    let hotspotsArray = [...hotspots];

    hotspotsArray.splice(number - 1, 1);

    hotspotsArray.map((hotspot, index) => {
      hotspot.number = index + 1;
      hotspot.name = `Hotspot ${index + 1}`;
    });

    setHotspots(hotspotsArray);
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

  // Rewards split
  const monthlyRewards = chainVars.data.monthly_reward;
  const monthlyRewardsInHnt = monthlyRewards / 100000000;
  const challengerPercent = chainVars.data.poc_challengers_percent;
  const challengeePercent = chainVars.data.poc_challengees_percent;
  const witnessPercent = chainVars.data.poc_witnesses_percent;
  const consensusPercent = chainVars.data.consensus_percent;
  const dcPercent = chainVars.data.dc_percent;

  // Constants from API
  const numberOfActiveHotspots = stats.data.counts.hotspots;

  const monthlyDataSpendInDataCredits =
    stats.data.state_channel_counts.last_month.num_dcs;

  const yearForCalculatorInitialValue = 2020;
  const yearForCalculatorActualValue = new Date().getFullYear();
  const [yearForCalculator, setYearForCalculator] = useState(
    yearForCalculatorInitialValue
  );

  const [
    monthlyDataSpendInDataCreditsInput,
    setMonthlyDataSpendInDataCreditsInput,
  ] = useState(monthlyDataSpendInDataCredits);

  const [activeHotspotsInput, setActiveHotspotsInput] = useState(
    numberOfActiveHotspots
  );
  const [usdHntInput, setUsdHntInput] = useState(hntUsdExchangeRate);

  const dataCreditInputOrActual = (dataCredits) => {
    if (
      monthlyDataSpendInDataCreditsInput > 0 &&
      monthlyDataSpendInDataCreditsInput !== monthlyDataSpendInDataCredits
    ) {
      return monthlyDataSpendInDataCreditsInput;
    } else {
      return dataCredits;
    }
  };

  const hotspotsInputOrActual = (hotspots) => {
    if (
      activeHotspotsInput > 0 &&
      activeHotspotsInput !== numberOfActiveHotspots
    ) {
      return activeHotspotsInput;
    } else {
      return hotspots;
    }
  };

  const monthlyDataSpendInUsd =
    dataCreditInputOrActual(monthlyDataSpendInDataCredits) * 0.00001;

  const monthlyDataSpendInHnt =
    monthlyDataSpendInUsd / (priceData.data.price / 100000000);

  const challengerPercentAnnualChange = -0.0005;
  const challengeePercentAnnualChange = -0.01;
  const witnessPercentAnnualChange = -0.0045;
  const consensusPercentAnnualChange = 0;
  const dcPercentAnnualChange = 0.025;

  const calculateProjectedPercent = (initialPercent, annualChange) => {
    const userInputtedYear = !isNaN(yearForCalculator)
      ? Math.floor(yearForCalculator)
      : yearForCalculator;

    if (
      isNaN(userInputtedYear) ||
      userInputtedYear === undefined ||
      userInputtedYear <= yearForCalculatorInitialValue
    ) {
      // The inputted year is not a valid number, or it's < 2020, so use the distribution from 2020
      return initialPercent;
    } else {
      // The inputted year is a valid number, and it's > 2020
      if (userInputtedYear - yearForCalculatorInitialValue >= 20) {
        // The inputted year is a valid number, and it's > 2040
        return initialPercent * Math.pow(1 + annualChange, 20);
      }
      // The inputted year is a valid number, and it's between 2020 and 2040
      else
        return (
          initialPercent *
          Math.pow(
            1 + annualChange,
            userInputtedYear - yearForCalculatorInitialValue
          )
        );
    }
  };

  // Editable participation rates
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

  const monthlyDataUsagePercent =
    monthlyDataSpendInHnt / (dcPercent * monthlyRewardsInHnt);

  const monthlyUnusedDataRewardsSurplusInHnt =
    dcPercent * monthlyRewardsInHnt * (1 - monthlyDataUsagePercent) > 0
      ? dcPercent * monthlyRewardsInHnt * (1 - monthlyDataUsagePercent)
      : 0;

  const surplusRewardTypesCombinedPercentages =
    calculateProjectedPercent(
      challengerPercent,
      challengerPercentAnnualChange
    ) +
    calculateProjectedPercent(
      challengeePercent,
      challengeePercentAnnualChange
    ) +
    calculateProjectedPercent(witnessPercent, witnessPercentAnnualChange);

  const challengerSurplusInHnt =
    monthlyUnusedDataRewardsSurplusInHnt *
    (calculateProjectedPercent(
      challengerPercent,
      challengerPercentAnnualChange
    ) /
      surplusRewardTypesCombinedPercentages);

  const challengeeSurplusInHnt =
    monthlyUnusedDataRewardsSurplusInHnt *
    (calculateProjectedPercent(
      challengeePercent,
      challengeePercentAnnualChange
    ) /
      surplusRewardTypesCombinedPercentages);

  const witnessSurplusInHnt =
    monthlyUnusedDataRewardsSurplusInHnt *
    (calculateProjectedPercent(witnessPercent, witnessPercentAnnualChange) /
      surplusRewardTypesCombinedPercentages);

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

      <main className="flex items-center justify-center flex-col h-full pt-4 lg:pt-20">
        <section className="p-4 flex items-start lg:items-start justify-start flex-col lg:flex-row w-full max-w-xl lg:max-w-4xl pb-12 lg:pb-64">
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
        <section className="md:bg-gray-400 flex-auto w-full flex items-center lg:items-start justify-end flex-col pb-20 lg:pb-32">
          <div className="max-w-xl w-full lg:max-w-5xl mx-auto px-0 lg:px-12 lg:-mt-48 mt-6">
            {editingValues ? (
              <div className="bg-hpblue-800 shadow-xl w-full rounded-xl">
                {hotspots.map((hotspot) => {
                  return (
                    <HotspotCalculatorRow
                      name={hotspot.name}
                      removeRowHandler={() => removeRow(hotspot.number)}
                      firstRow={hotspot.number === 1}
                      density1Handler={() => setDensity(1, hotspot.number)}
                      density2Handler={() => setDensity(2, hotspot.number)}
                      density3Handler={() => setDensity(3, hotspot.number)}
                      selectedDensity={hotspot.hotspotDensitySelection}
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
                    (monthlyRewardsInHnt *
                      calculateProjectedPercent(
                        challengerPercent,
                        challengerPercentAnnualChange
                      )) /
                    (hotspotsInputOrActual(numberOfActiveHotspots) *
                      (challengerParticipationPercent / 100));

                  let challengeeRewards =
                    loneWolfness === 1
                      ? 0
                      : (monthlyRewardsInHnt *
                          calculateProjectedPercent(
                            challengeePercent,
                            challengeePercentAnnualChange
                          )) /
                        (hotspotsInputOrActual(numberOfActiveHotspots) *
                          (challengeeParticipationPercent / 100));

                  let witnessRewards =
                    loneWolfness === 1
                      ? 0
                      : (monthlyRewardsInHnt *
                          calculateProjectedPercent(
                            witnessPercent,
                            witnessPercentAnnualChange
                          )) /
                        (hotspotsInputOrActual(numberOfActiveHotspots) *
                          (witnessParticipationPercent / 100));

                  let consensusRewards =
                    loneWolfness < 3
                      ? 0
                      : monthlyRewardsInHnt *
                        calculateProjectedPercent(
                          consensusPercent,
                          consensusPercentAnnualChange
                        ) *
                        (1 /
                          (hotspotsInputOrActual(numberOfActiveHotspots) *
                            (consensusParticipationPercent / 100)));

                  let dataRewards =
                    (monthlyRewardsInHnt * dcPercent -
                      monthlyUnusedDataRewardsSurplusInHnt) /
                    (hotspotsInputOrActual(numberOfActiveHotspots) *
                      (dcParticipationPercent / 100));

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
                        {/* TODO: turn this block into a HotspotRewardsRow component */}
                        <div className="px-4 lg:px-8 pt-10 flex flex-row justify-between">
                          <div className="flex-shrink w-full">
                            <p className="text-white text-xl font-display leading-tight pb-4 max-w-sm">
                              Challenger rewards
                            </p>
                            <p className="text-gray-600 text-md font-body">
                              {formatNumber(
                                calculateProjectedPercent(
                                  challengerPercent,
                                  challengerPercentAnnualChange
                                ),
                                "%",
                                2
                              )}{" "}
                              of the{" "}
                              {formatNumber(monthlyRewardsInHnt, "HNT", 0)}{" "}
                              minted every month, divided between{" "}
                              {formatNumber(
                                hotspotsInputOrActual(numberOfActiveHotspots) *
                                  (challengerParticipationPercent / 100),
                                "int",
                                0
                              )}{" "}
                              hotspots, plus a bonus from redistributed HNT from
                              data rewards.
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
                                  nearby, it likely isn't eligible for this
                                  reward type.
                                </>
                              ) : (
                                <>
                                  {formatNumber(
                                    calculateProjectedPercent(
                                      challengeePercent,
                                      challengeePercentAnnualChange
                                    ),
                                    "%",
                                    2
                                  )}{" "}
                                  of the{" "}
                                  {formatNumber(monthlyRewardsInHnt, "HNT", 0)}{" "}
                                  minted every month, divided between{" "}
                                  {formatNumber(
                                    hotspotsInputOrActual(
                                      numberOfActiveHotspots
                                    ) *
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
                                  nearby, it likely isn't eligible for this
                                  reward type.
                                </>
                              ) : (
                                <>
                                  {formatNumber(
                                    calculateProjectedPercent(
                                      witnessPercent,
                                      witnessPercentAnnualChange
                                    ),
                                    "%",
                                    2
                                  )}{" "}
                                  of the{" "}
                                  {formatNumber(monthlyRewardsInHnt, "HNT", 0)}{" "}
                                  minted every month, divided between{" "}
                                  {formatNumber(
                                    hotspotsInputOrActual(
                                      numberOfActiveHotspots
                                    ) *
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
                                  {formatNumber(
                                    calculateProjectedPercent(
                                      consensusPercent,
                                      consensusPercentAnnualChange
                                    ),
                                    "%",
                                    2
                                  )}{" "}
                                  of the{" "}
                                  {formatNumber(monthlyRewardsInHnt, "HNT", 0)}{" "}
                                  minted every month, assuming your hotspot has
                                  an equal chance of being elected as the other{" "}
                                  {formatNumber(
                                    hotspotsInputOrActual(
                                      numberOfActiveHotspots
                                    ) *
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
                              {formatNumber(
                                calculateProjectedPercent(
                                  dcPercent,
                                  dcPercentAnnualChange
                                ),
                                "%",
                                2
                              )}{" "}
                              of the{" "}
                              {formatNumber(monthlyRewardsInHnt, "HNT", 0)}{" "}
                              minted every month, minus the HNT equivalent of
                              any Data Credit purchases required to meet the{" "}
                              {formatNumber(
                                calculateProjectedPercent(
                                  dcPercent,
                                  dcPercentAnnualChange
                                ),
                                "%",
                                2
                              )}{" "}
                              allocation, and divided between{" "}
                              {formatNumber(
                                hotspotsInputOrActual(numberOfActiveHotspots) *
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
                      </div>
                      {hotspots.length > 1 && (
                        <div className="flex justify-end align-center bg-hpblue-900 mb-10">
                          <p className="text-right font-display text-gray-200 text-4xl p-5">
                            {formatNumber(hotspotEarnings, "HNT", 2)}
                          </p>
                        </div>
                      )}

                      {index + 1 !== hotspots.length && (
                        <div className="bg-hpblue-1000 w-full h-px" />
                      )}
                    </>
                  );
                })}
                <div className="flex flex-col lg:flex-col justify-end align-end bg-hpgreen-100 p-5 mt-10">
                  <p className="text-gray-900 font-display text-xl text-right lg:pr-0">
                    {hotspots.length > 1 ? "These hotspots " : "This hotspot "}
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
                        totalEarnings *
                          (usdHntInput > 0 &&
                          usdHntInput !== undefined &&
                          usdHntInput !== ""
                            ? usdHntInput
                            : hntUsdExchangeRate),
                        "USD",
                        2
                      )}
                    </p>
                    <p className="font-display text-xl text-gray-900 text-right">
                      at{" "}
                      {usdHntInput > 0 &&
                      usdHntInput !== undefined &&
                      usdHntInput !== "" &&
                      usdHntInput !== hntUsdExchangeRate ? (
                        <>
                          an exchange rate of{" "}
                          {formatNumber(usdHntInput, "USD", 2)}/HNT
                        </>
                      ) : (
                        <>
                          the current HNT/USD exchange rate of{" "}
                          {formatNumber(hntUsdExchangeRate, "USD", 2)}/HNT
                        </>
                      )}
                      .
                    </p>
                  </div>
                </div>

                <div className="bg-hpblue-700 px-4 lg:px-8 py-8">
                  <p className="text-xl pb-4 font-display text-gray-300">
                    Calculator assumptions
                  </p>

                  <div className="pb-2">
                    <p className="text-md font-display text-gray-500">
                      {!isNaN(yearForCalculator) &&
                      yearForCalculator > yearForCalculatorInitialValue
                        ? `HNT rewards distribution in ${yearForCalculator}`
                        : `Current HNT rewards distribution`}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 lg:grid-cols-5 pb-4">
                    <HotspotInfoSection
                      rewardName="Challenger"
                      rewardPercent={calculateProjectedPercent(
                        challengerPercent,
                        challengerPercentAnnualChange
                      )}
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
                      rewardPercent={calculateProjectedPercent(
                        challengeePercent,
                        challengeePercentAnnualChange
                      )}
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
                      rewardPercent={calculateProjectedPercent(
                        witnessPercent,
                        witnessPercentAnnualChange
                      )}
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
                      rewardPercent={calculateProjectedPercent(
                        consensusPercent,
                        consensusPercentAnnualChange
                      )}
                      participationValue={consensusParticipationPercent}
                      participationInputEmptyBoolean={
                        consensusParticipationInputEmpty
                      }
                      rewardTotal={monthlyRewardsInHnt}
                      participationChangeHandler={participationChangeHandler}
                    />
                    <HotspotInfoSection
                      rewardName="Data Transfer"
                      rewardPercent={calculateProjectedPercent(
                        dcPercent,
                        dcPercentAnnualChange
                      )}
                      participationValue={dcParticipationPercent}
                      participationInputEmptyBoolean={dcParticipationInputEmpty}
                      rewardTotal={monthlyRewardsInHnt}
                      dcUsage={monthlyUnusedDataRewardsSurplusInHnt}
                      participationChangeHandler={participationChangeHandler}
                    />
                  </div>

                  <div className="pb-2">
                    <p className="text-md font-display text-gray-500">
                      Other data that influences calculations
                    </p>
                  </div>

                  <div className="pb-6 grid gap-2 grid-cols-2">
                    <div className="flex flex-col border border-hpblue-700 rounded-lg col-span-2 lg:col-span-1 bg-hpblue-800 p-5 justify-between">
                      <p className="text-md pb-4 font-display text-gray-500">
                        Data Credit spend (30 days)
                      </p>
                      <div className="flex flex-col lg:flex-row align-center justify-end">
                        <NumberFormat
                          type="text"
                          step="1"
                          className="py-4 px-1 text-gray-300 text-center rounded-md bg-gray-900 h-6 w-full lg:w-1/2 placeholder-gray-700"
                          value={monthlyDataSpendInDataCreditsInput}
                          placeholder={monthlyDataSpendInDataCredits}
                          displayType={"input"}
                          thousandSeparator={true}
                          onValueChange={(values) => {
                            // To get the non-formatted value
                            const { value } = values;
                            setMonthlyDataSpendInDataCreditsInput(value);
                          }}
                        />
                        <p className="pt-3 lg:py-1z lg:py-1 lg:mt-px px-4 w-full lg:w-1/2 text-md font-body text-center lg:text-left text-gray-600 leading-tight">
                          {formatNumber(monthlyDataSpendInUsd, "USD", 2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col border border-hpblue-700 rounded-lg bg-hpblue-800 p-5 justify-between">
                      <p className="text-md font-display text-gray-500">Year</p>
                      <NumberFormat
                        id={`year-for-calculator`}
                        type="text"
                        step="1"
                        className="py-4 px-1 text-gray-300 text-center rounded-md bg-gray-900 h-6 w-full lg:w-1/2 placeholder-gray-700"
                        value={yearForCalculator}
                        decimalScale={0}
                        fixedDecimalScale={true}
                        placeholder={yearForCalculatorInitialValue}
                        onValueChange={(values) => {
                          // To get the non-formatted value
                          const { value } = values;
                          setYearForCalculator(value);
                        }}
                      />
                    </div>

                    <div className="flex flex-col border border-hpblue-700 rounded-lg bg-hpblue-800 p-5 justify-between">
                      <p className="text-md pb-4 font-display text-gray-500">
                        Active hotspots
                      </p>
                      <NumberFormat
                        id={`number-of-hotspots-input`}
                        type="text"
                        step="1"
                        className="py-4 px-1 text-gray-300 text-center rounded-md bg-gray-900 h-6 w-full lg:w-1/2 placeholder-gray-700"
                        value={activeHotspotsInput}
                        placeholder={numberOfActiveHotspots}
                        displayType={"input"}
                        thousandSeparator={true}
                        onValueChange={(values) => {
                          const { value } = values;
                          setActiveHotspotsInput(value);
                        }}
                      />
                    </div>
                    <div className="flex flex-col border border-hpblue-700 rounded-lg bg-hpblue-800 p-5 justify-between">
                      <p className="text-md pb-4 font-display text-gray-500">
                        USD price of HNT
                      </p>
                      <NumberFormat
                        type="text"
                        step="1"
                        className="py-4 px-1 text-gray-300 text-center rounded-md bg-gray-900 h-6 w-full lg:w-1/2 placeholder-gray-700"
                        value={usdHntInput}
                        prefix={"$"}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        placeholder={hntUsdExchangeRate}
                        displayType={"input"}
                        thousandSeparator={true}
                        onValueChange={(values) => {
                          // To get the non-formatted value
                          const { value } = values;
                          setUsdHntInput(value);
                        }}
                      />
                    </div>
                    <div></div>
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
    revalidate: 60,
    props: { chainVars, priceData, stats },
  };
}

export default EarningsCalculator;
